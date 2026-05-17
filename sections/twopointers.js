// Section: twopointers
// Auto-extracted from index.html
const _html_twopointers = String.raw`
<div id="sec-twopointers" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Patterns · 04</span></div><div class="sec-title">Two Pointers</div></div>
<div class="sec-lead">Two pointers reduces O(n²) brute-force solutions to O(n) by using two indices that move through the data in a coordinated way. Works on sorted arrays and problems where you need to find pairs, triplets, or subarrays satisfying a constraint.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine two people reading the same book — one starting from page one and the other starting from the last page — both moving inward and calling out whenever their pages together tell a meaningful story. That is the essence of the opposite-ends two-pointer pattern. Because the array is sorted, you have a decisive rule at every step: if the two values sum to too little, advance the left reader forward to a bigger number; if they sum to too much, retreat the right reader backward to a smaller number. This determinism is what collapses an <code>O(n&sup2;)</code> search into a single <code>O(n)</code> pass.</p>
<p>Two pointers solve the problem of finding relationships between elements — pairs, triplets, or subarrays — without examining every possible combination. The brute-force approach nests loops because it lacks information about which pairs to skip. Sorting provides that information: once the array is ordered, moving a pointer in one direction strictly increases (or decreases) the value, so you never need to backtrack to combinations you have logically ruled out. The fast-and-slow variant exploits the same idea in linked lists, where Floyd's cycle detection works because a faster pointer will inevitably lap a slower one if a cycle exists.</p>
<p>Reach for two pointers when the problem involves a sorted collection and asks for pairs or subarrays meeting a numeric constraint, or when you need to detect cycles or find the middle of a linked list. The most common mistake is applying the opposite-ends pattern to an <em>unsorted</em> array — without sorted order the decisive move rule breaks down entirely and the approach produces wrong answers. Always check: is the input sorted, or can I afford to sort it first (<code>O(n log n)</code>)?</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Two pointers work because sorted order gives you a <em>decision rule</em> at every step — you always know which pointer to move. If you cannot state that rule clearly for your problem, the pattern may not apply.</div>

<div class="h2">Three Patterns</div>
<div class="grid-3">
  <div class="card"><div class="card-title blue">Opposite Ends</div><p>l=0, r=n-1, move inward. Use on sorted array to find pairs: if sum too big → r--; too small → l++.</p></div>
  <div class="card"><div class="card-title green">Same Direction (Fast/Slow)</div><p>Both start at 0, fast moves faster. Use for cycle detection, finding middle of list, removing duplicates.</p></div>
  <div class="card"><div class="card-title amber">Merge Two Arrays</div><p>i=0 in arr1, j=0 in arr2. Compare, take smaller, advance that pointer. Classic merge sort step.</p></div>
</div>

<div class="h2">5 Problems — Two Pointers</div>
<div class="problems-grid">

<problem-card num="P1" title="Two Sum II (sorted array)" difficulty="easy" tags="Sorted,Opposite Ends">
<div class="prob-desc">Given a 1-indexed sorted array, find two numbers that add up to target. Return indices. Use O(1) extra space.</div>
<div class="prob-example">Input: [2,7,11,15], target=9 → [1,2]</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Two pointers from ends <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tp-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tp-p1')">Python</button></div>
<div class="lang-panel active" id="tp-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Opposite-end Pointers</span></div><pre><span class="kw">function</span> <span class="fn">twoSumII</span>(numbers, target) {
  <span class="kw">let</span> l = <span class="num">0</span>, r = numbers.length - <span class="num">1</span>
  <span class="kw">while</span> (l &lt; r) {
    <span class="kw">const</span> sum = numbers[l] + numbers[r]
    <span class="kw">if</span>      (sum === target) <span class="kw">return</span> [l+<span class="num">1</span>, r+<span class="num">1</span>]
    <span class="kw">else if</span> (sum &lt; target)  l++
    <span class="kw">else</span>                    r--
  }
}</pre></div></div>
<div class="lang-panel" id="tp-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Opposite-end Pointers</span></div><pre><span class="py-kw">def</span> <span class="py-fn">two_sum_ii</span>(numbers, target):
    l, r = <span class="py-num">0</span>, <span class="py-fn">len</span>(numbers) - <span class="py-num">1</span>
    <span class="py-kw">while</span> l &lt; r:
        s = numbers[l] + numbers[r]
        <span class="py-kw">if</span>   s == target: <span class="py-kw">return</span> [l+<span class="py-num">1</span>, r+<span class="py-num">1</span>]
        <span class="py-kw">elif</span> s &lt; target:  l += <span class="py-num">1</span>
        <span class="py-kw">else</span>:             r -= <span class="py-num">1</span></pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Valid Palindrome" difficulty="easy" tags="String,Opposite Ends">
<div class="prob-desc">A phrase is a palindrome if, after converting to lowercase and removing non-alphanumeric chars, it reads the same forward and backward.</div>
<div class="prob-example">Input: "A man, a plan, a canal: Panama" → true</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Two pointers skip non-alnum <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tp-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tp-p2')">Python</button></div>
<div class="lang-panel active" id="tp-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Skip non-alnum in-place</span></div><pre><span class="kw">function</span> <span class="fn">isPalindrome</span>(s) {
  <span class="kw">const</span> <span class="fn">isAlnum</span> = c => /[a-z0-9]/.<span class="fn">test</span>(c)
  <span class="kw">let</span> l = <span class="num">0</span>, r = s.length - <span class="num">1</span>
  <span class="kw">while</span> (l &lt; r) {
    <span class="kw">while</span> (l &lt; r && !<span class="fn">isAlnum</span>(s[l].<span class="fn">toLowerCase</span>())) l++
    <span class="kw">while</span> (l &lt; r && !<span class="fn">isAlnum</span>(s[r].<span class="fn">toLowerCase</span>())) r--
    <span class="kw">if</span> (s[l].<span class="fn">toLowerCase</span>() !== s[r].<span class="fn">toLowerCase</span>()) <span class="kw">return</span> <span class="kw">false</span>
    l++; r--
  }
  <span class="kw">return</span> <span class="kw">true</span>
}</pre></div></div>
<div class="lang-panel" id="tp-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Filter then two pointer</span></div><pre><span class="py-kw">def</span> <span class="py-fn">is_palindrome</span>(s):
    cleaned = [c.lower() <span class="py-kw">for</span> c <span class="py-kw">in</span> s <span class="py-kw">if</span> c.isalnum()]
    <span class="py-kw">return</span> cleaned == cleaned[::-<span class="py-num">1</span>]</pre></div>
</div>
</problem-card>

<problem-card num="P3" title="3Sum" difficulty="medium" tags="Sort,Two Pointers">
<div class="prob-desc">Find all unique triplets in array that sum to zero. The solution must not contain duplicate triplets.</div>
<div class="prob-example">Input: [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Sort + fix one + two pointer <span class="approach-tc">O(n²) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Sort array. For each i, run two-pointer on nums[i+1..n]. Skip duplicates carefully.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tp-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tp-p3')">Python</button></div>
<div class="lang-panel active" id="tp-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sort + Two Pointer</span></div><pre><span class="kw">function</span> <span class="fn">threeSum</span>(nums) {
  nums.<span class="fn">sort</span>((a, b) => a - b)
  <span class="kw">const</span> res = []
  <span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; nums.length - <span class="num">2</span>; i++) {
    <span class="kw">if</span> (i > <span class="num">0</span> && nums[i] === nums[i-<span class="num">1</span>]) <span class="kw">continue</span>  <span class="cmt">// skip dup i</span>
    <span class="kw">let</span> l = i+<span class="num">1</span>, r = nums.length-<span class="num">1</span>
    <span class="kw">while</span> (l &lt; r) {
      <span class="kw">const</span> sum = nums[i] + nums[l] + nums[r]
      <span class="kw">if</span> (sum === <span class="num">0</span>) {
        res.<span class="fn">push</span>([nums[i], nums[l], nums[r]])
        <span class="kw">while</span> (l &lt; r && nums[l] === nums[l+<span class="num">1</span>]) l++
        <span class="kw">while</span> (l &lt; r && nums[r] === nums[r-<span class="num">1</span>]) r--
        l++; r--
      } <span class="kw">else if</span> (sum &lt; <span class="num">0</span>) l++
      <span class="kw">else</span> r--
    }
  }
  <span class="kw">return</span> res
}</pre></div></div>
<div class="lang-panel" id="tp-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sort + Two Pointer</span></div><pre><span class="py-kw">def</span> <span class="py-fn">three_sum</span>(nums):
    nums.sort(); res = []
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(nums) - <span class="py-num">2</span>):
        <span class="py-kw">if</span> i > <span class="py-num">0</span> <span class="py-kw">and</span> nums[i] == nums[i-<span class="py-num">1</span>]: <span class="py-kw">continue</span>
        l, r = i+<span class="py-num">1</span>, <span class="py-fn">len</span>(nums)-<span class="py-num">1</span>
        <span class="py-kw">while</span> l &lt; r:
            s = nums[i] + nums[l] + nums[r]
            <span class="py-kw">if</span> s == <span class="py-num">0</span>:
                res.append([nums[i], nums[l], nums[r]])
                <span class="py-kw">while</span> l &lt; r <span class="py-kw">and</span> nums[l] == nums[l+<span class="py-num">1</span>]: l += <span class="py-num">1</span>
                <span class="py-kw">while</span> l &lt; r <span class="py-kw">and</span> nums[r] == nums[r-<span class="py-num">1</span>]: r -= <span class="py-num">1</span>
                l += <span class="py-num">1</span>; r -= <span class="py-num">1</span>
            <span class="py-kw">elif</span> s &lt; <span class="py-num">0</span>: l += <span class="py-num">1</span>
            <span class="py-kw">else</span>: r -= <span class="py-num">1</span>
    <span class="py-kw">return</span> res</pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Container With Most Water" difficulty="medium" tags="Greedy,Two Pointers">
<div class="prob-desc">Given heights, find two lines that together with the x-axis forms a container with maximum water.</div>
<div class="prob-example">Input: [1,8,6,2,5,4,8,3,7] → 49</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Greedy two pointer — move the shorter side <span class="approach-tc">O(n) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Area = min(h[l],h[r]) * (r-l). Moving the taller side can only decrease width while not increasing height. Always move shorter side inward.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tp-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tp-p4')">Python</button></div>
<div class="lang-panel active" id="tp-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Move Shorter Side — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">maxArea</span>(height) {
  <span class="kw">let</span> l=<span class="num">0</span>, r=height.length-<span class="num">1</span>, max=<span class="num">0</span>
  <span class="kw">while</span> (l &lt; r) {
    max = <span class="cls">Math</span>.<span class="fn">max</span>(max, <span class="cls">Math</span>.<span class="fn">min</span>(height[l],height[r]) * (r-l))
    height[l] &lt; height[r] ? l++ : r--
  }
  <span class="kw">return</span> max
}</pre></div></div>
<div class="lang-panel" id="tp-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Move Shorter Side — O(n)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">max_area</span>(height):
    l, r, max_w = <span class="py-num">0</span>, <span class="py-fn">len</span>(height)-<span class="py-num">1</span>, <span class="py-num">0</span>
    <span class="py-kw">while</span> l &lt; r:
        max_w = <span class="py-fn">max</span>(max_w, <span class="py-fn">min</span>(height[l], height[r]) * (r-l))
        <span class="py-kw">if</span> height[l] &lt; height[r]: l += <span class="py-num">1</span>
        <span class="py-kw">else</span>: r -= <span class="py-num">1</span>
    <span class="py-kw">return</span> max_w</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Minimum Window Substring" difficulty="hard" tags="Sliding Window,HashMap">
<div class="prob-desc">Given strings s and t, return the minimum window substring of s that contains all characters of t. Return "" if none.</div>
<div class="prob-example">Input: s="ADOBECODEBANC", t="ABC" → "BANC"</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Sliding window + frequency maps <span class="approach-tc">O(|s|+|t|) time · O(|t|) space</span></div><p style="font-size:12px;color:var(--muted)">Expand right until window contains all of t. Then shrink left while still valid. Track best window seen.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','tp-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','tp-p5')">Python</button></div>
<div class="lang-panel active" id="tp-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sliding Window</span></div><pre><span class="kw">function</span> <span class="fn">minWindow</span>(s, t) {
  <span class="kw">if</span> (!t.length) <span class="kw">return</span> <span class="str">""</span>
  <span class="kw">const</span> need = <span class="kw">new</span> <span class="cls">Map</span>(), window = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> t) need.<span class="fn">set</span>(c, (need.<span class="fn">get</span>(c) ?? <span class="num">0</span>) + <span class="num">1</span>)
  <span class="kw">let</span> formed=<span class="num">0</span>, required=need.size, l=<span class="num">0</span>
  <span class="kw">let</span> best = [<span class="cls">Infinity</span>, <span class="num">0</span>, <span class="num">0</span>]  <span class="cmt">// [len, l, r]</span>
  <span class="kw">for</span> (<span class="kw">let</span> r=<span class="num">0</span>; r&lt;s.length; r++) {
    window.<span class="fn">set</span>(s[r], (window.<span class="fn">get</span>(s[r]) ?? <span class="num">0</span>) + <span class="num">1</span>)
    <span class="kw">if</span> (need.<span class="fn">has</span>(s[r]) && window.<span class="fn">get</span>(s[r]) === need.<span class="fn">get</span>(s[r])) formed++
    <span class="kw">while</span> (formed === required) {
      <span class="kw">if</span> (r-l+<span class="num">1</span> &lt; best[<span class="num">0</span>]) best = [r-l+<span class="num">1</span>, l, r]
      window.<span class="fn">set</span>(s[l], window.<span class="fn">get</span>(s[l]) - <span class="num">1</span>)
      <span class="kw">if</span> (need.<span class="fn">has</span>(s[l]) && window.<span class="fn">get</span>(s[l]) &lt; need.<span class="fn">get</span>(s[l])) formed--
      l++
    }
  }
  <span class="kw">return</span> best[<span class="num">0</span>] === <span class="cls">Infinity</span> ? <span class="str">""</span> : s.<span class="fn">slice</span>(best[<span class="num">1</span>], best[<span class="num">2</span>]+<span class="num">1</span>)
}</pre></div></div>
<div class="lang-panel" id="tp-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sliding Window (Python)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> Counter
<span class="py-kw">def</span> <span class="py-fn">min_window</span>(s, t):
    <span class="py-kw">if not</span> t: <span class="py-kw">return</span> <span class="py-str">""</span>
    need, window = Counter(t), {}
    formed = required = <span class="py-fn">len</span>(need)
    l = best_l = best_r = <span class="py-num">0</span>; best = <span class="py-fn">float</span>(<span class="py-str">'inf'</span>)
    <span class="py-kw">for</span> r, c <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(s):
        window[c] = window.get(c, <span class="py-num">0</span>) + <span class="py-num">1</span>
        <span class="py-kw">if</span> c <span class="py-kw">in</span> need <span class="py-kw">and</span> window[c] == need[c]: formed += <span class="py-num">1</span>
        <span class="py-kw">while</span> formed == required:
            <span class="py-kw">if</span> r-l+<span class="py-num">1</span> &lt; best: best = r-l+<span class="py-num">1</span>; best_l, best_r = l, r
            window[s[l]] -= <span class="py-num">1</span>
            <span class="py-kw">if</span> s[l] <span class="py-kw">in</span> need <span class="py-kw">and</span> window[s[l]] &lt; need[s[l]]: formed -= <span class="py-num">1</span>
            l += <span class="py-num">1</span>
    <span class="py-kw">return</span> <span class="py-str">""</span> <span class="py-kw">if</span> best == <span class="py-fn">float</span>(<span class="py-str">'inf'</span>) <span class="py-kw">else</span> s[best_l:best_r+<span class="py-num">1</span>]</pre></div>
</div>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_twopointers.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
