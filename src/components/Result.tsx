import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

interface ResultProps{
  visible: boolean;
  restart: () => void;
}

const Result = ({visible, restart}: ResultProps) => {
  if (!visible) return null;

  return (
    <div className="result-container">
      <h1>Nice Job!</h1>
      <p>Your score is so good that the code hasn't been made!</p>
      <FontAwesomeIcon className="restart-button" icon={faRotateRight} onClick={restart} />
    </div>
  )
}

export default Result
