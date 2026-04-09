/**
 * <lang-toggle> — JS / Python tab switcher Web Component (Light DOM)
 *
 * Attributes:
 *   tid — Unique ID for this toggle group (used to build panel IDs: {tid}-js, {tid}-py)
 *
 * Children:
 *   <div slot="js">...</div>  — JavaScript content panel
 *   <div slot="py">...</div>  — Python content panel
 *
 * Usage:
 *   <lang-toggle tid="arr-p1">
 *     <div slot="js"><code-block label="HashMap Solution"><pre>...</pre></code-block></div>
 *     <div slot="py"><code-block label="HashMap Solution"><pre>...</pre></code-block></div>
 *   </lang-toggle>
 */
class LangToggle extends HTMLElement {
  connectedCallback() {
    const tid = this.getAttribute('tid')
      ?? `lt-${Math.random().toString(36).slice(2, 8)}`;

    // Extract slot content before clearing innerHTML
    const jsSlot = this.querySelector('[slot="js"]');
    const pySlot = this.querySelector('[slot="py"]');
    const jsHTML = jsSlot ? jsSlot.innerHTML : '';
    const pyHTML = pySlot ? pySlot.innerHTML : '';

    this.innerHTML = `
      <div class="lang-toggle">
        <button class="lang-btn active" onclick="setLang(this,'js','${tid}')">JS</button>
        <button class="lang-btn py"     onclick="setLang(this,'py','${tid}')">Python</button>
      </div>
      <div class="lang-panel active" id="${tid}-js">${jsHTML}</div>
      <div class="lang-panel"        id="${tid}-py">${pyHTML}</div>`;
  }
}

customElements.define('lang-toggle', LangToggle);
