import React, {useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";
import InstructionTable from "./InstructionTable";
import {BsInfoSquare} from "react-icons/bs";

const OffcanvasReference = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <BsInfoSquare/>
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Op Code Reference</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <InstructionTable/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffcanvasReference;