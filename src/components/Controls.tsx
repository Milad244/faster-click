//import { useState } from "react";

interface controlsProps{
    visible: boolean;
    score: number;
    modeSwitch: (mode: "Speed" | "Tracking" | "Flicking") => void;
    measureType: "Timed" | "Clicks";
    measureRemaining: number;
    cps: number;
    isRunning: boolean;
}

const Controls = ({visible, score, modeSwitch, measureType, measureRemaining, cps, isRunning}: controlsProps) => {
    if (!visible) return null;

    let measureText;
    if (measureType === "Timed"){
        measureText = `Time left: ${measureRemaining} Seconds`;
    } else{
        measureText = `Clicks left: ${measureRemaining} Time taken: `;
    }

    return (
        <div>
            <div>
                <ul className="nav justify-content-center">
                    <li className="nav-item modeButtons" onClick={() => {modeSwitch("Speed")}}>
                        <a className="nav-link active">Speed</a>
                    </li>
                    <li className="nav-item modeButtons" onClick={() => {modeSwitch("Tracking")}}>
                        <a className="nav-link">Tracking</a>
                    </li>
                    <li className="nav-item modeButtons" onClick={() => {modeSwitch("Flicking")}}>
                        <a className="nav-link">Flicking</a>
                    </li>
                </ul>
            </div>
            <div>
                <p className="liveScore">Current Score: {score} | {measureText}</p>
            </div>
            <div className="no-display">Result: {score} | {measureText} | CPS: {cps}</div>
        </div>
    )
};

export default Controls