console.time('Time')
import { readFileSync } from 'fs'

// const TEST = true
const TEST = false

const INPUT = TEST ? 'test.txt' : 'input.txt'
const items = readFileSync(INPUT, 'ascii')
    .trim()
    .split('\n\n')
    .map((i) => i.split('\n'))

const H = 7,
    W = 5

const keys: number[][] = []
const locks: number[][] = []

for (const lines of items) {
    const isLock = lines[0][0] === '#'

    const item = []
    for (let p = 0; p < W; p++) {
        let h = isLock ? 0 : H - 1
        while (lines[h]?.[p] === '#') {
            h = isLock ? h + 1 : h - 1
        }
        item[p] = isLock ? h - 1 : H - h - 2
    }
    ;(isLock ? locks : keys).push(item)
}

let pairs = 0
for (const lock of locks) {
    for (const key of keys) {
        if (lock.every((l, i) => l + key[i] <= H - 2)) {
            pairs++
        }
    }
}

console.log(pairs)

console.timeEnd('Time')
