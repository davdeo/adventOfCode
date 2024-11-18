import {Input, readFile, writeFile} from "../utils";
import {forEach, isNil} from "lodash";

export function runlevel1() {
    console.log();
    console.log("Run level1");

    const exampleInput = readFile('2023/input/level1/example.in');
    const exampleResult = calculateResult(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level1/level1.in');
    const result = calculateResult(input);
    writeFile('2023/output/level1.out', `${result}`)
}


const NUMS = [
    {s: 'zero', n: 0},
    {s: 'one', n: 1},
    {s: 'two', n: 2},
    {s: 'three', n: 3},
    {s: 'four', n: 4},
    {s: 'five', n: 5},
    {s: 'six', n: 6},
    {s: 'seven', n: 7},
    {s: 'eight', n: 8},
    {s: 'nine', n: 9},
]

function calculateResult(input: Input) {
    const {lines} = input;

    let sum = 0;
    for (const line of lines) {
        let smallest = {index: line.length - 1, num: 0};
        let largest = {index: 0, num: 0};

        NUMS.forEach((num) => {
            const {s, n } = num;
            const firstIndex = line.indexOf(s);
            const lastIndex = line.lastIndexOf(s);

            if (firstIndex !== -1 && firstIndex <= smallest.index) {
                smallest = {index: firstIndex, num: n};
            }

            if (lastIndex !== -1 && lastIndex >= largest.index) {
                largest = {index: lastIndex, num: n};
            }
        })

        const matchFirst = line.match(/\d/);
        const matchLast = line.match(/\d(?!.*\d)/);
        const firstNumber = matchFirst?.index;
        const lastNumber = matchLast?.index;

        if (!isNil(matchFirst) && !isNil(firstNumber) && firstNumber <= smallest.index) {
            smallest = {index: firstNumber, num: parseInt(matchFirst[0])};
        }

        if (!isNil(matchLast) && !isNil(lastNumber) && lastNumber >= largest.index) {
            largest = {index: lastNumber, num: parseInt(matchLast[0])};
        }

        const res = parseInt(`${smallest.num}${largest.num}`);
        sum += res;
    }

    return sum;
}
