import _ from "lodash";
import { readFile } from "../utils";
import { writeFile } from "../utils";

enum OperationType {
    ADD_X = 'addx',
    NOOP = 'noop'
}

interface Command {
    type: OperationType;
    amount: number;
}

interface Operation {
    type: OperationType;
    amount?: number;
}

function getCommands(input: string[]): Command[] {
    return input.map((line): Command => {
        const lineMeta = line.split(' ');

        return {
            type: lineMeta[0] as OperationType,
            amount: parseInt(lineMeta[1] ?? 0)
        }
    });
}

class Machine {
    private readonly MONITORING_INTERVAL = 40;
    private readonly FIRST_MONITORING = 20;
    private readonly CRT_LINE_LENGTH = 40;
    private readonly CRT_LIGHT_PIXEL = '#';
    private readonly CRT_DARK_PIXEL = ' '
    private x: number = 1;
    private cycle: number = 0;
    private summedSignalStrengths = 0;

    private commandStack: Command[] = [];
    private operationStack: Operation[] = [];
    private crt: string[] = [];

    private addX(amount: number) {
        this.x += amount;
    }

    private executeNextOperation() {
        const nextOperation = this.operationStack.pop();

        switch (nextOperation?.type) {
            case OperationType.ADD_X: {
                this.addX(nextOperation?.amount ?? 0);
                return;
            }
            case OperationType.NOOP: {
                return;
            }
            default:
                return;
        }
    }


    private addNextCommand(command?: Command) {
        switch (command?.type) {
            case OperationType.ADD_X: {
                this.operationStack.push({ type: OperationType.ADD_X, amount: command.amount });
                this.operationStack.push({ type: OperationType.NOOP });
                return;
            }
            case OperationType.NOOP: {
                this.operationStack.push({ type: OperationType.NOOP });
                return;
            }
            default:
                return;
        }
    }

    private monitor() {
        if (this.cycle % this.MONITORING_INTERVAL === this.FIRST_MONITORING) {
            this.summedSignalStrengths += this.cycle * this.x;
            console.log("monitor", `cycle: ${this.cycle}`, `x: ${this.x}`, `signal strenght: ${this.cycle * this.x}`);
        }
    }

    private writeCrt() {
        const spriteLowerBorder = this.x - 1;
        const spriteUpperBorder = this.x + 1;
        const position = this.cycle % this.CRT_LINE_LENGTH - 1;

        if (position >= spriteLowerBorder && position <= spriteUpperBorder) {
            this.crt.push(this.CRT_LIGHT_PIXEL);
        } else {
            this.crt.push(this.CRT_DARK_PIXEL);
        }
    }

    draw() {
        this.crt.forEach((pixel, index) => {
            if (index % this.CRT_LINE_LENGTH === 0) {
                process.stdout.write('\n');
            }

            process.stdout.write(pixel);
        })

        process.stdout.write('\n');
    }

    init(commands: Command[]) {
        this.commandStack.push(...commands.reverse());
    }

    private executeCycle() {
        if (this.operationStack.length <= 0 && this.commandStack.length > 0) {
            const nextCommand = this.commandStack.pop();

            this.addNextCommand(nextCommand);
        }

        if (this.operationStack.length <= 0) {
            return;
        }

        this.cycle++;

        // this.monitor();
        this.writeCrt();

        this.executeNextOperation();
    }

    execute() {
        while (this.commandStack.length > 0 || this.operationStack.length > 0) {
            this.executeCycle();
        }

        console.log("end of operation")

        return this.summedSignalStrengths;
    }
}

export function run10() {
    const input = readFile('input/level10/level10.in');
    // const input = readFile('input/level10/example.in');

    const commands = getCommands(input);

    const machine = new Machine();
    machine.init(commands);
    machine.execute();
    machine.draw();

    return 0;
}
