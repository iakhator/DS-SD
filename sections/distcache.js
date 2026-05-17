// Section: distcache
// Auto-extracted from index.html
const _html_distcache = String.raw`
<div id="sec-distcache" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 10</span></div><div class="sec-title">Design: Distributed Cache (Redis-like)</div></div>
<div class="sec-lead">Build a distributed in-memory key-value store that supports GET/SET/DELETE with TTL, scales horizontally, and handles node failures gracefully.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>A distributed cache is like a team of librarians each responsible for a specific shelf of books. Rather than fetching every book from a slow warehouse (your database), you keep the most-requested titles on fast-access shelves near the reading room. The fundamental purpose is to absorb read traffic that your database was never designed to handle at web scale — a cache hit costs microseconds from RAM while a database query might cost milliseconds of disk I/O, locking, and query planning. The central design challenge is deciding how to spread keys across many cache nodes so that any client can find the right node instantly, and the cluster can grow or shrink without reshuffling everything.</p>
<p>The core trade-off is between consistency and availability. When a cache node fails or is added, some portion of keys must be remapped. Naive modulo hashing (<code>hash(key) % N</code>) remaps almost every key when N changes, causing a thundering herd of cache misses all hitting the database at once. Consistent hashing solves this by placing both nodes and keys on a virtual ring, so adding or removing one node remaps only <code>1/N</code> of keys on average. The second major trade-off is eviction policy: LRU works well for most workloads, but if a small set of keys is accessed millions of times while the long tail is accessed once, LFU (least-frequently used) prevents your hot keys from ever being evicted by a brief burst of unique cold keys.</p>
<p>In an interview, always address three things explicitly: the hashing strategy (consistent hashing with virtual nodes), the replication model (primary plus replicas for high availability, with async replication to keep write latency low), and the eviction policy (and why). A common mistake is conflating the cache with the database — the cache is intentionally lossy and must be treated as a best-effort acceleration layer, not a source of truth. Another misconception is assuming that adding more cache nodes linearly reduces miss rate; in reality, if the working set fits in memory the miss rate is already near zero, and if the data is too large to cache, adding nodes helps only at the margin.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> The single-threaded event loop design (used by Redis) is not a limitation — it is a deliberate choice. Memory operations are so fast that lock-free single-threaded execution outperforms multi-threaded designs because it eliminates all mutex contention overhead, letting a single core sustain over one million operations per second.</div>
<div class="h2">Architecture</div>
<div class="arch-box"><pre>
CONSISTENT HASHING CLUSTER:
─────────────────────────────────────────────────────────
Client Library knows all node addresses.
Uses consistent hashing to route: hash(key) → correct node.

Client ──► [Cache Node 1] (keys: A-D)
       ──► [Cache Node 2] (keys: E-L)  
       ──► [Cache Node 3] (keys: M-Z)

Each node has:
  - Primary + 1-2 replicas (for HA)
  - In-memory hash table (O(1) get/set)
  - LRU eviction when memory full
  - AOF (append-only file) or RDB snapshot for persistence (optional)

REPLICATION:
  Primary handles writes → async replication to replicas
  Replicas handle reads (or serve stale during primary failure)
  Sentinel or Cluster mode for automatic failover

EVICTION POLICIES (when memory is full):
  LRU:        evict least recently used — good general policy
  LFU:        evict least frequently used — better for skewed access
  TTL-only:   only evict expired keys — dangerous (fills up)
  NoEviction: return error on new writes — safe but strict

SINGLE-THREADED EVENT LOOP (like Redis):
  One thread handles all I/O via epoll/kqueue
  Why? Avoids lock contention. Memory operations are so fast that
       threading overhead > benefit. 
  Result: 1M+ ops/sec on single thread.
  CPU-intensive ops (SORT, LRANGE large) block the loop — avoid!
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_distcache.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
