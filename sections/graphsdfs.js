// Section: graphsdfs
// Auto-extracted from index.html
const _html_graphsdfs = String.raw`
<div id="sec-graphsdfs" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Graphs · 15</span></div><div class="sec-title">Graphs — DFS & Advanced</div></div>
<div class="sec-lead">DFS explores as deep as possible before backtracking. Use it for: connected components, cycle detection, topological sort, SCCs. Union-Find is a specialized structure that handles dynamic connectivity in near O(1) per operation.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Topological Sort (Kahn's Algorithm)</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gdfs-topo')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gdfs-topo')">Python</button></div>
<div class="lang-panel active" id="gdfs-topo-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Topological Sort — Kahn's BFS</span></div><pre><span class="kw">function</span> <span class="fn">topoSort</span>(n, edges) {
  <span class="kw">const</span> adj = <span class="cls">Array</span>.<span class="fn">from</span>({length:n},()=>[])
  <span class="kw">const</span> inDegree = <span class="kw">new</span> <span class="cls">Array</span>(n).<span class="fn">fill</span>(<span class="num">0</span>)
  <span class="kw">for</span> (<span class="kw">const</span> [u,v] <span class="kw">of</span> edges) { adj[u].<span class="fn">push</span>(v); inDegree[v]++ }
  <span class="kw">const</span> q=[], order=[]
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>;i&lt;n;i++) <span class="kw">if</span>(inDegree[i]===<span class="num">0</span>) q.<span class="fn">push</span>(i)
  <span class="kw">while</span>(q.length) {
    <span class="kw">const</span> u=q.<span class="fn">shift</span>()
    order.<span class="fn">push</span>(u)
    <span class="kw">for</span>(<span class="kw">const</span> v <span class="kw">of</span> adj[u]) <span class="kw">if</span>(--inDegree[v]===<span class="num">0</span>) q.<span class="fn">push</span>(v)
  }
  <span class="kw">return</span> order.length===n ? order : []  <span class="cmt">// [] = cycle detected</span>
}</pre></div></div>
<div class="lang-panel" id="gdfs-topo-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Topological Sort — Kahn's</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">topo_sort</span>(n, edges):
    adj = [[] <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(n)]
    in_deg = [<span class="py-num">0</span>] * n
    <span class="py-kw">for</span> u, v <span class="py-kw">in</span> edges: adj[u].append(v); in_deg[v] += <span class="py-num">1</span>
    q = deque(i <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(n) <span class="py-kw">if</span> in_deg[i] == <span class="py-num">0</span>)
    order = []
    <span class="py-kw">while</span> q:
        u = q.popleft(); order.append(u)
        <span class="py-kw">for</span> v <span class="py-kw">in</span> adj[u]:
            in_deg[v] -= <span class="py-num">1</span>
            <span class="py-kw">if</span> in_deg[v] == <span class="py-num">0</span>: q.append(v)
    <span class="py-kw">return</span> order <span class="py-kw">if</span> <span class="py-fn">len</span>(order) == n <span class="py-kw">else</span> []</pre></div></div>

<div class="h2">5 Problems — Graphs DFS</div>
<div class="problems-grid">

<problem-card num="P1" title="Clone Graph" difficulty="medium" tags="DFS,HashMap">
<div class="prob-desc">Return a deep copy of the graph. Each node has a value and a list of neighbors.</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gdfs-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gdfs-p1')">Python</button></div>
<div class="lang-panel active" id="gdfs-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">DFS + HashMap</span></div><pre><span class="kw">function</span> <span class="fn">cloneGraph</span>(node) {
  <span class="kw">const</span> map = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">function</span> <span class="fn">dfs</span>(n) {
    <span class="kw">if</span>(map.<span class="fn">has</span>(n)) <span class="kw">return</span> map.<span class="fn">get</span>(n)
    <span class="kw">const</span> copy = {val:n.val, neighbors:[]}
    map.<span class="fn">set</span>(n, copy)
    copy.neighbors = n.neighbors.<span class="fn">map</span>(<span class="fn">dfs</span>)
    <span class="kw">return</span> copy
  }
  <span class="kw">return</span> node ? <span class="fn">dfs</span>(node) : <span class="kw">null</span>
}</pre></div></div>
<div class="lang-panel" id="gdfs-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">DFS + HashMap</span></div><pre><span class="py-kw">def</span> <span class="py-fn">clone_graph</span>(node):
    memo = {}
    <span class="py-kw">def</span> <span class="py-fn">dfs</span>(n):
        <span class="py-kw">if</span> n <span class="py-kw">in</span> memo: <span class="py-kw">return</span> memo[n]
        copy = Node(n.val)
        memo[n] = copy
        copy.neighbors = [<span class="py-fn">dfs</span>(nb) <span class="py-kw">for</span> nb <span class="py-kw">in</span> n.neighbors]
        <span class="py-kw">return</span> copy
    <span class="py-kw">return</span> <span class="py-fn">dfs</span>(node) <span class="py-kw">if</span> node <span class="py-kw">else</span> <span class="py-kw">None</span></pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Course Schedule II (Topological Sort)" difficulty="medium" tags="Topological Sort,DAG">
<div class="prob-desc">Return course order to finish all courses given prerequisites. Return empty if impossible (cycle).</div>
<div class="prob-example">numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]] → [0,2,1,3] or [0,1,2,3]</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gdfs-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gdfs-p2')">Python</button></div>
<div class="lang-panel active" id="gdfs-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Kahn's Algorithm</span></div><pre><span class="kw">function</span> <span class="fn">findOrder</span>(n, prereqs) {
  <span class="kw">const</span> adj = <span class="cls">Array</span>.<span class="fn">from</span>({length:n},()=>[])
  <span class="kw">const</span> ind = <span class="kw">new</span> <span class="cls">Array</span>(n).<span class="fn">fill</span>(<span class="num">0</span>)
  <span class="kw">for</span>(<span class="kw">const</span>[a,b] <span class="kw">of</span> prereqs){adj[b].<span class="fn">push</span>(a);ind[a]++}
  <span class="kw">const</span> q=[],res=[]
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>;i&lt;n;i++) <span class="kw">if</span>(ind[i]===<span class="num">0</span>)q.<span class="fn">push</span>(i)
  <span class="kw">while</span>(q.length){
    <span class="kw">const</span> u=q.<span class="fn">shift</span>();res.<span class="fn">push</span>(u)
    <span class="kw">for</span>(<span class="kw">const</span> v <span class="kw">of</span> adj[u]) <span class="kw">if</span>(--ind[v]===<span class="num">0</span>)q.<span class="fn">push</span>(v)
  }
  <span class="kw">return</span> res.length===n?res:[]
}</pre></div></div>
<div class="lang-panel" id="gdfs-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Kahn's</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">find_order</span>(n, prereqs):
    adj = [[] <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(n)]; ind = [<span class="py-num">0</span>]*n
    <span class="py-kw">for</span> a,b <span class="py-kw">in</span> prereqs: adj[b].append(a); ind[a]+=<span class="py-num">1</span>
    q=deque(i <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(n) <span class="py-kw">if</span> ind[i]==<span class="py-num">0</span>); res=[]
    <span class="py-kw">while</span> q:
        u=q.popleft(); res.append(u)
        <span class="py-kw">for</span> v <span class="py-kw">in</span> adj[u]:
            ind[v]-=<span class="py-num">1</span>
            <span class="py-kw">if</span> ind[v]==<span class="py-num">0</span>: q.append(v)
    <span class="py-kw">return</span> res <span class="py-kw">if</span> <span class="py-fn">len</span>(res)==n <span class="py-kw">else</span> []</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Pacific Atlantic Water Flow" difficulty="hard" tags="Multi-source BFS,Set Intersection">
<div class="prob-desc">Given a height grid on an island bordered by Pacific (top/left) and Atlantic (bottom/right) oceans. Return cells from which water can flow to both oceans.</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Reverse BFS from both oceans, find intersection <span class="approach-tc">O(mn)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gdfs-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gdfs-p5')">Python</button></div>
<div class="lang-panel active" id="gdfs-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Reverse BFS</span></div><pre><span class="kw">function</span> <span class="fn">pacificAtlantic</span>(h) {
  <span class="kw">const</span> R=h.length,C=h[<span class="num">0</span>].length,dirs=[[<span class="num">1</span>,<span class="num">0</span>],[-<span class="num">1</span>,<span class="num">0</span>],[<span class="num">0</span>,<span class="num">1</span>],[<span class="num">0</span>,-<span class="num">1</span>]]
  <span class="kw">const</span> <span class="fn">bfs</span> = starts => {
    <span class="kw">const</span> vis=<span class="kw">new</span> <span class="cls">Set</span>(starts.<span class="fn">map</span>(([r,c])=>\`${r},${c}\`)), q=[...starts]
    <span class="kw">while</span>(q.length){
      <span class="kw">const</span>[r,c]=q.<span class="fn">shift</span>()
      <span class="kw">for</span>(<span class="kw">const</span>[dr,dc] <span class="kw">of</span> dirs){
        <span class="kw">const</span>[nr,nc]=[r+dr,c+dc]
        <span class="kw">const</span> key=\`${nr},${nc}\`
        <span class="kw">if</span>(nr>=<span class="num">0</span>&&nr&lt;R&&nc>=<span class="num">0</span>&&nc&lt;C&&!vis.<span class="fn">has</span>(key)&&h[nr][nc]>=h[r][c]){vis.<span class="fn">add</span>(key);q.<span class="fn">push</span>([nr,nc])}
      }
    }
    <span class="kw">return</span> vis
  }
  <span class="kw">const</span> pac=[],atl=[]
  <span class="kw">for</span>(<span class="kw">let</span> r=<span class="num">0</span>;r&lt;R;r++){pac.<span class="fn">push</span>([r,<span class="num">0</span>]);atl.<span class="fn">push</span>([r,C-<span class="num">1</span>])}
  <span class="kw">for</span>(<span class="kw">let</span> c=<span class="num">0</span>;c&lt;C;c++){pac.<span class="fn">push</span>([<span class="num">0</span>,c]);atl.<span class="fn">push</span>([R-<span class="num">1</span>,c])}
  <span class="kw">const</span> pSet=<span class="fn">bfs</span>(pac),aSet=<span class="fn">bfs</span>(atl)
  <span class="kw">return</span> [...pSet].<span class="fn">filter</span>(k=>aSet.<span class="fn">has</span>(k)).<span class="fn">map</span>(k=>k.<span class="fn">split</span>(<span class="str">','</span>).<span class="fn">map</span>(Number))
}</pre></div></div>
<div class="lang-panel" id="gdfs-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Reverse BFS</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">pacific_atlantic</span>(h):
    R, C = <span class="py-fn">len</span>(h), <span class="py-fn">len</span>(h[<span class="py-num">0</span>])
    <span class="py-kw">def</span> <span class="py-fn">bfs</span>(starts):
        vis = <span class="py-fn">set</span>(starts); q = deque(starts)
        <span class="py-kw">while</span> q:
            r, c = q.popleft()
            <span class="py-kw">for</span> dr, dc <span class="py-kw">in</span> [(<span class="py-num">1</span>,<span class="py-num">0</span>),(-<span class="py-num">1</span>,<span class="py-num">0</span>),(<span class="py-num">0</span>,<span class="py-num">1</span>),(<span class="py-num">0</span>,-<span class="py-num">1</span>)]:
                nr, nc = r+dr, c+dc
                <span class="py-kw">if</span> <span class="py-num">0</span>&lt;=nr&lt;R <span class="py-kw">and</span> <span class="py-num">0</span>&lt;=nc&lt;C <span class="py-kw">and</span> (nr,nc) <span class="py-kw">not in</span> vis <span class="py-kw">and</span> h[nr][nc]>=h[r][c]:
                    vis.add((nr,nc)); q.append((nr,nc))
        <span class="py-kw">return</span> vis
    pac = [(r,<span class="py-num">0</span>) <span class="py-kw">for</span> r <span class="py-kw">in</span> <span class="py-fn">range</span>(R)] + [(<span class="py-num">0</span>,c) <span class="py-kw">for</span> c <span class="py-kw">in</span> <span class="py-fn">range</span>(C)]
    atl = [(r,C-<span class="py-num">1</span>) <span class="py-kw">for</span> r <span class="py-kw">in</span> <span class="py-fn">range</span>(R)] + [(R-<span class="py-num">1</span>,c) <span class="py-kw">for</span> c <span class="py-kw">in</span> <span class="py-fn">range</span>(C)]
    <span class="py-kw">return</span> [[r,c] <span class="py-kw">for</span> r,c <span class="py-kw">in</span> <span class="py-fn">bfs</span>(pac) & <span class="py-fn">bfs</span>(atl)]</pre></div>
</div>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_graphsdfs.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
