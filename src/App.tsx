import ClickBox from "./components/ClickBox"
import Heading from "./components/Heading";
import Controls from "./components/Controls";
import { useState } from "react";

function App() {

    const [mode, setMode] = useState("Speed");
    const modeSwitch = (mode: "Speed" | "Tracking" | "Flicking") => {
        setMode(mode);
    }

    const [score, setScore] = useState(0);
    const boxClicked = () => {
      switch(mode){
        case "Speed": {
          setScore(score + 1);
          break;
        }
        default: {
          setScore(score + 1); //Later change 
        }
      }
    }

    return (
      <>
        <Heading />
        <Controls visible={true} score={score} modeSwitch={modeSwitch} measureType="Timed" measureRemaining={5}/>
        <ClickBox visible={true} clicked={boxClicked}/>
      </>
    );
}

export default App
