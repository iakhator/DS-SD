// Section: dp1d
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_dp1d = String.raw`
<div id="sec-dp1d" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">DP · 17</span></div><div class="sec-title">DP — Classic 1D Problems</div></div>
<div class="sec-lead">One-dimensional DP problems have a state that depends only on previous states in a single array. The pattern is always: define dp[i], write the recurrence, handle base cases, optimize space if possible.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Picture yourself walking along a row of stepping stones where each stone has a different value. At every stone you make one decision — take one step or two — and that decision affects which stones are reachable later. One-dimensional DP captures this structure perfectly: <strong>the answer at position <code>i</code> depends only on a small number of earlier positions</strong>. The array <code>dp</code> is a memo of all previously made optimal decisions, and the recurrence expresses how today's best choice is built from yesterday's.</p>
<p>1D DP solves the problem of <strong>sequential decision-making with overlapping choices</strong>. Without caching, an exhaustive recursive search tries every combination of steps, leading to exponential time. The key observation is that no matter how you reached position <code>i</code>, the best future decisions from <code>i</code> onward are the same — this is optimal substructure. Once you fill <code>dp[0]</code> through <code>dp[i-1]</code>, each new entry costs only a constant number of lookups, giving overall <code>O(n)</code> time. And because each entry only looks back a fixed number of steps, the entire table can usually be compressed to just two or three variables, reducing space to <code>O(1)</code>.</p>
<p>Reach for 1D DP when elements are processed in a fixed order (left to right through an array or string) and each element contributes to a running answer that depends only on recent history. Classic signals include: "minimum/maximum cost to reach the end," "number of ways to partition a string," or "longest increasing subsequence." A frequent mistake is forgetting to account for leading zeros or invalid transitions (as in Decode Ways), where jumping straight to the recurrence without checking validity produces inflated counts. Always enumerate which transitions are actually legal before writing the recurrence.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> In almost every 1D DP problem you can reduce <code>O(n)</code> space to <code>O(1)</code> by recognizing that only the last 1, 2, or <code>k</code> entries of the table are ever read. Replace the array with a rolling set of variables — this is not an optimization afterthought, it is the natural endpoint of understanding what the recurrence actually uses.</div>
<div class="h2">5 Problems — Classic 1D DP</div>
<div class="problems-grid">

<problem-card num="P1" title="Min Cost Climbing Stairs" difficulty="easy" tags="1D DP">
<div class="prob-desc">Each stair has a cost. You can climb 1 or 2 stairs. Find min cost to reach the top (beyond last step). You can start at step 0 or 1.</div>
<div class="prob-example">cost=[10,15,20] → 15 (start at index 1, jump to top)</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp1d-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp1d-p1')">Python</button></div>
<div class="lang-panel active" id="dp1d-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">dp[i] = cost[i] + min(dp[i-1], dp[i-2])</span></div><pre><span class="kw">function</span> <span class="fn">minCostClimbingStairs</span>(cost) {
  <span class="kw">let</span> a = cost[<span class="num">0</span>], b = cost[<span class="num">1</span>]
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">2</span>; i&lt;cost.length; i++)
    [a, b] = [b, cost[i] + <span class="cls">Math</span>.<span class="fn">min</span>(a, b)]
  <span class="kw">return</span> <span class="cls">Math</span>.<span class="fn">min</span>(a, b)
}</pre></div></div>
<div class="lang-panel" id="dp1d-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">O(1) space DP</span></div><pre><span class="py-kw">def</span> <span class="py-fn">min_cost_climbing_stairs</span>(cost):
    a, b = cost[<span class="py-num">0</span>], cost[<span class="py-num">1</span>]
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">2</span>, <span class="py-fn">len</span>(cost)):
        a, b = b, cost[i] + <span class="py-fn">min</span>(a, b)
    <span class="py-kw">return</span> <span class="py-fn">min</span>(a, b)</pre></div>
</div>
<algo-visualizer id="viz-dp1d-p1" title="Rolling Min Cost — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Decode Ways" difficulty="medium" tags="1D DP,String">
<div class="prob-desc">A message with digits 1-26 maps to A-Z. Count the total number of ways to decode a digit string.</div>
<div class="prob-example">"226" → 3 (ways: "BZ","VF","BBF")</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ dp[i] = ways to decode s[0..i-1]. Consider 1 or 2 digits at a time. <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp1d-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp1d-p2')">Python</button></div>
<div class="lang-panel active" id="dp1d-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Decode Ways DP</span></div><pre><span class="kw">function</span> <span class="fn">numDecodings</span>(s) {
  <span class="kw">let</span> prev2=<span class="num">1</span>, prev1=s[<span class="num">0</span>]!==<span class="str">'0'</span>?<span class="num">1</span>:<span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">1</span>; i&lt;s.length; i++) {
    <span class="kw">let</span> curr=<span class="num">0</span>
    <span class="kw">if</span> (s[i]!==<span class="str">'0'</span>) curr += prev1              <span class="cmt">// single digit</span>
    <span class="kw">const</span> two = +s.<span class="fn">slice</span>(i-<span class="num">1</span>,i+<span class="num">1</span>)
    <span class="kw">if</span> (two>=<span class="num">10</span> && two&lt;=<span class="num">26</span>) curr += prev2       <span class="cmt">// two-digit combo</span>
    ;[prev2, prev1] = [prev1, curr]
  }
  <span class="kw">return</span> prev1
}</pre></div></div>
<div class="lang-panel" id="dp1d-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Decode Ways DP</span></div><pre><span class="py-kw">def</span> <span class="py-fn">num_decodings</span>(s):
    prev2, prev1 = <span class="py-num">1</span>, <span class="py-num">0</span> <span class="py-kw">if</span> s[<span class="py-num">0</span>]==<span class="py-str">'0'</span> <span class="py-kw">else</span> <span class="py-num">1</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>, <span class="py-fn">len</span>(s)):
        curr = <span class="py-num">0</span>
        <span class="py-kw">if</span> s[i] != <span class="py-str">'0'</span>: curr += prev1
        two = <span class="py-fn">int</span>(s[i-<span class="py-num">1</span>:i+<span class="py-num">1</span>])
        <span class="py-kw">if</span> <span class="py-num">10</span> &lt;= two &lt;= <span class="py-num">26</span>: curr += prev2
        prev2, prev1 = prev1, curr
    <span class="py-kw">return</span> prev1</pre></div>
</div>
<algo-visualizer id="viz-dp1d-p2" title="1 or 2 Digit Decode — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Maximum Product Subarray" difficulty="medium" tags="1D DP,Track Min+Max">
<div class="prob-desc">Find the contiguous subarray with the largest product. Array can contain negatives and zeros.</div>
<div class="prob-example">Input: [2,3,-2,4] → 6 | [-2,3,-4] → 24</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Track both maxProd and minProd (negative × negative = positive) <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp1d-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp1d-p3')">Python</button></div>
<div class="lang-panel active" id="dp1d-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Track Min and Max</span></div><pre><span class="kw">function</span> <span class="fn">maxProduct</span>(nums) {
  <span class="kw">let</span> maxP=nums[<span class="num">0</span>], minP=nums[<span class="num">0</span>], best=nums[<span class="num">0</span>]
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">1</span>; i&lt;nums.length; i++) {
    <span class="kw">const</span> tmp = maxP
    maxP = <span class="cls">Math</span>.<span class="fn">max</span>(nums[i], maxP*nums[i], minP*nums[i])
    minP = <span class="cls">Math</span>.<span class="fn">min</span>(nums[i], tmp*nums[i],  minP*nums[i])
    best = <span class="cls">Math</span>.<span class="fn">max</span>(best, maxP)
  }
  <span class="kw">return</span> best
}</pre></div></div>
<div class="lang-panel" id="dp1d-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Track Min and Max</span></div><pre><span class="py-kw">def</span> <span class="py-fn">max_product</span>(nums):
    max_p = min_p = best = nums[<span class="py-num">0</span>]
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums[<span class="py-num">1</span>:]:
        max_p, min_p = <span class="py-fn">max</span>(n, max_p*n, min_p*n), <span class="py-fn">min</span>(n, max_p*n, min_p*n)
        best = <span class="py-fn">max</span>(best, max_p)
    <span class="py-kw">return</span> best</pre></div>
</div>
<algo-visualizer id="viz-dp1d-p3" title="Track Min and Max — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Word Break" difficulty="medium" tags="1D DP,String">
<div class="prob-desc">Given a string and a dictionary, return true if the string can be segmented into space-separated dictionary words.</div>
<div class="prob-example">s="leetcode", wordDict=["leet","code"] → true</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ dp[i] = can we form s[0..i-1] from wordDict <span class="approach-tc">O(n² × m) time · O(n) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp1d-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp1d-p4')">Python</button></div>
<div class="lang-panel active" id="dp1d-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">DP Word Break</span></div><pre><span class="kw">function</span> <span class="fn">wordBreak</span>(s, wordDict) {
  <span class="kw">const</span> words = <span class="kw">new</span> <span class="cls">Set</span>(wordDict)
  <span class="kw">const</span> dp = <span class="kw">new</span> <span class="cls">Array</span>(s.length+<span class="num">1</span>).<span class="fn">fill</span>(<span class="kw">false</span>)
  dp[<span class="num">0</span>] = <span class="kw">true</span>  <span class="cmt">// empty string is always valid</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">1</span>; i&lt;=s.length; i++)
    <span class="kw">for</span> (<span class="kw">let</span> j=<span class="num">0</span>; j&lt;i; j++)
      <span class="kw">if</span> (dp[j] && words.<span class="fn">has</span>(s.<span class="fn">slice</span>(j,i))) { dp[i]=<span class="kw">true</span>; <span class="kw">break</span> }
  <span class="kw">return</span> dp[s.length]
}</pre></div></div>
<div class="lang-panel" id="dp1d-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">DP Word Break</span></div><pre><span class="py-kw">def</span> <span class="py-fn">word_break</span>(s, word_dict):
    words = <span class="py-fn">set</span>(word_dict)
    dp = [<span class="py-kw">False</span>] * (<span class="py-fn">len</span>(s)+<span class="py-num">1</span>); dp[<span class="py-num">0</span>] = <span class="py-kw">True</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>, <span class="py-fn">len</span>(s)+<span class="py-num">1</span>):
        <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(i):
            <span class="py-kw">if</span> dp[j] <span class="py-kw">and</span> s[j:i] <span class="py-kw">in</span> words: dp[i] = <span class="py-kw">True</span>; <span class="py-kw">break</span>
    <span class="py-kw">return</span> dp[<span class="py-fn">len</span>(s)]</pre></div>
</div>
<algo-visualizer id="viz-dp1d-p4" title="Segment DP — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Partition Equal Subset Sum (0/1 Knapsack)" difficulty="hard" tags="0/1 Knapsack,BitSet">
<div class="prob-desc">Determine if array can be partitioned into two subsets with equal sum.</div>
<div class="prob-example">Input: [1,5,11,5] → true (partitions [1,5,5] and [11])</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Can we form sum = total/2? 0/1 knapsack. dp[j] = can we form sum j. <span class="approach-tc">O(n×sum) time · O(sum) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp1d-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp1d-p5')">Python</button></div>
<div class="lang-panel active" id="dp1d-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">0/1 Knapsack</span></div><pre><span class="kw">function</span> <span class="fn">canPartition</span>(nums) {
  <span class="kw">const</span> total = nums.<span class="fn">reduce</span>((a,b)=>a+b,<span class="num">0</span>)
  <span class="kw">if</span> (total%<span class="num">2</span>) <span class="kw">return</span> <span class="kw">false</span>
  <span class="kw">const</span> target=total/<span class="num">2</span>
  <span class="kw">const</span> dp = <span class="kw">new</span> <span class="cls">Array</span>(target+<span class="num">1</span>).<span class="fn">fill</span>(<span class="kw">false</span>); dp[<span class="num">0</span>]=<span class="kw">true</span>
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums)
    <span class="kw">for</span> (<span class="kw">let</span> j=target; j>=n; j--)   <span class="cmt">// iterate backwards! (0/1 knapsack)</span>
      dp[j] = dp[j] || dp[j-n]
  <span class="kw">return</span> dp[target]
}</pre></div></div>
<div class="lang-panel" id="dp1d-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">0/1 Knapsack</span></div><pre><span class="py-kw">def</span> <span class="py-fn">can_partition</span>(nums):
    total = <span class="py-fn">sum</span>(nums)
    <span class="py-kw">if</span> total % <span class="py-num">2</span>: <span class="py-kw">return</span> <span class="py-kw">False</span>
    target = total // <span class="py-num">2</span>
    dp = [<span class="py-kw">False</span>] * (target+<span class="py-num">1</span>); dp[<span class="py-num">0</span>] = <span class="py-kw">True</span>
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums:
        <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(target, n-<span class="py-num">1</span>, -<span class="py-num">1</span>):  <span class="py-cmt"># backwards!</span>
            dp[j] = dp[j] <span class="py-kw">or</span> dp[j-n]
    <span class="py-kw">return</span> dp[target]</pre></div>
</div>
<algo-visualizer id="viz-dp1d-p5" title="0/1 Knapsack — trace"></algo-visualizer>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_dp1d.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the DP Classic 1D problems ───
function wireVisualizers() {
  // ── P1: Min Cost Climbing Stairs ─────────────────────────────────────────
  function traceMinCostClimbingStairs(cost) {
    let a = cost[0], b = cost[1];
    const steps = [{ i: 1, a, b, note: `Start — a=cost[0]=${a}, b=cost[1]=${b}.`, line: 2, pyLine: 2 }];
    for (let i = 2; i < cost.length; i++) {
      const newB = cost[i] + Math.min(a, b);
      [a, b] = [b, newB];
      steps.push({ i, a, b, note: `i=${i}: cost[${i}]=${cost[i]} + min(a,b) → new pair (${a},${b}).`, line: 4, pyLine: 4 });
    }
    steps.push({ i: cost.length, a, b, final: true, note: `Done. min(a,b) = ${Math.min(a, b)}.`, line: 5, pyLine: 5 });
    return steps;
  }

  function renderMinCostClimbingStairs(cost) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(cost, (v, idx) => step.final ? 'dim' : (idx === step.i ? 'cur' : (idx < step.i ? 'dim' : '')))}
        <div class="viz-panels" style="margin-top:8px">
          <div class="viz-panel"><div class="viz-panel-lbl">a</div><div class="viz-counter" style="font-size:20px">${step.a}</div></div>
          <div class="viz-panel"><div class="viz-panel-lbl">b</div><div class="viz-counter" style="font-size:20px">${step.b}</div></div>
        </div>`;
    };
  }

  // ── P2: Decode Ways ───────────────────────────────────────────────────────
  function traceNumDecodings(s) {
    let prev2 = 1, prev1 = s[0] !== '0' ? 1 : 0;
    const steps = [{ i: 0, prev1, note: `Start — s[0]='${s[0]}' → prev1=${prev1}.`, line: 2, pyLine: 2 }];
    for (let i = 1; i < s.length; i++) {
      let curr = 0;
      const parts = [];
      if (s[i] !== '0') { curr += prev1; parts.push(`single '${s[i]}'`); }
      const two = +s.slice(i - 1, i + 1);
      if (two >= 10 && two <= 26) { curr += prev2; parts.push(`pair '${s.slice(i - 1, i + 1)}'`); }
      [prev2, prev1] = [prev1, curr];
      steps.push({ i, prev1, note: `i=${i}: valid decodings here → ${parts.join(' + ') || 'none'} = ${curr}.`, line: 8, pyLine: 8 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderNumDecodings(s) {
    const chars = s.split('');
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(chars, (v, idx) => step.final ? 'dim' : (idx === step.i ? 'cur' : (idx < step.i ? 'dim' : '')))}
        <div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-counter">${step.prev1}<span class="viz-counter-label">decodings so far</span></div></div></div>`;
    };
  }

  // ── P3: Maximum Product Subarray ──────────────────────────────────────────
  function traceMaxProduct(nums) {
    let maxP = nums[0], minP = nums[0], best = nums[0];
    const steps = [{ i: 0, maxP, minP, best, note: `Start — maxP=minP=best=${nums[0]}.`, line: 2, pyLine: 2 }];
    for (let i = 1; i < nums.length; i++) {
      const tmp = maxP;
      maxP = Math.max(nums[i], maxP * nums[i], minP * nums[i]);
      minP = Math.min(nums[i], tmp * nums[i], minP * nums[i]);
      best = Math.max(best, maxP);
      steps.push({ i, maxP, minP, best, note: `i=${i} (${nums[i]}): maxP=${maxP}, minP=${minP} → best=${best}.`, line: 7, pyLine: 5 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMaxProduct(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums, (v, idx) => step.final ? 'dim' : (idx === step.i ? 'cur' : (idx < step.i ? 'dim' : '')))}
        <div class="viz-panels" style="margin-top:8px">
          <div class="viz-panel"><div class="viz-panel-lbl">maxP / minP</div><div class="viz-counter" style="font-size:18px">${step.maxP} / ${step.minP}</div></div>
          <div class="viz-panel"><div class="viz-counter">${step.best}<span class="viz-counter-label">best so far</span></div></div>
        </div>`;
    };
  }

  // ── P4: Word Break ────────────────────────────────────────────────────────
  function traceWordBreak(s, wordDict) {
    const words = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    const steps = [{ dp: [...dp], i: 0, note: 'Base case — dp[0]=true (empty string).', line: 4, pyLine: 3 }];
    for (let i = 1; i <= s.length; i++) {
      let foundAt = null;
      for (let j = 0; j < i; j++) {
        if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; foundAt = j; break; }
      }
      steps.push({ dp: [...dp], i, note: `dp[${i}] ("${s.slice(0, i)}")${foundAt !== null ? ` = true (split at j=${foundAt}: "${s.slice(foundAt, i)}" is a word)` : ' = false'}.`, line: 7, pyLine: 6 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderWordBreak(s) {
    return (stage, step) => {
      const display = step.dp.map(v => v ? 'T' : 'F');
      stage.innerHTML = `
        <div class="viz-panel-lbl">"${s}"</div>
        ${cellsRow(display, (v, idx) => step.final ? (idx === step.i ? 'match' : '') : (idx === step.i ? 'cur' : (idx < step.i ? (step.dp[idx] ? 'seen' : '') : '')))}`;
    };
  }

  // ── P5: Partition Equal Subset Sum — 0/1 knapsack ───────────────────────
  function traceCanPartition(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2) {
      return [{ dp: [], target: 0, final: true, note: 'Total sum is odd → cannot partition evenly → false.', line: 3, pyLine: 3 }];
    }
    const target = total / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    const steps = [{ dp: [...dp], target, note: `total=${total}, target=${target}. dp[0]=true.`, line: 5, pyLine: 5 }];
    for (const n of nums) {
      for (let j = target; j >= n; j--) dp[j] = dp[j] || dp[j - n];
      steps.push({ dp: [...dp], target, note: `after considering ${n}: dp=[${dp.map(v => v ? 'T' : 'F').join(',')}].`, line: 8, pyLine: 8 });
    }
    steps.push({ dp: [...dp], target, final: true, note: `Done. Can reach target ${target}? ${dp[target]}.`, line: 9, pyLine: 9 });
    return steps;
  }

  function renderCanPartition() {
    return (stage, step) => {
      const display = step.dp.map((v, i) => `${i}:${v ? 'T' : 'F'}`);
      stage.innerHTML = `
        <div class="viz-panel-lbl">dp[j] — can we form sum j? (target=${step.target})</div>
        ${chips(display)}`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  mountVisualizer('viz-dp1d-p1', traceMinCostClimbingStairs([10, 15, 20]), withCode('dp1d-p1', renderMinCostClimbingStairs([10, 15, 20])));
  mountVisualizer('viz-dp1d-p2', traceNumDecodings('226'), withCode('dp1d-p2', renderNumDecodings('226')));
  mountVisualizer('viz-dp1d-p3', traceMaxProduct([2, 3, -2, 4]), withCode('dp1d-p3', renderMaxProduct([2, 3, -2, 4])));
  mountVisualizer('viz-dp1d-p4', traceWordBreak('leetcode', ['leet', 'code']), withCode('dp1d-p4', renderWordBreak('leetcode')));
  mountVisualizer('viz-dp1d-p5', traceCanPartition([1, 5, 11, 5]), withCode('dp1d-p5', renderCanPartition()));
}
