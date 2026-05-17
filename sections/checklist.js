// Section: checklist
// Must-Do Problem Set — an interactive, progress-tracked checklist.
// Checkbox state persists in localStorage so progress survives reloads.
const _html_checklist = String.raw`
<div id="sec-checklist" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Practice · 25</span></div><div class="sec-title">Must-Do Problem Set</div></div>
<div class="sec-lead">Reading explanations builds understanding; solving problems builds recall. This is a curated, pattern-organised set of 50+ interview problems plus the core system-design prompts — enough that finishing it means you have touched every pattern in this reference at least twice. Tick a box as you solve each one; your progress is saved in this browser automatically.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">How To Use This List</div>
<p>Work <strong>top to bottom, one category at a time</strong> — the order mirrors the sections in this site, so each group reinforces a pattern you just read. Do not jump ahead to a random hard problem; pattern recognition comes from finishing a category, not from cherry-picking.</p>
<p>For each problem, give yourself a soft timer: <strong>20 minutes for easy/medium, 35 for hard</strong>. If you are stuck past that, read the approach, understand it fully, then close it and re-solve from a blank editor a day later. The goal is not to finish fast — it is to reach the point where you recognise the pattern before you finish reading the prompt. A problem only counts as "done" when you can re-solve it cleanly without hints.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Your progress is stored locally.</strong> Ticked boxes are saved in this browser via localStorage — they persist across reloads but are private to this device and are not synced anywhere. Use "Reset progress" to start a fresh pass.</div>

<div class="check-summary">
  <div class="check-count"><span id="ck-done">0</span> <span class="check-count-sep">/</span> <span id="ck-total">0</span> <span class="check-count-label">problems completed</span></div>
  <div class="check-meter"><div class="check-meter-fill" id="ck-meter"></div></div>
  <button class="check-reset" id="ck-reset" type="button">Reset progress</button>
</div>

<div class="h2">Arrays &amp; Hashing</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="two-sum"><span class="check-name">Two Sum</span><span class="check-lc">LC 1</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="contains-duplicate"><span class="check-name">Contains Duplicate</span><span class="check-lc">LC 217</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="valid-anagram"><span class="check-name">Valid Anagram</span><span class="check-lc">LC 242</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="group-anagrams"><span class="check-name">Group Anagrams</span><span class="check-lc">LC 49</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="top-k-frequent"><span class="check-name">Top K Frequent Elements</span><span class="check-lc">LC 347</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="product-except-self"><span class="check-name">Product of Array Except Self</span><span class="check-lc">LC 238</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="longest-consecutive"><span class="check-name">Longest Consecutive Sequence</span><span class="check-lc">LC 128</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Two Pointers</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="valid-palindrome"><span class="check-name">Valid Palindrome</span><span class="check-lc">LC 125</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="two-sum-ii"><span class="check-name">Two Sum II — Input Array Is Sorted</span><span class="check-lc">LC 167</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="three-sum"><span class="check-name">3Sum</span><span class="check-lc">LC 15</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="container-most-water"><span class="check-name">Container With Most Water</span><span class="check-lc">LC 11</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Sliding Window</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="best-time-stock"><span class="check-name">Best Time to Buy and Sell Stock</span><span class="check-lc">LC 121</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="longest-substring"><span class="check-name">Longest Substring Without Repeating Characters</span><span class="check-lc">LC 3</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="char-replacement"><span class="check-name">Longest Repeating Character Replacement</span><span class="check-lc">LC 424</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="min-window-substring"><span class="check-name">Minimum Window Substring</span><span class="check-lc">LC 76</span><span class="diff-badge diff-h">Hard</span></label>
</div>

<div class="h2">Prefix Sum</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="pivot-index"><span class="check-name">Find Pivot Index</span><span class="check-lc">LC 724</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="subarray-sum-k"><span class="check-name">Subarray Sum Equals K</span><span class="check-lc">LC 560</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Stack</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="valid-parentheses"><span class="check-name">Valid Parentheses</span><span class="check-lc">LC 20</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="min-stack"><span class="check-name">Min Stack</span><span class="check-lc">LC 155</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="daily-temperatures"><span class="check-name">Daily Temperatures</span><span class="check-lc">LC 739</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Binary Search</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="binary-search"><span class="check-name">Binary Search</span><span class="check-lc">LC 704</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="search-rotated"><span class="check-name">Search in Rotated Sorted Array</span><span class="check-lc">LC 33</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="koko-bananas"><span class="check-name">Koko Eating Bananas</span><span class="check-lc">LC 875</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Linked Lists</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="reverse-list"><span class="check-name">Reverse Linked List</span><span class="check-lc">LC 206</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="merge-two-lists"><span class="check-name">Merge Two Sorted Lists</span><span class="check-lc">LC 21</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="linked-list-cycle"><span class="check-name">Linked List Cycle</span><span class="check-lc">LC 141</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="reorder-list"><span class="check-name">Reorder List</span><span class="check-lc">LC 143</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Trees</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="invert-tree"><span class="check-name">Invert Binary Tree</span><span class="check-lc">LC 226</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="max-depth"><span class="check-name">Maximum Depth of Binary Tree</span><span class="check-lc">LC 104</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="diameter-tree"><span class="check-name">Diameter of Binary Tree</span><span class="check-lc">LC 543</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="level-order"><span class="check-name">Binary Tree Level Order Traversal</span><span class="check-lc">LC 102</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="validate-bst"><span class="check-name">Validate Binary Search Tree</span><span class="check-lc">LC 98</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="lca-bst"><span class="check-name">Lowest Common Ancestor of a BST</span><span class="check-lc">LC 235</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Heaps &amp; Priority Queue</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="kth-largest"><span class="check-name">Kth Largest Element in an Array</span><span class="check-lc">LC 215</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="median-stream"><span class="check-name">Find Median from Data Stream</span><span class="check-lc">LC 295</span><span class="diff-badge diff-h">Hard</span></label>
</div>

<div class="h2">Recursion &amp; Backtracking</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="subsets"><span class="check-name">Subsets</span><span class="check-lc">LC 78</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="combination-sum"><span class="check-name">Combination Sum</span><span class="check-lc">LC 39</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="permutations"><span class="check-name">Permutations</span><span class="check-lc">LC 46</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Graphs</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="num-islands"><span class="check-name">Number of Islands</span><span class="check-lc">LC 200</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="clone-graph"><span class="check-name">Clone Graph</span><span class="check-lc">LC 133</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="course-schedule"><span class="check-name">Course Schedule</span><span class="check-lc">LC 207</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="pacific-atlantic"><span class="check-name">Pacific Atlantic Water Flow</span><span class="check-lc">LC 417</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Dynamic Programming</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="climbing-stairs"><span class="check-name">Climbing Stairs</span><span class="check-lc">LC 70</span><span class="diff-badge diff-e">Easy</span></label>
  <label class="check-item"><input type="checkbox" data-ck="house-robber"><span class="check-name">House Robber</span><span class="check-lc">LC 198</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="coin-change"><span class="check-name">Coin Change</span><span class="check-lc">LC 322</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="lis"><span class="check-name">Longest Increasing Subsequence</span><span class="check-lc">LC 300</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="unique-paths"><span class="check-name">Unique Paths</span><span class="check-lc">LC 62</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="lcs"><span class="check-name">Longest Common Subsequence</span><span class="check-lc">LC 1143</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">Greedy &amp; Intervals</div>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="max-subarray"><span class="check-name">Maximum Subarray</span><span class="check-lc">LC 53</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="jump-game"><span class="check-name">Jump Game</span><span class="check-lc">LC 55</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="merge-intervals"><span class="check-name">Merge Intervals</span><span class="check-lc">LC 56</span><span class="diff-badge diff-m">Medium</span></label>
  <label class="check-item"><input type="checkbox" data-ck="insert-interval"><span class="check-name">Insert Interval</span><span class="check-lc">LC 57</span><span class="diff-badge diff-m">Medium</span></label>
</div>

<div class="h2">System Design — Core Prompts</div>
<p>For each, practise the same 30-minute structure: <strong>requirements (2m) → API &amp; data model (5m) → high-level diagram (8m) → deep dive on one component (10m) → scale bottlenecks (5m)</strong>. The matching case-study sections in this site walk through several of these end to end.</p>
<div class="check-group">
  <label class="check-item"><input type="checkbox" data-ck="sd-url"><span class="check-name">Design a URL Shortener (TinyURL)</span><span class="diff-badge diff-m">Core</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-ratelimit"><span class="check-name">Design a Rate Limiter</span><span class="diff-badge diff-m">Core</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-cache"><span class="check-name">Design a Distributed Cache</span><span class="diff-badge diff-m">Core</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-feed"><span class="check-name">Design a Social Feed (Twitter / Instagram)</span><span class="diff-badge diff-h">Hard</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-chat"><span class="check-name">Design a Chat System (WhatsApp / Messenger)</span><span class="diff-badge diff-h">Hard</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-notify"><span class="check-name">Design a Notification System</span><span class="diff-badge diff-m">Core</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-filestore"><span class="check-name">Design File Storage / Sync (Dropbox)</span><span class="diff-badge diff-h">Hard</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-autocomplete"><span class="check-name">Design Search Autocomplete (Typeahead)</span><span class="diff-badge diff-m">Core</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-crawler"><span class="check-name">Design a Web Crawler</span><span class="diff-badge diff-h">Hard</span></label>
  <label class="check-item"><input type="checkbox" data-ck="sd-leaderboard"><span class="check-name">Design a Real-Time Leaderboard</span><span class="diff-badge diff-m">Core</span></label>
</div>

<div class="alert key"><span class="alert-icon">🔑</span><strong>You are ready when</strong> you can solve a fresh medium in 15–20 minutes, state time and space complexity without thinking, and walk through any core system-design prompt — diagram, data model, and three bottlenecks — inside 30 minutes. Pattern recognition, not memorised solutions, is the finish line.</div>

</div><!-- end sec-body -->
</div>
`;

(function() {
  const main = document.getElementById('main');
  if (!main) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = _html_checklist.trim();
  const section = wrapper.firstElementChild;
  if (!section) return;
  main.appendChild(section);

  // ── Persist checkbox state in localStorage ────────────────────────────────
  const KEY = 'dssd-checklist-v1';
  const boxes = section.querySelectorAll('input[type="checkbox"][data-ck]');
  const doneEl = section.querySelector('#ck-done');
  const totalEl = section.querySelector('#ck-total');
  const meterEl = section.querySelector('#ck-meter');
  const resetBtn = section.querySelector('#ck-reset');

  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch (e) { state = {}; }

  function refresh() {
    let done = 0;
    boxes.forEach(b => { if (b.checked) done++; });
    if (doneEl) doneEl.textContent = done;
    if (totalEl) totalEl.textContent = boxes.length;
    if (meterEl) meterEl.style.width =
      (boxes.length ? (done / boxes.length) * 100 : 0) + '%';
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { /* storage may be unavailable — degrade gracefully */ }
  }

  boxes.forEach(b => {
    b.checked = !!state[b.dataset.ck];
    b.addEventListener('change', () => {
      if (b.checked) state[b.dataset.ck] = true;
      else delete state[b.dataset.ck];
      save();
      refresh();
    });
  });

  if (resetBtn) resetBtn.addEventListener('click', () => {
    state = {};
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    boxes.forEach(b => { b.checked = false; });
    refresh();
  });

  refresh();
})();
