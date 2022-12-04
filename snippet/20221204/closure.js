const store = () => {
  let count = 0

  return {
    add: () => {
      count += 1
    },
    sub: () => {
      count -= 1
    },
    multiply: (multiplier) => {
      count *= multiplier
    },
    divide: (divisor) => {
      if (divisor == 0) return
      count /= divisor
    },
    print: () => {
      return count
    }
  }
}

const counter = store()
counter.add()
console.log(counter.print()) // 1
counter.add()
console.log(counter.print()) // 2
counter.multiply(7)
console.log(counter.print()) // 14
counter.sub()
console.log(counter.print()) // 13
counter.sub()
console.log(counter.print()) // 12
counter.divide(2)
console.log(counter.print()) // 6
