import _ from "lodash";
import { readFile } from "./utils";
import { writeFile } from "./utils";

class Monkey {
    public items: number[];
    private inspections: number = 0;
    private operation: (old: number) => number;
    private specialOperation: (old: number) => number = (old: number) => { return Math.floor(old / 3) }
    private test: (item: number) => number;

    constructor(items: number[], operation: (old: number) => number, test: (item: number) => number) {
        this.items = items;
        this.operation = operation;
        this.test = test;
    }

    get numberOfInspections() {
        return this.inspections;
    }

    hasItems() {
        return this.items.length > 0;
    }

    giveItem(item: number) {
        this.items.push(item);
    }

    takeItem(): { item: number, target: number } {
        let item = this.items.shift();

        if (item === undefined) {
            return { item: -1, target: -1 };
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
        }
    }

    getMonkeyBuisness(): number {
        const monkeyInspections = this.monkeys.map((monkey) => monkey.numberOfInspections);
        monkeyInspections.sort((a: number, b: number) => b - a);

        console.log(monkeyInspections);

        return monkeyInspections[0] * monkeyInspections[1];
    }
}

function getOperation(input: string): (old: number) => number {
    const parts = input.split(' ');
    let operation: (old: number) => number = (old) => old;

    if (parts[3] === '*') {
        operation = (old) => old * (parts[4] === 'old' ? old : parseInt(parts[4]))
    } else if (parts[3] === '+') {
        operation = (old) => old + (parts[4] === 'old' ? old : parseInt(parts[4]))
    }

    return operation;
}

function createMonkeyFromLines(monkeyLines: string[]): Monkey {
    const items = monkeyLines[0].split(', ').map((item) => parseInt(item));

    const operation = getOperation(monkeyLines[1]);

    const testDivisor = parseInt(monkeyLines[2].substring(13));
    const trueTarget = parseInt(monkeyLines[3].substring(15));
    const falseTarget = parseInt(monkeyLines[4].substring(15));

    const test = (item: number) => item % testDivisor === 0 ? trueTarget : falseTarget;

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
    game.play(20);

    return game.getMonkeyBuisness();
}
