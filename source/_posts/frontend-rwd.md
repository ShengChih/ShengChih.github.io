---
title: 回顧2022.10.09 - 2022.10.15  Todo - 前端知識 (一)
---

## 流水文
繼 fingerstyle OAuth2.0 實作完後，由於我過去經驗都是以後端工作居多，前端工作的比例很少，通常都是前端套件套一套，而待的公司都是企業的解決方案，不是面向客戶使用者的居多，所以對 UI/UX 或漂亮的前端無緣，對 RWD & AWD 的要求也不多，因此呢，前端我一直自認都是不處於那麼精熟，基礎不紮實，處理不需美工的畫面工作還堪用。

由於今天 F2E 前端比賽要開始了，前幾屆我都是只收藏 or 聯絡設計師的設計作品，然後沒有時程的慢慢做，知識就也慢慢累積，但今年就比較有時間可以這樣瞎摸，就開始針對自己想精進的風向摸。

嗯，我先從 Facebook 社群 side project，聯絡設計師 KT 的台灣旅遊網站，開始從設計稿慢慢做。
就有遇到一些對其他前端工程師沒問題，但我就很納悶的問題

```
Q: 設計稿只出 mobile(360)/tablet(768)/pc(1280)
```
那我應該不可能就只針對 DOM 位置 / 長寬高寫死 px 吧 ?
如果我的螢幕或裝置是 >> 1440 | 767 | 1279 | 359 這種落在常用斷點的邊際，奇怪的長寬，一直固定 px 應該很怪，因為之前待過一年多的電商，所以知道等比例縮放的解決方式，嗯，請選擇 rem | vw，設計圖要用 px to rem 或者 px to vw 的解決方式。

但 px to rem 算是瀏覽器還不支援 vw 的過渡解決方案，現在都傾向 px to vw 。

之前我待過的電商，那時是用 jQuery + (sass func | JS) 去轉 px 單位，然後我一開始用在專案裡面，也是採用類似的搭配 ReactJS + CSS in JS 方案去偵測螢幕裝置拿來轉 px 單位，但專案裡面我又有使用 TailwindCSS，因此我又有遇到新的問題。

```
Q: CSS 兩派之爭： 要不要使用 styled-component (CSS in JS)
```
嗯，兩派都有擁護者，嗯，不管，我傾向用 TailwindCSS 就是不想在 Component 寫一堆 CSS，而且我有意想知道 TailwindCSS 的使用方式，專案畫面的動態也沒有複雜要使用 CSS in JS，另外我不是很喜歡這樣混雜著寫，所以決定使用非 CSS in JS 的解決方案。隨著專案變大，維護者有進有出，程度跟想法都有差異，若團隊沒有設定命名方式，最後可能就比較難維護，因此我又遇到 CSS 命名規則問題 & 避免無用的 CSS 產生，但我覺得這問題不管選哪種方案都會遇到...，需要可重用的樣式 / 多餘的樣式等這些都是維護成本吧。

[2022/10/21]
這邊後來還有一個 global scope 的問題，這邊通常會用 styled-component 或 css module 來處理，讓styles 在自己的 component 作用，不影響其他元件。

BEM 命名規則，若按結構命名，很容易有嵌套巢狀的結構，這裡要適時打破結構，搭配 css module，就不會遇到 global scope 的問題。

CSS modules 在寫可重用的元件，似乎沒有 styled-component 直接覆寫的方便。
例如元件引用了基礎的 css module，你從其他更高階的元件引入後，想覆寫他的 css，很常會愈到 css 權重來決定要不要套用 css，若無法你就只能寫 `!important` 或想辦法加上權重更高的 html attribute.

要不然元件都需要在 props 多傳入 className | style，或繼承 ReactNode 這樣可以從外部丟入 class name 或使用 inline style。

```
Q: CSS 設計模式 & 命名規則
```
嗯，開始參考 ~，由於專案只有我一個人在做，因此我覺得命名是多方嘗試且練習。

[CSS 設計模式 & 命名規則](https://linyencheng.github.io/2022/09/07/relationships-between-frontend-and-backend/css-design-pattern-with-bem-smacss-oocss-atomic-css/)
[CSS 框架](https://linyencheng.github.io/2022/09/09/relationships-between-frontend-and-backend/css-framework/)
[CSS in JS 參考 1](https://linyencheng.github.io/2022/09/10/relationships-between-frontend-and-backend/css-in-js-with-reactjs/)
[CSS in JS 參考 2](https://zhuanlan.zhihu.com/p/103522819)
[CSS in JS 套件](https://github.com/MicheleBertoli/css-in-js)

嗯，回到上面 px to vw 的解決方案，最後找了同為 postcss plugin (postcss-px-to-viewport) 的套件來使用，研究後我又遇到一個問題，它只能設定一個 config，若我有多個 device 設計稿，自動 px to vw 不能用錯設計稿的 base 轉 viewport

```
Q: postcss-px-to-viewport 套件，根據不同裝置 config 去轉 px to vw
```
嗯～，研究一陣子，將不同裝置的 css 來寫到不同檔案路徑，然後 config designed base 可以依不同路徑套用不同 designed base 就可以轉出正常的 vw，登登！！

喔，我是用 Vite + PostCSS plugin，所以參考資料較少，還好弄得出來。
[Vite 根據不同裝置設定 postcss-px-to-viewport](https://github.com/ShengChih/Taiwan_Tourguide/blob/dev/vite.config.ts)

這個解決之後，繼續往下開發，又遇到新問題....

- 2022/10/21
[轉換單位的誤差](https://judes.me/frontend/2018/01/07/why_circle_not_round.html)

```
Q: Postcss plugin 對 nesting css 支援，似乎有問題？
```
我在寫 @meida 裡面用了 @import 或者 tailwind @apply，類似下面這種錯，但我用了裡面的解決方式無效。
[CSS Nested at-rules error 之一](https://github.com/tailwindlabs/tailwindcss/issues/4995)
[CSS Nested at-rules error 之二](https://github.com/tailwindlabs/tailwindcss/discussions/7683)

目前還未解決，但我的思路是想，sass @import 的語法是由 postcss-import 這個 plugins 提供，@media 是原生 css，我又再裡面用 tailwindcss @apply 這是由 tailwindcss plugins 提供，
nesting css 是由 postcss-nesting and tailwindcss/nesting plugins 提供，應該只是先後 parser 順序不對吧，或者不能只單純用 plugins 先後順序，可能要對這幾個 postcss plugins 寫一些客製判斷吧。

今日先這樣。

- 2022/10/21 後來發現只是我在寫 scss，單純沒寫到 ; 所以造成 parse 錯誤，補上就都正確了
另外 postcss-nesting 已經停止維護，改用 postcss-nested 取代。
