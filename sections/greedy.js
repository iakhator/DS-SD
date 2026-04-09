// Section: greedy
// Auto-extracted from index.html
const _html_greedy = String.raw`
<div id="sec-greedy" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Advanced · 19</span></div><div class="sec-title">Greedy Algorithms</div></div>
<div class="sec-lead">Greedy makes the locally optimal choice at each step and hopes it leads to a global optimum. It works when a problem has the <em>greedy choice property</em> — a locally optimal choice is always part of a globally optimal solution. Proving correctness requires an exchange argument: show that any non-greedy solution can be improved by swapping in the greedy choice.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">5 Problems — Greedy</div>
<div class="problems-grid">

<problem-card num="P1" title="Jump Game" difficulty="medium" tags="Greedy">
<div class="prob-desc">Given array where nums[i] is max jump length from position i, determine if you can reach the last index.</div>
<div class="prob-example">Input: [2,3,1,1,4] → true | [3,2,1,0,4] → false</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Track max reachable index <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gr-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gr-p1')">Python</button></div>
<div class="lang-panel active" id="gr-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Greedy Reach</span></div><pre><span class="kw">function</span> <span class="fn">canJump</span>(nums) {
  <span class="kw">let</span> maxReach = <span class="num">0</span>
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>; i&lt;nums.length; i++) {
    <span class="kw">if</span>(i > maxReach) <span class="kw">return</span> <span class="kw">false</span>  <span class="cmt">// can't reach index i</span>
    maxReach = <span class="cls">Math</span>.<span class="fn">max</span>(maxReach, i + nums[i])
  }
  <span class="kw">return</span> <span class="kw">true</span>
}</pre></div></div>
<div class="lang-panel" id="gr-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Greedy Reach</span></div><pre><span class="py-kw">def</span> <span class="py-fn">can_jump</span>(nums):
    max_reach = <span class="py-num">0</span>
    <span class="py-kw">for</span> i, n <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(nums):
        <span class="py-kw">if</span> i > max_reach: <span class="py-kw">return</span> <span class="py-kw">False</span>
        max_reach = <span class="py-fn">max</span>(max_reach, i + n)
    <span class="py-kw">return</span> <span class="py-kw">True</span></pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Non-overlapping Intervals" difficulty="medium" tags="Sort + Greedy">
<div class="prob-desc">Find minimum intervals to remove to make the rest non-overlapping.</div>
<div class="prob-example">[[1,2],[2,3],[3,4],[1,3]] → 1 (remove [1,3])</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Sort by end time, greedily keep intervals with earliest end <span class="approach-tc">O(n log n)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gr-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gr-p2')">Python</button></div>
<div class="lang-panel active" id="gr-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sort by End</span></div><pre><span class="kw">function</span> <span class="fn">eraseOverlapIntervals</span>(intervals) {
  intervals.<span class="fn">sort</span>((a,b)=>a[<span class="num">1</span>]-b[<span class="num">1</span>])
  <span class="kw">let</span> removed=<span class="num">0</span>, prevEnd=-<span class="cls">Infinity</span>
  <span class="kw">for</span>(<span class="kw">const</span>[start,end] <span class="kw">of</span> intervals) {
    <span class="kw">if</span>(start &lt; prevEnd) removed++  <span class="cmt">// overlap → remove</span>
    <span class="kw">else</span> prevEnd=end               <span class="cmt">// keep → update prevEnd</span>
  }
  <span class="kw">return</span> removed
}</pre></div></div>
<div class="lang-panel" id="gr-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sort by End</span></div><pre><span class="py-kw">def</span> <span class="py-fn">erase_overlap_intervals</span>(intervals):
    intervals.sort(key=<span class="py-kw">lambda</span> x: x[<span class="py-num">1</span>])
    removed, prev_end = <span class="py-num">0</span>, <span class="py-fn">float</span>(<span class="py-str">'-inf'</span>)
    <span class="py-kw">for</span> start, end <span class="py-kw">in</span> intervals:
        <span class="py-kw">if</span> start &lt; prev_end: removed += <span class="py-num">1</span>
        <span class="py-kw">else</span>: prev_end = end
    <span class="py-kw">return</span> removed</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="Merge Intervals" difficulty="medium" tags="Sort + Merge">
<div class="prob-desc">Merge all overlapping intervals and return the non-overlapping result.</div>
<div class="prob-example">[[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gr-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gr-p5')">Python</button></div>
<div class="lang-panel active" id="gr-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sort + Merge — O(n log n)</span></div><pre><span class="kw">function</span> <span class="fn">merge</span>(intervals) {
  intervals.<span class="fn">sort</span>((a,b)=>a[<span class="num">0</span>]-b[<span class="num">0</span>])
  <span class="kw">const</span> res=[intervals[<span class="num">0</span>]]
  <span class="kw">for</span>(<span class="kw">const</span>[s,e] <span class="kw">of</span> intervals.<span class="fn">slice</span>(<span class="num">1</span>)) {
    <span class="kw">const</span> last=res.<span class="fn">at</span>(-<span class="num">1</span>)
    <span class="kw">if</span>(s &lt;= last[<span class="num">1</span>]) last[<span class="num">1</span>]=<span class="cls">Math</span>.<span class="fn">max</span>(last[<span class="num">1</span>],e)
    <span class="kw">else</span> res.<span class="fn">push</span>([s,e])
  }
  <span class="kw">return</span> res
}</pre></div></div>
<div class="lang-panel" id="gr-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Sort + Merge</span></div><pre><span class="py-kw">def</span> <span class="py-fn">merge</span>(intervals):
    intervals.sort(); res = [intervals[<span class="py-num">0</span>]]
    <span class="py-kw">for</span> s, e <span class="py-kw">in</span> intervals[<span class="py-num">1</span>:]:
        <span class="py-kw">if</span> s &lt;= res[-<span class="py-num">1</span>][<span class="py-num">1</span>]: res[-<span class="py-num">1</span>][<span class="py-num">1</span>] = <span class="py-fn">max</span>(res[-<span class="py-num">1</span>][<span class="py-num">1</span>], e)
        <span class="py-kw">else</span>: res.append([s, e])
    <span class="py-kw">return</span> res</pre></div>
</div>
</problem-card>

<problem-card num="P3" title="Jump Game II — Minimum Jumps" difficulty="medium" tags="Greedy,BFS-like">
<div class="prob-desc">Find the minimum number of jumps to reach the last index (guaranteed reachable).</div>
<div class="prob-example">[2,3,1,1,4] → 2 (jump 1→3, then 3→end)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Greedy BFS levels — track current/next reach <span class="approach-tc">O(n) time</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gr-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gr-p3')">Python</button></div>
<div class="lang-panel active" id="gr-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Greedy BFS Level</span></div><pre><span class="kw">function</span> <span class="fn">jump</span>(nums) {
  <span class="kw">let</span> jumps=<span class="num">0</span>, currEnd=<span class="num">0</span>, farthest=<span class="num">0</span>
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>; i&lt;nums.length-<span class="num">1</span>; i++) {
    farthest = <span class="cls">Math</span>.<span class="fn">max</span>(farthest, i + nums[i])
    <span class="kw">if</span>(i === currEnd) { jumps++; currEnd=farthest }
  }
  <span class="kw">return</span> jumps
}</pre></div></div>
<div class="lang-panel" id="gr-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Greedy</span></div><pre><span class="py-kw">def</span> <span class="py-fn">jump</span>(nums):
    jumps = curr_end = farthest = <span class="py-num">0</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(nums) - <span class="py-num">1</span>):
        farthest = <span class="py-fn">max</span>(farthest, i + nums[i])
        <span class="py-kw">if</span> i == curr_end: jumps += <span class="py-num">1</span>; curr_end = farthest
    <span class="py-kw">return</span> jumps</pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Gas Station (Circular Tour)" difficulty="medium" tags="Greedy,Circular">
<div class="prob-desc">Find the starting gas station index from which you can complete a circular tour. Return -1 if impossible. Each station gives gas[i] and costs cost[i] to reach the next.</div>
<div class="prob-example">gas=[1,2,3,4,5], cost=[3,4,5,1,2] → 3</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ If total gas ≥ total cost, a solution exists. Start at first station where running tank never goes negative. <span class="approach-tc">O(n)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','gr-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','gr-p4')">Python</button></div>
<div class="lang-panel active" id="gr-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">One Pass Greedy</span></div><pre><span class="kw">function</span> <span class="fn">canCompleteCircuit</span>(gas, cost) {
  <span class="kw">let</span> total=<span class="num">0</span>, tank=<span class="num">0</span>, start=<span class="num">0</span>
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>;i&lt;gas.length;i++) {
    <span class="kw">const</span> diff = gas[i]-cost[i]
    total+=diff; tank+=diff
    <span class="kw">if</span>(tank&lt;<span class="num">0</span>) { start=i+<span class="num">1</span>; tank=<span class="num">0</span> }  <span class="cmt">// can't start from here or earlier</span>
  }
  <span class="kw">return</span> total&gt;=<span class="num">0</span> ? start : -<span class="num">1</span>
}</pre></div></div>
<div class="lang-panel" id="gr-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">One Pass</span></div><pre><span class="py-kw">def</span> <span class="py-fn">can_complete_circuit</span>(gas, cost):
    total = tank = start = <span class="py-num">0</span>
    <span class="py-kw">for</span> i, (g, c) <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(<span class="py-fn">zip</span>(gas, cost)):
        total += g-c; tank += g-c
        <span class="py-kw">if</span> tank &lt; <span class="py-num">0</span>: start = i+<span class="py-num">1</span>; tank = <span class="py-num">0</span>
    <span class="py-kw">return</span> start <span class="py-kw">if</span> total >= <span class="py-num">0</span> <span class="py-kw">else</span> -<span class="py-num">1</span></pre></div>
</div>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_greedy.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
