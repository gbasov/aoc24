export const sequenceVariants = (
    a: string,
    na: number,
    b: string,
    nb: number,
): string[][] => {
    const r = []

    const build = (seq: string[], na: number, nb: number) => {
        if (!na && !nb) {
            r.push(seq)
            return
        }
        if (na > 0) build([...seq, a], na - 1, nb)
        if (nb > 0) build([...seq, b], na, nb - 1)
    }

    build([], na, nb)
    return r
}
