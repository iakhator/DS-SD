/**
 * viz-kit — shared helpers for algorithm visualizations.
 *
 * Every section that pairs a code sample with an <algo-visualizer> trace
 * imports from here instead of re-implementing cell rows, chip lists, or
 * code-line highlighting. Keeps the animation/highlighter logic in one
 * place as it's rolled out across sections.
 */

// ── Auto line-wrapping ───────────────────────────────────────────────────
// Wraps every line of a syntax-highlighted <pre> in <span class="code-line"
// data-ln="N">, so any section can later highlight "the line that's
// executing" without hand-authoring wrapper markup per code block. Safe to
// call on every .code-wrap pre site-wide — a plain read-only code block
// renders identically, it just gains the ability to be highlighted later.
// Idempotent: re-running (e.g. after re-mounting a section) is a no-op.
export function autoWrapCodeLines(root = document) {
  root.querySelectorAll('.code-wrap pre').forEach(pre => {
    if (pre.dataset.lineWrapped) return;
    const lines = [[]];
    const pushNode = node => lines[lines.length - 1].push(node);
    const newLine = () => lines.push([]);

    const splitText = (text, appendTo) => {
      const parts = text.split('\n');
      parts.forEach((part, i) => {
        if (i > 0) newLine();
        if (part.length) appendTo(document.createTextNode(part));
      });
    };

    // Most spans are single-line (the common case). A span whose content spans
    // multiple physical lines (e.g. a multi-line // comment block) is split into
    // one clone per line — a fresh clone of the same tag/class starts on each
    // new line — so line numbering and highlighting stay accurate.
    const processElement = el => {
      if (!el.textContent.includes('\n')) {
        pushNode(el.cloneNode(true));
        return;
      }
      let clone = el.cloneNode(false);
      pushNode(clone);
      Array.from(el.childNodes).forEach(child => {
        // This codebase's syntax spans are always flat (no nested spans), so a
        // nested element here is rare; append it into the current line as-is.
        if (child.nodeType !== Node.TEXT_NODE) {
          clone.appendChild(child.cloneNode(true));
          return;
        }
        const parts = child.textContent.split('\n');
        parts.forEach((part, i) => {
          if (i > 0) {
            newLine();
            clone = el.cloneNode(false);
            pushNode(clone);
          }
          if (part.length) clone.appendChild(document.createTextNode(part));
        });
      });
    };

    Array.from(pre.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) splitText(node.textContent, pushNode);
      else processElement(node);
    });

    while (pre.firstChild) pre.removeChild(pre.firstChild);
    lines.forEach((nodes, i) => {
      const span = document.createElement('span');
      span.className = 'code-line';
      span.dataset.ln = String(i + 1);
      if (!nodes.length) span.innerHTML = '&#8203;';
      nodes.forEach(n => span.appendChild(n));
      pre.appendChild(span);
    });
    pre.dataset.lineWrapped = 'true';
  });
}

// ── Code-line highlighting ───────────────────────────────────────────────
// Highlights .code-line[data-ln="line"] inside the panel with the given id
// (a JS or Python <div class="lang-panel" id="...">), clearing any previous
// highlight in that panel first.
export function highlightCodeLine(panelId, line) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.querySelectorAll('.code-line.running').forEach(el => el.classList.remove('running'));
  if (line == null) return;
  const target = panel.querySelector(`.code-line[data-ln="${line}"]`);
  if (target) target.classList.add('running');
}

// Wraps a stage-render function so it also syncs the "currently executing"
// line in BOTH the JS and Python code panels for a problem — step.line for
// JS, step.pyLine for Python (the two often differ, e.g. a JS if/else may
// collapse to one Python ternary line). Whichever tab is open always shows
// the right highlight, and switching languages mid-playback stays in sync.
export function withCode(baseId, renderFn) {
  return (stage, step, idx, steps) => {
    highlightCodeLine(`${baseId}-js`, step.line);
    highlightCodeLine(`${baseId}-py`, step.pyLine);
    renderFn(stage, step, idx, steps);
  };
}

// ── Stage rendering helpers ───────────────────────────────────────────────
// A row of array/string cells. stateFor(value, index) returns an extra class
// name ('cur' | 'cur2' | 'cur3' | 'match' | 'dup' | 'seen' | 'dim' | ''). The
// optional tagFor(value, index) returns a short pointer label ('L', 'R', 'i')
// shown above the cell — for two/three-pointer algorithms (two pointers,
// sliding window, partitioning) where more than one index matters at once.
export function cellsRow(items, stateFor, tagFor) {
  return `<div class="viz-cells">${items.map((v, i) => {
    const cls = stateFor(v, i);
    const tag = tagFor ? (tagFor(v, i) || '') : '';
    return `<div class="viz-cell-wrap"><span class="viz-ptr-tag">${tag}</span><div class="viz-cell${cls ? ' ' + cls : ''}">${v}<span class="viz-idx-tag">${i}</span></div></div>`;
  }).join('')}</div>`;
}

// A wrapping list of chips (e.g. a seen-set, a hashmap's entries).
export function chips(items, cls = '') {
  return items.length
    ? `<div class="viz-chips">${items.map(v => `<span class="viz-chip${cls}">${v}</span>`).join('')}</div>`
    : `<div class="viz-chips"><span class="viz-chip">∅</span></div>`;
}

// Mounts a trace onto an <algo-visualizer> by id; no-ops if the element
// isn't on the page (e.g. this section wasn't loaded). Keeps section files
// from repeating the `document.getElementById(...); if (el) el.load(...)`
// boilerplate for every problem.
export function mountVisualizer(vizId, steps, render) {
  const el = document.getElementById(vizId);
  if (el) el.load(steps, render);
}

// ── Binary tree helpers ──────────────────────────────────────────────────
// Shared by any section visualizing a binary tree (Trees, BST, Heaps, ...).
// A node is { val, left, right, id }; id defaults to the node's position in
// the level-order input array, which is stable and unique enough to use as
// a highlight key without a separate id-generator.

// Builds a tree from a level-order array (LeetCode-style, null = missing).
export function buildTree(vals) {
  if (!vals.length || vals[0] === null) return null;
  const root = { val: vals[0], left: null, right: null, id: 0 };
  const queue = [root];
  let i = 1;
  while (queue.length && i < vals.length) {
    const node = queue.shift();
    if (i < vals.length && vals[i] !== null) { node.left = { val: vals[i], left: null, right: null, id: i }; queue.push(node.left); }
    i++;
    if (i < vals.length && vals[i] !== null) { node.right = { val: vals[i], left: null, right: null, id: i }; queue.push(node.right); }
    i++;
  }
  return root;
}

// Deep-clones a tree — snapshot a mutable tree's shape before it changes.
export function cloneTree(node) {
  if (!node) return null;
  return { val: node.val, id: node.id, left: cloneTree(node.left), right: cloneTree(node.right) };
}

// Finds the first node with the given value (used to locate p/q for LCA-style problems).
export function findTreeNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return findTreeNode(root.left, val) || findTreeNode(root.right, val);
}

// Groups nodes into an array of levels (BFS order) for rendering.
export function treeLevels(root) {
  const levels = [];
  let queue = root ? [root] : [];
  while (queue.length) {
    levels.push(queue);
    const next = [];
    for (const n of queue) { if (n.left) next.push(n.left); if (n.right) next.push(n.right); }
    queue = next;
  }
  return levels;
}

// Renders levels as centered rows of .viz-cell nodes (no connecting lines —
// enough to see which node is active without a full node-link layout engine).
// highlightFn(node) returns an extra class name ('cur' | 'match' | 'dim' | '').
export function renderTree(levels, highlightFn) {
  return `<div style="display:flex;flex-direction:column;gap:10px;align-items:center">${levels.map(level =>
    `<div style="display:flex;gap:10px;justify-content:center">${level.map(n => {
      const cls = highlightFn(n);
      return `<div class="viz-cell${cls ? ' ' + cls : ''}">${n.val}</div>`;
    }).join('')}</div>`
  ).join('')}</div>`;
}

// ── 2D grid helper ────────────────────────────────────────────────────────
// Renders a 2D array (a matrix, a maze, a flood-fill grid) as a CSS grid of
// .viz-cell nodes. highlightFn(value, row, col) returns an extra class name.
export function renderGrid(grid, highlightFn, cellSize = 40) {
  return `<div style="display:inline-grid;grid-template-columns:repeat(${grid[0].length},${cellSize}px);gap:3px">${
    grid.map((row, ri) => row.map((v, ci) => {
      const cls = highlightFn(v, ri, ci) || '';
      return `<div class="viz-cell${cls ? ' ' + cls : ''}" style="min-width:${cellSize}px;height:${cellSize}px">${v}</div>`;
    }).join('')).join('')
  }</div>`;
}
