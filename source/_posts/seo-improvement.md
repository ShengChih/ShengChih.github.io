---
title: 跟 SEO 可能相關的小事 ? 
---

## HTTPS
- `<meta name="referrer">`
[有關於安全性的 Referrer 政策](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
[The Meta Referrer Tag: An Advancement for SEO and the Internet](https://moz.com/blog/meta-referrer-tag)


## 語意化 HTML
`<title>`
`<meta name="description" content="xxxxx">`
`<meta name="keyword" content="xxxxx">`
`<h1> <h2> ...`
`<img alt="xxx" title="xxx">`
`<a title="" rel="">`
`<strong>`
`<em>`
- [HTML 可訪問性](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [CSS / JS 最佳實作](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript)


## 重要內容
- 重要內容盡量往上放
- 不用 JS render


## 控制每頁的連結數
- 不需要 SEO 的連結可加上
`<a ref="nofollow">`
- 網站的連結深度不要太多，爬蟲不一定會全部爬完 (deep <= 3)


## 改善頁面載入速度
[DOM render](/2022/12/04/dom-render-process/)


## Meta tag

- viewport 設備跟邏輯像素一致，不可讓使用者縮放
`<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">`

- 用於社交網絡的屬性，FB 有使用到
`<meta property="og:xxx">`

- App Links
IOS
`<meta property="al:ios:url" content="applinks://docs">`
`<meta property="al:ios:app_store_id" content="xxxx">`
`<meta property="al:ios:app_name" content="App links">`

- Android
`<meta property="al:android:url" content="xx">`
`<meta property="al:android:app_name" content="xxx">`
`<meta property="al:android:package" content="xxx">`