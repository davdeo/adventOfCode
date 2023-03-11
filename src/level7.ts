import _ from "lodash";
import { readFile } from "./utils";

interface Node {
    children: Record<string, Node>;
    size?: number;
    name: string;
}

export function run7() {
    // const input = readFile('input/level7/level7.in');
    const input = readFile('input/level7/example.in');

    console.log(input)

    return 0;
}