import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf8')

const matches = input.match(/mul\(\d{1,3},\d{1,3}\)/gm)

const reducer = (acc: number, operation: string): number => {
    const nums = (operation.match(/\d+/g) || []).map((num: string) => parseInt(num))
    return acc + nums[0] * nums[1]
}

const total = matches?.reduce(reducer, 0)

console.log(total)
