// Section: dp2d
// Auto-extracted from index.html
import { autoWrapCodeLines, withCode, mountVisualizer, renderGrid } from '../components/viz-kit.js';

const _html_dp2d = String.raw`
<div id="sec-dp2d" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">DP · 18</span></div><div class="sec-title">DP — 2D & Grid Problems</div></div>
<div class="sec-lead">2D DP problems involve two sequences (strings, arrays) or a 2D grid. State is dp[i][j], usually meaning "answer for the first i elements of sequence 1 and first j elements of sequence 2." Classic problems: LCS, Edit Distance, Longest Common Substring.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine lining up two strings along the edges of a grid — one along the top, one along the left side — and filling each cell by asking: "what is the best answer considering the first <code>i</code> characters of string 1 and the first <code>j</code> characters of string 2?" This is the mental image for 2D DP. The table is not a mysterious structure; it is a systematic way of recording all pairwise sub-answers so you never recompute them. Each cell <code>dp[i][j]</code> represents a complete, self-contained sub-problem, and its value is derived from just three neighbors: the cell diagonally up-left (when characters match), directly above (skip a character from string 1), or directly left (skip a character from string 2).</p>
<p>2D DP solves problems where the answer depends on <strong>two independently varying dimensions</strong> — typically two sequences being aligned, or a 2D grid where you move from one corner to another. The power of the table is that it transforms an exponential alignment search into a tidy nested loop. Longest Common Subsequence, Edit Distance, and Coin Change (with items and capacity as the two axes) are all instances of the same underlying fill-the-table idea. The recurrence at a matching cell extends the diagonal; at a mismatching cell it takes the best of the adjacent cells, possibly adding a cost.</p>
<p>Reach for 2D DP when a problem compares or aligns two sequences, or asks for the minimum cost to transform one thing into another. One reliable signal is that the brute-force solution involves two nested loops with choices at each step. The most common misconception is conflating "subsequence" (characters need not be adjacent) with "substring" or "subarray" (characters must be contiguous) — the recurrence is different. For a subsequence, you always carry forward the best from prior rows and columns; for a substring, you reset to zero on a mismatch instead of inheriting from neighbors.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> The diagonal cell <code>dp[i-1][j-1]</code> represents "both characters consumed together" (a match or a substitution), <code>dp[i-1][j]</code> represents "skip a character in string 1," and <code>dp[i][j-1]</code> represents "skip a character in string 2." Every 2D sequence DP recurrence is a combination of these three moves — once you internalize that, any new 2D DP problem becomes a matter of assigning the right costs to each move.</div>
<div class="h2">2D DP Template</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp2d-template')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp2d-template')">Python</button></div>
<div class="lang-panel active" id="dp2d-template-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">2D DP Table Structure</span></div><pre><span class="cmt">// dp[i][j] = answer for s1[0..i-1] and s2[0..j-1]
// Base cases: dp[0][j] = 0 or j (empty s1), dp[i][0] = 0 or i (empty s2)
// Fill row by row, left to right
// At s1[i-1] === s2[j-1]: usually extend diagonal dp[i-1][j-1]
// At mismatch: usually take best of dp[i-1][j] or dp[i][j-1] (or +1)</span>

<span class="kw">const</span> m=s1.length, n=s2.length
<span class="kw">const</span> dp = <span class="cls">Array</span>.<span class="fn">from</span>({length:m+<span class="num">1</span>},()=><span class="kw">new</span> <span class="cls">Array</span>(n+<span class="num">1</span>).<span class="fn">fill</span>(<span class="num">0</span>))
<span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">1</span>;i&lt;=m;i++) <span class="kw">for</span> (<span class="kw">let</span> j=<span class="num">1</span>;j&lt;=n;j++) {
  <span class="kw">if</span> (s1[i-<span class="num">1</span>]===s2[j-<span class="num">1</span>]) dp[i][j] = dp[i-<span class="num">1</span>][j-<span class="num">1</span>] + <span class="num">1</span>
  <span class="kw">else</span> dp[i][j] = <span class="cls">Math</span>.<span class="fn">max</span>(dp[i-<span class="num">1</span>][j], dp[i][j-<span class="num">1</span>])
}</pre></div></div>
<div class="lang-panel" id="dp2d-template-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">2D DP Table (Python)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">dp_2d</span>(s1, s2):
    m, n = <span class="py-fn">len</span>(s1), <span class="py-fn">len</span>(s2)
    dp = [[<span class="py-num">0</span>]*(n+<span class="py-num">1</span>) <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(m+<span class="py-num">1</span>)]
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>, m+<span class="py-num">1</span>):
        <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>, n+<span class="py-num">1</span>):
            <span class="py-kw">if</span> s1[i-<span class="py-num">1</span>] == s2[j-<span class="py-num">1</span>]: dp[i][j] = dp[i-<span class="py-num">1</span>][j-<span class="py-num">1</span>] + <span class="py-num">1</span>
            <span class="py-kw">else</span>: dp[i][j] = <span class="py-fn">max</span>(dp[i-<span class="py-num">1</span>][j], dp[i][j-<span class="py-num">1</span>])
    <span class="py-kw">return</span> dp[m][n]</pre></div></div>

<div class="h2">5 Problems — 2D DP</div>
<div class="problems-grid">

<problem-card num="P1" title="Longest Common Subsequence" difficulty="medium" tags="2D DP,Classic">
<div class="prob-desc">Find the length of the longest subsequence common to both strings (not necessarily contiguous).</div>
<div class="prob-example">text1="abcde", text2="ace" → 3 ("ace")</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp2d-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp2d-p1')">Python</button></div>
<div class="lang-panel active" id="dp2d-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">LCS — O(mn)</span></div><pre><span class="kw">function</span> <span class="fn">longestCommonSubsequence</span>(t1, t2) {
  <span class="kw">const</span> m=t1.length, n=t2.length
  <span class="kw">const</span> dp=<span class="cls">Array</span>.<span class="fn">from</span>({length:m+<span class="num">1</span>},()=><span class="kw">new</span> <span class="cls">Array</span>(n+<span class="num">1</span>).<span class="fn">fill</span>(<span class="num">0</span>))
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">1</span>;i&lt;=m;i++) <span class="kw">for</span>(<span class="kw">let</span> j=<span class="num">1</span>;j&lt;=n;j++)
    dp[i][j]=t1[i-<span class="num">1</span>]===t2[j-<span class="num">1</span>]?dp[i-<span class="num">1</span>][j-<span class="num">1</span>]+<span class="num">1</span>:<span class="cls">Math</span>.<span class="fn">max</span>(dp[i-<span class="num">1</span>][j],dp[i][j-<span class="num">1</span>])
  <span class="kw">return</span> dp[m][n]
}</pre></div></div>
<div class="lang-panel" id="dp2d-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">LCS — O(mn)</span></div><pre><span class="py-kw">def</span> <span class="py-fn">lcs</span>(t1, t2):
    m, n = <span class="py-fn">len</span>(t1), <span class="py-fn">len</span>(t2)
    dp = [[<span class="py-num">0</span>]*(n+<span class="py-num">1</span>) <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(m+<span class="py-num">1</span>)]
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,m+<span class="py-num">1</span>):
        <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,n+<span class="py-num">1</span>):
            dp[i][j] = dp[i-<span class="py-num">1</span>][j-<span class="py-num">1</span>]+<span class="py-num">1</span> <span class="py-kw">if</span> t1[i-<span class="py-num">1</span>]==t2[j-<span class="py-num">1</span>] <span class="py-kw">else</span> <span class="py-fn">max</span>(dp[i-<span class="py-num">1</span>][j],dp[i][j-<span class="py-num">1</span>])
    <span class="py-kw">return</span> dp[m][n]</pre></div>
</div>
<algo-visualizer id="viz-dp2d-p1" title="LCS Table — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Edit Distance (Levenshtein)" difficulty="hard" tags="2D DP,Classic">
<div class="prob-desc">Given two strings, find the minimum number of operations (insert, delete, replace) to convert word1 to word2.</div>
<div class="prob-example">word1="horse", word2="ros" → 3</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ dp[i][j] = edit distance between word1[0..i-1] and word2[0..j-1] <span class="approach-tc">O(mn)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp2d-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp2d-p2')">Python</button></div>
<div class="lang-panel active" id="dp2d-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Edit Distance DP</span></div><pre><span class="kw">function</span> <span class="fn">minDistance</span>(w1, w2) {
  <span class="kw">const</span> m=w1.length, n=w2.length
  <span class="kw">const</span> dp=<span class="cls">Array</span>.<span class="fn">from</span>({length:m+<span class="num">1</span>},(_,i)=><span class="cls">Array</span>.<span class="fn">from</span>({length:n+<span class="num">1</span>},(_,j)=>i||j))
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">1</span>;i&lt;=m;i++) <span class="kw">for</span>(<span class="kw">let</span> j=<span class="num">1</span>;j&lt;=n;j++)
    dp[i][j]=w1[i-<span class="num">1</span>]===w2[j-<span class="num">1</span>]?dp[i-<span class="num">1</span>][j-<span class="num">1</span>]:<span class="num">1</span>+<span class="cls">Math</span>.<span class="fn">min</span>(dp[i-<span class="num">1</span>][j],dp[i][j-<span class="num">1</span>],dp[i-<span class="num">1</span>][j-<span class="num">1</span>])
  <span class="kw">return</span> dp[m][n]
}</pre></div></div>
<div class="lang-panel" id="dp2d-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Edit Distance DP</span></div><pre><span class="py-kw">def</span> <span class="py-fn">min_distance</span>(w1, w2):
    m, n = <span class="py-fn">len</span>(w1), <span class="py-fn">len</span>(w2)
    dp = [[i+j <span class="py-kw">if</span> (i==<span class="py-num">0</span> <span class="py-kw">or</span> j==<span class="py-num">0</span>) <span class="py-kw">else</span> <span class="py-num">0</span> <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(n+<span class="py-num">1</span>)] <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(m+<span class="py-num">1</span>)]
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,m+<span class="py-num">1</span>):
        <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,n+<span class="py-num">1</span>):
            <span class="py-kw">if</span> w1[i-<span class="py-num">1</span>]==w2[j-<span class="py-num">1</span>]: dp[i][j]=dp[i-<span class="py-num">1</span>][j-<span class="py-num">1</span>]
            <span class="py-kw">else</span>: dp[i][j]=<span class="py-num">1</span>+<span class="py-fn">min</span>(dp[i-<span class="py-num">1</span>][j],dp[i][j-<span class="py-num">1</span>],dp[i-<span class="py-num">1</span>][j-<span class="py-num">1</span>])
    <span class="py-kw">return</span> dp[m][n]</pre></div>
</div>
<algo-visualizer id="viz-dp2d-p2" title="Edit Distance Table — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Maximal Square" difficulty="medium" tags="2D DP,Grid">
<div class="prob-desc">In a binary matrix, find the largest square of 1s and return its area.</div>
<div class="prob-example">Matrix: [["1","0","1","0"],["1","0","1","1"],["1","1","1","1"],["1","0","0","1"]] → 4</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ dp[i][j] = side length of largest square ending at (i,j) <span class="approach-tc">O(mn) time · O(mn) space</span></div><p style="font-size:12px;color:var(--muted)">If cell is '1': dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp2d-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp2d-p3')">Python</button></div>
<div class="lang-panel active" id="dp2d-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Maximal Square DP</span></div><pre><span class="kw">function</span> <span class="fn">maximalSquare</span>(matrix) {
  <span class="kw">const</span> R=matrix.length, C=matrix[<span class="num">0</span>].length
  <span class="kw">const</span> dp=<span class="cls">Array</span>.<span class="fn">from</span>({length:R+<span class="num">1</span>},()=><span class="kw">new</span> <span class="cls">Array</span>(C+<span class="num">1</span>).<span class="fn">fill</span>(<span class="num">0</span>))
  <span class="kw">let</span> max=<span class="num">0</span>
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">1</span>;i&lt;=R;i++) <span class="kw">for</span>(<span class="kw">let</span> j=<span class="num">1</span>;j&lt;=C;j++) {
    <span class="kw">if</span>(matrix[i-<span class="num">1</span>][j-<span class="num">1</span>]===<span class="str">'1'</span>) {
      dp[i][j]=<span class="cls">Math</span>.<span class="fn">min</span>(dp[i-<span class="num">1</span>][j],dp[i][j-<span class="num">1</span>],dp[i-<span class="num">1</span>][j-<span class="num">1</span>])+<span class="num">1</span>
      max=<span class="cls">Math</span>.<span class="fn">max</span>(max,dp[i][j])
    }
  }
  <span class="kw">return</span> max*max
}</pre></div></div>
<div class="lang-panel" id="dp2d-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Maximal Square</span></div><pre><span class="py-kw">def</span> <span class="py-fn">maximal_square</span>(matrix):
    R, C = <span class="py-fn">len</span>(matrix), <span class="py-fn">len</span>(matrix[<span class="py-num">0</span>])
    dp = [[<span class="py-num">0</span>]*(C+<span class="py-num">1</span>) <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(R+<span class="py-num">1</span>)]; best = <span class="py-num">0</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,R+<span class="py-num">1</span>):
        <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,C+<span class="py-num">1</span>):
            <span class="py-kw">if</span> matrix[i-<span class="py-num">1</span>][j-<span class="py-num">1</span>] == <span class="py-str">'1'</span>:
                dp[i][j] = <span class="py-fn">min</span>(dp[i-<span class="py-num">1</span>][j], dp[i][j-<span class="py-num">1</span>], dp[i-<span class="py-num">1</span>][j-<span class="py-num">1</span>]) + <span class="py-num">1</span>
                best = <span class="py-fn">max</span>(best, dp[i][j])
    <span class="py-kw">return</span> best * best</pre></div>
</div>
<algo-visualizer id="viz-dp2d-p3" title="Maximal Square DP — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Distinct Subsequences" difficulty="hard" tags="2D DP">
<div class="prob-desc">Count distinct subsequences of string s that equal string t.</div>
<div class="prob-example">s="rabbbit", t="rabbit" → 3 (three ways to choose which 'b' to skip)</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp2d-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp2d-p4')">Python</button></div>
<div class="lang-panel active" id="dp2d-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Distinct Subsequences</span></div><pre><span class="kw">function</span> <span class="fn">numDistinct</span>(s, t) {
  <span class="kw">const</span> m=s.length, n=t.length
  <span class="kw">const</span> dp=<span class="cls">Array</span>.<span class="fn">from</span>({length:m+<span class="num">1</span>},()=><span class="kw">new</span> <span class="cls">Array</span>(n+<span class="num">1</span>).<span class="fn">fill</span>(<span class="num">0</span>))
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">0</span>;i&lt;=m;i++) dp[i][<span class="num">0</span>]=<span class="num">1</span>   <span class="cmt">// empty t is always a sub of any s</span>
  <span class="kw">for</span>(<span class="kw">let</span> i=<span class="num">1</span>;i&lt;=m;i++) <span class="kw">for</span>(<span class="kw">let</span> j=<span class="num">1</span>;j&lt;=n;j++) {
    dp[i][j]=dp[i-<span class="num">1</span>][j]                          <span class="cmt">// skip s[i-1]</span>
    <span class="kw">if</span>(s[i-<span class="num">1</span>]===t[j-<span class="num">1</span>]) dp[i][j]+=dp[i-<span class="num">1</span>][j-<span class="num">1</span>]  <span class="cmt">// use s[i-1]</span>
  }
  <span class="kw">return</span> dp[m][n]
}</pre></div></div>
<div class="lang-panel" id="dp2d-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Distinct Subsequences</span></div><pre><span class="py-kw">def</span> <span class="py-fn">num_distinct</span>(s, t):
    m, n = <span class="py-fn">len</span>(s), <span class="py-fn">len</span>(t)
    dp = [[<span class="py-num">0</span>]*(n+<span class="py-num">1</span>) <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(m+<span class="py-num">1</span>)]
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(m+<span class="py-num">1</span>): dp[i][<span class="py-num">0</span>] = <span class="py-num">1</span>
    <span class="py-kw">for</span> i <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,m+<span class="py-num">1</span>):
        <span class="py-kw">for</span> j <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">1</span>,n+<span class="py-num">1</span>):
            dp[i][j] = dp[i-<span class="py-num">1</span>][j]
            <span class="py-kw">if</span> s[i-<span class="py-num">1</span>]==t[j-<span class="py-num">1</span>]: dp[i][j] += dp[i-<span class="py-num">1</span>][j-<span class="py-num">1</span>]
    <span class="py-kw">return</span> dp[m][n]</pre></div>
</div>
<algo-visualizer id="viz-dp2d-p4" title="Distinct Subsequences — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Burst Balloons (Interval DP)" difficulty="hard" tags="Interval DP,Hard">
<div class="prob-desc">Given an array of balloons each with a value. If you burst balloon i you get nums[i-1]*nums[i]*nums[i+1] coins. Find max coins to burst all balloons.</div>
<div class="prob-example">Input: [3,1,5,8] → 167</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Interval DP: think of which balloon to burst LAST in a range, not first <span class="approach-tc">O(n³)</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','dp2d-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','dp2d-p5')">Python</button></div>
<div class="lang-panel active" id="dp2d-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Interval DP</span></div><pre><span class="kw">function</span> <span class="fn">maxCoins</span>(nums) {
  nums = [<span class="num">1</span>, ...nums, <span class="num">1</span>]  <span class="cmt">// pad boundaries</span>
  <span class="kw">const</span> n=nums.length
  <span class="kw">const</span> dp=<span class="cls">Array</span>.<span class="fn">from</span>({length:n},()=><span class="kw">new</span> <span class="cls">Array</span>(n).<span class="fn">fill</span>(<span class="num">0</span>))
  <span class="kw">for</span>(<span class="kw">let</span> len=<span class="num">2</span>;len&lt;n;len++) {
    <span class="kw">for</span>(<span class="kw">let</span> l=<span class="num">0</span>;l&lt;n-len;l++) {
      <span class="kw">const</span> r=l+len
      <span class="kw">for</span>(<span class="kw">let</span> k=l+<span class="num">1</span>;k&lt;r;k++)  <span class="cmt">// k = last balloon burst in (l,r)</span>
        dp[l][r]=<span class="cls">Math</span>.<span class="fn">max</span>(dp[l][r], dp[l][k]+dp[k][r]+nums[l]*nums[k]*nums[r])
    }
  }
  <span class="kw">return</span> dp[<span class="num">0</span>][n-<span class="num">1</span>]
}</pre></div></div>
<div class="lang-panel" id="dp2d-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Interval DP</span></div><pre><span class="py-kw">def</span> <span class="py-fn">max_coins</span>(nums):
    nums = [<span class="py-num">1</span>] + nums + [<span class="py-num">1</span>]
    n = <span class="py-fn">len</span>(nums)
    dp = [[<span class="py-num">0</span>]*n <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(n)]
    <span class="py-kw">for</span> length <span class="py-kw">in</span> <span class="py-fn">range</span>(<span class="py-num">2</span>, n):
        <span class="py-kw">for</span> l <span class="py-kw">in</span> <span class="py-fn">range</span>(n - length):
            r = l + length
            <span class="py-kw">for</span> k <span class="py-kw">in</span> <span class="py-fn">range</span>(l+<span class="py-num">1</span>, r):
                dp[l][r] = <span class="py-fn">max</span>(dp[l][r], dp[l][k]+dp[k][r]+nums[l]*nums[k]*nums[r])
    <span class="py-kw">return</span> dp[<span class="py-num">0</span>][n-<span class="py-num">1</span>]</pre></div>
</div>
<algo-visualizer id="viz-dp2d-p5" title="Interval DP — trace"></algo-visualizer>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_dp2d.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the 2D DP problems ───────────
function wireVisualizers() {
  // ── P1: Longest Common Subsequence ──────────────────────────────────────
  function traceLCS(t1, t2) {
    const m = t1.length, n = t2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const steps = [{ dp: dp.map(r => [...r]), i: 0, j: 0, note: 'Base row/col = 0 (empty string has no common subsequence).', line: 3, pyLine: 3 }];
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const match = t1[i - 1] === t2[j - 1];
        dp[i][j] = match ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({ dp: dp.map(r => [...r]), i, j, match,
          note: `(${i},${j}): '${t1[i - 1]}' vs '${t2[j - 1]}' → ${match ? `match → diagonal+1 = ${dp[i][j]}` : `no match → max(up,left) = ${dp[i][j]}`}.`, line: 5, pyLine: 6 });
      }
    }
    steps.push({ dp: dp.map(r => [...r]), i: m, j: n, final: true, note: `Done. LCS length = ${dp[m][n]}.`, line: 6, pyLine: 7 });
    return steps;
  }

  function renderLCS() {
    return (stage, step) => {
      stage.innerHTML = renderGrid(step.dp, (v, r, c) => {
        if (step.final) return (r === step.i && c === step.j) ? 'match' : '';
        if (r === step.i && c === step.j) return step.match ? 'match' : 'cur';
        return '';
      }, 34);
    };
  }

  // ── P2: Edit Distance (Levenshtein) ─────────────────────────────────────
  function traceMinDistance(w1, w2) {
    const m = w1.length, n = w2.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i || j));
    const steps = [{ dp: dp.map(r => [...r]), i: 0, j: 0, note: 'Base row/col = distance to/from empty string.', line: 3, pyLine: 3 }];
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const match = w1[i - 1] === w2[j - 1];
        dp[i][j] = match ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        steps.push({ dp: dp.map(r => [...r]), i, j, match,
          note: `(${i},${j}): '${w1[i - 1]}' vs '${w2[j - 1]}' → ${match ? `match → copy diagonal = ${dp[i][j]}` : `mismatch → 1+min(up,left,diag) = ${dp[i][j]}`}.`,
          line: 5, pyLine: match ? 6 : 7 });
      }
    }
    steps.push({ dp: dp.map(r => [...r]), i: m, j: n, final: true, note: `Done. Edit distance = ${dp[m][n]}.`, line: 6, pyLine: 8 });
    return steps;
  }

  function renderMinDistance() {
    return (stage, step) => {
      stage.innerHTML = renderGrid(step.dp, (v, r, c) => {
        if (step.final) return (r === step.i && c === step.j) ? 'match' : '';
        if (r === step.i && c === step.j) return step.match ? 'match' : 'cur';
        return '';
      }, 34);
    };
  }

  // ── P3: Maximal Square ────────────────────────────────────────────────────
  function traceMaximalSquare(matrix) {
    const R = matrix.length, C = matrix[0].length;
    const dp = Array.from({ length: R + 1 }, () => new Array(C + 1).fill(0));
    let max = 0;
    const steps = [{ dp: dp.map(r => [...r]), i: 0, j: 0, max, note: 'Base row/col = 0.', line: 3, pyLine: 3 }];
    for (let i = 1; i <= R; i++) {
      for (let j = 1; j <= C; j++) {
        if (matrix[i - 1][j - 1] === '1') {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
          max = Math.max(max, dp[i][j]);
          steps.push({ dp: dp.map(r => [...r]), i, j, max, note: `(${i},${j})='1' → dp=min(up,left,diag)+1=${dp[i][j]}. max side=${max}.`, line: 7, pyLine: 7 });
        }
      }
    }
    steps.push({ dp: dp.map(r => [...r]), i: R, j: C, max, final: true, note: `Done. Max square area = ${max * max}.`, line: 11, pyLine: 9 });
    return steps;
  }

  function renderMaximalSquare() {
    return (stage, step) => {
      stage.innerHTML = `
        ${renderGrid(step.dp, (v, r, c) => step.final ? '' : (r === step.i && c === step.j ? 'cur' : ''), 34)}
        <div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-counter">${step.max * step.max}<span class="viz-counter-label">max square area</span></div></div></div>`;
    };
  }

  // ── P4: Distinct Subsequences ─────────────────────────────────────────────
  function traceNumDistinct(s, t) {
    const m = s.length, n = t.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = 1;
    const steps = [{ dp: dp.map(r => [...r]), i: 0, j: 0, note: 'Base col — empty t is always a subsequence (1 way).', line: 4, pyLine: 4 }];
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = dp[i - 1][j];
        const match = s[i - 1] === t[j - 1];
        if (match) dp[i][j] += dp[i - 1][j - 1];
        steps.push({ dp: dp.map(r => [...r]), i, j, match,
          note: `(${i},${j}): skip → ${dp[i - 1][j]}${match ? ` + use match '${s[i - 1]}' → +${dp[i - 1][j - 1]}` : ''} = ${dp[i][j]}.`,
          line: match ? 7 : 6, pyLine: match ? 8 : 7 });
      }
    }
    steps.push({ dp: dp.map(r => [...r]), i: m, j: n, final: true, note: `Done. Distinct subsequences = ${dp[m][n]}.`, line: 9, pyLine: 9 });
    return steps;
  }

  function renderNumDistinct() {
    return (stage, step) => {
      stage.innerHTML = renderGrid(step.dp, (v, r, c) => {
        if (step.final) return (r === step.i && c === step.j) ? 'match' : '';
        if (r === step.i && c === step.j) return step.match ? 'match' : 'cur';
        return '';
      }, 32);
    };
  }

  // ── P5: Burst Balloons — interval DP ─────────────────────────────────────
  function traceMaxCoins(nums) {
    const padded = [1, ...nums, 1];
    const n = padded.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    const steps = [{ dp: dp.map(r => [...r]), l: 0, r: 0, note: `Padded: [${padded.join(',')}].`, line: 4, pyLine: 4 }];
    for (let len = 2; len < n; len++) {
      for (let l = 0; l < n - len; l++) {
        const r = l + len;
        for (let k = l + 1; k < r; k++) dp[l][r] = Math.max(dp[l][r], dp[l][k] + dp[k][r] + padded[l] * padded[k] * padded[r]);
        steps.push({ dp: dp.map(row => [...row]), l, r, note: `interval (${l},${r}): best last-burst choice → dp[${l}][${r}]=${dp[l][r]}.`, line: 9, pyLine: 9 });
      }
    }
    steps.push({ dp: dp.map(r => [...r]), l: 0, r: n - 1, final: true, note: `Done. Max coins = ${dp[0][n - 1]}.`, line: 12, pyLine: 10 });
    return steps;
  }

  function renderMaxCoins() {
    return (stage, step) => {
      stage.innerHTML = renderGrid(step.dp, (v, r, c) => {
        if (step.final) return (r === step.l && c === step.r) ? 'match' : '';
        return (r === step.l && c === step.r) ? 'cur' : '';
      }, 34);
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  mountVisualizer('viz-dp2d-p1', traceLCS('abcde', 'ace'), withCode('dp2d-p1', renderLCS()));
  mountVisualizer('viz-dp2d-p2', traceMinDistance('horse', 'ros'), withCode('dp2d-p2', renderMinDistance()));

  const p3Matrix = [['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']];
  mountVisualizer('viz-dp2d-p3', traceMaximalSquare(p3Matrix), withCode('dp2d-p3', renderMaximalSquare()));

  mountVisualizer('viz-dp2d-p4', traceNumDistinct('rabbbit', 'rabbit'), withCode('dp2d-p4', renderNumDistinct()));
  mountVisualizer('viz-dp2d-p5', traceMaxCoins([3, 1, 5, 8]), withCode('dp2d-p5', renderMaxCoins()));
}
