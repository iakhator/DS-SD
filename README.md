# DSA & System Design — Foundational Knowledge

An interactive, self-contained reference covering **39 topics** across Data Structures & Algorithms and System Design. No frameworks. No dependencies. Just open `index.html` via a local server and go.

![Topics](https://img.shields.io/badge/topics-39-4f8fff) ![Language](https://img.shields.io/badge/language-HTML%20%2F%20JS-2dd672) ![License](https://img.shields.io/badge/license-MIT-7c5cfc)

---

## What's Inside

**DSA (24 topics):** Big-O · Arrays · Hash Maps · Two Pointers · Sliding Window · Prefix Sum · Stack · Queue · Linked Lists · Binary Search · Recursion · Trees · BST · Heaps · BFS · DFS · DP (1D & 2D) · Greedy · Tries · Sorting · Bit Manipulation · Problem Framework

**System Design (14 topics):** Fundamentals · Scalability · Databases · Caching · API Design · Message Queues · URL Shortener · Social Feed · Rate Limiter · Distributed Cache · Notifications · File Storage · Chat System · Search Autocomplete

**Practice (1):** Must-Do Problem Set — a pattern-organised, progress-tracked checklist of 50+ interview problems and core system-design prompts.

Each topic includes:
- An **Intuition & Mental Model** primer — plain-language analogy, why it works, and when to use it
- Concept explanation with ASCII diagrams
- Code examples in **JavaScript** and **Python** (tabbed)
- Complexity tables
- 5 practice problems with collapsible solutions

---

## Getting Started

> ES modules require an HTTP server — `file://` protocol won't work.

```bash
# Clone
git clone https://github.com/your-handle/ds-and-sd.git
cd ds-and-sd

# Serve (pick any)
npx serve .
# or
python3 -m http.server 8080
# or use VS Code Live Server extension
```

Then open `http://localhost:3000` (or `8080`).

---

## Project Structure

```
ds-and-sd/
├── index.html          ← shell (nav + layout only, ~90 lines)
├── css/
│   └── main.css        ← all styles
├── js/
│   └── app.js          ← navigation, toggle, progress logic
├── components/
│   ├── problem-card.js ← collapsible problem card web component
│   ├── code-block.js   ← code block with header web component
│   └── lang-toggle.js  ← JS/Python tab toggle web component
└── sections/           ← one .js file per topic (37 total)
    ├── complexity.js
    ├── arrays.js
    └── ...
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

**Quick summary:**
- **Fix a bug / typo** → edit the relevant `sections/*.js` file
- **Add a problem** → add a `.problem-card` block inside the section
- **Add a new section** → create `sections/your-topic.js`, register it in `js/app.js`, and add a nav item to `index.html`

---

## License

MIT © 2026 — see [LICENSE](./LICENSE)
