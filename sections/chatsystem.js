// Section: chatsystem
// Auto-extracted from index.html
const _html_chatsystem = String.raw`
<div id="sec-chatsystem" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 13</span></div><div class="sec-title">Design: Chat System</div></div>
<div class="sec-lead">Chat systems are the canonical real-time system design. The key challenges: persistent connections at scale (WebSocket vs polling), message ordering, delivery guarantees, online presence, and group chat fan-out.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>A chat system is fundamentally a problem of maintaining persistent, bidirectional pipes between millions of people simultaneously, then routing a message from one pipe to another in under 100 milliseconds. Think of each chat server as a telephone switchboard operator: it knows exactly which callers are currently plugged into its board (active WebSocket connections), but when a message needs to reach someone on a different switchboard it has to hand off through a shared relay. The central design challenge is that HTTP — the workhorse of the web — is stateless and request-response, which is a terrible fit for real-time push. Every architectural decision flows from choosing the right connection model.</p>
<p>The core trade-off is between connection statefulness and horizontal scalability. WebSockets give true bidirectional real-time communication with low overhead, but each connection is pinned to a specific server for its lifetime. When User A (connected to Server 1) sends a message to User B (connected to Server 2), Server 1 has no direct path to B's connection — it must publish to a shared pub/sub layer (typically Redis) that Server 2 subscribes to on B's behalf. This pub/sub relay is what makes stateful WebSocket servers horizontally scalable: the servers themselves are stateless in the sense that any server can be added or removed as long as they all share the same pub/sub backbone. For message storage, Cassandra is the natural fit: its partition-key model maps perfectly to the "give me the last N messages for conversation X" query pattern, and its write-optimized LSM tree handles the high write volume of a busy chat system.</p>
<p>In an interview, establish the connection model first (WebSocket), then work outward to message persistence, then fan-out (1:1 vs group chat), then presence and delivery receipts. A very common mistake is using a relational database for message storage with a schema like a single <code>messages</code> table indexed by timestamp — this works fine for thousands of messages but grinds to a halt when a table has billions of rows and every read is a range scan. Another misconception is that "real-time" requires complex infrastructure; for low-scale products, long polling on a well-indexed database can be surprisingly effective and much simpler to operate than a WebSocket cluster.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> The Redis pub/sub layer between chat servers is what makes the architecture scale — without it, you need an O(N^2) mesh of direct connections between every pair of servers. With it, each server subscribes only to the channels of users it currently hosts, and the fan-out is handled by Redis internally.</div>
<div class="h2">Connection Strategy</div>
<div class="arch-box"><pre>
POLLING vs LONG POLLING vs WEBSOCKET:

Short Polling: Client asks "any messages?" every 5s
  Simple. High bandwidth waste. High latency (up to poll interval).
  
Long Polling: Client asks, server holds until message or timeout
  Better latency. Still stateless HTTP. Harder to scale (connections held).
  
WebSocket: Persistent bidirectional connection
  True real-time. Low latency. Stateful — connection tied to server.
  Need sticky routing (connection must stay on same chat server).
  Use nginx with IP hash or connection registry.
  
WebSocket is the right answer for chat.
</pre></div>

<div class="h2">Architecture</div>
<div class="arch-box"><pre>
FULL CHAT ARCHITECTURE:
──────────────────────────────────────────────────────────

[User A] ←──WS──► [Chat Server 1]
                          │
                   Pub/Sub (Redis)
                          │
[User B] ←──WS──► [Chat Server 2]

When User A (on Server 1) messages User B (on Server 2):
1. A sends message over WebSocket to Server 1
2. Server 1 persists message to Message DB (Cassandra)
3. Server 1 publishes to Redis channel: "user:B:messages"  
4. Server 2 (where B is connected) subscribes to B's channel
5. Server 2 delivers to B over WebSocket
6. B's client sends ACK → Server updates delivery status

MESSAGE STORAGE SCHEMA (Cassandra):
  messages: {
    channel_id:   UUID (partition key — all msgs of a convo together)
    message_id:   TIMEUUID (cluster key — time-ordered within partition)
    sender_id:    UUID
    content:      TEXT
    type:         ENUM(text, image, video)
    status:       ENUM(sent, delivered, read)
  }
  
  Why Cassandra?
  - Write-heavy (every message is a write)
  - Queries are always: "last N messages for channel X"
  - No complex joins needed
  - Scales horizontally across data centers

ONLINE PRESENCE:
  Redis: user:status:{user_id} = "online" with TTL=30s
  Heartbeat: client pings every 20s → reset TTL
  On disconnect: delete key immediately
  
  Presence is eventually consistent — OK for chat (nobody needs exact ms)

GROUP CHAT:
  Max 500 members: fan-out on write (like Twitter/feed)
  Push message to all member message queues
  
  Large groups (5000+ members, Slack channels):
  Fan-out on read — don't push to all, deliver when requested
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_chatsystem.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
