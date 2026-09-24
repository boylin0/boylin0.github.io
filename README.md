# BOYLIN0's Github Pages

個人網站 https://boylin0.github.io 的原始碼，包含 LiveABC 解答工具與 FlappyDuck 小遊戲。

## 技術棧

| 項目 | 使用 |
| :--- | :--- |
| 框架 | React 19、TypeScript |
| 建置 | Vite |
| 路由 | TanStack Router，路由檔放在 `src/routes/` |
| 樣式 | Tailwind CSS、shadcn/ui |
| 遊戲引擎 | PixiJS |
| Lint 與格式化 | Biome |

## 如何在本機開發

需要 Node.js 24 與 pnpm 11。

```sh
pnpm install
pnpm dev
```

## 常用指令

| 指令 | 用途 |
| :--- | :--- |
| `pnpm dev` | 啟動開發伺服器 |
| `pnpm build` | 建置到 `dist/` |
| `pnpm preview` | 在本機預覽建置結果 |
| `pnpm lint` | 檢查 lint 與格式 |
| `pnpm lint:fix` | 自動修正 lint 與格式 |
| `pnpm typecheck` | 型別檢查 |
| `pnpm stats` | 產生首頁的 GitHub stats 圖 |

## 如何部署

推送到 `master` 後，GitHub Actions 會執行 lint、型別檢查與建置，並部署到 GitHub Pages。Repo 的 Pages 來源必須設為 GitHub Actions。

## 如何產生 GitHub stats 圖

首頁 GitHub Activity 區塊的圖由 `pnpm stats` 產生到 `public/github-stats/`。部署 workflow 每天執行一次，產生失敗的圖在網站上會隱藏。

| 圖 | 來源 |
| :--- | :--- |
| 3D 貢獻日曆，白底彩虹配色 | yoshi389111/github-profile-3d-contrib |
| 貪食蛇貢獻圖 | Platane/snk，需要 Docker |
| stats 與常用語言卡片 | github-readme-stats |
| 個人總覽、等角貢獻日曆、三年貢獻日曆 | lowlighter/metrics，需要 Docker |

完整執行約需 5 分鐘。

這些圖需要具備 `repo` 與 `read:user` 權限的 classic personal access token。fine-grained token 無法使用。

- **部署時**：把 token 存成 repo secret `STATS_TOKEN`。沒有設定時改用 workflow 內建的 token，只統計公開資料，lowlighter/metrics 的圖則不會產生。
- **本機開發時**：複製 `.env.example` 為 `.env.local` 並填入 `STATS_TOKEN`，再執行下列指令。

  ```sh
  cp .env.example .env.local
  pnpm stats
  pnpm dev
  ```

## 如何新增 shadcn/ui 元件

```sh
pnpm dlx shadcn@latest add <component>
```

元件會產生在 `src/components/ui/`。

## 如何更新 LiveABC 題庫

題庫在 `src/features/liveabc/data/problems.json`，格式為題號對應答案。在 LiveABC 頁面鍵入 `dev` 會出現「解析詳解」按鈕，貼上詳解頁的 HTML 後即可產生可貼進題庫的 JSON 片段。
