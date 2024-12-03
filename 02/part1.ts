import { readFileSync } from 'fs'

const reports = readFileSync('input.txt', 'utf8').split('\n')
reports.splice(-1)

const reducer = (acc: number, line: string) => {
    const rep = line.split(' ').map(n => parseInt(n))

    const dir = rep[1] - rep[0] > 0 ? 1 : -1
    for (let i = 1; i < rep.length; i++) {
        const diff = rep[i] - rep[i - 1]

        const absDiff = Math.abs(diff)
        if (absDiff < 1 || absDiff > 3) {
            return acc
        }

        if (diff * dir < 0) {
            return acc
        }
    }

    return acc + 1
}

const nSafe = reports.reduce(reducer, 0)

console.log(nSafe)
