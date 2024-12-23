console.time('Time')
import { readFileSync } from 'fs'

// const TEST = true
const TEST = false

const INPUT = TEST ? 'test.txt' : 'input.txt'
const pairs = readFileSync(INPUT, 'ascii')
    .trim()
    .split('\n')
    .map((s) => s.split('-'))

const nodes: Record<string, Set<string>> = {}
const threes = new Set<string>()

for (const pair of pairs) {
    for (const n of pair) {
        if (!nodes[n]) {
            nodes[n] = new Set()
        }
    }
    nodes[pair[0]].add(pair[1])
    nodes[pair[1]].add(pair[0])
}

for (const n in nodes) {
    if (!n.startsWith('t')) {
        continue
    }

    const links = [...nodes[n]]
    for (let i = 0; i < links.length - 1; i++) {
        const n1 = links[i]
        for (let j = i + 1; j < links.length; j++) {
            const n2 = links[j]
            if (nodes[n1]?.has(n2)) {
                threes.add([n, n1, n2].sort().join(','))
            }
        }
    }
}

console.log(threes.size)

console.timeEnd('Time')
