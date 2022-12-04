function test(v) {
  var v
  console.log(v) // 10
  v = 3
}
test(10)

// 變成如下

function text(v) {
  var v = 10 /** 傳入參數 */
  var v
  console.log(v) // 10
  v = 3
}
test(10)


// 再變成如下
function text(v) {
  var v 
  var v
  v = 10 /** 傳入參數的賦值 */
  console.log(v) // 10
  v = 3
}
test(10)