import { readFileSync } from 'fs'
console.time('Time')

const input = readFileSync('input.txt', 'utf-8').trim().split('').map(Number)

type Span = {
    id?: number
    len: number
    next?: Span
    prev?: Span
}

let first: Span = {
    id: 1,
    len: input[0],
}
let cur: Span = first
let last: Span
let isFile = false
let id = 2
for (let i = 1; i < input.length; i++) {
    cur.next = { len: input[i], prev: cur }
    if (isFile) {
        cur.next.id = id
        id++
    }

    cur = cur.next
    last = cur
    isFile = !isFile
}

const printLine = () => {
    cur = first
    let str = ''
    while (cur) {
        const char = cur.id ? `${cur.id - 1}` : '.'
        str += char.repeat(cur.len)
        cur = cur.next
    }
    console.log(str)
}

let curF = last.id ? last : last.prev
let lastId = curF.id
while (curF && curF !== first) {
    if (!curF.id || curF.id > lastId) {
        curF = curF.prev
        continue
    }

    lastId = curF.id

    const fileLen = curF.len
    let curS = first
    let found = true
    while (curS && (curS.id || curS.len < fileLen)) {
        if (curS === curF) {
            found = false
            break
        }
        curS = curS.next
    }

    let curFPrev = curF.prev

    if (found) {
        curS.prev.next = curF
        curF.prev.next = {
            len: curF.len,
            next: curF.next,
            prev: curF.prev,
        }
        if (curF.next) {
            curF.next.prev = curF.prev.next
        }
        curF.prev = curS.prev

        if (curS.len === curF.len) {
            curF.next = curS.next
            curS.next.prev = curF
        } else {
            curF.next = {
                len: curS.len - curF.len,
                next: curS.next,
                prev: curF,
            }
            curS.next.prev = curF.next
        }
    }

    curF = curFPrev
}

// printLine()

let checksum = 0
let offset = 0
cur = first
while (cur) {
    if (cur.id) {
        let offsetSum = 0
        for (let i = 0; i < cur.len; i++) {
            offsetSum += i + offset
        }
        checksum += offsetSum * (cur.id - 1)
    }

    offset += cur.len
    cur = cur.next
}

console.log(checksum)

console.timeEnd('Time')
