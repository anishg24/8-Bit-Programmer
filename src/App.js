// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import OffcanvasReference from "./components/Main/OffcanvasReference";
import OutputTable from "./components/Main/OutputTable";
import {Card} from "react-bootstrap";
import InstructionInput from "./components/Main/InstructionInput";

function App() {
    const [addressBits, setAddressBits] = useState(Array(4).fill(0));
    const [dataBits, setDataBits] = useState(Array(8).fill(0));
  return (
    <div className="App">
      <header className="App-header">
          <Card body style={{width: "95vw"}}>
              {/*<OffcanvasReference/>*/}
              {/*<InstructionStack/>*/}
              <OutputTable
                  addressBits={addressBits}
                  dataBits={dataBits}
                  setAddressBits={setAddressBits}
                  setDataBits={setDataBits}
              />
              <InstructionInput
                  setAddressBits={setAddressBits}
                  setDataBits={setDataBits}
              />
          </Card>
      </header>
    </div>
  );
}

export default App;