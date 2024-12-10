import { createInterface } from 'readline/promises'
import { stdin as input, stdout as output } from 'process'

export const display = async (printer: () => string) => {
    console.clear()
    const rl = createInterface({ input, output })
    await rl.question(printer())
    rl.close()
}
