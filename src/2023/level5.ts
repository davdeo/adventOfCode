import {Input, readFile, writeFile} from "../utils";
import {isEmpty, keys} from "lodash";

export function runlevel5() {
    console.log();
    console.log("Run level5");

    const exampleInput = readFile('2023/input/level5/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level5/real.in');
    const result = calculateResult1(input);
    writeFile('2023/output/level5.out', `${result}`)
}

interface Map {
    sourceIndex: number;
    targetIndex: number;
    range: number;
}

interface GroupOfMaps {
    maps: Map[];
}

function getSingleTarget(n: number, maps: Map[]): number {
    for (const map of maps) {
        const {targetIndex, sourceIndex, range} = map;
        if (n >= sourceIndex && n < sourceIndex + range) {
            return n + targetIndex - sourceIndex;
        }
    }

    return n;
}

function getTarget(n: number, allMaps: GroupOfMaps[]): number {
    let currentResult = n;
    allMaps.forEach(groupOfMaps => {
        currentResult = getSingleTarget(currentResult, groupOfMaps.maps)
    })

    return currentResult;
}

function calculateResult1(input: Input) {
    let {lines} = input;
    let res = Number.MAX_SAFE_INTEGER;

    const allMaps: GroupOfMaps[] = [];
    allMaps.push({maps: []})

    let index = 0;

    lines.reverse().forEach((line) => {
        if (isEmpty(line)) {
            return;
        }

        if (line.match(/seeds:/)) {
            return;
        }

        if (line.match(/:/)) {
            index ++;
            allMaps.push({maps: []});
            return;
        }

        const map = line.split(" ").map(v => parseInt(v.trim()));
        allMaps[index].maps.push({
            targetIndex: map[0],
            sourceIndex: map[1],
            range: map[2]
        })

    })

    allMaps.pop();
    allMaps.reverse();

    const seedsLine = lines[lines.length - 1].split(" ");
    seedsLine.shift();
    const seedsLineNum = seedsLine.map(v => parseInt(v.trim()));
    for(let i = 0; i < seedsLineNum.length; i = i+2) {
        const seed = seedsLineNum[i];
        const numberOfSeeds = seedsLineNum[i+1];
        console.log(seed);
        console.log(numberOfSeeds);
        for (let j = 0; j < numberOfSeeds; j++) {
            const location = getTarget(seed + j, allMaps);
            if (location < res) {
                res = location;
            }
        }
    }

    return res;
}


function calculateResult2(input: Input) {
    const {lines} = input;
    let res = 0;

    return res;
}

