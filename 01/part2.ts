import { readFileSync } from 'fs'

const lines = readFileSync('input.txt', 'utf8').split('\n')

let left: number[] = [], right: number[] = []

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const [l, r] = line.split('   ')
    if (l && r) {
        left.push(parseInt(l))
        right.push(parseInt(r))
    }
}

const reducer = (acc: number, l: number) => {
    const cnt = right.filter(r => r === l).length
    return acc + l * cnt
}

const similarity = left.reduce(reducer, 0)

console.log(similarity)