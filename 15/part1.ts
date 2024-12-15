import { findRobot, setMap } from './common'

console.time('Time')
import { readFileSync } from 'fs'

type P = [number, number]

const [mapInput, movesInput] = readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n\n')

const map = mapInput
    .trim()
    .split('\n')
    .map((line) => line.split(''))

setMap(map)

const moves = movesInput.replaceAll('\n', '').split('')

const steps: Record<string, P> = {
    '<': [0, -1],
    '>': [0, 1],
    '^': [-1, 0],
    v: [1, 0],
}

const nextPos = (pos: P, stepChar: string): P => {
    const step = steps[stepChar]!
    const i1 = pos[0] + step[0],
        j1 = pos[1] + step[1]
    if (i1 < 0 || i1 >= map.length || j1 < 0 || j1 >= map[0].length) {
        return undefined
    }

    return [i1, j1]
}

let robotPos: P = findRobot()!

const move = (dir: string) => {
    let pos = robotPos
    let moveBoxes = false
    let moved = false
    while (true) {
        pos = nextPos(pos, dir)
        if (!pos) {
            break
        }

        const char = map[pos[0]][pos[1]]
        if (char === '#') {
            break
        }
        if (char === '.') {
            moved = true
            break
        }
        if (char === 'O') {
            moveBoxes = true
        }
    }

    if (moved) {
        map[robotPos[0]][robotPos[1]] = '.'
        robotPos = nextPos(robotPos, dir)
        map[robotPos[0]][robotPos[1]] = '@'

        if (moveBoxes) {
            map[pos[0]][pos[1]] = 'O'
        }
    }
}
for (const moveChar of moves) {
    move(moveChar)
}

const sum = map.reduce(
    (sum, line, i) =>
        line.reduce(
            (sum, char, j) => (char === 'O' ? sum + i * 100 + j : sum),
            sum,
        ),
    0,
)

console.log(sum)

console.timeEnd('Time')
