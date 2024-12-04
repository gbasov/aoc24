import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf8').trim()
const board = input.split('\n').map(line => line.split(''))

const sequence = ['M', 'A', 'S']

const directions = []
for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
            directions.push([i, j])
        }
    }
}

const search = (seq: string[], i: number, j: number, dir: [number, number]): number => {
    const i1 = i + dir[0], j1 = j + dir[1]

    if (board[i1]?.[j1] === seq[0]) {
        return seq.length > 1 ?
            search(seq.toSpliced(0, 1), i1, j1, dir) :
            1
    }

    return 0
}

let total = 0

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== 'X') continue

        total += directions.reduce((acc, dir) => acc + search(sequence, i, j, dir), 0)
    }
}

console.log(total)
