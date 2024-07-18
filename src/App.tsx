import ClickBox from "./components/ClickBox"
import Heading from "./components/Heading";
import Controls from "./components/Controls";
import Result from "./components/Result";
import { useState, useEffect, useRef} from "react";

export type measureMode = "Timed" | "Clicks";
export type mode = "Speed" | "Tracking" | "Flicking";
export type siteType = "TimedSite" | "ClickSite" | "LeaderboardSite" | "SettingsSite" | "AboutSite";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [measureMode, setMeasureMode] = useState<measureMode>("Timed");
  const [mode, setMode] = useState<mode>("Speed");
  const [siteType, setSiteType] = useState<siteType>("TimedSite");
  const [score, setScore] = useState(0);
  const [measureRemaining, setMeasureRemaining] = useState(0);
  const measureRemainingRef = useRef(measureRemaining);
  const [measureRemaining2, setMeasureRemaining2] = useState(0);
  const measureRemainingRef2 = useRef(measureRemaining2);
  const timeGiven = 10;
  const clicksGiven = 50;
  const clickCount = useRef(0);
  const scoreRef = useRef(score);
  const [cps, setCps] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);
  const [results, setResults] = useState({
    measureMode: "" as measureMode,
    mode: "" as mode,
    score: 0 as number,
    cps: 0 as number,
    resultText: "" as string
  });

  useEffect(() => {
    setDefaultValues();
  }, [measureMode])

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

  const getResultText = (measureMode: measureMode, mode: mode, score: number): string => {
    if (measureMode === "Timed") {
        // Timed
      if (mode === "Speed") {
        // Timed - Speed
        if (score >= 100) {
          return "YOU'RE THE GOAT!!!";
        }
        if (score >= 50) {
          return "WOW THAT SPEED!";
        }
        if (score >= 25) {
          return "Good Job!";
        }
        if (score >= 10) {
          return "Nice!";
        }
        return "Meh, you can do better!";

      } else if (mode === "Tracking") {
        // Timed - Tracking
        
      } else if (mode === "Flicking") {
        // Timed - Flicking
      }
    } else if (measureMode === "Clicks") {
        // Clicks
      if (mode === "Speed") {
        // Clicks - Speed
        if (score >= 100) {
          return "YOU'RE THE GOAT!!!";
        }
        if (score >= 50) {
          return "WOW THAT SPEED!";
        }
        if (score >= 25) {
          return "Good Job!";
        }
        if (score >= 10) {
          return "Nice!";
        }
        return "Meh, you can do better!";

      } else if (mode === "Tracking") {
        // Clicks - Tracking
      } else if (mode === "Flicking") {
        // Clicks - Flicking
      }
    }
  
    // Default return if no conditions are met (should not happen in a complete implementation)
    return "";
  };

  const closeResult = () => {
    setResultVisible(false);
  }

  const scoreFinalize = () => {
    if (measureMode === "Timed"){
      const calcedCPS = calcCPS(timeGiven);
      setCps(calcedCPS);
      const resultText = getResultText(measureMode, mode, scoreRef.current);
      setResults({
        measureMode: measureMode,
        mode: mode,
        score: scoreRef.current,
        cps: calcedCPS,
        resultText: resultText
      });
      // Add to personal leaderboard (MUCH LATER)
    } else if (measureMode === "Clicks"){
      const calcedCPS = calcCPS(measureRemainingRef2.current);
      setCps(calcedCPS);
      const resultText = getResultText(measureMode, mode, scoreRef.current);
      setResults({
        measureMode: measureMode,
        mode: mode,
        score: scoreRef.current,
        cps: calcedCPS,
        resultText: resultText
      });
    }
    setResultVisible(true);
    setIsRunning(false);
    setDefaultValues();
  };

  const setDefaultValues = () => {
    setIsRunning(false);
    setScore(0);
    clickCount.current = 0;
    if (measureMode === "Timed"){
      setMeasureRemaining(timeGiven);
    } else if(measureMode === "Clicks"){
      setMeasureRemaining(clicksGiven);
    }
  };
  
  const measureSwitch = (measure: measureMode) => {
    setMeasureMode(measure);
  };

  const modeSwitch = (mode: mode) => {
    setMode(mode);
  };

  const siteTypeSwitch = (siteType: siteType) => {
    setSiteType(siteType);
  }

  const boxClicked = () => {
    if (!isRunning){
      setDefaultValues();
      setIsRunning(true);
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
  if (siteType === "ClickSite" || siteType === "TimedSite"){
    return (
      <>
        <Heading measureSwitch={measureSwitch} siteTypeSwitch={siteTypeSwitch}/>
        <Controls visible={true} score={score} modeSwitch={modeSwitch} measureType={measureMode} 
        measureRemaining={measureRemaining} measureRemaining2={measureRemaining2}
        cps={cps} isRunning={isRunning}/>
        <div className="clickbox-container">
          <ClickBox visible={true} clicked={boxClicked}/>
          <Result visible={resultVisible} closeResult={closeResult} results={results}></Result>
        </div>
      </>
    );
  } else if (siteType === "LeaderboardSite"){
    return (
      <>
        <Heading measureSwitch={measureSwitch} siteTypeSwitch={siteTypeSwitch}/>
      </>
    );
  } else if (siteType === "SettingsSite"){
    return (
      <>
        <Heading measureSwitch={measureSwitch} siteTypeSwitch={siteTypeSwitch}/>
      </>
    );
  } else if (siteType === "AboutSite"){
    return (
      <>
        <Heading measureSwitch={measureSwitch} siteTypeSwitch={siteTypeSwitch}/>
      </>
    );
  }
  
}

export default App
