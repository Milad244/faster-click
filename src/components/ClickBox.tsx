import React, { useState } from 'react';

interface clickBoxProps{
    visible: boolean;
    clicked: () => void;
}

const ClickBox = ({visible, clicked}: clickBoxProps) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const [rippleId, setRippleId] = useState(0);

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 50;
        const y = e.clientY - rect.top - 50;
        setRipples((prev) => [...prev, { x, y, id: rippleId }]);
        setRippleId((prev) => prev + 1);
        clicked();
    };

    if (!visible) return null;

    return (
        <div className="click-box" onClick={handleClick}>Click Here To Start
        {ripples.map((ripple) => (
            <span key={ripple.id} className="ripple" style={{ left: ripple.x, top: ripple.y }} />
        ))}
        </div>
    )
};

export default ClickBox
