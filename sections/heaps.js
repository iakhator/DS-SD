// Section: heaps
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_heaps = String.raw`
<div id="sec-heaps" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Trees · 13</span></div><div class="sec-title">Heaps & Priority Queue</div></div>
<div class="sec-lead">A heap is a complete binary tree where every parent satisfies the heap property (min-heap: parent ≤ children). It gives O(1) peek at min/max and O(log n) insert/delete. Use it whenever you need the Kth largest/smallest, running median, or event scheduling.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Think of a heap as a <strong>self-sorting waiting room</strong> where the most important person always sits at the front. Every time someone new enters or leaves, the room quietly rearranges itself so the top spot is always correct — but only the top spot is guaranteed; the rest of the room may look shuffled. This is exactly how a binary heap works: the root is always the minimum (or maximum), and the internal array representation exploits the fact that a complete binary tree maps perfectly onto contiguous indices.</p>
<p>The heap property solves a specific problem that plain sorted arrays cannot handle efficiently: <strong>continuous insertion and extraction of the extreme element</strong>. A sorted array gives <code>O(1)</code> peek but costs <code>O(n)</code> to insert while maintaining order. A heap gives <code>O(1)</code> peek and only <code>O(log n)</code> for both push and pop, because restoring the heap property only requires "bubbling" an element up or down a path of length at most <code>O(log n)</code> in the tree. This makes it the perfect engine behind priority queues.</p>
<p>Reach for a heap whenever a problem involves repeatedly finding or removing the smallest or largest element from a changing collection. The canonical signals are: "find the K-th largest," "merge K sorted lists," "schedule tasks by priority," or "maintain a running median." A common beginner mistake is using a heap when you actually need a fully sorted result — heaps are not a substitute for sorting. Another trap: in Python, <code>heapq</code> is a min-heap only; to simulate a max-heap you must negate values, and forgetting to negate on both push and pop is a frequent source of bugs.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> A heap only guarantees the single top element is correct — not full sorted order. This is precisely why it is faster than sorting: it does the minimum work needed to always surface the one element you care about.</div>
<div class="h2">Heap Patterns</div>
<div class="grid-2">
  <div class="card"><div class="card-title green">Top-K Pattern</div><p>K smallest: use max-heap of size k. K largest: use min-heap of size k. When size exceeds k, pop — keeping only the k best.</p></div>
  <div class="card"><div class="card-title amber">Two-Heap (Running Median)</div><p>Max-heap for lower half, min-heap for upper half. Rebalance after each insert. Median = top of larger heap or average of both tops.</p></div>
</div>

<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','heap-impl')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','heap-impl')">Python</button></div>
<div class="lang-panel active" id="heap-impl-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Min-Heap Implementation in JS</span></div><pre><span class="kw">class</span> <span class="cls">MinHeap</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.h = [] }
  <span class="kw">get</span> <span class="fn">size</span>() { <span class="kw">return</span> <span class="kw">this</span>.h.length }
  <span class="fn">peek</span>()  { <span class="kw">return</span> <span class="kw">this</span>.h[<span class="num">0</span>] }
  <span class="fn">push</span>(v) { <span class="kw">this</span>.h.<span class="fn">push</span>(v); <span class="kw">this</span>.<span class="fn">#up</span>(<span class="kw">this</span>.h.length-<span class="num">1</span>) }
  <span class="fn">pop</span>() {
    <span class="kw">const</span> min=<span class="kw">this</span>.h[<span class="num">0</span>], last=<span class="kw">this</span>.h.<span class="fn">pop</span>()
    <span class="kw">if</span>(<span class="kw">this</span>.h.length){ <span class="kw">this</span>.h[<span class="num">0</span>]=last; <span class="kw">this</span>.<span class="fn">#down</span>(<span class="num">0</span>) }
    <span class="kw">return</span> min
  }
  <span class="fn">#up</span>(i) {
    <span class="kw">while</span>(i>0) {
      <span class="kw">const</span> p=(i-<span class="num">1</span>)>>1
      <span class="kw">if</span>(<span class="kw">this</span>.h[p]<=<span class="kw">this</span>.h[i]) <span class="kw">break</span>
      [<span class="kw">this</span>.h[p],<span class="kw">this</span>.h[i]]=[<span class="kw">this</span>.h[i],<span class="kw">this</span>.h[p]]; i=p
    }
  }
  <span class="fn">#down</span>(i) {
    <span class="kw">const</span> n=<span class="kw">this</span>.h.length
    <span class="kw">while</span>(<span class="kw">true</span>) {
      <span class="kw">let</span> min=i, l=2*i+1, r=2*i+2
      <span class="kw">if</span>(l&lt;n&&<span class="kw">this</span>.h[l]&lt;<span class="kw">this</span>.h[min]) min=l
      <span class="kw">if</span>(r&lt;n&&<span class="kw">this</span>.h[r]&lt;<span class="kw">this</span>.h[min]) min=r
      <span class="kw">if</span>(min===i) <span class="kw">break</span>
      [<span class="kw">this</span>.h[i],<span class="kw">this</span>.h[min]]=[<span class="kw">this</span>.h[min],<span class="kw">this</span>.h[i]]; i=min
    }
  }
}</pre></div></div>
<div class="lang-panel" id="heap-impl-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">heapq (Python built-in)</span></div><pre><span class="py-kw">import</span> heapq

<span class="py-cmt"># Min-heap (default)</span>
h = []
heapq.heappush(h, <span class="py-num">3</span>); heapq.heappush(h, <span class="py-num">1</span>); heapq.heappush(h, <span class="py-num">2</span>)
heapq.heappop(h)   <span class="py-cmt"># → 1 (min)</span>
h[<span class="py-num">0</span>]               <span class="py-cmt"># peek min</span>
heapq.heapify([<span class="py-num">3</span>,<span class="py-num">1</span>,<span class="py-num">4</span>,<span class="py-num">1</span>,<span class="py-num">5</span>])  <span class="py-cmt"># in-place O(n)</span>

<span class="py-cmt"># Max-heap: negate values</span>
heapq.heappush(h, -val)
max_val = -heapq.heappop(h)

<span class="py-cmt"># K largest elements</span>
heapq.nlargest(k, nums)   <span class="py-cmt"># O(n log k)</span>
heapq.nsmallest(k, nums)  <span class="py-cmt"># O(n log k)</span></pre></div></div>

<div class="h2">5 Problems — Heaps</div>
<div class="problems-grid">

<problem-card num="P1" title="Kth Largest Element" difficulty="medium" tags="Min-Heap,Quickselect">
<div class="prob-desc">Find the kth largest element in an unsorted array.</div>
<div class="prob-example">Input: [3,2,1,5,6,4], k=2 → 5</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Min-heap size k <span class="approach-tc">O(n log k)</span></div></div>
  <div class="approach"><div class="approach-name">Quickselect <span class="approach-tc">O(n) avg · O(n²) worst</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','heap-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','heap-p1')">Python</button></div>
<div class="lang-panel active" id="heap-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Min-Heap Size K</span></div><pre><span class="kw">function</span> <span class="fn">findKthLargest</span>(nums, k) {
  <span class="kw">const</span> heap = <span class="kw">new</span> <span class="cls">MinHeap</span>()
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) {
    heap.<span class="fn">push</span>(n)
    <span class="kw">if</span> (heap.size > k) heap.<span class="fn">pop</span>()  <span class="cmt">// evict smallest</span>
  }
  <span class="kw">return</span> heap.<span class="fn">peek</span>()  <span class="cmt">// top of size-k heap = kth largest</span>
}</pre></div></div>
<div class="lang-panel" id="heap-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">heapq</span></div><pre><span class="py-kw">import</span> heapq
<span class="py-kw">def</span> <span class="py-fn">find_kth_largest</span>(nums, k):
    <span class="py-kw">return</span> heapq.nlargest(k, nums)[-<span class="py-num">1</span>]
    <span class="py-cmt"># Or: heapq.nsmallest-of-top-k:</span>
    <span class="py-cmt"># h = nums[:k]; heapq.heapify(h)</span>
    <span class="py-cmt"># for n in nums[k:]:</span>
    <span class="py-cmt">#     if n > h[0]: heapq.heapreplace(h, n)</span>
    <span class="py-cmt"># return h[0]</span></pre></div>
</div>
<algo-visualizer id="viz-heap-p1" title="Min-Heap of Size K — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Task Scheduler" difficulty="medium" tags="Max-Heap,Greedy">
<div class="prob-desc">Given tasks and a cooldown n, find minimum intervals to execute all tasks (same task must be n intervals apart).</div>
<div class="prob-example">tasks=["A","A","A","B","B","B"], n=2 → 8</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Max-heap + cooldown queue <span class="approach-tc">O(n log n)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','heap-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','heap-p2')">Python</button></div>
<div class="lang-panel active" id="heap-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">MaxHeap + Queue — Greedy</span></div><pre><span class="cmt">// Math shortcut: ceil((maxFreq-1)*(n+1) + countOfMax)
// But heap solution works for all variants</span>
<span class="kw">function</span> <span class="fn">leastInterval</span>(tasks, n) {
  <span class="kw">const</span> freq = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">const</span> t <span class="kw">of</span> tasks) freq.<span class="fn">set</span>(t, (freq.<span class="fn">get</span>(t)??<span class="num">0</span>)+<span class="num">1</span>)
  <span class="kw">const</span> max = <span class="cls">Math</span>.<span class="fn">max</span>(...freq.<span class="fn">values</span>())
  <span class="kw">const</span> maxCount = [...freq.<span class="fn">values</span>()].<span class="fn">filter</span>(v=>v===max).length
  <span class="kw">return</span> <span class="cls">Math</span>.<span class="fn">max</span>(tasks.length, (max-<span class="num">1</span>)*(n+<span class="num">1</span>)+maxCount)
}</pre></div></div>
<div class="lang-panel" id="heap-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Math Formula</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> Counter
<span class="py-kw">def</span> <span class="py-fn">least_interval</span>(tasks, n):
    freq = Counter(tasks)
    max_f = <span class="py-fn">max</span>(freq.values())
    max_count = <span class="py-fn">sum</span>(<span class="py-num">1</span> <span class="py-kw">for</span> f <span class="py-kw">in</span> freq.values() <span class="py-kw">if</span> f == max_f)
    <span class="py-kw">return</span> <span class="py-fn">max</span>(<span class="py-fn">len</span>(tasks), (max_f - <span class="py-num">1</span>) * (n + <span class="py-num">1</span>) + max_count)</pre></div>
</div>
<algo-visualizer id="viz-heap-p2" title="Frequency + Formula — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Find Median from Data Stream" difficulty="hard" tags="Two Heaps,Design">
<div class="prob-desc">Design a class that supports addNum and findMedian. findMedian must be O(1), addNum must be O(log n).</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Max-heap (lower half) + Min-heap (upper half) <span class="approach-tc">O(log n) add · O(1) median</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','heap-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','heap-p5')">Python</button></div>
<div class="lang-panel active" id="heap-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Two Heaps</span></div><pre><span class="cmt">// lo = max-heap (lower half)   hi = min-heap (upper half)
// Invariant: lo.size == hi.size OR lo.size == hi.size + 1</span>
<span class="kw">class</span> <span class="cls">MedianFinder</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.lo=<span class="kw">new</span> <span class="cls">MaxHeap</span>(); <span class="kw">this</span>.hi=<span class="kw">new</span> <span class="cls">MinHeap</span>() }
  <span class="fn">addNum</span>(n) {
    <span class="kw">this</span>.lo.<span class="fn">push</span>(n)
    <span class="kw">this</span>.hi.<span class="fn">push</span>(<span class="kw">this</span>.lo.<span class="fn">pop</span>())  <span class="cmt">// ensure lo's max goes to hi first</span>
    <span class="kw">if</span> (<span class="kw">this</span>.hi.size > <span class="kw">this</span>.lo.size)
      <span class="kw">this</span>.lo.<span class="fn">push</span>(<span class="kw">this</span>.hi.<span class="fn">pop</span>())
  }
  <span class="fn">findMedian</span>() {
    <span class="kw">return</span> <span class="kw">this</span>.lo.size > <span class="kw">this</span>.hi.size
      ? <span class="kw">this</span>.lo.<span class="fn">peek</span>()
      : (<span class="kw">this</span>.lo.<span class="fn">peek</span>() + <span class="kw">this</span>.hi.<span class="fn">peek</span>()) / <span class="num">2</span>
  }
}</pre></div></div>
<div class="lang-panel" id="heap-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Two heaps</span></div><pre><span class="py-kw">import</span> heapq
<span class="py-kw">class</span> <span class="py-cls">MedianFinder</span>:
    <span class="py-kw">def</span> <span class="py-fn">__init__</span>(self): self.lo=[]; self.hi=[]  <span class="py-cmt"># lo=max-heap(neg), hi=min-heap</span>
    <span class="py-kw">def</span> <span class="py-fn">add_num</span>(self, n):
        heapq.heappush(self.lo, -n)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        <span class="py-kw">if</span> <span class="py-fn">len</span>(self.hi) > <span class="py-fn">len</span>(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    <span class="py-kw">def</span> <span class="py-fn">find_median</span>(self):
        <span class="py-kw">if</span> <span class="py-fn">len</span>(self.lo) > <span class="py-fn">len</span>(self.hi): <span class="py-kw">return</span> -self.lo[<span class="py-num">0</span>]
        <span class="py-kw">return</span> (-self.lo[<span class="py-num">0</span>] + self.hi[<span class="py-num">0</span>]) / <span class="py-num">2</span></pre></div>
</div>
<algo-visualizer id="viz-heap-p5" title="Two Heaps — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="K Closest Points to Origin" difficulty="medium" tags="Max-Heap">
<div class="prob-desc">Given array of points, find the k closest to the origin (0,0). Distance = sqrt(x²+y²), but you can compare x²+y².</div>
<div class="prob-example">points=[[1,3],[-2,2]], k=1 → [[-2,2]] (distance sqrt(8) vs sqrt(10))</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Max-heap of size k — O(n log k)</div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','heap-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','heap-p3')">Python</button></div>
<div class="lang-panel active" id="heap-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Max-Heap Size K</span></div><pre><span class="kw">function</span> <span class="fn">kClosest</span>(points, k) {
  <span class="cmt">// Keep max-heap of size k; evict farthest point when full</span>
  <span class="kw">const</span> dist = ([x,y]) => x*x + y*y
  <span class="kw">const</span> heap = <span class="kw">new</span> <span class="cls">MaxHeap</span>(([a],[b]) => dist(a) - dist(b))
  <span class="kw">for</span> (<span class="kw">const</span> p <span class="kw">of</span> points) {
    heap.<span class="fn">push</span>(p)
    <span class="kw">if</span> (heap.size > k) heap.<span class="fn">pop</span>()
  }
  <span class="kw">return</span> heap.<span class="fn">toArray</span>()
}</pre></div></div>
<div class="lang-panel" id="heap-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">heapq nsmallest</span></div><pre><span class="py-kw">import</span> heapq
<span class="py-kw">def</span> <span class="py-fn">k_closest</span>(points, k):
    <span class="py-kw">return</span> heapq.nsmallest(k, points, key=<span class="py-kw">lambda</span> p: p[<span class="py-num">0</span>]**<span class="py-num">2</span> + p[<span class="py-num">1</span>]**<span class="py-num">2</span>)</pre></div>
</div>
<algo-visualizer id="viz-heap-p3" title="Max-Heap of Size K — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Top K Frequent Words" difficulty="medium" tags="Heap,Sort">
<div class="prob-desc">Given array of strings, return the k most frequent words sorted by frequency (then lexicographic for ties).</div>
<div class="prob-example">["i","love","code","i","love","coding"], k=2 → ["i","love"]</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','heap-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','heap-p4')">Python</button></div>
<div class="lang-panel active" id="heap-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Counter + Sort</span></div><pre><span class="kw">function</span> <span class="fn">topKFrequent</span>(words, k) {
  <span class="kw">const</span> freq = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">const</span> w <span class="kw">of</span> words) freq.<span class="fn">set</span>(w, (freq.<span class="fn">get</span>(w) ?? <span class="num">0</span>) + <span class="num">1</span>)
  <span class="kw">return</span> [...freq.<span class="fn">keys</span>()]
    .<span class="fn">sort</span>((a,b) => freq.<span class="fn">get</span>(b) - freq.<span class="fn">get</span>(a) || a.<span class="fn">localeCompare</span>(b))
    .<span class="fn">slice</span>(<span class="num">0</span>, k)
}</pre></div></div>
<div class="lang-panel" id="heap-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Counter + Sort</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> Counter
<span class="py-kw">def</span> <span class="py-fn">top_k_frequent_words</span>(words, k):
    freq = Counter(words)
    <span class="py-kw">return</span> <span class="py-fn">sorted</span>(freq, key=<span class="py-kw">lambda</span> w: (-freq[w], w))[:k]</pre></div>
</div>
<algo-visualizer id="viz-heap-p4" title="Counter + Sort — trace"></algo-visualizer>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_heaps.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Heaps problems ───────────
// Heap contents are simulated with a plain sorted array (same top element and
// size behavior as a real binary heap) rather than reproducing sift-up/down
// array mechanics, which the problems' own code doesn't re-show anyway.
function wireVisualizers() {
  // ── P1: Kth Largest Element — min-heap of size k ────────────────────────
  function traceFindKthLargest(nums, k) {
    let heap = [];
    const steps = [{ idx: -1, heap: [], note: 'Start — empty min-heap.', line: 2, pyLine: null }];
    nums.forEach((n, idx) => {
      heap.push(n);
      heap.sort((a, b) => a - b);
      let evicted = null;
      if (heap.length > k) evicted = heap.shift();
      steps.push({ idx, heap: [...heap], evicted,
        note: `push ${n}${evicted !== null ? `, size > k → evict smallest (${evicted})` : ''}.`, line: evicted !== null ? 5 : 4, pyLine: null });
    });
    steps.push({ idx: -1, heap: [...heap], final: true, note: `Done. Top of heap = kth largest = ${heap[0]}.`, line: 7, pyLine: null });
    return steps;
  }

  function renderFindKthLargest(nums) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(nums, (v, i) => step.final ? 'dim' : (i === step.idx ? 'cur' : (step.idx >= 0 && i < step.idx ? 'dim' : '')))}
        <div class="viz-panels" style="margin-top:8px">
          <div class="viz-panel"><div class="viz-panel-lbl">min-heap (size ≤ k)</div>${chips(step.heap)}</div>
          ${step.final ? `<div class="viz-panel"><div class="viz-counter">${step.heap[0]}<span class="viz-counter-label">kth largest</span></div></div>` : ''}
        </div>`;
    };
  }

  // ── P2: Task Scheduler — frequency + formula ────────────────────────────
  function traceLeastInterval(tasks, n) {
    const freq = new Map();
    const steps = [{ idx: -1, freq: {}, note: 'Start — build frequency map.', line: 2, pyLine: 3 }];
    tasks.forEach((t, i) => {
      freq.set(t, (freq.get(t) ?? 0) + 1);
      steps.push({ idx: i, freq: Object.fromEntries(freq), note: `count '${t}' → freq['${t}']=${freq.get(t)}.`, line: 3, pyLine: 3 });
    });
    const max = Math.max(...freq.values());
    const maxCount = [...freq.values()].filter(v => v === max).length;
    const result = Math.max(tasks.length, (max - 1) * (n + 1) + maxCount);
    steps.push({ idx: -1, freq: Object.fromEntries(freq), result, final: true,
      note: `maxFreq=${max}, tasksWithMaxFreq=${maxCount} → max(${tasks.length}, (${max}-1)×(${n}+1)+${maxCount}) = ${result}.`, line: 6, pyLine: 6 });
    return steps;
  }

  function renderLeastInterval(tasks) {
    return (stage, step) => {
      const freqChips = Object.entries(step.freq).map(([k, v]) => `${k}:${v}`);
      stage.innerHTML = `
        ${cellsRow(tasks, (v, i) => step.final ? 'dim' : (i === step.idx ? 'cur' : (step.idx >= 0 && i < step.idx ? 'dim' : '')))}
        <div class="viz-panels" style="margin-top:8px">
          <div class="viz-panel"><div class="viz-panel-lbl">freq</div>${chips(freqChips)}</div>
          ${step.final ? `<div class="viz-panel"><div class="viz-counter">${step.result}<span class="viz-counter-label">min intervals</span></div></div>` : ''}
        </div>`;
    };
  }

  // ── P3: K Closest Points to Origin — max-heap of size k ─────────────────
  function traceKClosest(points, k) {
    const dist = ([x, y]) => x * x + y * y;
    let heap = [];
    const steps = [{ idx: -1, heap: [], note: 'Start — empty max-heap (ordered by distance).', line: 4, pyLine: null }];
    points.forEach((p, i) => {
      heap.push(p);
      heap.sort((a, b) => dist(b) - dist(a));
      let evicted = null;
      if (heap.length > k) evicted = heap.shift();
      steps.push({ idx: i, heap: heap.map(pt => `[${pt.join(',')}]`),
        note: `push [${p.join(',')}] (dist²=${dist(p)})${evicted ? `, size>k → evict farthest [${evicted.join(',')}]` : ''}.`, line: evicted ? 7 : 6, pyLine: null });
    });
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderKClosest(points) {
    const labels = points.map(p => `${p[0]},${p[1]}`);
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(labels, (v, i) => step.final ? 'dim' : (i === step.idx ? 'cur' : (i < step.idx ? 'dim' : '')))}
        <div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-panel-lbl">max-heap (size ≤ k)</div>${chips(step.heap)}</div></div>`;
    };
  }

  // ── P4: Top K Frequent Words — count then sort ──────────────────────────
  function traceTopKFrequentWords(words, k) {
    const freq = new Map();
    const steps = [{ idx: -1, freq: {}, sorted: null, result: null, note: 'Start — build frequency map.', line: 2, pyLine: 3 }];
    words.forEach((w, i) => {
      freq.set(w, (freq.get(w) ?? 0) + 1);
      steps.push({ idx: i, freq: Object.fromEntries(freq), sorted: null, result: null, note: `count '${w}' → freq['${w}']=${freq.get(w)}.`, line: 3, pyLine: 3 });
    });
    const sortedWords = [...freq.keys()].sort((a, b) => freq.get(b) - freq.get(a) || a.localeCompare(b));
    steps.push({ idx: -1, freq: Object.fromEntries(freq), sorted: sortedWords, result: null, note: `sort by frequency desc, then alphabetically: [${sortedWords.join(',')}].`, line: 5, pyLine: 4 });
    const result = sortedWords.slice(0, k);
    steps.push({ idx: -1, freq: Object.fromEntries(freq), sorted: sortedWords, result, final: true, note: `Take top ${k}: [${result.join(',')}].`, line: 6, pyLine: 4 });
    return steps;
  }

  function renderTopKFrequentWords(words) {
    return (stage, step) => {
      const freqChips = Object.entries(step.freq).map(([k, v]) => `${k}:${v}`);
      stage.innerHTML = `
        ${cellsRow(words, (v, i) => step.idx >= 0 ? (i === step.idx ? 'cur' : (i < step.idx ? 'dim' : '')) : 'dim')}
        <div class="viz-panels" style="margin-top:8px">
          <div class="viz-panel"><div class="viz-panel-lbl">freq</div>${chips(freqChips)}</div>
          ${step.sorted ? `<div class="viz-panel"><div class="viz-panel-lbl">sorted</div>${chips(step.sorted, step.result ? '' : ' new')}</div>` : ''}
          ${step.result ? `<div class="viz-panel"><div class="viz-panel-lbl">top ${step.result.length}</div>${chips(step.result, ' new')}</div>` : ''}
        </div>`;
    };
  }

  // ── P5: Find Median from Data Stream — two heaps ────────────────────────
  function traceMedianFinder(nums) {
    let lo = [], hi = [];
    const steps = [{ lo: [], hi: [], note: 'Start — lo=[], hi=[].', line: 2, pyLine: 3 }];
    nums.forEach(n => {
      lo.push(n); lo.sort((a, b) => b - a);
      const moved = lo.shift();
      hi.push(moved); hi.sort((a, b) => a - b);
      let rebalanced = false;
      if (hi.length > lo.length) { const back = hi.shift(); lo.push(back); lo.sort((a, b) => b - a); rebalanced = true; }
      const median = lo.length > hi.length ? lo[0] : (lo[0] + hi[0]) / 2;
      steps.push({ lo: [...lo], hi: [...hi], median, note: `addNum(${n})${rebalanced ? ' — rebalance lo/hi' : ''} → median = ${median}.`, line: rebalanced ? 7 : 5, pyLine: rebalanced ? 8 : 6 });
    });
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMedianFinder() {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panels">
          <div class="viz-panel"><div class="viz-panel-lbl">lo (max-heap, lower half)</div>${chips(step.lo)}</div>
          <div class="viz-panel"><div class="viz-panel-lbl">hi (min-heap, upper half)</div>${chips(step.hi)}</div>
          ${step.median !== undefined ? `<div class="viz-panel"><div class="viz-counter">${step.median}<span class="viz-counter-label">median</span></div></div>` : ''}
        </div>`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  mountVisualizer('viz-heap-p1', traceFindKthLargest([3, 2, 1, 5, 6, 4], 2), withCode('heap-p1', renderFindKthLargest([3, 2, 1, 5, 6, 4])));

  const p2Tasks = ['A', 'A', 'A', 'B', 'B', 'B'];
  mountVisualizer('viz-heap-p2', traceLeastInterval(p2Tasks, 2), withCode('heap-p2', renderLeastInterval(p2Tasks)));

  const p3Points = [[1, 3], [-2, 2]];
  mountVisualizer('viz-heap-p3', traceKClosest(p3Points, 1), withCode('heap-p3', renderKClosest(p3Points)));

  const p4Words = ['i', 'love', 'code', 'i', 'love', 'coding'];
  mountVisualizer('viz-heap-p4', traceTopKFrequentWords(p4Words, 2), withCode('heap-p4', renderTopKFrequentWords(p4Words)));

  mountVisualizer('viz-heap-p5', traceMedianFinder([5, 15, 1, 3]), withCode('heap-p5', renderMedianFinder()));
}
