console.time('Time')
import { readFileSync } from 'fs'

const TEST = true
// const TEST = false

const INPUT = TEST ? 'test.txt' : 'input.txt'
const input = readFileSync(INPUT, 'ascii').trim()

console.timeEnd('Time')
