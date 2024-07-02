import ClickBox from "./components/ClickBox"
import Heading from "./components/Heading";
import Controls from "./components/Controls";
import { useState, useEffect, useRef} from "react";

type measureMode = "Timed" | "Clicks";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [measureMode, setMeasureMode] = useState<measureMode>("Timed");
  const [mode, setMode] = useState("Speed");
  const [score, setScore] = useState(0);
  const [measureRemaining, setMeasureRemaining] = useState(0);
  const timeGiven = 3;
  const clicksGiven = 100;
  const scoreRef = useRef(score);
  const [cps, setCps] = useState(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  
  useEffect(() => {
    if (isRunning){
      const timeStart = Date.now();
      if (measureMode === "Timed"){
        const timedCountdown = setInterval(() => {
        const timeElapsed = Math.floor((Date.now() - timeStart)/1000);
        const newMeasureRemaining = timeGiven - timeElapsed;
        if (newMeasureRemaining >= 0){
          setMeasureRemaining(newMeasureRemaining);
        } else{
          scoreFinalize();
          clearInterval(timedCountdown);
          setIsRunning(false);
        }
        }, 1000);
      } else if(measureMode === "Clicks"){
        //const timeCount = setTimeout
      }
    }
  }, [isRunning])

  const calcCPS = () =>{
    return (Math.round((scoreRef.current/timeGiven) * 100) / 100);
  }

  const scoreFinalize = () => {
    if (measureMode === "Timed"){
      setCps(calcCPS());
      console.log(`Your score: ${scoreRef.current} Your cps: ${calcCPS()}`);
      // Add to personal leaderboard (MUCH LATER)
    }
    
  };

  const isRunningSwitch = (isRunningParam: boolean) => {
    setIsRunning(isRunningParam);
    setScore(0);
    if (measureMode === "Timed"){
      setMeasureRemaining(timeGiven);
    } else if(measureMode === "Clicks"){
      setMeasureRemaining(clicksGiven);
    }
  };
  
  const measureSwitch = (measure: "Timed" | "Clicks") => {
    setMeasureMode(measure);
  };

  
  const modeSwitch = (mode: "Speed" | "Tracking" | "Flicking") => {
    setMode(mode);
  };

  const boxClicked = () => {
    if (!isRunning){
      isRunningSwitch(true);
    } else{
      switch(mode){
        case "Speed": {
          setScore(score + 1);
          break;
        }
        default: {
          setScore(score + 1); //Adding more cases (Later)
        }
      }
      if(measureMode === "Clicks"){
        setMeasureRemaining(measureRemaining - 1);
      }
    }
  };

  return (
    <>
      <Heading measureSwitch={measureSwitch}/>
      <Controls visible={true} score={score} modeSwitch={modeSwitch} measureType={measureMode} measureRemaining={measureRemaining} cps={cps} isRunning={isRunning}/>
      <ClickBox visible={true} clicked={boxClicked}/>
    </>
  );
}

export default App
