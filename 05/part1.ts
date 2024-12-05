import { readFileSync} from 'fs'

const input = readFileSync('input.txt', 'utf-8').trim()
const inputParts = input.split('\n\n').map(text => text.split('\n'))
const pairs = inputParts[0].map(pair => pair.split('|').map(num => parseInt(num)))
const updates = inputParts[1].map(update => update.split(',').map(num => parseInt(num)))

const rules: Map<number, Set<number>> = new Map()
pairs.forEach(pair => {
    const [left, right] = pair
    let nums = rules.get(right)
    if (!nums) {
        nums = new Set()
        rules.set(right, nums)
    }
    nums.add(left)
})

const validate = (update: number[]): boolean => {
    if (update.length < 2) {
        return true
    }

    const rule = rules.get(update[0])
    const pages = update.toSpliced(0, 1)
    if (rule) {
        const incorrect = pages.some(page => rule.has(page))
        if (incorrect) {
            return false
        }
    }

    return validate(pages)
}

const middle = (update: number[]): number => {
    return update[Math.floor(update.length / 2)]
}

const sum = updates.reduce(
    (sum, update) => validate(update) ? sum + middle(update) : sum, 0
)

console.log(sum)
