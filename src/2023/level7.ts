import {Input, readFile, writeFile} from "../utils";
import {isEmpty, keys, max} from "lodash";

export function runlevel7() {
    console.log();
    console.log("Run level7");

    const exampleInput = readFile('2023/input/level7/example.in');
    const exampleResult = calculateResult2(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level7/real.in');
    const result = calculateResult2(input);
    writeFile('2023/output/level7.out', `${result}`)
}

function calculateResult1(input: Input) {
    let {lines} = input;
    let res = 0;

    return res;
}


function calculateResult2(input: Input) {
    let {lines} = input;
    let res = 0;

    return res;
}

