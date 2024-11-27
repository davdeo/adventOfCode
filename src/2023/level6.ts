import {Input, readFile, writeFile} from "../utils";
import {isEmpty, keys, max} from "lodash";

export function runlevel6() {
    console.log();
    console.log("Run level6");

    const exampleInput = readFile('2023/input/level6/example.in');
    const exampleResult = calculateResult2(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level6/real.in');
    const result = calculateResult2(input);
    writeFile('2023/output/level6.out', `${result}`)
}

interface RaceRecord {
    chargeTime: number;
    distance: number;
}

function getLineValues(line: string): number[] {
    const str = line.split(" ").filter(s => !isEmpty(s));
    str.shift();
    const n = str.map(s => parseInt(s.trim()));
    return n;
}

function getLineValue(line: string): number {
    const str = line.split(" ").filter(s => !isEmpty(s));
    str.shift();
    const n = parseInt(str.reduce((a, b) => a + b, "").trim());
    return n;
}

function calculatePossibilities(raceRecords: RaceRecord[]) {

    const possibilities: number[] = []

    raceRecords.forEach((raceRecord) => {
        let minDistance = 0;
        let maxDistance = Number.MAX_SAFE_INTEGER;
        let minChargeTime = 0;
        while(minDistance <= raceRecord.distance) {
            const remainingTime = raceRecord.chargeTime - minChargeTime;

            minDistance = remainingTime * minChargeTime;
            minChargeTime ++;
        }

        let maxChargeTime = minChargeTime;

        while(maxDistance > raceRecord.distance) {
            const remainingTime = raceRecord.chargeTime - maxChargeTime;

            maxDistance = remainingTime * maxChargeTime;
            maxChargeTime ++;
        }

        possibilities.push(maxChargeTime - minChargeTime);
    })

    return possibilities.reduce((acc, curr) => acc * curr, 1);
}

function calculateResult1(input: Input) {
    let {lines} = input;
    let res = 0;

    const chargeTimes = getLineValues(lines[0])
    const distances = getLineValues(lines[1])
    const raceRecords: RaceRecord[] = [];
    for (let i = 0; i < chargeTimes.length; i++) {
        raceRecords.push({
            chargeTime: chargeTimes[i],
            distance: distances[i],
        })
    }

    return calculatePossibilities(raceRecords);
}


function calculateResult2(input: Input) {
    let {lines} = input;
    let res = 0;

    const chargeTime = getLineValue(lines[0])
    const distance = getLineValue(lines[1])
    const raceRecords: RaceRecord[] = [];
        raceRecords.push({
            chargeTime: chargeTime,
            distance: distance,
        })

    return calculatePossibilities(raceRecords);
}

