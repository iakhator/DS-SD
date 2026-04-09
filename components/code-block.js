/**
 * <code-block> — Code block with header Web Component (Light DOM)
 *
 * Attributes:
 *   label      — Header label text, e.g. "One-pass HashMap"
 *   difficulty — Optional: "easy" | "medium" | "hard" (renders a badge)
 *
 * Usage:
 *   <code-block label="One-pass HashMap" difficulty="easy">
 *     <pre>...syntax-highlighted code...</pre>
 *   </code-block>
 */
class CodeBlock extends HTMLElement {
  connectedCallback() {
    const label      = this.getAttribute('label')      ?? '';
    const difficulty = this.getAttribute('difficulty');

    const diffMap = {
      easy:   ['diff-easy', 'Easy'],
      medium: ['diff-med',  'Medium'],
      hard:   ['diff-hard', 'Hard'],
    };
    const diffHtml = difficulty
      ? `<span class="code-diff ${diffMap[difficulty]?.[0] ?? ''}">${diffMap[difficulty]?.[1] ?? ''}</span>`
      : '';

    const innerContent = this.innerHTML;

    this.innerHTML = `
      <div class="code-wrap">
        <div class="code-hdr">
          <span class="code-lbl">${label}</span>
          ${diffHtml}
        </div>
        ${innerContent}
      </div>`;
  }
}

customElements.define('code-block', CodeBlock);
