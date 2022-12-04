---
title: JS hosting
---

關於 hosting 我覺得已經有很詳細的文章，在說明整個運作及很多設計及實作細節都有在這篇文章寫出來。

[我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)

說實在我也寫不出這種文章 XD，還好我只要讀 & 擷取就好

不過還是讓肌肉訓練一下

- 你知道什麼是 hoisting
JS 進入執行前，會先將所有宣告會先提前執行 (編譯階段)，而賦值的動作是在執行後才開始執行。
實際上的程式不會變動，但經過解譯器或編譯器出來的結果會提前到最前面。
- 你知道 hoisting 只會提升宣告而非賦值
如上
- 你知道 function 宣告、function 的參數以及一般變數宣告同時出現時的提升優先順序
function 宣告優先權比一般變數高，如圖
![](/images/20221204/hosting-order.png)
function 參數賦值比 function 內部賦值快，如圖
![](/images/20221204/hosting-function-order.png)
- 你知道 let 跟 const 沒有 hoisting
let & const 有 hosting，但行為跟 var 有點不同
![](/images/20221204/hosting-let.png)

- 你知道第五點是錯的，其實有但只是表現形式不一樣
- 你知道有關第六點，有個概念叫做 TDZ（Temporal Dead Zone）
在「提升之後」以及「賦值之前」這段「期間」，如果你存取它就會拋出錯誤。
而這段期間就稱做是 TDZ，它是一個為了解釋 let 與 const 的 hoisting 行為所提出的一個名詞。
![](/images/20221204/hosting-tdz.png)
- 你看過 ES3 的規格書，知道裡面是怎麼描述的
忽略
- 你看過 ES6 的規格書，知道裡面是怎麼描述的
忽略
- 你知道 hoisting 背後的原理是什麼
簡單的說法，編譯階段先對宣告的語法提升產生 VO，在執行階段透過 VO 去存取數值
- 你看過 V8 編譯出來的程式碼
忽略

另外看到的是
函數表達式不會被 hosting (因為它是賦值的語法，按照前面知道的，只有宣告式才會被提前)，函數宣告式才會
![](/images/20221204/hosting-function-difference.png)



## Ref.
[我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)