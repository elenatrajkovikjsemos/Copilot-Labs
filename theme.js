const THEME_KEY = 'copilotLabsTheme';

function getSavedTheme() {
  return localStorage.getItem(THEME_KEY);
}

function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const isDark = theme === 'dark';
  btn.textContent = isDark ? '🌙' : '☀️';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

function initTheme() {
  const saved = getSavedTheme();
  const initial = saved || getSystemTheme();
  applyTheme(initial);

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}

window.addEventListener('DOMContentLoaded', initTheme);
