function test() {
  var a = 1
  var b = 2
  console.log(c)

  console.log(a)

  let c = 10
}

// 行為可能理解上變成如下


function test() {
  var a /** 在編譯階段會賦值 undefined */
  var b
  let c /** 不會在編譯階段賦值 undefined | TDZ 開始*/ 

  a = 1
  b = 2

  console.log(c) /** 存取 VO 的 c，失敗 */

  console.log(a)

  /** TDZ 結束 */
  c = 10 
}

{
  a: undefined
  b: undefined
  c: ???? <-- 神奇行為
}