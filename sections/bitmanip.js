// Section: bitmanip
// Auto-extracted from index.html
const _html_bitmanip = String.raw`
<div id="sec-bitmanip" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Advanced · 22</span></div><div class="sec-title">Bit Manipulation</div></div>
<div class="sec-lead">Bit manipulation solves specific problems in O(1) space with very fast operations. It appears in systems programming, cryptography, and interview questions that seem hard but are trivial once you see the XOR trick.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Essential Operations</div>
<div class="diag"><pre>
x & y   → AND: both bits 1         5 & 3 = 101 & 011 = 001 = 1
x | y   → OR:  either bit 1        5 | 3 = 101 | 011 = 111 = 7
x ^ y   → XOR: exactly one bit 1   5 ^ 3 = 101 ^ 011 = 110 = 6
~x      → NOT: flip all bits       ~5 = -6 (two's complement)
x << n  → left shift (×2ⁿ)         5 << 1 = 10
x >> n  → right shift (÷2ⁿ)        5 >> 1 = 2

Key tricks:
  x ^ x = 0       ← XOR with itself cancels
  x ^ 0 = x       ← XOR with 0 is identity
  x & (x-1) = 0   ← x is power of 2 (removes lowest set bit)
  x & (-x)        ← isolates lowest set bit
  x & 1           ← check if odd
  x >> 1          ← divide by 2
</pre></div>

<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','bit-impl')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','bit-impl')">Python</button></div>
<div class="lang-panel active" id="bit-impl-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Common Bit Patterns</span></div><pre><span class="cmt">// Single number — XOR of all numbers, duplicates cancel</span>
<span class="kw">const</span> <span class="fn">singleNumber</span> = nums => nums.<span class="fn">reduce</span>((a,b)=>a^b, <span class="num">0</span>)

<span class="cmt">// Count set bits (Brian Kernighan)</span>
<span class="kw">const</span> <span class="fn">countBits</span> = n => { <span class="kw">let</span> c=<span class="num">0</span>; <span class="kw">while</span>(n){ n&=n-<span class="num">1</span>; c++ }; <span class="kw">return</span> c }

<span class="cmt">// Check if power of 2</span>
<span class="kw">const</span> <span class="fn">isPow2</span> = n => n>0 && (n&(n-<span class="num">1</span>))===<span class="num">0</span>

<span class="cmt">// Get/Set/Clear bit i</span>
<span class="kw">const</span> <span class="fn">getBit</span>   = (n,i) => (n>>i)&<span class="num">1</span>
<span class="kw">const</span> <span class="fn">setBit</span>   = (n,i) => n|(<span class="num">1</span>&lt;&lt;i)
<span class="kw">const</span> <span class="fn">clearBit</span> = (n,i) => n&~(<span class="num">1</span>&lt;&lt;i)

<span class="cmt">// Swap without temp</span>
<span class="kw">const</span> <span class="fn">xorSwap</span> = (a,b) => [a^=b, b^=a, a^=b]</pre></div></div>
<div class="lang-panel" id="bit-impl-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Common Bit Patterns</span></div><pre><span class="py-kw">from</span> functools <span class="py-kw">import</span> reduce
<span class="py-kw">import</span> operator

<span class="py-kw">def</span> <span class="py-fn">single_number</span>(nums): <span class="py-kw">return</span> reduce(operator.xor, nums)

<span class="py-kw">def</span> <span class="py-fn">count_bits</span>(n):
    c = <span class="py-num">0</span>
    <span class="py-kw">while</span> n: n &= n-<span class="py-num">1</span>; c+=<span class="py-num">1</span>
    <span class="py-kw">return</span> c

<span class="py-kw">def</span> <span class="py-fn">is_power_of_two</span>(n): <span class="py-kw">return</span> n > <span class="py-num">0</span> <span class="py-kw">and</span> (n & (n-<span class="py-num">1</span>)) == <span class="py-num">0</span>

<span class="py-cmt"># Python: bin(n).count('1') for popcount</span>
<span class="py-fn">bin</span>(<span class="py-num">255</span>).count(<span class="py-str">'1'</span>)  <span class="py-cmt"># → 8</span>
n.bit_count()           <span class="py-cmt"># Python 3.10+ built-in popcount</span></pre></div></div>
</div></div>
`;

(function() {
  const main = document.getElementById('main');
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_bitmanip.trim();
    const section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
})();
