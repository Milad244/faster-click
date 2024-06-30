
interface clickBoxProps{
    visible: boolean;
    clicked: () => void;
}

const ClickBox = ({visible, clicked}: clickBoxProps) => {
    if (!visible) return null;

    return (
        <div className="click-box" onClick={clicked}>Click Here To Start</div>
    )
};

export default ClickBox
