import { readFileSync } from 'fs'
console.time('Time')

const TEST = true
// const TEST = false

const INPUT = TEST ? 'test.txt' : 'input.txt'
const input = readFileSync(INPUT, 'ascii').trim()

const MIN_CHEAT = TEST ? 50 : 100

type L = [number, number]

let start: L

const dirs: L[] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
]

const id = (i: number, j: number) => (i << 8) + j

const grid = input.split('\n').map((l, i) =>
    l.split('').map((c, j) => {
        if (c === 'S') {
            start = [i, j]
        }
        return c
    }),
)
const H = grid.length,
    W = grid[0].length

const distMap = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Infinity),
)

const path: L[] = []

const out = (i: number, j: number) => {
    return i < 0 || i >= H || j < 0 || j >= W
}

let pos = start
let dist = 0
while (true) {
    const [i, j] = pos
    distMap[i][j] = dist
    path.push(pos)
    dist++

    if (grid[i][j] === 'E') {
        break
    }
    grid[i][j] = 'O'

    for (const [di, dj] of dirs) {
        const ni = i + di,
            nj = j + dj
        if (['.', 'E'].includes(grid[ni][nj])) {
            pos = [ni, nj]
            break
        }
    }
}

let cheats1 = 0,
    cheats2 = 0

for (const [i, j] of path) {
    const cheatsForPoint = new Set<number>()

    for (let di = -20; di <= 20; di++) {
        const maxDJ = 20 - Math.abs(di)
        for (let dj = maxDJ * -1; dj <= maxDJ; dj++) {
            const cheatDist = Math.abs(di) + Math.abs(dj)
            const ni = i + di,
                nj = j + dj

            if (out(ni, nj) || distMap[ni][nj] === Infinity) {
                continue
            }
            const diff = distMap[ni][nj] - distMap[i][j] - cheatDist
            if (diff >= MIN_CHEAT) {
                const cheatId = id(ni, nj)
                if (!cheatsForPoint.has(cheatId)) {
                    cheatsForPoint.add(cheatId)
                    cheats2++

                    if (cheatDist <= 2) {
                        cheats1++
                    }
                }
            }
        }
    }
}

console.log(cheats1)
console.log(cheats2)

console.timeEnd('Time')
