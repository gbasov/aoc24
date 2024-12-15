console.time('Time')
import { readFileSync } from 'fs'
import {
    B,
    charAt,
    createWideMap,
    findRobot,
    getFullBox,
    nextPos,
    nextPosForBox,
    printMap,
    setChar,
    setMap,
} from './common'

const IS_TEST = false

const [mapInput, movesInput] = readFileSync(
    `${IS_TEST ? 'test' : 'input'}.txt`,
    'utf-8',
)
    .trim()
    .split('\n\n')

const moves = movesInput.replaceAll('\n', '').split('')

const map = createWideMap(mapInput)
setMap(map)

let robot = findRobot()!

for (const move of moves) {
    if (IS_TEST) {
        printMap()
        console.log(move.repeat(3))
    }

    const nextRobotPos = nextPos(robot, move)
    const char = charAt(nextRobotPos)
    if (char === '.') {
        setChar(nextRobotPos, '@')
        setChar(robot, '.')
        robot = nextRobotPos
        continue
    } else if (char === '#') {
        continue
    }

    const q: B[] = []
    const boxes: B[] = []
    let blocked = false

    q.push(getFullBox(nextRobotPos))

    while (q.length) {
        const box = q.shift()

        const adjPos = nextPosForBox(box, move)
        if (!adjPos) {
            blocked = true
            break
        }

        const chars = adjPos.map(charAt)

        if (chars.some((c) => c === '#')) {
            blocked = true
            break
        }

        boxes.push(box)

        const adjBoxes: B[] = []
        chars.forEach((c, i) => {
            if (['[', ']'].includes(c)) {
                adjBoxes.push(getFullBox(adjPos[i]))
            }
        })
        if (adjBoxes.length) {
            q.push(adjBoxes[0])
            if (adjBoxes[1] && adjBoxes[1][0][1] !== adjBoxes[0][0][1]) {
                q.push(adjBoxes[1])
            }
        }
    }

    if (blocked) {
        continue
    }

    boxes.forEach((box) => {
        setChar(box[0], '.')
        setChar(box[1], '.')
    })

    boxes.forEach((box) => {
        box.forEach((pos, i) => {
            setChar(nextPos(pos, move), i === 0 ? '[' : ']')
        })
    })

    setChar(nextRobotPos, '@')
    setChar(robot, '.')
    robot = nextRobotPos
}

if (IS_TEST) {
    printMap()
}

const sum = map.reduce(
    (sum, line, i) =>
        line.reduce(
            (sum, char, j) => (char === '[' ? sum + i * 100 + j : sum),
            sum,
        ),
    0,
)

console.log(sum)

console.timeEnd('Time')
