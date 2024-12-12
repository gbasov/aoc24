import { readFileSync } from 'fs'
console.time('Time')

const farm: [string, boolean][][] = readFileSync('test.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((line) => line.split('').map((crop) => [crop, false]))

const steps = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
]

const outFarm = (i: number, j: number): boolean => {
    return i < 0 || i >= farm.length || j < 0 || j >= farm[0].length
}

let cost = 0
let discountedCost = 0

for (let i = 0; i < farm.length; i++) {
    for (let j = 0; j < farm[i].length; j++) {
        const [crop, visited] = farm[i][j]
        if (visited) {
            continue
        }

        let area = 0
        let perimeter = 0
        let perimeterBySide: Record<number, [number, number][]> = steps.reduce(
            (acc, _, i) => ({ ...acc, [i]: [] }),
            {},
        )

        const q: [number, number][] = []
        q.push([i, j])

        while (q.length) {
            const [k, l] = q.shift()
            if (farm[k][l][1]) {
                continue
            }
            farm[k][l][1] = true
            area++

            for (let s = 0; s < steps.length; s++) {
                const step = steps[s]

                const k1 = k + step[0],
                    l1 = l + step[1]

                if (outFarm(k1, l1)) {
                    perimeter++
                    perimeterBySide[s].push([k, l])
                    continue
                }

                if (farm[k1][l1][0] === crop) {
                    q.push([k1, l1])
                } else {
                    perimeter++
                    perimeterBySide[s].push([k, l])
                }
            }
        }

        cost += area * perimeter

        let sides = 0
        for (const sideS in perimeterBySide) {
            const side = Number(sideS)
            const plots = perimeterBySide[side]

            if (!plots.length) {
                continue
            }

            let directionSides = 0

            const groups: Record<number, number[]> = {}
            for (const plot of plots) {
                const lng = plot[side < 2 ? 0 : 1]
                const lat = plot[side < 2 ? 1 : 0]
                if (!groups[lat]) {
                    groups[lat] = []
                }
                groups[lat].push(lng)
            }

            for (const g in groups) {
                const group = groups[g]
                group.sort((a, b) => a - b)

                let sections = 1
                let prev = group.shift()

                while (group.length) {
                    let next = group.shift()
                    if (next - prev > 1) {
                        sections++
                    }
                    prev = next
                }

                directionSides += sections
            }
            sides += directionSides
        }

        discountedCost += area * sides
    }
}

console.log({ cost })
console.log({ discountedCost })

console.timeEnd('Time')
