# Contributing Guide

Thanks for contributing! This project is intentionally simple — no build tools, no frameworks. Just HTML, CSS, and native Web Components.

---

## Local Setup

```bash
# You only need a local HTTP server (ES modules block on file://)
npx serve .             # port 3000
# or
python3 -m http.server 8080
```

---

## What You Can Contribute

### 1. Fix a typo or bug in a section

Each topic lives in `sections/<topic>.js`. Edit the HTML string in that file. Example:

```
sections/complexity.js    ← Big-O section
sections/arrays.js        ← Arrays & Strings
sections/hashmaps.js      ← Hash Maps & Sets
...
```

### 2. Fix a code example

Find the relevant `<pre>` block inside `sections/<topic>.js` and update the code.

### 3. Add a practice problem

Inside the relevant section file, copy an existing `.problem-card` block and fill it in:

```html
<div class="problem-card">
  <div class="prob-header" onclick="toggleProblem(this)">
    <span class="prob-num">P6</span>
    <span class="prob-title">Your Problem Title</span>
    <span class="diff-badge diff-m">Medium</span>
    <div class="prob-tags"><span class="prob-tag">Array</span></div>
    <span class="prob-expand">▶</span>
  </div>
  <div class="prob-body">
    <div class="prob-desc">Problem description here.</div>
    <div class="prob-example">Input: ... → Output: ...</div>
    <div class="approach-list">
      <div class="approach best">
        <div class="approach-name">✅ Approach Name <span class="approach-tc">O(n) time · O(1) space</span></div>
        <p style="font-size:12px;color:var(--muted)">Brief explanation.</p>
      </div>
    </div>
    <!-- Add lang-toggle + code panels here -->
  </div>
</div>
```

### 4. Add a new section

1. Create `sections/your-topic.js` — copy the structure from any existing section file
2. Register it in `js/app.js` in the `SECTIONS` array (position matters for nav order)
3. Add a nav item to `index.html` inside the correct `<div class="nav-group-label">` group

---

## Code Style

- **HTML in section files**: keep the existing patterns (`.prob-header`, `.code-wrap`, etc.)
- **Syntax highlighting**: use the existing span classes (`<span class="kw">`, `.fn`, `.str`, `.cmt`, etc.)
- **No external dependencies** — everything must work offline after the initial font load

---

## Difficulty Badges

| Class | Label | Use for |
|---|---|---|
| `diff-e` | Easy | Straightforward, one pattern |
| `diff-m` | Medium | Requires insight or 2 patterns |
| `diff-h` | Hard | Multiple steps, edge cases |

---

## Pull Request Checklist

- [ ] Tested locally via `npx serve .`
- [ ] No console errors
- [ ] Nav links to the correct section (if adding a new one)
- [ ] Code examples work in both JS and Python tabs (if applicable)
- [ ] Follows existing HTML structure and naming conventions
