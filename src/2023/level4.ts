import {Input, readFile, writeFile} from "../utils";

export function runlevel4() {
    console.log();
    console.log("Run level4");

    const exampleInput = readFile('2023/input/level4/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    // const input = readFile('2023/input/level4/level4.in');
    // const result = calculateResult1(input);
    // writeFile('2023/output/level4.out', `${result}`)
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

