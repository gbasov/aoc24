console.time('Time')
import { readFileSync } from 'fs'

// const TEST = true
const TEST = false

type Op = 'AND' | 'OR' | 'XOR'
type Gate = { in: [string, string]; out: string; op: Op; pass: boolean }

const INPUT = TEST ? 'test.txt' : 'input.txt'
const input = readFileSync(INPUT, 'ascii').trim().split('\n\n')

const values: Record<string, boolean> = {}

input[0].split('\n').forEach((l) => {
    const [k, v] = l.split(': ')
    values[k] = v === '1'
})

const gates: Gate[] = input[1].split('\n').map((g) => {
    const [l, r] = g.split(' -> ')
    const [in1, op, in2] = l.split(' ')
    return {
        in: [in1, in2],
        out: r,
        op: op as Op,
        pass: false,
    }
})

const bits = Math.max(
    ...gates
        .filter((g) => g.out.startsWith('z'))
        .map((g) => Number(g.out.slice(1))),
)

let carry = gates.find((g) => g.op === 'AND' && g.in.some((i) => i === 'x00'))

const switches = []
for (let b = 1; b < bits; b++) {
    const n = b.toString().padStart(2, '0')

    const xyXOR = gates.find(
        (g) => g.op === 'XOR' && g.in.some((i) => i.endsWith(n)),
    )

    const xyAND = gates.find(
        (g) => g.op === 'AND' && g.in.some((i) => i.endsWith(n)),
    )

    let z = gates.find((g) => g.op === 'XOR' && g.out === `z${n}`)

    if (!z) {
        // Find z by inputs
        z = gates.find(
            (g) =>
                g.op === 'XOR' &&
                g.in.every((i) => [carry.out, xyXOR.out].includes(i)),
        )

        // Find z by output
        const other = gates.find((g) => g.out === `z${n}`)

        if (z && other) {
            other.out = z.out
            z.out = `z${n}`
            switches.push(z.out, other.out)
        } else {
            break
        }
    }

    let carry1 = gates.find(
        (g) =>
            g.op === 'AND' &&
            g.in.every((i) => [carry.out, xyXOR.out].includes(i)),
    )

    if (!carry1) {
        const carryOut = carry.out

        // Find carry1 by input
        carry1 = gates.find(
            (g) => g.op === 'AND' && g.in.some((i) => i === carryOut),
        )
        if (!carry1) {
            break
        }

        const otherOut = carry1.in.find((i) => i !== carryOut)
        const other = gates.find((g) => g.out === otherOut)

        other.out = xyXOR.out
        xyXOR.out = otherOut
        switches.push(xyXOR.out, other.out)
    }

    carry = gates.find(
        (g) =>
            g.op === 'OR' &&
            g.in.every((i) => [carry1.out, xyAND.out].includes(i)),
    )

    if (!carry) {
        break
    }
}

console.log(switches.sort().join(','))

console.timeEnd('Time')
