/**
 * Returns a promise after `ms` milliseconds.
 * @param {number} ms  Time in milliseconds to wait
 */
async function delay(ms: number): Promise<void> {
    return new Promise((res, rej) => {
        setTimeout(() => {res()}, ms)
    })
}

export { delay }