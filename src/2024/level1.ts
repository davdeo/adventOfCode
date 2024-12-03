import {Input, readFile, writeFile} from "../utils";
import _, {isEmpty, isNil, keys, max, sortBy} from "lodash";

export function runlevel1() {
    console.log();
    console.log("Run level1");

    const exampleInput = readFile('2024/input/level1/example.in');
    const exampleResult = calculateResult2(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2024/input/level1/real.in');
    const result = calculateResult2(input);
    writeFile('2024/output/level1.out', `${result}`)
}

function calculateResult1(input: Input) {
    let {lines} = input;
    let res = 0;

    let left: number[] = [];
    let right: number[] = [];

    lines.forEach((line) => {
        const [l, r] = line.match(/\d+/g) ?? ["0", "0"];
        left.push(parseInt(l));
        right.push(parseInt(r));
    })

    left = left.sort();
    right = right.sort();

    for (let i = 0; i < lines.length; i++) {
        res += Math.abs(right[i] - left[i]);
    }

    return res;
}


function calculateResult2(input: Input) {
    let {lines} = input;
    let res = 0;

    let left: number[] = [];
    let right: number[] = [];

    lines.forEach((line) => {
        const [l, r] = line.match(/\d+/g) ?? ["0", "0"];
        left.push(parseInt(l));
        right.push(parseInt(r));
    })

    left.forEach((l) => {
        const nInRight = right.filter(r => r === l).length;
        res += l * nInRight;
    })

    return res;
}

