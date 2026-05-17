// Section: sorting
// Auto-extracted from index.html
const _html_sorting = String.raw`
<div id="sec-sorting" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Advanced · 21</span></div><div class="sec-title">Sorting Algorithms</div></div>
<div class="sec-lead">Know merge sort and quicksort cold. They come up in system design (external sort), complexity analysis, and as sub-steps in harder problems. Also know counting sort / radix sort for when O(n log n) isn't good enough.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine organizing a hand of playing cards. One natural approach: pick up cards one at a time and slide each into its correct position among the cards already in your hand — that is insertion sort. Another approach: split the deck in half, sort each half independently, then merge them back together in order — that is merge sort. These two mental images capture the fundamental divide between comparison-based sorting strategies: incremental insertion versus divide-and-conquer. Understanding which picture matches a given algorithm makes their time complexities intuitive rather than memorized.</p>
<p>Comparison-based sorts like merge sort and quicksort work by determining relative order between pairs of elements. The critical insight is that any comparison-based sort has a theoretical lower bound of O(n log n) — you can prove this by counting the number of possible orderings of n elements (n!) and observing that each comparison eliminates at most half the remaining possibilities, requiring at least log₂(n!) ≈ n log n comparisons. This is why merge sort's O(n log n) guarantee is optimal in the worst case among comparison sorts. Non-comparison sorts like counting sort and radix sort sidestep this limit by exploiting structure in the data (bounded integer ranges), achieving O(n) at the cost of restricted applicability.</p>
<p>In interviews, "just use the built-in sort" is almost always the right answer — but knowing <em>when</em> to pick a different strategy signals deeper understanding. Reach for merge sort when you need stability (equal elements preserve relative order), are sorting linked lists, or need guaranteed O(n log n) worst-case. Reach for quicksort when you want O(1) extra space and average-case speed on arrays. Reach for counting/radix sort when elements are bounded integers and you need O(n). The most common mistake is sorting when you don't need to: if you only need the <em>k</em>-th largest element, a heap gives O(n log k) — cheaper than sorting the whole array.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Quicksort is fast in practice because its constant factors are small and it has excellent cache behavior on arrays, even though its worst-case is O(n²). Merge sort is predictable and stable but requires O(n) extra space. Choose based on your worst-case tolerance and memory constraints.</div>
<div class="h2">Sorting Comparison Table</div>
<div class="tbl-wrap"><table>
<thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th></tr></thead>
<tbody>
<tr><td>Merge Sort</td><td class="o-good">O(n log n)</td><td class="o-good">O(n log n)</td><td class="o-good">O(n log n)</td><td class="o-ok">O(n)</td><td>Yes ✅</td></tr>
<tr><td>Quick Sort</td><td class="o-good">O(n log n)</td><td class="o-good">O(n log n)</td><td class="o-bad">O(n²)</td><td class="o-great">O(log n)</td><td>No</td></tr>
<tr><td>Heap Sort</td><td class="o-good">O(n log n)</td><td class="o-good">O(n log n)</td><td class="o-good">O(n log n)</td><td class="o-great">O(1)</td><td>No</td></tr>
<tr><td>Counting Sort</td><td class="o-great">O(n+k)</td><td class="o-great">O(n+k)</td><td class="o-great">O(n+k)</td><td class="o-ok">O(k)</td><td>Yes ✅</td></tr>
<tr><td>Bubble Sort</td><td class="o-good">O(n)</td><td class="o-bad">O(n²)</td><td class="o-bad">O(n²)</td><td class="o-great">O(1)</td><td>Yes ✅</td></tr>
</tbody>
</table></div>

<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','sort-impl')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','sort-impl')">Python</button></div>
<div class="lang-panel active" id="sort-impl-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Merge Sort + Quick Sort</span></div><pre><span class="cmt">// Merge Sort — O(n log n) stable. Best for linked lists and external sort.</span>
<span class="kw">function</span> <span class="fn">mergeSort</span>(arr) {
  <span class="kw">if</span> (arr.length &lt;= <span class="num">1</span>) <span class="kw">return</span> arr
  <span class="kw">const</span> mid = arr.length >> <span class="num">1</span>
  <span class="kw">const</span> L = <span class="fn">mergeSort</span>(arr.<span class="fn">slice</span>(<span class="num">0</span>, mid))
  <span class="kw">const</span> R = <span class="fn">mergeSort</span>(arr.<span class="fn">slice</span>(mid))
  <span class="kw">const</span> res = []
  <span class="kw">let</span> i=<span class="num">0</span>, j=<span class="num">0</span>
  <span class="kw">while</span> (i&lt;L.length && j&lt;R.length)
    res.<span class="fn">push</span>(L[i]&lt;=R[j] ? L[i++] : R[j++])
  <span class="kw">return</span> [...res, ...L.<span class="fn">slice</span>(i), ...R.<span class="fn">slice</span>(j)]
}

<span class="cmt">// Quick Sort — O(n log n) avg, O(n²) worst (rare with random pivot)</span>
<span class="kw">function</span> <span class="fn">quickSort</span>(arr, lo=<span class="num">0</span>, hi=arr.length-<span class="num">1</span>) {
  <span class="kw">if</span> (lo >= hi) <span class="kw">return</span>
  <span class="kw">const</span> p = <span class="fn">partition</span>(arr, lo, hi)
  <span class="fn">quickSort</span>(arr, lo, p-<span class="num">1</span>)
  <span class="fn">quickSort</span>(arr, p+<span class="num">1</span>, hi)
}
<span class="kw">function</span> <span class="fn">partition</span>(arr, lo, hi) {
  <span class="kw">const</span> pivot = arr[hi]
  <span class="kw">let</span> i = lo - <span class="num">1</span>
  <span class="kw">for</span> (<span class="kw">let</span> j=lo; j&lt;hi; j++)
    <span class="kw">if</span> (arr[j] &lt;= pivot) [arr[++i], arr[j]] = [arr[j], arr[i]]
  ;[arr[i+<span class="num">1</span>], arr[hi]] = [arr[hi], arr[i+<span class="num">1</span>]]
  <span class="kw">return</span> i+<span class="num">1</span>
}</pre></div></div>
<div class="lang-panel" id="sort-impl-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Merge Sort + Quick Sort</span></div><pre><span class="py-kw">def</span> <span class="py-fn">merge_sort</span>(arr):
    <span class="py-kw">if</span> <span class="py-fn">len</span>(arr) &lt;= <span class="py-num">1</span>: <span class="py-kw">return</span> arr
    mid = <span class="py-fn">len</span>(arr) // <span class="py-num">2</span>
    L, R = <span class="py-fn">merge_sort</span>(arr[:mid]), <span class="py-fn">merge_sort</span>(arr[mid:])
    res, i, j = [], <span class="py-num">0</span>, <span class="py-num">0</span>
    <span class="py-kw">while</span> i &lt; <span class="py-fn">len</span>(L) <span class="py-kw">and</span> j &lt; <span class="py-fn">len</span>(R):
        <span class="py-kw">if</span> L[i] &lt;= R[j]: res.append(L[i]); i+=<span class="py-num">1</span>
        <span class="py-kw">else</span>: res.append(R[j]); j+=<span class="py-num">1</span>
    <span class="py-kw">return</span> res + L[i:] + R[j:]

<span class="py-cmt"># Python built-in uses Timsort — O(n log n) stable — always prefer it</span>
arr.sort()          <span class="py-cmt"># in-place</span>
sorted_arr = sorted(arr)  <span class="py-cmt"># new list</span>
arr.sort(key=<span class="py-kw">lambda</span> x: x[<span class="py-num">1</span>])  <span class="py-cmt"># custom key</span></pre></div></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_sorting.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
