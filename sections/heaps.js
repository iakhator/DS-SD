// Section: heaps
// Auto-extracted from index.html
const _html_heaps = String.raw`
<div id="sec-heaps" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Trees · 13</span></div><div class="sec-title">Heaps & Priority Queue</div></div>
<div class="sec-lead">A heap is a complete binary tree where every parent satisfies the heap property (min-heap: parent ≤ children). It gives O(1) peek at min/max and O(log n) insert/delete. Use it whenever you need the Kth largest/smallest, running median, or event scheduling.</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_heaps.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
