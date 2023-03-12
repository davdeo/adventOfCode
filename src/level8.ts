import _, { last } from "lodash";
import { readFile } from "./utils";

type TreeMap = number[][];

function generateTreeMap(input: string[]) {
    const map: TreeMap = [];

    input.forEach((line, index) => {
        map.push([]);
        map[index].push(...line.split('').map((char) => parseInt(char)))
    })

    return map;
}

function isVisible(map: TreeMap, row: number, col: number) {
    const treeInQuestion = map[row][col];
    const width = map[0].length;
    const height = map.length;
    
    // console.log('width', width);
    // console.log('width', height);
    
    if (row === 0 || row === height - 1 || col === 0 || col === width -1) {
        return true;
    }

    // console.log('tree in question:', treeInQuestion);

    const visibleFromTop = !map.slice(0, row).some((aRow) => aRow[col] >= treeInQuestion);
    const visibleFromRight = !map[row].slice(col + 1).some((tree) => tree >= treeInQuestion);
    const visibleFromBottom = !map.slice(row + 1).some((aRow) => aRow[col] >= treeInQuestion);
    const visibleFromLeft = !map[row].slice(0, col).some((tree) => tree >= treeInQuestion);

    return visibleFromTop || visibleFromRight || visibleFromBottom || visibleFromLeft;
}

function getVisibilityScore(map: TreeMap, row: number, col: number) {
    const treeInQuestion = map[row][col];
    const width = map[0].length;
    const height = map.length;
    
    // console.log('width', width);
    // console.log('width', height);
    
    if (row === 0 || row === height - 1 || col === 0 || col === width -1) {
        return 0;
    }

    // console.log('tree in question:', treeInQuestion);

    // Top
    let visibilityScoreTop = map.slice(0, row).reverse().findIndex((aRow) => aRow[col] >= treeInQuestion);
    visibilityScoreTop = visibilityScoreTop === -1 ? row : visibilityScoreTop + 1 
    // console.log('top: ', visibilityScoreTop);

    // Right
    let visibilityScoreRight = map[row].slice(col + 1).findIndex((tree) => tree >= treeInQuestion);
    visibilityScoreRight = visibilityScoreRight === -1 ? width - col - 1 : visibilityScoreRight + 1 
    // console.log('right: ', visibilityScoreRight);
    
    // Bottom
    let visibilityScoreBottom = map.slice(row + 1).findIndex((aRow) => aRow[col] >= treeInQuestion);
    visibilityScoreBottom = visibilityScoreBottom === -1 ? height - row - 1 : visibilityScoreBottom + 1 
    // console.log('bottom: ', visibilityScoreBottom);

    // Left
    let visibilityScoreLeft = map[row].slice(0, col).reverse().findIndex((tree) => tree >= treeInQuestion);
    visibilityScoreLeft = visibilityScoreLeft === -1 ? col : visibilityScoreLeft + 1 
    // console.log('left: ', visibilityScoreLeft);

    return visibilityScoreTop * visibilityScoreRight * visibilityScoreBottom * visibilityScoreLeft;
}

export function run8() {
    const input = readFile('input/level8/level8.in');
    // const input = readFile('input/level8/example.in');
    
    const treeMap = generateTreeMap(input);

    // console.log(treeMap);

    const visibilityMap = treeMap.map((row, rowIndex) => row.map((tree, colIndex) => isVisible(treeMap, rowIndex, colIndex)));
    const visibilityScoreMap = treeMap.map((row, rowIndex) => row.map((tree, colIndex) => getVisibilityScore(treeMap, rowIndex, colIndex)));

    // console.log(visibilityMap);
    // console.log(visibilityScoreMap);

    const visibleTrees = visibilityMap.flat().map((visible): number => visible ? 1 : 0).reduce((counter, current) => counter + current, 0);

    const bestVisibilityScore = visibilityScoreMap.flat().reduce((highScore, current) => current > highScore ? current : highScore, 0)

    // console.log('visible trees: ', visibleTrees);
    // const expected = 21;
    // console.log('expected visible trees: ', expected);
    return bestVisibilityScore;
}