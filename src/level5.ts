import _ from "lodash";
import { readFile } from "./utils";

interface Move {
    iterations: number, from: number, to: number
}

function generateStacks(input: string[]): string[][] {
    const stacks: string[][] = [];
    input[0].split(' ').filter((v) => v !== '').forEach((stack) => stacks.push([]));
    const stackCount = stacks.length;

    const inputStacks = input.slice(1);

    inputStacks.forEach((line) => {
        for (let stackIndex = 0; stackIndex < stackCount; stackIndex++) {
            const posInLine = stackIndex * 4 + 1;
            if (line[posInLine] !== ' ')
                stacks[stackIndex].push(line[posInLine]);
        }
    })

    return stacks;
}

function generateMoves(input: string[]): Move[] {
    return input.map((move) => {
        const moveParts = move.split(' ');

        return {
            iterations: parseInt(moveParts[1]),
            from: parseInt(moveParts[3]) - 1,
            to: parseInt(moveParts[5]) - 1
        }
    });
}

function operate(stacks: string[][], move: Move) {
    for (let i = 0; i < move.iterations; i++) {
        const tmp = stacks[move.from].pop();
        if (tmp !== undefined)
            stacks[move.to].push(tmp);
    }
}

function operate2(stacks: string[][], move: Move) {
    const tmpA: string[] = [];

    for (let i = 0; i < move.iterations; i++) {
        const tmp = stacks[move.from].pop();
        if (tmp !== undefined)
            tmpA.push(tmp);
    }

    tmpA.reverse();
    stacks[move.to].push(...tmpA);
}

function getTopElements(stacks: string[][]): string {
    let topElements = '';
    stacks.forEach((stack) => {
        topElements += stack[stack.length - 1];
    })
    return topElements;
}

export function run5() {
    const input = readFile('input/level5/level5.in');
    // const input = readFile('input/level5/example.in');

    const breakIndex = input.findIndex((line) => line === '');
    const inputStacks: string[] = input.slice(0, breakIndex).reverse();
    const stacks = generateStacks(inputStacks);
    const inputMoves = input.slice(breakIndex + 1);
    const moves = generateMoves(inputMoves);

    moves.forEach((move) => {
        operate2(stacks, move);
    })

    const topElements = getTopElements(stacks);

    return topElements;
}