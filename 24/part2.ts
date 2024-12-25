console.time('Time')
import { readFileSync } from 'fs'

const TEST = true
// const TEST = false

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

let carry = gates.find((g) => g.op === 'AND' && g.in.some((i) => i === 'x00'))
console.log({ carry })
for (let b = 1; b < 45; b++) {
    console.log('\nbit', b)

    const n = b.toString().padStart(2, '0')

    const xyXOR = gates.find(
        (g) => g.op === 'XOR' && g.in.some((i) => i.endsWith(n)),
    )
    console.log('xyXOR', xyXOR)

    const zVal = gates.find(
        (g) =>
            g.op === 'XOR' &&
            g.in.every((i) => [xyXOR.out, carry.out].includes(i)),
    )
    console.log('zVal', zVal)

    const xyAND = gates.find(
        (g) => g.op === 'AND' && g.in.some((i) => i.endsWith(n)),
    )
    console.log('xyAND', xyAND)
    const carry1 = gates.find(
        (g) =>
            g.op === 'AND' &&
            g.in.every((i) => [xyXOR.out, carry.out].includes(i)),
    )
    console.log('carry1', carry1)
    carry = gates.find(
        (g) =>
            g.op === 'OR' &&
            g.in.every((i) => [xyAND.out, carry1.out].includes(i)),
    )
    if (!carry) {
        const zValOut = zVal.out
        zVal.out = xyAND.out
        xyAND.out = zValOut

        carry = gates.find(
            (g) =>
                g.op === 'OR' &&
                g.in.every((i) => [xyAND.out, carry1.out].includes(i)),
        )
    }
    console.log('carry', carry)
}

console.timeEnd('Time')
