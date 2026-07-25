// Section: arrays
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_arrays = String.raw`
<div id="sec-arrays" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Foundation · 02</span></div><div class="sec-title">Arrays & Strings</div></div>
<div class="sec-lead">Arrays are contiguous memory. Random access is O(1). Insert/delete anywhere except end is O(n) because elements shift. Strings are immutable arrays of characters in most languages — concatenation in a loop is O(n²) unless you use a buffer.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine a row of numbered post-office boxes bolted to a wall. Every box is the same size, they sit side-by-side in memory, and you can walk directly to box #42 without checking any other box first — that is constant-time random access, <code>O(1)</code>. The physical metaphor also explains the cost of insertion: if you want to squeeze a new box between boxes 3 and 4, you have to slide every box from 4 onward one position to the right, which is <code>O(n)</code> work. Arrays are the fundamental building block almost every other data structure is built upon, so internalizing this layout pays dividends everywhere.</p>
<p>Arrays solve the problem of storing and retrieving ordered data with minimal overhead. Because elements live at contiguous memory addresses, the CPU cache loves them — iterating an array is much faster in practice than the same traversal on a linked list, even though both are <code>O(n)</code> on paper. Many elegant algorithmic techniques — prefix sums, two pointers, sliding window — exist precisely to exploit this contiguous layout and avoid repeatedly re-scanning the same elements.</p>
<p>Reach for arrays (or the language's dynamic-array equivalent like a Python list or a JavaScript array) whenever you need fast indexed access, know the rough size of your data, or plan to iterate sequentially. A common mistake is building a result string by concatenating in a loop: each concatenation copies the entire string so far, turning an innocent-looking loop into <code>O(n&sup2;)</code> work. The fix is to collect parts in an array and join once at the end — a pattern worth memorizing immediately.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Arrays give you <code>O(1)</code> read and <code>O(1)</code> append-to-end, but <code>O(n)</code> insert/delete anywhere else. Design your algorithm to touch the end of the array, not the middle, whenever possible.</div>

<div class="h2">Core Concepts</div>
<div class="diag"><pre>
Array: [10][20][30][40][50]
        0    1    2    3    4    ← indices
        ↑                   ↑
      O(1) read          O(1) push/pop (end)

Insert at index 2: [10][20][NEW][30][40][50]
                    Shift 30,40,50 right → O(n)

String concatenation in loop:
  s = ""
  for i in range(n): s += chars[i]
  → O(1+2+3+...+n) = O(n²)  ← classic pitfall!
  Fix: use array, join at end → O(n)
</pre></div>

<div class="h2">Essential Patterns</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','arr-patterns')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','arr-patterns')">Python</button></div>
<div class="lang-panel active" id="arr-patterns-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Must-Know Array Techniques</span></div><pre><span class="cmt">// ── Prefix Sum ─────────────────────────────────────</span>
<span class="cmt">// Precompute cumulative sums → range sum in O(1)</span>
<span class="kw">function</span> <span class="fn">buildPrefix</span>(arr) {
  <span class="kw">const</span> pre = [<span class="num">0</span>]  <span class="cmt">// pre[i] = sum of arr[0..i-1]</span>
  <span class="kw">for</span> (<span class="kw">const</span> x <span class="kw">of</span> arr) pre.<span class="fn">push</span>(pre.<span class="fn">at</span>(-<span class="num">1</span>) + x)
  <span class="kw">return</span> pre
}
<span class="cmt">// Range sum [l, r] inclusive:</span>
<span class="kw">const</span> <span class="fn">rangeSum</span> = (pre, l, r) => pre[r+<span class="num">1</span>] - pre[l]  <span class="cmt">// O(1)!</span>

<span class="cmt">// ── Kadane's Algorithm ─────────────────────────────</span>
<span class="cmt">// Maximum subarray sum — classic DP in O(n)</span>
<span class="kw">function</span> <span class="fn">maxSubarray</span>(nums) {
  <span class="kw">let</span> maxSum = -<span class="cls">Infinity</span>, curr = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) {
    curr = <span class="cls">Math</span>.<span class="fn">max</span>(n, curr + n)   <span class="cmt">// extend or restart</span>
    maxSum = <span class="cls">Math</span>.<span class="fn">max</span>(maxSum, curr)
  }
  <span class="kw">return</span> maxSum
}

<span class="cmt">// ── Dutch National Flag (3-way partition) ──────────</span>
<span class="cmt">// Sort [0,1,2] in O(n) with O(1) space</span>
<span class="kw">function</span> <span class="fn">sortColors</span>(nums) {
  <span class="kw">let</span> lo=<span class="num">0</span>, mid=<span class="num">0</span>, hi=nums.length-<span class="num">1</span>
  <span class="kw">while</span> (mid &lt;= hi) {
    <span class="kw">if</span>      (nums[mid] === <span class="num">0</span>) [nums[lo++],nums[mid++]] = [nums[mid],nums[lo]]
    <span class="kw">else if</span> (nums[mid] === <span class="num">2</span>) [nums[mid],nums[hi--]]   = [nums[hi],nums[mid]]
    <span class="kw">else</span> mid++
  }
}

<span class="cmt">// ── String Builder (avoid O(n²) concat) ───────────</span>
<span class="kw">function</span> <span class="fn">buildString</span>(chars) {
  <span class="kw">const</span> buf = []
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> chars) buf.<span class="fn">push</span>(c)
  <span class="kw">return</span> buf.<span class="fn">join</span>(<span class="str">''</span>)  <span class="cmt">// O(n) total</span>
}</pre></div>
</div>
<div class="lang-panel" id="arr-patterns-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Must-Know Array Techniques (Python)</span></div><pre><span class="py-cmt"># ── Prefix Sum ─────────────────────────────────────</span>
<span class="py-kw">from</span> itertools <span class="py-kw">import</span> accumulate
<span class="py-kw">def</span> <span class="py-fn">range_sum</span>(arr, l, r):
    pre = [<span class="py-num">0</span>] + list(accumulate(arr))
    <span class="py-kw">return</span> pre[r+<span class="py-num">1</span>] - pre[l]

<span class="py-cmt"># ── Kadane's Algorithm ─────────────────────────────</span>
<span class="py-kw">def</span> <span class="py-fn">max_subarray</span>(nums):
    max_sum = curr = nums[<span class="py-num">0</span>]
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums[<span class="py-num">1</span>:]:
        curr = <span class="py-fn">max</span>(n, curr + n)
        max_sum = <span class="py-fn">max</span>(max_sum, curr)
    <span class="py-kw">return</span> max_sum

<span class="py-cmt"># ── Dutch National Flag ─────────────────────────────</span>
<span class="py-kw">def</span> <span class="py-fn">sort_colors</span>(nums):
    lo, mid, hi = <span class="py-num">0</span>, <span class="py-num">0</span>, <span class="py-fn">len</span>(nums) - <span class="py-num">1</span>
    <span class="py-kw">while</span> mid &lt;= hi:
        <span class="py-kw">if</span>   nums[mid] == <span class="py-num">0</span>: nums[lo], nums[mid] = nums[mid], nums[lo]; lo += <span class="py-num">1</span>; mid += <span class="py-num">1</span>
        <span class="py-kw">elif</span> nums[mid] == <span class="py-num">2</span>: nums[mid], nums[hi] = nums[hi], nums[mid]; hi -= <span class="py-num">1</span>
        <span class="py-kw">else</span>: mid += <span class="py-num">1</span>

<span class="py-cmt"># ── String Builder ──────────────────────────────────</span>
<span class="py-kw">def</span> <span class="py-fn">build_string</span>(chars):
    <span class="py-kw">return</span> <span class="py-str">''</span>.join(chars)   <span class="py-cmt"># O(n), not O(n²)</span></pre></div>
</div>

<div class="h2">5 Problems — Arrays & Strings</div>
<div class="problems-grid">

<problem-card num="P1" title="Two Sum" difficulty="easy" tags="HashMap">
<div class="prob-desc">Given array of integers and a target, return indices of two numbers that add up to target. Exactly one solution exists.</div>
<div class="prob-example">Input: [2,7,11,15], target=9 → [0,1] (2+7=9)</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Brute Force <span class="approach-tc">O(n²) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Check every pair.</p></div>
  <div class="approach best"><div class="approach-name">✅ HashMap — 1 pass <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">For each number, check if complement (target-num) is already in map. If yes, done.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','arr-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','arr-p1')">Python</button></div>
<div class="lang-panel active" id="arr-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">One-pass HashMap</span></div><pre><span class="kw">function</span> <span class="fn">twoSum</span>(nums, target) {
  <span class="kw">const</span> map = <span class="kw">new</span> <span class="cls">Map</span>()  <span class="cmt">// value → index</span>
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length; i++) {
    <span class="kw">const</span> comp = target - nums[i]
    <span class="kw">if</span> (map.<span class="fn">has</span>(comp)) <span class="kw">return</span> [map.<span class="fn">get</span>(comp), i]
    map.<span class="fn">set</span>(nums[i], i)
  }
}</pre></div></div>
<div class="lang-panel" id="arr-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">One-pass HashMap</span></div><pre><span class="py-kw">def</span> <span class="py-fn">two_sum</span>(nums, target):
    seen = {}   <span class="py-cmt"># value → index</span>
    <span class="py-kw">for</span> i, n <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(nums):
        comp = target - n
        <span class="py-kw">if</span> comp <span class="py-kw">in</span> seen: <span class="py-kw">return</span> [seen[comp], i]
        seen[n] = i</pre></div>
</div>
<algo-visualizer id="viz-arr-p1" title="One-pass HashMap — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Best Time to Buy and Sell Stock" difficulty="easy" tags="Array,Greedy">
<div class="prob-desc">Given prices array where prices[i] is the price on day i, return max profit from one buy and one sell. Must buy before selling.</div>
<div class="prob-example">Input: [7,1,5,3,6,4] → 5 (buy at 1, sell at 6)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Track running min <span class="approach-tc">O(n) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Single pass: track min price seen so far. At each step, profit = price - minSoFar. Track maxProfit.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','arr-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','arr-p2')">Python</button></div>
<div class="lang-panel active" id="arr-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">O(n) — Track Min</span></div><pre><span class="kw">function</span> <span class="fn">maxProfit</span>(prices) {
  <span class="kw">let</span> minPrice = <span class="cls">Infinity</span>, maxProfit = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> p <span class="kw">of</span> prices) {
    minPrice = <span class="cls">Math</span>.<span class="fn">min</span>(minPrice, p)
    maxProfit = <span class="cls">Math</span>.<span class="fn">max</span>(maxProfit, p - minPrice)
  }
  <span class="kw">return</span> maxProfit
}</pre></div></div>
<div class="lang-panel" id="arr-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">O(n) — Track Min</span></div><pre><span class="py-kw">def</span> <span class="py-fn">max_profit</span>(prices):
    min_price, max_profit = <span class="py-fn">float</span>(<span class="py-str">'inf'</span>), <span class="py-num">0</span>
    <span class="py-kw">for</span> p <span class="py-kw">in</span> prices:
        min_price = <span class="py-fn">min</span>(min_price, p)
        max_profit = <span class="py-fn">max</span>(max_profit, p - min_price)
    <span class="py-kw">return</span> max_profit</pre></div>
</div>
<algo-visualizer id="viz-arr-p2" title="Track Running Min — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Product of Array Except Self" difficulty="medium" tags="Prefix,No Division">
<div class="prob-desc">Return an array where output[i] is the product of all elements except nums[i]. Must solve in O(n) without using division.</div>
<div class="prob-example">Input: [1,2,3,4] → [24,12,8,6]</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Left×Right prefix product <span class="approach-tc">O(n) time · O(1) extra space</span></div><p style="font-size:12px;color:var(--muted)">First pass: fill output with left products. Second pass (right to left): multiply by running right product.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','arr-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','arr-p3')">Python</button></div>
<div class="lang-panel active" id="arr-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Left × Right Products — O(n) O(1)</span></div><pre><span class="kw">function</span> <span class="fn">productExceptSelf</span>(nums) {
  <span class="kw">const</span> n = nums.length
  <span class="kw">const</span> out = <span class="kw">new</span> <span class="cls">Array</span>(n).<span class="fn">fill</span>(<span class="num">1</span>)
  <span class="cmt">// Left pass: out[i] = product of all elements to the LEFT of i</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">1</span>; i&lt;n; i++) out[i] = out[i-<span class="num">1</span>] * nums[i-<span class="num">1</span>]
  <span class="cmt">// Right pass: multiply by running product from RIGHT</span>
  <span class="kw">let</span> right = <span class="num">1</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=n-<span class="num">1</span>; i&gt;=<span class="num">0</span>; i--) {
    out[i] *= right
    right *= nums[i]
  }
  <span class="kw">return</span> out
}
<span class="cmt">// [1,2,3,4]: left=[1,1,2,6], then right pass → [24,12,8,6]</span></pre></div></div>
<div class="lang-panel" id="arr-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Left × Right — O(n) O(1)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">product_except_self</span>(nums):
    n = <span class="py-fn">len</span>(nums)
    out = [<span class="py-num">1</span>] * n
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>, n):
        out[i] = out[i-<span class="py-num">1</span>] * nums[i-<span class="py-num">1</span>]
    right = <span class="py-num">1</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(n-<span class="py-num">1</span>, -<span class="py-num">1</span>, -<span class="py-num">1</span>):
        out[i] *= right
        right *= nums[i]
    <span class="py-kw">return</span> out</pre></div>
</div>
<algo-visualizer id="viz-arr-p3" title="Left × Right Prefix Products — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Maximum Subarray (Kadane's)" difficulty="medium" tags="DP,Kadane">
<div class="prob-desc">Find the contiguous subarray (at least one element) with the largest sum and return its sum.</div>
<div class="prob-example">Input: [-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1])</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Brute Force <span class="approach-tc">O(n²) or O(n³)</span></div><p style="font-size:12px;color:var(--muted)">Check all subarrays.</p></div>
  <div class="approach best"><div class="approach-name">✅ Kadane's Algorithm <span class="approach-tc">O(n) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">At each index: is it better to extend the existing subarray or start fresh? max(num, curr+num). Track global max.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','arr-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','arr-p4')">Python</button></div>
<div class="lang-panel active" id="arr-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Kadane's — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">maxSubArray</span>(nums) {
  <span class="kw">let</span> curr = nums[<span class="num">0</span>], best = nums[<span class="num">0</span>]
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">1</span>; i&lt;nums.length; i++) {
    curr = <span class="cls">Math</span>.<span class="fn">max</span>(nums[i], curr + nums[i])  <span class="cmt">// restart or extend</span>
    best = <span class="cls">Math</span>.<span class="fn">max</span>(best, curr)
  }
  <span class="kw">return</span> best
}</pre></div></div>
<div class="lang-panel" id="arr-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Kadane's — O(n)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">max_sub_array</span>(nums):
    curr = best = nums[<span class="py-num">0</span>]
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums[<span class="py-num">1</span>:]:
        curr = <span class="py-fn">max</span>(n, curr + n)
        best = <span class="py-fn">max</span>(best, curr)
    <span class="py-kw">return</span> best</pre></div>
</div>
<algo-visualizer id="viz-arr-p4" title="Kadane's Algorithm — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Trapping Rain Water" difficulty="hard" tags="Two Pointers,Prefix Max">
<div class="prob-desc">Given n non-negative integers representing elevation heights, compute how much water can be trapped after raining.</div>
<div class="prob-example">Input: [0,1,0,2,1,0,1,3,2,1,2,1] → 6</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Prefix+Suffix Max Arrays <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Water at i = min(maxLeft[i], maxRight[i]) - height[i]</p></div>
  <div class="approach best"><div class="approach-name">✅ Two Pointers <span class="approach-tc">O(n) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Use left/right pointers moving inward. The side with the smaller max determines how much water that side holds.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','arr-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','arr-p5')">Python</button></div>
<div class="lang-panel active" id="arr-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Two Pointer — O(n) O(1)</span></div><pre><span class="kw">function</span> <span class="fn">trap</span>(height) {
  <span class="kw">let</span> l=<span class="num">0</span>, r=height.length-<span class="num">1</span>
  <span class="kw">let</span> maxL=<span class="num">0</span>, maxR=<span class="num">0</span>, water=<span class="num">0</span>
  <span class="kw">while</span> (l &lt; r) {
    <span class="kw">if</span> (height[l] &lt; height[r]) {
      <span class="cmt">// left side is the bottleneck</span>
      maxL = <span class="cls">Math</span>.<span class="fn">max</span>(maxL, height[l])
      water += maxL - height[l]   <span class="cmt">// guaranteed ≥ 0</span>
      l++
    } <span class="kw">else</span> {
      maxR = <span class="cls">Math</span>.<span class="fn">max</span>(maxR, height[r])
      water += maxR - height[r]
      r--
    }
  }
  <span class="kw">return</span> water
}</pre></div></div>
<div class="lang-panel" id="arr-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Two Pointer — O(n) O(1)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">trap</span>(height):
    l, r = <span class="py-num">0</span>, <span class="py-fn">len</span>(height) - <span class="py-num">1</span>
    max_l = max_r = water = <span class="py-num">0</span>
    <span class="py-kw">while</span> l &lt; r:
        <span class="py-kw">if</span> height[l] &lt; height[r]:
            max_l = <span class="py-fn">max</span>(max_l, height[l])
            water += max_l - height[l]; l += <span class="py-num">1</span>
        <span class="py-kw">else</span>:
            max_r = <span class="py-fn">max</span>(max_r, height[r])
            water += max_r - height[r]; r -= <span class="py-num">1</span>
    <span class="py-kw">return</span> water</pre></div>
</div>
<algo-visualizer id="viz-arr-p5" title="Two Pointer — trace"></algo-visualizer>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_arrays.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Arrays & Strings problems ─
function wireVisualizers() {
  // ── P1: Two Sum — one-pass hashmap ──────────────────────────────────────
  function traceTwoSum(nums, target) {
    const map = new Map();
    const steps = [{ i: -1, map: {}, note: 'Start — map = {}.', line: 2, pyLine: 2 }];
    for (let i = 0; i < nums.length; i++) {
      const comp = target - nums[i];
      if (map.has(comp)) {
        steps.push({ i, map: Object.fromEntries(map), found: [map.get(comp), i], final: true, stop: true,
          note: `i=${i}: need ${comp}, found at index ${map.get(comp)} → return [${map.get(comp)}, ${i}].`, line: 5, pyLine: 5 });
        return steps;
      }
      map.set(nums[i], i);
      steps.push({ i, map: Object.fromEntries(map), note: `i=${i}: need ${comp}, not in map. Add ${nums[i]}→${i}.`, line: 6, pyLine: 6 });
    }
    steps.push({ i: -1, map: Object.fromEntries(map), final: true, note: 'No solution found.', line: 8, pyLine: 6 });
    return steps;
  }

  function renderTwoSum(nums) {
    return (stage, step) => {
      const mapChips = Object.entries(step.map).map(([val, idx]) => `${val}:${idx}`);
      stage.innerHTML = `
        ${cellsRow(nums,
          (v, i) => step.found ? (step.found.includes(i) ? 'match' : 'dim') : (i === step.i ? 'cur' : ''),
          (v, i) => i === step.i ? 'i' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">map (val:idx)</div>${chips(mapChips)}</div>
        </div>`;
    };
  }

  // ── P2: Best Time to Buy/Sell Stock — track running min ────────────────
  function traceMaxProfit(prices) {
    let minPrice = Infinity, maxProfit = 0;
    const steps = [{ i: -1, minPrice, maxProfit, note: 'Start — minPrice=∞, maxProfit=0.', line: 2, pyLine: 2 }];
    prices.forEach((p, i) => {
      minPrice = Math.min(minPrice, p);
      maxProfit = Math.max(maxProfit, p - minPrice);
      steps.push({ i, minPrice, maxProfit,
        note: `i=${i}: price=${p} → minPrice=${minPrice}, profit=${p}-${minPrice}=${p - minPrice} → maxProfit=${maxProfit}.`, line: 5, pyLine: 5 });
    });
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMaxProfit(prices) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(prices, (v, i) => step.final ? 'dim' : (i === step.i ? 'cur' : ''), (v, i) => i === step.i ? 'i' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">min price</div><div class="viz-counter" style="font-size:20px">${step.minPrice === Infinity ? '∞' : step.minPrice}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.maxProfit}<span class="viz-counter-label">max profit</span></div></div>
        </div>`;
    };
  }

  // ── P3: Product of Array Except Self — left pass then right pass ───────
  function traceProductExceptSelf(nums) {
    const n = nums.length;
    const out = new Array(n).fill(1);
    const steps = [{ phase: 'start', i: -1, out: [...out], note: 'Start — out filled with 1s.', line: 3, pyLine: 3 }];
    for (let i = 1; i < n; i++) {
      out[i] = out[i - 1] * nums[i - 1];
      steps.push({ phase: 'left', i, out: [...out], note: `left pass i=${i}: out[${i}] = out[${i - 1}]×nums[${i - 1}] = ${out[i]}.`, line: 5, pyLine: 5 });
    }
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
      out[i] *= right;
      steps.push({ phase: 'right', i, out: [...out], note: `right pass i=${i}: out[${i}] ×= running right(${right}) → ${out[i]}.`, line: 9, pyLine: 8 });
      right *= nums[i];
    }
    steps.push({ phase: 'done', i: -1, out: [...out], final: true, note: `Done. Result = [${out.join(',')}].`, line: 12, pyLine: 10 });
    return steps;
  }

  function renderProductExceptSelf(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">nums</div>
        ${cellsRow(nums, (v, i) => i === step.i ? (step.phase === 'left' ? 'cur' : 'cur2') : '')}
        <div class="viz-panel-lbl" style="margin-top:12px">out</div>
        ${cellsRow(step.out, (v, i) => step.final ? 'match' : (i === step.i ? (step.phase === 'left' ? 'cur' : 'cur2') : ''))}`;
    };
  }

  // ── P4: Maximum Subarray — Kadane's algorithm ───────────────────────────
  function traceMaxSubArray(nums) {
    let curr = nums[0], best = nums[0];
    const steps = [{ i: 0, curr, best, note: `Start i=0: curr=best=${nums[0]}.`, line: 2, pyLine: 2 }];
    for (let i = 1; i < nums.length; i++) {
      const restart = nums[i] > curr + nums[i];
      curr = Math.max(nums[i], curr + nums[i]);
      best = Math.max(best, curr);
      steps.push({ i, curr, best, note: `i=${i}: ${restart ? `restart at ${nums[i]}` : `extend by ${nums[i]}`} → curr=${curr}, best=${best}.`, line: 4, pyLine: 4 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMaxSubArray(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums, (v, i) => step.final ? 'dim' : (i === step.i ? 'cur' : ''), (v, i) => i === step.i ? 'i' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">curr</div><div class="viz-counter" style="font-size:20px">${step.curr}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.best}<span class="viz-counter-label">best so far</span></div></div>
        </div>`;
    };
  }

  // ── P5: Trapping Rain Water — two pointers with running maxes ──────────
  function traceTrap(height) {
    let l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;
    const steps = [{ l, r, maxL, maxR, water, note: `Start l=0, r=${r}.`, line: 3, pyLine: 3 }];
    while (l < r) {
      if (height[l] < height[r]) {
        maxL = Math.max(maxL, height[l]);
        water += maxL - height[l];
        steps.push({ l, r, maxL, maxR, water, side: 'L', note: `l=${l}: maxL=${maxL}, water += ${maxL - height[l]} → water=${water}.`, line: 8, pyLine: 7 });
        l++;
      } else {
        maxR = Math.max(maxR, height[r]);
        water += maxR - height[r];
        steps.push({ l, r, maxL, maxR, water, side: 'R', note: `r=${r}: maxR=${maxR}, water += ${maxR - height[r]} → water=${water}.`, line: 12, pyLine: 10 });
        r--;
      }
    }
    steps.push({ l, r, maxL, maxR, water, final: true, note: `Done. Total water trapped = ${water}.`, line: 16, pyLine: 11 });
    return steps;
  }

  function renderTrap(height) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(height, (v, i) => step.final ? 'dim' : (i === step.l ? 'cur' : i === step.r ? 'cur2' : ''), (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">maxL / maxR</div><div class="viz-counter" style="font-size:18px">${step.maxL} / ${step.maxR}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.water}<span class="viz-counter-label">water trapped</span></div></div>
        </div>`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  const p1Nums = [2, 7, 11, 15], p1Target = 9;
  mountVisualizer('viz-arr-p1', traceTwoSum(p1Nums, p1Target), withCode('arr-p1', renderTwoSum(p1Nums)));

  const p2Prices = [7, 1, 5, 3, 6, 4];
  mountVisualizer('viz-arr-p2', traceMaxProfit(p2Prices), withCode('arr-p2', renderMaxProfit(p2Prices)));

  const p3Nums = [1, 2, 3, 4];
  mountVisualizer('viz-arr-p3', traceProductExceptSelf(p3Nums), withCode('arr-p3', renderProductExceptSelf(p3Nums)));

  const p4Nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  mountVisualizer('viz-arr-p4', traceMaxSubArray(p4Nums), withCode('arr-p4', renderMaxSubArray(p4Nums)));

  const p5Height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  mountVisualizer('viz-arr-p5', traceTrap(p5Height), withCode('arr-p5', renderTrap(p5Height)));
}
