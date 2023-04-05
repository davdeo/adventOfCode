import _ from "lodash";
import { readFile } from "./utils";
import { writeFile } from "./utils";

enum CommandType {
    ADD_X = 'addx',
    NOOP = 'noop'
}

interface Command {
    type: CommandType;
    amount: number;
}

function getCommands(input: string[]): Command[] {
    return input.map((line): Command => {
        const lineMeta = line.split(' ');

        return {
            type: lineMeta[0] as CommandType,
            amount: parseInt(lineMeta[1] ?? 0)
        }
    });
}

class Machine {
    private readonly MONITORING_INTERVAL = 40;
    private readonly FIRST_MONITORING = 20;
    private x: number = 1;
    private cycle: number = 0;
    private summedSignalStrengths = 0;

    private addX(amount: number) {
        this.x += amount;
    }

    private executeAddX(command: Command) {
        this.executeNoop();
        this.executeNoop();

        this.addX(command.amount);
    }

    private executeNoop() {
        this.cycle ++;
        this.monitor();
    }

    private executeCommand(command: Command) {
        switch(command.type) {
            case CommandType.ADD_X: {
                this.executeAddX(command);
                return;
            }
            case CommandType.NOOP: {
                this.executeNoop();
                return;
            }
        }
    }

    private monitor() {
        if (this.cycle % this.MONITORING_INTERVAL === this.FIRST_MONITORING) {
            this.summedSignalStrengths += this.cycle * this.x;
            console.log("monitor", `cycle: ${this.cycle}`, `x: ${this.x}`, `signal strenght: ${this.cycle * this.x}`);
        }
    }

    run(commands: Command[]) {
        commands.forEach((command) => {
            this.executeCommand(command);
        })

        return this.summedSignalStrengths;
    }
}

export function run10() {
    const input = readFile('input/level10/level10.in');
    // const input = readFile('input/level10/example.in');

    const commands = getCommands(input);

    const machine = new Machine();
    const summedSignalStrengths = machine.run(commands);

    return summedSignalStrengths;
}
