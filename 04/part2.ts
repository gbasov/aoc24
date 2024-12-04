import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf8').trim()
const board = input.split('\n').map(line => line.split(''))

const locations: [number, number][][] = [
    [[-1, -1], [1, 1]],
    [[-1, 1], [1, -1]]
]

const sequences = [['M', 'S'], ['S', 'M']]

const readChar = (i: number, j: number, offset: [number, number]): string => {
    return board[i + offset[0]]?.[j + offset[1]]
}

const check = (i: number, j: number): boolean => {
    return locations.every(offsets => {
        const first = readChar(i, j, offsets[0])
        const seq = sequences.find(seq => seq[0] === first)
        return seq && seq[1] === readChar(i, j, offsets[1])
    })
}

let total = 0

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== 'A') continue

        total += check(i, j) ? 1 : 0
    }
}

console.log(total)
