import path from 'path'
const day = path.basename(import.meta.file, '.ts')
console.log(`Day ${day}`)
// const input = (await Bun.file(`./inputs/${day}.txt`).text())

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

// console.log(`Answer Part A: ${totalA}`)
// console.log(`Answer Part B: ${totalB}`)
