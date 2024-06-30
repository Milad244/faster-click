//import { useState } from "react";

interface controlsProps{
    visible: boolean;
    score: number;
    modeSwitch: (mode: "Speed" | "Tracking" | "Flicking") => void;
    measureType: "Timed" | "Clicks";
    measureRemaining: number;
    cps: number;
}

const Controls = ({visible, score, modeSwitch, measureType, measureRemaining, cps}: controlsProps) => {
    if (!visible) return null;

    let measureText;
    if (measureType === "Timed"){
        measureText = `Time left: ${measureRemaining} seconds CPS: ${cps}`;
    } else{
        measureText = `Clicks left: ${measureRemaining} Time taken: CPS: `;
    }

    return (
        <div>
            <div>
                <ul className="nav justify-content-center">
                    <li className="nav-item" onClick={() => {modeSwitch("Speed")}}>
                        <a className="nav-link active">Speed</a>
                    </li>
                    <li className="nav-item" onClick={() => {modeSwitch("Tracking")}}>
                        <a className="nav-link">Tracking</a>
                    </li>
                    <li className="nav-item" onClick={() => {modeSwitch("Flicking")}}>
                        <a className="nav-link">Flicking</a>
                    </li>
                </ul>
            </div>
            <div>
                <p>Current Score: {score}</p>
                <p>{measureText}</p>
            </div>
        </div>
    )
};

export default Controls