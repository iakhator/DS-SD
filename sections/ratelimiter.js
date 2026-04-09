// Section: ratelimiter
// Auto-extracted from index.html
const _html_ratelimiter = String.raw`
<div id="sec-ratelimiter" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 09</span></div><div class="sec-title">Design: Rate Limiter</div></div>
<div class="sec-lead">Rate limiting protects services from abuse, DDoS, and runaway clients. Multiple algorithms with different trade-offs. The distributed implementation is where it gets interesting — how do you limit globally across 100 servers?</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
