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
if (latestVersion) {
  fetch('https://api.github.com/repos/EbiSenbei/cotaska-site/releases/latest')
    .then((response) => response.ok ? response.json() : Promise.reject())
    .then((release) => {
      latestVersion.textContent = release.tag_name || '最新版';
      const installer = Array.isArray(release.assets)
        ? release.assets.find((asset) => /^(?:CotaskaCore|Cotaska)-.+-win-x64\.exe$/i.test(asset.name || ''))
        : null;
      if (downloadInstaller && installer?.browser_download_url) {
        downloadInstaller.href = installer.browser_download_url;
      }
    })
    .catch(() => { latestVersion.textContent = '最新版'; });
}
