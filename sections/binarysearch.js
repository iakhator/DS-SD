// Section: binarysearch
// Auto-extracted from index.html
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
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_binarysearch.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
