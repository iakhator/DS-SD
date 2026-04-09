// Section: queue
// Auto-extracted from index.html
const _html_queue = String.raw`
<div id="sec-queue" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Linear · 07</span></div><div class="sec-title">Queue & Deque</div></div>
<div class="sec-lead">Queue is FIFO. Use for BFS, task scheduling, rate limiting. Deque (double-ended queue) lets you add/remove from both ends in O(1) — critical for the sliding window maximum problem and implementing both stack and queue. In interviews, "use a queue" usually means "use BFS."</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="alert key"><span class="alert-icon">🔑</span><strong>Queue = BFS.</strong> Every BFS problem uses a queue. Put start node in queue, process level by level, add unvisited neighbors. See Graphs section for full BFS problems.</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','q-impl')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','q-impl')">Python</button></div>
<div class="lang-panel active" id="q-impl-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Queue Implementation & Common Use</span></div><pre><span class="cmt">// JS: use array as queue (shift is O(n)! Use a pointer for O(1))</span>
<span class="kw">class</span> <span class="cls">Queue</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.data = []; <span class="kw">this</span>.head = <span class="num">0</span> }
  <span class="fn">push</span>(v)     { <span class="kw">this</span>.data.<span class="fn">push</span>(v) }
  <span class="fn">pop</span>()       { <span class="kw">return</span> <span class="kw">this</span>.data[<span class="kw">this</span>.head++] }
  <span class="fn">peek</span>()      { <span class="kw">return</span> <span class="kw">this</span>.data[<span class="kw">this</span>.head] }
  <span class="kw">get</span> <span class="fn">size</span>()  { <span class="kw">return</span> <span class="kw">this</span>.data.length - <span class="kw">this</span>.head }
  <span class="kw">get</span> <span class="fn">empty</span>() { <span class="kw">return</span> <span class="kw">this</span>.size === <span class="num">0</span> }
}

<span class="cmt">// BFS template with queue</span>
<span class="kw">function</span> <span class="fn">bfs</span>(graph, start) {
  <span class="kw">const</span> visited = <span class="kw">new</span> <span class="cls">Set</span>([start])
  <span class="kw">const</span> queue = [start]
  <span class="kw">while</span> (queue.length) {
    <span class="kw">const</span> node = queue.<span class="fn">shift</span>()
    <span class="kw">for</span> (<span class="kw">const</span> neighbor <span class="kw">of</span> graph[node] ?? []) {
      <span class="kw">if</span> (!visited.<span class="fn">has</span>(neighbor)) {
        visited.<span class="fn">add</span>(neighbor)
        queue.<span class="fn">push</span>(neighbor)
      }
    }
  }
}</pre></div></div>
<div class="lang-panel" id="q-impl-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Queue (Python — collections.deque)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque

<span class="py-cmt"># deque is O(1) for both ends — use instead of list for queue</span>
q = deque()
q.append(<span class="py-num">1</span>)      <span class="py-cmt"># push right — O(1)</span>
q.appendleft(<span class="py-num">0</span>)  <span class="py-cmt"># push left  — O(1)</span>
q.popleft()       <span class="py-cmt"># pop left   — O(1) FIFO</span>
q.pop()           <span class="py-cmt"># pop right  — O(1) LIFO</span>

<span class="py-cmt"># BFS template</span>
<span class="py-kw">def</span> <span class="py-fn">bfs</span>(graph, start):
    visited = {start}
    queue = deque([start])
    <span class="py-kw">while</span> queue:
        node = queue.popleft()
        <span class="py-kw">for</span> nbr <span class="py-kw">in</span> graph.get(node, []):
            <span class="py-kw">if</span> nbr <span class="py-kw">not in</span> visited:
                visited.add(nbr); queue.append(nbr)</pre></div></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_queue.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
