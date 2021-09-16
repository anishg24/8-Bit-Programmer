import React, {useEffect, useState} from "react";
import {
    BsTrash,
    BsChevronUp,
    BsChevronDown,
    BsSquare,
    BsSquareFill,
    BsChevronDoubleUp,
    BsChevronDoubleDown,
    BsPlusCircle,
    BsBootstrapReboot,
    BsClipboard
} from "react-icons/bs";
import {HiOutlineSortAscending, HiOutlineSortDescending} from "react-icons/hi";
import {binaryFormatter, binaryToNum, INSTRUCTIONS, is4BitNumber, isBinaryValue, numToBinary} from "./Helper";
import {
    Form,
    FormControl,
    InputGroup,
    Row,
    Col,
    Card,
    Button,
    Table, ButtonGroup
} from "react-bootstrap";
import OffcanvasReference from "./OffcanvasReference";
import {useFormik} from "formik";

const validate = (values) => {
    const errors = {};
    const isNum = is4BitNumber(values.operand);
    const is4Bit = isBinaryValue(values.operand) && values.operand.length === 4;

    if (!values.operand) {
        errors.operand = "Required";
    } else if (!is4Bit){
        errors.operand = "Must be a 4-bit binary value";
    } else if (!isNum && !is4Bit) {
        errors.operand = "Must be 4-bit binary value or number between 0 and 15";
    }
    console.log(values.opCode, values.operand, isNum, is4Bit)
    return errors;

}

const InstructionInput = ({setAddressBits, setDataBits}) => {
    const [instructions, setInstructions] = useState([]);
    const [currentInstruction, setCurrentInstruction] = useState(["NOP", "0000"]);
    const [operand, setOperand] = useState("")
    const [validated, setValidated] = useState(false);
    const [step, setStep] = useState(0);

    const formik = useFormik({
        initialValues: {
            opCode: "NOP",
            operand: "0000"
        },
        validate,
        onSubmit: values => {
            updateBinaryCode();
        }
    })

    const handleOperand = (e) => {
        setOperand(e.target.value);
    }


    useEffect(() => {
        if (instructions.length > 0 || (step === 0 && instructions.length === 1)) sendBits();
        else if (instructions.length === 0) {
            setAddressBits(Array(4).fill(0))
            setDataBits(Array(8).fill(0))
        }
    }, [step, instructions])

    const updateBinaryCode = () => {
        let arr = [...currentInstruction];
        if (is4BitNumber(operand)) {
            arr[0] = arr[0] + " " + operand;
            arr[1] = arr[1] + numToBinary(+operand)
            setInstructions([...instructions, arr]);
        } else if (isBinaryValue(operand)) {
            arr[0] = arr[0] + " " + binaryToNum(operand);
            arr[1] = arr[1] + operand;
            setInstructions([...instructions, arr]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            console.log(operand)
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

    }

    const handleRestart = () => {
        setStep(0);
        setInstructions([]);
    }

    const handleRemove = (index) => {
        let temp = [...instructions]
        temp.splice(index, 1);
        setInstructions(temp);
    }

    const handleOpUp = (index) => {
        let temp = [...instructions];
        let elem = temp[index];
        temp[index] = temp[index - 1];
        temp[index - 1] = elem;
        setInstructions(temp);
    }

    const handleOpDown = (index) => {
        let temp = [...instructions];
        let elem = temp[index];
        temp[index] = temp[index + 1];
        temp[index + 1] = elem;
        setInstructions(temp);
    }

    const handleSuperOpUp = (index) => {
        let temp = [...instructions]
        let elem = temp[index]
        temp.splice(index, 1)
        setInstructions([elem, ...temp])
    }

    const handleSuperOpDown = (index) => {
        let temp = [...instructions]
        let elem = temp[index]
        temp.splice(index, 1)
        setInstructions([...temp, elem])
    }

    const handleDuplicate = (index) => {
        let temp = [...instructions]
        temp.splice(index, 0, temp[index])
        setInstructions(temp);
    }

    const handleStep = () => step === instructions.length - 1 ? setStep(0) : setStep(step => step + 1);

    const sendBits = () => {
        const address = numToBinary(step).split("").map(b => +b);
        const data = instructions[step][1].split("").map(b => +b);
        setAddressBits(address);
        setDataBits(data);
    }

    return (
        <Card body>
            <Form validated={formik.isValid} onSubmit={formik.handleSubmit} noValidate>
                <Row className={"justify-content-md-center"}>
                    <Col md={1}>
                        <Form.Select className="mb-2" size={"lg"}
                                     value={formik.values.opCode}
                                     onChange={(e) => setCurrentInstruction(e.currentTarget.value.split("-"))}>
                            {INSTRUCTIONS.map((e, i) => (
                                <option
                                    key={i}
                                    value={e.name + "-" + numToBinary(i)}>{e.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <InputGroup className="mb-2" hasValidation size={'lg'}>
                            <InputGroup.Text
                                style={{fontFamily: "Monospaced, monospace"}}>{currentInstruction[1]}</InputGroup.Text>
                            <FormControl required
                                         type={"text"}
                                         placeholder="Operand"
                                         autoComplete={"off"}
                                         onChange={handleOperand}
                            />
                            {formik.errors.operand ? <div style={{color: "blue"}}>{formik.errors.operand}</div> : null}
                            {/*<Form.Control.Feedback type={"invalid"} tooltip>Looks good!</Form.Control.Feedback>*/}
                            <ButtonGroup>
                                <Button variant={"success"} type={"submit"}><BsPlusCircle/></Button>
                                <Button variant={"info"} onClick={handleStep}>
                                    {step === instructions.length - 1 ? <HiOutlineSortAscending/> : <HiOutlineSortDescending/>}
                                </Button>
                                <OffcanvasReference/>
                                    <Button variant={"danger"} onClick={handleRestart}><BsBootstrapReboot/></Button>
                            </ButtonGroup>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className={"justify-content-md-center"} style={{height: "20vh", overflow: "scroll"}}>
                    <Col md={4}>
                        <Table bordered hover size={'sm'}>
                            <thead style={{fontSize: "0.5em"}}>
                            <tr>
                                <th>#</th>
                                <th>OP Code</th>
                                <th>Binary Code</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {instructions.map((e, i) => (
                                <tr className={`binary-text ${step === i ? "active-op" : ""}`}
                                    style={{fontSize: "0.5em"}} key={i}>
                                    <td>{i}</td>
                                    <td>{e[0]}</td>
                                    <td>{binaryFormatter(e[1])}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                {step === i ? <BsSquareFill/> :
                                                    <BsSquare onClick={() => setStep(i)} className={"op-icon"}/>}
                                            </Col>
                                            <Col>{i > 0 ? <BsChevronUp onClick={() => handleOpUp(i)}
                                                                       className={"op-icon"}/> :
                                                <BsChevronDoubleDown onClick={() => handleSuperOpDown(i)}
                                                                     className={"op-icon"}/>}
                                            </Col>
                                            <Col>
                                                {i !== instructions.length - 1 ?
                                                    <BsChevronDown onClick={() => handleOpDown(i)}
                                                                   className={"op-icon"}/> :
                                                    <BsChevronDoubleUp onClick={() => handleSuperOpUp(i)}
                                                                       className={"op-icon"}/>}
                                            </Col>
                                            <Col>
                                                <BsClipboard onClick={() => handleDuplicate(i)}
                                                             className={"op-icon"}/>
                                            </Col>
                                            <Col>
                                                <BsTrash onClick={() => handleRemove(i)}
                                                         className={"op-icon"}/>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}

export default InstructionInput;