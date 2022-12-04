var a = 10
function test(){
  console.log(a) // 以為是 10 而是 ReferenceError: a is not defined
  let a
}
test()

/**
 * 
 * VO 示意圖
 * let a 因為 hosting 覆蓋了 a: 10 這個操作且不會賦值為 undefined，進入 TDZ，但是 console 又先於宣告變數執行 
 {
    a: ???
 }
 */