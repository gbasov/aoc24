console.time('Time')
import { readFileSync } from 'fs'
import { sequenceVariants } from './common'

type C = [number, number]
type CMap = Record<string, C>
type Pad = string[][]
type PadName = 'num' | 'dir'

// const TEST = true
const TEST = false

const INPUT = TEST ? 'test.txt' : 'input.txt'
const codes = readFileSync(INPUT, 'ascii')
    .trim()
    .split('\n')
    .map((c) => c.split(''))

const pads: Record<PadName, Pad> = {
    num: [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        [' ', '0', 'A'],
    ],
    dir: [
        [' ', '^', 'A'],
        ['<', 'v', '>'],
    ],
}

const moves = {
    '^': [-1, 0],
    '>': [0, 1],
    v: [1, 0],
    '<': [0, -1],
}

const cMap: Record<PadName, CMap> = { num: {}, dir: {} }

for (const padName in pads) {
    const pad = pads[padName]
    for (let i = 0; i < pad.length; i++) {
        for (let j = 0; j < pad[i].length; j++) {
            cMap[padName][pad[i][j]] = [i, j]
        }
    }
}

const btnDist = (pad: PadName, from: string, to: string): C => {
    const cFrom = cMap[pad][from],
        cTo = cMap[pad][to]
    const di = cTo[0] - cFrom[0],
        dj = cTo[1] - cFrom[1]

    return [di, dj]
}

const seqCache: Record<string, string[][]> = {}
const btnSeqVars = (pad: PadName, from: string, to: string) => {
    const key = `${from}${to}`
    if (seqCache[key]) {
        return seqCache[key]
    }

    const [di, dj] = btnDist(pad, from, to)

    if (!di || !dj) {
        const seq = [
            ...Array(Math.abs(di || dj)).fill(
                (di || dj) > 0 ? (di ? 'v' : '>') : di ? '^' : '<',
            ),
            'A',
        ]
        seqCache[key] = [seq]
        return [seq]
    }

    const seqVars = sequenceVariants(
        di > 0 ? 'v' : '^',
        Math.abs(di),
        dj > 0 ? '>' : '<',
        Math.abs(dj),
    )
        .filter((seq) => {
            let [i, j] = cMap[pad][from]
            for (const m of seq) {
                const [di, dj] = moves[m]
                if (pads[pad][i + di][j + dj] === ' ') {
                    return false
                }
                i += di
                j += dj
            }

            return true
        })
        .map((seq) => [...seq, 'A'])

    seqCache[key] = seqVars
    return seqVars
}

let lenCache: Record<string, number> = {}

const find = (pad: PadName, seq: string[], level: number): number => {
    const key = `${level}${seq.join('')}`
    if (lenCache[key]) {
        return lenCache[key]
    }

    let len = 0
    let prevBtn = 'A'
    for (const btn of seq) {
        const nextLevelVars = btnSeqVars(pad, prevBtn, btn)
        prevBtn = btn
        if (level) {
            const varLens = []
            for (const seqVar of nextLevelVars) {
                varLens.push(find('dir', seqVar, level - 1))
            }
            len += Math.min(...varLens)
        } else {
            len += nextLevelVars[0].length
        }
    }

    lenCache[key] = len

    return len
}

let total1 = 0
for (const code of codes) {
    const len = find('num', code, 2)
    total1 += len * Number(code.slice(0, 3).join(''))
}

let total2 = 0
lenCache = {}
for (const code of codes) {
    const len = find('num', code, 25)
    total2 += len * Number(code.slice(0, 3).join(''))
}

console.log(total1, total2)

console.timeEnd('Time')
