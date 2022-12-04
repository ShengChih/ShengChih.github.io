---
title: Scope, First-class function, Closure
---

關於作用域，先來說說這一段簡單的小程式好了...
![](/images/20221204/js-scope.png)

## Scope
Scope 定義變數使用的範圍，主要是為了限制變數在程式裡作用的範圍，也限制其他作用域在運算時不因為重名而影響變數的數值，讓程式產生可預期的結果，另外也避免空間資源被過度濫用:

L1: 定義 message 為一個全域變數，表示所有作用域都可存取的變數，反之都稱為局部變數。

L9: 定義 message 為一個局部變數，僅在 returnLocal 裡面作用，其他作用域無法存取該變數，該變數之後也會被釋放占用的記憶體空間。

變數查找的行為會由內至外，也就是說從最近的作用域往外找，譬如 L5 `return message` 在 function `returnGlobal` 嘗試存取 message 這個變數，但發現沒有定義 message 這個變數，因此會再往外找到 L1 message 的全域變數，並存取其值返回給呼叫者。

那麼再看看 function `returnLocal` 在 `return message` 一樣也是先找到最近的作用域，嘗試存取 message 變數，發現一個被賦值為 local1 的 message 變數，繼而返回給呼叫者。

再看看 function `closureFunc` return 一個箭頭匿名函數，裡面 return 一個 message，這個 message 匿名函數未定義，因此往外找到 closureFunc 定義的 message，而且經 L29 呼叫後，該 message 仍然可以回傳建立函數時的數值。

> Q: 全域變數是不是應該少用 ?
嗯，其實我會覺得是該少用，非到萬不得已才用它吧，因為需求上也很少例子是有一個變數會需要所有程式都去存取它，就算真的有一個變數需要很多地方去存取它，那通常也會把它變做一個 closure function 透過提供的 setter / getter interface 來去做操作。程式是多人協作，且在命名變數上通常會取比較有語意來方便閱讀及了解程式邏輯，因此變數重名是很常發生的，但若變數沒有任何保護機制，就很容易覆寫掉，導致程式不預期的結果產生。

程式裡的環境變數通常是所有作用域都會存取且不會改變它，如果有全域變數會被頻繁修改，且跨好幾的檔案還是 function，那通常隱含了一種程式的壞味道。

## Closure

再來說說 Closure，上面提到 returnLocal function 內的變數 message，其作用域在函數裡面，外面無法直接存取，且經呼叫後一陣子因為無人使用，會被記憶體的回收機制回收並釋放資源。如果需求是單純運算資料在後續的程式也不會被使用到，使用類似像 returnLocal 這樣的 function scope 方式就行了。若你既想在後續的程式使用，且經運算後的值之後仍會被累積存取使用，且想要保護這個變數，那麼 Closure 就常來被這樣使用了。

Closure 通常是擁有 first-class function 特性的程式語言提供，在說明 function 既可以被拿來當作變數賦值，也可當作回傳值，如 L13 將一個匿名函數賦值給 closureFunc 這個變數，和 L17 這樣我呼叫了 closureFunc 結果得到另一個函數。

Closure 指的是一個函數保有自己的 Free variable，這個變數和當時函數建立的環境綁定在一起，既不會經執行後被釋放空間，且經運算的結果仍會被保留，之後可以再被使用。

再看看這一小段 closure 的應用，函數 store 內 L2 定義了 counter 這個函數變數，而 L4 return 了一些對 counter 變數的一些操作方法，這樣可以取代 global 變數的寫法，既限制了 counter 被任意存取的問題，又提供你自定義可存取的操作。
![](/images/20221204/closure.png)

我覺得關於更細節的底層機制，可以參考這些人的文章，有助於理解更多事情

譬如編譯器怎麼解譯 JS ? 怎麼從內而外查找變數並訪問 ? 或更多相關於怎麼限制變數存取的方式?
或被這樣設計出來的目的是 ?

## Ref:
[You-Dont-Know-JS: Scope & Closures - 2nd Edition](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
[你懂 JavaScript 嗎？#10 範疇（Scope）](https://www.cythilya.tw/2018/10/17/what-is-scope/)
[你懂 JavaScript 嗎？#12 函式範疇與區塊範疇（Function vs Block Scope）](https://www.cythilya.tw/2018/10/19/function-vs-block-scope/)
[重新認識 JavaScript: Day 19 閉包 Closure](https://ithelp.ithome.com.tw/articles/10193009)
[Closure example](https://openhome.cc/zh-tw/javascript/function/closure/)
[[面試] 前端工程師一定要會的 JS 觀念題-中英對照之上篇](https://medium.com/starbugs/%E9%9D%A2%E8%A9%A6-%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%AB%E4%B8%80%E5%AE%9A%E8%A6%81%E6%9C%83%E7%9A%84-js-%E8%A7%80%E5%BF%B5%E9%A1%8C-%E4%B8%AD%E8%8B%B1%E5%B0%8D%E7%85%A7%E4%B9%8B%E4%B8%8A%E7%AF%87-3b0a3feda14f)