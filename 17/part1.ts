console.time('Time')
import { readFileSync } from 'fs'
// const IS_TEST = true
const IS_TEST = false

const [regInput, progInput] = readFileSync(
    `${IS_TEST ? 'test' : 'input'}.txt`,
    'ascii',
)
    .trim()
    .split('\n\n')

const reg = regInput.split('\n').map((l) => Number(l.split(': ').pop()))
const prog = progInput.split(' ').pop().split(',').map(Number)
console.log(reg)
console.log(prog)

const output: number[] = []
let pntr = 0

const cmb = (val: number) => (val > 3 ? reg[val - 4] : val)

const adv = (arg: number) => {
    reg[0] = reg[0] >> cmb(arg)
    pntr += 2
}
const bxl = (arg: number) => {
    reg[1] = reg[1] ^ arg
    pntr += 2
}
const bst = (arg: number) => {
    reg[1] = cmb(arg) & 0b111
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
    output.push(cmb(arg) & 0b111)
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

while (pntr < prog.length) {
    ops[prog[pntr]](prog[pntr + 1])
}

console.log(reg)
console.log(output.join(','))

console.timeEnd('Time')
