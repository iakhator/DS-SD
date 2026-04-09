// Section: arrays
// Auto-extracted from index.html
const _html_arrays = String.raw`
<div id="sec-arrays" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Foundation · 02</span></div><div class="sec-title">Arrays & Strings</div></div>
<div class="sec-lead">Arrays are contiguous memory. Random access is O(1). Insert/delete anywhere except end is O(n) because elements shift. Strings are immutable arrays of characters in most languages — concatenation in a loop is O(n²) unless you use a buffer.</div>
<div class="sec-divider"></div>
<div class="sec-body">

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
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_arrays.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
