// Section: sdfundamentals
// Auto-extracted from index.html
const _html_sdfundamentals = String.raw`
<div id="sec-sdfundamentals" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 01</span></div><div class="sec-title">System Design Fundamentals</div></div>
<div class="sec-lead">System design is about making architectural decisions under constraints: scale, latency, availability, consistency. Before every design, establish requirements. Distinguish functional requirements (what the system does) from non-functional (how well it does it). Numbers matter — you need to estimate scale to pick the right tools.</div>
<div class="sec-divider"></div>
<div class="sec-body">

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
