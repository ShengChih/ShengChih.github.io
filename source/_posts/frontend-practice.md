---
title: 回顧 2022.10.17 - 2022.10.22 Todo - 前端知識 (二)
---

## 流水文

這週還是在做台灣旅遊景點導覽，在切版時，還是有些會令自己需要卡頓的地方。
也有把一些問題，收納到前次的問題裡 [前端知識 (一)](https://shengchih.github.io/2022/10/17/frontend-rwd/)

```
1: 使用 flex 切版
```
這方式用了好幾次，但很常要用還是要查一下

```
2. 使用 Grid 切版
```
這個從來沒用過，在一些特殊的版型比 flex 更易用
```
![](/images/20221021/grid_layout.png
[參考1](https://blog.hinablue.me/css-grid-layout/)
[參考2](https://stackoverflow.com/questions/47601564/equal-width-columns-in-css-grid)


3. 在實作不同裝置上的 RWD 時，在 tablet | mobile `:hover` 不能正常使用
```
原本在實作一個 dropdown 的元件，滑鼠滑過後會有顏色變動，但在 tablet | mobile 常常是使用手指或筆去滑動螢幕，因此滑動到 DOM 身上，不能判別到底是滑動還是點擊，這裡我是使用 TouchEvent 實作來取代 `:hover` 的功能，監聽 onTouchStart & onTouchMove Event 事件，來判斷滑進和滑出的 DOM 是不是同一個，再套用 styles。

[useTouchDetector 實作](https://github.com/ShengChih/Taiwan_Tourguide/blob/dev/src/hooks/useTouchDetector/index.ts)

目前這個看似還能使用，但比如有兩個下拉式選單很近，且手指觸摸螢幕的接觸面積也不小，在重疊的地方做滑進滑出的判斷似乎會異常。

這邊是在使用另一個下拉式選單， 透過 onBlur 來閉合另一個下拉式選單，產生不會重疊的地方。

```
4. EC2 Security Group 設定 & 減少 Elastic IP 費用
```
由於我每天會開關自己的 ec2，申請 Elastic IP 也會因為佔用 IP 且未使用而計費，因此我的 ec2 的 elastic ip 也不用，就讓 ec2 開機後自動配置。

所以我就在自己的 ec2 control api 新增 get instance ip 的 api。
[取得 EC2 IP](https://github.com/ShengChih/aws-ec2-power-switcher/blob/dev/lambda_func/ec2_control/api.py#L316)

另外我家網路也是浮動 IP，中華小烏龜也很容易因為過熱重啟，我的 security group 開放 inbound cidr 常常也在開機後要重新調整。

所以我就繼續 extend ec2 poweron api，開機後透過 API 傳入 ip 自動設定 security group。
[設定 EC2 SG](https://github.com/ShengChih/aws-ec2-power-switcher/blob/dev/lambda_func/ec2_control/api.py#L243)


```
Q: 關於 ReactJS HOC
```
在寫程式時，通常我自己會很關注別人怎麼寫這件事。我在寫台灣旅遊景點，就會想怎麼重用這些元件，或怎麼元件的 interface 才會好用，還有元件行為的 pattern，都有種既視感。

目前在看一些 HOC 的 sample code，都是使用 class component，很少有那種 functional component 範例，這個就還要再看一下，看看能不能使用在專案上


```
Q: React component 有很多種，這些有什麼差異，什麼時候該用什麼
e.g. JSXElement / ReactNode / FC component / React component ....
```
我也有點問號？