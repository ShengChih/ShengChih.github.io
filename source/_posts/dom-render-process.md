---
title: DOM render
---

嗯，之前看到這篇文章，一直知識這塊大概只需要點擊收藏，大概就是高近視的老師閱券，嗯，學會了 XD
[DOM performance](https://gist.github.com/ShengChih/e47961feace907b444bae558a6333974)
[Web Performance Optimization](https://www.youtube.com/playlist?list=PLAwxTw4SYaPmKmNX-INgcxQWf30KuWa_A)
[Rendering Performance](https://web.dev/rendering-performance/)

一樣先來個肌肉訓練，進入正題好了，先說瀏覽器透過網址向 server 取得 response 內容 (HTML)，並且開始建構 DOM tree 的流程。
有些還沒有看完，之後再回頭補完好了。

## 解析 HTML
- Browser 向 server 取得 html
- 解析 HTML 成 tokens, 如 tagName, Attributes
- tokens 再轉成 nodes
- nodes 再轉成 DOM tree
- CSSOM 從 css rules 建構出來

> 解析 HTML 過程裡，有一些渲染阻塞的問題，而在阻塞過程都以白屏顯示:
> DOM tree 是逐步解析 HTML，且逐部增加的，不是一次性的加入
> 解析過程若遇到 `<link>` token，還是 `<script>` token，這都會阻塞 DOM tree 的建構
> 因為這些檔案，可能牽涉 DOM render 資訊，如 SPA，JS 可以 render DOM / 調整 style
> CSS 檔案則可以再產生出新的 CSSOM 節點
> 另外，CSSOM 無法被建構成一個完整的 tree，因為並非每一個 DOM 都有 styles 屬性，想靠 styles 建立出完整的 tree 是不可能的，因此它只能依賴著 DOM tree 去附加 styles 屬性

## Render tree - 根據 CSSOM 及 DOM tree 合併 
- 當所有 JS / CSS 及 HTML 都已完成處理，CSSOM + DOM tree 會合併成一棵 Render tree
    - 這包含了可視元件及其 styles 的運算
    - 不可視的元件會被 prune 掉，以節省資源，如 meta / link / head 這種 
    - Reflow 階段會去計算所有可視節點的位置和大小
    - 決定多層頁面 layer (z-index / fixed / absolute )

## Paint
- 當 render tree 已經將所有 layout style (位置/大小/圖層)相關都已處理完畢，因此就只需要輸出到畫面

> JS 執行 & 渲染 Paint 都在主執行緒執行，若互相搶取資源就會造成畫面卡頓。


## 效能改善的方案

### 減少 repaints & reflow 觸發次數
- 批量修改 styles
- 批量新增 / 修改 / 刪除 DOM
- 使用 visibility: hidden/visible  取代 display: none
- 使用 transform 取代  top / left / bottom / right
- preload locally font file (字型會影響 layout 造成 reflow)
- image 可事先定義 layout 大小，不會載入圖片後造成 reflow
- 建立圖層 z-index / fixed / absolute
- viewport 大小改變
- :hover, :before, :after

### 阻塞資源
- 減少不必要的資源請求
- 合併多個小資源的請求
- 只載入必要的資源 (使用 js tree shaking & 移除未用的 css)
- 最小化資源 (使用 server gzip & 壓縮 js / css)
- 廣告 tracking 非網站主要運行邏輯，可延後載入，使用 defer & async
- 縮小 font 檔案
- `<script>` 放在 `<body>` 下方，為了防止因阻塞而頁面 render 不全
    - async: 異步下載完後執行，HTML parsing 可能被阻塞，僅對外部資源有效
        - 跟 DOM 無關的 js，可能先於 DOMContentLoaded 也可能後於 DOMContentLoaded
    - defer: 先下載不馬上執行，等 HTML parsing 完後，才開始依序執行，僅對外部資源有效
        - 依賴 DOM 的 js，先於 DOMContentLoaded
- `<link rel="prefetch | preload | dns-prefetch | preconnect | prerender"> `
    - prefetch: 預先載入，但不先執行
    - prerender: 預先載入，並執行
    - preload: 優先載入的資源，通常為主要資源加載
    - preconnect: 預先建立 tcp / tls 連接
    - dns-prefetch: 預先查詢 dns