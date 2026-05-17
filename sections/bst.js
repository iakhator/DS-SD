// Section: bst
// Auto-extracted from index.html
const _html_bst = String.raw`
<div id="sec-bst" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Trees · 12</span></div><div class="sec-title">Binary Search Trees</div></div>
<div class="sec-lead">A BST is a binary tree where every node satisfies: left subtree values &lt; node &lt; right subtree values. This gives O(log n) search, insert, delete on average. In-order traversal of a BST gives sorted output — this is the core insight for most BST problems.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>A Binary Search Tree is a sorted dictionary organised as a tree rather than a flat array. Imagine a library where every shelf has a sign: "books with titles before <em>M</em> go left; books with titles from <em>M</em> onward go right." Finding any book takes only as long as the library's depth, not its total size, because at each shelf you throw away half the remaining choices. That is the BST invariant: for every node, <em>all</em> values in its left subtree are strictly smaller, and <em>all</em> values in its right subtree are strictly larger. This global ordering, not just a local parent-child comparison, is what gives the BST its power.</p>
<p>The <strong>in-order traversal</strong> (left → root → right) of a valid BST visits every node in ascending sorted order — no sorting algorithm needed. This single fact drives a large fraction of BST interview problems. Need the kth smallest element? Run an in-order traversal and count. Need to convert a sorted array to a BST? Recursively pick the midpoint as the root. Need to find the lowest common ancestor? Exploit the fact that the LCA is the first node whose value falls between the two targets. All of these solutions become obvious once you internalize that in-order = sorted.</p>
<p>Reach for a BST when you need dynamic sorted order — insert, delete, and search all in <code>O(log n)</code> — which a plain sorted array cannot provide efficiently. The most dangerous misconception is checking only the immediate parent-child relationship to validate a BST. The subtree rooted at a node inherits constraints from every ancestor, not just its parent; a node in the right subtree of the root must be greater than the root, even if it is in the left subtree of its own parent. The correct validation passes propagating <code>min</code> and <code>max</code> bounds down the tree rather than comparing adjacent nodes.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> In-order traversal of a BST gives sorted output — this single property is the key to kth-smallest, sorted-merge, and validation problems. When stuck on a BST problem, ask yourself: "what does the in-order sequence tell me here?"</div>
<div class="h2">BST Properties</div>
<div class="diag"><pre>
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13

In-order traversal: 1,3,4,6,7,8,10,13,14 ← SORTED!

Search: start at root, go left if smaller, right if larger
Insert: search until null, place there
Delete: 3 cases:
  leaf → just remove
  1 child → replace with child
  2 children → replace with in-order successor (leftmost node in right subtree)
</pre></div>

<div class="h2">5 Problems — BST</div>
<div class="problems-grid">

<problem-card num="P1" title="Validate BST" difficulty="medium" tags="DFS,Bounds">
<div class="prob-desc">Determine if a binary tree is a valid BST. Not just left &lt; root &lt; right at each node — must hold for all ancestors too.</div>
<div class="prob-example">   5       Valid BST   |    5       INVALID (3 in right subtree of 3)
  / \                  |   / \
 1   4                 |  1   3 ← appears right of 5, should be &gt; 5
    / \                |
   3   6</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Pass min/max bounds down the tree <span class="approach-tc">O(n) time · O(h) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bst-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bst-p1')">Python</button></div>
<div class="lang-panel active" id="bst-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Min/Max Bounds</span></div><pre><span class="kw">function</span> <span class="fn">isValidBST</span>(root, min=-<span class="cls">Infinity</span>, max=<span class="cls">Infinity</span>) {
  <span class="kw">if</span> (!root) <span class="kw">return</span> <span class="kw">true</span>
  <span class="kw">if</span> (root.val &lt;= min || root.val >= max) <span class="kw">return</span> <span class="kw">false</span>
  <span class="kw">return</span> <span class="fn">isValidBST</span>(root.left, min, root.val) &&
         <span class="fn">isValidBST</span>(root.right, root.val, max)
}</pre></div></div>
<div class="lang-panel" id="bst-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Min/Max Bounds</span></div><pre><span class="py-kw">def</span> <span class="py-fn">is_valid_bst</span>(root, lo=<span class="py-fn">float</span>(<span class="py-str">'-inf'</span>), hi=<span class="py-fn">float</span>(<span class="py-str">'inf'</span>)):
    <span class="py-kw">if not</span> root: <span class="py-kw">return</span> <span class="py-kw">True</span>
    <span class="py-kw">if not</span> (lo &lt; root.val &lt; hi): <span class="py-kw">return</span> <span class="py-kw">False</span>
    <span class="py-kw">return</span> <span class="py-fn">is_valid_bst</span>(root.left, lo, root.val) <span class="py-kw">and</span> \
           <span class="py-fn">is_valid_bst</span>(root.right, root.val, hi)</pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Kth Smallest Element in BST" difficulty="medium" tags="Inorder,BST">
<div class="prob-desc">Find the kth smallest value in a BST.</div>
<div class="prob-example">BST: [3,1,4,null,2], k=1 → 1</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ In-order traversal gives sorted order, count to k <span class="approach-tc">O(n) time · O(h) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bst-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bst-p2')">Python</button></div>
<div class="lang-panel active" id="bst-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Iterative In-order</span></div><pre><span class="kw">function</span> <span class="fn">kthSmallest</span>(root, k) {
  <span class="kw">const</span> stack = []; <span class="kw">let</span> curr = root
  <span class="kw">while</span> (curr || stack.length) {
    <span class="kw">while</span> (curr) { stack.<span class="fn">push</span>(curr); curr = curr.left }
    curr = stack.<span class="fn">pop</span>()
    <span class="kw">if</span> (--k === <span class="num">0</span>) <span class="kw">return</span> curr.val
    curr = curr.right
  }
}</pre></div></div>
<div class="lang-panel" id="bst-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Iterative In-order</span></div><pre><span class="py-kw">def</span> <span class="py-fn">kth_smallest</span>(root, k):
    stack, curr = [], root
    <span class="py-kw">while</span> curr <span class="py-kw">or</span> stack:
        <span class="py-kw">while</span> curr: stack.append(curr); curr = curr.left
        curr = stack.pop()
        k -= <span class="py-num">1</span>
        <span class="py-kw">if</span> k == <span class="py-num">0</span>: <span class="py-kw">return</span> curr.val
        curr = curr.right</pre></div>
</div>
</problem-card>

<problem-card num="P3" title="BST Insert & Delete" difficulty="medium" tags="BST,Recursion">
<div class="prob-desc">Insert a value into a BST and delete a node from a BST.</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bst-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bst-p3')">Python</button></div>
<div class="lang-panel active" id="bst-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Insert + Delete</span></div><pre><span class="kw">function</span> <span class="fn">insertBST</span>(root, val) {
  <span class="kw">if</span> (!root) <span class="kw">return</span> { val, left:<span class="kw">null</span>, right:<span class="kw">null</span> }
  <span class="kw">if</span> (val &lt; root.val) root.left  = <span class="fn">insertBST</span>(root.left, val)
  <span class="kw">else</span>               root.right = <span class="fn">insertBST</span>(root.right, val)
  <span class="kw">return</span> root
}

<span class="kw">function</span> <span class="fn">deleteBST</span>(root, key) {
  <span class="kw">if</span> (!root) <span class="kw">return</span> <span class="kw">null</span>
  <span class="kw">if</span>      (key &lt; root.val) root.left  = <span class="fn">deleteBST</span>(root.left, key)
  <span class="kw">else if</span> (key > root.val) root.right = <span class="fn">deleteBST</span>(root.right, key)
  <span class="kw">else</span> {
    <span class="kw">if</span> (!root.left)  <span class="kw">return</span> root.right   <span class="cmt">// 0 or 1 child</span>
    <span class="kw">if</span> (!root.right) <span class="kw">return</span> root.left
    <span class="cmt">// 2 children: replace with in-order successor (min of right subtree)</span>
    <span class="kw">let</span> succ = root.right
    <span class="kw">while</span> (succ.left) succ = succ.left
    root.val   = succ.val
    root.right = <span class="fn">deleteBST</span>(root.right, succ.val)
  }
  <span class="kw">return</span> root
}</pre></div></div>
<div class="lang-panel" id="bst-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Insert + Delete</span></div><pre><span class="py-kw">def</span> <span class="py-fn">insert_bst</span>(root, val):
    <span class="py-kw">if not</span> root: <span class="py-kw">return</span> TreeNode(val)
    <span class="py-kw">if</span> val &lt; root.val: root.left  = <span class="py-fn">insert_bst</span>(root.left, val)
    <span class="py-kw">else</span>:              root.right = <span class="py-fn">insert_bst</span>(root.right, val)
    <span class="py-kw">return</span> root

<span class="py-kw">def</span> <span class="py-fn">delete_bst</span>(root, key):
    <span class="py-kw">if not</span> root: <span class="py-kw">return</span> <span class="py-kw">None</span>
    <span class="py-kw">if</span>   key &lt; root.val: root.left  = <span class="py-fn">delete_bst</span>(root.left, key)
    <span class="py-kw">elif</span> key > root.val: root.right = <span class="py-fn">delete_bst</span>(root.right, key)
    <span class="py-kw">else</span>:
        <span class="py-kw">if not</span> root.left:  <span class="py-kw">return</span> root.right
        <span class="py-kw">if not</span> root.right: <span class="py-kw">return</span> root.left
        succ = root.right
        <span class="py-kw">while</span> succ.left: succ = succ.left
        root.val   = succ.val
        root.right = <span class="py-fn">delete_bst</span>(root.right, succ.val)
    <span class="py-kw">return</span> root</pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Lowest Common Ancestor of BST" difficulty="easy" tags="BST Property">
<div class="prob-desc">Find LCA of two nodes in a BST. Easier than general binary tree — use BST ordering.</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bst-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bst-p4')">Python</button></div>
<div class="lang-panel active" id="bst-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Use BST ordering</span></div><pre><span class="kw">function</span> <span class="fn">lcaBST</span>(root, p, q) {
  <span class="kw">const</span> {val} = root
  <span class="kw">if</span> (p.val &lt; val && q.val &lt; val) <span class="kw">return</span> <span class="fn">lcaBST</span>(root.left, p, q)
  <span class="kw">if</span> (p.val > val && q.val > val) <span class="kw">return</span> <span class="fn">lcaBST</span>(root.right, p, q)
  <span class="kw">return</span> root  <span class="cmt">// split point = LCA</span>
}</pre></div></div>
<div class="lang-panel" id="bst-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Use BST ordering</span></div><pre><span class="py-kw">def</span> <span class="py-fn">lca_bst</span>(root, p, q):
    <span class="py-kw">if</span> p.val &lt; root.val <span class="py-kw">and</span> q.val &lt; root.val: <span class="py-kw">return</span> <span class="py-fn">lca_bst</span>(root.left, p, q)
    <span class="py-kw">if</span> p.val > root.val <span class="py-kw">and</span> q.val > root.val: <span class="py-kw">return</span> <span class="py-fn">lca_bst</span>(root.right, p, q)
    <span class="py-kw">return</span> root</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Recover BST (Two Nodes Swapped)" difficulty="hard" tags="In-order,Morris Traversal">
<div class="prob-desc">Two nodes of a BST were swapped by mistake. Recover the BST without changing its structure.</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ In-order traversal finds the two nodes out of order <span class="approach-tc">O(n) time · O(h) space</span></div><p style="font-size:12px;color:var(--muted)">In a valid BST, in-order gives sorted array. Two swapped nodes appear as violations: prev > curr. Find first and last violation.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bst-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bst-p5')">Python</button></div>
<div class="lang-panel active" id="bst-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">In-order, find violations</span></div><pre><span class="kw">function</span> <span class="fn">recoverTree</span>(root) {
  <span class="kw">let</span> first=<span class="kw">null</span>, second=<span class="kw">null</span>, prev=<span class="kw">null</span>
  <span class="kw">function</span> <span class="fn">inorder</span>(node) {
    <span class="kw">if</span> (!node) <span class="kw">return</span>
    <span class="fn">inorder</span>(node.left)
    <span class="kw">if</span> (prev && prev.val > node.val) {
      <span class="kw">if</span> (!first) first = prev   <span class="cmt">// first violation: take the larger node</span>
      second = node              <span class="cmt">// second violation: always take the smaller</span>
    }
    prev = node
    <span class="fn">inorder</span>(node.right)
  }
  <span class="fn">inorder</span>(root)
  ;[first.val, second.val] = [second.val, first.val]
}</pre></div></div>
<div class="lang-panel" id="bst-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">In-order violations</span></div><pre><span class="py-kw">def</span> <span class="py-fn">recover_tree</span>(root):
    first = second = prev = <span class="py-kw">None</span>
    <span class="py-kw">def</span> <span class="py-fn">inorder</span>(node):
        <span class="py-kw">nonlocal</span> first, second, prev
        <span class="py-kw">if not</span> node: <span class="py-kw">return</span>
        <span class="py-fn">inorder</span>(node.left)
        <span class="py-kw">if</span> prev <span class="py-kw">and</span> prev.val > node.val:
            <span class="py-kw">if not</span> first: first = prev
            second = node
        prev = node
        <span class="py-fn">inorder</span>(node.right)
    <span class="py-fn">inorder</span>(root)
    first.val, second.val = second.val, first.val</pre></div>
</div>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_bst.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
