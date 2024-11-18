import _ from "lodash";
import { readFile } from "../utils";

export function run6() {
    const input = readFile('input/level6/level6.in');
    // const input = readFile('input/level6/example.in');

    const markerLength = 14;

    input.forEach((line) => {
        let result = 0;
        line.split('').some((x, index) => {
            if (
                _.union(...line
                    .slice(index, index + markerLength)
                    .split('')
                    .map((character) => [character])).length >= markerLength) {
                result = index + markerLength;
                return true;
            }
        })
        console.log(result);
    })


    return 0;
}
