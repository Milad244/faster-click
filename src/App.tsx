import ClickBox from "./components/ClickBox"
import Heading from "./components/Heading";

function App() {

    const boxClicked = () => {
      
    }

    return (
      <>
        <Heading />
       <ClickBox visible={true} clicked={boxClicked}/>
      </>
    );
}

export default App
