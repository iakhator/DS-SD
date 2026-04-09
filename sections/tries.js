// Section: tries
// Auto-extracted from index.html
const _html_tries = String.raw`
<div id="sec-tries" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Advanced · 20</span></div><div class="sec-title">Tries (Prefix Trees)</div></div>
<div class="sec-lead">A trie stores strings where each node represents a character. It enables O(L) prefix search, word lookup, and autocomplete where L is the word length. Used in search engines, spell checkers, and IP routing tables.</div>
<div class="sec-divider"></div>
<div class="sec-body">
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
