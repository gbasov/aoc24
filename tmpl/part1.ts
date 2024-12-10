import { readFileSync } from 'fs'
console.time('Time')

const input = readFileSync('test.txt', 'utf-8').trim()

console.timeEnd('Time')
