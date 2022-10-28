---
title: 回顧 2022.10.23 - 2022.10.29 Todo - 前端知識 (三)
---

## 流水文

這週仍在做台灣旅遊景點導覽，比較常遇到的是重構 Component 問題 & HOC 實現及應用，還有 Component props interface 怎麼做的通用？ 還有 styles 要放到哪裡去 ?

讓我覺得比較卡的地方是 Typescript 於我而言是比較新學的程式語言，在定義 props 泛型型別常做修改

[前端知識 (二)](https://shengchih.github.io/2022/10/21/frontend-practice/)

```
HOC 實作
```
我很常覺得在切版或處理資料時，認為某些行為是有一定的 pattern。譬如每個區塊上方都要有`子標題` or `燈箱功能`來滑動圖片 or 一樣 table 不同 API 取得資料，這種跟元件呈現頁面無關，而跟程式寫出的 pattern 若雷同的，似乎可以用 HOC 解決。

像 Slider 這種功能，放在不同位置他要操作的行為一定都是，按右邊按鈕圖片要換下一張，按左邊的按鈕要回到上一張，類似 Pagnation 展示的實作很像，差別就在於按鈕要放在哪裡。

因此目前收斂出來的實作，像下面連結這樣，之後可以再擴充成可自訂的 styles

[withSlider](https://github.com/ShengChih/Taiwan_Tourguide/blob/dev/src/HOCs/withSlider/index.tsx)
[withSectionTitle](https://github.com/ShengChih/Taiwan_Tourguide/blob/dev/src/HOCs/withSectionTitle/index.tsx)

```
Component interface
```
嗯～很常覺得 fuction interface 做得通用是一個很吃經驗的事情，尤其要做給別人用的時候，但自己在做的時候，其實都是很依賴需求及其他 function 的實作，做得不好就會實作出比較高耦合的程式，接著需求怎麼改，功能變更也都會是破壞性的變更。若一開始開發時，就有 DI & TDD 這種軟工的概念加入，可能就會產出低耦合的程式，但中小型企業基本上是很少導入這些概念。若要知道怎麼做更好，我心裡可能覺得就一直寫下去，或多看大神的寫的套件，然後就能培養出這種經驗。

```
Style 放哪
```
根據上面的經驗學，這週我很常將 style 搬來搬去的，有個模糊界線就是 width / height / margin / padding / position 到底是要放在 container 上，還是放到 component 底下？
譬如一開始先寫個 component，但寫完後發現這個 component 很大，開始拆細小，拆到最後，又跟其他的 component 元件有類似的就又拆，inner component 開始從外部傳入，styles 也從外部傳入，留在 component 的 style 基本上是 component。

```
Axios singleton
```
之前在寫前端的時候，基本上沒有使用 singleton 來 create axios，因此其他檔案在引入 http client 都會建立，唯一沒遇到的是之前有用 VueJS 2 Quasa framework 開發，在 boots 時都會 create instance 並放到 Vue component 內了，但寫 React 時我沒用 singleton，這次在實作 TDXAPI 時候就也做了。

[HttpClient singleton](https://github.com/ShengChih/Taiwan_Tourguide/blob/dev/src/api/TDXApi.ts)

```
Modal 實作
```
Modal 經事件顯示後，很常 Modal 背後頁面會隨滑鼠上下滑動造成也跟著移動。
這我之前在用寫好的框架也沒啥注意這問題，要在 body: 加上 overflow-y: hidden，等 Modal 關閉後要 unset overflow。