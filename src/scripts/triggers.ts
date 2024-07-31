import { error } from "./alerts";
import { generatePalette, generateRandomPalette } from "./palette";
import sleep from "./sleep";

/**
 * @file triggers.ts
 * @param input true if the palette is dependent on user input, false if it's random
 * @returns promise that resolves when the palette is generated
 */
export default function gen(requireInput: boolean): Promise<void> {
    if (requireInput) {
        const input = document.getElementById("palette-input") as HTMLInputElement;

        if (input.value.length === 6) {
            return new Promise((resolve) => {
                generatePalette().then(() => resolve());
            });
        } else {
            return new Promise((resolve) => {
                error('Ops... Something went wrong!', 'The code inserted is not a valid color.<br>Please enter a valid color code.').then(() => resolve());
            });
        }
    } else {
        return new Promise((resolve) => {
            generateRandomPalette().then(() => resolve());
        });
    }
}

// triggers the palette generation when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
    if (typeof window == "undefined") {
        return;
    }

    while (!document.getElementById("palette-input") || !document.getElementsByClassName("last")[0]) {
        await sleep(100);
    }

    gen(false);
});

// triggers the palette generation when the "Enter" or "Space" key is pressed
document.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        gen(true);
    } else if(e.key === " ") {
        gen(false);
    }
});