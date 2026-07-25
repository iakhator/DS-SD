// Section: slidingwindow
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_slidingwindow = String.raw`
<div id="sec-slidingwindow" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Patterns · 05</span></div><div class="sec-title">Sliding Window</div></div>
<div class="sec-lead">Sliding window solves problems on contiguous subarrays or substrings in O(n) instead of O(n²). The window expands right to include new elements and shrinks from the left when a constraint is violated. Every element enters and exits the window at most once.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine scanning a long document for the densest cluster of keywords using a physical magnifying glass. You slide the glass from left to right — you never lift it and restart from the beginning for each position. When you slide the glass one step to the right, you lose whatever was on the far left edge and gain whatever just entered on the right. That incremental update, rather than a full recompute, is the key insight behind sliding window. It converts an <code>O(n&sup2;)</code> "check every subarray" brute force into a single left-to-right sweep that runs in <code>O(n)</code>.</p>
<p>Sliding window solves contiguous-subarray and substring problems where you care about some aggregate property of the window — its sum, the count of distinct characters, the frequency of a specific element. The algorithm works because the property can be updated incrementally: adding one element on the right and removing one on the left each require only a constant amount of work, no matter the window size. This holds for sums, frequency maps, and many other window states, making the pattern broadly applicable.</p>
<p>Reach for sliding window whenever the problem asks for the longest, shortest, or maximum-value contiguous subarray or substring satisfying some constraint. A common misconception is using a nested loop to shrink the window — beginners write an inner <code>for</code> loop that resets <code>l</code> all the way to <code>r</code>. The correct approach uses a <code>while</code> that only shrinks until the window is valid again; because each element enters and exits the window at most once, the total work is still <code>O(n)</code>.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Every element enters the window exactly once and leaves it exactly once, so the total number of operations across the entire pass is <code>O(2n) = O(n)</code> — no matter how many times the window shrinks and grows.</div>

<div class="h2">Fixed vs Variable Window</div>
<div class="grid-2">
  <div class="card"><div class="card-title blue">Fixed Size Window (k)</div><p>Window always has exactly k elements. Slide right: add nums[r], subtract nums[r-k]. No while loop needed.</p></div>
  <div class="card"><div class="card-title green">Variable Size Window</div><p>Window size changes based on constraint. Expand right until violation, then shrink left until valid again. Track best answer at each valid state.</p></div>
</div>

<div class="h2">The Template</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','sw-template')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','sw-template')">Python</button></div>
<div class="lang-panel active" id="sw-template-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sliding Window Template</span></div><pre><span class="cmt">// Variable window template</span>
<span class="kw">function</span> <span class="fn">slidingWindow</span>(s) {
  <span class="kw">let</span> l = <span class="num">0</span>, result = <span class="num">0</span>
  <span class="kw">const</span> windowState = <span class="kw">new</span> <span class="cls">Map</span>()  <span class="cmt">// or counter, or number</span>
  <span class="kw">for</span> (<span class="kw">let</span> r = <span class="num">0</span>; r &lt; s.length; r++) {
    <span class="cmt">// 1. Add s[r] to window</span>
    windowState.<span class="fn">set</span>(s[r], (windowState.<span class="fn">get</span>(s[r]) ?? <span class="num">0</span>) + <span class="num">1</span>)
    <span class="cmt">// 2. Shrink window from left while constraint violated</span>
    <span class="kw">while</span> (<span class="cmt">/* window is invalid */</span> windowState.size > <span class="num">2</span>) {
      windowState.<span class="fn">set</span>(s[l], windowState.<span class="fn">get</span>(s[l]) - <span class="num">1</span>)
      <span class="kw">if</span> (windowState.<span class="fn">get</span>(s[l]) === <span class="num">0</span>) windowState.<span class="fn">delete</span>(s[l])
      l++
    }
    <span class="cmt">// 3. Update result (window is valid here)</span>
    result = <span class="cls">Math</span>.<span class="fn">max</span>(result, r - l + <span class="num">1</span>)
  }
  <span class="kw">return</span> result
}</pre></div></div>
<div class="lang-panel" id="sw-template-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sliding Window Template (Python)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">sliding_window</span>(s):
    l = result = <span class="py-num">0</span>
    window = {}
    <span class="py-kw">for</span> r <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(s)):
        window[s[r]] = window.get(s[r], <span class="py-num">0</span>) + <span class="py-num">1</span>
        <span class="py-kw">while</span> <span class="py-fn">len</span>(window) > <span class="py-num">2</span>:   <span class="py-cmt"># constraint</span>
            window[s[l]] -= <span class="py-num">1</span>
            <span class="py-kw">if</span> window[s[l]] == <span class="py-num">0</span>: <span class="py-kw">del</span> window[s[l]]
            l += <span class="py-num">1</span>
        result = <span class="py-fn">max</span>(result, r - l + <span class="py-num">1</span>)
    <span class="py-kw">return</span> result</pre></div></div>

<div class="h2">5 Problems — Sliding Window</div>
<div class="problems-grid">

<problem-card num="P1" title="Maximum Average Subarray I" difficulty="easy" tags="Fixed Window">
<div class="prob-desc">Find the maximum average of a contiguous subarray of length k.</div>
<div class="prob-example">Input: [1,12,-5,-6,50,3], k=4 → 12.75 (subarray [12,-5,-6,50])</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Fixed sliding window <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','sw-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','sw-p1')">Python</button></div>
<div class="lang-panel active" id="sw-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Fixed Window</span></div><pre><span class="kw">function</span> <span class="fn">findMaxAverage</span>(nums, k) {
  <span class="kw">let</span> sum = nums.<span class="fn">slice</span>(<span class="num">0</span>, k).<span class="fn">reduce</span>((a,b) => a+b, <span class="num">0</span>)
  <span class="kw">let</span> max = sum
  <span class="kw">for</span> (<span class="kw">let</span> i = k; i &lt; nums.length; i++) {
    sum += nums[i] - nums[i-k]  <span class="cmt">// slide: add new, remove old</span>
    max = <span class="cls">Math</span>.<span class="fn">max</span>(max, sum)
  }
  <span class="kw">return</span> max / k
}</pre></div></div>
<div class="lang-panel" id="sw-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Fixed Window</span></div><pre><span class="py-kw">def</span> <span class="py-fn">find_max_average</span>(nums, k):
    s = <span class="py-fn">sum</span>(nums[:k]); best = s
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(k, <span class="py-fn">len</span>(nums)):
        s += nums[i] - nums[i-k]
        best = <span class="py-fn">max</span>(best, s)
    <span class="py-kw">return</span> best / k</pre></div>
</div>
<algo-visualizer id="viz-sw-p1" title="Fixed Window Slide — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Longest Substring Without Repeating Characters" difficulty="medium" tags="Variable Window,HashSet">
<div class="prob-desc">Find the length of the longest substring without repeating characters.</div>
<div class="prob-example">Input: "abcabcbb" → 3 ("abc")</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ HashMap for last position <span class="approach-tc">O(n) time · O(min(n,alphabet)) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','sw-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','sw-p2')">Python</button></div>
<div class="lang-panel active" id="sw-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashMap — Jump Left Pointer</span></div><pre><span class="kw">function</span> <span class="fn">lengthOfLongestSubstring</span>(s) {
  <span class="kw">const</span> last = <span class="kw">new</span> <span class="cls">Map</span>()  <span class="cmt">// char → last seen index</span>
  <span class="kw">let</span> l = <span class="num">0</span>, best = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">let</span> r = <span class="num">0</span>; r &lt; s.length; r++) {
    <span class="kw">if</span> (last.<span class="fn">has</span>(s[r]) && last.<span class="fn">get</span>(s[r]) >= l)
      l = last.<span class="fn">get</span>(s[r]) + <span class="num">1</span>   <span class="cmt">// jump l past the duplicate</span>
    last.<span class="fn">set</span>(s[r], r)
    best = <span class="cls">Math</span>.<span class="fn">max</span>(best, r - l + <span class="num">1</span>)
  }
  <span class="kw">return</span> best
}</pre></div></div>
<div class="lang-panel" id="sw-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashMap</span></div><pre><span class="py-kw">def</span> <span class="py-fn">length_of_longest_substring</span>(s):
    last, l, best = {}, <span class="py-num">0</span>, <span class="py-num">0</span>
    <span class="py-kw">for</span> r, c <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(s):
        <span class="py-kw">if</span> c <span class="py-kw">in</span> last <span class="py-kw">and</span> last[c] >= l: l = last[c] + <span class="py-num">1</span>
        last[c] = r
        best = <span class="py-fn">max</span>(best, r - l + <span class="py-num">1</span>)
    <span class="py-kw">return</span> best</pre></div>
</div>
<algo-visualizer id="viz-sw-p2" title="Variable Window — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Permutation in String" difficulty="medium" tags="Fixed Window,Freq Map">
<div class="prob-desc">Given strings s1 and s2, return true if s2 contains a permutation of s1 as a substring.</div>
<div class="prob-example">Input: s1="ab", s2="eidbaooo" → true ("ba" is a permutation of "ab")</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Fixed window = len(s1), compare freq maps <span class="approach-tc">O(|s2|) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','sw-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','sw-p3')">Python</button></div>
<div class="lang-panel active" id="sw-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Matches Counter — O(|s2|)</span></div><pre><span class="kw">function</span> <span class="fn">checkInclusion</span>(s1, s2) {
  <span class="kw">if</span> (s1.length > s2.length) <span class="kw">return</span> <span class="kw">false</span>
  <span class="kw">const</span> need = <span class="kw">new</span> <span class="cls">Array</span>(<span class="num">26</span>).<span class="fn">fill</span>(<span class="num">0</span>)
  <span class="kw">const</span> win  = <span class="kw">new</span> <span class="cls">Array</span>(<span class="num">26</span>).<span class="fn">fill</span>(<span class="num">0</span>)
  <span class="kw">const</span> a = <span class="str">'a'</span>.<span class="fn">charCodeAt</span>(<span class="num">0</span>)
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> s1) need[c.<span class="fn">charCodeAt</span>(<span class="num">0</span>)-a]++
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;s1.length; i++) win[s2.<span class="fn">charCodeAt</span>(i)-a]++
  <span class="kw">if</span> (need.<span class="fn">every</span>((v,i) => v===win[i])) <span class="kw">return</span> <span class="kw">true</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=s1.length; i&lt;s2.length; i++) {
    win[s2.<span class="fn">charCodeAt</span>(i)-a]++
    win[s2.<span class="fn">charCodeAt</span>(i-s1.length)-a]--
    <span class="kw">if</span> (need.<span class="fn">every</span>((v,j) => v===win[j])) <span class="kw">return</span> <span class="kw">true</span>
  }
  <span class="kw">return</span> <span class="kw">false</span>
}</pre></div></div>
<div class="lang-panel" id="sw-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Counter Comparison</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> Counter
<span class="py-kw">def</span> <span class="py-fn">check_inclusion</span>(s1, s2):
    <span class="py-kw">if</span> <span class="py-fn">len</span>(s1) > <span class="py-fn">len</span>(s2): <span class="py-kw">return</span> <span class="py-kw">False</span>
    need = Counter(s1)
    win = Counter(s2[:<span class="py-fn">len</span>(s1)])
    <span class="py-kw">if</span> need == win: <span class="py-kw">return</span> <span class="py-kw">True</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(s1), <span class="py-fn">len</span>(s2)):
        win[s2[i]] += <span class="py-num">1</span>
        win[s2[i-<span class="py-fn">len</span>(s1)]] -= <span class="py-num">1</span>
        <span class="py-kw">if</span> win[s2[i-<span class="py-fn">len</span>(s1)]] == <span class="py-num">0</span>: <span class="py-kw">del</span> win[s2[i-<span class="py-fn">len</span>(s1)]]
        <span class="py-kw">if</span> need == win: <span class="py-kw">return</span> <span class="py-kw">True</span>
    <span class="py-kw">return</span> <span class="py-kw">False</span></pre></div>
</div>
<algo-visualizer id="viz-sw-p3" title="Fixed Window Freq Match — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Longest Repeating Character Replacement" difficulty="medium" tags="Variable Window,Freq Count">
<div class="prob-desc">Replace at most k characters in string s to make a substring of length as long as possible with all the same letter.</div>
<div class="prob-example">Input: s="AABABBA", k=1 → 4 ("AABA" replace one → "AAAA")</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Window invalid when: len - maxFreq > k <span class="approach-tc">O(n) time · O(1) space</span></div><p style="font-size:12px;color:var(--muted)">Track max frequency char in window. If replacements needed (window_size - maxFreq) exceed k, shrink left. maxFreq only increases (optimization).</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','sw-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','sw-p4')">Python</button></div>
<div class="lang-panel active" id="sw-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Max Freq Trick</span></div><pre><span class="kw">function</span> <span class="fn">characterReplacement</span>(s, k) {
  <span class="kw">const</span> freq = <span class="kw">new</span> <span class="cls">Array</span>(<span class="num">26</span>).<span class="fn">fill</span>(<span class="num">0</span>)
  <span class="kw">const</span> a = <span class="str">'a'</span>.<span class="fn">charCodeAt</span>(<span class="num">0</span>)
  <span class="kw">let</span> l=<span class="num">0</span>, maxFreq=<span class="num">0</span>, best=<span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">let</span> r=<span class="num">0</span>; r&lt;s.length; r++) {
    maxFreq = <span class="cls">Math</span>.<span class="fn">max</span>(maxFreq, ++freq[s.<span class="fn">charCodeAt</span>(r)-a])
    <span class="kw">if</span> (r-l+<span class="num">1</span> - maxFreq > k) {  <span class="cmt">// too many replacements needed</span>
      freq[s.<span class="fn">charCodeAt</span>(l)-a]--
      l++
    }
    best = <span class="cls">Math</span>.<span class="fn">max</span>(best, r-l+<span class="num">1</span>)
  }
  <span class="kw">return</span> best
}</pre></div></div>
<div class="lang-panel" id="sw-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Max Freq Trick</span></div><pre><span class="py-kw">def</span> <span class="py-fn">character_replacement</span>(s, k):
    freq, l, max_freq, best = {}, <span class="py-num">0</span>, <span class="py-num">0</span>, <span class="py-num">0</span>
    <span class="py-kw">for</span> r, c <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(s):
        freq[c] = freq.get(c, <span class="py-num">0</span>) + <span class="py-num">1</span>
        max_freq = <span class="py-fn">max</span>(max_freq, freq[c])
        <span class="py-kw">if</span> (r-l+<span class="py-num">1</span>) - max_freq > k:
            freq[s[l]] -= <span class="py-num">1</span>; l += <span class="py-num">1</span>
        best = <span class="py-fn">max</span>(best, r-l+<span class="py-num">1</span>)
    <span class="py-kw">return</span> best</pre></div>
</div>
<algo-visualizer id="viz-sw-p4" title="Max Frequency Trick — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Sliding Window Maximum (Deque)" difficulty="hard" tags="Monotonic Deque,O(n)">
<div class="prob-desc">Given array nums and sliding window size k, return the maximum of each window as it slides through.</div>
<div class="prob-example">Input: [1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Brute Force <span class="approach-tc">O(nk)</span></div></div>
  <div class="approach best"><div class="approach-name">✅ Monotonic decreasing deque <span class="approach-tc">O(n) time · O(k) space</span></div><p style="font-size:12px;color:var(--muted)">Maintain a deque of indices. Front = max. Remove from front if out of window. Remove from back if smaller than current (they'll never be max while current is in window).</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','sw-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','sw-p5')">Python</button></div>
<div class="lang-panel active" id="sw-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Monotonic Deque — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">maxSlidingWindow</span>(nums, k) {
  <span class="kw">const</span> deque = []  <span class="cmt">// stores indices, front = max</span>
  <span class="kw">const</span> res = []
  <span class="kw">for</span> (<span class="kw">let</span> r=<span class="num">0</span>; r&lt;nums.length; r++) {
    <span class="cmt">// Remove expired index from front</span>
    <span class="kw">if</span> (deque.length && deque[<span class="num">0</span>] === r-k) deque.<span class="fn">shift</span>()
    <span class="cmt">// Remove smaller elements from back (useless)</span>
    <span class="kw">while</span> (deque.length && nums[deque.<span class="fn">at</span>(-<span class="num">1</span>)] &lt;= nums[r]) deque.<span class="fn">pop</span>()
    deque.<span class="fn">push</span>(r)
    <span class="kw">if</span> (r >= k-<span class="num">1</span>) res.<span class="fn">push</span>(nums[deque[<span class="num">0</span>]])
  }
  <span class="kw">return</span> res
}</pre></div></div>
<div class="lang-panel" id="sw-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">collections.deque — O(n)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> deque
<span class="py-kw">def</span> <span class="py-fn">max_sliding_window</span>(nums, k):
    dq, res = deque(), []
    <span class="py-kw">for</span> r <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(nums)):
        <span class="py-kw">if</span> dq <span class="py-kw">and</span> dq[<span class="py-num">0</span>] == r-k: dq.popleft()
        <span class="py-kw">while</span> dq <span class="py-kw">and</span> nums[dq[-<span class="py-num">1</span>]] &lt;= nums[r]: dq.pop()
        dq.append(r)
        <span class="py-kw">if</span> r >= k-<span class="py-num">1</span>: res.append(nums[dq[<span class="py-num">0</span>]])
    <span class="py-kw">return</span> res</pre></div>
</div>
<algo-visualizer id="viz-sw-p5" title="Monotonic Deque — trace"></algo-visualizer>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_slidingwindow.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Sliding Window problems ──
function wireVisualizers() {
  // ── P1: Maximum Average Subarray I — fixed window ───────────────────────
  function traceMaxAverage(nums, k) {
    let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);
    let max = sum;
    const steps = [{ l: 0, r: k - 1, sum, max, note: `Initial window [0..${k - 1}]: sum=${sum}.`, line: 2, pyLine: 2 }];
    for (let i = k; i < nums.length; i++) {
      sum += nums[i] - nums[i - k];
      max = Math.max(max, sum);
      steps.push({ l: i - k + 1, r: i, sum, max, note: `slide: +nums[${i}](${nums[i]}) −nums[${i - k}](${nums[i - k]}) → sum=${sum}, max=${max}.`, line: 5, pyLine: 4 });
    }
    steps.push({ l: nums.length - k, r: nums.length - 1, sum, max, final: true, note: `Done. Max average = ${max}/${k} = ${(max / k).toFixed(2)}.`, line: 8, pyLine: 6 });
    return steps;
  }

  function renderMaxAverage(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums,
          (v, i) => step.final ? (i >= step.l && i <= step.r ? 'match' : 'dim') : (i >= step.l && i <= step.r ? 'seen' : ''),
          (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">window sum</div><div class="viz-counter" style="font-size:20px">${step.sum}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.max}<span class="viz-counter-label">max sum</span></div></div>
        </div>`;
    };
  }

  // ── P2: Longest Substring Without Repeating Characters ──────────────────
  function traceLongestSubstring(s) {
    const last = new Map();
    let l = 0, best = 0;
    const steps = [{ r: -1, l, best, note: 'Start — l=0, best=0.', line: 3, pyLine: 2 }];
    for (let r = 0; r < s.length; r++) {
      let jumped = false;
      if (last.has(s[r]) && last.get(s[r]) >= l) { l = last.get(s[r]) + 1; jumped = true; }
      last.set(s[r], r);
      best = Math.max(best, r - l + 1);
      steps.push({ r, l, best, jumped,
        note: `r=${r} ('${s[r]}')${jumped ? `: duplicate → jump l to ${l}` : ''}. window="${s.slice(l, r + 1)}" (len ${r - l + 1}) → best=${best}.`,
        line: jumped ? 6 : 8, pyLine: jumped ? 4 : 6 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderLongestSubstring(s) {
    const chars = s.split('');
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(chars,
          (v, i) => step.final ? (i >= step.l && i <= step.r ? 'match' : 'dim') : (i >= step.l && i <= step.r ? 'seen' : (i > step.r ? '' : 'dim')),
          (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-counter">${step.best}<span class="viz-counter-label">longest so far</span></div></div>
        </div>`;
    };
  }

  // ── P3: Permutation in String — fixed window frequency match ────────────
  function traceCheckInclusion(s1, s2) {
    const need = new Map();
    for (const c of s1) need.set(c, (need.get(c) ?? 0) + 1);
    const win = new Map();
    for (let i = 0; i < s1.length; i++) win.set(s2[i], (win.get(s2[i]) ?? 0) + 1);
    const mapsEqual = (a, b) => a.size === b.size && [...a].every(([k, v]) => b.get(k) === v);
    const steps = [{ i: s1.length - 1, win: Object.fromEntries(win), match: mapsEqual(need, win),
      note: `Initial window s2[0..${s1.length - 1}]="${s2.slice(0, s1.length)}".`, line: 7, pyLine: 5 }];
    if (mapsEqual(need, win)) {
      steps.push({ i: s1.length - 1, win: Object.fromEntries(win), match: true, final: true, stop: true,
        note: 'Window matches need → true.', line: 8, pyLine: 6 });
      return steps;
    }
    for (let i = s1.length; i < s2.length; i++) {
      win.set(s2[i], (win.get(s2[i]) ?? 0) + 1);
      const outC = s2[i - s1.length];
      win.set(outC, win.get(outC) - 1);
      if (win.get(outC) === 0) win.delete(outC);
      const match = mapsEqual(need, win);
      steps.push({ i, win: Object.fromEntries(win), match, final: match, stop: match,
        note: `slide: +'${s2[i]}' −'${outC}' → window="${s2.slice(i - s1.length + 1, i + 1)}"${match ? ' → matches need → true!' : ''}`,
        line: match ? 12 : 11, pyLine: match ? 11 : 9 });
      if (match) return steps;
    }
    steps.push({ i: s2.length - 1, win: Object.fromEntries(win), match: false, final: true, note: 'No matching window found → false.', line: 14, pyLine: 12 });
    return steps;
  }

  function renderCheckInclusion(s2, s1Len) {
    const chars = s2.split('');
    return (stage, step) => {
      const l = step.i - s1Len + 1;
      stage.innerHTML = `
        ${cellsRow(chars, (v, i) => i >= l && i <= step.i ? (step.match ? 'match' : 'seen') : (step.final ? 'dim' : ''), (v, i) => i === l ? 'L' : i === step.i ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">window freq</div>${chips(Object.entries(step.win).map(([k, v]) => `${k}:${v}`))}</div>
        </div>`;
    };
  }

  // ── P4: Longest Repeating Character Replacement ─────────────────────────
  function traceCharacterReplacement(s, k) {
    const freq = new Map();
    let l = 0, maxFreq = 0, best = 0;
    const steps = [{ l, r: -1, maxFreq, best, note: 'Start — l=0, maxFreq=0, best=0.', line: 4, pyLine: 2 }];
    for (let r = 0; r < s.length; r++) {
      freq.set(s[r], (freq.get(s[r]) ?? 0) + 1);
      maxFreq = Math.max(maxFreq, freq.get(s[r]));
      let shrunk = false;
      if ((r - l + 1) - maxFreq > k) {
        freq.set(s[l], freq.get(s[l]) - 1);
        l++;
        shrunk = true;
      }
      best = Math.max(best, r - l + 1);
      steps.push({ l, r, maxFreq, best, shrunk,
        note: `r=${r} ('${s[r]}'): maxFreq=${maxFreq}, window="${s.slice(l, r + 1)}" (len ${r - l + 1})${shrunk ? ' — too many replacements, shrink l' : ''} → best=${best}.`,
        line: shrunk ? 8 : 11, pyLine: shrunk ? 7 : 8 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderCharacterReplacement(s) {
    const chars = s.split('');
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(chars,
          (v, i) => step.final ? (i >= step.l && i <= step.r ? 'match' : 'dim') : (i >= step.l && i <= step.r ? 'seen' : (i > step.r ? '' : 'dim')),
          (v, i) => i === step.l ? 'L' : i === step.r ? 'R' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">maxFreq</div><div class="viz-counter" style="font-size:20px">${step.maxFreq}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.best}<span class="viz-counter-label">best so far</span></div></div>
        </div>`;
    };
  }

  // ── P5: Sliding Window Maximum — monotonic deque ────────────────────────
  function traceMaxSlidingWindow(nums, k) {
    const deque = [];
    const res = [];
    const steps = [{ r: -1, deque: [], res: [], note: 'Start — deque = [].', line: 2, pyLine: 3 }];
    for (let r = 0; r < nums.length; r++) {
      let expired = false;
      if (deque.length && deque[0] === r - k) { deque.shift(); expired = true; }
      let popped = 0;
      while (deque.length && nums[deque[deque.length - 1]] <= nums[r]) { deque.pop(); popped++; }
      deque.push(r);
      let addedToRes = false;
      if (r >= k - 1) { res.push(nums[deque[0]]); addedToRes = true; }
      steps.push({ r, deque: [...deque], res: [...res],
        note: `r=${r} (val=${nums[r]})${expired ? ': drop expired front index' : ''}${popped ? `, pop ${popped} smaller from back` : ''}, push ${r}.${addedToRes ? ` window max = ${nums[deque[0]]}.` : ''}`,
        line: addedToRes ? 10 : 9, pyLine: addedToRes ? 8 : 7 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMaxSlidingWindow(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums, (v, i) => step.final ? 'dim' : (i === step.r ? 'cur' : (step.deque.includes(i) ? 'seen' : 'dim')), (v, i) => i === step.deque[0] ? 'max' : '')}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">deque (indices)</div>${chips(step.deque)}</div>
          <div class="viz-panel"><div class="viz-panel-lbl">result</div>${chips(step.res, ' new')}</div>
        </div>`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  const p1Nums = [1, 12, -5, -6, 50, 3], p1K = 4;
  mountVisualizer('viz-sw-p1', traceMaxAverage(p1Nums, p1K), withCode('sw-p1', renderMaxAverage(p1Nums)));

  mountVisualizer('viz-sw-p2', traceLongestSubstring('abcabcbb'), withCode('sw-p2', renderLongestSubstring('abcabcbb')));

  const p3S1 = 'ab', p3S2 = 'eidbaooo';
  mountVisualizer('viz-sw-p3', traceCheckInclusion(p3S1, p3S2), withCode('sw-p3', renderCheckInclusion(p3S2, p3S1.length)));

  mountVisualizer('viz-sw-p4', traceCharacterReplacement('AABABBA', 1), withCode('sw-p4', renderCharacterReplacement('AABABBA')));

  const p5Nums = [1, 3, -1, -3, 5, 3, 6, 7], p5K = 3;
  mountVisualizer('viz-sw-p5', traceMaxSlidingWindow(p5Nums, p5K), withCode('sw-p5', renderMaxSlidingWindow(p5Nums)));
}
