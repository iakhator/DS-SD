// Section: distcache
// Auto-extracted from index.html
const _html_distcache = String.raw`
<div id="sec-distcache" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 10</span></div><div class="sec-title">Design: Distributed Cache (Redis-like)</div></div>
<div class="sec-lead">Build a distributed in-memory key-value store that supports GET/SET/DELETE with TTL, scales horizontally, and handles node failures gracefully.</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
