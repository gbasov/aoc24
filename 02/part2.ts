import { readFileSync } from 'fs'

const reports = readFileSync('input.txt', 'utf8').split('\n')
reports.splice(-1)

const validate = (rep: number[], tolerate: boolean): boolean => {
    let valid = true
    let stoppedAt = 0
    const dir = rep[1] - rep[0] > 0 ? 1 : -1

    for (let i = 1; i < rep.length; i++) {
        const diff = rep[i] - rep[i - 1]
        const absDiff = Math.abs(diff)

        if ((absDiff < 1 || absDiff > 3) || (diff * dir < 0)) {
            valid = false
            stoppedAt = i
            break
        }
    }

    if (!valid && tolerate) {
        const levels = [stoppedAt - 1, stoppedAt, 0]
        if (stoppedAt - 1 > 0) {
            levels.push(0)
        }

        return levels.some(i => validate(rep.toSpliced(i, 1), false))
    }

    return valid
}

const reducer = (acc: number, line: string) => {
    const rep = line.split(' ').map(n => parseInt(n))

    const valid = validate(rep, true)

    return acc + (valid ? 1 : 0)
}

const nSafe = reports.reduce(reducer, 0)

console.log(nSafe)
