import * as fs from 'fs';
import * as path from 'path';

export interface Input {
    lines: string[]
}

export function readFile(filePath: string): Input {
    const file = fs.readFileSync(path.join(__dirname, '../', filePath), 'utf8');

    const lines = file.split('\n');
    if (lines[lines.length - 1] === '') {
        lines.pop();
    }

    return {
        lines
    };
}
