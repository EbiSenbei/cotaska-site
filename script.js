const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('is-open');
}));

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((item) => observer ? observer.observe(item) : item.classList.add('is-visible'));

const latestVersion = document.querySelector('#latest-version');
const downloadInstaller = document.querySelector('#download-installer');
const downloadStatus = document.querySelector('#download-status');
if (latestVersion) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch('https://api.github.com/repos/EbiSenbei/cotaska-site/releases/latest', { signal: controller.signal })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('Release lookup failed')))
    .then((release) => {
      const version = String(release.tag_name || '').replace(/^v/, '');
      const names = [`Cotaska-${version}-win-x64.exe`, `CotaskaCore-${version}-win-x64.exe`];
      const installer = Array.isArray(release.assets)
        ? names.map((name) => release.assets.find((asset) => asset.name === name && asset.state === 'uploaded')).find(Boolean)
        : null;
      if (!version || release.draft || release.prerelease || !installer) throw new Error('Installer unavailable');
      const url = new URL(installer.browser_download_url);
      if (url.origin !== 'https://github.com' || !url.pathname.startsWith('/EbiSenbei/cotaska-site/releases/download/')) throw new Error('Unexpected download source');
      latestVersion.textContent = release.tag_name;
      if (downloadInstaller) {
        downloadInstaller.href = url.href;
        downloadInstaller.textContent = `${release.tag_name} インストーラーをダウンロード ↓`;
      }
      if (downloadStatus) downloadStatus.textContent = `${installer.name} / ${Math.round(installer.size / 1024 / 1024)} MB。取得後はインストールし、専用の空フォルダに新しいプロジェクトを作成してください。`;
    })
    .catch(() => {
      latestVersion.textContent = '公式リリースで確認';
      if (downloadStatus) downloadStatus.textContent = '最新版の情報を自動取得できませんでした。上のボタンで公式リリースを開き、AssetsのWindows x64インストーラー（.exe）を選んでください。';
    })
    .finally(() => clearTimeout(timeout));
}
