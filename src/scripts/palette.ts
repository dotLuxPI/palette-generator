// API url
const url = "http://colormind.io/api/";

// HEX color string regex
const hexRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// palette and palette segments
let palette: number[][] = [];
let paletteSegments: HTMLCollectionOf<HTMLDivElement>;

// lock to prevent multiple requests
let lock = false;

// initializes the palette segments when the DOM is loaded
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        paletteSegments = document.getElementsByClassName("palette-segment") as HTMLCollectionOf<HTMLDivElement>;
    });
}



/**
 *  @file palette.ts
 *  @returns Promise<void> that resolves when the palette is successfully generated
 */
export async function generatePalette(): Promise<void> {

    if (lock) {
        return;
    }

    lock = true;

    const hexColor: string = (document.getElementById("palette-input") as HTMLInputElement).value;
    const rgbColor: number[] = toRGB(hexColor);

    if(!hexRegex.test(hexColor)) {
        return;
    }

    palette = await fetchPalette(rgbColor);
    const hexPalette: string[] = palette.map(c => toHex(c));

    changeSegmentColors(hexPalette, Array.from(paletteSegments)) ? null : console.log("FAIL");

    lock = false;
}

/**
 *  @file palette.ts
 *  @returns Promise<void> that resolves when the random palette is successfully generated
 */
export async function generateRandomPalette(): Promise<void> {

    if (lock) {
        return;
    }

    lock = true;

    const randomColor = Array.from({length: 3}, () => Math.floor(Math.random() * 256));
    const input: HTMLInputElement = (document.getElementById("palette-input") as HTMLInputElement);

    palette = await fetchPalette(randomColor);
    const hexPalette: string[] = palette.map(c => toHex(c));

    changeSegmentColors(hexPalette, Array.from(paletteSegments)) ? null : console.log("FAIL");

    // change the input value to the random color
    input.value = toHex(randomColor);  
    
    lock = false;
}

/**
 * @param c1 an array of three integers representing the sRGB values of a color
 * @returns a palette of five colors fetched from the colormind API
 */
function fetchPalette(c1: number[]): Promise<number[][]> {
    return new Promise((resolve, reject) => {
        const data = {
            model : "default",
            input : [c1, 'N', 'N', 'N', 'N']
        }

        const http = new XMLHttpRequest();

        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    const palette = JSON.parse(http.responseText).result;
                    resolve(palette);
                } else {
                    reject("Error: " + http.status);
                }
            }
        };

        http.open("POST", url, true);
        http.send(JSON.stringify(data));
    });
}

/**
 * Converts an sRGB color to an HEX color
 * @param color an array of three integers representing the RGB values of a color
 * @returns a string containing the hex value of the color
 */
function toHex(color: number[]): string {
    return color ? color.map(c => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }).join("") : "";
}

/**
 * Converts an HEX color to an sRGB color
 * @param color a string containing the hex value of a color
 * @returns an array of three integers representing the RGB values of the color
 */
function toRGB(color: string): number[] {
    return color ? [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)].map(c => parseInt(c, 16)) : [];
}

/**
 * @param palette a string containing the hex values for the five colors composing the palette
 * @param segments contains the references to the DOM elements that represent segments the palette
 * @returns true if every color is successfully updated, false otherwise
 */
function changeSegmentColors(palette: string[], segments: HTMLDivElement[]): boolean {
    // base case
    if (palette.length === 0) {
        return true;
    }

    // segments and palette are un-aligned
    if (segments.length !== palette.length) {
        return false;
    }

    // updates the color of the segment
    segments[0].style.backgroundColor = "#"+palette[0];

    // updates the text of the segment
    if (segments[0].firstChild) {
        const text = segments[0].firstChild as HTMLElement;
        
        text.textContent = "#" + (palette[0].toUpperCase());
    }

    // pass recoursively to the next segment
    return changeSegmentColors(palette.slice(1), segments.slice(1));
}