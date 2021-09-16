import React, {useState, useEffect} from "react";
import {BsLockFill, BsUnlockFill} from "react-icons/bs";
import {IconContext} from "react-icons";
import Switch from "./Switch";
import './DIPSwitch.css';

const DIPSwitch = ({numSwitches, locked = false, defaultValues, color="red", handler}) => {
    const [values, setValues] = useState(Array(numSwitches).fill(0));
    const [disabled, setDisabled] = useState(locked);

    useEffect(() => {
        if (defaultValues !== undefined) {
            setValues(defaultValues);
        }
    }, [defaultValues]);

    const setValue = (id, value) => {
        let temp = [...values];
        temp[id] = +value;
        setValues(temp);
        handler(temp);
    }

    return (
        <div>
            <table className={"dip-housing"} style={{backgroundColor: color}}>
                <tbody>
                <tr>
                    <td className={"dip-label"}>ON</td>
                    <td colSpan={numSwitches - 2}/>
                    <td>
                        <IconContext.Provider value={{color:"white", size:"0.5em"}}>
                            <div onClick={() => setDisabled(!disabled)} style={{cursor: "pointer"}}>
                                {disabled ? <BsLockFill/> : <BsUnlockFill/>}
                            </div>
                        </IconContext.Provider>
                    </td>
                </tr>
                <tr>
                    {[...Array(numSwitches).keys()].map(i => <td key={i} className={"dip-switch"}>
                        <Switch
                            id={i}
                            disabled={disabled}
                            checked={values[i]}
                            onCheckHandler={setValue}
                        />
                    </td>)}
                </tr>
                <tr>
                    {[...Array(numSwitches).keys()].map(i => <td key={i} className={"dip-number-label"}>{i + 1}</td>)}
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DIPSwitch;