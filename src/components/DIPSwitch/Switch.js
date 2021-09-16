import React from "react";
import './Switch.css';

const Switch = ({id, checked, disabled, onCheckHandler}) => {

    return (
        <div>
            <label className={"switch"}>
                <input type={"checkbox"} disabled={disabled} checked={checked}
                       onChange={(e) => onCheckHandler(id, e.target.checked)}/>
                <span className={`slider  ${disabled ? "slider-disabled" : ""}`}/>
            </label>
        </div>
    )
}

export default Switch;