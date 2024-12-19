console.time('Time')
import { readFileSync } from 'fs'

const TEST = true
// const TEST = false

const input = readFileSync(`${TEST ? 'test' : 'input'}.txt`, 'utf-8').trim()

console.timeEnd('Time')
