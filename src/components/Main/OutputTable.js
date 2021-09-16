import React, {useState} from "react";
import {Table} from "react-bootstrap";
import './Main.css';
import DIPSwitch from "../DIPSwitch/DIPSwitch";
import {binaryToNum, binaryToHex, binaryFormatter} from "./Helper";

const OutputTable = ({addressBits, dataBits, setAddressBits, setDataBits}) => {

    return (
        <Table striped bordered>
            <thead>
            <tr>
                <th>Info</th>
                <th>Address</th>
                <th>Data</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className={"info-text"}>DIP Switch</td>
                <td>
                    <div className={"dip-input"}>
                        <DIPSwitch numSwitches={4} color={"blue"} defaultValues={addressBits}
                                   handler={setAddressBits}/>
                    </div>
                </td>
                <td>
                    <div className={"dip-input"}>
                        <DIPSwitch numSwitches={8} color={"red"} defaultValues={dataBits}
                                   handler={setDataBits}/>
                    </div>
                </td>
            </tr>
            <tr>
                <td className={"info-text"}>Binary</td>
                <td className={"binary-text"}>{addressBits.join("")}</td>
                <td className={"binary-text"}>{binaryFormatter(dataBits.join(""))}</td>
            </tr>
            <tr>
                <td className={"info-text"}>Decimal</td>
                <td className={"binary-text"}>{binaryToNum(addressBits.join(""))}</td>
                <td className={"binary-text"}>{binaryToNum(dataBits.join(""))}</td>
            </tr>
            <tr>
                <td className={"info-text"}>Hexadecimal</td>
                <td className={"binary-text"}>0x{binaryToHex(addressBits.join(""), false)}</td>
                <td className={"binary-text"}>0x{binaryToHex(dataBits.join(""), true)}</td>
            </tr>
            </tbody>
        </Table>
    )
}

export default OutputTable;