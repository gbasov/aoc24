import { readFileSync } from 'fs'
const input = readFileSync('input.txt', 'utf-8').trim()

const antGroups = {}
input.split('\n').forEach((line, i) => {
    line.split('').forEach((char, j) => {
        if (char === '.') {
            return
        }
        if (!antGroups[char]) {
            antGroups[char] = []
        }
        antGroups[char].push([i, j])
    })
})

const height = input.split('\n').length
const width = input.split('\n')[0].split('').length

const calcNodes = (a, b) => {
    const d0 = a[0] - b[0]
    const d1 = a[1] - b[1]

    const node1 = [a[0] + d0, a[1] + d1]
    const node2 = [b[0] + d0 * -1, b[1] + d1 * -1]

    return [node1, node2]
}

const uniqueNodes = new Map()
const storeNode = (node) => {
    if (node[0] < 0 || node[0] >= height || node[1] < 0 || node[1] >= width) {
        return
    }

    const id = node[0] * 1000 + node[1]
    uniqueNodes.set(id, true)
}

for (const freq in antGroups) {
    const ants = antGroups[freq]
    for (let i = 0; i < ants.length - 1; i++) {
        for (let j = i + 1; j < ants.length; j++) {
            const nodes = calcNodes(ants[i], ants[j])
            nodes.map(storeNode)
        }
    }
}

console.log(uniqueNodes.size)
