console.time('Time')
import { readFileSync } from 'fs'
// const IS_TEST = true
const IS_TEST = false

const input = readFileSync(`${IS_TEST ? 'test' : 'input'}.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map((l) => l.split(',').map(Number).reverse())

const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
]

const [W, H, T] = IS_TEST ? [7, 7, 12] : [71, 71, 1024]

const out = (i: number, j: number) => i < 0 || i >= H || j < 0 || j >= W

const pointId = (i: number, j: number) => (i << 8) + j

const end = [H - 1, W - 1]

const grid = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => false),
)

for (let t = 0; t < T; t++) {
    const [i, j] = input[t]
    grid[i][j] = true
}

const findPath = () => {
    const q: [number, number, number, number[]][] = [[0, 0, 0, [0]]]
    const visited = new Set<number>()

    while (q.length) {
        let point = q[0]
        let minIndex = 0
        for (let i = 1; i < q.length; i++) {
            if (q[i][2] < point[2]) {
                minIndex = i
                point = q[i]
            }
        }
        q.splice(minIndex, 1)

        const [i, j, dist, path] = point
        const id = pointId(i, j)
        if (visited.has(id)) {
            continue
        }
        visited.add(id)

        if (i === end[0] && j === end[1]) {
            return {
                points: new Set<number>(path),
                dist,
            }
        }
        for (const d of dirs) {
            const ni = i + d[0],
                nj = j + d[1]
            if (out(ni, nj) || grid[ni][nj]) {
                continue
            }

            q.push([ni, nj, dist + 1, [...path, pointId(ni, nj)]])
        }
    }

    return undefined
}

let path = findPath()

console.log(`Minimal distance ${path.dist}`)
console.timeLog('Time')

for (let t = T; t < input.length; t++) {
    const [i, j] = input[t]
    grid[i][j] = true
    if (path.points.has(pointId(i, j))) {
        path = findPath()
        if (!path) {
            console.log(`Blocked at ${j},${i}`)
            break
        }
    }
}

console.timeEnd('Time')
