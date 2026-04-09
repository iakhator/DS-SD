// Section: searchauto
// Auto-extracted from index.html
const _html_searchauto = String.raw`
<div id="sec-searchauto" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 14</span></div><div class="sec-title">Design: Search Autocomplete</div></div>
<div class="sec-lead">Autocomplete serves suggestions as you type. Every keystroke fires a query. At Google scale, this is billions of queries per day. The key insight: serve from a precomputed trie or top-k cache — never compute live. Stale by a few hours is totally acceptable.</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
