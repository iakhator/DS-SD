// Section: linkedlist
// Auto-extracted from index.html
import { autoWrapCodeLines, cellsRow, chips, withCode, mountVisualizer } from '../components/viz-kit.js';

const _html_linkedlist = String.raw`
<div id="sec-linkedlist" class="section">
<div class="sec-header"><div class="sec-meta"><span class="sec-badge dsa">Linear · 08</span></div><div class="sec-title">Linked Lists</div></div>
<div class="sec-lead">Linked lists are chains of nodes where each node points to the next. No random access (O(n) to find index i). But O(1) insert/delete at a known position. Master the fast/slow pointer pattern — it solves cycle detection, finding the middle, and Nth from end.</div>
<div class="sec-divider"></div>
<div class="sec-body">
<div class="h2">Intuition &amp; Mental Model</div>
<p>Imagine a treasure hunt where each clue tells you only where the <em>next</em> clue is hidden — you cannot skip straight to clue number seven without following the chain from the beginning. That is a linked list: a sequence of nodes where each node holds a value and a pointer (<code>next</code>) to the following node, with no central index to jump directly to position <em>i</em>. The payoff for giving up random access is that inserting or removing a node at a known position costs <code>O(1)</code> — you just rewire two pointers — rather than the <code>O(n)</code> shifting that arrays require.</p>
<p>Linked lists enable the <strong>fast/slow pointer</strong> (Floyd's tortoise-and-hare) pattern, which solves an entire class of problems in <code>O(1)</code> extra space. The trick is that two pointers moving at different speeds through the same structure will inevitably meet if a cycle exists, and their meeting point encodes useful information — you can derive where the cycle starts, or find the exact middle of the list, purely from the arithmetic of their relative speeds. This feels like magic until you draw it out: after <em>k</em> steps, slow is at position <em>k</em> and fast is at position <em>2k</em>; in a cycle of length <em>L</em>, they meet when the gap closes modulo <em>L</em>.</p>
<p>Reach for a linked list (or linked-list thinking) when you need frequent insertions and deletions in the middle of a sequence and you will always arrive at the target node via traversal anyway. A major misconception is that "reversing a linked list" requires extra space — in reality three pointers (<code>prev</code>, <code>curr</code>, <code>next</code>) do it in-place in a single pass. Another frequent mistake is forgetting the <strong>dummy node</strong> technique: prepending a fake head eliminates the special-case logic for deleting or inserting at the true head, making every position in the list look the same to your code.</p>
<div class="alert tip"><span class="alert-icon">💡</span><strong>Key insight:</strong> Almost every linked-list interview problem reduces to one of three moves: (1) use a dummy head to unify edge cases, (2) use fast/slow pointers for cycle or midpoint detection, or (3) reverse a sublist with the three-pointer in-place swap.</div>
<div class="h2">Core Techniques</div>
<div class="diag"><pre>
Fast/Slow Pointer (Floyd's):
  slow moves 1 step, fast moves 2 steps
  If cycle: they meet inside the cycle
  If no cycle: fast reaches null

  To find MIDDLE: when fast reaches end, slow is at middle
  [1] → [2] → [3] → [4] → [5] → null
   S         F    (after 2 steps: S=2, F=3... wait until F=null)

Dummy Node trick:
  Create dummy → node, return dummy.next
  Eliminates edge cases for head deletion
  dummy → [1] → [2] → [3] → null
</pre></div>

<div class="h2">5 Problems — Linked Lists</div>
<div class="problems-grid">

<problem-card num="P1" title="Reverse Linked List" difficulty="easy" tags="Iterative,Recursive">
<div class="prob-desc">Reverse a singly linked list. Return the new head.</div>
<div class="prob-example">Input: 1→2→3→4→5 → Output: 5→4→3→2→1</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Iterative — 3 pointer technique <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ll-p1')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ll-p1')">Python</button></div>
<div class="lang-panel active" id="ll-p1-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Iterative — O(n) O(1)</span></div><pre><span class="kw">function</span> <span class="fn">reverseList</span>(head) {
  <span class="kw">let</span> prev = <span class="kw">null</span>, curr = head
  <span class="kw">while</span> (curr) {
    <span class="kw">const</span> next = curr.next  <span class="cmt">// save next</span>
    curr.next = prev        <span class="cmt">// reverse pointer</span>
    prev = curr             <span class="cmt">// advance prev</span>
    curr = next             <span class="cmt">// advance curr</span>
  }
  <span class="kw">return</span> prev  <span class="cmt">// new head</span>
}</pre></div></div>
<div class="lang-panel" id="ll-p1-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Iterative</span></div><pre><span class="py-kw">def</span> <span class="py-fn">reverse_list</span>(head):
    prev, curr = <span class="py-kw">None</span>, head
    <span class="py-kw">while</span> curr:
        nxt = curr.next
        curr.next = prev
        prev, curr = curr, nxt
    <span class="py-kw">return</span> prev</pre></div>
</div>
<algo-visualizer id="viz-ll-p1" title="Three-Pointer Reversal — trace"></algo-visualizer>
</problem-card>

<problem-card num="P2" title="Detect Cycle in Linked List" difficulty="easy" tags="Fast/Slow,Floyd">
<div class="prob-desc">Given head of linked list, determine if it has a cycle.</div>
<div class="prob-example">1→2→3→4→2 (cycle back to 2) → true</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Floyd's cycle detection <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ll-p2')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ll-p2')">Python</button></div>
<div class="lang-panel active" id="ll-p2-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Fast/Slow</span></div><pre><span class="kw">function</span> <span class="fn">hasCycle</span>(head) {
  <span class="kw">let</span> slow = head, fast = head
  <span class="kw">while</span> (fast?.next) {
    slow = slow.next
    fast = fast.next.next
    <span class="kw">if</span> (slow === fast) <span class="kw">return</span> <span class="kw">true</span>
  }
  <span class="kw">return</span> <span class="kw">false</span>
}</pre></div></div>
<div class="lang-panel" id="ll-p2-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Fast/Slow</span></div><pre><span class="py-kw">def</span> <span class="py-fn">has_cycle</span>(head):
    slow = fast = head
    <span class="py-kw">while</span> fast <span class="py-kw">and</span> fast.next:
        slow = slow.next; fast = fast.next.next
        <span class="py-kw">if</span> slow is fast: <span class="py-kw">return</span> <span class="py-kw">True</span>
    <span class="py-kw">return</span> <span class="py-kw">False</span></pre></div>
</div>
<algo-visualizer id="viz-ll-p2" title="Floyd's Fast/Slow — trace"></algo-visualizer>
</problem-card>

<problem-card num="P3" title="Merge Two Sorted Lists" difficulty="easy" tags="Dummy Node,Merge">
<div class="prob-desc">Merge two sorted linked lists and return it as one sorted list.</div>
<div class="prob-example">1→2→4, 1→3→4 → 1→1→2→3→4→4</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Dummy head + two pointer merge <span class="approach-tc">O(n+m) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ll-p3')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ll-p3')">Python</button></div>
<div class="lang-panel active" id="ll-p3-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Dummy Head Merge</span></div><pre><span class="kw">function</span> <span class="fn">mergeTwoLists</span>(l1, l2) {
  <span class="kw">const</span> dummy = { next: <span class="kw">null</span> }
  <span class="kw">let</span> cur = dummy
  <span class="kw">while</span> (l1 && l2) {
    <span class="kw">if</span> (l1.val &lt;= l2.val) { cur.next = l1; l1 = l1.next }
    <span class="kw">else</span>                   { cur.next = l2; l2 = l2.next }
    cur = cur.next
  }
  cur.next = l1 ?? l2  <span class="cmt">// attach remainder</span>
  <span class="kw">return</span> dummy.next
}</pre></div></div>
<div class="lang-panel" id="ll-p3-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Dummy Head Merge</span></div><pre><span class="py-kw">def</span> <span class="py-fn">merge_two_lists</span>(l1, l2):
    dummy = cur = ListNode(<span class="py-num">0</span>)
    <span class="py-kw">while</span> l1 <span class="py-kw">and</span> l2:
        <span class="py-kw">if</span> l1.val &lt;= l2.val: cur.next = l1; l1 = l1.next
        <span class="py-kw">else</span>:                cur.next = l2; l2 = l2.next
        cur = cur.next
    cur.next = l1 <span class="py-kw">or</span> l2
    <span class="py-kw">return</span> dummy.next</pre></div>
</div>
<algo-visualizer id="viz-ll-p3" title="Dummy Head Merge — trace"></algo-visualizer>
</problem-card>

<problem-card num="P4" title="Remove Nth Node From End" difficulty="medium" tags="Fast/Slow,One Pass">
<div class="prob-desc">Remove the nth node from the end of a linked list and return its head. Do it in one pass.</div>
<div class="prob-example">1→2→3→4→5, n=2 → 1→2→3→5</div>
<div class="approach-list">
  <div class="approach best"><div class="approach-name">✅ Two pointers n apart — one pass <span class="approach-tc">O(n) time · O(1) space</span></div></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ll-p4')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ll-p4')">Python</button></div>
<div class="lang-panel active" id="ll-p4-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Gap of N Between Pointers</span></div><pre><span class="kw">function</span> <span class="fn">removeNthFromEnd</span>(head, n) {
  <span class="kw">const</span> dummy = { val: <span class="num">0</span>, next: head }
  <span class="kw">let</span> fast = dummy, slow = dummy
  <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;=n; i++) fast = fast.next  <span class="cmt">// advance fast by n+1</span>
  <span class="kw">while</span> (fast) { fast = fast.next; slow = slow.next }
  slow.next = slow.next.next  <span class="cmt">// skip the target node</span>
  <span class="kw">return</span> dummy.next
}</pre></div></div>
<div class="lang-panel" id="ll-p4-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Gap of N</span></div><pre><span class="py-kw">def</span> <span class="py-fn">remove_nth_from_end</span>(head, n):
    dummy = fast = slow = ListNode(<span class="py-num">0</span>, head)
    <span class="py-kw">for</span> _ <span class="py-kw">in</span> <span class="py-fn">range</span>(n+<span class="py-num">1</span>): fast = fast.next
    <span class="py-kw">while</span> fast: fast = fast.next; slow = slow.next
    slow.next = slow.next.next
    <span class="py-kw">return</span> dummy.next</pre></div>
</div>
<algo-visualizer id="viz-ll-p4" title="Gap of N Pointers — trace"></algo-visualizer>
</problem-card>

<problem-card num="P5" title="Merge K Sorted Lists" difficulty="hard" tags="Heap,Divide & Conquer">
<div class="prob-desc">Merge k sorted linked lists into one sorted list.</div>
<div class="prob-example">[[1,4,5],[1,3,4],[2,6]] → [1,1,2,3,4,4,5,6]</div>
<div class="approach-list">
  <div class="approach"><div class="approach-name">Divide & Conquer <span class="approach-tc">O(n log k)</span></div></div>
  <div class="approach best"><div class="approach-name">✅ Min-Heap of size k <span class="approach-tc">O(n log k) time · O(k) space</span></div><p style="font-size:12px;color:var(--muted)">Put head of each list in min-heap. Poll min, add to result, push that node's next into heap.</p></div>
</div>
<div class="lang-toggle"><button class="lang-btn active" onclick="setLang(this,'js','ll-p5')">JS</button><button class="lang-btn py" onclick="setLang(this,'py','ll-p5')">Python</button></div>
<div class="lang-panel active" id="ll-p5-js">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Divide & Conquer (pairwise merge)</span></div><pre><span class="kw">function</span> <span class="fn">mergeKLists</span>(lists) {
  <span class="kw">if</span> (!lists.length) <span class="kw">return</span> <span class="kw">null</span>
  <span class="kw">while</span> (lists.length > <span class="num">1</span>) {
    <span class="kw">const</span> merged = []
    <span class="kw">for</span> (<span class="kw">let</span> i=<span class="num">0</span>; i&lt;lists.length; i+=<span class="num">2</span>)
      merged.<span class="fn">push</span>(<span class="fn">mergeTwoLists</span>(lists[i], lists[i+<span class="num">1</span>]))
    lists = merged
  }
  <span class="kw">return</span> lists[<span class="num">0</span>]
}</pre></div></div>
<div class="lang-panel" id="ll-p5-py">
<div class="code-wrap"><div class="code-hdr"><span class="code-lbl">Min-Heap (Python heapq)</span></div><pre><span class="py-kw">import</span> heapq
<span class="py-kw">def</span> <span class="py-fn">merge_k_lists</span>(lists):
    dummy = cur = ListNode(<span class="py-num">0</span>)
    heap = []
    <span class="py-kw">for</span> i, node <span class="py-kw">in</span> <span class="py-fn">enumerate</span>(lists):
        <span class="py-kw">if</span> node: heapq.heappush(heap, (node.val, i, node))
    <span class="py-kw">while</span> heap:
        val, i, node = heapq.heappop(heap)
        cur.next = node; cur = cur.next
        <span class="py-kw">if</span> node.next: heapq.heappush(heap, (node.next.val, i, node.next))
    <span class="py-kw">return</span> dummy.next</pre></div>
</div>
<algo-visualizer id="viz-ll-p5" title="Pairwise Divide &amp; Conquer — trace"></algo-visualizer>
</problem-card>
</div></div></div>
`;

(function() {
  const main = document.getElementById('main');
  let section;
  if (main) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = _html_linkedlist.trim();
    section = wrapper.firstElementChild;
    if (section) main.appendChild(section);
  }
  if (section) autoWrapCodeLines(section);
  wireVisualizers();
})();

// ── Visualizer wiring — traces + renderers for the Linked List problems ─────
// Lists are represented as plain value arrays; pointers are tracked as array
// indices so the shared cellsRow/chips helpers can render them directly.
function wireVisualizers() {
  // ── P1: Reverse Linked List — 3-pointer iterative ───────────────────────
  function traceReverseList(vals) {
    const steps = [{ prevIdx: -1, currIdx: 0, reversed: [], note: 'Start — prev=null, curr=head.', line: 2, pyLine: 2 }];
    const reversed = [];
    for (let i = 0; i < vals.length; i++) {
      reversed.unshift(vals[i]);
      steps.push({ prevIdx: i, currIdx: i + 1, reversed: [...reversed],
        note: `curr=${vals[i]}: save next, curr.next→prev, prev=curr, curr=next.`, line: 6, pyLine: 5 });
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderReverseList(vals) {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">original list</div>
        ${cellsRow(vals,
          (v, i) => step.final ? 'dim' : (i === step.prevIdx ? 'cur' : (i === step.currIdx ? 'cur2' : (i < step.prevIdx ? 'dim' : ''))),
          (v, i) => i === step.prevIdx ? 'P' : i === step.currIdx ? 'C' : '')}
        <div class="viz-panel-lbl" style="margin-top:10px">reversed so far</div>
        ${chips(step.reversed, ' new')}`;
    };
  }

  // ── P2: Detect Cycle — Floyd's fast/slow ────────────────────────────────
  function traceHasCycle(vals, cycleStart) {
    const next = i => (i + 1 < vals.length ? i + 1 : cycleStart);
    let slow = 0, fast = 0;
    const steps = [{ slow, fast, note: 'Start — slow=fast=head.', line: 2, pyLine: 2 }];
    while (true) {
      slow = next(slow);
      fast = next(next(fast));
      if (slow === fast) {
        steps.push({ slow, fast, found: true, final: true, stop: true, note: `slow and fast meet at value ${vals[slow]} → cycle detected → true.`, line: 6, pyLine: 5 });
        return steps;
      }
      steps.push({ slow, fast, note: `slow→${vals[slow]}, fast→${vals[fast]} (no meet yet).`, line: 5, pyLine: 4 });
    }
  }

  function renderHasCycle(vals) {
    return (stage, step) => {
      stage.innerHTML = cellsRow(vals,
        (v, i) => {
          if (step.found && i === step.slow) return 'match';
          if (i === step.slow) return 'cur';
          if (i === step.fast) return 'cur2';
          return '';
        },
        (v, i) => i === step.slow && i === step.fast ? 'S=F' : i === step.slow ? 'S' : i === step.fast ? 'F' : '');
    };
  }

  // ── P3: Merge Two Sorted Lists — dummy head merge ───────────────────────
  function traceMergeTwoLists(l1, l2) {
    let i = 0, j = 0;
    const result = [];
    const steps = [{ i, j, result: [...result], note: 'Start — cur=dummy.', line: 3, pyLine: 2 }];
    while (i < l1.length && j < l2.length) {
      if (l1[i] <= l2[j]) {
        result.push(l1[i]);
        steps.push({ i: i + 1, j, result: [...result], note: `l1[${i}]=${l1[i]} ≤ l2[${j}]=${l2[j]} → take from l1.`, line: 5, pyLine: 4 });
        i++;
      } else {
        result.push(l2[j]);
        steps.push({ i, j: j + 1, result: [...result], note: `l1[${i}]=${l1[i]} > l2[${j}]=${l2[j]} → take from l2.`, line: 6, pyLine: 5 });
        j++;
      }
    }
    const remainder = i < l1.length ? l1.slice(i) : l2.slice(j);
    result.push(...remainder);
    steps.push({ i: l1.length, j: l2.length, result: [...result], final: true,
      note: `Attach remainder [${remainder.join(',')}]. Done.`, line: 9, pyLine: 7 });
    return steps;
  }

  function renderMergeTwoLists(l1, l2) {
    return (stage, step) => {
      stage.innerHTML = `
        <div class="viz-panel-lbl">l1</div>
        ${cellsRow(l1, (v, i) => step.final ? 'dim' : (i === step.i ? 'cur' : (i < step.i ? 'dim' : '')))}
        <div class="viz-panel-lbl" style="margin-top:8px">l2</div>
        ${cellsRow(l2, (v, i) => step.final ? 'dim' : (i === step.j ? 'cur2' : (i < step.j ? 'dim' : '')))}
        <div class="viz-panel-lbl" style="margin-top:8px">merged result</div>
        ${chips(step.result, ' new')}`;
    };
  }

  // ── P4: Remove Nth Node From End — gap-of-n two pointers ────────────────
  function traceRemoveNth(vals, n) {
    let fast = n, slow = -1;
    const steps = [{ fast, slow, note: `Start — fast is ${n} ahead of slow (advanced ${n + 1} steps from a dummy head).`, line: 4, pyLine: 3 }];
    while (fast < vals.length) {
      fast++; slow++;
      steps.push({ fast, slow, note: `advance both → fast=${fast < vals.length ? vals[fast] : 'null'}, slow=${vals[slow]}.`, line: 5, pyLine: 4 });
    }
    const removedIdx = slow + 1;
    const removedVal = vals[removedIdx];
    const result = [...vals];
    result.splice(removedIdx, 1);
    steps.push({ fast, slow, removedIdx, removedVal, result, final: true,
      note: `slow.next.next skips the node (value ${removedVal}) → result [${result.join(',')}].`, line: 6, pyLine: 5 });
    return steps;
  }

  function renderRemoveNth(vals) {
    return (stage, step) => {
      stage.innerHTML = `
        ${cellsRow(vals,
          (v, i) => {
            if (step.final) return i === step.removedIdx ? 'dup' : 'dim';
            if (i === step.fast && i === step.slow) return 'match';
            if (i === step.fast) return 'cur2';
            if (i === step.slow) return 'cur';
            return '';
          },
          (v, i) => i === step.slow ? 'S' : (i === step.fast ? 'F' : ''))}
        ${step.final ? `<div class="viz-panels" style="margin-top:8px"><div class="viz-panel"><div class="viz-panel-lbl">result</div>${chips(step.result)}</div></div>` : ''}`;
    };
  }

  // ── P5: Merge K Sorted Lists — pairwise divide & conquer ────────────────
  // The Python solution uses a min-heap instead (a different algorithm), so
  // pyLine stays null throughout — there's no equivalent line to highlight.
  function traceMergeKLists(lists) {
    const mergeTwo = (a, b) => {
      const res = []; let i = 0, j = 0;
      while (i < a.length && j < b.length) res.push(a[i] <= b[j] ? a[i++] : b[j++]);
      return [...res, ...a.slice(i), ...b.slice(j)];
    };
    let curr = lists.map(l => [...l]);
    const steps = [{ lists: curr.map(l => [...l]), note: `Start — ${curr.length} lists.`, line: 2, pyLine: null }];
    let round = 1;
    while (curr.length > 1) {
      const merged = [];
      const pairs = [];
      for (let i = 0; i < curr.length; i += 2) {
        const b = curr[i + 1];
        merged.push(b !== undefined ? mergeTwo(curr[i], b) : curr[i]);
        pairs.push(b !== undefined ? `[${curr[i].join(',')}]+[${b.join(',')}]` : `[${curr[i].join(',')}] (odd one out)`);
      }
      curr = merged;
      steps.push({ lists: curr.map(l => [...l]), note: `round ${round}: merge ${pairs.join(', ')} → ${curr.length} list(s) left.`, line: 7, pyLine: null });
      round++;
    }
    steps[steps.length - 1].final = true;
    return steps;
  }

  function renderMergeKLists() {
    return (stage, step) => {
      const rows = step.lists.map((l, idx) => `<div style="display:flex;align-items:center;gap:8px"><span class="viz-panel-lbl" style="width:50px;margin:0">list ${idx}</span>${chips(l)}</div>`).join('');
      stage.innerHTML = `<div style="display:flex;flex-direction:column;gap:6px">${rows}</div>`;
    };
  }

  // ── Attach everything once the elements exist in the DOM ────────────────
  mountVisualizer('viz-ll-p1', traceReverseList([1, 2, 3, 4, 5]), withCode('ll-p1', renderReverseList([1, 2, 3, 4, 5])));

  const p2Vals = [1, 2, 3, 4];
  mountVisualizer('viz-ll-p2', traceHasCycle(p2Vals, 1), withCode('ll-p2', renderHasCycle(p2Vals)));

  const p3L1 = [1, 2, 4], p3L2 = [1, 3, 4];
  mountVisualizer('viz-ll-p3', traceMergeTwoLists(p3L1, p3L2), withCode('ll-p3', renderMergeTwoLists(p3L1, p3L2)));

  mountVisualizer('viz-ll-p4', traceRemoveNth([1, 2, 3, 4, 5], 2), withCode('ll-p4', renderRemoveNth([1, 2, 3, 4, 5])));

  mountVisualizer('viz-ll-p5', traceMergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]]), withCode('ll-p5', renderMergeKLists()));
}
