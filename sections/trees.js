// Section: trees
// Auto-extracted from index.html
import { autoWrapCodeLines, chips, withCode, mountVisualizer, buildTree, cloneTree, findTreeNode, treeLevels, renderTree } from '../components/viz-kit.js';

const _html_trees = String.raw`
<div id="sec-trees" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Trees · 11</span></div><div class="sec-title">Binary Trees</div></div>
<div class="sec-lead">Trees are recursive structures — almost every tree problem is solved by defining what a single node needs to return to its parent and writing the recurrence. DFS (recursive/stack) traverses depth-first. BFS (queue) traverses level-by-level.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>A binary tree is a family tree where every parent has at most two children — a left and a right. Just as you can describe your own family by first describing yourself and then describing your two branches of descendants, you can describe any subtree by describing its root and then recursing into its left and right subtrees. This self-similarity is not just a pretty analogy: it is the reason that nearly every binary-tree algorithm is written recursively. When you stand at any node, you can pretend you have already solved the problem for both of its children (the recursive leap of faith), and your job is only to combine those child results to produce the answer for the current node.</p>
<p>The four traversal orders encode four different processing priorities. <strong>Preorder</strong> (root first) is useful when you need to serialize or clone a tree — you emit the parent before its children, so reconstruction is straightforward. <strong>Inorder</strong> (left, root, right) visits nodes in sorted order for a BST, making it indispensable for problems that require processing values in sequence. <strong>Postorder</strong> (children before parent) is the right choice when a node needs information from both subtrees before it can contribute — height, diameter, and subtree-deletion problems all follow this pattern. <strong>Level-order</strong> (BFS with a queue) is the go-to when you need to process the tree layer by layer, such as finding the rightmost node at each depth.</p>
<p>Reach for DFS (usually recursive) when the problem asks about a property of a path from root to leaf, or requires accumulating information bottom-up through the tree. Reach for BFS when the problem is inherently level-based — minimum depth, level averages, zigzag traversal. A very common mistake is writing a DFS that only considers the subtree rooted at the current node without passing bounds or accumulated state from ancestors: problems like "path sum equal to target" require carrying a running total <em>down</em> from the root, not computing it purely bottom-up.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Most tree problems reduce to: "what should this function return to its parent?" Define that return value clearly (height? boolean? count?), write the base case for a null node, and the recursive structure follows naturally. If you need ancestor information too, add it as a parameter passed downward.</div>
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
<algo-visualizer id="viz-tree-p1" title="Post-order Depth — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tree-p2" title="Recursive Swap — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tree-p3" title="Post-order LCA — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tree-p4" title="BFS Last-in-Level — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tree-p5" title="BFS Serialize — trace"></algo-visualizer>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_trees.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Binary Tree problems ─────
// Trees are rendered as level-grouped rows (no connecting lines) — enough to
// see which node is being visited without a full node-link layout engine.
function wireVisualizers() {
  // ── P1: Maximum Depth — post-order recursion ────────────────────────────
  function traceMaxDepth(root) {
    const steps = [{ visiting: null, note: 'Start DFS from root.', line: 1, pyLine: 2 }];
    function dfs(node) {
      if (!node) return 0;
      steps.push({ visiting: node.id, note: `visit node ${node.val} → recurse left, then right.`, line: 1, pyLine: 2 });
      const l = dfs(node.left);
      const r = dfs(node.right);
      const depth = 1 + Math.max(l, r);
      steps.push({ visiting: node.id, depth, note: `node ${node.val}: depth = 1 + max(${l},${r}) = ${depth}.`, line: 1, pyLine: 2 });
      return depth;
    }
    const total = dfs(root);
    steps.push({ visiting: null, final: true, note: `Done. Max depth = ${total}.`, line: 1, pyLine: 2 });
    return steps;
  }

  function renderMaxDepth(root) {
    const levels = treeLevels(root);
    return (stage, step) => {
      stage.innerHTML = renderTree(levels, n => step.final ? 'dim' : (n.id === step.visiting ? (step.depth !== undefined ? 'match' : 'cur') : ''));
    };
  }

  // ── P2: Invert Binary Tree — recursive swap ─────────────────────────────
  function traceInvertTree(root) {
    const steps = [{ tree: cloneTree(root), visiting: null, note: 'Start.', line: 1, pyLine: 1 }];
    function dfs(node) {
      if (!node) return;
      steps.push({ tree: cloneTree(root), visiting: node.id, note: `visit node ${node.val} → recurse into children first.`, line: 2, pyLine: 2 });
      dfs(node.left);
      dfs(node.right);
      [node.left, node.right] = [node.right, node.left];
      steps.push({ tree: cloneTree(root), visiting: node.id, note: `swap children of node ${node.val}.`, line: 3, pyLine: 3 });
    }
    dfs(root);
    steps.push({ tree: cloneTree(root), visiting: null, final: true, note: 'Done — tree inverted.', line: 4, pyLine: 4 });
    return steps;
  }

  function renderInvertTree() {
    return (stage, step) => {
      const levels = treeLevels(step.tree);
      stage.innerHTML = renderTree(levels, n => step.final ? '' : (n.id === step.visiting ? 'cur' : ''));
    };
  }

  // ── P3: Lowest Common Ancestor — post-order DFS ─────────────────────────
  function traceLCA(root, pVal, qVal) {
    const p = findTreeNode(root, pVal), q = findTreeNode(root, qVal);
    const steps = [{ visiting: null, note: `Start — find LCA of ${pVal} and ${qVal}.`, line: 2, pyLine: 2 }];
    function dfs(node) {
      if (!node || node === p || node === q) {
        steps.push({ visiting: node ? node.id : null, note: node ? `node ${node.val} is p or q → base case, return it.` : 'null → return null.', line: 2, pyLine: 2 });
        return node;
      }
      const left = dfs(node.left);
      const right = dfs(node.right);
      const result = left && right ? node : (left ?? right);
      steps.push({ visiting: node.id, found: !!(left && right),
        note: `node ${node.val}: left=${left ? left.val : 'null'}, right=${right ? right.val : 'null'} → ${left && right ? `both sides found → LCA is ${node.val}!` : `pass up ${result ? result.val : 'null'}.`}`,
        line: 5, pyLine: 5 });
      return result;
    }
    const lca = dfs(root);
    steps.push({ visiting: lca ? lca.id : null, final: true, note: `Done. LCA(${pVal}, ${qVal}) = ${lca.val}.`, line: 5, pyLine: 5 });
    return steps;
  }

  function renderLCA(root) {
    const levels = treeLevels(root);
    return (stage, step) => {
      stage.innerHTML = renderTree(levels, n => step.final ? (n.id === step.visiting ? 'match' : 'dim') : (n.id === step.visiting ? (step.found ? 'match' : 'cur') : ''));
    };
  }

  // ── P4: Binary Tree Right Side View — BFS ───────────────────────────────
  function traceRightSideView(root) {
    const res = [];
    const queue = root ? [root] : [];
    const steps = [{ res: [...res], visiting: null, note: 'Start — queue=[root].', line: 3, pyLine: 4 }];
    while (queue.length) {
      const n = queue.length;
      for (let i = 0; i < n; i++) {
        const node = queue.shift();
        const isLast = i === n - 1;
        if (isLast) res.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        steps.push({ res: [...res], visiting: node.id, isLast,
          note: `dequeue ${node.val}${isLast ? ' → last in level, add to result!' : ''}.`, line: isLast ? 8 : 9, pyLine: isLast ? 8 : 9 });
      }
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderRightSideView(root) {
    const levels = treeLevels(root);
    return (stage, step) => {
      stage.innerHTML = `
        ${renderTree(levels, n => step.final ? 'dim' : (n.id === step.visiting ? (step.isLast ? 'match' : 'cur') : ''))}
        <div class="viz-panel-lbl" style="margin-top:10px">right side view</div>
        ${chips(step.res, ' new')}`;
    };
  }

  // ── P5: Serialize Binary Tree — BFS ──────────────────────────────────────
  function traceSerialize(root) {
    const q = [root];
    const vals = [];
    const steps = [{ vals: [...vals], visiting: null, note: 'Start — queue=[root].', line: 3, pyLine: 5 }];
    while (q.length) {
      const n = q.shift();
      if (!n) {
        vals.push('#');
        steps.push({ vals: [...vals], visiting: null, note: "null → push '#'.", line: 6, pyLine: 8 });
        continue;
      }
      vals.push(n.val);
      q.push(n.left, n.right);
      steps.push({ vals: [...vals], visiting: n.id, note: `push ${n.val}, enqueue its two children (null shown as #).`, line: 7, pyLine: 9 });
    }
    steps.push({ vals: [...vals], visiting: null, final: true, note: `Done. Serialized: "${vals.join(',')}".`, line: 9, pyLine: 10 });
    return steps;
  }

  function renderSerialize(root) {
    const levels = treeLevels(root);
    return (stage, step) => {
      stage.innerHTML = `
        ${renderTree(levels, n => step.final ? 'dim' : (n.id === step.visiting ? 'cur' : ''))}
        <div class="viz-panel-lbl" style="margin-top:10px">serialized so far</div>
        ${chips(step.vals, ' new')}`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  const t1 = buildTree([3, 9, 20, null, null, 15, 7]);
  mountVisualizer('viz-tree-p1', traceMaxDepth(t1), withCode('tree-p1', renderMaxDepth(t1)));

  const t2 = buildTree([4, 2, 7, 1, 3, 6, 9]);
  mountVisualizer('viz-tree-p2', traceInvertTree(t2), withCode('tree-p2', renderInvertTree()));

  const t3 = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
  mountVisualizer('viz-tree-p3', traceLCA(t3, 5, 1), withCode('tree-p3', renderLCA(t3)));

  const t4 = buildTree([1, 2, 3, null, 5, null, 4]);
  mountVisualizer('viz-tree-p4', traceRightSideView(t4), withCode('tree-p4', renderRightSideView(t4)));

  const t5 = buildTree([3, 9, 20, null, null, 15, 7]);
  mountVisualizer('viz-tree-p5', traceSerialize(t5), withCode('tree-p5', renderSerialize(t5)));
}
