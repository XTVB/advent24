import path from 'path'
const day = path.basename(import.meta.file, '.ts')
console.log(`Day ${day}`)
const input = (await Bun.file(`./inputs/${day}.txt`).text())

const inputA = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

const inputB = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

const mulReg = /mul\((?<first>\d+),(?<second>\d+)\)/g

const sumRealMul = [...input.matchAll(mulReg)]
  .map((match) => {
    if (match.groups) {
      const { first, second } = match.groups
      return parseInt(first) * parseInt(second)
    }
    return 0
  })
  .reduce((acc, val) => acc + val, 0)

console.log(`Answer Part A: ${sumRealMul}`)

const mulSwitchReg = /(mul\((?<first>\d+),(?<second>\d+)\))|(?<on>do\(\))|(?<off>don't\(\))/g

let total = 0
let enabled = true
let match
while (match = mulSwitchReg.exec(input)) {
  if (match.groups) {
    const { first, second, on, off } = match.groups
    if (enabled && first && second) {
      const result = parseInt(first) * parseInt(second)
      total += result
    }
    if (on) {
      enabled = true
    }
    if (off) {
      enabled = false
    }
  }
}

console.log(`Answer Part B: ${total}`)
