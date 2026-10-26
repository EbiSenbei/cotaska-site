# Cotaska Site

Cotaska の公式サイトです。

サイトURL: https://ebisenbei.github.io/cotaska-site/

## Files

- `index.html`: トップページ
- `usage.html`: タスク管理とAIチャットの基本操作
- `examples.html`: AIとタスクを進める4つの利用例
- `download.html`: GitHub Releasesの最新版インストーラーを案内するダウンロードページ
- `sitemap.xml`: Google Search Consoleへ送信する4ページのサイトマップ
- `styles.css`: スタイル
- `script.js`: モバイルメニュー、表示アニメーション、最新版取得
- `assets/`: ロゴ、favicon、スクリーンショット、利用例の画像

## 公開時の方針

サイトの構成とデザインは `site-preview_v04` を基にしています。プレビューに残っていたPortable ZIPの案内は採用せず、公開サイトのダウンロード導線はGitHub ReleasesのWindows x64インストーラーを維持します。


## T-0295 ローカル導線の整備（2026-10-25）

- `index.html#intro-video`: T-0294の60秒紹介動画・日本語字幕・選定画像。動画は操作時だけ読み込む。
- `download.html`: 最新インストーラーをGitHub APIで取得。失敗・欠損時は公式リリースへ進む既存リンクを保持。
- `usage.html#first-task`: インストール、専用の空フォルダでプロジェクト作成、「すべて」から1件登録、保存確認。
- `index.html#support`: 既存のGitHub Issuesと更新履歴。外部サービスの設定は変更しない。
- 素材の正本はCotaska側の `10_docs/20_設計/50_共通資料/20_デザイン素材/30_紹介動画` と `40_公開用画像`。`assets/intro/` は公開用コピー。
- `assets/intro/cotaska-v3.vtt`: 採用SRTをWebVTTへ形式変換。音声クレジットは動画とページに維持。

ローカルプレビュー：このフォルダで `python -m http.server 8295 --bind 127.0.0.1` を起動し、`http://127.0.0.1:8295/` を開く。
GitHub Pagesは `main` ブランチのルートを公開する構成。サイトの変更はこのリポジトリでコミット・pushし、公開処理の成功と公式URLでの表示を確認する。新規Windows環境でのインストールから初回登録までの確認は、サイト公開とは別に実施結果を記録する。

2026-10-26：320/390pxの4ページ表示を確認。AI説明の1列化、画像の比率保持、原寸画像へのリンクを整備。検証用仮ページは公開対象に含めない。新規Windowsでの導入確認は別環境での実施結果待ち。
