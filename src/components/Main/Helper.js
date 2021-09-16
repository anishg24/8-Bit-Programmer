export const PLACEHOLDER = "????";

export const INSTRUCTIONS = [
    {name: "NOP", desc: "No Operation"},
    {name: "LDA", desc: "Load data from " + PLACEHOLDER + " to Register A"},
    {name: "ADD", desc: "Add Register A with data from " + PLACEHOLDER},
    {name: "SUB", desc: "Subtract Register A with data from " + PLACEHOLDER},
    {name: "STA", desc: "Store data in Register A to " + PLACEHOLDER},
    {name: "LDI", desc: "Load a number from 0-15 to Register A"},
    {name: "JMP", desc: "Jump to step " + PLACEHOLDER},
    {name: "JC", desc: "Jump to step " + PLACEHOLDER + " if carry flag active"},
    {name: "JZ", desc: "Jump to step " + PLACEHOLDER + " if Register A is zero"},
    {name: "NOP", desc: "No Operation"},
    {name: "NOP", desc: "No Operation"},
    {name: "NOP", desc: "No Operation"},
    {name: "NOP", desc: "No Operation"},
    {name: "NOP", desc: "No Operation"},
    {name: "OUT", desc: "Output Register A to display"},
    {name: "HLT", desc: "Halt the clock"},
]


export const numToBinary = (num, placeholder = false) => {
    const upper = num > 15 ? 9 : 4;
    let result = num.toString(2);

    while (result.length < upper) {
        if (result.length !== 4)
            result = "0" + result;
        else
            result = " " + result;
    }

    return placeholder && num <= 15 ? result + " " + PLACEHOLDER: result;
}

export const binaryToNum = (binary) => {
    return (parseInt(binary, 2))
}

export const binaryToHex = (binary) => {
    let result = parseInt(binary, 2).toString(16).toUpperCase();
    if (binary.length > 4 && result.length === 1) result = "0" + result;
    return result;
}

export const binaryFormatter = (binary) => {
    return binary.length < 4 ? binary : [binary.slice(0, 4) + " " + binary.slice(4)].join('');
}

export const is4BitNumber = (num) => Number.isInteger(num) && (0 < num < 15 && 1 <= num.length <= 2);

export const isBinaryValue = (binary) => /^[01]+$/.test(binary);