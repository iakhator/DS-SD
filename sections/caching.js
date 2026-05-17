// Section: caching
// Auto-extracted from index.html
const _html_caching = String.raw`
<div id="sec-caching" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 04</span></div><div class="sec-title">Caching — Strategies & Patterns</div></div>
<div class="sec-lead">Caching reduces latency (memory vs disk) and load (fewer DB queries). Getting cache strategy wrong leads to either stale data serving users or cache stampedes that crash your database. The three fundamental problems: cache invalidation, cache penetration, and thundering herd.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>A cache is your system's short-term memory. Imagine a librarian who, instead of walking to the back stacks every time someone asks for the same popular book, keeps a small pile of frequently requested titles on the front desk. Answering a request from the front-desk pile takes one second; fetching from the stacks takes five minutes. Caching applies the same idea computationally: keep a copy of expensive-to-fetch data (from a database, an external API, or a CPU-intensive computation) in a fast store like RAM so that repeated reads are nearly instant. The underlying database is the stacks; Redis or Memcached is the front desk.</p>
<p>Caching solves two distinct problems simultaneously: it reduces <strong>latency</strong> (data in memory is orders of magnitude faster than data on disk) and it reduces <strong>load</strong> (a single cached response can absorb thousands of identical database queries). The trade-off is <strong>freshness vs speed</strong>: the moment you cache a value, it begins to drift from the source of truth. Every caching decision is really a decision about how much staleness your users can tolerate — a news headline can be stale for 60 seconds without consequence; a bank balance cannot be stale for even one second.</p>
<p>Reach for caching when a piece of data is read far more often than it is written, and when serving a slightly stale value is acceptable. The most dangerous misconception is treating cache as a reliable primary store — caches can and do evict data under memory pressure, and any cache can fail. Interviewers specifically probe whether you handle the <strong>thundering herd</strong> (many requests simultaneously missing the cache after expiry) and <strong>cache penetration</strong> (requests for keys that will never exist flooding through to the database). Getting invalidation wrong is the most common real-world caching bug.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Cache invalidation is the hardest part — not cache population. The question "when do I evict this entry?" is more consequential than "what do I cache?" Design your invalidation strategy before you design your population strategy.</div>
<div class="h2">Cache Write Strategies</div>
<div class="arch-box"><pre>
Write-Through:
  Write to cache AND database synchronously.
  Pros: Cache always consistent. No stale reads.
  Cons: Every write is slower (double write). Cache fills with infrequently-read data.
  Use when: read-heavy with moderate write consistency requirements.

Write-Back (Write-Behind):
  Write to cache only. Async flush to DB in background.
  Pros: Very fast writes. Batches DB writes.
  Cons: Data loss if cache fails before flush. Consistency risk.
  Use when: extremely write-heavy, can tolerate brief data loss (IoT, analytics).

Write-Around:
  Write directly to DB, bypass cache.
  Cache filled only on read (cache-aside).
  Pros: Cache not polluted with write-once data.
  Cons: First read after write is a cache miss.
  Use when: Data written once and rarely re-read.

Cache-Aside (Lazy Loading) — MOST COMMON:
  1. Read: check cache → if miss, read DB, populate cache, return
  2. Write: write to DB, invalidate (or update) cache entry
  
  if cache.get(key): return cached
  val = db.query(key)
  cache.set(key, val, ttl=300)
  return val
</pre></div>

<div class="h2">Cache Problems & Solutions</div>
<div class="arch-box"><pre>
1. CACHE STAMPEDE (Thundering Herd):
   Problem: Popular cache entry expires. 10,000 requests all miss,
            all query DB simultaneously. DB falls over.
   Solutions:
     a) Mutex/lock: first miss acquires lock, computes, sets cache.
        Others wait. (Works for small scale)
     b) Early expiration: recompute cache slightly before expiry,
        while still serving stale. (Background refresh)
     c) Probabilistic early recompute:
        if (expiry - now) < random_threshold: recompute early
     d) Jitter: add random offset to TTLs to stagger expiry

2. CACHE PENETRATION:
   Problem: Queries for keys that DON'T exist (e.g. user_id=-1).
            Every query misses cache, hits DB. Attack vector.
   Solution: Cache negative results ("NULL sentinel" with short TTL).
             Bloom filter: fast probabilistic check if key could exist.

3. CACHE AVALANCHE:
   Problem: Many cache entries expire at the same time (e.g. after restart).
            Massive DB load spike.
   Solutions:
     a) Stagger TTLs with jitter: ttl = base_ttl + random(0, base_ttl/4)
     b) Warm cache before traffic: pre-load popular keys on startup
</pre></div>

<div class="h2">Redis Data Structures & When to Use Each</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Type</th><th>Operations</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td>String</td><td>GET/SET/INCR/EXPIRE</td><td>Session tokens, counters, simple cache</td></tr>
<tr><td>Hash</td><td>HGET/HSET/HMGET</td><td>User profiles, object fields (vs serialize)</td></tr>
<tr><td>List</td><td>LPUSH/RPOP/LRANGE</td><td>Activity feed, queue, recent N items</td></tr>
<tr><td>Set</td><td>SADD/SISMEMBER/SINTER</td><td>Unique visitors, tags, mutual friends</td></tr>
<tr><td>Sorted Set</td><td>ZADD/ZRANGE/ZRANK</td><td>Leaderboards, rate limiting, delayed queues</td></tr>
<tr><td>HyperLogLog</td><td>PFADD/PFCOUNT</td><td>Unique count with ~1% error, O(1) memory</td></tr>
<tr><td>Streams</td><td>XADD/XREAD</td><td>Message log, event sourcing</td></tr>
</tbody>
</table></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_caching.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
