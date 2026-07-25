// Section: stack
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_stack = String.raw`
<div id="sec-stack" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Linear · 06</span></div><div class="sec-title">Stack</div></div>
<div class="sec-lead">A stack is LIFO — Last In, First Out. Push to top, pop from top. The key insight: whenever you need to track "the most recent unresolved thing," reach for a stack. Bracket matching, next greater element, undo history — all stacks.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">Intuition &amp; Mental Model</div>
<p>Think of a stack of cafeteria trays: you can only add a tray on top and take one from the top — the last tray placed is the first one removed. This Last-In-First-Out (LIFO) property is exactly what you need whenever the most recently seen, not-yet-resolved item is the one that matters. Bracket matching is the canonical example: every time you encounter a closing bracket, you do not care about brackets from five levels ago — you care about the <em>innermost</em> open bracket, which is the one on top of the stack. The stack automatically tracks that nesting depth for you.</p>
<p>Stacks solve problems involving nested or hierarchical structure, undo/redo history, and "next greater/smaller element" queries. The monotonic stack variant — where you maintain a stack that is always sorted in increasing or decreasing order — is particularly powerful. When a new element arrives and violates the sorted order, you pop everything it is greater (or lesser) than. Each popped element has found its answer: the current element is its "next greater" (or "next smaller") neighbor. Because every element is pushed once and popped once, the whole sweep is <code>O(n)</code>.</p>
<p>Reach for a stack when you see words like "balanced," "valid," "undo," "most recent," or "next greater element" in a problem statement. A common mistake is confusing a stack with a queue — a queue is First-In-First-Out (FIFO) and is the right tool for level-order traversal or scheduling, not for matching delimiters. Another pitfall is popping from an empty stack without a guard check, which causes a runtime error; always verify the stack is non-empty before calling <code>pop()</code>.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Whenever you catch yourself asking "what was the last unresolved thing I saw?", that is a stack. The LIFO order directly models the nesting and recency that make problems like bracket matching, expression evaluation, and next-greater-element feel natural to solve.</div>

<div class="h2">Monotonic Stack Pattern</div>
<div class="diag"><pre>
Monotonic Increasing Stack (bottom → top): [1, 3, 5, 8]
  New element 4: pop 5, 8 (they'll never be "next smaller" for anyone to their left)
  Stack becomes: [1, 3, 4]

Use for: "next greater element", "largest rectangle in histogram"
  → When popping, the current element is the answer for the popped element
</pre></div>

<div class="h2">5 Problems — Stack</div>
<div class="problems-grid">

<problem-card num="P1" title="Valid Parentheses" difficulty="easy" tags="Stack,String">
<div class="prob-desc">Given string with '(', ')', '{', '}', '[', ']', determine if the input string is valid (properly closed in order).</div>
<div class="prob-example">Input: "()[]{}" → true | "([)]" → false</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Stack — push open, match close <span class="approach-tc">O(n) time · O(n) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','stk-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','stk-p1')">Python</button></div>
<div class="lang-panel active" id="stk-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Stack</span></div><pre><span class="kw">function</span> <span class="fn">isValid</span>(s) {
  <span class="kw">const</span> stack = [], pairs = { ')':'(', ']':'[', '}':'{' }
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> s) {
    <span class="kw">if</span> (<span class="str">'([{'</span>.<span class="fn">includes</span>(c)) { stack.<span class="fn">push</span>(c) }
    <span class="kw">else if</span> (stack.<span class="fn">pop</span>() !== pairs[c]) <span class="kw">return</span> <span class="kw">false</span>
  }
  <span class="kw">return</span> stack.length === <span class="num">0</span>
}</pre></div></div>
<div class="lang-panel" id="stk-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Stack</span></div><pre><span class="py-kw">def</span> <span class="py-fn">is_valid</span>(s):
    stack, pairs = [], {')':'(', ']':'[', '}':'{'}
    <span class="py-kw">for</span> c <span class="py-kw">in</span> s:
        <span class="py-kw">if</span> c <span class="py-kw">in</span> <span class="py-str">'([{'</span>: stack.append(c)
        <span class="py-kw">elif not</span> stack <span class="py-kw">or</span> stack.pop() != pairs[c]: <span class="py-kw">return</span> <span class="py-kw">False</span>
    <span class="py-kw">return not</span> stack</pre></div>
</div>
<algo-visualizer id="viz-stk-p1" title="Stack — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Evaluate Reverse Polish Notation" difficulty="medium" tags="Stack,Math">
<div class="prob-desc">Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix). Valid operators: +, -, *, /.</div>
<div class="prob-example">Input: ["2","1","+","3","*"] → 9 ((2+1)*3)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Stack — push numbers, pop 2 on operator <span class="approach-tc">O(n) time · O(n) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','stk-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','stk-p2')">Python</button></div>
<div class="lang-panel active" id="stk-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Stack Calculator</span></div><pre><span class="kw">function</span> <span class="fn">evalRPN</span>(tokens) {
  <span class="kw">const</span> stack = []
  <span class="kw">for</span> (<span class="kw">const</span> t <span class="kw">of</span> tokens) {
    <span class="kw">if</span> (<span class="str">'+-*/'</span>.<span class="fn">includes</span>(t)) {
      <span class="kw">const</span> [b, a] = [stack.<span class="fn">pop</span>(), stack.<span class="fn">pop</span>()]
      <span class="kw">const</span> ops = { <span class="str">'+'</span>: a+b, <span class="str">'-'</span>: a-b, <span class="str">'*'</span>: a*b, <span class="str">'/'</span>: <span class="cls">Math</span>.<span class="fn">trunc</span>(a/b) }
      stack.<span class="fn">push</span>(ops[t])
    } <span class="kw">else</span> stack.<span class="fn">push</span>(+t)
  }
  <span class="kw">return</span> stack[<span class="num">0</span>]
}</pre></div></div>
<div class="lang-panel" id="stk-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Stack Calculator</span></div><pre><span class="py-kw">import</span> operator
<span class="py-kw">def</span> <span class="py-fn">eval_rpn</span>(tokens):
    stack = []; ops = {'+': operator.add, '-': operator.sub, '*': operator.mul,
                       '/': <span class="py-kw">lambda</span> a,b: int(a/b)}
    <span class="py-kw">for</span> t <span class="py-kw">in</span> tokens:
        <span class="py-kw">if</span> t <span class="py-kw">in</span> ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[t](a, b))
        <span class="py-kw">else</span>: stack.append(<span class="py-fn">int</span>(t))
    <span class="py-kw">return</span> stack[<span class="py-num">0</span>]</pre></div>
</div>
<algo-visualizer id="viz-stk-p2" title="Stack Calculator — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Daily Temperatures" difficulty="medium" tags="Monotonic Stack">
<div class="prob-desc">Given temperatures, return an array answer where answer[i] is the number of days to wait for a warmer temperature. If no future warmer day, answer[i] = 0.</div>
<div class="prob-example">Input: [73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Monotonic decreasing stack of indices <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Push indices. When we find a warmer temp, pop all colder indices — current index is their answer.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','stk-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','stk-p3')">Python</button></div>
<div class="lang-panel active" id="stk-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Monotonic Stack</span></div><pre><span class="kw">function</span> <span class="fn">dailyTemperatures</span>(temps) {
  <span class="kw">const</span> ans = <span class="kw">new</span> <span class="cls">Array</span>(temps.length).<span class="fn">fill</span>(<span class="num">0</span>)
  <span class="kw">const</span> stack = []  <span class="cmt">// indices of unresolved days</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;temps.length; i++) {
    <span class="kw">while</span> (stack.length && temps[i] > temps[stack.<span class="fn">at</span>(-<span class="num">1</span>)]) {
      <span class="kw">const</span> j = stack.<span class="fn">pop</span>()
      ans[j] = i - j
    }
    stack.<span class="fn">push</span>(i)
  }
  <span class="kw">return</span> ans
}</pre></div></div>
<div class="lang-panel" id="stk-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Monotonic Stack</span></div><pre><span class="py-kw">def</span> <span class="py-fn">daily_temperatures</span>(temps):
    ans = [<span class="py-num">0</span>] * <span class="py-fn">len</span>(temps); stack = []
    <span class="py-kw">for</span> i, t <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(temps):
        <span class="py-kw">while</span> stack <span class="py-kw">and</span> t > temps[stack[-<span class="py-num">1</span>]]:
            j = stack.pop(); ans[j] = i - j
        stack.append(i)
    <span class="py-kw">return</span> ans</pre></div>
</div>
<algo-visualizer id="viz-stk-p3" title="Monotonic Stack — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Min Stack (O(1) getMin)" difficulty="medium" tags="Design,Stack">
<div class="prob-desc">Design a stack that supports push, pop, top, and getMin — all in O(1).</div>
<div class="prob-example">push(-2),push(0),push(-3),getMin()=-3, pop(), getMin()=-2</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Two stacks: main + min tracker <span class="approach-tc">O(1) all ops · O(n) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','stk-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','stk-p4')">Python</button></div>
<div class="lang-panel active" id="stk-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Two Stacks</span></div><pre><span class="kw">class</span> <span class="cls">MinStack</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.s = []; <span class="kw">this</span>.mins = [] }
  <span class="fn">push</span>(v) {
    <span class="kw">this</span>.s.<span class="fn">push</span>(v)
    <span class="kw">this</span>.mins.<span class="fn">push</span>(<span class="cls">Math</span>.<span class="fn">min</span>(v, <span class="kw">this</span>.mins.<span class="fn">at</span>(-<span class="num">1</span>) ?? <span class="cls">Infinity</span>))
  }
  <span class="fn">pop</span>()    { <span class="kw">this</span>.s.<span class="fn">pop</span>(); <span class="kw">this</span>.mins.<span class="fn">pop</span>() }
  <span class="fn">top</span>()    { <span class="kw">return</span> <span class="kw">this</span>.s.<span class="fn">at</span>(-<span class="num">1</span>) }
  <span class="fn">getMin</span>() { <span class="kw">return</span> <span class="kw">this</span>.mins.<span class="fn">at</span>(-<span class="num">1</span>) }
}</pre></div></div>
<div class="lang-panel" id="stk-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Two Stacks</span></div><pre><span class="py-kw">class</span> <span class="py-cls">MinStack</span>:
    <span class="py-kw">def</span> <span class="py-fn">__init__</span>(self):  self.s = []; self.mins = []
    <span class="py-kw">def</span> <span class="py-fn">push</span>(self, v):
        self.s.append(v)
        self.mins.append(<span class="py-fn">min</span>(v, self.mins[-<span class="py-num">1</span>] <span class="py-kw">if</span> self.mins <span class="py-kw">else</span> v))
    <span class="py-kw">def</span> <span class="py-fn">pop</span>(self):     self.s.pop(); self.mins.pop()
    <span class="py-kw">def</span> <span class="py-fn">top</span>(self):     <span class="py-kw">return</span> self.s[-<span class="py-num">1</span>]
    <span class="py-kw">def</span> <span class="py-fn">get_min</span>(self): <span class="py-kw">return</span> self.mins[-<span class="py-num">1</span>]</pre></div>
</div>
<algo-visualizer id="viz-stk-p4" title="Two Stacks — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Largest Rectangle in Histogram" difficulty="hard" tags="Monotonic Stack,Classic">
<div class="prob-desc">Given array of integers representing histogram bar heights, find the area of the largest rectangle.</div>
<div class="prob-example">Input: [2,1,5,6,2,3] → 10 (bars 5 and 6, width 2)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Monotonic increasing stack <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Maintain stack of indices with increasing heights. When we find a shorter bar, pop taller bars — their rectangle extends back to the current bar's position.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','stk-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','stk-p5')">Python</button></div>
<div class="lang-panel active" id="stk-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Monotonic Stack — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">largestRectangleArea</span>(heights) {
  <span class="kw">const</span> stack = [-<span class="num">1</span>]  <span class="cmt">// sentinel</span>
  <span class="kw">let</span> max = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;=heights.length; i++) {
    <span class="kw">const</span> h = i === heights.length ? <span class="num">0</span> : heights[i]
    <span class="kw">while</span> (stack.<span class="fn">at</span>(-<span class="num">1</span>) !== -<span class="num">1</span> && heights[stack.<span class="fn">at</span>(-<span class="num">1</span>)] >= h) {
      <span class="kw">const</span> height = heights[stack.<span class="fn">pop</span>()]
      <span class="kw">const</span> width  = i - stack.<span class="fn">at</span>(-<span class="num">1</span>) - <span class="num">1</span>
      max = <span class="cls">Math</span>.<span class="fn">max</span>(max, height * width)
    }
    stack.<span class="fn">push</span>(i)
  }
  <span class="kw">return</span> max
}</pre></div></div>
<div class="lang-panel" id="stk-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Monotonic Stack — O(n)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">largest_rectangle_area</span>(heights):
    stack, max_area = [-<span class="py-num">1</span>], <span class="py-num">0</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-fn">len</span>(heights) + <span class="py-num">1</span>):
        h = <span class="py-num">0</span> <span class="py-kw">if</span> i == <span class="py-fn">len</span>(heights) <span class="py-kw">else</span> heights[i]
        <span class="py-kw">while</span> stack[-<span class="py-num">1</span>] != -<span class="py-num">1</span> <span class="py-kw">and</span> heights[stack[-<span class="py-num">1</span>]] >= h:
            height = heights[stack.pop()]
            width  = i - stack[-<span class="py-num">1</span>] - <span class="py-num">1</span>
            max_area = <span class="py-fn">max</span>(max_area, height * width)
        stack.append(i)
    <span class="py-kw">return</span> max_area</pre></div>
</div>
<algo-visualizer id="viz-stk-p5" title="Monotonic Stack — trace"></algo-visualizer>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_stack.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Stack problems ───────────
function wireVisualizers() {
  // ── P1: Valid Parentheses ────────────────────────────────────────────────
  function traceIsValid(s) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };
    const steps = [{ i: -1, stack: [], note: 'Start — stack = [].', line: 2, pyLine: 2 }];
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if ('([{'.includes(c)) {
        stack.push(c);
        steps.push({ i, stack: [...stack], note: `i=${i}: '${c}' is an opener → push. stack=[${stack.join(',')}]`, line: 4, pyLine: 4 });
      } else {
        const top = stack.pop();
        if (top !== pairs[c]) {
          steps.push({ i, stack: [...stack], mismatch: true, final: true, stop: true,
            note: `i=${i}: '${c}' needs '${pairs[c]}' but popped '${top ?? 'nothing'}' → mismatch → false.`, line: 5, pyLine: 5 });
          return steps;
        }
        steps.push({ i, stack: [...stack], note: `i=${i}: '${c}' matches '${top}' → pop. stack=[${stack.join(',')}]`, line: 5, pyLine: 5 });
      }
    }
    steps.push({ i: -1, stack: [...stack], final: true, note: `Done. stack empty → ${stack.length === 0}.`, line: 7, pyLine: 6 });
    return steps;
  }

  function renderIsValid(s) {
    const chars = s.split('');
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(chars, (v, i) => step.final ? (i === step.i ? 'dup' : 'dim') : (i === step.i ? 'cur' : (step.i >= 0 && i < step.i ? 'dim' : '')))}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">stack (bottom→top)</div>${chips(step.stack)}</div>
        </div>`;
    };
  }

  // ── P2: Evaluate Reverse Polish Notation ────────────────────────────────
  function traceEvalRPN(tokens) {
    const stack = [];
    const steps = [{ i: -1, stack: [], note: 'Start — stack = [].', line: 2, pyLine: 3 }];
    tokens.forEach((t, i) => {
      if ('+-*/'.includes(t)) {
        const b = stack.pop(), a = stack.pop();
        const ops = { '+': a + b, '-': a - b, '*': a * b, '/': Math.trunc(a / b) };
        const result = ops[t];
        stack.push(result);
        steps.push({ i, stack: [...stack], note: `t='${t}': pop ${b}, ${a} → ${a}${t}${b} = ${result}. push ${result}.`, line: 7, pyLine: 8 });
      } else {
        stack.push(+t);
        steps.push({ i, stack: [...stack], note: `t='${t}': operand → push ${+t}.`, line: 8, pyLine: 9 });
      }
    });
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderEvalRPN(tokens) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(tokens, (v, i) => step.final ? 'dim' : (i === step.i ? 'cur' : (step.i >= 0 && i < step.i ? 'dim' : '')))}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">stack</div>${chips(step.stack)}</div>
        </div>`;
    };
  }

  // ── P3: Daily Temperatures — monotonic stack ────────────────────────────
  function traceDailyTemperatures(temps) {
    const ans = new Array(temps.length).fill(0);
    const stack = [];
    const steps = [{ i: -1, stack: [], ans: [...ans], resolved: [], note: 'Start — stack = [].', line: 3, pyLine: 2 }];
    for (let i = 0; i < temps.length; i++) {
      const resolved = [];
      while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
        const j = stack.pop();
        ans[j] = i - j;
        resolved.push(j);
      }
      stack.push(i);
      steps.push({ i, stack: [...stack], ans: [...ans], resolved,
        note: `i=${i} (${temps[i]}°)${resolved.length ? `: resolves day(s) [${resolved.join(',')}]` : ''}. push ${i}.`,
        line: resolved.length ? 7 : 9, pyLine: resolved.length ? 5 : 6 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderDailyTemperatures(temps) {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">temps</div>
        ${cellsRow(temps, (v, i) => step.final ? 'dim' : (i === step.i ? 'cur' : (step.resolved.includes(i) ? 'match' : (step.stack.includes(i) ? 'seen' : ''))))}
        <div class="viz-panel-lbl" style="margin-top:10px">answer (days to wait)</div>
        ${cellsRow(step.ans, (v, i) => step.resolved.includes(i) ? 'match' : '')}
        <div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-panel-lbl">stack (indices)</div>${chips(step.stack)}</div></div>`;
    };
  }

  // ── P4: Min Stack — two stacks ───────────────────────────────────────────
  function traceMinStack(ops) {
    const s = [], mins = [];
    const steps = [{ op: null, s: [], mins: [], note: 'MinStack created — s=[], mins=[].', line: 2, pyLine: 2 }];
    for (const op of ops) {
      if (op.type === 'push') {
        s.push(op.v);
        mins.push(Math.min(op.v, mins.at(-1) ?? Infinity));
        steps.push({ op, s: [...s], mins: [...mins], note: `push(${op.v}) → mins top = ${mins.at(-1)}.`, line: 5, pyLine: 5 });
      } else if (op.type === 'pop') {
        s.pop(); mins.pop();
        steps.push({ op, s: [...s], mins: [...mins], note: 'pop() → removes top of both stacks.', line: 7, pyLine: 6 });
      } else {
        steps.push({ op, s: [...s], mins: [...mins], result: mins.at(-1), note: `getMin() → ${mins.at(-1)}.`, line: 9, pyLine: 8 });
      }
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMinStack() {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">main stack</div>${chips(step.s)}</div>
          <div class="viz-panel"><div class="viz-panel-lbl">min tracker</div>${chips(step.mins)}</div>
          ${step.result !== undefined ? `<div class="viz-panel"><div class="viz-panel-lbl">getMin()</div><div class="viz-counter" style="font-size:20px">${step.result}</div></div>` : ''}
        </div>`;
    };
  }

  // ── P5: Largest Rectangle in Histogram — monotonic stack ────────────────
  function traceLargestRectangle(heights) {
    const stack = [-1];
    let max = 0;
    const steps = [{ i: -1, stack: [...stack], max, note: 'Start — stack=[-1] (sentinel).', line: 2, pyLine: 2 }];
    for (let i = 0; i <= heights.length; i++) {
      const h = i === heights.length ? 0 : heights[i];
      const popped = [];
      while (stack[stack.length - 1] !== -1 && heights[stack[stack.length - 1]] >= h) {
        const idx = stack.pop();
        const height = heights[idx];
        const width = i - stack[stack.length - 1] - 1;
        max = Math.max(max, height * width);
        popped.push(`${height}×${width}=${height * width}`);
      }
      stack.push(i);
      steps.push({ i, stack: [...stack], max, popped,
        note: `i=${i} (h=${h})${popped.length ? `: pop & compute area(s) ${popped.join(', ')}` : ''} → max=${max}. push ${i}.`,
        line: popped.length ? 9 : 11, pyLine: popped.length ? 8 : 9 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderLargestRectangle(heights) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(heights, (v, i) => step.final ? 'dim' : (i === step.i ? 'cur' : (step.stack.includes(i) ? 'seen' : '')))}
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">stack (indices)</div>${chips(step.stack)}</div>
          <div class="viz-panel"><div class="viz-counter">${step.max}<span class="viz-counter-label">max area</span></div></div>
        </div>`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  mountVisualizer('viz-stk-p1', traceIsValid('([)]'), withCode('stk-p1', renderIsValid('([)]')));

  mountVisualizer('viz-stk-p2', traceEvalRPN(['2', '1', '+', '3', '*']), withCode('stk-p2', renderEvalRPN(['2', '1', '+', '3', '*'])));

  mountVisualizer('viz-stk-p3', traceDailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), withCode('stk-p3', renderDailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])));

  const p4Ops = [
    { type: 'push', v: -2 },
    { type: 'push', v: 0 },
    { type: 'push', v: -3 },
    { type: 'getMin' },
    { type: 'pop' },
    { type: 'getMin' },
  ];
  mountVisualizer('viz-stk-p4', traceMinStack(p4Ops), withCode('stk-p4', renderMinStack()));

  mountVisualizer('viz-stk-p5', traceLargestRectangle([2, 1, 5, 6, 2, 3]), withCode('stk-p5', renderLargestRectangle([2, 1, 5, 6, 2, 3])));
}
