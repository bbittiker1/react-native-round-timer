import React, { useState, useRef } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);
    const ref = useRef(count);

    // Keeps the state and ref equal
    function updateState(newState) {
        ref.current = newState;
        setCount(newState);
    }

    function handleAlertClick() {
        setTimeout(() => {
            alert("You clicked on: " + ref.current);
        }, 3000);
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => updateState(count + 1) }>
                Click me
            </button>
            <button onClick={() => handleAlertClick() }>
                Show alert
            </button>
        </div>
    );
};
