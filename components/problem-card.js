/**
 * <problem-card> — Collapsible problem card Web Component (Light DOM)
 *
 * Attributes:
 *   num        — "P1", "P2", etc.
 *   title      — Problem title text
 *   difficulty — "easy" | "medium" | "hard"
 *   tags       — Comma-separated tag list, e.g. "HashMap,Array"
 *
 * Usage:
 *   <problem-card num="P1" title="Two Sum" difficulty="easy" tags="HashMap,Array">
 *     <div class="prob-desc">...</div>
 *     <div class="prob-example">...</div>
 *     ...code panels...
 *   </problem-card>
 */
class ProblemCard extends HTMLElement {
  connectedCallback() {
    const num        = this.getAttribute('num')        ?? '';
    const title      = this.getAttribute('title')      ?? '';
    const difficulty = (this.getAttribute('difficulty') ?? 'easy').toLowerCase();
    const tags       = (this.getAttribute('tags')      ?? '')
                         .split(',').map(t => t.trim()).filter(Boolean);

    const diffMap = {
      easy:   ['diff-e', 'Easy'],
      medium: ['diff-m', 'Medium'],
      hard:   ['diff-h', 'Hard'],
    };
    const [diffClass, diffLabel] = diffMap[difficulty] ?? ['diff-e', 'Easy'];

    const tagsHtml = tags.map(t => `<span class="prob-tag">${t}</span>`).join('');

    // Capture inner content (body HTML) before overwriting innerHTML
    const bodyHTML = this.innerHTML;

    this.innerHTML = `
      <div class="problem-card">
        <div class="prob-header" onclick="toggleProblem(this)">
          <span class="prob-num">${num}</span>
          <span class="prob-title">${title}</span>
          <span class="diff-badge ${diffClass}">${diffLabel}</span>
          <div class="prob-tags">${tagsHtml}</div>
          <span class="prob-expand">▶</span>
        </div>
        <div class="prob-body">${bodyHTML}</div>
      </div>`;
  }
}

customElements.define('problem-card', ProblemCard);
