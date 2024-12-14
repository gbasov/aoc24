import { readFileSync } from 'fs'
import { display } from '../common'

type R = { p: [number, number]; v: [number, number] }

const robots: R[] = readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((line) => {
        const parts = line
            .split(' ')
            .map((part) => part.slice(2).split(',').map(Number))

        return { p: [parts[0][0], parts[0][1]], v: [parts[1][0], parts[1][1]] }
    })

const width = 101,
    height = 103,
    time = 100000

for (let i = 1; i <= time; i++) {
    const pos = {}

    for (const robot of robots) {
        let x = (robot.p[0] + i * robot.v[0]) % width
        let y = (robot.p[1] + i * robot.v[1]) % height
        x = x < 0 ? width + x : x
        y = y < 0 ? height + y : y

        if (!pos[y]) {
            pos[y] = {}
        }
        pos[y][x] = true
    }

    let print = false
    for (let y = 0; y < height; y++) {
        let prev = 0
        let cnt = 0
        for (let x = 0; x < width; x++) {
            if (pos[y]?.[x]) {
                cnt = x - prev === 1 ? cnt + 1 : 0
                prev = x
            }

            if (cnt === 10) {
                print = true
                break
            }
        }
        if (print) {
            break
        }
    }

    if (print) {
        await display(() => {
            let out = ''
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    out += pos[y]?.[x] ? '█' : '.'
                }
                out += '\n'
            }

            out += `Step: ${i}\n`

            return out
        })
    }
}
