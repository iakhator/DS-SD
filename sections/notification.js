// Section: notification
// Auto-extracted from index.html
const _html_notification = String.raw`
<div id="sec-notification" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">Case Study · 11</span></div><div class="sec-title">Design: Notification System</div></div>
<div class="sec-lead">A notification system delivers messages across push, email, and SMS. The core challenges are: reliability (don't lose a notification), deduplication (don't send twice), rate limiting (don't spam), and scale (millions of notifications per second).</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
