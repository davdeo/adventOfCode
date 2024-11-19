import {Input, readFile, writeFile} from "../utils";

export function runlevel3() {
    console.log();
    console.log("Run level3");

    const exampleInput = readFile('2023/input/level3/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    // const input = readFile('2023/input/level3/level3.in');
    // const result = calculateResult1(input);
    // writeFile('2023/output/level3.out', `${result}`)
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

