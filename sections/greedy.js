// Section: greedy
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_greedy = String.raw`
<div id="sec-greedy" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Advanced · 19</span></div><div class="sec-title">Greedy Algorithms</div></div>
<div class="sec-lead">Greedy makes the locally optimal choice at each step and hopes it leads to a global optimum. It works when a problem has the <em>greedy choice property</em> — a locally optimal choice is always part of a globally optimal solution. Proving correctness requires an exchange argument: show that any non-greedy solution can be improved by swapping in the greedy choice.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Think of a greedy algorithm like a hiker who always takes the steepest uphill path available at each step, trusting that this local decision will lead to the summit. The algorithm never looks back or reconsiders — it commits fully to each choice as it goes. A classic real-world example is making change with coins: to give someone $0.41 in change, you instinctively grab the largest coin that fits (a quarter), then the next largest, and so on, rather than considering every possible combination of coins first.</p>
<p>Greedy works because of a mathematical property called the <strong>greedy choice property</strong>: for certain problems, a locally optimal choice is guaranteed to be part of a globally optimal solution. This is usually paired with <strong>optimal substructure</strong> — the remaining subproblem after each greedy pick is itself solvable optimally. Proving these properties requires an <em>exchange argument</em>: assume any optimal solution differs from the greedy solution, then show you can swap the non-greedy choice for the greedy one without making things worse, which contradicts the assumption.</p>
<p>Reach for greedy when a problem involves scheduling, interval selection, minimum spanning trees, or a "maximize/minimize some running total" framing. A classic mistake is applying greedy to problems that actually require dynamic programming — the tell-tale sign is when the greedy choice at step <em>k</em> can be invalidated by what happens at step <em>k+5</em>. The Coin Change problem with arbitrary denominations (e.g., coins [1, 3, 4]) is a famous trap: greedy picks 4 then 1+1 for amount 6, missing the optimal 3+3.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Before coding greedy, ask yourself: "Can a future step ever regret this decision?" If yes, you likely need DP. If the greedy choice only ever helps and never blocks future options, greedy is safe.</div>
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
<algo-visualizer id="viz-gr-p1" title="Track Max Reach — trace"></algo-visualizer>
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
<algo-visualizer id="viz-gr-p2" title="Sort by End — trace"></algo-visualizer>
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
<algo-visualizer id="viz-gr-p5" title="Sort + Merge — trace"></algo-visualizer>
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
<algo-visualizer id="viz-gr-p3" title="Greedy BFS Levels — trace"></algo-visualizer>
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
<algo-visualizer id="viz-gr-p4" title="One-Pass Greedy — trace"></algo-visualizer>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_greedy.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Greedy problems ──────────
function wireVisualizers() {
  // ── P1: Jump Game — track max reach ─────────────────────────────────────
  function traceCanJump(nums) {
    let maxReach = 0;
    const steps = [{ i: -1, maxReach, note: 'Start — maxReach=0.', line: 2, pyLine: 2 }];
    for (let i = 0; i < nums.length; i++) {
      if (i > maxReach) {
        steps.push({ i, maxReach, final: true, stop: true, failed: true, note: `i=${i} > maxReach=${maxReach} → unreachable → false.`, line: 4, pyLine: 4 });
        return steps;
      }
      maxReach = Math.max(maxReach, i + nums[i]);
      steps.push({ i, maxReach, note: `i=${i} (jump ${nums[i]}): maxReach = max(prev, ${i}+${nums[i]}) = ${maxReach}.`, line: 5, pyLine: 5 });
    }
    steps.push({ i: nums.length, maxReach, final: true, note: 'Done. Reached the end → true.', line: 7, pyLine: 6 });
    return steps;
  }

  function renderCanJump(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums, (v, idx) => {
          if (idx === step.i) return step.failed ? 'dup' : 'cur';
          return idx <= step.maxReach ? 'seen' : 'dim';
        })}
        <div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-panel-lbl">max reach</div><div class="viz-counter" style="font-size:20px">${step.maxReach}</div></div></div>`;
    };
  }

  // ── P2: Non-overlapping Intervals — sort by end ─────────────────────────
  function traceEraseOverlap(intervals) {
    const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
    let removed = 0, prevEnd = -Infinity;
    const labels = sorted.map(iv => `[${iv.join(',')}]`);
    const steps = [{ i: -1, removed, labels, note: `Sorted by end: ${labels.join(', ')}.`, line: 2, pyLine: 2 }];
    sorted.forEach(([start, end], i) => {
      const overlap = start < prevEnd;
      if (overlap) { removed++; } else { prevEnd = end; }
      steps.push({ i, removed, labels,
        note: overlap ? `[${start},${end}]: start < prevEnd → overlap, remove. removed=${removed}.` : `[${start},${end}]: no overlap → keep, prevEnd=${end}.`,
        line: overlap ? 5 : 6, pyLine: overlap ? 5 : 6 });
    });
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderEraseOverlap() {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">sorted intervals</div>
        ${chips(step.labels.map((iv, idx) => idx === step.i ? `▶ ${iv}` : iv))}
        <div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-counter">${step.removed}<span class="viz-counter-label">removed</span></div></div></div>`;
    };
  }

  // ── P5: Merge Intervals — sort + merge ──────────────────────────────────
  function traceMerge(intervals) {
    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    const res = [[...sorted[0]]];
    const steps = [{ res: res.map(iv => `[${iv.join(',')}]`), i: 0,
      note: `Sorted by start: ${sorted.map(iv => `[${iv.join(',')}]`).join(', ')}. res=[[${sorted[0].join(',')}]].`, line: 3, pyLine: 2 }];
    for (let i = 1; i < sorted.length; i++) {
      const [s, e] = sorted[i];
      const last = res[res.length - 1];
      if (s <= last[1]) {
        last[1] = Math.max(last[1], e);
        steps.push({ res: res.map(iv => `[${iv.join(',')}]`), i, note: `[${s},${e}]: overlaps last [${last[0]},${last[1]}] → merge.`, line: 6, pyLine: 4 });
      } else {
        res.push([s, e]);
        steps.push({ res: res.map(iv => `[${iv.join(',')}]`), i, note: `[${s},${e}]: no overlap → new interval.`, line: 7, pyLine: 5 });
      }
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMerge() {
    return (stage, step) => {
      stage.innerHTML = `<div class="viz-panel-lbl">merged result</div>${chips(step.res, ' new')}`;
    };
  }

  // ── P3: Jump Game II — greedy BFS levels ────────────────────────────────
  function traceJump(nums) {
    let jumps = 0, currEnd = 0, farthest = 0;
    const steps = [{ i: -1, jumps, currEnd, note: 'Start — jumps=0.', line: 2, pyLine: 2 }];
    for (let i = 0; i < nums.length - 1; i++) {
      farthest = Math.max(farthest, i + nums[i]);
      let jumped = false;
      if (i === currEnd) { jumps++; currEnd = farthest; jumped = true; }
      steps.push({ i, jumps, currEnd,
        note: `i=${i}: farthest=${farthest}.${jumped ? ` i reached currEnd → jump! jumps=${jumps}, new currEnd=${currEnd}.` : ''}`, line: jumped ? 5 : 4, pyLine: jumped ? 5 : 4 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderJump(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums, (v, idx) => step.final ? 'dim' : (idx === step.i ? 'cur' : (idx === step.currEnd ? 'seen' : '')), (v, idx) => idx === step.currEnd ? 'end' : '')}
        <div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-counter">${step.jumps}<span class="viz-counter-label">jumps so far</span></div></div></div>`;
    };
  }

  // ── P4: Gas Station — one-pass greedy ───────────────────────────────────
  function traceCanCompleteCircuit(gas, cost) {
    let total = 0, tank = 0, start = 0;
    const steps = [{ i: -1, tank, start, note: 'Start — total=tank=start=0.', line: 2, pyLine: 2 }];
    for (let i = 0; i < gas.length; i++) {
      const diff = gas[i] - cost[i];
      total += diff; tank += diff;
      let reset = false;
      if (tank < 0) { start = i + 1; tank = 0; reset = true; }
      steps.push({ i, tank, start, note: `station ${i}: gas-cost=${diff} → tank=${tank}${reset ? `, went negative → restart from ${start}` : ''}.`, line: reset ? 6 : 5, pyLine: reset ? 5 : 4 });
    }
    steps.push({ i: gas.length, tank, start, final: true, result: total >= 0 ? start : -1,
      note: `Done. total=${total} → ${total >= 0 ? `start = ${start}` : 'impossible → -1'}.`, line: 8, pyLine: 6 });
    return steps;
  }

  function renderCanCompleteCircuit(gas) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(gas, (v, idx) => step.final ? (idx === step.start ? 'match' : 'dim') : (idx === step.i ? 'cur' : (idx < step.start ? 'dim' : '')))}
        <div class="viz-panels" style="margin-top:8px">
          <div class="viz-panel"><div class="viz-panel-lbl">tank</div><div class="viz-counter" style="font-size:20px">${step.tank}</div></div>
          <div class="viz-panel"><div class="viz-panel-lbl">start candidate</div><div class="viz-counter" style="font-size:20px">${step.start}</div></div>
        </div>`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  mountVisualizer('viz-gr-p1', traceCanJump([2, 3, 1, 1, 4]), withCode('gr-p1', renderCanJump([2, 3, 1, 1, 4])));
  mountVisualizer('viz-gr-p2', traceEraseOverlap([[1, 2], [2, 3], [3, 4], [1, 3]]), withCode('gr-p2', renderEraseOverlap()));
  mountVisualizer('viz-gr-p5', traceMerge([[1, 3], [2, 6], [8, 10], [15, 18]]), withCode('gr-p5', renderMerge()));
  mountVisualizer('viz-gr-p3', traceJump([2, 3, 1, 1, 4]), withCode('gr-p3', renderJump([2, 3, 1, 1, 4])));

  const p4Gas = [1, 2, 3, 4, 5], p4Cost = [3, 4, 5, 1, 2];
  mountVisualizer('viz-gr-p4', traceCanCompleteCircuit(p4Gas, p4Cost), withCode('gr-p4', renderCanCompleteCircuit(p4Gas)));
}
