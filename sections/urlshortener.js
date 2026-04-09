// Section: urlshortener
// Auto-extracted from index.html
const _html_urlshortener = String.raw`
<div id="sec-urlshortener" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 07</span></div><div class="sec-title">Design: URL Shortener</div></div>
<div class="sec-lead">The canonical system design warm-up. Simple enough to complete in 45 minutes, deep enough to discuss hashing, collisions, caching, analytics, and scaling. Know this cold.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Requirements</div>
<div class="grid-2">
  <div class="card"><div class="card-title blue">Functional</div><p>POST /shorten → shortURL. GET /{code} → redirect. Delete URL. Analytics (optional).</p></div>
  <div class="card"><div class="card-title amber">Non-Functional</div><p>100M URLs shortened/day. 10:1 read/write. Redirect &lt;10ms p99. 5 years retention = ~180B records.</p></div>
</div>

<div class="h2">Architecture</div>
<div class="arch-box"><pre>
Client ──► CDN (cache popular redirects) ──► Load Balancer
                                                    │
                                          ┌─────────┴──────────┐
                                          │   App Servers       │
                                          │  (stateless)        │
                                          └────┬──────┬─────────┘
                                               │      │
                                         ┌─────▼──┐  ┌▼────────────────┐
                                         │ Redis  │  │ Write DB (MySQL)│
                                         │ Cache  │  │ Sharded by code │
                                         └────────┘  └─────────────────┘
                                                               │
                                                      ┌────────▼────────┐
                                                      │ Read Replicas   │
                                                      │ (handle reads)  │
                                                      └─────────────────┘
</pre></div>

<div class="h2">Key Design Decisions</div>
<div class="arch-box"><pre>
1. SHORT CODE GENERATION — how to create unique 6-char codes?
   
   Option A: MD5/SHA256(long_url) → take first 6 chars
     Problem: collisions — same URL maps to same code (might be fine).
     Problem: different URLs can hash to same 6-char prefix → collision handling.
   
   Option B: Auto-increment ID → Base62 encode
     ID 1000000 → Base62 → "4c92" (6 chars handles 62⁶ = 56B URLs)
     Problem: IDs are predictable. Enumeratable.
     Solution: epoch + server ID + sequence (Twitter Snowflake-style)
   
   Option C: Random 6 chars → check DB for collision → retry if collision
     Good randomness, not sequential. Collision rate low but exists.
   
   Best: Counter-based (predictable, fast, no collision) with
         optional obfuscation via bijective function.

2. SCHEMA
   urls: {
     code:       VARCHAR(7) PRIMARY KEY,
     long_url:   VARCHAR(2048) NOT NULL,
     user_id:    BIGINT,
     created_at: DATETIME,
     expires_at: DATETIME,  -- optional TTL
     click_count: BIGINT    -- or track in separate analytics service
   }

3. REDIRECT: 301 vs 302
   301 Moved Permanently: Browser caches redirect. Less server load.
                          Can't update destination or track clicks accurately.
   302 Found (Temporary): Browser always asks our server. We can track clicks
                          and update the destination. Slightly more load.
   Use 302 for click tracking. 301 for maximum performance.

4. CACHING
   Cache is essential — 10:1 read/write ratio, Pareto distribution.
   Top 20% of URLs generate 80% of redirects.
   Redis: SET code→longUrl TTL=86400 (24hr)
   CDN: cache at edge for hottest URLs (sub-millisecond global redirect)

5. ANALYTICS (if required)
   Don't track in same DB as core write path.
   Write click events to Kafka → Flink/Spark stream processing → ClickHouse
   Async, doesn't slow down redirect latency.
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_urlshortener.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
