
interface clickBoxProps{
    visible: boolean;
    clicked: () => void;
}

const ClickBox = ({visible, clicked}: clickBoxProps) => {
    if (visible){
        return (
            <div className="click-box" onClick={clicked} />
        )
    }
}

export default ClickBox
