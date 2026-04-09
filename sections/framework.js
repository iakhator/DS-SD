// Section: framework
// Auto-extracted from index.html
const _html_framework = String.raw`
<div id="sec-framework" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Meta · 23</span></div><div class="sec-title">Problem-Solving Framework</div></div>
<div class="sec-lead">The framework is how you approach a problem you've never seen before and still produce a clean, correct solution. It's the most valuable skill in an interview — more than memorizing 200 solutions.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">The 7-Step Interview Method</div>
<div class="steps">
  <div class="step"><strong>Understand the problem.</strong> Read carefully. Identify: What is the input? Output? Any constraints? Ask: "Can the array be empty?" "Are there negative numbers?" "Can there be duplicates?" Don't code yet.</div>
  <div class="step"><strong>Work an example by hand.</strong> Take a small input and trace through what the output should be. This reveals the pattern you need to implement.</div>
  <div class="step"><strong>State the brute-force.</strong> "The naive solution is O(n²) nested loops. We'd check every pair." Even if it's too slow, stating it shows you understand the problem and gives a baseline.</div>
  <div class="step"><strong>Identify the pattern.</strong> Match to known patterns: Is this a sorted array? (Binary search / Two pointer). Is it subarray? (Sliding window). Is it nested? (Stack). Tree/graph? (DFS/BFS). Optimal substructure? (DP).</div>
  <div class="step"><strong>Design and state the approach before coding.</strong> "I'll use a hash map to track the complement. For each element I'll check if target minus the element is in the map. Time O(n), space O(n)." Get agreement before writing code.</div>
  <div class="step"><strong>Write clean code.</strong> Use meaningful variable names. Keep it simple. Add a brief comment for non-obvious steps. Handle edge cases (empty input, single element, negative numbers).</div>
  <div class="step"><strong>Test and trace through.</strong> Use your example from step 2. Trace through your code manually. Then test edge cases. State complexity: "This is O(n log n) time, O(n) space."</div>
</div>

<div class="h2">Pattern Recognition Cheat Sheet</div>
<div class="tbl-wrap"><table>
<thead><tr><th>If you see...</th><th>Think...</th><th>Typical complexity</th></tr></thead>
<tbody>
<tr><td>Sorted array, find target</td><td>Binary search</td><td class="o-great">O(log n)</td></tr>
<tr><td>Subarray/substring sum/max</td><td>Sliding window or prefix sum</td><td class="o-good">O(n)</td></tr>
<tr><td>Pairs that sum to X</td><td>Hash map (complement lookup)</td><td class="o-good">O(n)</td></tr>
<tr><td>Sorted array, find pairs</td><td>Two pointers from ends</td><td class="o-good">O(n)</td></tr>
<tr><td>Most/least frequent</td><td>Hash map + heap (or bucket sort)</td><td class="o-good">O(n)</td></tr>
<tr><td>Next greater/smaller</td><td>Monotonic stack</td><td class="o-good">O(n)</td></tr>
<tr><td>All paths/combinations/subsets</td><td>Backtracking (DFS)</td><td class="o-bad">O(2ⁿ)</td></tr>
<tr><td>Min/max of overlapping subproblems</td><td>Dynamic programming</td><td class="o-good">O(n²) or better</td></tr>
<tr><td>Shortest path (unweighted)</td><td>BFS</td><td class="o-good">O(V+E)</td></tr>
<tr><td>Connected components, reachability</td><td>DFS or Union-Find</td><td class="o-good">O(V+E)</td></tr>
<tr><td>Top K, Kth largest</td><td>Heap of size K</td><td class="o-good">O(n log k)</td></tr>
<tr><td>Prefix search, autocomplete</td><td>Trie</td><td class="o-great">O(L) per op</td></tr>
<tr><td>Dependency ordering</td><td>Topological sort</td><td class="o-good">O(V+E)</td></tr>
</tbody>
</table></div>

<div class="alert key"><span class="alert-icon">🔑</span><strong>The single most important thing:</strong> Don't jump to code. State your approach out loud, get buy-in, then write. An interviewer watching you think through a problem correctly is worth more than fast code that silently breaks on edge cases.</div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_framework.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
