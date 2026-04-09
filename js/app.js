/**
 * app.js — Core navigation and interaction logic for DS&SD
 * Dynamically imports all section modules, then initialises the app.
 */

// ── Web Components — must register before sections are injected ──────────────
import '../components/problem-card.js';
import '../components/code-block.js';
import '../components/lang-toggle.js';

// ── Section registry (order defines nav order) ──────────────────────────────
const SECTIONS = [
  'complexity','arrays','hashmaps','twopointers','slidingwindow',
  'stack','queue','linkedlist','binarysearch','recursion',
  'trees','bst','heaps','graphsbfs','graphsdfs',
  'dpintro','dp1d','dp2d','greedy','tries',
  'sorting','bitmanip','framework',
  'sdfundamentals','scalability','databases','caching','apidesign','messagequeues',
  'urlshortener','twitterfeed','ratelimiter','distcache',
  'notification','filestorage','chatsystem','searchauto'
];

// ── Navigation ───────────────────────────────────────────────────────────────
export function goto(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('sec-' + id);
  if (el) {
    el.classList.add('active');
    document.getElementById('main').scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(`'${id}'`)) n.classList.add('active');
  });
  updateProgress();
}

export function jumpToGroup(type) {
  goto(type === 'dsa' ? 'complexity' : 'sdfundamentals');
}

// ── Problem card toggle ──────────────────────────────────────────────────────
export function toggleProblem(header) {
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.prob-expand');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  arrow.textContent = isOpen ? '▶' : '▼';
}

// ── Language toggle (JS / Python) ────────────────────────────────────────────
export function setLang(btn, lang, id) {
  const group = btn.parentElement;
  group.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b === btn));
  const jsP = document.getElementById(id + '-js');
  const pyP = document.getElementById(id + '-py');
  if (jsP) jsP.classList.remove('active');
  if (pyP) pyP.classList.remove('active');
  const target = document.getElementById(id + '-' + lang);
  if (target) target.classList.add('active');
}

// ── Progress bar ─────────────────────────────────────────────────────────────
export function updateProgress() {
  const main = document.getElementById('main');
  const pct = (main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100;
  document.getElementById('progress').style.width = Math.max(2.7, pct) + '%';
}

// ── Expose to global scope so inline onclick handlers work ───────────────────
window.goto          = goto;
window.jumpToGroup   = jumpToGroup;
window.toggleProblem = toggleProblem;
window.setLang       = setLang;
window.updateProgress = updateProgress;

// ── Bootstrap: load all sections then show the first one ─────────────────────
async function init() {
  // Import all section modules. Each one appends its section div to #main.
  await Promise.all(
    SECTIONS.map(id => import(`../sections/${id}.js`))
  );
  goto('complexity');
}

init();
