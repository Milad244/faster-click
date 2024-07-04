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
  const measureRemainingRef = useRef(measureRemaining);
  const [measureRemaining2, setMeasureRemaining2] = useState(0);
  const measureRemainingRef2 = useRef(measureRemaining2);
  const timeGiven = 3;
  const clicksGiven = 20;
  const clickCount = useRef(0);
  const scoreRef = useRef(score);
  const [cps, setCps] = useState(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    measureRemainingRef.current = measureRemaining;
  }, [measureRemaining]);

  useEffect(() => {
    measureRemainingRef2.current = measureRemaining2;
  }, [measureRemaining2]);
  
  useEffect(() => {
    if (isRunning){
      const timeStart = Date.now();
      if (measureMode === "Timed"){
          const timedCountdown = setInterval(() => {
            const timeElapsed = Number(((Date.now() - timeStart) / 1000).toFixed(2));
          const newMeasureRemaining = timeGiven - timeElapsed;
          if (newMeasureRemaining >= 0){
            setMeasureRemaining(newMeasureRemaining);
          } else{
            scoreFinalize();
            clearInterval(timedCountdown);
          }
        }, 10);
      } else if(measureMode === "Clicks"){
          const timeCount = setInterval(() => {
            const timeElapsed = Number(((Date.now() - timeStart) / 1000).toFixed(2));
          setMeasureRemaining2(timeElapsed);
          if (measureRemainingRef.current <= 0){
            scoreFinalize();
            setMeasureRemaining2(0);
            clearInterval(timeCount);
          }
        }, 10);
      }
    }
  }, [isRunning])

  const calcCPS = (time: number) =>{
    return (Math.round((clickCount.current/time) * 100) / 100);
  }

  const scoreFinalize = () => {
    if (measureMode === "Timed"){
      const calcedCPS = calcCPS(timeGiven);
      setCps(calcedCPS);
      console.log(`Your score: ${scoreRef.current} Your cps: ${calcedCPS}`);
      // Add to personal leaderboard (MUCH LATER)
    } else if (measureMode === "Clicks"){
      const calcedCPS = calcCPS(measureRemainingRef2.current);
      setCps(calcedCPS);
      console.log(`Your score: ${scoreRef.current} Your cps: ${calcedCPS}`);
    }
    isRunningSwitch(false);
  };

  const isRunningSwitch = (isRunningParam: boolean) => {
    setIsRunning(isRunningParam);
    setScore(0);
    clickCount.current = 0;
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
          if (measureMode === "Timed"){
            clickCount.current++;
            setScore(score + 1);
          } else if(measureMode === "Clicks"){
            if (measureRemaining > 0) {
              clickCount.current++;
              setScore(score + 1);
              setMeasureRemaining(measureRemaining - 1);
            }
          }
          break;
        }
        default: {
          setScore(score + 1); //Adding more cases (Later)
        }
      }
    }
  };

  return (
    <>
      <Heading measureSwitch={measureSwitch}/>
      <Controls visible={true} score={score} modeSwitch={modeSwitch} measureType={measureMode} 
      measureRemaining={measureRemaining} measureRemaining2={measureRemaining2}
      cps={cps} isRunning={isRunning}/>
      <ClickBox visible={true} clicked={boxClicked}/>
    </>
  );
}

export default App
