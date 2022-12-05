---
title: Robots.txt & Sitemap
---

這個東西一直在第二個工作有看過，但只是很含糊地知道，說它重要也不是到真的很重要，但 memo 一下

大概就是在告知像 Google 這種搜尋引擎的爬蟲機制，我的網站哪些頁面可以讓你爬取，哪些頁面不用，因此你就會在 `robots.txt` 檔案內寫一些 Allow / Disallow 的連結規則，然後允許哪些 User-Agent 爬蟲訪問，還有 Sitemap 連結。

`sitemap.xml` 是可以詳細到給爬蟲，爬取的優先權，連結帶入的參數有哪些之類的設定

但即使這樣設定不允許的清單，爬蟲的機制可能還是會忽略全爬，那就必須要在 html `<meta>` 再加上一些條件
```
// 該頁不處理
<meta name="robots" content="NOINDEX">

// 該頁下的連結都不處理
<meta name="robots" content="NOFLLOW">

// 該頁不用建立快取副本
<meta name="robots" content="NOARCHIVE">
```

這樣有幾個目的:
1. 讓爬蟲避開仍在測試的網頁
2. 不具內容資訊的網頁 (如有些金流交易的頁面，爬蟲訪問也會造成 server loading 變高，影響服務穩定性)


robots.txt / sitemap.xml 實作:
1. 公開的靜態檔案 (Nginx static folder / S3)
2. 由 Server API 回應