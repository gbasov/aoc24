console.time('Time')
import { readFileSync } from 'fs'
const IS_TEST = false

type L = [number, number]
enum C {
    Wall = '#',
    End = 'E',
    Start = 'S',
}

const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
]

let start: L

const maze: string[][] = readFileSync(
    `${IS_TEST ? 'test' : 'input'}.txt`,
    'utf-8',
)
    .trim()
    .split('\n')
    .map((line, i) =>
        line.split('').map((c: C, j) => {
            if (c === C.Start) {
                start = [i, j]
            }
            return c
        }),
    )

const id = (i: number, j: number) => (i << 8) | j

// i, j, dir, score, path
const q: [number, number, number, number, number[]][] = [
    [start[0], start[1], 1, 0, [id(start[0], start[1])]],
]

const minScores = maze.map((line) =>
    line.map(() => Array<number>(4).fill(Infinity)),
)
let endMinScore = Infinity
const spots = new Set<number>()

while (q.length) {
    let loc = q[0]
    let minIndex = 0
    for (let i = 1; i < q.length; i++) {
        if (q[i][3] < loc[3]) {
            minIndex = i
            loc = q[i]
        }
    }
    q.splice(minIndex, 1)
    const [i, j, d, s, p] = loc

    if (s > minScores[i][j][d] || s > endMinScore) {
        continue
    }
    minScores[i][j][d] = s

    if (maze[i][j] === C.End) {
        if (s <= endMinScore) {
            if (s < endMinScore) {
                endMinScore = s
                spots.clear()
            }
            p.forEach((i) => spots.add(i))
        }
        continue
    }

    for (let nd = 0; nd < dirs.length; nd++) {
        if (Math.abs(d - nd) === 2) {
            continue
        }

        const [di, dj] = dirs[nd]
        const ni = i + di,
            nj = j + dj
        if (maze[ni][nj] === C.Wall) {
            continue
        }

        const ns = s + 1 + (d === nd ? 0 : 1000)
        q.push([ni, nj, nd, ns, [...p, id(ni, nj)]])
    }
}

console.log(spots.size)

console.timeEnd('Time')
