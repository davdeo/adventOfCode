import { readFile } from "./utils";

enum Opponent {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C'
}

enum Player {
    ROCK = 'X',
    PAPER = 'Y',
    SCISSORS = 'Z'
}

enum Move {
    ROCK = 'R',
    PAPER = 'P',
    SCISSORS = 'S'
}

enum Result {
    WIN = 'Z',
    DRAW = 'Y',
    LOSS = 'X'
}

const POINTS = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
    WIN: 6,
    DRAW: 3,
    LOSS: 0
}

function evaluateResult(result: Result): number {
    switch (result) {
        case Result.WIN: return POINTS.WIN;
        case Result.LOSS: return POINTS.LOSS;
        case Result.DRAW: return POINTS.DRAW;
    }
}


function evaluateMove(move: Move): number {
    switch (move) {
        case Move.PAPER: return POINTS.PAPER;
        case Move.ROCK: return POINTS.ROCK;
        case Move.SCISSORS: return POINTS.SCISSORS;
    }
}

function evaluateRoundForPlayer(opponent: Move, player: Move): number {
    if (opponent === player) return POINTS.DRAW;

    if (opponent === Move.PAPER) {
        if (player === Move.ROCK) return POINTS.LOSS;
        if (player === Move.SCISSORS) return POINTS.WIN;
    }

    if (opponent === Move.ROCK) {
        if (player === Move.PAPER) return POINTS.WIN;
        if (player === Move.SCISSORS) return POINTS.LOSS;
    }

    if (opponent === Move.SCISSORS) {
        if (player === Move.ROCK) return POINTS.WIN;
        if (player === Move.PAPER) return POINTS.LOSS;
    }

    throw new Error("Invalid input");
}

function convertOpponent(op: Opponent): Move {
    switch (op) {
        case Opponent.PAPER: return Move.PAPER
        case Opponent.ROCK: return Move.ROCK
        case Opponent.SCISSORS: return Move.SCISSORS
    }
}

function convertPlayer(pl: Player): Move {
    switch (pl) {
        case Player.PAPER: return Move.PAPER
        case Player.ROCK: return Move.ROCK
        case Player.SCISSORS: return Move.SCISSORS
    }
}

function convertExpectedResultToPlayerMove(opponent: Move, result: Result): Move {
    if (result === Result.DRAW) return opponent;

    if (opponent === Move.PAPER) {
        if (result === Result.WIN) return Move.SCISSORS;
        if (result === Result.LOSS) return Move.ROCK;
    }

    if (opponent === Move.ROCK) {
        if (result === Result.WIN) return Move.PAPER;
        if (result === Result.LOSS) return Move.SCISSORS;
    }

    if (opponent === Move.SCISSORS) {
        if (result === Result.WIN) return Move.ROCK;
        if (result === Result.LOSS) return Move.PAPER;
    }

    throw new Error("Invalid input");
}

function run2part1() {
    const input = readFile('input/level2/example.in');

    let totalPoints = 0;

    input.forEach((round) => {
        const [opponent, player] = round.split(" ");
        const convOpponent = convertOpponent(opponent as Opponent);
        const convPlayer = convertPlayer(player as Player);

        const roundResult = evaluateRoundForPlayer(convOpponent, convPlayer);
        const additionalPointsForMove = evaluateMove(convPlayer);

        totalPoints += roundResult + additionalPointsForMove;
    })


    return totalPoints;
}

export function run2() {
    const input = readFile('input/level2/level2.in');

    let totalPoints = 0;

    input.forEach((round) => {
        const [opponent, expectedResult] = round.split(" ");
        const opponentMove = convertOpponent(opponent as Opponent);
        const playerMove = convertExpectedResultToPlayerMove(opponentMove, expectedResult as Result);

        const roundResult = evaluateResult(expectedResult as Result);
        const additionalPointsForMove = evaluateMove(playerMove);

        totalPoints += roundResult + additionalPointsForMove;
    })


    return totalPoints;
}