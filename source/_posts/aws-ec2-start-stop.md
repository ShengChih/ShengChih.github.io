---
title: 使用 cdk 整合 AWS 服務控制 EC2 開關機 (非教學文)
---

## 流水文感想

由於我目前使用的 EC2 是 free_tier 組合，不僅記憶體 1G 硬碟也只有 30G，每個月只能開 750 小時，因此每天使用時開機，不用時關機，對我來說是個常態了。

再加上前公司每天都會有客戶還是傳統產業，都會想要每天排程開關機來節省 AW$ 費用
再加上之前弄 serverless framework 時，看到 CloudFormation & Terraform & CDK 差異，總覺得好像得試試 CDK 這東西。

關於 AWS Lambda 由於沒框架，很常就在 Lambda 寫一些簡易的 Router，總覺得也很醜，而之前恰好也弄到 serverless-wsgi 這個 plugin。

再來 Apigateway 通常範例裡面都是沒有 Authorizor，由於我想要常駐服務，API 也應該是依次計費，所以就想說把它通通整併在一包。

嗯，Lambda 程式內容很廢，但把這東西弄出來後，我之後又想試試串一些服務，透過 Cognito 驗證 API去做一些事情，感覺靜態網頁也可以，但要避免被惡意使用，讓我花費又＋＋的問題。

嗯～ 之後要用 python 開放 Lambda 基本上我可以來這包當 base 開發，實作 API 即可。

附上這次成果：
[aws-ec2-power-switcher](https://github.com/ShengChih/aws-ec2-power-switcher)

Reference:
[start-stop-lambda-eventbridge](https://aws.amazon.com/tw/premiumsupport/knowledge-center/start-stop-lambda-eventbridge/)
[cdk for python](https://docs.aws.amazon.com/cdk/api/v1/python/modules.html)