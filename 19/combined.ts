console.time('Time')
import { readFileSync } from 'fs'

// const INPUT = 'input.txt'
const INPUT = 'test.txt'

const input = readFileSync(INPUT, 'ascii').trim().split('\n\n')

const towels = input[0].split(', ')
const designs = input[1].split('\n')

let totalDesigns = 0
let totalArrangements = 0

for (const design of designs) {
    const towelsForDesign = towels.filter((t) => design.indexOf(t) > -1)
    if (!towelsForDesign.length) {
        continue
    }

    const dp = Array(design.length + 1).fill(0)
    dp[0] = 1

    for (let i = 0; i < design.length; i++) {
        if (!dp[i]) {
            continue
        }

        const slice = design.slice(i)

        for (const towel of towelsForDesign) {
            if (slice.startsWith(towel)) {
                dp[i + towel.length] += dp[i]
            }
        }
    }

    totalDesigns += dp[design.length] ? 1 : 0
    totalArrangements += dp[design.length]
}

console.log(totalDesigns)
console.log(totalArrangements)

console.timeEnd('Time')
