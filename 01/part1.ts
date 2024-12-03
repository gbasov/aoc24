import { readFileSync } from 'fs'

const lines = readFileSync('input.txt', 'utf8').split('\n')

let left = [], right = []

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const [l, r] = line.split('   ')
    if (l && r) {
        left.push(parseInt(l))
        right.push(parseInt(r))
    }
}

left.sort()
right.sort()

const distance = left.reduce((acc, l, i) => acc + Math.abs(l - right[i]), 0)
console.log(distance)
