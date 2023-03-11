import _ from "lodash";
import { readFile } from "./utils";

export function run41() {
    // const input = readFile('input/level4/level4.in');
    const input = readFile('input/level4/example.in');


    let fullyContained = 0;

    input.forEach((pair) => {
        const sections = pair.split(',').map((section) => {
            const limits = section.split('-');
            return ({ lowerLimit: parseInt(limits[0]), upperLimit: parseInt(limits[1]) });
        })

        if (
            (sections[0].lowerLimit >= sections[1].lowerLimit
                && sections[0].upperLimit <= sections[1].upperLimit)
            || (sections[1].lowerLimit >= sections[0].lowerLimit
                && sections[1].upperLimit <= sections[0].upperLimit)) {
            fullyContained++;
        }
    })

    return fullyContained;
}


export function run4() {
    const input = readFile('input/level4/level4.in');
    // const input = readFile('input/level4/example.in');


    let fullyContained = 0;

    input.forEach((pair) => {
        const sections = pair.split(',').map((section) => {
            const limits = section.split('-');
            return ({ lowerLimit: parseInt(limits[0]), upperLimit: parseInt(limits[1]) });
        })

        if (
            (sections[1].lowerLimit >= sections[0].lowerLimit
                && sections[1].lowerLimit <= sections[0].upperLimit)
            || (sections[0].lowerLimit <= sections[1].upperLimit
                && sections[0].lowerLimit >= sections[1].lowerLimit)) {
            fullyContained++;
        }
    })

    return fullyContained;
}