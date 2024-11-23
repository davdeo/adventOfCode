import {Input, readFile, writeFile} from "../utils";
import {isNil} from "lodash";

export function runlevel24() {
    console.log();
    console.log("Run level24");

    const exampleInput = readFile('2023/input/level24/example.in');
    const exampleResult = calculateResult(exampleInput, {min: {x: 7, y: 7, z: 0}, max: {x: 27, y: 27, z: 0}});
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level24/level24.in');
    const result = calculateResult(input, {min: {x: 200000000000000, y: 200000000000000, z: 0}, max: {x: 400000000000000, y: 400000000000000, z: 0}});
    writeFile('2023/output/level24.out', `${result}`)
}

function calculateResult(input: Input, boardSize: { min: Vector, max: Vector }) {
    const {lines} = input;
    const trajectories = lines.map(convertLineToTrajectory);
    let result = 0;

    trajectories.forEach((tA, i) => {
        trajectories.forEach((tB, j) => {
            if (j <= i) return;

            const intersection = calculateIntersection(tA, tB, boardSize);
            if (!isNil(intersection)) {
                result++;
            }
        })
    })

    return result;
}

function calculateResult2(input: Input) {
    const {lines} = input;
    const res = 0;

    return res;
}

function convertLineToTrajectory(line: string): Trajectory {
    const [pointStr, velocityStr] = line.split('@');
    const [pX, pY, pZ] = pointStr.split(',');
    const [vX, vY, vZ] = velocityStr.split(',');

    return {
        point: {
            x: parseInt(pX),
            y: parseInt(pY),
            z: parseInt(pZ)
        },
        velocity: {
            x: parseInt(vX),
            y: parseInt(vY),
            z: parseInt(vZ)
        }
    }
}

interface Vector {
    x: number;
    y: number;
    z: number;
}

interface Trajectory {
    point: Vector;
    velocity: Vector
}

function calculateT(trajectoryA: Trajectory, trajectoryB: Trajectory): number {
    const {point: pA, velocity: vA} = trajectoryA;
    const {point: pB, velocity: vB} = trajectoryB;

    const {x: pAX, y: pAY} = pA;
    const {x: vAX, y: vAY} = vA;
    const {x: pBX, y: pBY} = pB;
    const {x: vBX, y: vBY} = vB;

    const numerator = vBY * (pAX - pBX) - vBX * (pAY - pBY);
    const denominator = vAY * vBX - vAX * vBY;

    return numerator / denominator;
}

function calculateU(trajectoryA: Trajectory, trajectoryB: Trajectory, t: number): number {
    const {point: pA, velocity: vA} = trajectoryA;
    const {point: pB, velocity: vB} = trajectoryB;

    const {x: pAX} = pA;
    const {x: vAX} = vA;
    const {x: pBX} = pB;
    const {x: vBX} = vB;

    const numerator = pAX - pBX + vAX * t;
    const denominator = vBX;

    return numerator / denominator;
}

function calculateIsParallel(trajectoryA: Trajectory, trajectoryB: Trajectory, epsilon = 1e-10): boolean {
    const {velocity: vA} = trajectoryA;
    const {velocity: vB} = trajectoryB;

    const cross = vA.x * vB.y - vA.y * vB.x;

    return Math.abs(cross) < epsilon;
}


function calculateIntersection(trajectoryA: Trajectory, trajectoryB: Trajectory, boardSize: {
    min: Vector,
    max: Vector
}): Vector | undefined {
    const t = calculateT(trajectoryA, trajectoryB);
    const u = calculateU(trajectoryA, trajectoryB, t);

    if (t < 0 || u < 0) {
        // Trajectories met in the past
        return undefined;
    }

    const isParallel = calculateIsParallel(trajectoryA, trajectoryB);

    if (isParallel) {
        // Trajectories are parallel
        return undefined;
    }

    const {point: pointA, velocity: velocityA} = trajectoryA;
    const {point: pointB, velocity: velocityB} = trajectoryB;

    const intA = {
        x: pointA.x + velocityA.x * t,
        y: pointA.y + velocityA.y * t,
        z: 0
    };
    const intB = {
        x: pointB.x + velocityB.x * u,
        y: pointB.y + velocityB.y * u,
        z: 0
    }

    if (intA.x < boardSize.min.x || intA.x > boardSize.max.x ||
        intA.y < boardSize.min.y || intA.y > boardSize.max.y) {
        // Trajectories cross outside test area
        return undefined;
    }

    // console.log(isEqual(intA, intB))
    // console.log(intA, intB)

    return intA;
}

const isEqual = (a: Vector, b: Vector, epsilon = 1e-10) =>
    Math.abs(a.x - b.x) < epsilon &&
    Math.abs(a.y - b.y) < epsilon &&
    Math.abs(a.z - b.z) < epsilon;

