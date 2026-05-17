// Section: dpintro
// Auto-extracted from index.html
const _html_dpintro = String.raw`
<div id="sec-dpintro" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">DP · 16</span></div><div class="sec-title">Dynamic Programming — Foundations</div></div>
<div class="sec-lead">DP solves problems with <strong>overlapping subproblems</strong> and <strong>optimal substructure</strong>. If the brute force recursion solves the same sub-problem multiple times, DP caches those results. The hard part is identifying the state and the recurrence — not the caching itself.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine calculating the 40th Fibonacci number by hand using pure recursion: you would compute <code>fib(38)</code> and <code>fib(39)</code>, but computing <code>fib(39)</code> would in turn recompute <code>fib(38)</code> again — and this redundancy explodes exponentially. Dynamic Programming is simply the discipline of <strong>writing down answers you have already computed</strong> so you never solve the same sub-problem twice. Whether you use a cache (memoization) or fill a table from small to large (tabulation), both approaches turn exponential brute-force into polynomial time by recognizing that a huge problem is just many small identical sub-problems assembled together.</p>
<p>DP works because of two structural properties that must both be present. <strong>Optimal substructure</strong> means the best answer to the big problem is built from the best answers to smaller ones — you never need to "un-choose" a sub-answer once it is committed. <strong>Overlapping subproblems</strong> means the recursion tree contains duplicate nodes; without overlap, plain divide-and-conquer (like merge sort) already works optimally and caching would add overhead without benefit. When you spot both properties, you know DP is appropriate.</p>
<p>Reach for DP when a problem asks to count all ways, find the minimum/maximum cost, or determine whether something is achievable, and the search space can be parameterized by a small number of integers (the "state"). The most common beginner mistake is defining the state too loosely: if <code>dp[i]</code> means something vague like "best result so far," the recurrence will be incorrect. Always be precise — "dp[i] = minimum cost to reach stair i" — and verify that the recurrence follows logically from that definition before writing any code.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> DP is not a magic algorithm — it is careful recursion with a cache. Start by writing the plain recursive solution, confirm it gives correct answers on small inputs, then add memoization. If that still feels slow, convert to bottom-up tabulation and consider reducing the table to a rolling window of variables.</div>
<div class="h2">Memoization vs Tabulation</div>
<div class="grid-2">
  <div class="card"><div class="card-title blue">Top-Down (Memoization)</div><p>Write recursive solution. Add a cache (memo). On each call, check cache first. Natural to write — literally your recursion + a Map.</p></div>
  <div class="card"><div class="card-title green">Bottom-Up (Tabulation)</div><p>Build solution from base cases up. Iterative. No recursion overhead. Sometimes you can reduce space to O(1) if you only need previous rows.</p></div>
</div>

<div class="h2">How to Approach DP Problems</div>
<div class="steps">
  <div class="step"><strong>Define the state:</strong> What does dp[i] (or dp[i][j]) represent? Be precise. "dp[i] = minimum cost to reach step i."</div>
  <div class="step"><strong>Write the recurrence:</strong> How does dp[i] relate to smaller subproblems? dp[i] = min(dp[i-1], dp[i-2]) + cost[i].</div>
  <div class="step"><strong>Identify base cases:</strong> What's dp[0]? dp[1]? These prevent infinite recursion.</div>
  <div class="step"><strong>Determine traversal order:</strong> Bottom-up must compute dependencies before the current state.</div>
  <div class="step"><strong>Optimize space:</strong> Can you reduce dp[0..n] to just 2 variables? (Often yes for 1D DP.)</div>
</div>

<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp-fib')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp-fib')">Python</button></div>
<div class="lang-panel active" id="dp-fib-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Fibonacci: Recursion → Memo → Tabulation → O(1) Space</span></div><pre><span class="cmt">// Naive recursion: O(2ⁿ) — recomputes everything</span>
<span class="kw">const</span> <span class="fn">fib0</span> = n => n &lt;= <span class="num">1</span> ? n : <span class="fn">fib0</span>(n-<span class="num">1</span>) + <span class="fn">fib0</span>(n-<span class="num">2</span>)

<span class="cmt">// Memoization: O(n) time, O(n) space</span>
<span class="kw">const</span> <span class="fn">fib1</span> = (n, memo={}) => {
  <span class="kw">if</span> (n <span class="kw">in</span> memo) <span class="kw">return</span> memo[n]
  <span class="kw">if</span> (n &lt;= <span class="num">1</span>) <span class="kw">return</span> n
  <span class="kw">return</span> memo[n] = <span class="fn">fib1</span>(n-<span class="num">1</span>, memo) + <span class="fn">fib1</span>(n-<span class="num">2</span>, memo)
}

<span class="cmt">// Tabulation: O(n) time, O(n) space</span>
<span class="kw">const</span> <span class="fn">fib2</span> = n => {
  <span class="kw">const</span> dp = [<span class="num">0</span>, <span class="num">1</span>]
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">2</span>; i&lt;=n; i++) dp[i] = dp[i-<span class="num">1</span>] + dp[i-<span class="num">2</span>]
  <span class="kw">return</span> dp[n]
}

<span class="cmt">// Space-optimized: O(n) time, O(1) space</span>
<span class="kw">const</span> <span class="fn">fib3</span> = n => {
  <span class="kw">let</span> a=<span class="num">0</span>, b=<span class="num">1</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">2</span>; i&lt;=n; i++) [a,b] = [b, a+b]
  <span class="kw">return</span> n===<span class="num">0</span> ? a : b
}</pre></div></div>
<div class="lang-panel" id="dp-fib-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Fibonacci Evolution</span></div><pre><span class="py-kw">from</span> functools <span class="py-kw">import</span> lru_cache

<span class="py-cmt"># Memoization with decorator — easiest</span>
<span class="py-dec">@lru_cache</span>(maxsize=<span class="py-kw">None</span>)
<span class="py-kw">def</span> <span class="py-fn">fib</span>(n): <span class="py-kw">return</span> n <span class="py-kw">if</span> n &lt;= <span class="py-num">1</span> <span class="py-kw">else</span> <span class="py-fn">fib</span>(n-<span class="py-num">1</span>) + <span class="py-fn">fib</span>(n-<span class="py-num">2</span>)

<span class="py-cmt"># Space-optimized tabulation</span>
<span class="py-kw">def</span> <span class="py-fn">fib_opt</span>(n):
    a, b = <span class="py-num">0</span>, <span class="py-num">1</span>
    <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(n): a, b = b, a+b
    <span class="py-kw">return</span> a</pre></div></div>

<div class="h2">5 Problems — DP Foundations</div>
<div class="problems-grid">

<problem-card num="P1" title="Climbing Stairs" difficulty="easy" tags="1D DP">
<div class="prob-desc">You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?</div>
<div class="prob-example">n=3 → 3 (1+1+1, 1+2, 2+1)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ It's Fibonacci! dp[i] = dp[i-1] + dp[i-2] <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp-p1')">Python</button></div>
<div class="lang-panel active" id="dp-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">O(1) Space DP</span></div><pre><span class="kw">function</span> <span class="fn">climbStairs</span>(n) {
  <span class="kw">let</span> a=<span class="num">1</span>, b=<span class="num">1</span>
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">2</span>;i&lt;=n;i++) [a,b]=[b,a+b]
  <span class="kw">return</span> b
}</pre></div></div>
<div class="lang-panel" id="dp-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">O(1) Space</span></div><pre><span class="py-kw">def</span> <span class="py-fn">climb_stairs</span>(n):
    a = b = <span class="py-num">1</span>
    <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(n-<span class="py-num">1</span>): a, b = b, a+b
    <span class="py-kw">return</span> b</pre></div>
</div>
</problem-card>

<problem-card num="P2" title="House Robber" difficulty="easy" tags="1D DP">
<div class="prob-desc">Rob houses in a row. Can't rob adjacent houses. Maximize total robbed.</div>
<div class="prob-example">Input: [1,2,3,1] → 4 (rob house 1 and 3)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ dp[i] = max(dp[i-1], dp[i-2] + nums[i]) <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp-p2')">Python</button></div>
<div class="lang-panel active" id="dp-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">DP O(1) Space</span></div><pre><span class="kw">function</span> <span class="fn">rob</span>(nums) {
  <span class="kw">let</span> prev2=<span class="num">0</span>, prev1=<span class="num">0</span>
  <span class="kw">for</span>(<span class="kw">const</span> n <span class="kw">of</span> nums) [prev2,prev1]=[prev1,<span class="cls">Math</span>.<span class="fn">max</span>(prev1,prev2+n)]
  <span class="kw">return</span> prev1
}</pre></div></div>
<div class="lang-panel" id="dp-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">DP O(1) Space</span></div><pre><span class="py-kw">def</span> <span class="py-fn">rob</span>(nums):
    prev2 = prev1 = <span class="py-num">0</span>
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums:
        prev2, prev1 = prev1, <span class="py-fn">max</span>(prev1, prev2+n)
    <span class="py-kw">return</span> prev1</pre></div>
</div>
</problem-card>

<problem-card num="P3" title="Coin Change" difficulty="medium" tags="Unbounded Knapsack">
<div class="prob-desc">Given coin denominations, find minimum coins to make amount. Return -1 if impossible.</div>
<div class="prob-example">coins=[1,5,11], amount=15 → 3 (5+5+5). Greedy fails! 11+1+1+1+1=5 coins but 5+5+5=3.</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Bottom-up DP: dp[i] = min coins for amount i <span class="approach-tc">O(amount × coins) time</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp-p3')">Python</button></div>
<div class="lang-panel active" id="dp-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Coin Change DP</span></div><pre><span class="kw">function</span> <span class="fn">coinChange</span>(coins, amount) {
  <span class="kw">const</span> dp = <span class="kw">new</span> <span class="cls">Array</span>(amount+<span class="num">1</span>).<span class="fn">fill</span>(<span class="cls">Infinity</span>)
  dp[<span class="num">0</span>] = <span class="num">0</span>  <span class="cmt">// base case: 0 coins to make amount 0</span>
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">1</span>;i&lt;=amount;i++)
    <span class="kw">for</span>(<span class="kw">const</span> c <span class="kw">of</span> coins)
      <span class="kw">if</span>(c&lt;=i) dp[i]=<span class="cls">Math</span>.<span class="fn">min</span>(dp[i], dp[i-c]+<span class="num">1</span>)
  <span class="kw">return</span> dp[amount]===<span class="cls">Infinity</span>?-<span class="num">1</span>:dp[amount]
}</pre></div></div>
<div class="lang-panel" id="dp-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Coin Change DP</span></div><pre><span class="py-kw">def</span> <span class="py-fn">coin_change</span>(coins, amount):
    dp = [<span class="py-fn">float</span>(<span class="py-str">'inf'</span>)] * (amount+<span class="py-num">1</span>); dp[<span class="py-num">0</span>] = <span class="py-num">0</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>, amount+<span class="py-num">1</span>):
        <span class="py-kw">for</span> c <span class="py-kw">in</span> coins:
            <span class="py-kw">if</span> c &lt;= i: dp[i] = <span class="py-fn">min</span>(dp[i], dp[i-c]+<span class="py-num">1</span>)
    <span class="py-kw">return</span> -<span class="py-num">1</span> <span class="py-kw">if</span> dp[amount] == <span class="py-fn">float</span>(<span class="py-str">'inf'</span>) <span class="py-kw">else</span> dp[amount]</pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Unique Paths (2D DP)" difficulty="medium" tags="2D DP,Grid">
<div class="prob-desc">Robot at top-left of m×n grid, can only move right or down. Count distinct paths to bottom-right.</div>
<div class="prob-example">m=3, n=7 → 28</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp-p4')">Python</button></div>
<div class="lang-panel active" id="dp-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">2D DP (1D optimization)</span></div><pre><span class="kw">function</span> <span class="fn">uniquePaths</span>(m, n) {
  <span class="kw">const</span> dp = <span class="kw">new</span> <span class="cls">Array</span>(n).<span class="fn">fill</span>(<span class="num">1</span>)
  <span class="kw">for</span>(<span class="kw">let</span> r=<span class="num">1</span>;r&lt;m;r++)
    <span class="kw">for</span>(<span class="kw">let</span> c=<span class="num">1</span>;c&lt;n;c++)
      dp[c]+=dp[c-<span class="num">1</span>]
  <span class="kw">return</span> dp[n-<span class="num">1</span>]
}</pre></div></div>
<div class="lang-panel" id="dp-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">1D DP</span></div><pre><span class="py-kw">def</span> <span class="py-fn">unique_paths</span>(m, n):
    dp = [<span class="py-num">1</span>] * n
    <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(m-<span class="py-num">1</span>):
        <span class="py-kw">for</span> c <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>, n):
            dp[c] += dp[c-<span class="py-num">1</span>]
    <span class="py-kw">return</span> dp[-<span class="py-num">1</span>]</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Longest Increasing Subsequence" difficulty="hard" tags="1D DP,Binary Search">
<div class="prob-desc">Find the length of the longest strictly increasing subsequence (not necessarily contiguous).</div>
<div class="prob-example">Input: [10,9,2,5,3,7,101,18] → 4 ([2,3,7,101])</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">DP <span class="approach-tc">O(n²)</span></div></div>
  <div class="approach best"><div class="approach-name">✅ Patience sort + Binary Search <span class="approach-tc">O(n log n)</span></div><p style="font-size:12px;color:var(--muted)">Maintain a tails array: tails[i] = smallest tail of all IS of length i+1. Binary search to find where current number belongs.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp-p5')">Python</button></div>
<div class="lang-panel active" id="dp-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">O(n log n) — Patience Sort</span></div><pre><span class="kw">function</span> <span class="fn">lengthOfLIS</span>(nums) {
  <span class="kw">const</span> tails = []
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) {
    <span class="kw">let</span> lo=<span class="num">0</span>, hi=tails.length
    <span class="kw">while</span>(lo&lt;hi){<span class="kw">const</span> m=(lo+hi)>>>1; tails[m]&lt;n?lo=m+<span class="num">1</span>:hi=m}
    tails[lo] = n  <span class="cmt">// replace or extend</span>
  }
  <span class="kw">return</span> tails.length
}</pre></div></div>
<div class="lang-panel" id="dp-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">O(n log n)</span></div><pre><span class="py-kw">import</span> bisect
<span class="py-kw">def</span> <span class="py-fn">length_of_lis</span>(nums):
    tails = []
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums:
        pos = bisect.bisect_left(tails, n)
        <span class="py-kw">if</span> pos == <span class="py-fn">len</span>(tails): tails.append(n)
        <span class="py-kw">else</span>: tails[pos] = n
    <span class="py-kw">return</span> <span class="py-fn">len</span>(tails)</pre></div>
</div>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_dpintro.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
