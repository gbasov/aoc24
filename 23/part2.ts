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

for (const pair of pairs) {
    for (const n of pair) {
        if (!nodes[n]) {
            nodes[n] = new Set()
        }
    }
    nodes[pair[0]].add(pair[1])
    nodes[pair[1]].add(pair[0])
}

let maxSize = 0
let maxGroup: string[] = []
const explored = new Set<string>()

for (const n in nodes) {
    explored.add(n)
    const links = [...nodes[n]].filter((ni) => !explored.has(ni))

    if (links.length + 1 <= maxSize) {
        continue
    }

    const nLinks = links.map((ni) => nodes[ni])

    for (let i = 0; i < links.length; i++) {
        const n1 = links[i]
        if (explored.has(n1)) {
            continue
        }

        let group = links.toSpliced(i, 1).filter((_, i) => nLinks[i].has(n1))

        group = [
            n,
            n1,
            ...group.filter((ni, i) =>
                group.toSpliced(i, 1).every((nj) => nodes[nj].has(ni)),
            ),
        ]

        if (group.length > maxSize) {
            maxSize = group.length
            maxGroup = group
        }
    }
}

console.log(maxGroup.sort().join(','))

console.timeEnd('Time')
