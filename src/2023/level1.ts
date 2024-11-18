import {Input, readFile, writeFile} from "../utils";
import {forEach, isNil} from "lodash";

export function runlevel1() {
    console.log();
    console.log("Run level1");

    const exampleInput = readFile('2023/input/level1/example.in');
    const exampleResult = calculateResult(exampleInput);
    console.log(exampleResult);

    const input = readFile('2023/input/level1/level1.in');
    const result = calculateResult(input);
    writeFile('2023/output/level1/level1.out', `${result}`)
}

function calculateResult(input: Input) {
    const {lines} = input;

    let sum = 0;
    for (const line of lines) {
        const matchFirst = line.match(/\d/);
        const matchLast = line.match(/\d(?!.*\d)/);
        if (isNil(matchFirst) || isNil(matchLast)) {
            continue;
        }

        const firstNumber = matchFirst[0];
        const lastNumber = matchLast[matchLast.length - 1];

        const res = parseInt(`${firstNumber}${lastNumber}`);
        sum += res;
    }

    return sum;
}
