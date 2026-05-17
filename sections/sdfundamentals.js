// Section: sdfundamentals
// Auto-extracted from index.html
const _html_sdfundamentals = String.raw`
<div id="sec-sdfundamentals" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 01</span></div><div class="sec-title">System Design Fundamentals</div></div>
<div class="sec-lead">System design is about making architectural decisions under constraints: scale, latency, availability, consistency. Before every design, establish requirements. Distinguish functional requirements (what the system does) from non-functional (how well it does it). Numbers matter — you need to estimate scale to pick the right tools.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>System design is fundamentally about constraints. Imagine you are an architect asked to design a building — you need to know if it will house 10 people or 10,000 before you can choose materials, layout, or foundation. In the same way, designing a system to handle 1,000 requests per day versus 1,000,000 per second requires radically different choices: one fits on a single laptop, the other needs caching layers, database sharding, load balancers, and multiple data centers. The core mental model is: <em>requirements drive architecture</em>. Every component you add should exist to solve a specific, quantified constraint — not because it sounds impressive.</p>
<p>The reason back-of-envelope estimation matters so much is that it converts vague words like "high scale" into concrete numbers that force specific decisions. "We have 100 million daily active users who each post 3 times per day" becomes 3.5 million writes per day, or roughly 40 writes per second — a load a single well-tuned Postgres instance can handle. Add "reads are 100x more frequent" and suddenly you need a read replica or a cache layer. Without the numbers, every architectural discussion is just opinion; with the numbers, you can reason about whether a solution is over-engineered or dangerously under-provisioned.</p>
<p>Reach for a systematic approach in design interviews: requirements first, estimates second, high-level boxes third, deep-dives last. The most common mistake is jumping straight to the interesting technology — Kafka, Redis, Cassandra — before establishing why you need it. An interviewer who hears "I would use Redis here" without a preceding rationale will ask "why?" and a candidate who cannot answer in terms of latency requirements or read/write patterns will lose credibility instantly. Equally important: make your trade-offs explicit. Every architectural choice (SQL vs NoSQL, strong vs eventual consistency, synchronous vs async) sacrifices something; naming what you sacrifice shows engineering maturity.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> The interview is not about designing the perfect system — it is about demonstrating that you can navigate trade-offs systematically. A design that explicitly acknowledges its weaknesses and explains why they are acceptable beats a "perfect" design whose constraints you never questioned.</div>

<div class="h2">Back-of-Envelope Estimates</div>
<div class="cheatsheet">
  <div class="cs-item"><div class="cs-label">L1 cache</div><div class="cs-val">~1ns</div></div>
  <div class="cs-item"><div class="cs-label">RAM read</div><div class="cs-val">~100ns</div></div>
  <div class="cs-item"><div class="cs-label">SSD random</div><div class="cs-val">~100µs</div></div>
  <div class="cs-item"><div class="cs-label">HDD seek</div><div class="cs-val">~10ms</div></div>
  <div class="cs-item"><div class="cs-label">LAN RTT</div><div class="cs-val">~0.5ms</div></div>
  <div class="cs-item"><div class="cs-label">DC RTT</div><div class="cs-val">~1ms</div></div>
  <div class="cs-item"><div class="cs-label">Cross-region</div><div class="cs-val">~150ms</div></div>
  <div class="cs-item"><div class="cs-label">1M req/day</div><div class="cs-val">~12 RPS</div></div>
  <div class="cs-item"><div class="cs-label">1B req/day</div><div class="cs-val">~12K RPS</div></div>
  <div class="cs-item"><div class="cs-label">1GB memory</div><div class="cs-val">10⁹ bytes</div></div>
  <div class="cs-item"><div class="cs-label">1TB storage</div><div class="cs-val">10¹² bytes</div></div>
  <div class="cs-item"><div class="cs-label">Tweet text</div><div class="cs-val">~140B</div></div>
</div>

<div class="h2">CAP Theorem</div>
<div class="diag"><pre>
     Consistency
         /\
        /  \
       /    \
      /  CA  \
     /--CA----\
    /    |     \
   / CP  |  AP  \
  /      |       \
 Consistency   Availability
          \   /
           \ /
          Partition
          Tolerance

CA: Consistent + Available. Only possible without partitions (single node DB).
CP: Consistent + Partition tolerant. Bank accounts, distributed locks (ZooKeeper, HBase).
    Choose accuracy over availability. System rejects writes when uncertain.
AP: Available + Partition tolerant. DNS, Cassandra, DynamoDB, shopping carts.
    Always responds, may return stale data. Converges eventually.

Real systems don't fully fit one category — they tune the trade-off.
</pre></div>

<div class="h2">How to Approach System Design Interviews</div>
<div class="steps">
  <div class="step"><strong>Clarify requirements (5 min).</strong> Functional: "Users can post tweets, follow users, see a feed." Non-functional: scale, latency, availability. Ask: "Is this read-heavy or write-heavy? How many DAUs? Global or single region?"</div>
  <div class="step"><strong>Estimate scale (2-3 min).</strong> DAU × actions per day = RPS. Data per action × time = storage. This determines whether you need sharding, caching, CDN, etc.</div>
  <div class="step"><strong>Define the API (2-3 min).</strong> What endpoints? What parameters? What does each return? This makes the requirements concrete.</div>
  <div class="step"><strong>High-level design (10 min).</strong> Draw the main components: clients, load balancer, app servers, cache, database. Show data flow for the primary use case. Use ASCII or whiteboard.</div>
  <div class="step"><strong>Deep-dive the interesting parts (15-20 min).</strong> Pick 2-3 interesting components to go deep. Schema design, sharding strategy, caching strategy, consistency model. Be driven by the interviewers' interests.</div>
  <div class="step"><strong>Bottlenecks and trade-offs.</strong> Where is the system likely to break? What are you trading off? "Using eventual consistency gives better write throughput at the cost of temporary stale reads."</div>
</div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_sdfundamentals.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
