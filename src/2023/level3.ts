import {Input, readFile, writeFile} from "../utils";

export function runlevel3() {
    console.log();
    console.log("Run level3");

    const exampleInput = readFile('2023/input/level3/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    // const input = readFile('2023/input/level3/level3.in');
    // const result = calculateResult1(input);
    // writeFile('2023/output/level3.out', `${result}`)
}

interface PartCoordinates {
    x: number;
    y: number;
}

function calculateResult1(input: Input) {
    const {lines} = input;
    let res = 0;
    const partCoordinates: PartCoordinates[] = [];
    const schematic: string[][] = [];
    
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        
        console.log(line);
        
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

    for (const part of partCoordinates) {
        console.log(part, schematic[part.y][part.y])
    }

    return res;
}

function findAdjacentNumber(schematic: string[][], currentPos: PartCoordinates, numberPositions: PartCoordinates[]) {}

function calculateResult2(input: Input) {
    const {lines} = input;
    let res = 0;

    return res;
}

