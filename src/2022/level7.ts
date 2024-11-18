import _, { last } from "lodash";
import { readFile } from "../utils";

class Node {
    children: Node[];
    parent: Node | null;
    name: string;
    size: number;

    readonly TAB_WIDTH = 3;

    constructor(name: string, size?: number, children?: Node[]) {
        this.name = name;
        this.parent = null;
        this.size = size ?? 0;
        this.children = children ?? [];
    }

    get childrenLength() {
        return this.children.length;
    }

    addChild(node: Node) {
        node.parent = this;
        this.children.push(node);

        return node;
    }

    hasDirectChild(name:string) {
        return this.children.find((child) => child.name === name)
    }

    get accumulatedSize(): number {
        return this.size + this.children.map((node) => node.accumulatedSize).reduce((accumulatedSize, size) => accumulatedSize + size, 0);
    }

    get isDir() {
        return this.size === 0;
    }

    print(): string {
        if (this.size !== 0) {
            return `- ${this.name} (file, size=${this.size}) [parent: ${this.parent?.name ?? 'null'}]`;
        }

        return `- ${this.name} (dir) [parent: ${this.parent?.name ?? 'null'}]`;
    }

    printTree(currentDepth = 0) {
        console.log(`${" ".repeat(this.TAB_WIDTH * currentDepth)}${this.print()}`);

        this.children.forEach((child) => child.printTree(currentDepth + 1));
    }
}


//############## Dir Size ###################
function accumulatedDirSize(root: Node) {
    return root.children.map((child) => dirSize(child))
}

const SIZE_LIMIT = 100000;
const possibleDirs: Node[] = []
function dirSize(node: Node) {
    if (node.isDir) {
        if (node.accumulatedSize <= SIZE_LIMIT) {
            possibleDirs.push(node);
        }

        node.children.forEach((child) => dirSize(child))
    }
}

const flatTree: number[] = []
function flattenTree(node: Node) {
    if (node.isDir) {
        flatTree.push(node.accumulatedSize);

        node.children.forEach((child) => flattenTree(child))
    }
}

function testNodes() {
    const root = new Node("root");

    const a = root.addChild(new Node("a"));
    const b = a.addChild(new Node("b"));
    const c = b.addChild(new Node("c"));
    c.addChild(new Node("c.1", 10))
    c.addChild(new Node("c.2", 10))
    const d = b.addChild(new Node("d"));
    d.addChild(new Node("d.1", 10))
    d.addChild(new Node("d.2", 10))
    d.addChild(new Node("d.3", 10))
    const e = a.addChild(new Node("e"));
    e.addChild(new Node("e.1", 10))
    e.addChild(new Node("e.2", 10))
    const f = e.addChild(new Node("f"));
    f.addChild(new Node("f.1", 10));
    f.addChild(new Node("f.2", 10));
    f.addChild(new Node("f.3", 10));


    return root;
}

function buildNodesFromLog(log: string[]): Node {
    const root = new Node("/");

    let index = 0;
    let lastCommand: {id: string, to?: string} = {id: ''};
    let currentNode: Node = root;

    while(index < log.length) {
        const line = log[index];
        const lineMeta = line.split(" ");

        // ###### Determine last command #########
        if (lineMeta[0] === '$') {
            if (lineMeta[1] === 'cd') {
                lastCommand = {id: lineMeta[1], to: lineMeta[2]}
            } else if (lineMeta[1] === 'ls') {
                lastCommand = {id: lineMeta[1]}
                index++;
                continue;
            }
        }

        // ###### Operate line on last command #########
        // Command = ls
        if (lastCommand.id === 'ls') {
            if (lineMeta[0] === 'dir') {
                if (!currentNode.hasDirectChild(lineMeta[1]))
                    currentNode.addChild(new Node(lineMeta[1]));
            } else {
                if (!currentNode.hasDirectChild(lineMeta[1]))
                    currentNode.addChild(new Node(lineMeta[1], parseInt(lineMeta[0])))
            }
        }
        // Command = cd
        else if (lastCommand.id === 'cd') {
            if (lineMeta[2] === '..') {
                currentNode = currentNode.parent ?? currentNode;
            } else if (lineMeta[2] === '/') {
                currentNode = root;
            } else {
                const nextNode = currentNode.children.find((child) => child.name === lineMeta[2]);
                currentNode = nextNode ?? currentNode;
            }
        }

        index ++;
    }


    return root;
}

export function run7() {
    const input = readFile('input/level7/level7.in');
    // const input = readFile('input/level7/example.in');

    const tree = buildNodesFromLog(input);
    // const tree = testNodes();
    // tree.printTree();

    // accumulatedDirSize(tree);

    // console.log(tree.accumulatedSize);
    // console.log(possibleDirs.map((node) => node.accumulatedSize).reduce((acc, curr) => acc + curr, 0));

    const TOTAL_SPACE =  70000000;
    const NEEDED_SPACE = 30000000;
    const usedSpace = tree.accumulatedSize;
    const freeSpace = TOTAL_SPACE - usedSpace;

    // console.log(TOTAL_SPACE, usedSpace, freeSpace)

    flattenTree(tree);

    // console.log(flatTree.length)
    // console.log(flatTree);
    // console.log(flatTree.sort((a,b) => b-a))

    const chosenDirs = flatTree.filter((size) => freeSpace + size >= NEEDED_SPACE).sort((a, b) => a - b);
    // console.log(chosenDirs)

    return chosenDirs[0];
}
