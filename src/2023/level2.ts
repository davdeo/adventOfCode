import { forIn } from "lodash";
import {Input, readFile, writeFile} from "../utils";

export function runlevel2() {
    console.log();
    console.log("Run level2");

    const exampleInput = readFile('2023/input/level2/example.in');
    const exampleResult = calculateResult2(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level2/level2.in');
    const result = calculateResult2(input);
    writeFile('2023/output/level2.out', `${result}`)
}

function calculateResult(input: Input) {
    const {lines} = input;
    let res = 0;

    const greenMaxCount = 13;
    const blueMaxCount = 14;
    const redMaxCount = 12; 

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        console.log();
        console.log(line);
        let isPossible = true;

        for (const m of line.matchAll(/\d+ blue/g)) {
            const num = parseInt(m[0].split(" ")[0])
            
            if (num > blueMaxCount) {
                isPossible = false;
            }
        }

        for (const m of line.matchAll(/\d+ red/g)) {
            const num = parseInt(m[0].split(" ")[0])
             
            if (num > redMaxCount) {
                isPossible = false;
            }
        }

        for (const m of line.matchAll(/\d+ green/g)) {
            const num = parseInt(m[0].split(" ")[0])
            
            if (num > greenMaxCount) {
                isPossible = false;
            }
        }

        console.log(isPossible)
        if (isPossible) {
            res += i + 1;
        }
    }

    return res;
}


function calculateResult2(input: Input) {
    const {lines} = input;
    let res = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let minGreen = 0;
        let minRed = 0;
        let minBlue = 0;

        for (const m of line.matchAll(/\d+ blue/g)) {
            const num = parseInt(m[0].split(" ")[0])
            
            if (num > minBlue) {
                minBlue = num;
            }
        }
        
        for (const m of line.matchAll(/\d+ red/g)) {
            const num = parseInt(m[0].split(" ")[0])
            
            if (num > minRed) {
                minRed = num;
            }
        }
        
        for (const m of line.matchAll(/\d+ green/g)) {
            const num = parseInt(m[0].split(" ")[0])
            
            if (num > minGreen) {
                minGreen = num;
            }
        }
        
        const power = minGreen * minBlue * minRed;
        res += power;
    }

    return res;
}

