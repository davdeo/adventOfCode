import * as fs from 'fs';
import * as path from 'path';

export function readFile(filePath: string): string[] {
    const file = fs.readFileSync(path.join(__dirname, '../', filePath), 'utf8');

    return file.split('\r\n');
}