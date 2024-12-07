import { readFileSync } from 'fs'
const input = readFileSync('input.txt', 'utf-8').trim()

type Equation = {
    result: number
    nums: number[]
}

type Op = {
    sign: string
    eval: (a: number, b: number) => number
}

type Edge = {
    op: Op
    dst: Vertex
}

type Vertex = {
    val: number
    edges?: Edge[]
}

const ops: Op[] = [
    { sign: '+', eval: (a: number, b: number) => a + b },
    { sign: '*', eval: (a: number, b: number) => a * b },
]

const equations: Equation[] = input.split('\n').map((line) => {
    const [res, nums] = line.split(': ')
    return {
        result: parseInt(res),
        nums: nums.split(' ').map(Number),
    }
})

const makeGraph = (eq: Equation, pos: number): Vertex => {
    const val = eq.nums[pos]

    if (pos === eq.nums.length - 1) {
        return { val }
    }

    return {
        val,
        edges: ops.map((op) => ({
            op,
            dst: makeGraph(eq, pos + 1),
        })),
    }
}

const traverse = (v: Vertex, acc: number, res: number): boolean => {
    if (acc > res) {
        return false
    }

    if (!v.edges) {
        return acc === res
    }

    for (const edge of v.edges) {
        if (traverse(edge.dst, edge.op.eval(acc, edge.dst.val), res)) {
            return true
        }
    }

    return false
}

const total = equations.reduce((acc, eq) => {
    const v = makeGraph(eq, 0)
    const valid = traverse(v, v.val, eq.result)
    return valid ? acc + eq.result : acc
}, 0)

console.log(total)
