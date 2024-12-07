import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf-8').trim()

type Line = Point[]
type Board = Line[]
type Pos = [number, number]
type Point = {
    id: number
    pos: Pos
    block?: boolean
}
enum Dir {
    up,
    right,
    down,
    left,
}
const moves: Record<Dir, Pos> = {
    [Dir.up]: [-1, 0],
    [Dir.down]: [1, 0],
    [Dir.right]: [0, 1],
    [Dir.left]: [0, -1],
}

let start: Point
let id = 0
const board: Board = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
        const pos: Pos = [i, j]
        id++
        const point = {
            id,
            pos,
            ...(char === '#' ? { block: true } : {}),
        }
        if (char === '^') {
            start = point
        }
        return point
    }),
)

const getPoint = (pos: Pos) => board[pos[0]][pos[1]]

const calcNextPos = (pos: Pos, dir: Dir): Pos => [
    pos[0] + moves[dir][0],
    pos[1] + moves[dir][1],
]

const outBoard = (pos: Pos) => {
    return (
        pos[0] < 0 ||
        pos[0] >= board.length ||
        pos[1] < 0 ||
        pos[1] >= board[0].length
    )
}

const turn = (dir: Dir): Dir => (dir + 1 > 3 ? 0 : dir + 1)

let obs: Set<Point> = new Set()
let dir = Dir.up
let point = start
let visited: Set<Point> = new Set()

const hasLoop = (hitAt: Point, hitDir: Dir): boolean => {
    let dir = hitDir
    let point = hitAt
    const hits: Record<number, Dir[]> = {}

    const check = (id: number, dir: Dir): boolean => {
        if (hits[id]?.includes(dir)) {
            return true
        } else if (hits[id]) {
            hits[id].push(dir)
        } else {
            hits[id] = [dir]
        }
        return false
    }

    while (true) {
        const nextPos = calcNextPos(point.pos, dir)
        if (outBoard(nextPos)) {
            return false
        }

        const nextPoint = getPoint(nextPos)
        if (nextPoint.block) {
            if (check(nextPoint.id, dir)) {
                return true
            }
            dir = turn(dir)
            continue
        }

        point = nextPoint
    }
}

while (true) {
    visited.add(point)

    const nextPos = calcNextPos(point.pos, dir)
    if (outBoard(nextPos)) {
        break
    }

    const nextPoint = getPoint(nextPos)
    if (nextPoint.block) {
        dir = turn(dir)
        continue
    }

    if (!visited.has(nextPoint)) {
        nextPoint.block = true
        if (hasLoop(point, dir)) {
            obs.add(nextPoint)
        }
        nextPoint.block = false
    }

    point = nextPoint
}

console.log(obs.size)
