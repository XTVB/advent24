import path from 'path'
import { isDefined } from '../utils/isDefined'
const day = path.basename(import.meta.file, '.ts')
console.log(`Day ${day}`)
const input = await Bun.file(`./inputs/${day}.txt`).text()

const inputT = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

const reports = input.split('\n').map((row) => row.split(' ').map(Number))

const isValid = (level1: number, level2: number, isIncreasing: boolean) => {
  if (!isDefined(level2)) {
    return true
  }
  let diff = level1 - level2
  let absoluteDiff = Math.abs(diff)
  if (diff < 0 !== isIncreasing) {
    return false
  }
  if (absoluteDiff < 1 || absoluteDiff > 3) {
    return false
  }
  return true
}

const isSafe = (report: number[], ignorable = 0) => {
  const initialDiff = report[0] - report[1]
  let isIncreasing = initialDiff < 0
  if (initialDiff === 0) {
    if (ignorable < 1) {
      return false
    }
    isIncreasing = report[1] - report[2] < 0
  }

  for (let i = 0; i < report.length - 1; i++) {
    if (!isValid(report[i], report[i + 1], isIncreasing)) {
      if (ignorable > 0) {
        if (i === 0 && isValid(report[i + 1], report[i + 2], isIncreasing)) {
          ignorable--
          continue
        }
        if (isValid(report[i], report[i + 2], isIncreasing)) {
          ignorable--
          i++
          continue
        }
        // check if the sequence is valid if it changes direction by ignoring the first value
        if (
          i === 1 &&
          isValid(report[i], report[i + 1], !isIncreasing) &&
          isValid(report[i + 1], report[i + 2], !isIncreasing)
        ) {
          ignorable--
          isIncreasing = !isIncreasing
          continue
        }
        if (i > 0 && isValid(report[i - 1], report[i + 1], isIncreasing)) {
          ignorable--
          continue
        }
      }
      return false
    }
  }
  return true
}

const numSafe = reports.map((report) => isSafe(report)).filter(Boolean).length

console.log(`Answer Part A: ${numSafe}`)

const numSafeWithDamp = reports.filter((report) => isSafe(report, 1)).length

console.log(`Answer Part B: ${numSafeWithDamp}`)
