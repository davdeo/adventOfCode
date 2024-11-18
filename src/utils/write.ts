import * as fs from 'fs';
import * as path from 'path';

export function writeFile(filePath: string, data: string): void {
    const file = fs.writeFileSync(path.join(__dirname, '../', filePath), data, { flag: 'w' });
}
