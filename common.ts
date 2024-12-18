import { createInterface } from 'readline/promises'
import { stdin as input, stdout as output } from 'process'

export const display = async (printer: () => string) => {
    console.clear()
    const rl = createInterface({ input, output })
    await rl.question(printer())
    rl.close()
}

export class PQ<T> {
    protected minPriority: number = Infinity
    protected minIndex: number
    protected q: [T, number][] = []

    constructor(initial: [T, number][]) {
        if (initial) {
            this.q = initial
        }
    }

    push(item: T, priority: number) {
        if (priority < this.minPriority) {
            this.minIndex = this.q.length
            this.minPriority = priority
        }

        this.q.push([item, priority])
    }

    pop(): [T, number] {
        const item = this.q.splice(this.findMinIndex(), 1)[0]
        this.minPriority = Infinity
        this.minIndex = undefined
        return item
    }

    size(): number {
        return this.q.length
    }

    protected findMinIndex(): number {
        if (this.minIndex === undefined) {
            let minIndex = this.q.length - 1
            let minPriority = this.q[minIndex][1]
            for (let i = minIndex - 1; i >= 0; i--) {
                if (this.q[i][1] < minPriority) {
                    minPriority = this.q[i][1]
                    minIndex = i
                }
            }
            this.minIndex = minIndex
            this.minPriority = minPriority
        }

        return this.minIndex
    }
}
