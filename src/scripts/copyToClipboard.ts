import copy from 'copy-to-clipboard';
import { copied } from './alerts';
import sleep from './sleep';

// Wait for the page to load
document.addEventListener('DOMContentLoaded', async () => {
    
    // Wait for the last palette segment to load
    while (!document.getElementsByClassName('last')[0]) {
        await sleep(100);
    }

    // Get all hex codes
    const hexCodes: HTMLCollectionOf<Element> = document.getElementsByClassName('palette-segment-color');

    // Add an event listener to each hex code to copy it to the clipboard
    Array.from(hexCodes).forEach((hexCode) => {
        hexCode.addEventListener('click', () => {
            copy(hexCode.innerHTML);
            copied();
        });
    });
});