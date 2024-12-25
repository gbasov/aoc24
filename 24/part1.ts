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

const calc = (gate: Gate): boolean => {
    const [in1, in2] = gate.in.map((i) => values[i])
    switch (gate.op) {
        case 'AND':
            return in1 && in2
        case 'OR':
            return in1 || in2
        case 'XOR':
            return in1 !== in2
    }
}

let passed: number = -1
while (passed !== 0) {
    passed = 0
    for (const gate of gates) {
        if (
            !gate.pass &&
            values[gate.in[0]] !== undefined &&
            values[gate.in[1]] !== undefined
        ) {
            values[gate.out] = calc(gate)
            passed++
            gate.pass = true
        }
    }
}

let z = 0n
for (const k of Object.keys(values)) {
    if (k.startsWith('z')) {
        const shift = BigInt(k.slice(1))
        z += (values[k] ? 1n : 0n) << shift
    }
}
console.log(z)

console.timeEnd('Time')
