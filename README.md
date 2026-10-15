# AI 人格心理測驗

一個以 React、Vite、Tailwind CSS 製作的25題互動測驗，結果對應 ChatGPT、Microsoft Copilot、Claude、Gemini、Perplexity 和 DeepSeek 六種特質。

## 本機運行

```bash
npm install
npm run dev
```

## 建置檢查

```bash
npm run build
npm run preview
```

## 發布到 GitHub Pages

1. 建立新的 GitHub repository。
2. 把本資料夾內全部檔案上傳到 repository 根目錄。
3. 前往 Settings > Pages。
4. 在 Build and deployment 的 Source 選擇 GitHub Actions。
5. 推送到 main 分支後，網站會自動部署。

`vite.config.js` 使用 `base: "./"`，可適應不同 repository 名稱。
