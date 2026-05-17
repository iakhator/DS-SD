// Section: searchauto
// Auto-extracted from index.html
const _html_searchauto = String.raw`
<div id="sec-searchauto" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 14</span></div><div class="sec-title">Design: Search Autocomplete</div></div>
<div class="sec-lead">Autocomplete serves suggestions as you type. Every keystroke fires a query. At Google scale, this is billions of queries per day. The key insight: serve from a precomputed trie or top-k cache — never compute live. Stale by a few hours is totally acceptable.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Search autocomplete is deceptively simple on the surface — show a dropdown of suggestions as the user types — but at Google scale it means serving billions of queries per day with latency low enough that the dropdown appears before the user finishes their next keystroke. The mental model that unlocks the whole design is recognizing that autocomplete is not a search problem, it is a <em>lookup</em> problem. You are not discovering new answers in real time; you are retrieving a precomputed ranked list for a known prefix. Every time you type "pyt", the answer "python, pythagorean theorem, python tutorial" has already been computed hours earlier and is sitting in a cache waiting to be fetched in a few milliseconds.</p>
<p>The core trade-off is between freshness and latency. Computing suggestions live from raw search logs on every keystroke would give you perfectly up-to-date results but would require aggregating over terabytes of data in under 100 milliseconds — impossible. The resolution is to separate the pipeline into two stages: an offline batch job (running hourly or daily) that aggregates search log frequencies, builds a trie with precomputed top-K suggestions at every node, and pushes the result to a serving tier; and an online serving layer that does nothing but look up a key in Redis or traverse a few trie nodes. Stale by a few hours is totally acceptable because trending queries rise and fall over hours, not milliseconds. The serving layer is deliberately kept computation-free so it can sustain thousands of queries per second per node.</p>
<p>In an interview, the key move is to split the architecture into offline (data pipeline) and online (serving) from the start. This reframes the problem correctly — you stop trying to "query faster" and start thinking about "precompute smarter." A very common mistake is designing a system that traverses the full trie subtree at query time to find the top-K results; this is O(subtree size) and defeats the purpose entirely. Storing top-K directly at each trie node during the offline build reduces every lookup to O(prefix length), which is effectively constant for short search terms. Another pitfall is ignoring the browser and CDN caching layers; a large fraction of autocomplete queries are for extremely common prefixes like "the" or "how to" that can be cached at the edge with zero backend cost.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> The trie stores precomputed top-K suggestions at every node — not just the leaf characters. This is the single most important implementation detail: it is what makes the serving path O(prefix length) instead of O(subtree size), and it is what makes the whole system feasible at scale.</div>
<div class="h2">Requirements</div>
<div class="arch-box"><pre>
Scale: 10M DAU, 10 keystrokes per search = 100M autocomplete queries/day ≈ 1200 QPS
Latency: &lt;100ms (fast enough to feel instant as user types)
Freshness: top queries update within a few hours
Top K: return 5-10 suggestions per prefix
</pre></div>

<div class="h2">Architecture</div>
<div class="arch-box"><pre>
DATA PIPELINE (offline, runs hourly/daily):
─────────────────────────────────────────
Search Logs → Kafka → Flink/Spark (count query frequencies)
                                    │
                             Top-K per prefix
                                    │
                              Trie Builder
                                    │
                          Serialize trie to storage (S3)

SERVING (online, &lt;100ms):
─────────────────────────
Client types "pyth"
    │
    ▼
Browser Cache (short TTL, common prefixes cached locally)
    │ miss
    ▼
CDN (edge cache, 1-5min TTL)
    │ miss
    ▼
Autocomplete Service
    │
    ├── Redis Cache (prefix → [suggestions]) ← PRIMARY
    │   Key: "prefix:pyth" → ["python", "pythagorean theorem", ...]
    │
    └── Trie in memory (fallback if Redis miss)

TRIE STRUCTURE:
  Each node stores:
    - Character
    - Top-K [query, frequency] pairs at this node (pre-aggregated!)
    - NOT full subtree — just the precomputed top-K
  
  Lookup "pyth": navigate p→y→t→h → return node's top-K list
  O(prefix_length) lookup — essentially O(1) for short queries!

  Why store top-K at each node? 
  Building top-K on-the-fly during query requires traversing entire subtree.
  Too slow. Pre-aggregate during offline build instead.

HANDLING UPDATES:
  Option A: Rebuild trie hourly → swap in-place (atomic)
  Option B: Weighted update: new_score = 0.9*old + 0.1*new (exponential decay)
            Slowly incorporates new trends without full rebuild

FILTERING:
  Filter hate speech, adult content, copyrighted terms at build time.
  Real-time filter layer for breaking news / disasters (remove sensitive terms).
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_searchauto.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
