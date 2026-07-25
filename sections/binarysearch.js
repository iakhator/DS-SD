// Section: binarysearch
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_binarysearch = String.raw`
<div id="sec-binarysearch" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Search · 09</span></div><div class="sec-title">Binary Search</div></div>
<div class="sec-lead">Binary search eliminates half the search space on each step, giving O(log n). It works on any MONOTONIC function — not just sorted arrays. If you can answer "is X too small or too large?" in O(1), you can binary search on it. This is the key insight most people miss.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine you are trying to guess a number between 1 and 1,000 and after each guess you are told "too high" or "too low." A smart player never guesses sequentially from 1 upward — they guess 500 first, eliminate half the range immediately, then 750 or 250, and so on. Within ten guesses they can pinpoint any number in 1,024 possibilities. That halving strategy is binary search: by maintaining a <code>lo</code> and <code>hi</code> boundary and always probing the midpoint, you discard half the remaining search space with each comparison, yielding <code>O(log n)</code> time even over millions of items.</p>
<p>Binary search works because it exploits <strong>monotonicity</strong> — a property where some condition transitions cleanly from false to true (or small to large) across the search space with no backtracking. Sorted arrays are the obvious example, but the real power is that you can binary-search on any answer space where you can write a predicate "is this candidate value good enough?" in <code>O(1)</code> or <code>O(n)</code> time. For example, "find the minimum ship capacity that delivers all packages in D days" has no sorted array — but the answer space (possible capacities) is monotone, so binary search applies directly.</p>
<p>Reach for binary search whenever you see a sorted input and need faster than <code>O(n)</code>, or whenever a problem asks for the minimum/maximum value satisfying some feasibility condition. The most common mistake is getting the boundary conditions wrong — specifically using <code>lo &lt;= hi</code> versus <code>lo &lt; hi</code> and choosing <code>mid + 1</code> versus <code>mid</code> for the update. There are really only two templates (find-exact vs. find-boundary) and it is worth memorising both cold, because an off-by-one error causes an infinite loop or a missed answer that is very hard to spot under interview pressure.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Binary search is not just for sorted arrays — any time you can ask "is X feasible?" and the answer flips from No to Yes at some threshold, you can binary-search on X. Look for the words "minimum," "maximum," or "at least" in the problem statement as a trigger.</div>
<div class="h2">The Template — Get Boundaries Right</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bs-template')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bs-template')">Python</button></div>
<div class="lang-panel active" id="bs-template-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">3 Binary Search Variants</span></div><pre><span class="cmt">// Variant 1: Find exact match</span>
<span class="kw">function</span> <span class="fn">search</span>(arr, target) {
  <span class="kw">let</span> lo=<span class="num">0</span>, hi=arr.length-<span class="num">1</span>
  <span class="kw">while</span> (lo &lt;= hi) {
    <span class="kw">const</span> mid = (lo + hi) >>> <span class="num">1</span>  <span class="cmt">// unsigned right shift avoids overflow</span>
    <span class="kw">if</span>      (arr[mid] === target) <span class="kw">return</span> mid
    <span class="kw">else if</span> (arr[mid] &lt; target)  lo = mid + <span class="num">1</span>
    <span class="kw">else</span>                          hi = mid - <span class="num">1</span>
  }
  <span class="kw">return</span> -<span class="num">1</span>
}

<span class="cmt">// Variant 2: Left boundary (first occurrence / insert position)</span>
<span class="kw">function</span> <span class="fn">lowerBound</span>(arr, target) {
  <span class="kw">let</span> lo=<span class="num">0</span>, hi=arr.length
  <span class="kw">while</span> (lo &lt; hi) {
    <span class="kw">const</span> mid = (lo + hi) >>> <span class="num">1</span>
    <span class="kw">if</span> (arr[mid] &lt; target) lo = mid + <span class="num">1</span>
    <span class="kw">else</span> hi = mid
  }
  <span class="kw">return</span> lo  <span class="cmt">// first index where arr[i] >= target</span>
}

<span class="cmt">// Variant 3: Right boundary (last occurrence)</span>
<span class="kw">function</span> <span class="fn">upperBound</span>(arr, target) {
  <span class="kw">let</span> lo=<span class="num">0</span>, hi=arr.length
  <span class="kw">while</span> (lo &lt; hi) {
    <span class="kw">const</span> mid = (lo + hi) >>> <span class="num">1</span>
    <span class="kw">if</span> (arr[mid] &lt;= target) lo = mid + <span class="num">1</span>
    <span class="kw">else</span> hi = mid
  }
  <span class="kw">return</span> lo - <span class="num">1</span>  <span class="cmt">// last index where arr[i] <= target</span>
}

<span class="cmt">// Variant 4: Search on answer (binary search on result space)
// "Find minimum X such that condition(X) is true"</span>
<span class="kw">function</span> <span class="fn">binarySearchAnswer</span>(lo, hi, <span class="fn">condition</span>) {
  <span class="kw">while</span> (lo &lt; hi) {
    <span class="kw">const</span> mid = (lo + hi) >>> <span class="num">1</span>
    <span class="kw">if</span> (<span class="fn">condition</span>(mid)) hi = mid   <span class="cmt">// mid might be answer, look left</span>
    <span class="kw">else</span> lo = mid + <span class="num">1</span>
  }
  <span class="kw">return</span> lo
}</pre></div></div>
<div class="lang-panel" id="bs-template-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Binary Search (Python bisect)</span></div><pre><span class="py-kw">import</span> bisect

<span class="py-cmt"># Python built-ins</span>
bisect.bisect_left(arr, target)   <span class="py-cmt"># lower bound (leftmost insert pos)</span>
bisect.bisect_right(arr, target)  <span class="py-cmt"># upper bound (rightmost insert pos)</span>
bisect.insort_left(arr, val)      <span class="py-cmt"># insert maintaining sorted order</span>

<span class="py-cmt"># Manual binary search</span>
<span class="py-kw">def</span> <span class="py-fn">binary_search</span>(arr, target):
    lo, hi = <span class="py-num">0</span>, <span class="py-fn">len</span>(arr) - <span class="py-num">1</span>
    <span class="py-kw">while</span> lo &lt;= hi:
        mid = (lo + hi) // <span class="py-num">2</span>
        <span class="py-kw">if</span>   arr[mid] == target: <span class="py-kw">return</span> mid
        <span class="py-kw">elif</span> arr[mid] &lt; target:  lo = mid + <span class="py-num">1</span>
        <span class="py-kw">else</span>:                     hi = mid - <span class="py-num">1</span>
    <span class="py-kw">return</span> -<span class="py-num">1</span>

<span class="py-cmt"># Binary search on answer space</span>
<span class="py-kw">def</span> <span class="py-fn">bs_answer</span>(lo, hi, condition):
    <span class="py-kw">while</span> lo &lt; hi:
        mid = (lo + hi) // <span class="py-num">2</span>
        <span class="py-kw">if</span> condition(mid): hi = mid
        <span class="py-kw">else</span>: lo = mid + <span class="py-num">1</span>
    <span class="py-kw">return</span> lo</pre></div></div>

<div class="h2">5 Problems — Binary Search</div>
<div class="problems-grid">

<problem-card num="P1" title="Binary Search (basic)" difficulty="easy" tags="Sorted">
<div class="prob-desc">Given sorted integer array and target, return index or -1.</div>
<div class="prob-example">Input: [-1,0,3,5,9,12], target=9 → 4</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bs-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bs-p1')">Python</button></div>
<div class="lang-panel active" id="bs-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Standard BS</span></div><pre><span class="kw">function</span> <span class="fn">search</span>(nums, target) {
  <span class="kw">let</span> lo=<span class="num">0</span>, hi=nums.length-<span class="num">1</span>
  <span class="kw">while</span>(lo&lt;=hi){ <span class="kw">const</span> m=(lo+hi)>>>1; <span class="kw">if</span>(nums[m]===target) <span class="kw">return</span> m; nums[m]&lt;target?lo=m+<span class="num">1</span>:hi=m-<span class="num">1</span> }
  <span class="kw">return</span> -<span class="num">1</span>
}</pre></div></div>
<div class="lang-panel" id="bs-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Standard BS</span></div><pre><span class="py-kw">def</span> <span class="py-fn">search</span>(nums, target):
    lo, hi = <span class="py-num">0</span>, <span class="py-fn">len</span>(nums)-<span class="py-num">1</span>
    <span class="py-kw">while</span> lo &lt;= hi:
        m = (lo+hi)//2
        <span class="py-kw">if</span> nums[m] == target: <span class="py-kw">return</span> m
        <span class="py-kw">elif</span> nums[m] &lt; target: lo = m+<span class="py-num">1</span>
        <span class="py-kw">else</span>: hi = m-<span class="py-num">1</span>
    <span class="py-kw">return</span> -<span class="py-num">1</span></pre></div>
</div>
<algo-visualizer id="viz-bs-p1" title="Standard Binary Search — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Search in Rotated Sorted Array" difficulty="medium" tags="Modified BS">
<div class="prob-desc">Array was sorted then rotated at some pivot. Find target. O(log n).</div>
<div class="prob-example">Input: [4,5,6,7,0,1,2], target=0 → 4</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Determine which half is sorted, check if target is there <span class="approach-tc">O(log n)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bs-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bs-p2')">Python</button></div>
<div class="lang-panel active" id="bs-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Rotated BS</span></div><pre><span class="kw">function</span> <span class="fn">searchRotated</span>(nums, target) {
  <span class="kw">let</span> lo=<span class="num">0</span>, hi=nums.length-<span class="num">1</span>
  <span class="kw">while</span> (lo &lt;= hi) {
    <span class="kw">const</span> mid = (lo+hi)>>>1
    <span class="kw">if</span> (nums[mid] === target) <span class="kw">return</span> mid
    <span class="kw">if</span> (nums[lo] &lt;= nums[mid]) {  <span class="cmt">// left half is sorted</span>
      <span class="kw">if</span> (nums[lo] &lt;= target && target &lt; nums[mid]) hi = mid-<span class="num">1</span>
      <span class="kw">else</span> lo = mid+<span class="num">1</span>
    } <span class="kw">else</span> {                        <span class="cmt">// right half is sorted</span>
      <span class="kw">if</span> (nums[mid] &lt; target && target &lt;= nums[hi]) lo = mid+<span class="num">1</span>
      <span class="kw">else</span> hi = mid-<span class="num">1</span>
    }
  }
  <span class="kw">return</span> -<span class="num">1</span>
}</pre></div></div>
<div class="lang-panel" id="bs-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Rotated BS</span></div><pre><span class="py-kw">def</span> <span class="py-fn">search_rotated</span>(nums, target):
    lo, hi = <span class="py-num">0</span>, <span class="py-fn">len</span>(nums)-<span class="py-num">1</span>
    <span class="py-kw">while</span> lo &lt;= hi:
        mid = (lo+hi)//2
        <span class="py-kw">if</span> nums[mid] == target: <span class="py-kw">return</span> mid
        <span class="py-kw">if</span> nums[lo] &lt;= nums[mid]:
            <span class="py-kw">if</span> nums[lo] &lt;= target &lt; nums[mid]: hi = mid-<span class="py-num">1</span>
            <span class="py-kw">else</span>: lo = mid+<span class="py-num">1</span>
        <span class="py-kw">else</span>:
            <span class="py-kw">if</span> nums[mid] &lt; target &lt;= nums[hi]: lo = mid+<span class="py-num">1</span>
            <span class="py-kw">else</span>: hi = mid-<span class="py-num">1</span>
    <span class="py-kw">return</span> -<span class="py-num">1</span></pre></div>
</div>
<algo-visualizer id="viz-bs-p2" title="Rotated Binary Search — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Find Minimum in Rotated Array" difficulty="medium" tags="Modified BS">
<div class="prob-desc">Find the minimum element in a rotated sorted array. Must run in O(log n).</div>
<div class="prob-example">Input: [3,4,5,1,2] → 1</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bs-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bs-p3')">Python</button></div>
<div class="lang-panel active" id="bs-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Find Pivot</span></div><pre><span class="kw">function</span> <span class="fn">findMin</span>(nums) {
  <span class="kw">let</span> lo=<span class="num">0</span>, hi=nums.length-<span class="num">1</span>
  <span class="kw">while</span> (lo &lt; hi) {
    <span class="kw">const</span> mid = (lo+hi)>>>1
    <span class="kw">if</span> (nums[mid] > nums[hi]) lo = mid+<span class="num">1</span>  <span class="cmt">// min is in right half</span>
    <span class="kw">else</span> hi = mid                          <span class="cmt">// min is mid or left</span>
  }
  <span class="kw">return</span> nums[lo]
}</pre></div></div>
<div class="lang-panel" id="bs-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Find Pivot</span></div><pre><span class="py-kw">def</span> <span class="py-fn">find_min</span>(nums):
    lo, hi = <span class="py-num">0</span>, <span class="py-fn">len</span>(nums)-<span class="py-num">1</span>
    <span class="py-kw">while</span> lo &lt; hi:
        mid = (lo+hi)//2
        <span class="py-kw">if</span> nums[mid] > nums[hi]: lo = mid+<span class="py-num">1</span>
        <span class="py-kw">else</span>: hi = mid
    <span class="py-kw">return</span> nums[lo]</pre></div>
</div>
<algo-visualizer id="viz-bs-p3" title="Find Pivot — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Koko Eating Bananas (Answer Space BS)" difficulty="medium" tags="BS on Answer">
<div class="prob-desc">Koko eats at k bananas/hour. Given piles and h hours, find minimum k to eat all bananas within h hours.</div>
<div class="prob-example">piles=[3,6,7,11], h=8 → k=4</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Binary search on k (1 to max pile) <span class="approach-tc">O(n log m) — m=max pile</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bs-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bs-p4')">Python</button></div>
<div class="lang-panel active" id="bs-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BS on Answer Space</span></div><pre><span class="kw">function</span> <span class="fn">minEatingSpeed</span>(piles, h) {
  <span class="kw">const</span> <span class="fn">canFinish</span> = k => piles.<span class="fn">reduce</span>((hr, p) => hr + <span class="cls">Math</span>.<span class="fn">ceil</span>(p/k), <span class="num">0</span>) &lt;= h
  <span class="kw">let</span> lo=<span class="num">1</span>, hi=<span class="cls">Math</span>.<span class="fn">max</span>(...piles)
  <span class="kw">while</span> (lo &lt; hi) {
    <span class="kw">const</span> mid=(lo+hi)>>>1
    <span class="fn">canFinish</span>(mid) ? hi=mid : lo=mid+<span class="num">1</span>
  }
  <span class="kw">return</span> lo
}</pre></div></div>
<div class="lang-panel" id="bs-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">BS on Answer</span></div><pre><span class="py-kw">import</span> math
<span class="py-kw">def</span> <span class="py-fn">min_eating_speed</span>(piles, h):
    <span class="py-kw">def</span> <span class="py-fn">can_finish</span>(k):
        <span class="py-kw">return</span> <span class="py-fn">sum</span>(math.ceil(p/k) <span class="py-kw">for</span> p <span class="py-kw">in</span> piles) &lt;= h
    lo, hi = <span class="py-num">1</span>, <span class="py-fn">max</span>(piles)
    <span class="py-kw">while</span> lo &lt; hi:
        mid = (lo+hi)//2
        <span class="py-kw">if</span> <span class="py-fn">can_finish</span>(mid): hi = mid
        <span class="py-kw">else</span>: lo = mid+<span class="py-num">1</span>
    <span class="py-kw">return</span> lo</pre></div>
</div>
<algo-visualizer id="viz-bs-p4" title="Binary Search on Answer — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Median of Two Sorted Arrays" difficulty="hard" tags="Binary Search,Partition">
<div class="prob-desc">Given two sorted arrays, find the median of the two combined sorted arrays. Must run in O(log(m+n)).</div>
<div class="prob-example">nums1=[1,3], nums2=[2] → 2.0 | nums1=[1,2], nums2=[3,4] → 2.5</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Binary search partition on shorter array <span class="approach-tc">O(log min(m,n))</span></div><p style="font-size:12px;color:var(--muted)">Find the correct partition of both arrays such that left half has floor((m+n)/2) elements and max(left) &lt;= min(right).</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bs-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bs-p5')">Python</button></div>
<div class="lang-panel active" id="bs-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Partition BS — O(log min(m,n))</span></div><pre><span class="kw">function</span> <span class="fn">findMedianSortedArrays</span>(A, B) {
  <span class="kw">if</span> (A.length > B.length) <span class="kw">return</span> <span class="fn">findMedianSortedArrays</span>(B, A)
  <span class="kw">const</span> m=A.length, n=B.length, half=<span class="cls">Math</span>.<span class="fn">floor</span>((m+n)/2)
  <span class="kw">let</span> lo=<span class="num">0</span>, hi=m
  <span class="kw">while</span> (lo &lt;= hi) {
    <span class="kw">const</span> i=<span class="cls">Math</span>.<span class="fn">floor</span>((lo+hi)/2), j=half-i
    <span class="kw">const</span> al=i?A[i-<span class="num">1</span>]:-<span class="cls">Infinity</span>, ar=i&lt;m?A[i]:<span class="cls">Infinity</span>
    <span class="kw">const</span> bl=j?B[j-<span class="num">1</span>]:-<span class="cls">Infinity</span>, br=j&lt;n?B[j]:<span class="cls">Infinity</span>
    <span class="kw">if</span>      (al > br) hi=i-<span class="num">1</span>
    <span class="kw">else if</span> (bl > ar) lo=i+<span class="num">1</span>
    <span class="kw">else</span> {
      <span class="kw">const</span> maxL=<span class="cls">Math</span>.<span class="fn">max</span>(al,bl), minR=<span class="cls">Math</span>.<span class="fn">min</span>(ar,br)
      <span class="kw">return</span> (m+n)%<span class="num">2</span> ? minR : (maxL+minR)/<span class="num">2</span>
    }
  }
}</pre></div></div>
<div class="lang-panel" id="bs-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Partition BS</span></div><pre><span class="py-kw">def</span> <span class="py-fn">find_median_sorted_arrays</span>(A, B):
    <span class="py-kw">if</span> <span class="py-fn">len</span>(A) > <span class="py-fn">len</span>(B): A, B = B, A
    m, n = <span class="py-fn">len</span>(A), <span class="py-fn">len</span>(B); half = (m+n)//2
    lo, hi = <span class="py-num">0</span>, m
    <span class="py-kw">while</span> lo &lt;= hi:
        i = (lo+hi)//2; j = half-i
        al = A[i-<span class="py-num">1</span>] <span class="py-kw">if</span> i <span class="py-kw">else</span> <span class="py-fn">float</span>(<span class="py-str">'-inf'</span>); ar = A[i] <span class="py-kw">if</span> i&lt;m <span class="py-kw">else</span> <span class="py-fn">float</span>(<span class="py-str">'inf'</span>)
        bl = B[j-<span class="py-num">1</span>] <span class="py-kw">if</span> j <span class="py-kw">else</span> <span class="py-fn">float</span>(<span class="py-str">'-inf'</span>); br = B[j] <span class="py-kw">if</span> j&lt;n <span class="py-kw">else</span> <span class="py-fn">float</span>(<span class="py-str">'inf'</span>)
        <span class="py-kw">if</span>   al > br: hi = i-<span class="py-num">1</span>
        <span class="py-kw">elif</span> bl > ar: lo = i+<span class="py-num">1</span>
        <span class="py-kw">else</span>: <span class="py-kw">return</span> <span class="py-fn">min</span>(ar,br) <span class="py-kw">if</span> (m+n)%<span class="py-num">2</span> <span class="py-kw">else</span> (<span class="py-fn">max</span>(al,bl)+<span class="py-fn">min</span>(ar,br))/<span class="py-num">2</span></pre></div>
</div>
<algo-visualizer id="viz-bs-p5" title="Partition Binary Search — trace"></algo-visualizer>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_binarysearch.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Binary Search problems ───
function wireVisualizers() {
  const rangeRow = (nums, lo, hi, mid, dimFinal) => cellsRow(nums,
    (v, i) => dimFinal ? (i === mid ? 'match' : 'dim') : (i === mid ? 'cur' : (i < lo || i > hi ? 'dim' : 'seen')),
    (v, i) => i === lo ? 'lo' : i === hi ? 'hi' : i === mid ? 'mid' : '');

  // ── P1: Binary Search (basic) ────────────────────────────────────────────
  function traceBinarySearch(nums, target) {
    let lo = 0, hi = nums.length - 1;
    const steps = [{ lo, hi, mid: null, note: `Start — lo=0, hi=${hi}.`, line: 3, pyLine: 2 }];
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      if (nums[mid] === target) {
        steps.push({ lo, hi, mid, found: true, final: true, stop: true, note: `mid=${mid} (${nums[mid]}) === target → found!`, line: 3, pyLine: 5 });
        return steps;
      } else if (nums[mid] < target) {
        lo = mid + 1;
        steps.push({ lo, hi, mid, note: `mid=${mid} (${nums[mid]}) < target → search right half.`, line: 3, pyLine: 6 });
      } else {
        hi = mid - 1;
        steps.push({ lo, hi, mid, note: `mid=${mid} (${nums[mid]}) > target → search left half.`, line: 3, pyLine: 7 });
      }
    }
    steps.push({ lo, hi, mid: null, final: true, note: 'lo > hi — not found → -1.', line: 4, pyLine: 8 });
    return steps;
  }

  function renderBinarySearch(nums) {
    return (stage, step) => { stage.innerHTML = rangeRow(nums, step.lo, step.hi, step.mid, step.final); };
  }

  // ── P2: Search in Rotated Sorted Array ───────────────────────────────────
  function traceSearchRotated(nums, target) {
    let lo = 0, hi = nums.length - 1;
    const steps = [{ lo, hi, mid: null, note: `Start — lo=0, hi=${hi}.`, line: 2, pyLine: 2 }];
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      if (nums[mid] === target) {
        steps.push({ lo, hi, mid, found: true, final: true, stop: true, note: `mid=${mid} (${nums[mid]}) === target → found!`, line: 5, pyLine: 5 });
        return steps;
      }
      let note, line, pyLine;
      if (nums[lo] <= nums[mid]) {
        if (nums[lo] <= target && target < nums[mid]) { hi = mid - 1; note = `left half [${lo}..${mid}] is sorted, target in range → hi=${hi}.`; line = 7; pyLine = 7; }
        else { lo = mid + 1; note = `left half is sorted, target not in range → lo=${lo}.`; line = 8; pyLine = 8; }
      } else {
        if (nums[mid] < target && target <= nums[hi]) { lo = mid + 1; note = `right half [${mid}..${hi}] is sorted, target in range → lo=${lo}.`; line = 10; pyLine = 10; }
        else { hi = mid - 1; note = `right half is sorted, target not in range → hi=${hi}.`; line = 11; pyLine = 11; }
      }
      steps.push({ lo, hi, mid, note, line, pyLine });
    }
    steps.push({ lo, hi, mid: null, final: true, note: 'lo > hi — not found → -1.', line: 14, pyLine: 12 });
    return steps;
  }

  function renderSearchRotated(nums) {
    return (stage, step) => { stage.innerHTML = rangeRow(nums, step.lo, step.hi, step.mid, step.final); };
  }

  // ── P3: Find Minimum in Rotated Array ────────────────────────────────────
  function traceFindMin(nums) {
    let lo = 0, hi = nums.length - 1;
    const steps = [{ lo, hi, mid: null, note: `Start — lo=0, hi=${hi}.`, line: 2, pyLine: 2 }];
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (nums[mid] > nums[hi]) {
        lo = mid + 1;
        steps.push({ lo, hi, mid, note: `mid=${mid} (${nums[mid]}) > nums[hi]=${nums[hi]} → min is in right half → lo=${lo}.`, line: 5, pyLine: 5 });
      } else {
        hi = mid;
        steps.push({ lo, hi, mid, note: `mid=${mid} (${nums[mid]}) ≤ nums[hi] → min is mid or left → hi=${hi}.`, line: 6, pyLine: 6 });
      }
    }
    steps.push({ lo, hi, mid: lo, final: true, note: `Done. lo===hi=${lo} → min = ${nums[lo]}.`, line: 8, pyLine: 7 });
    return steps;
  }

  function renderFindMin(nums) {
    return (stage, step) => { stage.innerHTML = rangeRow(nums, step.lo, step.hi, step.mid, step.final); };
  }

  // ── P4: Koko Eating Bananas — binary search on the answer space ─────────
  function traceMinEatingSpeed(piles, h) {
    let lo = 1, hi = Math.max(...piles);
    const steps = [{ lo, hi, mid: null, note: `Start — lo=1, hi=${hi} (max pile).`, line: 3, pyLine: 5 }];
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      const hours = piles.reduce((hr, p) => hr + Math.ceil(p / mid), 0);
      const feasible = hours <= h;
      if (feasible) hi = mid; else lo = mid + 1;
      steps.push({ lo, hi, mid, hours, note: `k=${mid}: needs ${hours}h (limit ${h}) → ${feasible ? 'feasible, try smaller k' : 'too slow, need bigger k'} → range=[${lo},${hi}].`,
        line: 6, pyLine: feasible ? 8 : 9 });
    }
    steps.push({ lo, hi, mid: lo, final: true, note: `Done. Minimum k = ${lo}.`, line: 8, pyLine: 10 });
    return steps;
  }

  function renderMinEatingSpeed(piles) {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">piles</div>
        ${chips(piles)}
        <div class="viz-panels" style="margin-top:8px">
          <div class="viz-panel"><div class="viz-panel-lbl">search range [lo, hi]</div><div class="viz-counter" style="font-size:20px">[${step.lo}, ${step.hi}]</div></div>
          ${step.mid !== null && !step.final ? `<div class="viz-panel"><div class="viz-panel-lbl">trying k</div><div class="viz-counter" style="font-size:20px">${step.mid}</div></div>` : ''}
          ${step.final ? `<div class="viz-panel"><div class="viz-counter">${step.lo}<span class="viz-counter-label">min speed k</span></div></div>` : ''}
        </div>`;
    };
  }

  // ── P5: Median of Two Sorted Arrays — partition binary search ───────────
  function traceMedianTwoSorted(nums1, nums2) {
    let A = nums1, B = nums2, swapped = false;
    if (A.length > B.length) { [A, B] = [B, A]; swapped = true; }
    const m = A.length, n = B.length, half = Math.floor((m + n) / 2);
    let lo = 0, hi = m;
    const steps = [{ lo, hi, i: null, j: null, A, B,
      note: `${swapped ? 'Swapped so A is the shorter array. ' : ''}A=[${A.join(',')}], B=[${B.join(',')}]. Partition size = ${half}.`, line: 4, pyLine: 4 }];
    while (lo <= hi) {
      const i = Math.floor((lo + hi) / 2), j = half - i;
      const al = i ? A[i - 1] : -Infinity, ar = i < m ? A[i] : Infinity;
      const bl = j ? B[j - 1] : -Infinity, br = j < n ? B[j] : Infinity;
      if (al > br) {
        hi = i - 1;
        steps.push({ lo, hi, i, j, A, B, note: `i=${i}, j=${j}: A's left (${al}) > B's right (${br}) → partition too far right in A → hi=${hi}.`, line: 9, pyLine: 9 });
      } else if (bl > ar) {
        lo = i + 1;
        steps.push({ lo, hi, i, j, A, B, note: `i=${i}, j=${j}: B's left (${bl}) > A's right (${ar}) → partition too far left in A → lo=${lo}.`, line: 10, pyLine: 10 });
      } else {
        const maxL = Math.max(al, bl), minR = Math.min(ar, br);
        const result = (m + n) % 2 ? minR : (maxL + minR) / 2;
        steps.push({ lo, hi, i, j, A, B, final: true, stop: true, result,
          note: `i=${i}, j=${j}: valid partition! maxLeft=${maxL}, minRight=${minR} → median = ${result}.`, line: 13, pyLine: 11 });
        return steps;
      }
    }
    return steps;
  }

  function renderMedianTwoSorted() {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">A (partition at i=${step.i ?? '—'})</div>
        ${cellsRow(step.A, (v, idx) => step.i !== null && idx < step.i ? 'seen' : (step.i !== null && idx === step.i ? 'cur' : ''))}
        <div class="viz-panel-lbl" style="margin-top:8px">B (partition at j=${step.j ?? '—'})</div>
        ${cellsRow(step.B, (v, idx) => step.j !== null && idx < step.j ? 'seen' : (step.j !== null && idx === step.j ? 'cur2' : ''))}
        ${step.result !== undefined ? `<div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-counter">${step.result}<span class="viz-counter-label">median</span></div></div></div>` : ''}`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  const p1Nums = [-1, 0, 3, 5, 9, 12], p1Target = 9;
  mountVisualizer('viz-bs-p1', traceBinarySearch(p1Nums, p1Target), withCode('bs-p1', renderBinarySearch(p1Nums)));

  const p2Nums = [4, 5, 6, 7, 0, 1, 2], p2Target = 0;
  mountVisualizer('viz-bs-p2', traceSearchRotated(p2Nums, p2Target), withCode('bs-p2', renderSearchRotated(p2Nums)));

  mountVisualizer('viz-bs-p3', traceFindMin([3, 4, 5, 1, 2]), withCode('bs-p3', renderFindMin([3, 4, 5, 1, 2])));

  const p4Piles = [3, 6, 7, 11], p4H = 8;
  mountVisualizer('viz-bs-p4', traceMinEatingSpeed(p4Piles, p4H), withCode('bs-p4', renderMinEatingSpeed(p4Piles)));

  mountVisualizer('viz-bs-p5', traceMedianTwoSorted([1, 3], [2]), withCode('bs-p5', renderMedianTwoSorted()));
}
