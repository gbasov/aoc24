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

// i, j, dir, score
const q: [number, number, number, number][] = [[start[0], start[1], 1, 0]]
const visited = new Set<number>()

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

    const [i, j, d, s] = loc

    const id = (i << 16) | (j << 8) | d
    if (visited.has(id)) {
        continue
    }
    visited.add(id)

    if (maze[i][j] === C.End) {
        console.log('End', s)
        break
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
        q.push([ni, nj, nd, ns])
    }
}

console.timeEnd('Time')
