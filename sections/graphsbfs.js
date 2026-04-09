// Section: graphsbfs
// Auto-extracted from index.html
const _html_graphsbfs = String.raw`
<div id="sec-graphsbfs" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Graphs · 14</span></div><div class="sec-title">Graphs — BFS</div></div>
<div class="sec-lead">A graph is a collection of nodes (vertices) and edges. BFS explores level by level and is the go-to for shortest paths in unweighted graphs. Every BFS problem has the same structure: queue, visited set, level counter.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Graph Representations</div>
<div class="diag"><pre>
Adjacency List (most common in interviews):
  graph = {0:[1,2], 1:[0,3], 2:[0,3], 3:[1,2,4], 4:[3]}
  Space: O(V+E). Lookup neighbors: O(degree)

Adjacency Matrix:
  grid[i][j] = 1 if edge i→j exists
  Space: O(V²). Lookup: O(1). Bad for sparse graphs.

Grid as Graph:
  4 directions = [up, down, left, right]
  Cell (r,c) → neighbors: (r±1,c), (r,c±1)
</pre></div>

<div class="h2">BFS Template</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gbfs-template')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gbfs-template')">Python</button></div>
<div class="lang-panel active" id="gbfs-template-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS Shortest Path Template</span></div><pre><span class="kw">function</span> <span class="fn">bfsShortestPath</span>(graph, start, end) {
  <span class="kw">const</span> queue = [[start, <span class="num">0</span>]]  <span class="cmt">// [node, distance]</span>
  <span class="kw">const</span> visited = <span class="kw">new</span> <span class="cls">Set</span>([start])
  <span class="kw">while</span> (queue.length) {
    <span class="kw">const</span> [node, dist] = queue.<span class="fn">shift</span>()
    <span class="kw">if</span> (node === end) <span class="kw">return</span> dist
    <span class="kw">for</span> (<span class="kw">const</span> nbr <span class="kw">of</span> graph[node] ?? []) {
      <span class="kw">if</span> (!visited.<span class="fn">has</span>(nbr)) {
        visited.<span class="fn">add</span>(nbr)
        queue.<span class="fn">push</span>([nbr, dist+<span class="num">1</span>])
      }
    }
  }
  <span class="kw">return</span> -<span class="num">1</span>  <span class="cmt">// unreachable</span>
}</pre></div></div>
<div class="lang-panel" id="gbfs-template-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS Template (Python)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">bfs_shortest</span>(graph, start, end):
    queue = deque([(start, <span class="py-num">0</span>)])
    visited = {start}
    <span class="py-kw">while</span> queue:
        node, dist = queue.popleft()
        <span class="py-kw">if</span> node == end: <span class="py-kw">return</span> dist
        <span class="py-kw">for</span> nbr <span class="py-kw">in</span> graph.get(node, []):
            <span class="py-kw">if</span> nbr <span class="py-kw">not in</span> visited:
                visited.add(nbr); queue.append((nbr, dist+<span class="py-num">1</span>))
    <span class="py-kw">return</span> -<span class="py-num">1</span></pre></div></div>

<div class="h2">5 Problems — Graphs BFS</div>
<div class="problems-grid">

<problem-card num="P1" title="Number of Islands" difficulty="medium" tags="BFS/DFS,Grid">
<div class="prob-desc">Count the number of islands in a grid (groups of '1' surrounded by '0'). Connected vertically/horizontally.</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gbfs-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gbfs-p1')">Python</button></div>
<div class="lang-panel active" id="gbfs-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS Flood Fill</span></div><pre><span class="kw">function</span> <span class="fn">numIslands</span>(grid) {
  <span class="kw">const</span> R=grid.length, C=grid[<span class="num">0</span>].length
  <span class="kw">let</span> count=<span class="num">0</span>
  <span class="kw">const</span> bfs = (r, c) => {
    <span class="kw">const</span> q=[[r,c]]; grid[r][c]=<span class="str">'0'</span>
    <span class="kw">const</span> dirs=[[<span class="num">1</span>,<span class="num">0</span>],[-<span class="num">1</span>,<span class="num">0</span>],[<span class="num">0</span>,<span class="num">1</span>],[<span class="num">0</span>,-<span class="num">1</span>]]
    <span class="kw">while</span>(q.length) {
      <span class="kw">const</span>[r2,c2]=q.<span class="fn">shift</span>()
      <span class="kw">for</span>(<span class="kw">const</span>[dr,dc] <span class="kw">of</span> dirs) {
        <span class="kw">const</span>[nr,nc]=[r2+dr,c2+dc]
        <span class="kw">if</span>(nr>=<span class="num">0</span>&&nr&lt;R&&nc>=<span class="num">0</span>&&nc&lt;C&&grid[nr][nc]===<span class="str">'1'</span>){grid[nr][nc]=<span class="str">'0'</span>;q.<span class="fn">push</span>([nr,nc])}
      }
    }
  }
  <span class="kw">for</span>(<span class="kw">let</span> r=<span class="num">0</span>;r&lt;R;r++) <span class="kw">for</span>(<span class="kw">let</span> c=<span class="num">0</span>;c&lt;C;c++) <span class="kw">if</span>(grid[r][c]===<span class="str">'1'</span>){<span class="fn">bfs</span>(r,c);count++}
  <span class="kw">return</span> count
}</pre></div></div>
<div class="lang-panel" id="gbfs-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">DFS Flood Fill</span></div><pre><span class="py-kw">def</span> <span class="py-fn">num_islands</span>(grid):
    <span class="py-kw">def</span> <span class="py-fn">dfs</span>(r, c):
        <span class="py-kw">if not</span> (<span class="py-num">0</span> &lt;= r &lt; <span class="py-fn">len</span>(grid) <span class="py-kw">and</span> <span class="py-num">0</span> &lt;= c &lt; <span class="py-fn">len</span>(grid[<span class="py-num">0</span>]) <span class="py-kw">and</span> grid[r][c] == <span class="py-str">'1'</span>): <span class="py-kw">return</span>
        grid[r][c] = <span class="py-str">'0'</span>
        <span class="py-kw">for</span> dr, dc <span class="py-kw">in</span> [(<span class="py-num">1</span>,<span class="py-num">0</span>),(-<span class="py-num">1</span>,<span class="py-num">0</span>),(<span class="py-num">0</span>,<span class="py-num">1</span>),(<span class="py-num">0</span>,-<span class="py-num">1</span>)]: <span class="py-fn">dfs</span>(r+dr, c+dc)
    count = <span class="py-num">0</span>
    <span class="py-kw">for</span> r <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(grid)):
        <span class="py-kw">for</span> c <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(grid[<span class="py-num">0</span>])):
            <span class="py-kw">if</span> grid[r][c] == <span class="py-str">'1'</span>: <span class="py-fn">dfs</span>(r, c); count += <span class="py-num">1</span>
    <span class="py-kw">return</span> count</pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Rotting Oranges (Multi-source BFS)" difficulty="medium" tags="Multi-source BFS,Grid">
<div class="prob-desc">Grid with 0=empty, 1=fresh, 2=rotten. Each minute, rotten oranges infect adjacent fresh ones. Return minutes to rot all, or -1.</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Multi-source BFS — start from ALL rotten at once <span class="approach-tc">O(mn)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gbfs-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gbfs-p2')">Python</button></div>
<div class="lang-panel active" id="gbfs-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Multi-source BFS</span></div><pre><span class="kw">function</span> <span class="fn">orangesRotting</span>(grid) {
  <span class="kw">const</span> R=grid.length, C=grid[<span class="num">0</span>].length
  <span class="kw">const</span> q=[]; <span class="kw">let</span> fresh=<span class="num">0</span>, time=<span class="num">0</span>
  <span class="kw">for</span>(<span class="kw">let</span> r=<span class="num">0</span>;r&lt;R;r++) <span class="kw">for</span>(<span class="kw">let</span> c=<span class="num">0</span>;c&lt;C;c++) {
    <span class="kw">if</span>(grid[r][c]===<span class="num">2</span>) q.<span class="fn">push</span>([r,c])
    <span class="kw">else if</span>(grid[r][c]===<span class="num">1</span>) fresh++
  }
  <span class="kw">const</span> dirs=[[<span class="num">1</span>,<span class="num">0</span>],[-<span class="num">1</span>,<span class="num">0</span>],[<span class="num">0</span>,<span class="num">1</span>],[<span class="num">0</span>,-<span class="num">1</span>]]
  <span class="kw">while</span>(q.length && fresh>0) {
    <span class="kw">const</span> size=q.length; time++
    <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>;i&lt;size;i++) {
      <span class="kw">const</span>[r,c]=q.<span class="fn">shift</span>()
      <span class="kw">for</span>(<span class="kw">const</span>[dr,dc] <span class="kw">of</span> dirs) {
        <span class="kw">const</span>[nr,nc]=[r+dr,c+dc]
        <span class="kw">if</span>(nr>=<span class="num">0</span>&&nr&lt;R&&nc>=<span class="num">0</span>&&nc&lt;C&&grid[nr][nc]===<span class="num">1</span>){grid[nr][nc]=<span class="num">2</span>;fresh--;q.<span class="fn">push</span>([nr,nc])}
      }
    }
  }
  <span class="kw">return</span> fresh===<span class="num">0</span>?time:-<span class="num">1</span>
}</pre></div></div>
<div class="lang-panel" id="gbfs-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Multi-source BFS</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">oranges_rotting</span>(grid):
    R, C = <span class="py-fn">len</span>(grid), <span class="py-fn">len</span>(grid[<span class="py-num">0</span>])
    q = deque(); fresh = <span class="py-num">0</span>
    <span class="py-kw">for</span> r <span class="py-kw">in</span> <span class="py-fn">range</span>(R):
        <span class="py-kw">for</span> c <span class="py-kw">in</span> <span class="py-fn">range</span>(C):
            <span class="py-kw">if</span> grid[r][c] == <span class="py-num">2</span>: q.append((r,c))
            <span class="py-kw">elif</span> grid[r][c] == <span class="py-num">1</span>: fresh += <span class="py-num">1</span>
    time = <span class="py-num">0</span>
    <span class="py-kw">while</span> q <span class="py-kw">and</span> fresh:
        <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(q)):
            r, c = q.popleft()
            <span class="py-kw">for</span> dr, dc <span class="py-kw">in</span> [(<span class="py-num">1</span>,<span class="py-num">0</span>),(-<span class="py-num">1</span>,<span class="py-num">0</span>),(<span class="py-num">0</span>,<span class="py-num">1</span>),(<span class="py-num">0</span>,-<span class="py-num">1</span>)]:
                nr, nc = r+dr, c+dc
                <span class="py-kw">if</span> <span class="py-num">0</span>&lt;=nr&lt;R <span class="py-kw">and</span> <span class="py-num">0</span>&lt;=nc&lt;C <span class="py-kw">and</span> grid[nr][nc]==<span class="py-num">1</span>:
                    grid[nr][nc]=<span class="py-num">2</span>; fresh-=<span class="py-num">1</span>; q.append((nr,nc))
        time += <span class="py-num">1</span>
    <span class="py-kw">return</span> time <span class="py-kw">if</span> fresh==<span class="py-num">0</span> <span class="py-kw">else</span> -<span class="py-num">1</span></pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Word Ladder" difficulty="hard" tags="BFS,Word Graph">
<div class="prob-desc">Given begin word, end word, and word list, return the number of words in the shortest transformation sequence (change one letter at a time, each intermediate word must be in wordList).</div>
<div class="prob-example">beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"] → 5</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gbfs-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gbfs-p5')">Python</button></div>
<div class="lang-panel active" id="gbfs-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS with wildcard pattern buckets</span></div><pre><span class="kw">function</span> <span class="fn">ladderLength</span>(begin, end, wordList) {
  <span class="kw">const</span> words = <span class="kw">new</span> <span class="cls">Set</span>(wordList)
  <span class="kw">if</span> (!words.<span class="fn">has</span>(end)) <span class="kw">return</span> <span class="num">0</span>
  <span class="kw">const</span> q=[[begin,<span class="num">1</span>]], visited=<span class="kw">new</span> <span class="cls">Set</span>([begin])
  <span class="kw">while</span>(q.length) {
    <span class="kw">const</span> [word, steps]=q.<span class="fn">shift</span>()
    <span class="kw">if</span>(word===end) <span class="kw">return</span> steps
    <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>;i&lt;word.length;i++) {
      <span class="kw">for</span>(<span class="kw">let</span> c=<span class="num">97</span>;c&lt;=<span class="num">122</span>;c++) {
        <span class="kw">const</span> next=word.<span class="fn">slice</span>(<span class="num">0</span>,i)+<span class="cls">String</span>.<span class="fn">fromCharCode</span>(c)+word.<span class="fn">slice</span>(i+<span class="num">1</span>)
        <span class="kw">if</span>(words.<span class="fn">has</span>(next)&&!visited.<span class="fn">has</span>(next)){visited.<span class="fn">add</span>(next);q.<span class="fn">push</span>([next,steps+<span class="num">1</span>])}
      }
    }
  }
  <span class="kw">return</span> <span class="num">0</span>
}</pre></div></div>
<div class="lang-panel" id="gbfs-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS Word Ladder</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">ladder_length</span>(begin, end, word_list):
    words = <span class="py-fn">set</span>(word_list)
    <span class="py-kw">if</span> end <span class="py-kw">not in</span> words: <span class="py-kw">return</span> <span class="py-num">0</span>
    q = deque([(begin, <span class="py-num">1</span>)]); visited = {begin}
    <span class="py-kw">while</span> q:
        word, steps = q.popleft()
        <span class="py-kw">if</span> word == end: <span class="py-kw">return</span> steps
        <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(word)):
            <span class="py-kw">for</span> c <span class="py-kw">in</span> <span class="py-str">'abcdefghijklmnopqrstuvwxyz'</span>:
                nxt = word[:i] + c + word[i+<span class="py-num">1</span>:]
                <span class="py-kw">if</span> nxt <span class="py-kw">in</span> words <span class="py-kw">and</span> nxt <span class="py-kw">not in</span> visited:
                    visited.add(nxt); q.append((nxt, steps+<span class="py-num">1</span>))
    <span class="py-kw">return</span> <span class="py-num">0</span></pre></div>
</div>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_graphsbfs.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
