import {Input, readFile, writeFile} from "../utils";

export function runlevelx() {
    console.log();
    console.log("Run levelx");

    const exampleInput = readFile('2023/input/levelx/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    // const input = readFile('2023/input/levelx/levelx.in');
    // const result = calculateResult1(input);
    // writeFile('2023/output/levelx.out', `${result}`)
}

function calculateResult1(input: Input) {
    const {lines} = input;
    let res = 0;


    return res;
}


function calculateResult2(input: Input) {
    const {lines} = input;
    let res = 0;

    return res;
}

