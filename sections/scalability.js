// Section: scalability
// Auto-extracted from index.html
const _html_scalability = String.raw`
<div id="sec-scalability" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 02</span></div><div class="sec-title">Scalability & Load Balancing</div></div>
<div class="sec-lead">Scalability is the system's ability to handle growth. Vertical scaling (bigger machine) hits a ceiling. Horizontal scaling (more machines) requires stateless services, load balancing, and distributed coordination. Understand both approaches and when each breaks down.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Think of scalability like a restaurant kitchen. When the lunch rush hits, you have two choices: replace your single cook with a faster, more experienced chef (vertical scaling), or hire additional cooks and add more workstations (horizontal scaling). The first approach is fast to set up and works well until you hit the physical limits of one person's speed. The second approach can theoretically serve any number of diners, but it requires coordination — someone has to decide which cook handles which order, and the cooks must not depend on each other's private notes to do their jobs.</p>
<p>This matters because every popular service eventually outgrows a single machine. Vertical scaling buys time cheaply and with zero code changes, but it has a hard ceiling and creates a single point of failure — if that one powerful machine crashes, everything goes down. Horizontal scaling removes both constraints, but it forces your application to be stateless: each server must be able to handle any request without relying on memory or local disk from a previous request. The key trade-off is <strong>simplicity vs resilience</strong>: vertical is operationally simple, horizontal is operationally complex but nearly limitless.</p>
<p>Reach for horizontal scaling when you expect sustained, unpredictable traffic growth or need high availability with no single point of failure. The most common mistake candidates make in interviews is jumping straight to horizontal scaling without first asking about the load profile — if your service peaks at 500 requests per second, a single beefy machine might be the right answer. Interviewers probe whether you understand that horizontal scaling requires a load balancer, session externalization (e.g., storing sessions in Redis instead of server memory), and a distributed cache strategy before it actually works.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Horizontal scaling is not free — it only works if your application is stateless. Before adding machines, audit every place your code stores state locally and move it to a shared store like Redis or a database.</div>
<div class="h2">Vertical vs Horizontal Scaling</div>
<div class="grid-2">
  <div class="card"><div class="card-title blue">Vertical (Scale Up)</div><p>Bigger CPU, more RAM, faster disk. Simple — no code changes. But hardware limits, single point of failure, and gets expensive fast. Ceiling at ~$50k/machine.</p></div>
  <div class="card"><div class="card-title green">Horizontal (Scale Out)</div><p>More machines. Commodity hardware. No single point of failure. Requires stateless services (session state in Redis, not memory). Network coordination overhead.</p></div>
</div>

<div class="h2">Load Balancer Algorithms</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Algorithm</th><th>How it works</th><th>Best for</th></tr></thead>
<tbody>
<tr><td>Round Robin</td><td>Rotate through servers sequentially</td><td>Homogeneous servers, similar request cost</td></tr>
<tr><td>Weighted Round Robin</td><td>More powerful servers get more requests</td><td>Heterogeneous server capacity</td></tr>
<tr><td>Least Connections</td><td>Send to server with fewest active connections</td><td>Long-lived connections (WebSocket, DB)</td></tr>
<tr><td>IP Hash</td><td>hash(client IP) % num_servers</td><td>Sticky sessions without shared state</td></tr>
<tr><td>Consistent Hashing</td><td>Virtual ring, minimal redistribution on change</td><td>Cache servers, distributed DBs</td></tr>
</tbody>
</table></div>

<div class="h2">Consistent Hashing</div>
<div class="arch-box"><pre>
Problem with simple hashing: hash(key) % N_servers
  → Add/remove server → ~100% of keys remapped → cache stampede!

Consistent Hashing solution:
  - Both servers and keys hash onto a virtual ring (0 to 2³²)
  - A key is served by the first server clockwise from its position
  - Add server: only keys between new server and its predecessor remapped
  - Remove server: only that server's keys remapped to next server
  - Result: only K/N keys remapped when N changes

                    0
                   ╱╲
         Server A ●  ● Server B
                 /    \
                /      \
    Server D ●          ● Server C
                \      /
                 \    /
                  ----

  Key X hashes to position → goes to next clockwise server
  Add Server E between A and B: only A's keys that fall before E migrate
  
Virtual nodes (vnodes):
  Each physical server owns multiple positions on the ring (100-200 vnodes)
  Provides more even distribution and better load balancing
  Used by: Cassandra, Amazon DynamoDB, Riak, Redis Cluster
</pre></div>

<div class="h2">Stateless Architecture (Required for Horizontal Scale)</div>
<div class="arch-box"><pre>
❌ Stateful (can't scale horizontally):
  Client → Server 1 (holds session in memory)
  If Server 1 goes down, session is lost.
  Load balancer must always route same client to same server (sticky).

✅ Stateless (scales horizontally):
  Client → Any Server → Redis (shared session store)
  Any server can handle any request.
  Servers are interchangeable. Roll one out, no impact.
  
  [Client] ──► [LB] ──► [App Server 1] ──┐
                    ──► [App Server 2] ──┼──► [Redis Session Store]
                    ──► [App Server 3] ──┘       [Shared DB]
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_scalability.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
