"use client";

import gen from "../scripts/triggers";
import { QuestionCircle } from "react-bootstrap-icons";

export default function TextBox(): JSX.Element {
    return (
        <div id="input-wrapper">
            <div id="help-wrapper">
                <label htmlFor="palette-input" id="input-label">Insert a color in HEX format:</label>
                <QuestionCircle id="help-icon" size={20} onClick={() => {window.location.href = "https://en.wikipedia.org/wiki/Web_colors"}} />
            </div>
            <div id="text-box-wrapper">
                <label id="palette-tag">#</label>
                <input type="text" id="palette-input" maxLength={6} />
                <label id="confirm-btn" onClick={() => gen(true)}>✨</label>  
            </div>
        </div>
    )
}