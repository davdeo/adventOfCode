import { readFile } from "../utils";

export function run1() {
    const input = readFile('input/level1/level1.in');

    const elfs: number[] = [0];
    let elfCount = 0;
    input.forEach((line) => {
        if (line.length === 0) {
            elfCount++;
            elfs.push(0);

            return;
        }

        const calories = parseInt(`${line}`, 10);
        elfs[elfCount] += calories;
    })

    elfs.sort((a, b) => b - a);

    const topThreeElfCalories = elfs[0] + elfs[1] + elfs[2];

    return topThreeElfCalories;
}
