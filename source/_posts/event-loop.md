---
title: Event loop 機制
---

![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

1. 同步程式都會在主執行緒執行，每次加入到 call stack
2. 接著，異步程式則是執行完，將結果存放到 task queue
3. 當 call stack 已經執行完且空，就會從 task queue 逐個處理，將其等待狀態清除並加入到主執行緒
4. 重複上面的事件循環處理機制

![](/images/20221205/js-event-loop.png)

```
5 // L7 從 call stack 同步程式印出
3 // L5 p3 的執行最早產生結果，放入 task queue (1)
4 // L8 setTimeout 放入 task queue (2)
1 // L1 p1 結果放入 task queue(3)
2 // L3 p2 結果放入 task queue(4)
```

task queue(n) 只代表著被放入 queue 順序，不代表真實在 queue 的位置，畢竟主執行緒在執行 task queue 的任務時，可能還有其他異步尚未產生結果。

## Ref
[[面試] 前端工程師一定要會的 JS 觀念題-中英對照之上篇](https://medium.com/starbugs/%E9%9D%A2%E8%A9%A6-%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%AB%E4%B8%80%E5%AE%9A%E8%A6%81%E6%9C%83%E7%9A%84-js-%E8%A7%80%E5%BF%B5%E9%A1%8C-%E4%B8%AD%E8%8B%B1%E5%B0%8D%E7%85%A7%E4%B9%8B%E4%B8%8A%E7%AF%87-3b0a3feda14f)
[Philip Roberts: Help, I’m stuck in an event-loop](https://vimeo.com/96425312)
[Event loop 機制圖形化](http://latentflip.com/loupe/?code=dmFyIGEgPSAxOwpmdW5jdGlvbiBmbigpIHsKICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgewogICAgYSA9IDI7CiAgfSwgMCk7Cn0KZnVuY3Rpb24gZm4yKCkgewogIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7CiAgICBhID0gMzsKICB9LCAwKTsKfQpmbigpOwpmbjIoKTsKY29uc29sZS5sb2coYSk7ICAvLyAx!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
[](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)