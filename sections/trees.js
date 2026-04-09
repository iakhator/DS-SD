// Section: trees
// Auto-extracted from index.html
const _html_trees = String.raw`
<div id="sec-trees" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Trees · 11</span></div><div class="sec-title">Binary Trees</div></div>
<div class="sec-lead">Trees are recursive structures — almost every tree problem is solved by defining what a single node needs to return to its parent and writing the recurrence. DFS (recursive/stack) traverses depth-first. BFS (queue) traverses level-by-level.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Traversal Orders</div>
<div class="diag"><pre>
         1
        / \
       2   3
      / \
     4   5

Preorder  (Root→Left→Right): 1,2,4,5,3   ← good for cloning/serializing
Inorder   (Left→Root→Right): 4,2,5,1,3   ← BST gives SORTED order
Postorder (Left→Right→Root): 4,5,2,3,1   ← good for deletion/bottom-up
Level-order (BFS):           1,2,3,4,5   ← level-by-level, uses queue
</pre></div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tree-traversal')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tree-traversal')">Python</button></div>
<div class="lang-panel active" id="tree-traversal-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">All 4 Traversals</span></div><pre><span class="cmt">// Recursive DFS (most common in interviews)</span>
<span class="kw">const</span> preorder  = node => !node ? [] : [node.val, ...preorder(node.left),  ...preorder(node.right)]
<span class="kw">const</span> inorder   = node => !node ? [] : [...inorder(node.left),  node.val, ...inorder(node.right)]
<span class="kw">const</span> postorder = node => !node ? [] : [...postorder(node.left), ...postorder(node.right), node.val]

<span class="cmt">// BFS Level-order</span>
<span class="kw">function</span> <span class="fn">levelOrder</span>(root) {
  <span class="kw">if</span> (!root) <span class="kw">return</span> []
  <span class="kw">const</span> res = [], queue = [root]
  <span class="kw">while</span> (queue.length) {
    <span class="kw">const</span> level = [], size = queue.length
    <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;size; i++) {
      <span class="kw">const</span> node = queue.<span class="fn">shift</span>()
      level.<span class="fn">push</span>(node.val)
      <span class="kw">if</span> (node.left)  queue.<span class="fn">push</span>(node.left)
      <span class="kw">if</span> (node.right) queue.<span class="fn">push</span>(node.right)
    }
    res.<span class="fn">push</span>(level)
  }
  <span class="kw">return</span> res
}</pre></div></div>
<div class="lang-panel" id="tree-traversal-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">All Traversals</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">inorder</span>(root):
    <span class="py-kw">return</span> <span class="py-fn">inorder</span>(root.left) + [root.val] + <span class="py-fn">inorder</span>(root.right) <span class="py-kw">if</span> root <span class="py-kw">else</span> []

<span class="py-kw">def</span> <span class="py-fn">level_order</span>(root):
    <span class="py-kw">if not</span> root: <span class="py-kw">return</span> []
    res, q = [], deque([root])
    <span class="py-kw">while</span> q:
        level = []
        <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(q)):
            node = q.popleft()
            level.append(node.val)
            <span class="py-kw">if</span> node.left:  q.append(node.left)
            <span class="py-kw">if</span> node.right: q.append(node.right)
        res.append(level)
    <span class="py-kw">return</span> res</pre></div></div>

<div class="h2">5 Problems — Binary Trees</div>
<div class="problems-grid">

<problem-card num="P1" title="Maximum Depth of Binary Tree" difficulty="easy" tags="DFS,Recursion">
<div class="prob-desc">Find the maximum depth (number of nodes along the longest path root to leaf).</div>
<div class="prob-example">Input: [3,9,20,null,null,15,7] → 3</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tree-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tree-p1')">Python</button></div>
<div class="lang-panel active" id="tree-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Recursive DFS</span></div><pre><span class="kw">const</span> <span class="fn">maxDepth</span> = root => !root ? <span class="num">0</span> : <span class="num">1</span> + <span class="cls">Math</span>.<span class="fn">max</span>(<span class="fn">maxDepth</span>(root.left), <span class="fn">maxDepth</span>(root.right))</pre></div></div>
<div class="lang-panel" id="tree-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Recursive</span></div><pre><span class="py-kw">def</span> <span class="py-fn">max_depth</span>(root):
    <span class="py-kw">return</span> <span class="py-num">0</span> <span class="py-kw">if not</span> root <span class="py-kw">else</span> <span class="py-num">1</span> + <span class="py-fn">max</span>(<span class="py-fn">max_depth</span>(root.left), <span class="py-fn">max_depth</span>(root.right))</pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Invert Binary Tree" difficulty="easy" tags="DFS">
<div class="prob-desc">Invert a binary tree (mirror it).</div>
<div class="prob-example">Input: [4,2,7,1,3,6,9] → [4,7,2,9,6,3,1]</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tree-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tree-p2')">Python</button></div>
<div class="lang-panel active" id="tree-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Recursive</span></div><pre><span class="kw">function</span> <span class="fn">invertTree</span>(root) {
  <span class="kw">if</span> (!root) <span class="kw">return</span> <span class="kw">null</span>
  [root.left, root.right] = [<span class="fn">invertTree</span>(root.right), <span class="fn">invertTree</span>(root.left)]
  <span class="kw">return</span> root
}</pre></div></div>
<div class="lang-panel" id="tree-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Recursive</span></div><pre><span class="py-kw">def</span> <span class="py-fn">invert_tree</span>(root):
    <span class="py-kw">if not</span> root: <span class="py-kw">return</span> <span class="py-kw">None</span>
    root.left, root.right = <span class="py-fn">invert_tree</span>(root.right), <span class="py-fn">invert_tree</span>(root.left)
    <span class="py-kw">return</span> root</pre></div>
</div>
</problem-card>

<problem-card num="P3" title="Lowest Common Ancestor" difficulty="medium" tags="DFS,Bottom-up">
<div class="prob-desc">Find the lowest common ancestor of two nodes p and q in a binary tree.</div>
<div class="prob-example">Tree: [3,5,1,6,2,0,8,null,null,7,4], p=5, q=1 → 3</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Post-order DFS — return node when found <span class="approach-tc">O(n)</span></div><p style="font-size:12px;color:var(--muted)">If current is p or q, return it. LCA is the node where left AND right are non-null.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tree-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tree-p3')">Python</button></div>
<div class="lang-panel active" id="tree-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Post-order LCA</span></div><pre><span class="kw">function</span> <span class="fn">lowestCommonAncestor</span>(root, p, q) {
  <span class="kw">if</span> (!root || root === p || root === q) <span class="kw">return</span> root
  <span class="kw">const</span> left  = <span class="fn">lowestCommonAncestor</span>(root.left, p, q)
  <span class="kw">const</span> right = <span class="fn">lowestCommonAncestor</span>(root.right, p, q)
  <span class="kw">return</span> left && right ? root : left ?? right
}</pre></div></div>
<div class="lang-panel" id="tree-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Post-order LCA</span></div><pre><span class="py-kw">def</span> <span class="py-fn">lowest_common_ancestor</span>(root, p, q):
    <span class="py-kw">if not</span> root <span class="py-kw">or</span> root <span class="py-kw">is</span> p <span class="py-kw">or</span> root <span class="py-kw">is</span> q: <span class="py-kw">return</span> root
    L = <span class="py-fn">lowest_common_ancestor</span>(root.left, p, q)
    R = <span class="py-fn">lowest_common_ancestor</span>(root.right, p, q)
    <span class="py-kw">return</span> root <span class="py-kw">if</span> L <span class="py-kw">and</span> R <span class="py-kw">else</span> L <span class="py-kw">or</span> R</pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Binary Tree Right Side View" difficulty="medium" tags="BFS Level Order">
<div class="prob-desc">Imagine standing on the right side of a tree. Return the values you can see from top to bottom.</div>
<div class="prob-example">Input: [1,2,3,null,5,null,4] → [1,3,4]</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tree-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tree-p4')">Python</button></div>
<div class="lang-panel active" id="tree-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS — Last Node Each Level</span></div><pre><span class="kw">function</span> <span class="fn">rightSideView</span>(root) {
  <span class="kw">if</span> (!root) <span class="kw">return</span> []
  <span class="kw">const</span> res=[], q=[root]
  <span class="kw">while</span>(q.length) {
    <span class="kw">const</span> n=q.length
    <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>;i&lt;n;i++) {
      <span class="kw">const</span> node=q.<span class="fn">shift</span>()
      <span class="kw">if</span>(i===n-<span class="num">1</span>) res.<span class="fn">push</span>(node.val)
      <span class="kw">if</span>(node.left) q.<span class="fn">push</span>(node.left)
      <span class="kw">if</span>(node.right) q.<span class="fn">push</span>(node.right)
    }
  }
  <span class="kw">return</span> res
}</pre></div></div>
<div class="lang-panel" id="tree-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS Level Order</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">right_side_view</span>(root):
    <span class="py-kw">if not</span> root: <span class="py-kw">return</span> []
    res, q = [], deque([root])
    <span class="py-kw">while</span> q:
        <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(q)):
            node = q.popleft()
            <span class="py-kw">if</span> i == <span class="py-fn">len</span>(q): res.append(node.val)
            <span class="py-kw">if</span> node.left: q.append(node.left)
            <span class="py-kw">if</span> node.right: q.append(node.right)
    <span class="py-kw">return</span> res</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Serialize and Deserialize Binary Tree" difficulty="hard" tags="BFS,Design">
<div class="prob-desc">Design algorithms to serialize and deserialize a binary tree. Must be able to reconstruct original tree from serialized string.</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tree-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tree-p5')">Python</button></div>
<div class="lang-panel active" id="tree-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS Serialize/Deserialize</span></div><pre><span class="kw">const</span> <span class="fn">serialize</span> = root => {
  <span class="kw">if</span> (!root) <span class="kw">return</span> <span class="str">''</span>
  <span class="kw">const</span> q=[root], vals=[]
  <span class="kw">while</span>(q.length) {
    <span class="kw">const</span> n=q.<span class="fn">shift</span>()
    <span class="kw">if</span>(!n) { vals.<span class="fn">push</span>(<span class="str">'#'</span>); <span class="kw">continue</span> }
    vals.<span class="fn">push</span>(n.val); q.<span class="fn">push</span>(n.left, n.right)
  }
  <span class="kw">return</span> vals.<span class="fn">join</span>(<span class="str">','</span>)
}

<span class="kw">const</span> <span class="fn">deserialize</span> = data => {
  <span class="kw">if</span> (!data) <span class="kw">return</span> <span class="kw">null</span>
  <span class="kw">const</span> vals=data.<span class="fn">split</span>(<span class="str">','</span>), root={val:+vals[<span class="num">0</span>],left:<span class="kw">null</span>,right:<span class="kw">null</span>}, q=[root]
  <span class="kw">let</span> i=<span class="num">1</span>
  <span class="kw">while</span>(q.length) {
    <span class="kw">const</span> n=q.<span class="fn">shift</span>()
    <span class="kw">for</span>(<span class="kw">const</span> side <span class="kw">of</span> [<span class="str">'left'</span>,<span class="str">'right'</span>]) {
      <span class="kw">if</span>(vals[i]!==<span class="str">'#'</span>) { n[side]={val:+vals[i],left:<span class="kw">null</span>,right:<span class="kw">null</span>}; q.<span class="fn">push</span>(n[side]) }
      i++
    }
  }
  <span class="kw">return</span> root
}</pre></div></div>
<div class="lang-panel" id="tree-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BFS Serialize/Deserialize</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">class</span> <span class="py-cls">Codec</span>:
    <span class="py-kw">def</span> <span class="py-fn">serialize</span>(self, root):
        <span class="py-kw">if not</span> root: <span class="py-kw">return</span> <span class="py-str">''</span>
        q, vals = deque([root]), []
        <span class="py-kw">while</span> q:
            n = q.popleft()
            <span class="py-kw">if not</span> n: vals.append(<span class="py-str">'#'</span>); <span class="py-kw">continue</span>
            vals.append(<span class="py-fn">str</span>(n.val)); q.append(n.left); q.append(n.right)
        <span class="py-kw">return</span> <span class="py-str">','</span>.join(vals)
    <span class="py-kw">def</span> <span class="py-fn">deserialize</span>(self, data):
        <span class="py-kw">if not</span> data: <span class="py-kw">return</span> <span class="py-kw">None</span>
        vals = data.split(<span class="py-str">','</span>); root = TreeNode(<span class="py-fn">int</span>(vals[<span class="py-num">0</span>])); q = deque([root]); i = <span class="py-num">1</span>
        <span class="py-kw">while</span> q:
            n = q.popleft()
            <span class="py-kw">for</span> attr <span class="py-kw">in</span> [<span class="py-str">'left'</span>, <span class="py-str">'right'</span>]:
                <span class="py-kw">if</span> vals[i] != <span class="py-str">'#'</span>: node = TreeNode(<span class="py-fn">int</span>(vals[i])); <span class="py-fn">setattr</span>(n,attr,node); q.append(node)
                i += <span class="py-num">1</span>
        <span class="py-kw">return</span> root</pre></div>
</div>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_trees.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
