import path from 'path'
const day = path.basename(import.meta.file, '.ts')
console.log(`Day ${day}`)
const input = (await Bun.file(`./inputs/${day}.txt`).text())

const inputT = `3   4
4   3
2   5
1   3
3   9
3   3`

const a = /(?<first>\d+) *(?<second>\d+)/g
// console.log(...)
const listA: number[] = []
const listB: number[] = []
for (let match of input.matchAll(a)) {
  if (match.groups) {
    const { first, second } = match.groups
    listA.push(parseInt(first))
    listB.push(parseInt(second))
  }
}
listA.sort()
listB.sort()

const totalDiff = listA.reduce((total, current, index) => {
  return total + Math.abs(current - listB[index])
}, 0)

console.log(`Answer Part A: ${totalDiff}`)

const totalSimilar = listA.reduce((total, current, index) => {
  return total + current * listB.filter((val) => val === current).length
}, 0)

console.log(`Answer Part B: ${totalSimilar}`)
