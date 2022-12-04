const message = 'global'


const returnGlobal = () => {
  return message
}

const returnLocal = () => {
  let message = 'local1'
  return message
}

const closureFunc = () => {
  /** Closure */
  let message = 'local2'

  return () => {
    return message
  }
}

console.log(returnGlobal()) // global

console.log(returnLocal()) // local1

const returnFunc = closureFunc()

console.log(returnFunc)
console.log(returnFunc()) // local2