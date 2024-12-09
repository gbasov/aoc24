import { readFileSync } from 'fs'
console.time('Time')

const input = readFileSync('input.txt', 'utf-8').trim().split('').map(Number)

let disk = new Uint16Array(
    (function* () {
        let isFile = true
        let fileId = 1
        for (const len of input) {
            for (let i = 0; i < len; i++) {
                yield isFile ? fileId : 0
            }
            if (isFile) {
                fileId++
            }
            isFile = !isFile
        }
    })(),
)

let i = 0,
    j = disk.length - 1
while (i < j) {
    if (disk[i] === 0) {
        if (disk[j] === 0) {
            j--
        } else {
            disk[i] = disk[j]
            disk[j] = 0
        }
    } else {
        i++
    }
}

let checksum = 0
for (let i = 0; i < disk.length; i++) {
    let id = disk[i]
    if (id === 0) {
        break
    }
    checksum += (id - 1) * i
}

console.log(checksum)

console.timeEnd('Time')
