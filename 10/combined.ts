import { readFileSync } from 'fs'
console.time('Time')

const map = readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number))

const steps = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
]

const outMap = (i: number, j: number) => {
    return i < 0 || i >= map.length || j < 0 || j >= map[0].length
}

let peaks: Set<number> = new Set()
let totalScore = 0
let trails = 0
let totalRating = 0

let c = 0
const explore = (i: number, j: number) => {
    const h = map[i][j]

    steps.forEach(([di, dj]) => {
        const i1 = i + di,
            j1 = j + dj
        if (outMap(i1, j1)) {
            return
        }
        const adjH = map[i1][j1]
        if (adjH - h !== 1) {
            return
        }
        if (adjH === 9) {
            trails++
            peaks.add(i1 * 1000 + j1)
        }
        explore(i1, j1)
    })
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 0) {
            peaks.clear()
            trails = 0

            explore(i, j)

            totalScore += peaks.size
            totalRating += trails
        }
    }
}

console.log('Score', totalScore)
console.log('Rating', totalRating)

console.timeEnd('Time')
