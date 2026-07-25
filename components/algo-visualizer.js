/**
 * <algo-visualizer> — Step-through animation player (Light DOM)
 *
 * Generic playback engine for algorithm/complexity visualizations.
 * A section script builds a `steps` array (plain state snapshots) and a
 * `render(stageEl, step, idx, steps)` function that paints one step into
 * the stage. This component owns play/pause/step/speed/scrub controls and
 * the narration line — it knows nothing about arrays, hashmaps, etc.
 *
 * Usage:
 *   <algo-visualizer title="HashSet Pair Counting"></algo-visualizer>
 *   <script>
 *     document.getElementById('viz-p1').load(steps, (stage, step) => { ... })
 *   </script>
 */
class AlgoVisualizer extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') ?? 'Visualization';

    this.innerHTML = `
      <div class="viz-wrap">
        <div class="viz-hdr">
          <span class="viz-lbl">${title}</span>
          <span class="viz-step-counter"><span class="viz-idx">0</span> / <span class="viz-total">0</span></span>
        </div>
        <div class="viz-stage"></div>
        <div class="viz-narration">Press play to animate.</div>
        <div class="viz-controls">
          <button type="button" class="viz-btn" data-act="reset" title="Restart">⏮</button>
          <button type="button" class="viz-btn" data-act="back" title="Step back">◀</button>
          <button type="button" class="viz-btn viz-play" data-act="play" title="Play / Pause">▶ Play</button>
          <button type="button" class="viz-btn" data-act="fwd" title="Step forward">▶</button>
          <input type="range" class="viz-scrub" min="0" max="0" value="0" title="Scrub">
          <select class="viz-speed" title="Speed">
            <option value="1600">0.5×</option>
            <option value="900" selected>1×</option>
            <option value="450">2×</option>
            <option value="200">4×</option>
          </select>
        </div>
      </div>`;

    this._stage      = this.querySelector('.viz-stage');
    this._narration   = this.querySelector('.viz-narration');
    this._idxEl       = this.querySelector('.viz-idx');
    this._totalEl     = this.querySelector('.viz-total');
    this._playBtn     = this.querySelector('.viz-play');
    this._speed       = this.querySelector('.viz-speed');
    this._scrub       = this.querySelector('.viz-scrub');
    this._idx         = 0;
    this._steps       = null;
    this._render      = null;
    this._timer       = null;

    this.querySelector('[data-act="reset"]').addEventListener('click', () => this.goTo(0));
    this.querySelector('[data-act="back"]').addEventListener('click', () => { this.pause(); this.goTo(this._idx - 1); });
    this.querySelector('[data-act="fwd"]').addEventListener('click', () => { this.pause(); this.goTo(this._idx + 1); });
    this._playBtn.addEventListener('click', () => this.togglePlay());
    this._scrub.addEventListener('input', () => { this.pause(); this.goTo(Number(this._scrub.value)); });
  }

  /** steps: array of plain objects. render(stageEl, step, idx, steps) paints one frame. */
  load(steps, render) {
    this.pause();
    this._steps  = steps;
    this._render = render;
    this._idx    = 0;
    this._totalEl.textContent = steps.length - 1;
    this._scrub.max = steps.length - 1;
    this.goTo(0);
  }

  goTo(i) {
    if (!this._steps) return;
    this._idx = Math.max(0, Math.min(i, this._steps.length - 1));
    this._idxEl.textContent = this._idx;
    this._scrub.value = this._idx;
    const step = this._steps[this._idx];
    this._render(this._stage, step, this._idx, this._steps);
    this._narration.textContent = step.note ?? '';
    if (this._idx >= this._steps.length - 1) this.pause();
  }

  togglePlay() {
    if (this._timer) this.pause();
    else this.play();
  }

  play() {
    if (!this._steps) return;
    if (this._idx >= this._steps.length - 1) this.goTo(0);
    this._playBtn.textContent = '⏸ Pause';
    const tick = () => {
      this.goTo(this._idx + 1);
      if (this._idx >= this._steps.length - 1) return;
      this._timer = setTimeout(tick, Number(this._speed.value));
    };
    this._timer = setTimeout(tick, Number(this._speed.value));
  }

  pause() {
    clearTimeout(this._timer);
    this._timer = null;
    this._playBtn.textContent = '▶ Play';
  }

  disconnectedCallback() {
    this.pause();
  }
}

customElements.define('algo-visualizer', AlgoVisualizer);
