// Section: bst
// Auto-extracted from index.html
import { autoWrapCodeLines, chips, withCode, mountVisualizer, buildTree, cloneTree, treeLevels, renderTree } from '../components/viz-kit.js';

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
<algo-visualizer id="viz-bst-p1" title="Min/Max Bounds — trace"></algo-visualizer>
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
<algo-visualizer id="viz-bst-p2" title="Iterative In-order — trace"></algo-visualizer>
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
<algo-visualizer id="viz-bst-p3" title="Insert — trace"></algo-visualizer>
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
<algo-visualizer id="viz-bst-p4" title="BST Ordering — trace"></algo-visualizer>
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
<algo-visualizer id="viz-bst-p5" title="In-order Violation Scan — trace"></algo-visualizer>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_bst.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the BST problems ─────────────
function wireVisualizers() {
  const fmt = v => v === Infinity ? '∞' : v === -Infinity ? '-∞' : v;

  // ── P1: Validate BST — min/max bounds ───────────────────────────────────
  function traceIsValidBST(root) {
    const steps = [{ visiting: null, note: 'Start — bounds (-∞, ∞).', line: 1, pyLine: 1 }];
    function dfs(node, min, max) {
      if (!node) {
        steps.push({ visiting: null, note: 'null → valid (base case).', line: 2, pyLine: 2 });
        return true;
      }
      if (node.val <= min || node.val >= max) {
        steps.push({ visiting: node.id, invalid: true, final: true, stop: true,
          note: `node ${node.val}: must be in (${fmt(min)}, ${fmt(max)}) → violates bounds → INVALID.`, line: 3, pyLine: 3 });
        return false;
      }
      steps.push({ visiting: node.id, note: `node ${node.val}: within (${fmt(min)}, ${fmt(max)}) → recurse with updated bounds.`, line: 4, pyLine: 4 });
      return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
    }
    const valid = dfs(root, -Infinity, Infinity);
    if (valid) steps.push({ visiting: null, final: true, note: 'Done. All nodes within bounds → VALID BST.', line: 4, pyLine: 4 });
    return steps;
  }

  function renderIsValidBST(root) {
    const levels = treeLevels(root);
    return (stage, step) => {
      stage.innerHTML = renderTree(levels, n => step.final ? (n.id === step.visiting ? (step.invalid ? 'dup' : 'match') : 'dim') : (n.id === step.visiting ? 'cur' : ''));
    };
  }

  // ── P2: Kth Smallest Element in BST — iterative in-order ────────────────
  function traceKthSmallest(root, k) {
    const stack = [];
    let curr = root, kk = k;
    const steps = [{ stack: [], visiting: curr ? curr.id : null, note: `Start — k=${k}.`, line: 2, pyLine: 2 }];
    while (curr || stack.length) {
      while (curr) {
        stack.push(curr);
        steps.push({ stack: stack.map(n => n.val), visiting: curr.id, note: `push ${curr.val}, go left.`, line: 4, pyLine: 4 });
        curr = curr.left;
      }
      curr = stack.pop();
      kk--;
      if (kk === 0) {
        steps.push({ stack: stack.map(n => n.val), visiting: curr.id, found: true, final: true, stop: true,
          note: `pop ${curr.val}, k reaches 0 → kth smallest = ${curr.val}.`, line: 6, pyLine: 7 });
        return steps;
      }
      steps.push({ stack: stack.map(n => n.val), visiting: curr.id, note: `pop ${curr.val} (${kk} more to go), go right.`, line: 7, pyLine: 8 });
      curr = curr.right;
    }
    return steps;
  }

  function renderKthSmallest(root) {
    const levels = treeLevels(root);
    return (stage, step) => {
      stage.innerHTML = `
        ${renderTree(levels, n => step.final ? (n.id === step.visiting ? 'match' : 'dim') : (n.id === step.visiting ? 'cur' : ''))}
        <div class="viz-panel-lbl" style="margin-top:10px">stack</div>
        ${chips(step.stack)}`;
    };
  }

  // ── P3: BST Insert ───────────────────────────────────────────────────────
  function traceInsertBST(root, val) {
    const steps = [{ tree: cloneTree(root), visiting: null, note: `Start — insert ${val}.`, line: 1, pyLine: 1 }];
    function insert(node) {
      if (!node) return { val, left: null, right: null, id: -1 };
      steps.push({ tree: cloneTree(root), visiting: node.id, note: `at node ${node.val}: ${val} ${val < node.val ? '< go left' : '≥ go right'}.`, line: 3, pyLine: 3 });
      if (val < node.val) node.left = insert(node.left);
      else node.right = insert(node.right);
      return node;
    }
    root = insert(root);
    steps.push({ tree: cloneTree(root), visiting: -1, final: true, note: `Inserted ${val} as a new leaf.`, line: 2, pyLine: 2 });
    return steps;
  }

  function renderInsertBST() {
    return (stage, step) => {
      const levels = treeLevels(step.tree);
      stage.innerHTML = renderTree(levels, n => step.final ? (n.id === -1 ? 'match' : 'dim') : (n.id === step.visiting ? 'cur' : ''));
    };
  }

  // ── P4: LCA of BST — use ordering, no need to search both sides ────────
  function traceLCABST(root, pVal, qVal) {
    const steps = [{ visiting: root.id, note: `Start at root ${root.val}. Find LCA of ${pVal} and ${qVal}.`, line: 2, pyLine: 1 }];
    function dfs(node) {
      if (pVal < node.val && qVal < node.val) {
        steps.push({ visiting: node.id, note: `${pVal} and ${qVal} both < ${node.val} → go left.`, line: 3, pyLine: 2 });
        return dfs(node.left);
      }
      if (pVal > node.val && qVal > node.val) {
        steps.push({ visiting: node.id, note: `${pVal} and ${qVal} both > ${node.val} → go right.`, line: 4, pyLine: 3 });
        return dfs(node.right);
      }
      steps.push({ visiting: node.id, final: true, stop: true, note: `${pVal} and ${qVal} split here → LCA is ${node.val}.`, line: 5, pyLine: 4 });
      return node;
    }
    dfs(root);
    return steps;
  }

  function renderLCABST(root) {
    const levels = treeLevels(root);
    return (stage, step) => {
      stage.innerHTML = renderTree(levels, n => step.final ? (n.id === step.visiting ? 'match' : 'dim') : (n.id === step.visiting ? 'cur' : ''));
    };
  }

  // ── P5: Recover BST — in-order violation scan ───────────────────────────
  function traceRecoverTree(root) {
    let first = null, second = null, prev = null;
    const steps = [{ tree: cloneTree(root), visiting: null, note: 'Start in-order scan.', line: 3, pyLine: 3 }];
    function inorder(node) {
      if (!node) return;
      inorder(node.left);
      let violation = false;
      let note = `visit ${node.val}.`;
      if (prev && prev.val > node.val) {
        if (!first) first = prev;
        second = node;
        violation = true;
        note = `visit ${node.val}: prev(${prev.val}) > curr(${node.val}) → violation! first=${first.val}, second=${second.val}.`;
      }
      steps.push({ tree: cloneTree(root), visiting: node.id, violation,
        firstId: first ? first.id : null, secondId: second ? second.id : null,
        note, line: violation ? 8 : 6, pyLine: violation ? 9 : 7 });
      prev = node;
      inorder(node.right);
    }
    inorder(root);
    const tmp = first.val; first.val = second.val; second.val = tmp;
    steps.push({ tree: cloneTree(root), visiting: null, final: true, firstId: first.id, secondId: second.id,
      note: 'Swap the two violating nodes\' values → BST recovered.', line: 14, pyLine: 13 });
    return steps;
  }

  function renderRecoverTree() {
    return (stage, step) => {
      const levels = treeLevels(step.tree);
      stage.innerHTML = renderTree(levels, n => {
        if (step.final) return (n.id === step.firstId || n.id === step.secondId) ? 'match' : 'dim';
        if (n.id === step.visiting) return step.violation ? 'dup' : 'cur';
        if (n.id === step.firstId || n.id === step.secondId) return 'seen';
        return '';
      });
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  mountVisualizer('viz-bst-p1', traceIsValidBST(buildTree([5, 1, 4, null, null, 3, 6])), withCode('bst-p1', renderIsValidBST(buildTree([5, 1, 4, null, null, 3, 6]))));

  const p2Tree = buildTree([3, 1, 4, null, 2]);
  mountVisualizer('viz-bst-p2', traceKthSmallest(p2Tree, 1), withCode('bst-p2', renderKthSmallest(p2Tree)));

  mountVisualizer('viz-bst-p3', traceInsertBST(buildTree([5, 3, 8, 1, 4, 7, 9]), 6), withCode('bst-p3', renderInsertBST()));

  const p4Tree = buildTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
  mountVisualizer('viz-bst-p4', traceLCABST(p4Tree, 2, 4), withCode('bst-p4', renderLCABST(p4Tree)));

  mountVisualizer('viz-bst-p5', traceRecoverTree(buildTree([1, 3, null, null, 2])), withCode('bst-p5', renderRecoverTree()));
}
