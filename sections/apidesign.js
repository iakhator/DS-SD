// Section: apidesign
// Auto-extracted from index.html
const _html_apidesign = String.raw`
<div id="sec-apidesign" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 05</span></div><div class="sec-title">API Design — REST, GraphQL, gRPC</div></div>
<div class="sec-lead">API design is the contract between your system and its clients. Get it wrong and you're stuck with a bad interface for years. REST, GraphQL, and gRPC each have a specific domain where they excel.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>An API is a contract — a promise your system makes to everyone who depends on it. Think of it like a restaurant menu. REST is a printed menu with fixed items: each dish (endpoint) is clearly named, predictably described, and ordered the same way every time. GraphQL is like telling the chef exactly what ingredients you want in your meal: the kitchen can serve almost any combination, but the kitchen staff must be prepared to handle any combination the customer dreams up. gRPC is like a private intercom between the restaurant and its wholesale supplier: highly efficient, purpose-built for that specific relationship, but not something a random customer would use.</p>
<p>The choice of API style has long-term architectural consequences because APIs are public contracts that are expensive to break. REST's simplicity makes it universally accessible and naturally cacheable via standard HTTP infrastructure — a massive operational advantage for public-facing APIs. GraphQL eliminates the over-fetching problem that plagues REST (where a mobile client is forced to receive 40 fields when it only needs 3), but it does so at the cost of HTTP-level caching and introduces a query complexity attack surface. gRPC's binary protocol over HTTP/2 makes it 5-10x more efficient than REST for inter-service calls, but it is opaque to standard HTTP tooling and harder to debug. The core trade-off is <strong>accessibility vs efficiency</strong>.</p>
<p>In interviews, default to REST for any user-facing or public API, gRPC for high-throughput internal microservice calls, and GraphQL when you have a complex graph of entities and clients with highly varied data needs (such as a mobile app alongside a desktop app). The most common mistake is designing REST endpoints that map to database tables one-to-one, which leaks your storage model into your public contract and makes future schema changes breaking. Interviewers probe whether you know to version APIs proactively and to distinguish between a <code>401 Unauthorized</code> (not authenticated) and a <code>403 Forbidden</code> (authenticated but not allowed).</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> A published API is forever. Design for the consumer, not the database. Build in versioning from day one, use resource-oriented URLs, and treat every field you expose as a long-term commitment — removing it later will break someone's integration.</div>
<div class="h2">REST vs GraphQL vs gRPC</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Feature</th><th>REST</th><th>GraphQL</th><th>gRPC</th></tr></thead>
<tbody>
<tr><td>Best for</td><td>Public APIs, CRUD services</td><td>Mobile apps, complex data</td><td>Internal microservices</td></tr>
<tr><td>Query flexibility</td><td>Fixed endpoints</td><td>Client defines query</td><td>Fixed methods (like RPC)</td></tr>
<tr><td>Over/under-fetching</td><td>Common problem</td><td>Solved by design</td><td>Controlled schemas</td></tr>
<tr><td>Performance</td><td>Good</td><td>Good (single roundtrip)</td><td>Excellent (HTTP/2, binary)</td></tr>
<tr><td>Caching</td><td>Native HTTP caching</td><td>Harder (single POST)</td><td>Custom</td></tr>
<tr><td>Tooling</td><td>Excellent (universal)</td><td>Good (Apollo, etc)</td><td>Good (protobuf IDL)</td></tr>
</tbody>
</table></div>

<div class="h2">REST Best Practices</div>
<div class="arch-box"><pre>
RESOURCE NAMING:
  /users          GET=list, POST=create
  /users/{id}     GET=read, PUT=replace, PATCH=update, DELETE=delete
  /users/{id}/posts          GET list user's posts
  /users/{id}/posts/{postId} GET specific post

  Plural nouns, not verbs. /users not /getUser.
  Hierarchy shows ownership: /orders/{id}/items

HTTP STATUS CODES (use correctly):
  200 OK           GET/PUT/PATCH success
  201 Created      POST success (include Location header)
  204 No Content   DELETE success (no body)
  400 Bad Request  Validation error (include error detail in body)
  401 Unauthorized Missing or invalid credentials
  403 Forbidden    Authenticated but not authorized
  404 Not Found    Resource doesn't exist
  409 Conflict     Race condition, duplicate (idempotent key conflict)
  422 Unprocessable Entity  Semantic validation error
  429 Too Many Requests     Rate limited
  500 Internal Server Error Never return stack traces to clients!

PAGINATION:
  Cursor-based (best): GET /posts?cursor=abc123&limit=20
    Stable pagination even if items inserted/deleted.
    Used by: Twitter, Facebook, Stripe.
  
  Offset-based (simpler): GET /posts?offset=40&limit=20
    Unstable (items shift when new content inserted).
    Easy to implement, fine for low-write data.

VERSIONING:
  URL path: /v1/users (most common, most explicit)
  Header: Accept: application/vnd.api.v2+json
  
  Never break a published API — add fields, never remove.
  Deprecate with Sunset header: Sunset: Sat, 31 Dec 2025 23:59:59 GMT
</pre></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_apidesign.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
