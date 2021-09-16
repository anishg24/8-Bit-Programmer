import React from "react";
import {Table} from "react-bootstrap";
import {numToBinary, INSTRUCTIONS} from './Helper';
import './Main.css';


const InstructionTable = () => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Instruction Name</th>
                <th>Machine Code</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
                {INSTRUCTIONS.map((e, i) => (
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{e.name}</td>
                        <td className={"binary-text"}>{numToBinary(i, true)}</td>
                        <td>{e.desc}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default InstructionTable;