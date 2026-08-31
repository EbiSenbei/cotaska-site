const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const latestVersion = document.querySelector("#latest-version");
const downloadInstaller = document.querySelector("#download-installer");
const latestVersionUrl = "https://api.github.com/repos/EbiSenbei/cotaska-site/releases/latest";

if (latestVersion) {
  fetch(latestVersionUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub Releaseの取得に失敗しました: ${response.status}`);
      return response.json();
    })
    .then((release) => {
      if (!release.tag_name) throw new Error("GitHub Releaseにバージョン情報がありません。");
      latestVersion.textContent = release.tag_name;

      const installer = Array.isArray(release.assets)
        ? release.assets.find((asset) => /^Cotaska-.*-win-x64\.exe$/i.test(asset.name || ""))
        : null;
      if (downloadInstaller && installer?.browser_download_url) {
        downloadInstaller.href = installer.browser_download_url;
        downloadInstaller.textContent = `${release.tag_name} をダウンロード`;
      }
    })
    .catch(() => {
      latestVersion.textContent = "取得できませんでした";
    });
}
