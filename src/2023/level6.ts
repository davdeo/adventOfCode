import {Input, readFile, writeFile} from "../utils";
import {isEmpty, keys} from "lodash";

export function runlevel6() {
    console.log();
    console.log("Run level6");

    const exampleInput = readFile('2023/input/level6/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    // const input = readFile('2023/input/level6/real.in');
    // const result = calculateResult1(input);
    // writeFile('2023/output/level6.out', `${result}`)
}

function calculateResult1(input: Input) {
    let {lines} = input;
    let res = Number.MAX_SAFE_INTEGER;

    return res;
}


function calculateResult2(input: Input) {
    const {lines} = input;
    let res = 0;

    return res;
}

