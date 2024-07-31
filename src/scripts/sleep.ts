/**
 * @file sleep.ts
 * @param ms milliseconds to sleep
 * @returns promise that resolves after the sleep
 */
export default async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}