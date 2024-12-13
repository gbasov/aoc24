import { readFileSync } from 'fs'
console.time('Time')

type XY = { x: number; y: number }
type M = { a: XY; b: XY; p: XY }

const input = readFileSync('test.txt', 'utf-8').trim()

const machines: M[] = input.split('\n\n').map((machine) => {
    const lines: XY[] = machine.split('\n').map((line) => {
        const m = line.match(/X.(\d+),\sY.(\d+)/)
        return { x: Number(m[1]), y: Number(m[2]) }
    })
    return {
        a: lines[0],
        b: lines[1],
        p: lines[2],
    }
})

const solve = (m: M, off: number) => {
    const { a, b, p } = m

    const na = ((p.x + off) * b.y - (p.y + off) * b.x) / (a.x * b.y - a.y * b.x)
    if (!Number.isInteger(na)) {
        return 0
    }

    const nb = (p.y + off - na * a.y) / b.y
    if (!Number.isInteger(nb)) {
        return 0
    }

    return na * 3 + nb
}

let total1 = 0
let total2 = 0
for (const m of machines) {
    total1 += solve(m, 0)
    total2 += solve(m, 10000000000000)
}

console.log({ part1: total1 })
console.log({ part2: total2 })

console.timeEnd('Time')
