---
title: 回顧上週 Todo - FingerStyle OAuth2.0 整合 + DRF decorate apiview 練習
---

FingleStyle OAuth2.0 整合

## 流水文
上週時間被切得零零碎碎的，但還是可以講出做完什麼事情，跟說出自己的感覺

FingleStyle 是一個 facebook 社群發起的開源專案，大概就是要弄出一個吉他指彈網站，加入後我就潛水很久，後端貢獻者其實很少，大部分都是往前端，而框架選型也是幾個人投票投出來的。由於這組織每個人都有自己的工作，開發時程跟功能規劃時間是安排蠻鬆散的，而貢獻者開發經驗較為資淺，或是選型出來的框架非主要開發者擅用，在這前提下就開始專案。

最後投票框架出來，前端想用 NextJS，後端想用 Django，嗯～，看起來怪怪的但好像還是接得起來，NextJS 主打就是為了 ReactJS SSR 的解決方案，本身就可以當做 fullstack server，所以要 Django 當作 API server 這樣 server 就有兩個了，但不管，專案一開始要實作的就是 OAuth2.0 整合，想整合 facebook & google 社群帳號。

專案內的前後端一開始也比較獨立運行，OAuth2.0 功能被發配到後端去，也有其他成員自發的擔當 Owner，而我還是在組織內潛水，看大家在幹嘛，後端成員就開始研究現有的解決方案 django-allauth，所以我前面私下才有看一下 Django & django-allauth 的整合，後來也確實可以登入拿到社群 access token 了，但發現這種解決方案，至少都要在前端引入 facebook js sdk or google oauth flow。

用 django-allauth 整合結果，好像會有這些問題：
1. 那最後拿到 access token 不就在 Django 上 ?
2. 那 NextJS 這邊怎麼向 Django 登入，拿到 API token ?
3. Django 這邊要做前端的客製 (如登入 / 註冊的表單) ?

上面這些問題，不管是前後端功能職責，還是 token 怎麼申請＆傳遞，好像都由前端控制流程會更好一點。
最後我還是在組織內提出這幾個問題，嗯，工作落到我身上，只好跟前端協調好的結果，前端整合 OAuth2 畫面，拿到社群帳號的 access token 後，傳遞給 Django 做 token 驗證 or 做 get profile api，來取得 Django API access token，之後前端需要呼叫 Django API，就帶入這個 token 即可。

嗯，那我就照這樣寫 Django 驗證社群帳號 access token & 產新 token & signup 功能發個 PR 提交。由於前端還沒有畫面，也還沒開始整合，我要怎麼測試，我很直覺地想用 django-allauth 本身提供超陽春的 UI，去做社群帳號登入，在後端印出 access token，在透過 postman 發 exchange token api 測試，最後再把 django-allauth 套件移除，基本上把 signup & toke validation & gen new api token 好像都做完了，合併 PR 也沒有被刁難。

結果就是下面這樣，嗯，這次我就不是用 drf classic based 風格寫，改用 drf apiview decorate 風格，也算是對這寫法有新認識，對 OAuth2.0 也有更進一步的認識。
[Social OAuth2.0 Exchane API](https://github.com/ShengChih/fingerstyle-backend/commit/e39b6fe4d6272351b62d3b096655351b47ceb274)