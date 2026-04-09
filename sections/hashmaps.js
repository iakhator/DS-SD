// Section: hashmaps
// Auto-extracted from index.html
const _html_hashmaps = String.raw`
<div id="sec-hashmaps" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Foundation · 03</span></div><div class="sec-title">Hash Maps & Sets</div></div>
<div class="sec-lead">Hash maps are the most powerful tool in your arsenal. They trade O(n) space for O(1) average-case lookup, insert, and delete. Whenever you find yourself doing nested loops to check membership or count frequencies, a hash map is the fix.</div>
<div class="sec-divider"></div>
<div class="sec-body">

<div class="h2">How Hashing Works</div>
<div class="diag"><pre>
Key → hash(key) → index in array (bucket)

"name" → hashFn → 42 → table[42] = "Ada"
"age"  → hashFn → 17 → table[17] = 30
"city" → hashFn → 42 → COLLISION! → chain or probe

Collision resolution:
  Chaining:  table[42] → ["Ada"] → ["Bob"]  (linked list)
  Open probe: try 43, 44... (linear probing)

Load factor = n / capacity
  > 0.7 → resize (rehash everything) → O(n) amortized → still O(1)
</pre></div>

<div class="h2">Frequency Counting Pattern</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','hash-patterns')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','hash-patterns')">Python</button></div>
<div class="lang-panel active" id="hash-patterns-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Core Hash Map Patterns</span></div><pre><span class="cmt">// Pattern 1: Frequency count</span>
<span class="kw">function</span> <span class="fn">charFreq</span>(s) {
  <span class="kw">const</span> freq = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> s)
    freq.<span class="fn">set</span>(c, (freq.<span class="fn">get</span>(c) ?? <span class="num">0</span>) + <span class="num">1</span>)
  <span class="kw">return</span> freq
}

<span class="cmt">// Pattern 2: Grouping by key</span>
<span class="kw">function</span> <span class="fn">groupAnagrams</span>(strs) {
  <span class="kw">const</span> groups = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">const</span> s <span class="kw">of</span> strs) {
    <span class="kw">const</span> key = [...s].<span class="fn">sort</span>().<span class="fn">join</span>(<span class="str">''</span>)  <span class="cmt">// canonical form</span>
    <span class="kw">if</span> (!groups.<span class="fn">has</span>(key)) groups.<span class="fn">set</span>(key, [])
    groups.<span class="fn">get</span>(key).<span class="fn">push</span>(s)
  }
  <span class="kw">return</span> [...groups.<span class="fn">values</span>()]
}

<span class="cmt">// Pattern 3: Complement lookup (Two Sum style)</span>
<span class="kw">function</span> <span class="fn">complementLookup</span>(nums, target) {
  <span class="kw">const</span> seen = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;nums.length; i++) {
    <span class="kw">if</span> (seen.<span class="fn">has</span>(target - nums[i])) <span class="kw">return</span> [seen.<span class="fn">get</span>(target-nums[i]), i]
    seen.<span class="fn">set</span>(nums[i], i)
  }
}

<span class="cmt">// Pattern 4: Counting distinct with sliding constraint</span>
<span class="cmt">// (see Sliding Window section)</span></pre></div>
</div>
<div class="lang-panel" id="hash-patterns-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Core Patterns (Python)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> Counter, defaultdict

<span class="py-cmt"># Pattern 1: Counter (frequency) — built-in</span>
freq = Counter(<span class="py-str">"hello"</span>)   <span class="py-cmt"># {'l': 2, 'h': 1, 'e': 1, 'o': 1}</span>
freq.most_common(<span class="py-num">2</span>)       <span class="py-cmt"># top 2 by frequency</span>

<span class="py-cmt"># Pattern 2: Group anagrams</span>
<span class="py-kw">def</span> <span class="py-fn">group_anagrams</span>(strs):
    groups = defaultdict(list)
    <span class="py-kw">for</span> s <span class="py-kw">in</span> strs:
        groups[<span class="py-fn">tuple</span>(<span class="py-fn">sorted</span>(s))].append(s)
    <span class="py-kw">return</span> <span class="py-fn">list</span>(groups.values())

<span class="py-cmt"># Pattern 3: defaultdict avoids KeyError</span>
dd = defaultdict(<span class="py-fn">int</span>)    <span class="py-cmt"># missing keys default to 0</span>
dd[<span class="py-str">'a'</span>] += <span class="py-num">1</span>            <span class="py-cmt"># no KeyError</span></pre></div>
</div>

<div class="h2">5 Problems — Hash Maps & Sets</div>
<div class="problems-grid">

<problem-card num="P1" title="Valid Anagram" difficulty="easy" tags="HashMap,String">
<div class="prob-desc">Given two strings s and t, return true if t is an anagram of s (same characters, same frequency).</div>
<div class="prob-example">Input: s="anagram", t="nagaram" → true | s="rat", t="car" → false</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Frequency map compare <span class="approach-tc">O(n) time · O(1) space (26 letters)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','hash-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','hash-p1')">Python</button></div>
<div class="lang-panel active" id="hash-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Frequency Map</span></div><pre><span class="kw">function</span> <span class="fn">isAnagram</span>(s, t) {
  <span class="kw">if</span> (s.length !== t.length) <span class="kw">return</span> <span class="kw">false</span>
  <span class="kw">const</span> freq = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> s) freq.<span class="fn">set</span>(c, (freq.<span class="fn">get</span>(c) ?? <span class="num">0</span>) + <span class="num">1</span>)
  <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> t) {
    <span class="kw">if</span> (!freq.<span class="fn">get</span>(c)) <span class="kw">return</span> <span class="kw">false</span>
    freq.<span class="fn">set</span>(c, freq.<span class="fn">get</span>(c) - <span class="num">1</span>)
  }
  <span class="kw">return</span> <span class="kw">true</span>
}</pre></div></div>
<div class="lang-panel" id="hash-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Counter</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> Counter
<span class="py-kw">def</span> <span class="py-fn">is_anagram</span>(s, t):
    <span class="py-kw">return</span> Counter(s) == Counter(t)</pre></div>
</div>
</problem-card>

<problem-card num="P2" title="Top K Frequent Elements" difficulty="medium" tags="HashMap,Bucket Sort">
<div class="prob-desc">Given an integer array and integer k, return the k most frequent elements. Output can be in any order.</div>
<div class="prob-example">Input: [1,1,1,2,2,3], k=2 → [1,2]</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Sort by frequency <span class="approach-tc">O(n log n)</span></div></div>
  <div class="approach best"><div class="approach-name">✅ Bucket Sort <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Bucket index = frequency. Max frequency ≤ n, so we need n buckets. Read from high bucket down.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','hash-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','hash-p2')">Python</button></div>
<div class="lang-panel active" id="hash-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Bucket Sort — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">topKFrequent</span>(nums, k) {
  <span class="kw">const</span> freq = <span class="kw">new</span> <span class="cls">Map</span>()
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) freq.<span class="fn">set</span>(n, (freq.<span class="fn">get</span>(n) ?? <span class="num">0</span>) + <span class="num">1</span>)
  <span class="cmt">// buckets[i] = list of nums with frequency i</span>
  <span class="kw">const</span> buckets = <span class="kw">new</span> <span class="cls">Array</span>(nums.length + <span class="num">1</span>).<span class="fn">fill</span>(<span class="kw">null</span>).<span class="fn">map</span>(() => [])
  <span class="kw">for</span> (<span class="kw">const</span> [num, count] <span class="kw">of</span> freq) buckets[count].<span class="fn">push</span>(num)
  <span class="kw">const</span> res = []
  <span class="kw">for</span> (<span class="kw">let</span> i = buckets.length-<span class="num">1</span>; i &gt;= <span class="num">1</span> && res.length &lt; k; i--)
    res.<span class="fn">push</span>(...buckets[i])
  <span class="kw">return</span> res.<span class="fn">slice</span>(<span class="num">0</span>, k)
}</pre></div></div>
<div class="lang-panel" id="hash-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Counter + heapq — O(n log k)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> Counter
<span class="py-kw">def</span> <span class="py-fn">top_k_frequent</span>(nums, k):
    <span class="py-kw">return</span> [x <span class="py-kw">for</span> x, _ <span class="py-kw">in</span> Counter(nums).most_common(k)]</pre></div>
</div>
</problem-card>

<problem-card num="P3" title="Longest Consecutive Sequence" difficulty="medium" tags="HashSet,O(n)">
<div class="prob-desc">Given an unsorted array of integers, find the length of the longest consecutive sequence. Must run in O(n).</div>
<div class="prob-example">Input: [100,4,200,1,3,2] → 4 (sequence [1,2,3,4])</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ HashSet + only start from sequence beginning <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Only start counting when num-1 is NOT in set (i.e., num is sequence start). Count up. Each element visited at most twice.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','hash-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','hash-p3')">Python</button></div>
<div class="lang-panel active" id="hash-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashSet — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">longestConsecutive</span>(nums) {
  <span class="kw">const</span> set = <span class="kw">new</span> <span class="cls">Set</span>(nums)
  <span class="kw">let</span> best = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> set) {
    <span class="kw">if</span> (!set.<span class="fn">has</span>(n - <span class="num">1</span>)) {  <span class="cmt">// only start at sequence beginning</span>
      <span class="kw">let</span> curr = n, len = <span class="num">1</span>
      <span class="kw">while</span> (set.<span class="fn">has</span>(curr + <span class="num">1</span>)) { curr++; len++ }
      best = <span class="cls">Math</span>.<span class="fn">max</span>(best, len)
    }
  }
  <span class="kw">return</span> best
}</pre></div></div>
<div class="lang-panel" id="hash-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">HashSet — O(n)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">longest_consecutive</span>(nums):
    s, best = <span class="py-fn">set</span>(nums), <span class="py-num">0</span>
    <span class="py-kw">for</span> n <span class="py-kw">in</span> s:
        <span class="py-kw">if</span> n - <span class="py-num">1</span> <span class="py-kw">not in</span> s:
            curr, length = n, <span class="py-num">1</span>
            <span class="py-kw">while</span> curr + <span class="py-num">1</span> <span class="py-kw">in</span> s: curr += <span class="py-num">1</span>; length += <span class="py-num">1</span>
            best = <span class="py-fn">max</span>(best, length)
    <span class="py-kw">return</span> best</pre></div>
</div>
</problem-card>

<problem-card num="P4" title="Subarray Sum Equals K" difficulty="medium" tags="Prefix Sum,HashMap">
<div class="prob-desc">Given an integer array and integer k, return the total number of subarrays whose sum equals k.</div>
<div class="prob-example">Input: [1,1,1], k=2 → 2 (subarrays [1,1] at indices 0-1 and 1-2)</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Prefix sum + HashMap <span class="approach-tc">O(n) time · O(n) space</span></div><p style="font-size:12px;color:var(--muted)">Track prefix sums. If prefixSum - k exists in the map, we found subarrays. Count occurrences of each prefix sum seen so far.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','hash-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','hash-p4')">Python</button></div>
<div class="lang-panel active" id="hash-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Prefix Sum HashMap — O(n)</span></div><pre><span class="kw">function</span> <span class="fn">subarraySum</span>(nums, k) {
  <span class="kw">const</span> prefixCount = <span class="kw">new</span> <span class="cls">Map</span>([[<span class="num">0</span>, <span class="num">1</span>]])  <span class="cmt">// prefix 0 seen once</span>
  <span class="kw">let</span> sum = <span class="num">0</span>, count = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> n <span class="kw">of</span> nums) {
    sum += n
    <span class="cmt">// If (sum - k) was a prefix sum, subarray between then and now = k</span>
    count += prefixCount.<span class="fn">get</span>(sum - k) ?? <span class="num">0</span>
    prefixCount.<span class="fn">set</span>(sum, (prefixCount.<span class="fn">get</span>(sum) ?? <span class="num">0</span>) + <span class="num">1</span>)
  }
  <span class="kw">return</span> count
}</pre></div></div>
<div class="lang-panel" id="hash-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Prefix Sum HashMap — O(n)</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> defaultdict
<span class="py-kw">def</span> <span class="py-fn">subarray_sum</span>(nums, k):
    prefix = defaultdict(<span class="py-fn">int</span>)
    prefix[<span class="py-num">0</span>] = <span class="py-num">1</span>
    total = s = <span class="py-num">0</span>
    <span class="py-kw">for</span> n <span class="py-kw">in</span> nums:
        s += n
        total += prefix[s - k]
        prefix[s] += <span class="py-num">1</span>
    <span class="py-kw">return</span> total</pre></div>
</div>
</problem-card>

<problem-card num="P5" title="LRU Cache" difficulty="hard" tags="HashMap,Doubly Linked List">
<div class="prob-desc">Design a data structure that follows LRU (Least Recently Used) cache. Implement get(key) and put(key, value) both in O(1).</div>
<div class="prob-example">LRUCache(2) → put(1,1), put(2,2), get(1)=1, put(3,3) → evicts key 2, get(2)=-1</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ HashMap + Doubly Linked List <span class="approach-tc">O(1) get/put · O(capacity) space</span></div><p style="font-size:12px;color:var(--muted)">HashMap for O(1) key lookup. Doubly linked list to maintain recency order (most recent at head). On access: move node to head. On evict: remove tail.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','hash-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','hash-p5')">Python</button></div>
<div class="lang-panel active" id="hash-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">LRU Cache — HashMap + DLL</span></div><pre><span class="kw">class</span> <span class="cls">LRUCache</span> {
  <span class="fn">constructor</span>(capacity) {
    <span class="kw">this</span>.cap = capacity
    <span class="kw">this</span>.map = <span class="kw">new</span> <span class="cls">Map</span>()  <span class="cmt">// key → node</span>
    <span class="cmt">// Dummy head/tail for easy edge case handling</span>
    <span class="kw">this</span>.head = { key: <span class="num">0</span>, val: <span class="num">0</span>, prev: <span class="kw">null</span>, next: <span class="kw">null</span> }
    <span class="kw">this</span>.tail = { key: <span class="num">0</span>, val: <span class="num">0</span>, prev: <span class="kw">null</span>, next: <span class="kw">null</span> }
    <span class="kw">this</span>.head.next = <span class="kw">this</span>.tail
    <span class="kw">this</span>.tail.prev = <span class="kw">this</span>.head
  }
  <span class="fn">_remove</span>(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }
  <span class="fn">_insertFront</span>(node) {
    node.next = <span class="kw">this</span>.head.next
    node.prev = <span class="kw">this</span>.head
    <span class="kw">this</span>.head.next.prev = node
    <span class="kw">this</span>.head.next = node
  }
  <span class="fn">get</span>(key) {
    <span class="kw">const</span> node = <span class="kw">this</span>.map.<span class="fn">get</span>(key)
    <span class="kw">if</span> (!node) <span class="kw">return</span> -<span class="num">1</span>
    <span class="kw">this</span>.<span class="fn">_remove</span>(node); <span class="kw">this</span>.<span class="fn">_insertFront</span>(node)  <span class="cmt">// move to front (most recent)</span>
    <span class="kw">return</span> node.val
  }
  <span class="fn">put</span>(key, val) {
    <span class="kw">if</span> (<span class="kw">this</span>.map.<span class="fn">has</span>(key)) <span class="kw">this</span>.<span class="fn">_remove</span>(<span class="kw">this</span>.map.<span class="fn">get</span>(key))
    <span class="kw">const</span> node = { key, val, prev: <span class="kw">null</span>, next: <span class="kw">null</span> }
    <span class="kw">this</span>.map.<span class="fn">set</span>(key, node)
    <span class="kw">this</span>.<span class="fn">_insertFront</span>(node)
    <span class="kw">if</span> (<span class="kw">this</span>.map.size > <span class="kw">this</span>.cap) {
      <span class="kw">const</span> lru = <span class="kw">this</span>.tail.prev       <span class="cmt">// evict least recently used</span>
      <span class="kw">this</span>.<span class="fn">_remove</span>(lru); <span class="kw">this</span>.map.<span class="fn">delete</span>(lru.key)
    }
  }
}</pre></div></div>
<div class="lang-panel" id="hash-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">LRU — OrderedDict trick</span></div><pre><span class="py-kw">from</span> collections <span class="py-kw">import</span> OrderedDict
<span class="py-kw">class</span> <span class="py-cls">LRUCache</span>:
    <span class="py-kw">def</span> <span class="py-fn">__init__</span>(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()
    <span class="py-kw">def</span> <span class="py-fn">get</span>(self, key):
        <span class="py-kw">if</span> key <span class="py-kw">not in</span> self.cache: <span class="py-kw">return</span> -<span class="py-num">1</span>
        self.cache.move_to_end(key)   <span class="py-cmt"># mark as recently used</span>
        <span class="py-kw">return</span> self.cache[key]
    <span class="py-kw">def</span> <span class="py-fn">put</span>(self, key, value):
        <span class="py-kw">if</span> key <span class="py-kw">in</span> self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        <span class="py-kw">if</span> <span class="py-fn">len</span>(self.cache) > self.cap:
            self.cache.popitem(last=<span class="py-kw">False</span>)  <span class="py-cmt"># evict LRU (first item)</span></pre></div>
</div>
</problem-card>

</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_hashmaps.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
