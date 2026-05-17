// Section: complexity
// Auto-extracted from index.html
const _html_complexity = String.raw`
<div id="sec-complexity" class="section active">
<div class="sec-header">
  <div class="sec-meta"><span class="sec-badge dsa">Foundation · 01</span></div>
  <div class="sec-title">Big-O & Complexity Analysis</div>
</div>
<div class="sec-lead">Big-O describes how runtime or memory scales as input size grows — not the exact time. It's the language you use to compare algorithms. Every interviewer assumes you think in Big-O automatically.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Intuition &amp; Mental Model</div>
<p>Think of Big-O like comparing how different routes scale as a city grows. A shortcut that saves you five minutes today (a constant) matters much less than whether your route is a straight highway or a winding road that doubles in length every time the city doubles in size. Big-O strips away those constant-time shortcuts and asks: <em>what is the shape of this algorithm's growth curve?</em> A function that runs in <code>3n + 100</code> steps and one that runs in <code>n</code> steps are both <em>linear</em> — they belong to the same family and will behave similarly at massive scale.</p>
<p>The reason we care about growth rate rather than raw speed is that hardware improves constantly, but a fundamentally bad algorithm stays bad. An <code>O(n&sup2;)</code> solution that processes a million items requires a trillion operations — no processor upgrade fixes that. Big-O gives you a hardware-independent vocabulary to classify algorithms, which is why interviewers treat it as a baseline expectation. It also guides trade-offs: sometimes you accept a worse time complexity to get a better space complexity, or vice versa.</p>
<p>Reach for Big-O analysis any time you write a loop, call a library function, or choose a data structure. The most common mistake beginners make is confusing <em>average-case</em> with <em>worst-case</em> complexity — Big-O is normally worst-case unless explicitly stated otherwise. A second pitfall is forgetting hidden loops: calling <code>.sort()</code> inside a loop turns an apparent <code>O(n)</code> into <code>O(n&sup2; log n)</code>.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Drop constants and lower-order terms, then ask yourself: if the input doubles, does the work double (<code>O(n)</code>), quadruple (<code>O(n&sup2;)</code>), or barely change (<code>O(log n)</code>)? That question is the heart of every Big-O analysis.</div>

<div class="h2">What Big-O Actually Measures</div>
<p>Big-O is an upper bound on growth rate. We drop constants and lower-order terms because they're irrelevant at scale. <code>3n² + 5n + 100</code> → <code>O(n²)</code>. We care about the <em>shape</em> of the growth curve, not the exact milliseconds.</p>

<div class="diag"><pre>
  Time
   ▲
   │                                         O(2ⁿ)  ← factorial
   │                                    O(n!)
   │                              ╱
   │                         O(n²) ← nested loops
   │                    ╱
   │              O(n log n) ← merge sort, heap sort
   │          ╱
   │     O(n) ← single loop
   │  ╱
   │ O(log n) ← binary search
   │╱
   │ O(1) ← hash lookup, array index
   └───────────────────────────────────────────► n (input size)

Prefer: O(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(2ⁿ) > O(n!)
</pre></div>

<div class="h2">Complexity Cheat Sheet</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Notation</th><th>Name</th><th>Example</th><th>n=1000 ops</th><th>Acceptable?</th></tr></thead>
<tbody>
<tr><td><span class="o-great">O(1)</span></td><td>Constant</td><td>Hash lookup, array index</td><td>1</td><td>✅ Perfect</td></tr>
<tr><td><span class="o-great">O(log n)</span></td><td>Logarithmic</td><td>Binary search, BST ops</td><td>~10</td><td>✅ Excellent</td></tr>
<tr><td><span class="o-good">O(n)</span></td><td>Linear</td><td>Single loop, array scan</td><td>1,000</td><td>✅ Good</td></tr>
<tr><td><span class="o-good">O(n log n)</span></td><td>Linearithmic</td><td>Merge sort, heap sort</td><td>~10,000</td><td>✅ Good</td></tr>
<tr><td><span class="o-ok">O(n²)</span></td><td>Quadratic</td><td>Nested loops, bubble sort</td><td>1,000,000</td><td>⚠️ Sometimes OK</td></tr>
<tr><td><span class="o-bad">O(2ⁿ)</span></td><td>Exponential</td><td>Naive recursion, subsets</td><td>10³⁰⁰</td><td>❌ Avoid</td></tr>
<tr><td><span class="o-bad">O(n!)</span></td><td>Factorial</td><td>All permutations</td><td>10²⁵⁶⁷</td><td>❌ Never</td></tr>
</tbody>
</table></div>

<div class="h2">Data Structure Operations</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Structure</th><th>Access</th><th>Search</th><th>Insert</th><th>Delete</th><th>Space</th></tr></thead>
<tbody>
<tr><td>Array</td><td class="o-great">O(1)</td><td class="o-good">O(n)</td><td class="o-good">O(n)</td><td class="o-good">O(n)</td><td class="o-good">O(n)</td></tr>
<tr><td>Dynamic Array (end)</td><td class="o-great">O(1)</td><td class="o-good">O(n)</td><td class="o-great">O(1) amort</td><td class="o-ok">O(n)</td><td class="o-good">O(n)</td></tr>
<tr><td>Hash Map / Set</td><td>N/A</td><td class="o-great">O(1) avg</td><td class="o-great">O(1) avg</td><td class="o-great">O(1) avg</td><td class="o-good">O(n)</td></tr>
<tr><td>Linked List</td><td class="o-good">O(n)</td><td class="o-good">O(n)</td><td class="o-great">O(1) head</td><td class="o-great">O(1) known</td><td class="o-good">O(n)</td></tr>
<tr><td>Binary Search Tree</td><td class="o-great">O(log n)</td><td class="o-great">O(log n)</td><td class="o-great">O(log n)</td><td class="o-great">O(log n)</td><td class="o-good">O(n)</td></tr>
<tr><td>Heap (min/max)</td><td class="o-great">O(1) peak</td><td class="o-good">O(n)</td><td class="o-great">O(log n)</td><td class="o-great">O(log n)</td><td class="o-good">O(n)</td></tr>
<tr><td>Stack / Queue</td><td class="o-good">O(n)</td><td class="o-good">O(n)</td><td class="o-great">O(1)</td><td class="o-great">O(1)</td><td class="o-good">O(n)</td></tr>
</tbody>
</table></div>

<div class="h2">How to Calculate Big-O — Rules</div>
<div class="lang-toggle">
  <button class="lang-btn active" onclick="setLang(this,'js','complexity')">JS</button>
  <button class="lang-btn py" onclick="setLang(this,'py','complexity')">Python</button>
</div>
<div class="lang-panel active" id="complexity-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Reading Complexity from Code</span></div><pre><span class="cmt">// Rule 1: Consecutive statements → ADD complexities → keep dominant</span>
<span class="kw">function</span> <span class="fn">example</span>(arr, n) {
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) {}     <span class="cmt">// O(n)</span>
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++) {}     <span class="cmt">// O(n)</span>
  <span class="cmt">// Total: O(n) + O(n) = O(2n) = O(n)</span>
}

<span class="cmt">// Rule 2: Nested loops → MULTIPLY</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++)
  <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">0</span>; j &lt; n; j++) {}  <span class="cmt">// O(n²)</span>

<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++)
  <span class="kw">for</span> (<span class="kw">let</span> j = <span class="num">0</span>; j &lt; m; j++) {}  <span class="cmt">// O(n*m) — different variables!</span>

<span class="cmt">// Rule 3: Halving each step → O(log n)</span>
<span class="kw">let</span> i = n
<span class="kw">while</span> (i > <span class="num">1</span>) i = <span class="cls">Math</span>.<span class="fn">floor</span>(i / <span class="num">2</span>)  <span class="cmt">// O(log n)</span>

<span class="cmt">// Rule 4: Recursion — draw the call tree</span>
<span class="kw">function</span> <span class="fn">fib</span>(n) {  <span class="cmt">// T(n) = T(n-1) + T(n-2) + O(1) = O(2ⁿ)</span>
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> n
  <span class="kw">return</span> <span class="fn">fib</span>(n-<span class="num">1</span>) + <span class="fn">fib</span>(n-<span class="num">2</span>)  <span class="cmt">// 2 recursive calls → exponential</span>
}

<span class="cmt">// Rule 5: Drop constants, keep dominant term</span>
<span class="cmt">// O(5n² + 100n + 500) → O(n²)</span>
<span class="cmt">// O(n/2 + n/4 + n/8...) → O(n)
// O(n + n log n) → O(n log n)

// Space complexity — what extra memory do you use?</span>
<span class="kw">function</span> <span class="fn">reverseArray</span>(arr) {
  <span class="kw">return</span> [...arr].<span class="fn">reverse</span>()  <span class="cmt">// O(n) space — creates a copy</span>
}
<span class="kw">function</span> <span class="fn">reverseInPlace</span>(arr) {
  <span class="kw">let</span> l=<span class="num">0</span>, r=arr.length-<span class="num">1</span>
  <span class="kw">while</span>(l&lt;r) [arr[l++],arr[r--]]=[arr[r],arr[l]]
  <span class="cmt">// O(1) space — only 2 pointers</span>
}</pre></div>
</div>
<div class="lang-panel" id="complexity-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Reading Complexity from Code (Python)</span></div><pre><span class="py-cmt"># Rule 1: Consecutive → ADD → keep dominant</span>
<span class="py-kw">def</span> <span class="py-fn">example</span>(arr, n):
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(n): <span class="py-kw">pass</span>  <span class="py-cmt"># O(n)</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(n): <span class="py-kw">pass</span>  <span class="py-cmt"># O(n)</span>
    <span class="py-cmt"># Total: O(2n) = O(n)</span>

<span class="py-cmt"># Rule 2: Nested loops → MULTIPLY</span>
<span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(n):
    <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(n): <span class="py-kw">pass</span>  <span class="py-cmt"># O(n²)</span>

<span class="py-cmt"># Rule 3: Halving → O(log n)</span>
i = n
<span class="py-kw">while</span> i > <span class="py-num">1</span>:
    i //= <span class="py-num">2</span>  <span class="py-cmt"># O(log n)</span>

<span class="py-cmt"># Rule 4: Recursion tree</span>
<span class="py-kw">def</span> <span class="py-fn">fib</span>(n):  <span class="py-cmt"># O(2ⁿ) — two calls per level, n levels deep</span>
    <span class="py-kw">if</span> n &lt;= <span class="py-num">1</span>: <span class="py-kw">return</span> n
    <span class="py-kw">return</span> <span class="py-fn">fib</span>(n-<span class="py-num">1</span>) + <span class="py-fn">fib</span>(n-<span class="py-num">2</span>)

<span class="py-cmt"># Space complexity</span>
<span class="py-kw">def</span> <span class="py-fn">reverse_copy</span>(arr):
    <span class="py-kw">return</span> arr[::-<span class="py-num">1</span>]   <span class="py-cmt"># O(n) — new list</span>

<span class="py-kw">def</span> <span class="py-fn">reverse_in_place</span>(arr):
    l, r = <span class="py-num">0</span>, <span class="py-fn">len</span>(arr) - <span class="py-num">1</span>
    <span class="py-kw">while</span> l &lt; r:
        arr[l], arr[r] = arr[r], arr[l]
        l += <span class="py-num">1</span>; r -= <span class="py-num">1</span>
    <span class="py-cmt"># O(1) space — just two pointer variables</span></pre></div>
</div>

<div class="alert tip"><span class="alert-icon">💡</span><strong>Interview tip:</strong> Always state the time AND space complexity of your solution without being asked. Say it like: "This runs in O(n log n) time and O(n) space." It signals you think algorithmically by default.</div>

<div class="h2">5 Problems — Complexity Recognition</div>
<div class="problems-grid">

<problem-card num="P1" title="Count pairs that sum to target" difficulty="easy" tags="Array,HashSet">
<div class="prob-desc">Given an array of integers and a target, count how many pairs sum to the target. Each pair is unique (no duplicates).</div>
<div class="prob-example">Input: [1,5,3,2,7,5], target=8 → Output: 2 (pairs: [1,7],[3,5])</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Brute Force <span class="approach-tc">O(n²) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Check every pair with nested loops.</p></div>
  <div class="approach best"><div class="approach-name">✅ HashSet <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">For each number, check if (target - num) is in a set. Use a seen set to avoid counting duplicates twice.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','p1')">Python</button></div>
<div class="lang-panel active" id="p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashSet Solution — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">countPairs</span>(nums, target) {
  <span class="kw">const</span> seen = <span class="kw">new</span> <span class="cls">Set</span>()
  <span class="kw">const</span> usedPairs = <span class="kw">new</span> <span class="cls">Set</span>()
  <span class="kw">let</span> count = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> num <span class="kw">of</span> nums) {
    <span class="kw">const</span> complement = target - num
    <span class="kw">const</span> pairKey = <span class="cls">JSON</span>.<span class="fn">stringify</span>([<span class="cls">Math</span>.<span class="fn">min</span>(num, complement), <span class="cls">Math</span>.<span class="fn">max</span>(num, complement)])
    <span class="kw">if</span> (seen.<span class="fn">has</span>(complement) && !usedPairs.<span class="fn">has</span>(pairKey)) {
      count++
      usedPairs.<span class="fn">add</span>(pairKey)
    }
    seen.<span class="fn">add</span>(num)
  }
  <span class="kw">return</span> count
}
<span class="cmt">// [1,5,3,2,7,5], target=8 → 2</span></pre></div>
</div>
<div class="lang-panel" id="p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashSet Solution — O(n)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">count_pairs</span>(nums, target):
    seen = <span class="py-fn">set</span>()
    used_pairs = <span class="py-fn">set</span>()
    count = <span class="py-num">0</span>
    <span class="py-kw">for</span> num <span class="py-kw">in</span> nums:
        complement = target - num
        pair_key = (<span class="py-fn">min</span>(num, complement), <span class="py-fn">max</span>(num, complement))
        <span class="py-kw">if</span> complement <span class="py-kw">in</span> seen <span class="py-kw">and</span> pair_key <span class="py-kw">not in</span> used_pairs:
            count += <span class="py-num">1</span>
            used_pairs.add(pair_key)
        seen.add(num)
    <span class="py-kw">return</span> count</pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Find if array has duplicate within k distance" difficulty="easy" tags="Array,HashMap">
<div class="prob-desc">Given an integer array and an integer k, return true if there are two distinct indices i and j such that nums[i] == nums[j] and abs(i-j) &lt;= k.</div>
<div class="prob-example">Input: [1,2,3,1], k=3 → true | [1,2,3,1,2,3], k=2 → false</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ HashMap (index tracking) <span class="approach-tc">O(n) time · O(k) space</span></div><p style="font-size:12px;color:var(--muted)">Store last seen index for each value. Check if current index minus last index &lt;= k.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','p2')">Python</button></div>
<div class="lang-panel active" id="p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashMap — O(n) time, O(k) space</span></div><pre><span class="kw">function</span> <span class="fn">containsNearbyDuplicate</span>(nums, k) {
  <span class="kw">const</span> lastSeen = <span class="kw">new</span> <span class="cls">Map</span>()  <span class="cmt">// val → last index</span>
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length; i++) {
    <span class="kw">if</span> (lastSeen.<span class="fn">has</span>(nums[i]) && i - lastSeen.<span class="fn">get</span>(nums[i]) &lt;= k)
      <span class="kw">return</span> <span class="kw">true</span>
    lastSeen.<span class="fn">set</span>(nums[i], i)
  }
  <span class="kw">return</span> <span class="kw">false</span>
}</pre></div>
</div>
<div class="lang-panel" id="p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashMap — O(n)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">contains_nearby_duplicate</span>(nums, k):
    last_seen = {}  <span class="py-cmt"># val → index</span>
    <span class="py-kw">for</span> i, num <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(nums):
        <span class="py-kw">if</span> num <span class="py-kw">in</span> last_seen <span class="py-kw">and</span> i - last_seen[num] &lt;= k:
            <span class="py-kw">return</span> <span class="py-kw">True</span>
        last_seen[num] = i
    <span class="py-kw">return</span> <span class="py-kw">False</span></pre></div>
</div>
</problem-card>

<problem-card num="P3" title="First recurring character" difficulty="easy" tags="String,Set">
<div class="prob-desc">Find the first character in a string that appears twice. Return the character, or null if all are unique.</div>
<div class="prob-example">Input: "ABCABD" → 'A' | "ABCDE" → null</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Single-pass Set <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Walk the string, add each char to a set. Return the first char already in the set.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','p3')">Python</button></div>
<div class="lang-panel active" id="p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Set Solution</span></div><pre><span class="kw">function</span> <span class="fn">firstRecurring</span>(str) {
  <span class="kw">const</span> seen = <span class="kw">new</span> <span class="cls">Set</span>()
  <span class="kw">for</span> (<span class="kw">const</span> ch <span class="kw">of</span> str) {
    <span class="kw">if</span> (seen.<span class="fn">has</span>(ch)) <span class="kw">return</span> ch
    seen.<span class="fn">add</span>(ch)
  }
  <span class="kw">return</span> <span class="kw">null</span>
}</pre></div>
</div>
<div class="lang-panel" id="p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Set Solution</span></div><pre><span class="py-kw">def</span> <span class="py-fn">first_recurring</span>(s):
    seen = <span class="py-fn">set</span>()
    <span class="py-kw">for</span> ch <span class="py-kw">in</span> s:
        <span class="py-kw">if</span> ch <span class="py-kw">in</span> seen: <span class="py-kw">return</span> ch
        seen.add(ch)
    <span class="py-kw">return</span> <span class="py-kw">None</span></pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Count operations to reduce to 1 (analyze recursion)" difficulty="medium" tags="Math,Complexity">
<div class="prob-desc">Determine the Big-O of an operation that, given n: if n is even divide by 2; if odd subtract 1. Count total steps to reach 0. What is the time complexity?</div>
<div class="prob-example">n=8: 8→4→2→1→0 (4 steps, log₂(8)=3, ≈log n)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ O(log n) — each even step halves n <span class="approach-tc">O(log n) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Even steps halve n (dominant), odd steps subtract 1. At worst alternate, still O(log n) total steps.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','p4')">Python</button></div>
<div class="lang-panel active" id="p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Count Steps — O(log n)</span></div><pre><span class="kw">function</span> <span class="fn">countSteps</span>(n) {
  <span class="kw">let</span> steps = <span class="num">0</span>
  <span class="kw">while</span> (n > <span class="num">0</span>) {
    <span class="kw">if</span> (n % <span class="num">2</span> === <span class="num">0</span>) n /= <span class="num">2</span>
    <span class="kw">else</span> n -= <span class="num">1</span>
    steps++
  }
  <span class="kw">return</span> steps
  <span class="cmt">// n=8: steps=4, n=16: steps=5, n=1024: steps=11
  // Confirms O(log n)</span>
}</pre></div>
</div>
<div class="lang-panel" id="p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Count Steps — O(log n)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">count_steps</span>(n):
    steps = <span class="py-num">0</span>
    <span class="py-kw">while</span> n > <span class="py-num">0</span>:
        n = n // <span class="py-num">2</span> <span class="py-kw">if</span> n % <span class="py-num">2</span> == <span class="py-num">0</span> <span class="py-kw">else</span> n - <span class="py-num">1</span>
        steps += <span class="py-num">1</span>
    <span class="py-kw">return</span> steps</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Find all subsets (power set)" difficulty="hard" tags="Recursion,O(2ⁿ)">
<div class="prob-desc">Given an array with no duplicates, return all possible subsets. This is the classic O(2ⁿ) problem — understand WHY it can't be faster.</div>
<div class="prob-example">Input: [1,2,3] → [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]] (2³=8 subsets)</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Backtracking <span class="approach-tc">O(2ⁿ · n) time · O(2ⁿ) space</span></div><p style="font-size:12px;color:var(--muted)">Can't do better — there ARE 2ⁿ subsets to return. Time is optimal.</p></div>
  <div class="approach best"><div class="approach-name">✅ Iterative (bit mask) <span class="approach-tc">O(2ⁿ · n) time · O(2ⁿ) space</span></div><p style="font-size:12px;color:var(--muted)">For n items, iterate 0..2ⁿ-1. Each bit position represents include/exclude.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','p5')">Python</button></div>
<div class="lang-panel active" id="p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking + Iterative Bitmask — O(2ⁿ)</span></div><pre><span class="cmt">// Method 1: Backtracking (most intuitive)</span>
<span class="kw">function</span> <span class="fn">subsets</span>(nums) {
  <span class="kw">const</span> result = []
  <span class="kw">function</span> <span class="fn">bt</span>(start, current) {
    result.<span class="fn">push</span>([...current])      <span class="cmt">// add current subset</span>
    <span class="kw">for</span> (<span class="kw">let</span> i = start; i &lt; nums.length; i++) {
      current.<span class="fn">push</span>(nums[i])        <span class="cmt">// include nums[i]</span>
      <span class="fn">bt</span>(i + <span class="num">1</span>, current)            <span class="cmt">// recurse</span>
      current.<span class="fn">pop</span>()                <span class="cmt">// backtrack — exclude nums[i]</span>
    }
  }
  <span class="fn">bt</span>(<span class="num">0</span>, [])
  <span class="kw">return</span> result
}

<span class="cmt">// Method 2: Bitmask — each number 0..2ⁿ-1 represents a subset</span>
<span class="kw">function</span> <span class="fn">subsetsBitmask</span>(nums) {
  <span class="kw">const</span> n = nums.length, result = []
  <span class="kw">for</span> (<span class="kw">let</span> mask = <span class="num">0</span>; mask &lt; (<span class="num">1</span> &lt;&lt; n); mask++) {
    <span class="kw">const</span> subset = []
    <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; n; i++)
      <span class="kw">if</span> (mask & (<span class="num">1</span> &lt;&lt; i)) subset.<span class="fn">push</span>(nums[i])  <span class="cmt">// bit i set → include</span>
    result.<span class="fn">push</span>(subset)
  }
  <span class="kw">return</span> result
}
<span class="cmt">// n=3: mask 0=[], 1=[1], 2=[2], 3=[1,2], 4=[3], 5=[1,3], 6=[2,3], 7=[1,2,3]</span></pre></div>
</div>
<div class="lang-panel" id="p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Backtracking + Bitmask — O(2ⁿ)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">subsets</span>(nums):
    result = []
    <span class="py-kw">def</span> <span class="py-fn">bt</span>(start, current):
        result.append(list(current))
        <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(start, <span class="py-fn">len</span>(nums)):
            current.append(nums[i])
            <span class="py-fn">bt</span>(i + <span class="py-num">1</span>, current)
            current.pop()           <span class="py-cmt"># backtrack</span>
    <span class="py-fn">bt</span>(<span class="py-num">0</span>, [])
    <span class="py-kw">return</span> result

<span class="py-cmt"># Bitmask</span>
<span class="py-kw">def</span> <span class="py-fn">subsets_bitmask</span>(nums):
    n, result = <span class="py-fn">len</span>(nums), []
    <span class="py-kw">for</span> mask <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span> &lt;&lt; n):
        result.append([nums[i] <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(n) <span class="py-kw">if</span> mask &amp; (<span class="py-num">1</span> &lt;&lt; i)])
    <span class="py-kw">return</span> result</pre></div>
</div>
</problem-card>

</div><!-- end problems-grid -->
</div><!-- end sec-body -->
</div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_complexity.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
