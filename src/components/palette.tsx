/**
 * @param String - color in hex format 
 * @returns JSX.Element - a div element with a background color and the hex code of the color inside
 */
function PaletteSegment(color: string, position: number): JSX.Element {
    return (
        <div className={classAssignment(position)} style={{backgroundColor: color}} data-clipboard-text="I'll be copied">
            <div className="palette-segment-color" style={{color: color}}>{color}</div>
        </div>
    )
}

/**
 * @param number - position of the palette segment
 * @returns string - the class names of the palette segment
 */
function classAssignment(number: number): string {
    if (number === 1) {
        return 'palette-segment first';
    } else if (number === 5) {
        return 'palette-segment last';
    } else {
        return 'palette-segment';
    }
}

/**
 * @file palette.tsx
 * @returns JSX.Element - a div element with 5 palette segments
 */
export default function Palette(): JSX.Element {
    return (
        <div id="palette-wrapper">
            {PaletteSegment('#FFFFFF', 1)}
            {PaletteSegment('#FFFFFF', 2)}
            {PaletteSegment('#FFFFFF', 3)}
            {PaletteSegment('#FFFFFF', 4)}
            {PaletteSegment('#FFFFFF', 5)}
        </div>
    )
}