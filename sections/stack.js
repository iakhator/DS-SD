// Section: stack
// Auto-extracted from index.html
const _html_stack = String.raw`
<div id="sec-stack" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Linear · 06</span></div><div class="sec-title">Stack</div></div>
<div class="sec-lead">A stack is LIFO — Last In, First Out. Push to top, pop from top. The key insight: whenever you need to track "the most recent unresolved thing," reach for a stack. Bracket matching, next greater element, undo history — all stacks.</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_stack.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
