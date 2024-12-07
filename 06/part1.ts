import { readFileSync } from 'fs'

enum Place {
    free,
    block,
    visited,
}
type Board = Place[][]
type Pos = [number, number]
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

const input = readFileSync('input.txt', 'utf-8').trim()

let guard: Pos
let distance = 1
let dir = Dir.up

const board: Board = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
        if (char === '^') {
            guard = [i, j]
            return Place.visited
        }
        return char === '#' ? Place.block : Place.free
    }),
)

const inBoard = (pos: Pos) => {
    return (
        pos[0] >= 0 &&
        pos[0] < board.length &&
        pos[1] >= 0 &&
        pos[1] < board[0].length
    )
}

const nextPos = (): Pos => [guard[0] + moves[dir][0], guard[1] + moves[dir][1]]
const turn = () => (dir = dir + 1 > 3 ? 0 : dir + 1)

while (true) {
    const next: Pos = nextPos()
    if (!inBoard(next)) {
        break
    }

    const nextPlace = board[next[0]][next[1]]

    if (nextPlace === Place.block) {
        turn()
        continue
    }
    if (nextPlace === Place.free) {
        distance++
        board[next[0]][next[1]] = Place.visited
    }

    guard = next
}

console.log(distance)
