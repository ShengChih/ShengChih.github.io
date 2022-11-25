---
title: 回顧 2022.11.14 - 2022.11.18 - 點點簽
---

##瀑布文

TheF2E4th 第二週要實作一個簡易的電子簽核流程，設計稿一樣還是選擇 K.T 的設計稿，很常選他的原因是因為我也不知道我會做多久，而他的設計稿是可以透過 FB side project 社團詢問分享的，其他人的我就沒那麼有信心在活動後，還可以使用的。

一開始大概也是參考主辦給的資訊，看看 sample code & library 使用方式，看看哪些要銜接的地方要注意
但一開始做到 canvas 簽名就有個問題，做了第一個版本沒甚麼問題。
但後來看到有些文章在使用 web worker，所以我中間幾乎花 1-2 天在看 web worker 的使用，裡面牽扯了一些 worker 傳遞訊息時，直接傳遞圖片 or canvas 實例 or callback function 問題，應該使用 call by reference。

因此研究了 OffscreenCanvas 來做 canvas reference，但 OffscreenCanvas 還算是一個實驗性的功能，不一定所有瀏覽器最新版本都被支援，就特別做了處理。處理就只是個判斷式也是還好，比較有問題的是 OffscreenCanvas 只能被 init 一次，這才是大問題，我原本特別寫了 useWorker 之類的 hook 來處理，但 React re-render 的問題，即使使用了 useRef &useCallback & memo 來避免 re-render，但還是免不了真正當值需要異動而造成的 re-render，後來覺得花了太多時間在 web worker 上怕比賽時間不足，就暫時先關了這功能回到最初版，這次就先大概了解就好了。

web worker 我原本還想說是不是可以在做一個 worker pool 來管理 worker，但後來也發現個問題，那就是 worker 在完成後如何在被派發出去處理 onmessage 的事件，邏輯上都沒問題，在於 worker pool 這些 worker shared 狀態需要 mutex 來做 lock，我原本以為可以不用 XD，但後來想想好像避不開，就覺得這 worker pool 機制看起來能動，但大概是一個有問題的 worker pool，後來再研究看看就看到 actor model。

[Actor model](https://blog.techbridge.cc/2019/06/21/actor-model-in-web/)

[Web worker & Actor model](https://stackoverflow.com/questions/36654401/do-web-workers-use-actor-model)

嗯，我覺得是我的 useWorker 設計不對，要給 worker 處理的事情每次應該都不相關，而且可能也不需要用 worker pool 來管理 worker，可能應該改成每次要請 worker 做事都是實例化，處理完後就 release 這樣就沒有需要 mutex 的問題吧阿拉。

但那樣要整個把 useWorker 實作重寫一遍，而且還是要處理 OffscreenCanvas 只能被 init 一次的問題(這應該只能每次都建立新的 canvas 並將舊的 canvas 資料寫到新的上，然後在 init 給 worker 處理)，但光是這些，其實我給 worker 的處理的東西，計算量也不大，而且 worker 間的傳輸也需要成本，我就有點用牛刀割雞了，最後我先 pass，繼續往後做了。

往後做到 pdfjs 轉圖，再由 fabric.js 載入，將圖片 scale 後放到 container dpi 超低，即使能簽名，最後儲存檔案的結果幾乎看不到字，糊成一團，又花不少問題在查這問題。問題在於 pdfjs 轉圖時，輸入的 scale 參數就是決定圖片的解析程度，但你既不知道 pdf 原本是多少 dpi，所以只能對 scale 乘上幾倍來讓輸出圖好一點。

但這會又造成另一個問題，就是從透過 fabric.js 將圖載入到 canvas 上，會有幾個問題，圖長寬很大，container 很小，這可以用 canvas width/height 來設定 pixel 長寬，在透過呼叫 canvas context scale 縮小大圖，可以得到高 dpi 的圖片，這是我解完的第一個問題；第二個問題我就卡住了....，原因在於，fabric.js 每次透過 function 都會重新實例化新的 canvas 將舊的 canvas 編輯的 history 再重新 repaint 上去，可是我為了前面第一個問題對 fabric 內部的 canvas 做 scale 的操作，也都被 fabric.js 做了，因此後續插入的文字及圖片基本上都會被縮小 container/image 的倍數，變得很小很小，操作移動事件都會使物件異常消失，看了 fabric source code 我也找不到任何可以透過 fabric api function 補救的點，所以只好 rollback 到糊糊的照片版本上了，這是我第二個花最久的時間。

之後，就單純只是 RWD 的問題跟將簽名模組化，同時可支援 dialog & page 顯示的問題。

說到這裡，包含這個跟上周的視差滾動設計，其實我的 eslint & prettier 其實都沒有打開，第三週的實作題目，我覺得內容比較少。另一方面，大概也要差不多來求職了，就不做第三週的題目，把 eslint & prettier 弄好，兩週的題目 lint & fix all 一遍，抓出 infinite loop re-render 的問題修正，TheF2E4th 暫告一段落。

此外，我都會習慣去看一下別人的程式來內化成自己的 best practice，有發現一些比較喜歡的模仿對象，這兩週的程式其實都寫得蠻亂的，但我也有點懶得改，再寫新的就好了。

[可模仿的對象](https://github.com/Howard86/f2e-2022)

[第二週電子簽核實作](https://github.com/ShengChih/TheF2E4th/tree/feature/dottedsign)

嗯，也有看到一個酷酷的特效
[整個畫面像素延遲的轉場](https://github.com/yulunyang/F2E_Week3_Scrum/blob/master/src/components/modules/Pixelated.vue)

以上，報告完畢。