console.time('Time')
import { readFileSync } from 'fs'

const IS_TEST = true
const input = readFileSync(`${IS_TEST ? 'test' : 'input'}.txt`, 'utf-8').trim()

console.timeEnd('Time')
