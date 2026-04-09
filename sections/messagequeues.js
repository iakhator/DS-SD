// Section: messagequeues
// Auto-extracted from index.html
const _html_messagequeues = String.raw`
<div id="sec-messagequeues" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 06</span></div><div class="sec-title">Message Queues & Event-Driven Architecture</div></div>
<div class="sec-lead">Message queues decouple producers from consumers, enabling async processing, load leveling, and fault tolerance. Kafka is the dominant platform for high-throughput event streaming. Understanding when to use a queue vs direct call is a core system design skill.</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
