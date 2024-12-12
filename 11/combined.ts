import { readFileSync } from 'fs'
console.time('Time')

const input = readFileSync('input.txt', 'utf-8').trim().split(' ').map(Number)

let stones = new Map<number, number>()

for (const stone of input) {
    stones.set(stone, 1)
}

const blinks = [25, 75]
const total = [0, 0]

const countTotal = () => {
    let r = 0
    for (const num of stones.values()) {
        r += num
    }
    return r
}

const cache: Map<number, number[]> = new Map()
const split = (stone: number): number[] => {
    let res = cache.get(stone)
    if (!res) {
        if (stone === 0) {
            res = [1]
        } else {
            const str = stone.toString()
            if (str.length % 2 === 0) {
                const digits = str.split('')
                const splitAt = digits.length / 2
                res = [
                    Number(digits.slice(0, splitAt).join('')),
                    Number(digits.slice(splitAt).join('')),
                ]
            } else {
                res = [stone * 2024]
            }
        }
        cache.set(stone, res)
    }
    return res
}

for (let i = 0; i < blinks[1]; i++) {
    if (i === blinks[0]) {
        total[0] = countTotal()
    }

    const keys = [...stones.keys()]
    const newStones = new Map<number, number>()

    for (const key of keys) {
        const oldStoneNum = stones.get(key)!

        const splitStones = split(key)
        for (const newStone of splitStones) {
            const existingNewStones = newStones.get(newStone) ?? 0
            newStones.set(newStone, existingNewStones + oldStoneNum)
        }
    }

    stones = newStones
}

total[1] = countTotal()

console.log(`${blinks[0]}: ${total[0]}`)
console.log(`${blinks[1]}: ${total[1]}`)

console.timeEnd('Time')
