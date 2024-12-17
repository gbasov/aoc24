console.time('Time')
import { readFileSync } from 'fs'
// const IS_TEST = true
const IS_TEST = false

const progInput = readFileSync(`${IS_TEST ? 'test' : 'input'}.txt`, 'ascii')
    .trim()
    .split('\n\n')
    .pop()

const results = progInput.split(' ').pop().split(',').map(Number)
const prog = progInput.split(' ').pop().split(',').map(Number).slice(0, -1)

let reg = [0n, 0n, 0n]

let output: number[] = []
let pntr = 0

const cmb = (val: number) => (val > 3 ? reg[val - 4] : BigInt(val))

const adv = (arg: number) => {
    reg[0] = reg[0] >> cmb(arg)
    pntr += 2
}
const bxl = (arg: number) => {
    reg[1] = reg[1] ^ BigInt(arg)
    pntr += 2
}
const bst = (arg: number) => {
    reg[1] = cmb(arg) & 0b111n
    pntr += 2
}
const jnz = (arg: number) => {
    pntr = reg[0] ? arg : pntr + 2
}
const bxc = () => {
    reg[1] = reg[1] ^ reg[2]
    pntr += 2
}
const out = (arg: number) => {
    output.push(Number(cmb(arg) & 0b111n))
    pntr += 2
}
const bdv = (arg: number) => {
    reg[1] = reg[0] >> cmb(arg)
    pntr += 2
}
const cdv = (arg: number) => {
    reg[2] = reg[0] >> cmb(arg)
    pntr += 2
}

const ops = [adv, bxl, bst, jnz, bxc, out, bdv, cdv]

const run = () => {
    pntr = 0
    output = []
    while (pntr < prog.length) {
        ops[prog[pntr]](prog[pntr + 1])
    }
}

results.reverse()

const find = (input: bigint, offset: number) => {
    if (offset === results.length) {
        return input
    }

    for (let i = 0n; i < 8n; i++) {
        const a = (input << 3n) + i
        reg = [a, 0n, 0n]
        run()
        if (output[0] === results[offset]) {
            const minInput = find(a, offset + 1)
            if (minInput) {
                return minInput
            }
        }
    }
}

const minInput = find(0n, 0)
console.log({ minInput })

console.timeEnd('Time')
