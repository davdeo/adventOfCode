import {Input, readFile, writeFile} from "../utils";
import {isEmpty} from "lodash";

export function runlevel4() {
    console.log();
    console.log("Run level4");

    const exampleInput = readFile('2023/input/level4/example.in');
    const exampleResult = calculateResult2(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level4/level4.in');
    const result = calculateResult2(input);
    writeFile('2023/output/level4.out', `${result}`)
}

function calculateResult1(input: Input) {
    const {lines} = input;
    let res = 0;

    for(const line of lines) {
        const numbers = line.split(':')[1];
        const [winningNumbers, myNumbers] = numbers.split('|').map(n => n.split(" ").filter(f => !isEmpty(f)));
        let matches = 0;
        myNumbers.forEach((x) => {
            if (winningNumbers.includes(x)) {
                matches++;
            }
        })
        if (matches === 0) {
            continue;
        }

        const points = Math.pow(2, matches - 1);
        res += points;
    }

    return res;
}


function calculateResult2(input: Input) {
    const {lines} = input;
    const instances = lines.map(l => 1);
    let res = 0;

    for(let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const numbers = line.split(':')[1];
        const [winningNumbers, myNumbers] = numbers.split('|').map(n => n.split(" ").filter(f => !isEmpty(f)));
        let matches = 0;
        myNumbers.forEach((x) => {
            if (winningNumbers.includes(x)) {
                matches++;
            }
        })
        const inst = instances[i];
        while (matches > 0) {
            instances[i + matches] += inst;
            matches --;
        }
    }

    res = instances.reduce((acc, x) => acc + x, 0);
    return res;
}

