// Section: twopointers
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

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
<algo-visualizer id="viz-tp-p1" title="Opposite-end Pointers — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tp-p2" title="Skip Non-Alphanumeric — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tp-p3" title="Sort + Three Pointers — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tp-p4" title="Move Shorter Side — trace"></algo-visualizer>
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
<algo-visualizer id="viz-tp-p5" title="Expand/Shrink Window — trace"></algo-visualizer>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_twopointers.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Two Pointers problems ────
function wireVisualizers() {
  // ── P1: Two Sum II — opposite-end pointers ──────────────────────────────
  function traceTwoSumII(numbers, target) {
    let l = 0, r = numbers.length - 1;
    const steps = [{ l, r, note: `Start l=0, r=${r}.`, line: 2, pyLine: 2 }];
    while (l < r) {
      const sum = numbers[l] + numbers[r];
      if (sum === target) {
        steps.push({ l, r, sum, found: true, final: true, stop: true,
          note: `l=${l}, r=${r}: ${numbers[l]}+${numbers[r]}=${sum} === target → found! (indices ${l + 1}, ${r + 1})`, line: 5, pyLine: 5 });
        return steps;
      } else if (sum < target) {
        steps.push({ l, r, sum, note: `l=${l}, r=${r}: ${numbers[l]}+${numbers[r]}=${sum} < target → move l forward.`, line: 6, pyLine: 6 });
        l++;
      } else {
        steps.push({ l, r, sum, note: `l=${l}, r=${r}: ${numbers[l]}+${numbers[r]}=${sum} > target → move r backward.`, line: 7, pyLine: 7 });
        r--;
      }
    }
    steps.push({ l, r, final: true, note: 'Pointers crossed without a match.', line: 9, pyLine: 7 });
    return steps;
  }

  function renderTwoSumII(numbers, target) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(numbers,
          (v, i) => step.final && step.found ? (i === step.l || i === step.r ? 'match' : 'dim') : (i === step.l ? 'cur' : i === step.r ? 'cur2' : ''),
          (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">l + r</div><div class="viz-counter" style="font-size:20px">${step.sum ?? '—'}</div></div>
          <div class="viz-panel"><div class="viz-panel-lbl">target</div><div class="viz-counter" style="font-size:20px">${target}</div></div>
        </div>`;
    };
  }

  // ── P2: Valid Palindrome — skip non-alphanumeric ────────────────────────
  // Python's solution filters+reverses the string instead of walking pointers,
  // so there's no equivalent Python line for each JS pointer step — pyLine
  // stays null and the Python panel simply shows no highlight.
  function traceIsPalindrome(s) {
    const isAlnum = c => /[a-z0-9]/i.test(c);
    let l = 0, r = s.length - 1;
    const steps = [{ l, r, note: `Start l=0, r=${r}.`, line: 3, pyLine: null }];
    while (l < r) {
      while (l < r && !isAlnum(s[l])) l++;
      while (l < r && !isAlnum(s[r])) r--;
      if (s[l].toLowerCase() !== s[r].toLowerCase()) {
        steps.push({ l, r, mismatch: true, final: true, stop: true, note: `'${s[l]}' vs '${s[r]}' → mismatch → false.`, line: 7, pyLine: null });
        return steps;
      }
      steps.push({ l, r, note: `'${s[l].toLowerCase()}' == '${s[r].toLowerCase()}' → match, move inward.`, line: 8, pyLine: null });
      l++; r--;
    }
    steps.push({ l, r, final: true, note: 'Pointers crossed — all characters matched → true.', line: 10, pyLine: null });
    return steps;
  }

  function renderIsPalindrome(s) {
    const chars = s.split('');
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(chars,
          (v, i) => step.final && !step.mismatch ? 'dim' : (i === step.l ? (step.mismatch ? 'dup' : 'cur') : i === step.r ? (step.mismatch ? 'dup' : 'cur2') : ''),
          (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}`;
    };
  }

  // ── P3: 3Sum — sort + fixed i + two pointers ────────────────────────────
  function traceThreeSum(input) {
    const nums = [...input].sort((a, b) => a - b);
    const res = [];
    const foundChips = () => res.map(t => `[${t.join(',')}]`);
    const steps = [{ i: -1, l: -1, r: -1, nums: [...nums], found: foundChips(), note: `Sorted: [${nums.join(',')}]`, line: 2, pyLine: 2 }];
    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {
        steps.push({ i, l: -1, r: -1, nums: [...nums], found: foundChips(), note: `i=${i}: nums[i]=${nums[i]} duplicate of previous i — skip.`, line: 5, pyLine: 4 });
        continue;
      }
      let l = i + 1, r = nums.length - 1;
      while (l < r) {
        const sum = nums[i] + nums[l] + nums[r];
        if (sum === 0) {
          res.push([nums[i], nums[l], nums[r]]);
          steps.push({ i, l, r, nums: [...nums], found: foundChips(), note: `i=${i}, l=${l}, r=${r}: sum=0 → triplet [${nums[i]},${nums[l]},${nums[r]}] found.`, line: 10, pyLine: 9 });
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++; r--;
        } else if (sum < 0) {
          steps.push({ i, l, r, nums: [...nums], found: foundChips(), note: `i=${i}, l=${l}, r=${r}: sum=${sum} < 0 → move l forward.`, line: 14, pyLine: 13 });
          l++;
        } else {
          steps.push({ i, l, r, nums: [...nums], found: foundChips(), note: `i=${i}, l=${l}, r=${r}: sum=${sum} > 0 → move r backward.`, line: 15, pyLine: 14 });
          r--;
        }
      }
    }
    steps.push({ i: -1, l: -1, r: -1, nums: [...nums], found: foundChips(), final: true, note: `Done. ${res.length} triplet(s) found.`, line: 18, pyLine: 15 });
    return steps;
  }

  function renderThreeSum() {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(step.nums,
          (v, idx) => step.final ? 'dim' : (idx === step.i ? 'cur3' : idx === step.l ? 'cur' : idx === step.r ? 'cur2' : ''),
          (v, idx) => idx === step.i ? 'i' : idx === step.l ? 'L' : idx === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">triplets found (${step.found.length})</div>${chips(step.found, ' new')}</div>
        </div>`;
    };
  }

  // ── P4: Container With Most Water — greedy move shorter side ────────────
  function traceMaxArea(height) {
    let l = 0, r = height.length - 1, max = 0;
    const steps = [{ l, r, max, note: `Start l=0, r=${r}.`, line: 2, pyLine: 2 }];
    while (l < r) {
      const area = Math.min(height[l], height[r]) * (r - l);
      max = Math.max(max, area);
      const moveL = height[l] < height[r];
      steps.push({ l, r, area, max,
        note: `l=${l}, r=${r}: area=min(${height[l]},${height[r]})×${r - l}=${area} → max=${max}. ${moveL ? 'height[l] is shorter → move l forward.' : 'height[r] is shorter (or equal) → move r backward.'}`,
        line: 5, pyLine: moveL ? 5 : 6 });
      if (moveL) l++; else r--;
    }
    steps.push({ l, r, max, final: true, note: `Done. Max area = ${max}.`, line: 7, pyLine: 7 });
    return steps;
  }

  function renderMaxArea(height) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(height, (v, i) => step.final ? 'dim' : (i === step.l ? 'cur' : i === step.r ? 'cur2' : ''), (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">this area</div><div class="viz-counter" style="font-size:20px">${step.area ?? '—'}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.max}<span class="viz-counter-label">max so far</span></div></div>
        </div>`;
    };
  }

  // ── P5: Minimum Window Substring — expand/shrink window ─────────────────
  function traceMinWindow(s, t) {
    const need = new Map();
    for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
    const window = new Map();
    let formed = 0, required = need.size, l = 0;
    let best = [Infinity, 0, 0];
    const bestStr = () => best[0] === Infinity ? '—' : s.slice(best[1], best[2] + 1);
    const steps = [{ l, r: -1, formed, required, bestStr: bestStr(),
      note: `need = {${[...need].map(([k, v]) => `${k}:${v}`).join(', ')}}`, line: 5, pyLine: 5 }];
    for (let r = 0; r < s.length; r++) {
      window.set(s[r], (window.get(s[r]) ?? 0) + 1);
      if (need.has(s[r]) && window.get(s[r]) === need.get(s[r])) formed++;
      steps.push({ l, r, formed, required, bestStr: bestStr(), note: `expand r=${r} ('${s[r]}'): formed=${formed}/${required}.`, line: 9, pyLine: 9 });
      while (formed === required) {
        if (r - l + 1 < best[0]) {
          best = [r - l + 1, l, r];
          steps.push({ l, r, formed, required, bestStr: bestStr(), note: `window "${s.slice(l, r + 1)}" is valid and shortest so far → new best.`, line: 11, pyLine: 11 });
        }
        window.set(s[l], window.get(s[l]) - 1);
        if (need.has(s[l]) && window.get(s[l]) < need.get(s[l])) formed--;
        l++;
        steps.push({ l, r, formed, required, bestStr: bestStr(), note: `shrink: drop '${s[l - 1]}', l → ${l}. formed=${formed}/${required}.`, line: 14, pyLine: 14 });
      }
    }
    steps.push({ l, r: s.length - 1, formed, required, bestStr: bestStr(), final: true, note: `Done. Minimum window = "${bestStr()}".`, line: 17, pyLine: 15 });
    return steps;
  }

  function renderMinWindow(s) {
    const chars = s.split('');
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(chars,
          (v, i) => {
            if (i === step.l && i === step.r) return 'match';
            if (i === step.l) return 'cur';
            if (i === step.r) return 'cur2';
            if (step.r >= 0 && i > step.l && i < step.r) return 'seen';
            return 'dim';
          },
          (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">formed</div><div class="viz-counter" style="font-size:20px">${step.formed}/${step.required}</div></div>
          <div class="viz-panel"><div class="viz-panel-lbl">best window</div><div class="viz-counter" style="font-size:18px">"${step.bestStr}"</div></div>
        </div>`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  const tp1Nums = [2, 7, 11, 15], tp1Target = 9;
  mountVisualizer('viz-tp-p1', traceTwoSumII(tp1Nums, tp1Target), withCode('tp-p1', renderTwoSumII(tp1Nums, tp1Target)));

  const tp2Str = 'A man, a plan, a canal: Panama';
  mountVisualizer('viz-tp-p2', traceIsPalindrome(tp2Str), withCode('tp-p2', renderIsPalindrome(tp2Str)));

  mountVisualizer('viz-tp-p3', traceThreeSum([-1, 0, 1, 2, -1, -4]), withCode('tp-p3', renderThreeSum()));

  const tp4Height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  mountVisualizer('viz-tp-p4', traceMaxArea(tp4Height), withCode('tp-p4', renderMaxArea(tp4Height)));

  mountVisualizer('viz-tp-p5', traceMinWindow('ADOBECODEBANC', 'ABC'), withCode('tp-p5', renderMinWindow('ADOBECODEBANC')));
}
