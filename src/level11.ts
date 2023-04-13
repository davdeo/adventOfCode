import _ from "lodash";
import { addHex, divideHex, multiplyHex, readFile, moduloHex } from "./utils";
import { writeFile } from "./utils";

class Monkey {
    public items: string[];
    private inspections: number = 0;
    private operation: (old: string) => string;
    // private specialOperation: (old: number) => number = (old: number) => { return Math.floor(old / 3) }
    private test: (item: string) => number;

    constructor(items: number[], operation: (old: string) => string, test: (item: string) => number) {
        this.items = items.map((itemNum) => `${itemNum.toString(16)}`);
        this.operation = operation;
        this.test = test;
    }

    get numberOfInspections() {
        return this.inspections;
    }

    hasItems() {
        return this.items.length > 0;
    }

    giveItem(item: string) {
        this.items.push(item);
    }

    takeItem(): { item: string, target: number } {
        let item = this.items.shift();

        if (item === undefined) {
            throw new Error("items is empty, cannot take item");
        }

        this.inspections++;
        item = this.operation(item);

        // item = this.specialOperation(item);
        const target = this.test(item);

        return { item, target }
    }
}

class Game {
    private monkeys: Monkey[];
    private playedRounds = 0;

    constructor(monkeys: Monkey[]) {
        this.monkeys = monkeys;
    }

    private playRound() {
        this.monkeys.forEach((monkey) => {
            while (monkey.hasItems()) {
                const { item, target } = monkey.takeItem();
                this.monkeys[target].giveItem(item);
            }
        })

        this.playedRounds++;
    }

    play(numberOfRounds: number) {
        for (let i = 0; i < numberOfRounds; i++) {
            this.playRound();
            console.log('round ' + i + " over");
        }
    }

    getMonkeyBuisness(): number {
        const monkeyInspections = this.monkeys.map((monkey) => monkey.numberOfInspections);

        console.log(monkeyInspections);

        monkeyInspections.sort((a: number, b: number) => b - a);

        console.log(monkeyInspections);

        return monkeyInspections[0] * monkeyInspections[1];
    }
}

function getOperation(input: string): (old: string) => string {
    const parts = input.split(' ');
    let operation: (old: string) => string = (old) => old;

    if (parts[3] === '*') {
        operation = (old) => multiplyHex(old, (parts[4] === 'old' ? old : parseInt(parts[4]).toString(16)))
    } else if (parts[3] === '+') {
        operation = (old) => addHex(old, (parts[4] === 'old' ? old : parseInt(parts[4]).toString(16)))
    }

    return operation;
}

function createMonkeyFromLines(monkeyLines: string[]): Monkey {
    const items = monkeyLines[0].split(', ').map((item) => parseInt(item));

    const operation = getOperation(monkeyLines[1]);

    const testDivisor = parseInt(monkeyLines[2].substring(13));
    const trueTarget = parseInt(monkeyLines[3].substring(15));
    const falseTarget = parseInt(monkeyLines[4].substring(15));

    const test = (item: string) => parseInt(moduloHex(item, testDivisor.toString(16)), 16) === 0 ? trueTarget : falseTarget;

    return new Monkey(items, operation, test);
}

function createMonkeys(input: string[]): Monkey[] {
    let monkeyLines: string[] = [];
    const monkeys: Monkey[] = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            monkeys.push(createMonkeyFromLines(monkeyLines));
            continue;
        }

        if (input[i].startsWith("Monkey")) {
            monkeyLines = [];
        } else {
            monkeyLines.push(input[i].trim().split(': ')[1]);
        }
    }


    return monkeys;
}

export function run11() {
    // const input = readFile('input/level11/level11.in');
    const input = readFile('input/level11/example.in');

    const monkeys = createMonkeys(input);
    const game = new Game(monkeys);
    game.play(10000);

    return game.getMonkeyBuisness();
}
