console.time('Time')
import { readFileSync } from 'fs'

// const INPUT = 'input.txt'
const INPUT = 'test.txt'

const input = readFileSync(INPUT, 'ascii').trim()

console.timeEnd('Time')
