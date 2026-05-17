// Section: messagequeues
// Auto-extracted from index.html
const _html_messagequeues = String.raw`
<div id="sec-messagequeues" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 06</span></div><div class="sec-title">Message Queues & Event-Driven Architecture</div></div>
<div class="sec-lead">Message queues decouple producers from consumers, enabling async processing, load leveling, and fault tolerance. Kafka is the dominant platform for high-throughput event streaming. Understanding when to use a queue vs direct call is a core system design skill.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>A message queue is like a post office between two services. When you send a letter, you do not stand at the recipient's door waiting for them to read it — you drop it in the mailbox and walk away. The post office guarantees delivery even if the recipient is temporarily away, and the recipient processes their mail at their own pace. Without a queue, Service A calling Service B directly is like knocking on a door: if nobody answers, the conversation fails entirely. With a queue in between, Service A drops a message and moves on; Service B picks it up whenever it is ready. This is the essence of <strong>asynchronous, decoupled communication</strong>.</p>
<p>Message queues solve three distinct problems at once. First, they provide <strong>fault isolation</strong>: if the email service goes down, orders are not lost — they accumulate in the queue and are processed when the service recovers. Second, they enable <strong>load leveling</strong>: a sudden spike in orders (say, a flash sale) does not crash downstream services, because the queue absorbs the burst and consumers process at a steady rate. Third, they enable <strong>extensibility</strong>: adding a new downstream consumer (e.g., a loyalty-points service) requires zero changes to the producer. The trade-off is <strong>complexity vs resilience</strong>: queues introduce a new infrastructure component to operate, and reasoning about message ordering, duplicates, and replay requires careful design.</p>
<p>Reach for a message queue whenever a task does not need to be completed synchronously within the user's request, when you need to fan out one event to multiple consumers, or when consumers are unreliable and need retry logic. The most common mistake is using a queue to paper over a slow synchronous dependency instead of fixing the root cause — queues delay the pain, they do not eliminate it. Interviewers specifically probe delivery guarantees: know the difference between at-most-once, at-least-once, and exactly-once, and be able to explain why <strong>idempotent consumers</strong> are the practical solution to the exactly-once problem.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> At-least-once delivery with idempotent consumers is the pragmatic industry standard. Exactly-once delivery at the infrastructure level is theoretically achievable but operationally expensive — design your handlers to safely process the same message twice instead.</div>
<div class="h2">Why Message Queues</div>
<div class="arch-box"><pre>
WITHOUT QUEUE (tight coupling):
  Order Service ──directly calls──► Email Service
                ──directly calls──► Inventory Service
                ──directly calls──► Payment Service
  
  If Email Service is down → Order fails. Tight coupling = fragile.
  Black Friday spike: all services must scale together.

WITH QUEUE (loose coupling):
  Order Service ──► Kafka topic: orders.created
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         Email Worker  Inventory Worker  Analytics Worker
  
  Email goes down? Messages queue up. Replays when it comes back.
  Spike in orders? Workers scale independently. 
  Add new feature (loyalty points)? New worker, no changes to Order Service.

KAFKA KEY CONCEPTS:
  Topic: Named channel for messages. Append-only log.
  Partition: A topic is split into partitions for parallelism.
             Messages in a partition are ordered.
  Offset: Position of message in partition. Consumer tracks its offset.
  Consumer Group: Multiple consumers that together process a topic.
                  Each partition is consumed by one group member.
  Retention: Messages kept for configurable time (e.g., 7 days) even after read.
             Allows replay, multiple consumers, debugging.

DELIVERY GUARANTEES:
  At-most-once: Fire and forget. May lose messages. Fast.
  At-least-once: Retry until ACK. May duplicate. Most common.
  Exactly-once: Via transactions + idempotent consumers. Complex.
  
  Best practice: at-least-once delivery + idempotent consumers
  Make handlers idempotent: process_order(id=123) twice = same result
  Track processed message IDs in DB/Redis to skip duplicates.
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_messagequeues.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
