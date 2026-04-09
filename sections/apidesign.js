// Section: apidesign
// Auto-extracted from index.html
const _html_apidesign = String.raw`
<div id="sec-apidesign" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge sd">SD Foundations · 05</span></div><div class="sec-title">API Design — REST, GraphQL, gRPC</div></div>
<div class="sec-lead">API design is the contract between your system and its clients. Get it wrong and you're stuck with a bad interface for years. REST, GraphQL, and gRPC each have a specific domain where they excel.</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
