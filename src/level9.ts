import _, { last } from "lodash";
import { readFile } from "./utils";

enum Direction {
    U = 'U',
    R = 'R',
    D = 'D',
    L = 'L'
}

interface Position {
    x: number;
    y: number;
}

class Map {
    private readonly map: string[][] = [['.']];
    private origin: Position = { x: 0, y:0 };

    private get height() {
        return this.map.length;
    }

    private get width() {
        return this.map[0].length;
    }

    private getMappedPosition(position: Position) {
        return { x: this.origin.x + position.x, y: this.origin.y - position.y};
    }

    private expandMap(direction: Direction, amount: number) {
        switch(direction) {
            case Direction.U: {
                for(let i = 0; i < amount; i++) {
                    this.map.unshift('.'.repeat(this.width).split(''))
                }
                this.origin.y += amount;
                break;
            }
            case Direction.R: {
                for(let i = 0; i < this.height; i++) {
                    for(let j = 0; j < amount; j++) {
                        this.map[i].push('.');
                    }
                }
                break;
            }
            case Direction.D: {
                for(let i = 0; i < amount; i++) {
                    this.map.push('.'.repeat(this.width).split(''))
                }
                break;
            }
            case Direction.L: {
                for(let i = 0; i < this.height; i++) {
                    for(let j = 0; j < amount; j++) {
                        this.map[i].unshift('.');
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

    findVisitedPositions(marker: string) {
        return this.map.flat().reduce((counter, field) => field === marker ? counter + 1 : counter, 0)
    }
}

export function run9() {
    const input = readFile('input/level9/level9.in');
    // const input = readFile('input/level9/example.in');
    
    const map = new Map();
    map.visit({x: -1, y: -1}, '#');
    map.visit({x: 1, y: 1}, '#');
    map.visit({x: -5, y: 0}, '#');
    map.visit({x: -7, y: 0}, '#');
    map.visit({x: 6, y: 0}, '#');
    map.visit({x: 0, y: 10}, '#');
    map.visit({x: 1, y: 10}, '#');
    map.visit({x: -2, y: 0}, '#');
    map.visit({x: 1, y: 0}, '#');
    map.visit({x: -1, y: -7}, '#');
    map.visit({x: -10, y: -10}, '#');
    map.visit({x: 7, y: 0}, '#');
    map.visit({x: 0, y: 7}, '#');
    map.visit({x: 0, y: -7}, '#');
    map.visit({x: 10, y: 10}, '#');
    map.visit({x: -10, y: 10}, '#');
    map.visit({x: -10, y: -10}, '#');
    map.visit({x: 10, y: -10}, '#');
    map.print();

    return map.findVisitedPositions('#');
}