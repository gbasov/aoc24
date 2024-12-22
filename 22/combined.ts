console.time('Time')
import { readFileSync } from 'fs'

// const TEST = true
const TEST = false

const INPUT = TEST ? 'test.txt' : 'input.txt'
const nums = readFileSync(INPUT, 'ascii').trim().split('\n').map(Number)

const mixPrune = (s: number, a: number) => (s ^ a) & 0b111111111111111111111111

const next = (num: number) => {
    let n = mixPrune(num << 6, num)
    n = mixPrune(n >> 5, n)
    return mixPrune(n << 11, n)
}

const incomes: Record<string, number> = {}

let secretSum = 0

for (let i = 0; i < nums.length; i++) {
    let secret = nums[i]
    let price = secret % 10

    const seq: string[] = []
    const foundSeqs: Record<string, boolean> = {}
    for (let j = 0; j < 2000; j++) {
        const prevPrice = price
        secret = next(secret)
        price = secret % 10

        seq.push((price - prevPrice).toString())

        if (seq.length > 4) {
            seq.shift()
        }

        if (seq.length === 4) {
            const key = seq.join('')

            if (!foundSeqs[key]) {
                incomes[key] = (incomes[key] ?? 0) + price
                foundSeqs[key] = true
            }
        }
    }

    secretSum += secret
}

console.log({ secretSum: secretSum })

const maxIncome = Math.max(...Object.values(incomes))

console.log({ maxIncome })

console.timeEnd('Time')
