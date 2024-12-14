import { readFileSync } from 'fs'
console.time('Time')

type R = { p: [number, number]; v: [number, number] }

const robots: R[] = readFileSync('input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((line) => {
        const parts = line
            .split(' ')
            .map((part) => part.slice(2).split(',').map(Number))

        return { p: [parts[0][0], parts[0][1]], v: [parts[1][0], parts[1][1]] }
    })

// const width = 11,
//     height = 7,
//     time = 100

const width = 101,
    height = 103,
    time = 100

const midX = Math.floor(width / 2),
    midY = Math.floor(height / 2),
    quadrants = [0, 0, 0, 0]

for (const robot of robots) {
    let x = (robot.p[0] + time * robot.v[0]) % width
    let y = (robot.p[1] + time * robot.v[1]) % height
    x = x < 0 ? width + x : x
    y = y < 0 ? height + y : y

    if (x < midX && y < midY) {
        quadrants[0]++
    } else if (x > midX && y < midY) {
        quadrants[1]++
    } else if (x < midX && y > midY) {
        quadrants[2]++
    } else if (x > midX && y > midY) {
        quadrants[3]++
    }
}

const safetyFactor = quadrants
    .filter((s) => s > 0)
    .reduce((acc, s) => acc * s, 1)

console.log(safetyFactor)

console.timeEnd('Time')
