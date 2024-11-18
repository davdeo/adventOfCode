import _ from "lodash";
import { readFile } from "../utils";

function convertLetterToPriority(letter: string): number {
    const charCode = letter.charCodeAt(0);

    if (charCode >= 65 && charCode <= 90) {
        return charCode - 64 + 26;
    }

    if (charCode >= 97 && charCode <= 122) {
        return charCode - 96;
    }

    throw Error("Invalid letter");
}

export function run3() {
    const input = readFile('input/level3/level3.in');

    let sumOfPriorities = 0;

    for (let i = 0; i + 3 <= input.length; i += 3) {

        const elf1 = input[i].split('');
        const elf2 = input[i + 1].split('');
        const elf3 = input[i + 2].split('');

        const commonItems = _.intersection(elf1, elf2, elf3);

        const priority = convertLetterToPriority(commonItems[0]);

        sumOfPriorities += priority;
    }

    return sumOfPriorities;
}

export function run31() {
    const input = readFile('input/level3/level3.in');

    let sumOfPriorities = 0;

    input.forEach((backpack) => {
        const backpackLength = backpack.length;
        const compartment1 = backpack.slice(0, backpackLength / 2).split("");
        const compartment2 = backpack.slice(backpackLength / 2).split("");

        const commonItems = _.intersection(compartment1, compartment2);

        const priority = convertLetterToPriority(commonItems[0]);

        sumOfPriorities += priority;
    })

    return sumOfPriorities;
}
