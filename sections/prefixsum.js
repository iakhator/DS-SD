// Section: prefixsum
// Prefix Sum pattern — added to complete the 8 core patterns.
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer, renderGrid } from '../components/viz-kit.js';

const _html_prefixsum = String.raw`
<div id="sec-prefixsum" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Patterns · 24</span></div><div class="sec-title">Prefix Sum</div></div>
<div class="sec-lead">A prefix sum (also called a cumulative sum or running total) is a precomputed array where each entry holds the sum of every element before it. Build it once in O(n), and afterwards the sum of <em>any</em> subarray is answered in O(1) by a single subtraction. It is the go-to pattern whenever a problem repeatedly asks "what is the total of this range?"</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine walking along the array and writing down your running total at every step. Once you have those totals, the sum between two points is just <strong>"total at the end" minus "total at the start"</strong> — the same way your bank balance change over a month is just the closing balance minus the opening balance, no matter how many transactions happened in between.</p>
<p>The key design choice is to make the prefix array <strong>one element longer</strong> than the input and start it with a leading <code>0</code>. That leading zero represents "the sum of nothing yet" and removes every off-by-one headache: with <code>prefix[0] = 0</code>, the sum of the original elements from index <code>l</code> to <code>r</code> inclusive is always <code>prefix[r+1] - prefix[l]</code>. No special case for "the range starts at index 0".</p>
<p>Prefix sum trades a one-time O(n) build and O(n) extra memory for unlimited O(1) range queries afterwards. If a problem asks a single range sum, a plain loop is fine. The moment it asks for <em>many</em> range sums — or hides a range-sum question inside a harder problem — reach for prefix sum.</p>

<div class="diag"><pre>
arr      =  [ 3,  1,  4,  1,  5,  9,  2 ]
index         0   1   2   3   4   5   6

prefix   =  [0,  3,  4,  8,  9, 14, 23, 25]
index        0   1   2   3   4   5   6   7
             │                       │
             └ sum of nothing        └ sum of everything

sum of arr[2..5]  (the 4,1,5,9)
   = prefix[6] - prefix[2]
   =    23     -    4      =  19
</pre></div>

<div class="h2">When To Reach For It</div>
<div class="grid-2">
  <div class="card"><div class="card-title blue">Strong signals</div><p>Repeated "sum of range" queries · "subarray that sums to K" · running totals · 2D region sums · problems where a hidden equation rearranges into prefix[j] − prefix[i].</p></div>
  <div class="card"><div class="card-title green">Pairs perfectly with a hash map</div><p>To count or find subarrays with a target sum, store each prefix value in a map as you go. For the current prefix S, the number of valid subarrays ending here equals how many earlier prefixes equal S − K.</p></div>
</div>

<div class="h2">The Template</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ps-template')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ps-template')">Python</button></div>
<div class="lang-panel active" id="ps-template-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Build Once, Query Forever</span></div><pre><span class="cmt">// 1. Build the prefix array (length n+1, leading 0)</span>
<span class="kw">function</span> <span class="fn">buildPrefix</span>(arr) {
  <span class="kw">const</span> prefix = [<span class="num">0</span>]
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; arr.length; i++)
    prefix.<span class="fn">push</span>(prefix[i] + arr[i])  <span class="cmt">// running total</span>
  <span class="kw">return</span> prefix
}

<span class="cmt">// 2. Sum of arr[l..r] INCLUSIVE — O(1) per query</span>
<span class="kw">function</span> <span class="fn">rangeSum</span>(prefix, l, r) {
  <span class="kw">return</span> prefix[r + <span class="num">1</span>] - prefix[l]
}

<span class="cmt">// Hash-map variant: count subarrays summing to k</span>
<span class="kw">function</span> <span class="fn">countSubarrays</span>(nums, k) {
  <span class="kw">const</span> seen = <span class="kw">new</span> <span class="cls">Map</span>([[<span class="num">0</span>, <span class="num">1</span>]])  <span class="cmt">// prefixSum -&gt; how many times seen</span>
  <span class="kw">let</span> sum = <span class="num">0</span>, count = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) {
    sum += n
    count += seen.<span class="fn">get</span>(sum - k) ?? <span class="num">0</span>   <span class="cmt">// earlier prefixes that close a window</span>
    seen.<span class="fn">set</span>(sum, (seen.<span class="fn">get</span>(sum) ?? <span class="num">0</span>) + <span class="num">1</span>)
  }
  <span class="kw">return</span> count
}</pre></div></div>
<div class="lang-panel" id="ps-template-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Build Once, Query Forever (Python)</span></div><pre><span class="py-cmt"># 1. Build the prefix array (length n+1, leading 0)</span>
<span class="py-kw">def</span> <span class="py-fn">build_prefix</span>(arr):
    prefix = [<span class="py-num">0</span>]
    <span class="py-kw">for</span> x <span class="py-kw">in</span> arr:
        prefix.append(prefix[-<span class="py-num">1</span>] + x)   <span class="py-cmt"># running total</span>
    <span class="py-kw">return</span> prefix

<span class="py-cmt"># 2. Sum of arr[l..r] INCLUSIVE — O(1) per query</span>
<span class="py-kw">def</span> <span class="py-fn">range_sum</span>(prefix, l, r):
    <span class="py-kw">return</span> prefix[r + <span class="py-num">1</span>] - prefix[l]

<span class="py-cmt"># Hash-map variant: count subarrays summing to k</span>
<span class="py-kw">from</span> collections <span class="py-kw">import</span> defaultdict
<span class="py-kw">def</span> <span class="py-fn">count_subarrays</span>(nums, k):
    seen = defaultdict(<span class="py-fn">int</span>)
    seen[<span class="py-num">0</span>] = <span class="py-num">1</span>            <span class="py-cmt"># empty prefix seen once</span>
    s = count = <span class="py-num">0</span>
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums:
        s += n
        count += seen[s - k]   <span class="py-cmt"># prefixes that close a window</span>
        seen[s] += <span class="py-num">1</span>
    <span class="py-kw">return</span> count</pre></div></div>

<div class="alert tip"><span class="alert-icon">💡</span><strong>Why seed the map with {0: 1}?</strong> A subarray that starts at index 0 has no "earlier prefix" to subtract. Seeding the empty prefix <code>0</code> with a count of 1 lets those whole-array-from-the-start subarrays be counted correctly. Forgetting it is the single most common prefix-sum bug.</div>

<div class="h2">Variations You Should Recognise</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Variant</th><th>Idea</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td>1D prefix sum</td><td><code>prefix[i+1] = prefix[i] + arr[i]</code></td><td>Range sum, subarray sum equals K</td></tr>
<tr><td>Prefix sum + hash map</td><td>Store seen prefixes; look up <code>S − K</code></td><td>Count / find subarrays with target sum</td></tr>
<tr><td>Prefix XOR</td><td>Same idea, replace <code>+</code> with <code>^</code></td><td>Subarrays with a target XOR</td></tr>
<tr><td>Prefix count / parity</td><td>Map a balance value (+1 / −1) and store first index</td><td>Longest subarray with equal 0s and 1s</td></tr>
<tr><td>2D prefix sum</td><td>Inclusion–exclusion on a grid</td><td>Sum of any rectangular submatrix in O(1)</td></tr>
<tr><td>Difference array</td><td>Inverse of prefix sum — add to ranges, prefix once at the end</td><td>Many range-update, one final read</td></tr>
</tbody>
</table></div>

<div class="h2">5 Problems — Prefix Sum</div>
<div class="problems-grid">

<problem-card num="P1" title="Range Sum Query — Immutable" difficulty="easy" tags="Prefix Sum,Design">
<div class="prob-desc">Given an integer array, answer many queries of the form "sum of elements between index l and r inclusive". The array never changes.</div>
<div class="prob-example">nums=[-2,0,3,-5,2,-1] · sumRange(0,2)=1 · sumRange(2,5)=-1</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Loop each query <span class="approach-tc">O(n) per query</span></div><p style="font-size:12px;color:var(--muted)">Fine for one query — too slow when queries are frequent.</p></div>
  <div class="approach best"><div class="approach-name">✅ Precompute prefix sums <span class="approach-tc">O(n) build · O(1) per query</span></div><p style="font-size:12px;color:var(--muted)">Build the prefix array in the constructor; each query is one subtraction.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ps-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ps-p1')">Python</button></div>
<div class="lang-panel active" id="ps-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Prefix Array in Constructor</span></div><pre><span class="kw">class</span> <span class="cls">NumArray</span> {
  <span class="fn">constructor</span>(nums) {
    <span class="kw">this</span>.prefix = [<span class="num">0</span>]
    <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums)
      <span class="kw">this</span>.prefix.<span class="fn">push</span>(<span class="kw">this</span>.prefix.<span class="fn">at</span>(-<span class="num">1</span>) + n)
  }
  <span class="fn">sumRange</span>(l, r) {
    <span class="kw">return</span> <span class="kw">this</span>.prefix[r + <span class="num">1</span>] - <span class="kw">this</span>.prefix[l]
  }
}</pre></div></div>
<div class="lang-panel" id="ps-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Prefix Array in Constructor</span></div><pre><span class="py-kw">class</span> <span class="py-cls">NumArray</span>:
    <span class="py-kw">def</span> <span class="py-fn">__init__</span>(self, nums):
        self.prefix = [<span class="py-num">0</span>]
        <span class="py-kw">for</span> n <span class="py-kw">in</span> nums:
            self.prefix.append(self.prefix[-<span class="py-num">1</span>] + n)
    <span class="py-kw">def</span> <span class="py-fn">sumRange</span>(self, l, r):
        <span class="py-kw">return</span> self.prefix[r + <span class="py-num">1</span>] - self.prefix[l]</pre></div>
</div>
<algo-visualizer id="viz-ps-p1" title="Build Once, Query Forever — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Find Pivot Index" difficulty="easy" tags="Prefix Sum,Running Total">
<div class="prob-desc">Return the leftmost index where the sum of all numbers strictly to its left equals the sum of all numbers strictly to its right. Return -1 if none exists.</div>
<div class="prob-example">Input: [1,7,3,6,5,6] → 3 (left 1+7+3=11, right 5+6=11)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Total minus running left sum <span class="approach-tc">O(n) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">rightSum = total − leftSum − nums[i]. No prefix array needed — just one running value.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ps-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ps-p2')">Python</button></div>
<div class="lang-panel active" id="ps-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Running Left Sum</span></div><pre><span class="kw">function</span> <span class="fn">pivotIndex</span>(nums) {
  <span class="kw">const</span> total = nums.<span class="fn">reduce</span>((a, b) => a + b, <span class="num">0</span>)
  <span class="kw">let</span> leftSum = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length; i++) {
    <span class="kw">if</span> (leftSum === total - leftSum - nums[i]) <span class="kw">return</span> i
    leftSum += nums[i]
  }
  <span class="kw">return</span> -<span class="num">1</span>
}</pre></div></div>
<div class="lang-panel" id="ps-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Running Left Sum</span></div><pre><span class="py-kw">def</span> <span class="py-fn">pivot_index</span>(nums):
    total = <span class="py-fn">sum</span>(nums)
    left = <span class="py-num">0</span>
    <span class="py-kw">for</span> i, x <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(nums):
        <span class="py-kw">if</span> left == total - left - x:
            <span class="py-kw">return</span> i
        left += x
    <span class="py-kw">return</span> -<span class="py-num">1</span></pre></div>
</div>
<algo-visualizer id="viz-ps-p2" title="Running Left Sum — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Subarray Sum Equals K" difficulty="medium" tags="Prefix Sum,HashMap">
<div class="prob-desc">Count the number of contiguous subarrays whose elements sum to exactly k. Values may be negative, so a sliding window does not work.</div>
<div class="prob-example">Input: nums=[1,1,1], k=2 → 2 · nums=[1,2,3], k=3 → 2</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Brute Force <span class="approach-tc">O(n²) time</span></div><p style="font-size:12px;color:var(--muted)">Try every start/end pair.</p></div>
  <div class="approach best"><div class="approach-name">✅ Prefix sum + hash map <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">A subarray sums to k exactly when currentPrefix − earlierPrefix = k. Count how many earlier prefixes equal current − k.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ps-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ps-p3')">Python</button></div>
<div class="lang-panel active" id="ps-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Prefix Sum + HashMap — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">subarraySum</span>(nums, k) {
  <span class="kw">const</span> seen = <span class="kw">new</span> <span class="cls">Map</span>([[<span class="num">0</span>, <span class="num">1</span>]])  <span class="cmt">// empty prefix counts once</span>
  <span class="kw">let</span> sum = <span class="num">0</span>, count = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) {
    sum += n
    count += seen.<span class="fn">get</span>(sum - k) ?? <span class="num">0</span>
    seen.<span class="fn">set</span>(sum, (seen.<span class="fn">get</span>(sum) ?? <span class="num">0</span>) + <span class="num">1</span>)
  }
  <span class="kw">return</span> count
}</pre></div></div>
<div class="lang-panel" id="ps-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Prefix Sum + HashMap — O(n)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> defaultdict
<span class="py-kw">def</span> <span class="py-fn">subarray_sum</span>(nums, k):
    seen = defaultdict(<span class="py-fn">int</span>)
    seen[<span class="py-num">0</span>] = <span class="py-num">1</span>
    s = count = <span class="py-num">0</span>
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums:
        s += n
        count += seen[s - k]
        seen[s] += <span class="py-num">1</span>
    <span class="py-kw">return</span> count</pre></div>
</div>
<algo-visualizer id="viz-ps-p3" title="Prefix Sum + HashMap — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Contiguous Array" difficulty="medium" tags="Prefix Sum,Balance Trick">
<div class="prob-desc">Given a binary array, find the longest contiguous subarray with an equal number of 0s and 1s.</div>
<div class="prob-example">Input: [0,1,0] → 2 ([0,1] or [1,0])</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Treat 0 as −1, track prefix balance <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Count 1 as +1 and 0 as −1. Equal counts means the running balance returns to a value it had before — the gap between the two indices is a valid subarray. Store the FIRST index of each balance.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ps-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ps-p4')">Python</button></div>
<div class="lang-panel active" id="ps-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Balance + First-Seen Index</span></div><pre><span class="kw">function</span> <span class="fn">findMaxLength</span>(nums) {
  <span class="kw">const</span> firstSeen = <span class="kw">new</span> <span class="cls">Map</span>([[<span class="num">0</span>, -<span class="num">1</span>]])  <span class="cmt">// balance 0 before index 0</span>
  <span class="kw">let</span> balance = <span class="num">0</span>, best = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length; i++) {
    balance += nums[i] === <span class="num">1</span> ? <span class="num">1</span> : -<span class="num">1</span>
    <span class="kw">if</span> (firstSeen.<span class="fn">has</span>(balance))
      best = <span class="cls">Math</span>.<span class="fn">max</span>(best, i - firstSeen.<span class="fn">get</span>(balance))
    <span class="kw">else</span>
      firstSeen.<span class="fn">set</span>(balance, i)
  }
  <span class="kw">return</span> best
}</pre></div></div>
<div class="lang-panel" id="ps-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Balance + First-Seen Index</span></div><pre><span class="py-kw">def</span> <span class="py-fn">find_max_length</span>(nums):
    first = {<span class="py-num">0</span>: -<span class="py-num">1</span>}      <span class="py-cmt"># balance -&gt; earliest index</span>
    balance = best = <span class="py-num">0</span>
    <span class="py-kw">for</span> i, x <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(nums):
        balance += <span class="py-num">1</span> <span class="py-kw">if</span> x == <span class="py-num">1</span> <span class="py-kw">else</span> -<span class="py-num">1</span>
        <span class="py-kw">if</span> balance <span class="py-kw">in</span> first:
            best = <span class="py-fn">max</span>(best, i - first[balance])
        <span class="py-kw">else</span>:
            first[balance] = i
    <span class="py-kw">return</span> best</pre></div>
</div>
<algo-visualizer id="viz-ps-p4" title="Balance + First-Seen Index — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Range Sum Query 2D — Immutable" difficulty="hard" tags="2D Prefix Sum,Inclusion-Exclusion">
<div class="prob-desc">Given a matrix, answer many queries for the sum of any rectangular submatrix defined by its top-left and bottom-right corners.</div>
<div class="prob-example">sumRegion(2,1,4,3) → sum of the 3×3 block from (2,1) to (4,3)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ 2D prefix grid + inclusion–exclusion <span class="approach-tc">O(m·n) build · O(1) per query</span></div><p style="font-size:12px;color:var(--muted)">pre[r+1][c+1] = sum of the rectangle from (0,0) to (r,c). A query subtracts the two overhanging strips, then adds back the corner counted twice.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ps-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ps-p5')">Python</button></div>
<div class="lang-panel active" id="ps-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">2D Prefix Sum — O(1) Queries</span></div><pre><span class="kw">class</span> <span class="cls">NumMatrix</span> {
  <span class="fn">constructor</span>(matrix) {
    <span class="kw">const</span> m = matrix.length, n = matrix[<span class="num">0</span>].length
    <span class="kw">this</span>.pre = <span class="cls">Array</span>.<span class="fn">from</span>({ length: m + <span class="num">1</span> },
      () => <span class="kw">new</span> <span class="cls">Array</span>(n + <span class="num">1</span>).<span class="fn">fill</span>(<span class="num">0</span>))
    <span class="kw">for</span> (<span class="kw">let</span> r = <span class="num">0</span>; r &lt; m; r++)
      <span class="kw">for</span> (<span class="kw">let</span> c = <span class="num">0</span>; c &lt; n; c++)
        <span class="kw">this</span>.pre[r+<span class="num">1</span>][c+<span class="num">1</span>] = matrix[r][c]
          + <span class="kw">this</span>.pre[r][c+<span class="num">1</span>] + <span class="kw">this</span>.pre[r+<span class="num">1</span>][c] - <span class="kw">this</span>.pre[r][c]
  }
  <span class="fn">sumRegion</span>(r1, c1, r2, c2) {
    <span class="kw">return</span> <span class="kw">this</span>.pre[r2+<span class="num">1</span>][c2+<span class="num">1</span>] - <span class="kw">this</span>.pre[r1][c2+<span class="num">1</span>]
         - <span class="kw">this</span>.pre[r2+<span class="num">1</span>][c1] + <span class="kw">this</span>.pre[r1][c1]
  }
}</pre></div></div>
<div class="lang-panel" id="ps-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">2D Prefix Sum — O(1) Queries</span></div><pre><span class="py-kw">class</span> <span class="py-cls">NumMatrix</span>:
    <span class="py-kw">def</span> <span class="py-fn">__init__</span>(self, matrix):
        m, n = <span class="py-fn">len</span>(matrix), <span class="py-fn">len</span>(matrix[<span class="py-num">0</span>])
        self.pre = [[<span class="py-num">0</span>] * (n + <span class="py-num">1</span>) <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(m + <span class="py-num">1</span>)]
        <span class="py-kw">for</span> r <span class="py-kw">in</span> <span class="py-fn">range</span>(m):
            <span class="py-kw">for</span> c <span class="py-kw">in</span> <span class="py-fn">range</span>(n):
                self.pre[r+<span class="py-num">1</span>][c+<span class="py-num">1</span>] = (matrix[r][c]
                    + self.pre[r][c+<span class="py-num">1</span>] + self.pre[r+<span class="py-num">1</span>][c]
                    - self.pre[r][c])
    <span class="py-kw">def</span> <span class="py-fn">sumRegion</span>(self, r1, c1, r2, c2):
        <span class="py-kw">return</span> (self.pre[r2+<span class="py-num">1</span>][c2+<span class="py-num">1</span>] - self.pre[r1][c2+<span class="py-num">1</span>]
              - self.pre[r2+<span class="py-num">1</span>][c1] + self.pre[r1][c1])</pre></div>
</div>
<algo-visualizer id="viz-ps-p5" title="2D Prefix Grid — trace"></algo-visualizer>
</problem-card>

</div><!-- end problems-grid -->
</div><!-- end sec-body -->
</div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_prefixsum.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Prefix Sum problems ──────
function wireVisualizers() {
  // ── P1: Range Sum Query — Immutable ─────────────────────────────────────
  function traceRangeSumImmutable(nums, queries) {
    const prefix = [0];
    const steps = [{ phase: 'build', i: -1, prefix: [...prefix], note: 'Start — prefix=[0].', line: 3, pyLine: 3 }];
    nums.forEach((n, i) => {
      prefix.push(prefix.at(-1) + n);
      steps.push({ phase: 'build', i, prefix: [...prefix], note: `prefix[${i + 1}] = prefix[${i}] + nums[${i}](${n}) = ${prefix.at(-1)}.`, line: 5, pyLine: 5 });
    });
    for (const [l, r] of queries) {
      const result = prefix[r + 1] - prefix[l];
      steps.push({ phase: 'query', l, r, prefix: [...prefix], result,
        note: `sumRange(${l},${r}) = prefix[${r + 1}] − prefix[${l}] = ${prefix[r + 1]} − ${prefix[l]} = ${result}.`, line: 8, pyLine: 7 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderRangeSumImmutable(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">nums</div>
        ${cellsRow(nums, (v, i) => step.phase === 'build' && i === step.i ? 'cur' : '')}
        <div class="viz-panel-lbl" style="margin-top:10px">prefix (length n+1)</div>
        ${cellsRow(step.prefix, (v, i) => step.phase === 'query' ? (i === step.l || i === step.r + 1 ? 'match' : '') : (i === step.i + 1 ? 'cur' : ''))}
        ${step.phase === 'query' ? `<div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-panel-lbl">sumRange(${step.l},${step.r})</div><div class="viz-counter" style="font-size:20px">${step.result}</div></div></div>` : ''}`;
    };
  }

  // ── P2: Find Pivot Index — running left sum ─────────────────────────────
  function tracePivotIndex(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    let leftSum = 0;
    const steps = [{ i: -1, leftSum, rightSum: total, note: `Start — total=${total}.`, line: 3, pyLine: 3 }];
    for (let i = 0; i < nums.length; i++) {
      const rightSum = total - leftSum - nums[i];
      if (leftSum === rightSum) {
        steps.push({ i, leftSum, rightSum, found: true, final: true, stop: true, note: `i=${i}: left=${leftSum} == right=${rightSum} → pivot found!`, line: 5, pyLine: 6 });
        return steps;
      }
      steps.push({ i, leftSum, rightSum, note: `i=${i}: left=${leftSum}, right=${rightSum} — not equal, advance.`, line: 6, pyLine: 7 });
      leftSum += nums[i];
    }
    steps.push({ i: -1, leftSum, rightSum: null, final: true, note: 'No pivot found → -1.', line: 8, pyLine: 8 });
    return steps;
  }

  function renderPivotIndex(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums, (v, i) => step.found && i === step.i ? 'match' : (step.i >= 0 && i < step.i ? 'seen' : (i === step.i ? 'cur' : '')))}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">left sum</div><div class="viz-counter" style="font-size:20px">${step.leftSum}</div></div>
          <div class="viz-panel"><div class="viz-panel-lbl">right sum</div><div class="viz-counter" style="font-size:20px">${step.rightSum ?? '—'}</div></div>
        </div>`;
    };
  }

  // ── P3: Subarray Sum Equals K — prefix sum hashmap ──────────────────────
  function traceSubarraySumPS(nums, k) {
    const seen = new Map([[0, 1]]);
    let sum = 0, count = 0;
    const steps = [{ i: -1, sum, count, map: Object.fromEntries(seen), note: 'Start — seen = {0:1}.', line: 3, pyLine: 5 }];
    nums.forEach((n, i) => {
      sum += n;
      const found = seen.get(sum - k) ?? 0;
      count += found;
      steps.push({ i, sum, count, map: Object.fromEntries(seen), note: `i=${i}: sum=${sum}. need ${sum}-${k}=${sum - k} → seen ${found}× → count=${count}.`, line: 6, pyLine: 8 });
      seen.set(sum, (seen.get(sum) ?? 0) + 1);
      steps.push({ i, sum, count, map: Object.fromEntries(seen), note: `record prefix sum ${sum}.`, line: 7, pyLine: 9 });
    });
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderSubarraySumPS(nums) {
    return (stage, step) => {
      const mapChips = Object.entries(step.map).map(([k, v]) => `${k}:${v}`);
      stage.innerHTML = `
        ${cellsRow(nums, (v, i) => step.final ? 'dim' : (i === step.i ? 'cur' : (step.i >= 0 && i < step.i ? 'dim' : '')))}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">running sum</div><div class="viz-counter" style="font-size:20px">${step.sum}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.count}<span class="viz-counter-label">subarrays found</span></div></div>
          <div class="viz-panel"><div class="viz-panel-lbl">seen (prefix:count)</div>${chips(mapChips)}</div>
        </div>`;
    };
  }

  // ── P4: Contiguous Array — balance + first-seen index ───────────────────
  function traceFindMaxLength(nums) {
    const firstSeen = new Map([[0, -1]]);
    let balance = 0, best = 0;
    const steps = [{ i: -1, balance, best, map: Object.fromEntries(firstSeen), note: 'Start — firstSeen={0:-1}.', line: 3, pyLine: 3 }];
    for (let i = 0; i < nums.length; i++) {
      balance += nums[i] === 1 ? 1 : -1;
      if (firstSeen.has(balance)) {
        best = Math.max(best, i - firstSeen.get(balance));
        steps.push({ i, balance, best, map: Object.fromEntries(firstSeen), matched: true,
          note: `i=${i} (val=${nums[i]}): balance=${balance}, seen before at index ${firstSeen.get(balance)} → length ${i - firstSeen.get(balance)} → best=${best}.`, line: 7, pyLine: 7 });
      } else {
        firstSeen.set(balance, i);
        steps.push({ i, balance, best, map: Object.fromEntries(firstSeen), matched: false,
          note: `i=${i} (val=${nums[i]}): balance=${balance} is new → record first-seen index ${i}.`, line: 9, pyLine: 9 });
      }
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderFindMaxLength(nums) {
    return (stage, step) => {
      const mapChips = Object.entries(step.map).map(([k, v]) => `${k}:${v}`);
      stage.innerHTML = `
        ${cellsRow(nums, (v, i) => step.final ? 'dim' : (i === step.i ? (step.matched ? 'match' : 'cur') : (step.i >= 0 && i < step.i ? 'dim' : '')))}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">balance</div><div class="viz-counter" style="font-size:20px">${step.balance}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.best}<span class="viz-counter-label">longest so far</span></div></div>
          <div class="viz-panel"><div class="viz-panel-lbl">firstSeen</div>${chips(mapChips)}</div>
        </div>`;
    };
  }

  // ── P5: Range Sum Query 2D — 2D prefix grid ─────────────────────────────
  function traceRangeSum2D(matrix, query) {
    const m = matrix.length, n = matrix[0].length;
    const pre = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const steps = [{ phase: 'build', r: -1, c: -1, pre: pre.map(row => [...row]), note: 'Start — pre grid all 0.', line: 4, pyLine: 4 }];
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        pre[r + 1][c + 1] = matrix[r][c] + pre[r][c + 1] + pre[r + 1][c] - pre[r][c];
        steps.push({ phase: 'build', r, c, pre: pre.map(row => [...row]),
          note: `pre[${r + 1}][${c + 1}] = matrix[${r}][${c}](${matrix[r][c]}) + pre[${r}][${c + 1}] + pre[${r + 1}][${c}] − pre[${r}][${c}] = ${pre[r + 1][c + 1]}.`,
          line: 8, pyLine: 7 });
      }
    }
    const [r1, c1, r2, c2] = query;
    const result = pre[r2 + 1][c2 + 1] - pre[r1][c2 + 1] - pre[r2 + 1][c1] + pre[r1][c1];
    steps.push({ phase: 'query', r1, c1, r2, c2, pre: pre.map(row => [...row]), result, final: true,
      note: `sumRegion(${r1},${c1},${r2},${c2}) = ${pre[r2 + 1][c2 + 1]} − ${pre[r1][c2 + 1]} − ${pre[r2 + 1][c1]} + ${pre[r1][c1]} = ${result}.`,
      line: 12, pyLine: 11 });
    return steps;
  }

  function renderRangeSum2D(matrix) {
    return (stage, step) => {
      const preHighlight = step.phase === 'build'
        ? (v, ri, ci) => (ri === step.r + 1 && ci === step.c + 1) ? 'cur' : ''
        : (v, ri, ci) => {
            if (ri === step.r2 + 1 && ci === step.c2 + 1) return 'match';
            if (ri === step.r1 && ci === step.c2 + 1) return 'dup';
            if (ri === step.r2 + 1 && ci === step.c1) return 'dup';
            if (ri === step.r1 && ci === step.c1) return 'seen';
            return '';
          };
      stage.innerHTML = `
        <div class="viz-panel-lbl">matrix</div>
        ${renderGrid(matrix, (v, ri, ci) => step.phase === 'build' && ri === step.r && ci === step.c ? 'cur2' : '')}
        <div class="viz-panel-lbl" style="margin-top:12px">pre (inclusion–exclusion prefix grid)</div>
        ${renderGrid(step.pre, preHighlight)}
        ${step.phase === 'query' ? `<div class="viz-panels" style="margin-top:10px"><div class="viz-panel"><div class="viz-counter">${step.result}<span class="viz-counter-label">sumRegion result</span></div></div></div>` : ''}`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  const p1Nums = [-2, 0, 3, -5, 2, -1];
  mountVisualizer('viz-ps-p1', traceRangeSumImmutable(p1Nums, [[0, 2], [2, 5]]), withCode('ps-p1', renderRangeSumImmutable(p1Nums)));

  mountVisualizer('viz-ps-p2', tracePivotIndex([1, 7, 3, 6, 5, 6]), withCode('ps-p2', renderPivotIndex([1, 7, 3, 6, 5, 6])));

  mountVisualizer('viz-ps-p3', traceSubarraySumPS([1, 1, 1], 2), withCode('ps-p3', renderSubarraySumPS([1, 1, 1])));

  mountVisualizer('viz-ps-p4', traceFindMaxLength([0, 1, 0]), withCode('ps-p4', renderFindMaxLength([0, 1, 0])));

  const p5Matrix = [[3, 0, 1, 4], [5, 6, 3, 2], [1, 2, 0, 1]];
  mountVisualizer('viz-ps-p5', traceRangeSum2D(p5Matrix, [1, 1, 2, 2]), withCode('ps-p5', renderRangeSum2D(p5Matrix)));
}
