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
const latestVersionUrl = "https://pub-d671fdad660b43a8a4b99ede58b7c092.r2.dev/latest/version.json";

if (latestVersion) {
  fetch(latestVersionUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`version.json の取得に失敗しました: ${response.status}`);
      return response.json();
    })
    .then((release) => {
      if (!release.version) throw new Error("version.json にバージョン情報がありません。");
      latestVersion.textContent = `v${release.version}`;
    })
    .catch(() => {
      latestVersion.textContent = "取得できませんでした";
    });
}
