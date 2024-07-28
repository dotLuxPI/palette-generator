import { generatePalette, generateRandomPalette } from "./palette";

/**
 * @file triggers.ts
 * @param input true if the palette is dependent on user input, false if it's random
 * @returns promise that resolves when the palette is generated
 */
export default function gen(input: boolean): Promise<void> {
    return new Promise((resolve) => {
        input ? 
        generatePalette().then(() => resolve()) :
        generateRandomPalette().then(() => resolve());
    });
}

// triggers the palette generation when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
    if (typeof window == "undefined") {
        return;
    }
    
    while (!document.getElementById("palette-input") || !document.getElementsByClassName("last")[0]) {
        await new Promise((resolve) => setTimeout(resolve, 100));
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