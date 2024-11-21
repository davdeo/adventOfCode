import _, {isNil} from "lodash";
import {Input, readFile, writeFile} from "../utils";

export function runlevel3() {
    console.log();
    console.log("Run level3");

    const exampleInput = readFile('2023/input/level3/example.in');
    const exampleResult = calculateResult2(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level3/level3.in');
    const result = calculateResult2(input);
    writeFile('2023/output/level3.out', `${result}`)
}

interface PartCoordinates {
    x: number;
    y: number;
}

function calculateResult1(input: Input) {
    const {lines} = input;
    const partCoordinates: PartCoordinates[] = [];
    const schematic: string[][] = [];

    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];

        // Find parts
        const matches = line.matchAll(/[^a-zA-Z0-9\s\.]/g);
        for (const m of matches) {
            const x = m.index;
            partCoordinates.push({y, x})
        }

        // Build schematic
        const schematicLine = line.split("");
        schematic.push(schematicLine);
    }

    const partNumbers = [];

    for (const part of partCoordinates) {
        partNumbers.push(...findAttatchedNumbers(schematic, part));
    }

    const res = partNumbers.reduce((prev, curr) => {
        return prev + curr;
    }, 0)

    return res;
}

function findAttatchedNumbers(schematic: string[][], position: PartCoordinates) {
    const partNumbers = [];

    for(let y = position.y - 1; y <= position.y + 1; y++) {
        for (let x = position.x - 1; x <= position.x + 1; x ++) {
            if (_.isEqual(position, {y: y, x: x})
            || y < 0 || y >= schematic.length
            || x < 0 || x >= schematic[0]?.length || 0
        ) {
                continue;
            }

            const match = schematic[y][x].match(/\d/);
            if (!isNil(match)) {
                const numArr = [schematic[y][x]];
                let xLeft = x - 1;
                let xRight = x + 1;

                while(xLeft >= 0 && schematic[y][xLeft].match(/\d/)) {
                    numArr.unshift(schematic[y][xLeft]);
                    schematic[y][xLeft] = "X";
                    xLeft--;
                }
                while(xRight < schematic[0].length && schematic[y][xRight].match(/\d/)) {
                    numArr.push(schematic[y][xRight]);
                    schematic[y][xRight] = "X";
                    xRight++;
                }

                const partNumber = parseInt(numArr.reduce((prev, curr) => {
                    return prev + curr;
                }, ""))
                partNumbers.push(partNumber);
            }
        }
    }

    return partNumbers;
}

function calculateResult2(input: Input) {
    const {lines} = input;
    const partCoordinates: PartCoordinates[] = [];
    const schematic: string[][] = [];

    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];

        // Find parts
        const matches = line.matchAll(/\*/g);
        for (const m of matches) {
            const x = m.index;
            partCoordinates.push({y, x})
        }

        // Build schematic
        const schematicLine = line.split("");
        schematic.push(schematicLine);
    }

    const partNumbers = [];

    for (const part of partCoordinates) {
        const partNumbersLocal = findAttatchedNumbers(schematic, part);
        if (partNumbersLocal.length === 2) {
            partNumbers.push(partNumbersLocal[0] * partNumbersLocal[1]);
        }
    }

    const res = partNumbers.reduce((prev, curr) => {
        return prev + curr;
    }, 0)

    return res;
}

