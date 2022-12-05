---
title: Event capturing & bubbling
---

根據這篇文章 [DOM 的事件傳遞機制：捕獲與冒泡](https://blog.huli.tw/2017/08/27/dom-event-capture-and-propagation/)，來個肌肉訓練精簡一下

![](/images/20221205/event-capaturing-bubbling.png)
[example](https://codepen.io/shengchih/pen/vYrvYLo?editors=1011)

![](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

在 HTML 裡，通常都會在 DOM 上綁定事件，那麼 DOM 是一個 tree，在頁面上觸發了一個事件，這個事件就會從根節點走訪到目的節點，一層一層由上往下傳遞。

就如上面那張圖，傳遞分為補獲 (1) & 抵達目的節點 (2) & 冒泡 (3)

順序上就一定會先呼叫捕獲 listener 再呼叫冒泡 listener，唯一有個差異的是，在於抵達目的節點的事件，既不是冒泡還是捕獲，因此只在意 addEventListener 的綁定順序呼叫。

如果要防止事件往下傳遞捕獲 or 往上傳遞冒泡，都可以透過 `e.stopPropagation()`

另外我自己以前也會搞混的 `e.preventDefault()` ，它是拿來防止 Native HTML 預設行為，如 `<a>` 點擊會觸發新網頁或導向網址的行為。

## Ref.
[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.huli.tw/2017/08/27/dom-event-capture-and-propagation/)