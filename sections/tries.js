// Section: tries
// Auto-extracted from index.html
const _html_tries = String.raw`
<div id="sec-tries" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Advanced · 20</span></div><div class="sec-title">Tries (Prefix Trees)</div></div>
<div class="sec-lead">A trie stores strings where each node represents a character. It enables O(L) prefix search, word lookup, and autocomplete where L is the word length. Used in search engines, spell checkers, and IP routing tables.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine an autocomplete dropdown on your phone's keyboard. As you type each letter, the suggestions narrow instantly. A trie (rhymes with "try," short for re<em>trie</em>val) is the exact data structure powering that experience. Rather than storing each word as an isolated string, a trie shares common prefixes: the words "cat," "car," and "card" all share a path through the root → <code>c</code> → <code>a</code>, then branch at <code>t</code> and <code>r</code>. You can think of it as a decision tree where each level represents one character position in a string.</p>
<p>The reason tries are powerful is that prefix operations — "does any word start with <code>pre</code>?" or "give me all completions of <code>sea</code>" — cost only O(L) time where L is the length of the prefix, regardless of how many words are stored. A hash map storing all words can answer exact-match queries in O(L) too, but it cannot efficiently answer prefix queries without scanning every key. The trie's tree structure encodes prefix relationships structurally, so a single traversal from root to a node automatically validates the entire prefix.</p>
<p>Reach for a trie when your problem involves: prefix matching, autocomplete, dictionary word validation, or XOR maximization on binary representations (using a binary trie). A common misconception is that tries are always memory-efficient — in the worst case (no shared prefixes, large alphabet) they can use far more memory than a hash set. The key trade-off is fast prefix operations at the cost of extra space. Also watch out for confusing <code>isEnd = true</code> (a complete word was inserted here) with merely "a node exists at this position" (only a prefix ends here, not a full word).</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Every path from the root to a node marked <code>isEnd = true</code> spells out a complete inserted word. Every path to any node — <code>isEnd</code> or not — spells out a valid prefix. These two distinct meanings live in the same structure.</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','trie-impl')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','trie-impl')">Python</button></div>
<div class="lang-panel active" id="trie-impl-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Trie Implementation</span></div><pre><span class="kw">class</span> <span class="cls">TrieNode</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.children = {}   <span class="cmt">// char → TrieNode</span>
    <span class="kw">this</span>.isEnd = <span class="kw">false</span>  <span class="cmt">// marks end of a word</span>
  }
}

<span class="kw">class</span> <span class="cls">Trie</span> {
  <span class="fn">constructor</span>() { <span class="kw">this</span>.root = <span class="kw">new</span> <span class="cls">TrieNode</span>() }
  
  <span class="fn">insert</span>(word) {
    <span class="kw">let</span> node = <span class="kw">this</span>.root
    <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> word) {
      <span class="kw">if</span> (!node.children[c]) node.children[c] = <span class="kw">new</span> <span class="cls">TrieNode</span>()
      node = node.children[c]
    }
    node.isEnd = <span class="kw">true</span>
  }
  
  <span class="fn">search</span>(word) {
    <span class="kw">let</span> node = <span class="kw">this</span>.root
    <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> word) {
      <span class="kw">if</span> (!node.children[c]) <span class="kw">return</span> <span class="kw">false</span>
      node = node.children[c]
    }
    <span class="kw">return</span> node.isEnd  <span class="cmt">// true only if full word was inserted</span>
  }
  
  <span class="fn">startsWith</span>(prefix) {
    <span class="kw">let</span> node = <span class="kw">this</span>.root
    <span class="kw">for</span> (<span class="kw">const</span> c <span class="kw">of</span> prefix) {
      <span class="kw">if</span> (!node.children[c]) <span class="kw">return</span> <span class="kw">false</span>
      node = node.children[c]
    }
    <span class="kw">return</span> <span class="kw">true</span>  <span class="cmt">// prefix exists (word may or may not be complete)</span>
  }
}</pre></div></div>
<div class="lang-panel" id="trie-impl-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Trie Implementation</span></div><pre><span class="py-kw">class</span> <span class="py-cls">TrieNode</span>:
    <span class="py-kw">def</span> <span class="py-fn">__init__</span>(self): self.children = {}; self.is_end = <span class="py-kw">False</span>

<span class="py-kw">class</span> <span class="py-cls">Trie</span>:
    <span class="py-kw">def</span> <span class="py-fn">__init__</span>(self): self.root = TrieNode()
    <span class="py-kw">def</span> <span class="py-fn">insert</span>(self, word):
        node = self.root
        <span class="py-kw">for</span> c <span class="py-kw">in</span> word:
            <span class="py-kw">if</span> c <span class="py-kw">not in</span> node.children: node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = <span class="py-kw">True</span>
    <span class="py-kw">def</span> <span class="py-fn">search</span>(self, word):
        node = self.root
        <span class="py-kw">for</span> c <span class="py-kw">in</span> word:
            <span class="py-kw">if</span> c <span class="py-kw">not in</span> node.children: <span class="py-kw">return</span> <span class="py-kw">False</span>
            node = node.children[c]
        <span class="py-kw">return</span> node.is_end
    <span class="py-kw">def</span> <span class="py-fn">starts_with</span>(self, prefix):
        node = self.root
        <span class="py-kw">for</span> c <span class="py-kw">in</span> prefix:
            <span class="py-kw">if</span> c <span class="py-kw">not in</span> node.children: <span class="py-kw">return</span> <span class="py-kw">False</span>
            node = node.children[c]
        <span class="py-kw">return</span> <span class="py-kw">True</span></pre></div></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_tries.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
