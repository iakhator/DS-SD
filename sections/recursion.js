// Section: recursion
// Auto-extracted from index.html
const _html_recursion = String.raw`
<div id="sec-recursion" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Recursion · 10</span></div><div class="sec-title">Recursion & Backtracking</div></div>
<div class="sec-lead">Recursion solves problems by reducing them to smaller versions of the same problem. Backtracking is recursion with pruning — explore a path, undo it if it violates constraints, try the next option. It's the engine behind all combinatorial search: permutations, combinations, N-Queens, Sudoku.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Recursion Call Tree</div>
<div class="diag"><pre>
Recursion has 3 laws:
  1. Must have a base case (when to stop)
  2. Must change state toward the base case
  3. Must call itself recursively

Call tree for fib(4):
        fib(4)
       /       \
    fib(3)    fib(2)
    /    \    /    \
 fib(2) fib(1) fib(1) fib(0)
 /   \
fib(1) fib(0)

Overlapping subproblems → memoize! fib(2) computed twice.

Backtracking template:
  function bt(state, choices):
    if is_solution(state): add to results; return
    for choice in choices:
      if is_valid(state, choice):
        make_choice(state, choice)    ← add to path
        bt(state, remaining_choices)  ← recurse
        undo_choice(state, choice)    ← BACKTRACK (undo)
</pre></div>

<div class="h2">Backtracking Template</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','rec-template')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','rec-template')">Python</button></div>
<div class="lang-panel active" id="rec-template-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">General Backtracking Template</span></div><pre><span class="cmt">// Template: generate all valid combinations</span>
<span class="kw">function</span> <span class="fn">backtrack</span>(result, current, start, ...params) {
  <span class="cmt">// Base case / solution condition</span>
  <span class="kw">if</span> (<span class="cmt">/* current is a valid complete solution */</span>) {
    result.<span class="fn">push</span>([...current])  <span class="cmt">// copy — don't push reference!</span>
    <span class="kw">return</span>
  }
  <span class="kw">for</span> (<span class="kw">let</span> i = start; i &lt; choices.length; i++) {
    <span class="kw">if</span> (<span class="cmt">/* pruning: skip invalid choice */</span>) <span class="kw">continue</span>
    current.<span class="fn">push</span>(choices[i])          <span class="cmt">// 1. choose</span>
    <span class="fn">backtrack</span>(result, current, i+<span class="num">1</span>)   <span class="cmt">// 2. explore</span>
    current.<span class="fn">pop</span>()                      <span class="cmt">// 3. unchoose</span>
  }
}</pre></div></div>
<div class="lang-panel" id="rec-template-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">General Backtracking Template (Python)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">backtrack</span>(result, current, start, choices):
    <span class="py-kw">if</span> <span class="py-cmt"># base case</span>:
        result.append(list(current))   <span class="py-cmt"># copy current state</span>
        <span class="py-kw">return</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(start, <span class="py-fn">len</span>(choices)):
        <span class="py-kw">if</span> <span class="py-cmt"># prune</span>: <span class="py-kw">continue</span>
        current.append(choices[i])           <span class="py-cmt"># choose</span>
        <span class="py-fn">backtrack</span>(result, current, i+<span class="py-num">1</span>, choices)  <span class="py-cmt"># explore</span>
        current.pop()                         <span class="py-cmt"># unchoose</span></pre></div></div>

<div class="h2">5 Problems — Recursion & Backtracking</div>
<div class="problems-grid">

<problem-card num="P1" title="Generate All Permutations" difficulty="medium" tags="Backtracking,O(n!)">
<div class="prob-desc">Given a list of distinct integers, return all possible permutations.</div>
<div class="prob-example">Input: [1,2,3] → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Backtracking with used[] set <span class="approach-tc">O(n! × n) time · O(n) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','rec-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','rec-p1')">Python</button></div>
<div class="lang-panel active" id="rec-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking</span></div><pre><span class="kw">function</span> <span class="fn">permute</span>(nums) {
  <span class="kw">const</span> result = [], used = <span class="kw">new</span> <span class="cls">Array</span>(nums.length).<span class="fn">fill</span>(<span class="kw">false</span>)
  <span class="kw">function</span> <span class="fn">bt</span>(path) {
    <span class="kw">if</span> (path.length === nums.length) { result.<span class="fn">push</span>([...path]); <span class="kw">return</span> }
    <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;nums.length; i++) {
      <span class="kw">if</span> (used[i]) <span class="kw">continue</span>
      used[i] = <span class="kw">true</span>; path.<span class="fn">push</span>(nums[i])
      <span class="fn">bt</span>(path)
      used[i] = <span class="kw">false</span>; path.<span class="fn">pop</span>()
    }
  }
  <span class="fn">bt</span>([])
  <span class="kw">return</span> result
}</pre></div></div>
<div class="lang-panel" id="rec-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking</span></div><pre><span class="py-kw">def</span> <span class="py-fn">permute</span>(nums):
    result, used = [], [<span class="py-kw">False</span>] * <span class="py-fn">len</span>(nums)
    <span class="py-kw">def</span> <span class="py-fn">bt</span>(path):
        <span class="py-kw">if</span> <span class="py-fn">len</span>(path) == <span class="py-fn">len</span>(nums): result.append(list(path)); <span class="py-kw">return</span>
        <span class="py-kw">for</span> i, n <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(nums):
            <span class="py-kw">if</span> used[i]: <span class="py-kw">continue</span>
            used[i] = <span class="py-kw">True</span>; path.append(n)
            <span class="py-fn">bt</span>(path)
            used[i] = <span class="py-kw">False</span>; path.pop()
    <span class="py-fn">bt</span>([]); <span class="py-kw">return</span> result</pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Combination Sum" difficulty="medium" tags="Backtracking,Reuse">
<div class="prob-desc">Given candidates array and target, find all unique combinations where numbers sum to target. Same number may be used unlimited times.</div>
<div class="prob-example">candidates=[2,3,6,7], target=7 → [[2,2,3],[7]]</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','rec-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','rec-p2')">Python</button></div>
<div class="lang-panel active" id="rec-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking with reuse</span></div><pre><span class="kw">function</span> <span class="fn">combinationSum</span>(candidates, target) {
  <span class="kw">const</span> result = []
  <span class="kw">function</span> <span class="fn">bt</span>(start, curr, remaining) {
    <span class="kw">if</span> (remaining === <span class="num">0</span>) { result.<span class="fn">push</span>([...curr]); <span class="kw">return</span> }
    <span class="kw">for</span> (<span class="kw">let</span> i=start; i&lt;candidates.length; i++) {
      <span class="kw">if</span> (candidates[i] > remaining) <span class="kw">break</span>  <span class="cmt">// prune (sort first!)</span>
      curr.<span class="fn">push</span>(candidates[i])
      <span class="fn">bt</span>(i, curr, remaining - candidates[i])  <span class="cmt">// i not i+1: allow reuse</span>
      curr.<span class="fn">pop</span>()
    }
  }
  candidates.<span class="fn">sort</span>((a,b)=>a-b)
  <span class="fn">bt</span>(<span class="num">0</span>, [], target)
  <span class="kw">return</span> result
}</pre></div></div>
<div class="lang-panel" id="rec-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking with reuse</span></div><pre><span class="py-kw">def</span> <span class="py-fn">combination_sum</span>(candidates, target):
    result = []; candidates.sort()
    <span class="py-kw">def</span> <span class="py-fn">bt</span>(start, path, rem):
        <span class="py-kw">if</span> rem == <span class="py-num">0</span>: result.append(list(path)); <span class="py-kw">return</span>
        <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(start, <span class="py-fn">len</span>(candidates)):
            <span class="py-kw">if</span> candidates[i] > rem: <span class="py-kw">break</span>
            path.append(candidates[i])
            <span class="py-fn">bt</span>(i, path, rem - candidates[i])  <span class="py-cmt"># i not i+1</span>
            path.pop()
    <span class="py-fn">bt</span>(<span class="py-num">0</span>, [], target); <span class="py-kw">return</span> result</pre></div>
</div>
</problem-card>

<problem-card num="P3" title="Letter Combinations of Phone Number" difficulty="medium" tags="Backtracking,String">
<div class="prob-desc">Given a string of digits 2-9, return all possible letter combinations a phone keypad could represent.</div>
<div class="prob-example">Input: "23" → ["ad","ae","af","bd","be","bf","cd","ce","cf"]</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','rec-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','rec-p3')">Python</button></div>
<div class="lang-panel active" id="rec-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking</span></div><pre><span class="kw">function</span> <span class="fn">letterCombinations</span>(digits) {
  <span class="kw">if</span> (!digits) <span class="kw">return</span> []
  <span class="kw">const</span> map = {<span class="str">'2'</span>:<span class="str">'abc'</span>,<span class="str">'3'</span>:<span class="str">'def'</span>,<span class="str">'4'</span>:<span class="str">'ghi'</span>,<span class="str">'5'</span>:<span class="str">'jkl'</span>,<span class="str">'6'</span>:<span class="str">'mno'</span>,<span class="str">'7'</span>:<span class="str">'pqrs'</span>,<span class="str">'8'</span>:<span class="str">'tuv'</span>,<span class="str">'9'</span>:<span class="str">'wxyz'</span>}
  <span class="kw">const</span> result = []
  <span class="kw">function</span> <span class="fn">bt</span>(i, path) {
    <span class="kw">if</span> (i === digits.length) { result.<span class="fn">push</span>(path); <span class="kw">return</span> }
    <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> map[digits[i]]) <span class="fn">bt</span>(i+<span class="num">1</span>, path+c)
  }
  <span class="fn">bt</span>(<span class="num">0</span>, <span class="str">''</span>)
  <span class="kw">return</span> result
}</pre></div></div>
<div class="lang-panel" id="rec-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking</span></div><pre><span class="py-kw">def</span> <span class="py-fn">letter_combinations</span>(digits):
    <span class="py-kw">if not</span> digits: <span class="py-kw">return</span> []
    m = {<span class="py-str">'2'</span>:<span class="py-str">'abc'</span>,<span class="py-str">'3'</span>:<span class="py-str">'def'</span>,<span class="py-str">'4'</span>:<span class="py-str">'ghi'</span>,<span class="py-str">'5'</span>:<span class="py-str">'jkl'</span>,<span class="py-str">'6'</span>:<span class="py-str">'mno'</span>,<span class="py-str">'7'</span>:<span class="py-str">'pqrs'</span>,<span class="py-str">'8'</span>:<span class="py-str">'tuv'</span>,<span class="py-str">'9'</span>:<span class="py-str">'wxyz'</span>}
    result = []
    <span class="py-kw">def</span> <span class="py-fn">bt</span>(i, path):
        <span class="py-kw">if</span> i == <span class="py-fn">len</span>(digits): result.append(path); <span class="py-kw">return</span>
        <span class="py-kw">for</span> c <span class="py-kw">in</span> m[digits[i]]: <span class="py-fn">bt</span>(i+<span class="py-num">1</span>, path+c)
    <span class="py-fn">bt</span>(<span class="py-num">0</span>, <span class="py-str">''</span>); <span class="py-kw">return</span> result</pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Generate Parentheses" difficulty="medium" tags="Backtracking,Pruning">
<div class="prob-desc">Given n pairs of parentheses, generate all combinations of well-formed parentheses.</div>
<div class="prob-example">n=3 → ["((()))","(()())","(())()","()(())","()()()"]</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Add '(' if open &lt; n, add ')' if close &lt; open <span class="approach-tc">O(4ⁿ/√n) — Catalan number</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','rec-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','rec-p4')">Python</button></div>
<div class="lang-panel active" id="rec-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Constrained Backtracking</span></div><pre><span class="kw">function</span> <span class="fn">generateParenthesis</span>(n) {
  <span class="kw">const</span> result = []
  <span class="kw">function</span> <span class="fn">bt</span>(s, open, close) {
    <span class="kw">if</span> (s.length === <span class="num">2</span>*n) { result.<span class="fn">push</span>(s); <span class="kw">return</span> }
    <span class="kw">if</span> (open &lt; n)     <span class="fn">bt</span>(s+<span class="str">'('</span>, open+<span class="num">1</span>, close)
    <span class="kw">if</span> (close &lt; open) <span class="fn">bt</span>(s+<span class="str">')'</span>, open, close+<span class="num">1</span>)
  }
  <span class="fn">bt</span>(<span class="str">''</span>, <span class="num">0</span>, <span class="num">0</span>)
  <span class="kw">return</span> result
}</pre></div></div>
<div class="lang-panel" id="rec-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Constrained Backtracking</span></div><pre><span class="py-kw">def</span> <span class="py-fn">generate_parenthesis</span>(n):
    result = []
    <span class="py-kw">def</span> <span class="py-fn">bt</span>(s, op, cl):
        <span class="py-kw">if</span> <span class="py-fn">len</span>(s) == <span class="py-num">2</span>*n: result.append(s); <span class="py-kw">return</span>
        <span class="py-kw">if</span> op &lt; n:  <span class="py-fn">bt</span>(s+<span class="py-str">'('</span>, op+<span class="py-num">1</span>, cl)
        <span class="py-kw">if</span> cl &lt; op: <span class="py-fn">bt</span>(s+<span class="py-str">')'</span>, op, cl+<span class="py-num">1</span>)
    <span class="py-fn">bt</span>(<span class="py-str">''</span>, <span class="py-num">0</span>, <span class="py-num">0</span>); <span class="py-kw">return</span> result</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="N-Queens" difficulty="hard" tags="Backtracking,Classic">
<div class="prob-desc">Place n queens on an n×n chessboard so no two queens attack each other. Return all distinct solutions.</div>
<div class="prob-example">n=4 → 2 solutions: [".Q..","...Q","Q...","..Q."] and ["..Q.","Q...","...Q",".Q.."]</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Backtrack row by row, track col/diagonal conflicts with sets <span class="approach-tc">O(n!) time</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','rec-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','rec-p5')">Python</button></div>
<div class="lang-panel active" id="rec-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">N-Queens Backtracking</span></div><pre><span class="kw">function</span> <span class="fn">solveNQueens</span>(n) {
  <span class="kw">const</span> result=[], cols=<span class="kw">new</span> <span class="cls">Set</span>(), diag1=<span class="kw">new</span> <span class="cls">Set</span>(), diag2=<span class="kw">new</span> <span class="cls">Set</span>()
  <span class="kw">const</span> board = <span class="cls">Array</span>.<span class="fn">from</span>({length:n}, ()=><span class="str">'.'</span>.<span class="fn">repeat</span>(n).<span class="fn">split</span>(<span class="str">''</span>))
  <span class="kw">function</span> <span class="fn">bt</span>(row) {
    <span class="kw">if</span> (row===n) { result.<span class="fn">push</span>(board.<span class="fn">map</span>(r=>r.<span class="fn">join</span>(<span class="str">''</span>))); <span class="kw">return</span> }
    <span class="kw">for</span> (<span class="kw">let</span> col=<span class="num">0</span>; col&lt;n; col++) {
      <span class="kw">if</span> (cols.<span class="fn">has</span>(col)||diag1.<span class="fn">has</span>(row-col)||diag2.<span class="fn">has</span>(row+col)) <span class="kw">continue</span>
      cols.<span class="fn">add</span>(col); diag1.<span class="fn">add</span>(row-col); diag2.<span class="fn">add</span>(row+col)
      board[row][col] = <span class="str">'Q'</span>
      <span class="fn">bt</span>(row+<span class="num">1</span>)
      board[row][col] = <span class="str">'.'</span>
      cols.<span class="fn">delete</span>(col); diag1.<span class="fn">delete</span>(row-col); diag2.<span class="fn">delete</span>(row+col)
    }
  }
  <span class="fn">bt</span>(<span class="num">0</span>); <span class="kw">return</span> result
}</pre></div></div>
<div class="lang-panel" id="rec-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">N-Queens Backtracking</span></div><pre><span class="py-kw">def</span> <span class="py-fn">solve_n_queens</span>(n):
    result, cols, d1, d2 = [], <span class="py-fn">set</span>(), <span class="py-fn">set</span>(), <span class="py-fn">set</span>()
    board = [[<span class="py-str">'.'</span>]*n <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(n)]
    <span class="py-kw">def</span> <span class="py-fn">bt</span>(row):
        <span class="py-kw">if</span> row == n: result.append([<span class="py-str">''</span>.join(r) <span class="py-kw">for</span> r <span class="py-kw">in</span> board]); <span class="py-kw">return</span>
        <span class="py-kw">for</span> col <span class="py-kw">in</span> <span class="py-fn">range</span>(n):
            <span class="py-kw">if</span> col <span class="py-kw">in</span> cols <span class="py-kw">or</span> row-col <span class="py-kw">in</span> d1 <span class="py-kw">or</span> row+col <span class="py-kw">in</span> d2: <span class="py-kw">continue</span>
            cols.add(col); d1.add(row-col); d2.add(row+col); board[row][col]=<span class="py-str">'Q'</span>
            <span class="py-fn">bt</span>(row+<span class="py-num">1</span>)
            cols.discard(col); d1.discard(row-col); d2.discard(row+col); board[row][col]=<span class="py-str">'.'</span>
    <span class="py-fn">bt</span>(<span class="py-num">0</span>); <span class="py-kw">return</span> result</pre></div>
</div>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_recursion.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
