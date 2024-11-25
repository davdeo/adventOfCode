import {Input, readFile, writeFile} from "../utils";
import {keys} from "lodash";

export function runlevel5() {
    console.log();
    console.log("Run level5");

    const exampleInput = readFile('2023/input/level5/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    // const input = readFile('2023/input/level5/real.in');
    // const result = calculateResult1(input);
    // writeFile('2023/output/level5.out', `${result}`)
}

interface Map {
    sourceIndex: number;
    targetIndex: number;
    range: number;
}

function getTarget(n: number, maps: Map[]): number {
    for (const map of maps) {
        const {targetIndex, sourceIndex, range} = map;
        if (n >= sourceIndex && n < sourceIndex + range) {
            return n + targetIndex - sourceIndex;
        }
    }

    return n;
}

function calculateResult1(input: Input) {
    const {lines} = input;
    let res = 0;

    const maps: Map[] = [];
    console.log(1, getTarget(1, maps))

    return res;
}


function calculateResult2(input: Input) {
    const {lines} = input;
    let res = 0;

    return res;
}

