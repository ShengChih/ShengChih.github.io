callB() // B
callA() // Uncaught ReferenceError: callA is not defined


const callA = () => {
  console.log('A')
}


function callB () {
  console.log('B')
}