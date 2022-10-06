---
title: Django 整合 allauth 心得 (非教學文)
---
筆者這裡簡單的整合 Google & Facebook，內容包含如下：

1. 申請網域 (Cloudflare 註冊網域)
2. 設定 ssl (使用 Cloudflare Origin CA 或 Cerbot docker container)
3. 申請 Google & Facebook 應用程式
4. 測試 Google Sign In & Facebook Sign In & 使用者註冊 & 使用者信箱認證

## 流水文感想

在整這個東西之前，先去看了一下什麼是 [OAuth2.0](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E8%AA%8D%E8%AD%98-oauth-2-0-%E4%B8%80%E6%AC%A1%E4%BA%86%E8%A7%A3%E5%90%84%E8%A7%92%E8%89%B2-%E5%90%84%E9%A1%9E%E5%9E%8B%E6%B5%81%E7%A8%8B%E7%9A%84%E5%B7%AE%E7%95%B0-c42da83a6015)，這篇我覺得對我很有幫助，覺得原作者說故事很棒。

其實我卡最久的是 Step 2.，。。。。。

allauth 這個套件的感覺，就是想什麼第三方的 OAuth 全部用一個流程整進來，但介面很陽春。。。

用起來的感覺有很多黑人問號，如果是實用在自家產品上而非系統整合類型的系統，自己實作細部的流程，可能會好一點

再重新來一次，下次我會自己實作，而不想用 allauth，這樣對 OAuth2 會更直覺。

這次最有收穫的反而是基礎設施建設的部分：

Docker & Docker-Compose

Certbot 之前也用在幫 AWS S3 靜態頁面有設定過 HTTPS，這次是使用 Certbot Container 設定在 EC2 上有漸漸知道怎麼使用

之前只聽過 Cloudflare 但沒使用過，這次僅使用註冊網域跟設定 Full SSL(Strict mode)

nginx + uWsgi 也很長時間沒碰，所以也跑回去看一下設定的部分

附上這次的成果：
[專案程式](https://github.com/ShengChih/django-oauth2-basic-integrated)

Reference:
[FB 應用程式申請](https://smlpoints.com/notes-google-facebook-github-oauth-certification-apply.html)
[FB 應用程式錯誤排除](https://smlpoints.com/notes-google-facebook-github-oauth-certification-apply.html)
[Google 應用程式申請](https://developers.google.com/identity/protocols/oauth2/web-server)
[allauth 一般使用者註冊失敗，沒有 smtpd 可寄信 (開發用)](https://docs.djangoproject.com/en/4.1/topics/email/#configuring-email-for-development)
[allauth 進階設定](https://django-allauth.readthedocs.io/en/stable/advanced.html)
[allauth 疑難雜症排除](https://django-allauth.readthedocs.io/en/latest/faq.html?highlight=profile#frequently-asked-questions)
