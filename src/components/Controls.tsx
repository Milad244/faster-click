import { useState } from "react";

interface clickBoxProps{
    visible: boolean;
    score: number;
    modeSwitch: (mode: "Speed" | "Tracking" | "Flicking") => void;
    measureType: "Timed" | "Clicks";
    measureRemaining: number;
}

const Controls = ({visible, score, modeSwitch, measureType, measureRemaining}: clickBoxProps) => {
    let measureText;
    if (measureType === "Timed"){
        measureText = `Time left: ${measureRemaining} seconds`;
    } else{
        measureText = `Clicks left: ${measureRemaining}`;
    }

    if (visible){
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
    }
}

export default Controls