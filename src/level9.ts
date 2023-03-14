import { dir } from "console";
import _, { last } from "lodash";
import { readFile } from "./utils";
import { writeFile } from "./utils/write";

const VISITED_MARKER = '#';

enum Direction {
    U = 'U',
    UR = 'UR',
    R = 'R',
    DR = 'DR',
    D = 'D',
    DL = 'DL',
    L = 'L',
    UL = 'UL',
    NONE = 'NONE'
}

interface Position {
    x: number;
    y: number;
}

class Map {
    private readonly EMPTY_FIELD = '.'
    private readonly map: string[][] = [[this.EMPTY_FIELD]];
    private origin: Position = { x: 0, y: 0 };

    private get height() {
        return this.map.length;
    }

    private get width() {
        return this.map[0].length;
    }

    private getMappedPosition(position: Position) {
        return { x: this.origin.x + position.x, y: this.origin.y - position.y };
    }

    private expandMap(direction: Direction, amount: number) {
        switch (direction) {
            case Direction.U: {
                for (let i = 0; i < amount; i++) {
                    this.map.unshift(this.EMPTY_FIELD.repeat(this.width).split(''))
                }
                this.origin.y += amount;
                break;
            }
            case Direction.R: {
                for (let i = 0; i < this.height; i++) {
                    for (let j = 0; j < amount; j++) {
                        this.map[i].push(this.EMPTY_FIELD);
                    }
                }
                break;
            }
            case Direction.D: {
                for (let i = 0; i < amount; i++) {
                    this.map.push(this.EMPTY_FIELD.repeat(this.width).split(''))
                }
                break;
            }
            case Direction.L: {
                for (let i = 0; i < this.height; i++) {
                    for (let j = 0; j < amount; j++) {
                        this.map[i].unshift(this.EMPTY_FIELD);
                    }
                }
                this.origin.x += amount;
                break;
            }
        }
    }

    private setMapPosition(position: Position, value: string) {
        let mappedPosition = this.getMappedPosition(position);
        if (mappedPosition.y >= this.height) {
            this.expandMap(Direction.D, Math.abs(this.height - 1 - this.origin.y + position.y));
        } else if (mappedPosition.y < 0) {
            this.expandMap(Direction.U, Math.abs(this.origin.y - position.y));
        }

        mappedPosition = this.getMappedPosition(position);
        if (mappedPosition.x < 0) {
            this.expandMap(Direction.L, - this.origin.x - position.x);
        } else if (mappedPosition.x >= this.width) {
            this.expandMap(Direction.R, this.origin.x - this.width + position.x + 1);
        }

        mappedPosition = this.getMappedPosition(position);
        this.map[mappedPosition.y][mappedPosition.x] = value;
    }

    visit(position: Position, marker: string) {
        this.setMapPosition(position, marker);
    }

    print() {
        process.stdout.write(`x${'-'.repeat(this.width * 2 + 1)}x\n`)
        this.map.forEach((row, rowIndex) => {
            process.stdout.write(`| `);
            row.forEach((field, colIndex) => {
                if (rowIndex === this.origin.y && colIndex === this.origin.x) {
                    process.stdout.write(`o `);
                } else {
                    process.stdout.write(`${field} `);
                }
            })
            process.stdout.write(`|\n`);
        })
        process.stdout.write(`x${'-'.repeat(this.width * 2 + 1)}x\n`)
    }

    serialize(): string {
        let output = '';
        output += `x${'-'.repeat(this.width * 2 + 1)}x\n`;
        this.map.forEach((row, rowIndex) => {
            output += `| `;
            row.forEach((field, colIndex) => {
                if (rowIndex === this.origin.y && colIndex === this.origin.x) {
                    output += `o `;
                } else {
                    output += `${field} `;
                }
            })
            output += `|\n`;
        })
        output += `x${'-'.repeat(this.width * 2 + 1)}x\n`;

        return output;
    }

    clear() {
        this.map.forEach((row, rowIndex) => row.forEach((position, colIndex) => {
            this.map[rowIndex][colIndex] = this.EMPTY_FIELD;
        }));
    }

    findVisitedPositions(marker: string) {
        return this.map.flat().reduce((counter, field) => field === marker ? counter + 1 : counter, 0)
    }
}

interface Move {
    direction: Direction;
    amount: number;
}

function getDirection(startPosition: Position, targetPosition: Position): Direction {
    const diffX = targetPosition.x - startPosition.x;
    const diffY = targetPosition.y - startPosition.y;


    if (diffX === 0 && diffY === 0) {
        return Direction.NONE;
    }

    if (diffX === 0) {
        return diffY < 0 ? Direction.D : Direction.U;
    }

    if (diffY === 0) {
        return diffX < 0 ? Direction.L : Direction.R;
    }

    if (diffX < 0) {
        return diffY < 0 ? Direction.DL : Direction.UL;
    } else {
        return diffY < 0 ? Direction.DR : Direction.UR;
    }
}

class Rope {
    private readonly knots: Position[];
    private readonly startPosition: Position;

    constructor(length: number) {
        this.startPosition = { x: 0, y: 0 };
        this.knots = [];
        for (let i = 0; i < length; i++) {
            this.knots.push(_.cloneDeep(this.startPosition))
        }
    }

    get head() {
        return this.knots[0];
    }

    get tail() {
        return this.knots[this.length - 1];
    }

    get length() {
        return this.knots.length;
    }

    private moveKnot(knotIndex: number, direction: Direction, map: Map) {
        const knot = this.knots[knotIndex];

        switch (direction) {
            case Direction.U: {
                knot.y += 1;
                break;
            }
            case Direction.UR: {
                knot.y += 1;
                knot.x += 1;
                break;
            }
            case Direction.R: {
                knot.x += 1;
                break;
            }
            case Direction.DR: {
                knot.x += 1;
                knot.y -= 1;
                break;
            }
            case Direction.D: {
                knot.y -= 1;
                break;
            }
            case Direction.DL: {
                knot.y -= 1;
                knot.x -= 1;
                break;
            }
            case Direction.L: {
                knot.x -= 1;
                break;
            }
            case Direction.UL: {
                knot.y += 1;
                knot.x -= 1;
                break;
            }
        }
    }

    moveHead(direction: Direction, map: Map) {
        this.moveKnot(0, direction, map);

        if (this.length <= 1) {
            return;
        }

        this.moveSubsequentKnot(1, map);
        // map.visit(this.head, 'H');
    }

    private moveSubsequentKnot(knotIndex: number, map: Map) {
        const fronKnot = this.knots[knotIndex - 1];
        const currentKnot = this.knots[knotIndex];
        const distance = this.measureDistance(fronKnot, currentKnot);
        const direction = distance >= 2 ? getDirection(currentKnot, fronKnot) : Direction.NONE;

        if (_.isEqual(this.knots[knotIndex], this.startPosition)) {
            this.moveKnot(knotIndex, direction, map);
            // map.visit(this.knots[knotIndex], '#');

            return;
        }

        this.moveKnot(knotIndex, direction, map);
        // map.visit(this.knots[knotIndex], '#');


        if (knotIndex === this.length - 1) {
            return;
        }

        this.moveSubsequentKnot(knotIndex + 1, map);
    }

    private measureDistance(pos1: Position, pos2: Position) {
        const diffX = pos1.x - pos2.x;
        const diffY = pos1.y - pos2.y;

        return Math.sqrt(diffX * diffX + diffY * diffY);
    }
}

function run(moves: Move[], map: Map) {
    const rope = new Rope(10);

    moves.forEach((move) => {
        for (let i = 0; i < move.amount; i++) {
            rope.moveHead(move.direction, map);
            map.visit(rope.tail, '#');
            // map.print();
        }
    })
}

export function run9() {
    const input = readFile('input/level9/level9.in');
    // const input = readFile('input/level9/example.in');

    const moves = input.map((line): Move => {
        const moveMeta = line.split(" ");
        return { direction: moveMeta[0] as Direction, amount: parseInt(moveMeta[1]) }
    })

    const map = new Map();
    map.print();

    run(moves, map);
    // map.print();

    writeFile('output/level9/level9.out', map.serialize());

    return map.findVisitedPositions(VISITED_MARKER);
}