import {Input, readFile, writeFile} from "../utils";

export function runlevel2() {
    console.log();
    console.log("Run level2");

    const exampleInput = readFile('2023/input/level2/example.in');
    const exampleResult = calculateResult(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level2/level2.in');
    const result = calculateResult(input);
    writeFile('2023/output/level2.out', `${result}`)
}

function calculateResult(input: Input) {
    const {lines} = input;
    const res = 0;

    return res;
}

