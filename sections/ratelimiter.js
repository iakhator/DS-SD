// Section: ratelimiter
// Auto-extracted from index.html
const _html_ratelimiter = String.raw`
<div id="sec-ratelimiter" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 09</span></div><div class="sec-title">Design: Rate Limiter</div></div>
<div class="sec-lead">Rate limiting protects services from abuse, DDoS, and runaway clients. Multiple algorithms with different trade-offs. The distributed implementation is where it gets interesting — how do you limit globally across 100 servers?</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Think of a rate limiter as a bouncer at a club who tracks how many drinks each patron has ordered in the last hour. Its fundamental job is to say "you have consumed your quota — come back later" before a misbehaving client can crash the bar. In software, the challenge is enforcing this quota accurately and cheaply across every incoming request, for millions of distinct users, without adding meaningful latency to the happy path. The central design challenge is that counting is easy on a single server but surprisingly tricky when requests for the same user arrive at any of 100 different servers.</p>
<p>The core trade-off is between accuracy and cost. A sliding window log is perfectly accurate (it records every request timestamp and counts only those in the last N seconds) but stores O(requests) data per user and becomes expensive at scale. A fixed window counter is O(1) but has the classic boundary exploit where a user can send double their quota in a two-second window straddling a boundary reset. Token bucket splits the difference: it is O(1) in storage, handles bursts naturally by letting users spend saved-up tokens, and is what AWS, Stripe, and Nginx actually use in production. For distributed enforcement, a centralized Redis counter is the simplest correct solution — a single atomic <code>INCR</code> plus <code>EXPIRE</code> gives you a shared source of truth with sub-millisecond overhead, at the cost of Redis becoming a dependency your rate limiter inherits.</p>
<p>When approaching this problem in an interview, clarify whether the limit is per-user, per-IP, or per-API-key, and whether it needs to be exact or approximate — those choices drive algorithm selection. A very common mistake is proposing local in-process counters, forgetting that behind a load balancer each server sees only a fraction of a user's traffic, making per-server limits trivially bypassable. Another pitfall is ignoring clock skew between servers when implementing distributed sliding windows; using a monotonic source like Redis server time instead of application-server wall clocks avoids subtle counting errors.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> The algorithm you choose matters far less than where you store the counter. Local memory is fast but wrong at scale; centralized Redis is correct and still fast enough (sub-millisecond) — make that the default and only optimize away from it if you can prove Redis is the bottleneck.</div>
<div class="h2">Rate Limiting Algorithms</div>
<div class="arch-box"><pre>
1. FIXED WINDOW COUNTER
   Count requests in a fixed time window (e.g., per minute).
   [00:00-01:00]: user_123 = 47 requests. Limit = 100. → Allow
   
   Problem: Boundary exploit. 
   User sends 100 at 00:59 and 100 at 01:01 → 200 in 2 seconds.

2. SLIDING WINDOW LOG
   Store timestamp of every request. Count timestamps in last 60s.
   Accurate. Memory: O(requests per user per window) — expensive.

3. SLIDING WINDOW COUNTER
   Hybrid: current window count + fraction of previous window.
   rate = prev_count × (1 - elapsed/window) + curr_count
   Very accurate, O(1) memory. Best for most use cases.

4. TOKEN BUCKET (used by AWS, Stripe, Nginx)
   Each user has a bucket of capacity C. Refills at rate R tokens/sec.
   Request costs 1 token. Allows bursting up to capacity.
   
   Redis: DECRBY user:token_count 1
          if count < 0: reject + INCRBY +1 (undo)
   
   Pro: Handles bursts naturally. Simple. Most used in practice.

5. LEAKY BUCKET (used for traffic shaping)
   Requests go into a queue. Processed at fixed rate.
   Smooths out bursts → constant output rate.
   Pro: No burstiness downstream. Con: Adds latency.

DISTRIBUTED RATE LIMITING:
  Problem: 100 app servers each have local rate limits.
           User can hit 100 servers to get 100× the limit.
  
  Solution A: Centralized Redis counter
    redis.incr("rate:user:123:" + currentWindow)
    redis.expire(key, windowSeconds)
    Fast (sub-ms Redis), single source of truth, Redis becomes SPOF.
  
  Solution B: Redis with sliding window using Sorted Set
    ZADD user:123 timestamp request_id  -- log request
    ZREMRANGEBYSCORE user:123 0 (now-60000)  -- remove old
    ZCARD user:123  -- count recent requests
    
  Solution C: Approximate with local counters + sync
    Each server tracks locally. Periodically sync to Redis.
    Slight over-counting but no single bottleneck.

HEADERS TO RETURN:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 47  
  X-RateLimit-Reset: 1696435200  (epoch when window resets)
  Retry-After: 30  (seconds until retry, on 429)
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_ratelimiter.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
