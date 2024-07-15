import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

type measureMode = "Timed" | "Clicks";
type mode = "Speed" | "Tracking" | "Flicking"

interface ResultProps{
  visible: boolean;
  closeResult: () => void;
  results: {
    measureMode: measureMode,
    mode: mode,
    score: number,
    cps: number,
    resultText: string
  };
}

const Result = ({visible, closeResult, results}: ResultProps) => {

  const resultRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (resultRef.current && !resultRef.current.contains(event.target as Node)) {
      closeResult();
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);
  
  if (!visible) return null;
  return (
    <>
      <div className="click-catcher" onClick={(e) => handleClickOutside(e as unknown as MouseEvent)} />
      <div className="result-container" ref={resultRef}>
        <h1>{results.resultText}</h1>
        <p>Mode: {results.measureMode} - {results.mode}</p>
        <p>CPS: {results.cps}</p>
        <p>Score: {results.score}</p>
        <FontAwesomeIcon className="restart-button" icon={faRotateRight} onClick={closeResult} />
      </div>
    </>
  )
}

export default Result
