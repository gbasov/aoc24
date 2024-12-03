import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf8')

const matches = input.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/gm)

let enabled = true, total = 0;

for (let i = 0; i < matches.length; i++) {
    const op = matches[i]

    if (op === 'do()') {
        enabled = true
    } else if (op === 'don\'t()') {
        enabled = false
    } else if (enabled) {
        const nums = (op.match(/\d+/g) || []).map((num: string) => parseInt(num))
        total += nums[0] * nums[1]
    }
}

console.log(total)
