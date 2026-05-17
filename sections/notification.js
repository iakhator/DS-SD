// Section: notification
// Auto-extracted from index.html
const _html_notification = String.raw`
<div id="sec-notification" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 11</span></div><div class="sec-title">Design: Notification System</div></div>
<div class="sec-lead">A notification system delivers messages across push, email, and SMS. The core challenges are: reliability (don't lose a notification), deduplication (don't send twice), rate limiting (don't spam), and scale (millions of notifications per second).</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>A notification system is like a postal service that must deliver letters across several different countries (push, email, SMS), each with its own rules and reliability guarantees. When a triggering event happens — someone liked your photo, your subscription is renewing — the system must figure out which user to notify, which channel they prefer, render the right message in their language, and hand it off to a third-party delivery provider without losing it or sending it twice. The fundamental design challenge is that none of these external providers (APNs, FCM, SendGrid, Twilio) are under your control, so your architecture must tolerate their partial failures without losing data or spamming users.</p>
<p>The core trade-off is between coupling and reliability. If your application code calls APNs or SendGrid directly in the same request cycle that triggered the notification, a provider outage blocks your entire feature. The resolution is to decouple via a message queue: the triggering service drops a message into Kafka and moves on immediately, while dedicated worker processes consume the queue at their own pace and handle retries with exponential backoff. This makes delivery asynchronous and resilient, but introduces a new problem: Kafka guarantees at-least-once delivery, so you <em>will</em> process the same message more than once during failure recovery. Idempotency — storing a <code>message_id</code> in Redis and skipping any ID already seen — is therefore not optional; it is load-bearing infrastructure.</p>
<p>In an interview, the first thing to address is the reliability contract: does the product guarantee delivery, or is best-effort acceptable? That answer shapes everything downstream. A very common mistake is treating all notification channels as interchangeable when they have wildly different latency, cost, and reliability profiles — SMS is expensive and slow, push is free and fast but silently drops if the device is offline, and email lands in spam unpredictably. Another frequent gap is ignoring user preferences; a well-designed system checks opt-out and per-channel preference settings before any delivery attempt, not as an afterthought.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Deduplication via a Redis set with a short TTL is the simplest insurance against at-least-once delivery becoming "accidentally twice" delivery — always add it before your system goes anywhere near production traffic.</div>
<div class="h2">Architecture</div>
<div class="arch-box"><pre>
NOTIFICATION FLOW:
──────────────────────────────────────────────────────────────────

Trigger Sources:
  ├── API call (service A wants to notify user B)
  ├── Scheduled events (billing, reminders)
  └── User activity (like, follow, comment)
           │
           ▼
  Notification Service (validates, enriches, routes)
           │
           ▼
  Message Queue (Kafka topics per channel)
  ├── notifications.push
  ├── notifications.email  
  └── notifications.sms
           │
    ┌──────┴──────────────────┐
    │                         │
    ▼                         ▼
Push Workers              Email Workers
(APNs for iOS,            (SendGrid/SES)
 FCM for Android)
    │
    ▼
Device Token Registry
(maps user_id → [device_tokens])

KEY COMPONENTS:
1. Template Service — stores and renders notification templates
   "{{user}} liked your photo" → filled with actual data
   
2. Preferences Service — respects user opt-outs per channel/type
   "Don't email me about likes, only follows"
   
3. Deduplication — message_id stored in Redis SET with TTL
   Before sending: if redis.SISMEMBER(sent:user:channel, msg_id) → skip
   
4. Retry with backoff — exponential backoff on 3rd party API failures
   APNs down? Retry at 1s, 2s, 4s, 8s... up to max 3 times
   
5. Analytics — track delivered/opened/clicked via webhook callbacks

RELIABILITY:
  - Kafka guarantees at-least-once delivery
  - Deduplication at delivery layer prevents duplicate sends
  - Dead letter queue (DLQ) for permanently failed notifications
  - PagerDuty alert if DLQ grows beyond threshold
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_notification.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
