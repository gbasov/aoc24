import chalk from 'chalk'

export type M = string[][]
export type P = [number, number]
export type B = [P, P]

let map: M
export const setMap = (m: M): void => {
    map = m
}

const { red, gray, blue, green } = chalk
const colors = {
    '@': red,
    '#': blue,
    '.': gray,
    O: green,
    '[': green,
    ']': green,
}

export const printMap = () => {
    let out = ''
    for (const line of map) {
        for (const char of line) {
            out += colors[char](char)
        }

        out += '\n'
    }
    console.log(out.trim())
}

const steps: Record<string, P> = {
    '<': [0, -1],
    '>': [0, 1],
    '^': [-1, 0],
    v: [1, 0],
}

export const nextPos = (pos: P, dir: string): P => {
    const step = steps[dir]!
    const i1 = pos[0] + step[0],
        j1 = pos[1] + step[1]
    if (i1 < 0 || i1 >= map.length || j1 < 0 || j1 >= map[0].length) {
        return undefined
    }

    return [i1, j1]
}

export const findRobot = (): P => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === '@') {
                return [i, j]
            }
        }
    }
    return undefined
}

export const createWideMap = (mapInput: string): M => {
    const lines = mapInput.split('\n')

    const map: M = []

    const rep: Record<string, [string, string]> = {
        O: ['[', ']'],
        '@': ['@', '.'],
        '#': ['#', '#'],
        '.': ['.', '.'],
    }

    for (let i = 0; i < lines.length; i++) {
        const line = []
        for (let j = 0; j < lines[i].length; j++) {
            rep[lines[i][j]].forEach((c) => line.push(c))
        }
        map.push(line)
    }

    return map
}

export const charAt = (pos: P) => {
    return map[pos[0]][pos[1]]
}

export const setChar = (pos: P, char: string) => {
    map[pos[0]][pos[1]] = char
}

export const getFullBox = (pos: P): B => {
    const char = charAt(pos)
    const box: B = [pos, [pos[0], pos[1] + (char === ']' ? -1 : 1)]]
    box.sort((a, b) => a[1] - b[1])
    return box
}

export const nextPosForBox = (box: B, dir: string): P[] => {
    if (['<', '>'].includes(dir)) {
        const next = nextPos(box[dir === '<' ? 0 : 1], dir)
        return next ? [next] : undefined
    }

    const pos1 = nextPos(box[0], dir)
    if (!pos1) {
        return undefined
    }
    const pos2 = nextPos(box[1], dir)

    return [pos1, pos2]
}
