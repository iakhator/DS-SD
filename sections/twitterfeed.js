// Section: twitterfeed
// Auto-extracted from index.html
const _html_twitterfeed = String.raw`
<div id="sec-twitterfeed" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 08</span></div><div class="sec-title">Design: Social Feed (Twitter/X)</div></div>
<div class="sec-lead">The classic feed design problem. Two architectures: pull (fanout on read) and push (fanout on write). Neither is perfect. Real systems use a hybrid. This problem teaches trade-offs at the core of social systems.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">The Core Problem</div>
<div class="arch-box"><pre>
Twitter stats:
  300M DAU, 500M tweets/day, 1.7B follows, read:write = 100:1

The Feed Problem:
  User A follows 500 people. When they open Twitter, show them a
  ranked feed of recent posts from those 500 people.
  
  Naive query:
    SELECT tweets FROM tweets WHERE user_id IN (followingList)
    ORDER BY created_at DESC LIMIT 20;
  
  Problem: You have 300M users × their following lists queried every open.
  This doesn't work at scale.
</pre></div>

<div class="h2">Fan-Out on Write vs Read</div>
<div class="arch-box"><pre>
FAN-OUT ON WRITE (Push Model):
  When User A tweets, immediately write that tweet to the feed cache
  of every follower.
  
  Post tweet → for each follower → write to their feed cache (Redis List)
  
  Read feed: O(1) — just read from pre-built cache
  Write: O(followers) — Beyoncé with 60M followers → 60M writes per tweet
  
  Pros:  Ultra-fast reads. Feed is pre-built.
  Cons:  Celebrities (high-follower users) cause huge write amplification.
         Storage: N_users × feed_size × tweet_pointer_size

FAN-OUT ON READ (Pull Model):
  When user opens feed, query for all people they follow's tweets.
  
  Read feed → fetch follower list → union of their recent tweets → rank → return
  
  Pros:  Write is O(1) — just write the tweet once.
  Cons:  Read is O(following × tweet_lookups). 500ms+ latency. DB hammered.

HYBRID (What Twitter actually uses):
  - Regular users: Fan-out on write. Pre-build their feed in Redis.
  - Celebrities (>10k followers): Fan-out on read at read time.
  - At read time: merge pre-built feed + inject celebrity tweets inline.
  
  This handles the hot celebrity problem while keeping reads fast for most users.
</pre></div>

<div class="h2">Full Architecture</div>
<div class="arch-box"><pre>
POST TWEET:
  User ──► API Gateway ──► Tweet Service ──► Write to Tweet DB (Cassandra)
                                        ──► Queue (Kafka)
                                                │
                                          Fan-Out Service
                                          (consumes from Kafka)
                                                │
                                   ┌────────────┴────────────────┐
                                   │                             │
                            Regular Users                  Celebrity Users
                          Write tweet_id to              Skip (too many followers)
                          Redis feed cache               Handle at read time

READ FEED:
  User ──► Feed Service
           1. Read pre-built feed from Redis (tweet IDs)
           2. Check followed celebrities → fetch their recent tweet IDs
           3. Merge + deduplicate
           4. Fetch full tweet data from Tweet Cache (Redis) or DB
           5. Rank (chronological, ML, engagement-boosted)
           6. Return 20 tweets

DATA STORES:
  Users:    MySQL (structured, ACID, small)
  Follows:  Cassandra (user_id → [followed_ids], scales horizontally)
  Tweets:   Cassandra (write-heavy, time-series, global scale)
  Feed:     Redis Sorted Set (score=timestamp, members=tweet_ids)
  Search:   Elasticsearch (full-text tweet search)
  Media:    S3 + CDN (images, videos)
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_twitterfeed.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
