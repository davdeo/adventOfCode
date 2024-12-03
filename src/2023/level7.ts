import {Input, readFile, writeFile} from "../utils";
import _, {isEmpty, isNil, keys, max, sortBy} from "lodash";

export function runlevel7() {
    console.log();
    console.log("Run level7");

    const exampleInput = readFile('2023/input/level7/example.in');
    const exampleResult = calculateResult1(exampleInput);
    console.log("exampleOutput:", exampleResult);

    const input = readFile('2023/input/level7/real.in');
    const result = calculateResult1(input);
    writeFile('2023/output/level7.out', `${result}`)
}

const CARD_VALUES: Record<string, number> = {
    "A": 13,
    "K": 12,
    "Q": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "J": 1,
}

const handValues:Record<string, number> = {
    "FIVE_OF_A_KIND": 5,
    "FOUR_OF_A_KIND": 4,
    "FULL_HOUSE": 3.5,
    "THREE_OF_A_KIND": 3,
    "TWO_PAIR": 2.5,
    "ONE_PAIR": 2,
    "HIGH_CARD": 1
}

function toHex(n: number): string {
    return n.toString(16);
}

function fromHex(n: string): number {
    return parseInt(n, 16);
}

function getValueOfCard(c: string): number {
    return CARD_VALUES[c];
}

function getCardValue(hand:string): number {
    const cardArr = hand.split("");
    const cardValues = cardArr.map(c => toHex(getValueOfCard(c)));
    return fromHex(cardValues.join(""));
}

function getCardCount(hand: string): {card: string; count: number}[] {
    const cardArr = hand.split("").sort((a, b) => a.localeCompare(b));
    const cardCounts: {card: string; count: number}[] = []
    cardArr.forEach((card) => {
        const cardCount =cardCounts.find((c) =>
            c.card === card
        );
        if (isNil(cardCount)) {
            cardCounts.push({card: card, count: 1});
        } else {
            cardCount.count ++;
        }

    })
    return cardCounts;
}

function getHandValue(hand: string): { cardValue: number; handValue: number } {
    const cardCounts = getCardCount(hand);
    const numberOfJokers = cardCounts.find(card => card.card === "J")?.count ?? 0;
    const pureCardCounts = cardCounts.filter(card => card.card !== "J").map(card => card.count).sort((a,b) => b-a);
    const cardValue = getCardValue(hand);
    let handValue = 0;

    // Five of a kind
    if (pureCardCounts[0] === 5) {
        handValue = handValues["FIVE_OF_A_KIND"];
    }
    // Four of a kind
    else if (pureCardCounts[0] === 4) {
        handValue = handValues["FOUR_OF_A_KIND"];
    }
    // Full house
    else if (pureCardCounts[0] === 3 && pureCardCounts[1] === 2) {
        handValue = handValues["FULL_HOUSE"];
    }
    // Three of a kind
    else if (pureCardCounts[0] === 3) {
        handValue = handValues["THREE_OF_A_KIND"];
    }
    // Two pair
    else if (pureCardCounts[0] === 2 && pureCardCounts[1] === 2) {
        handValue = handValues["TWO_PAIR"];
    }
    // Pair
    else if (pureCardCounts[0] === 2) {
        handValue = handValues["ONE_PAIR"];
    }
    // Pair
    else if (pureCardCounts[0] === 1) {
        handValue = handValues["HIGH_CARD"];
    }

    handValue += numberOfJokers;

    return {
        cardValue,
        handValue,
    }
}


function calculateResult1(input: Input) {
    let {lines} = input;
    let res = 0;

    const rounds = lines.map(line => {
        const [hand, bid] = line.split(" ");
        return {
            ...getHandValue(hand),
            bid: parseInt(bid, 10),
            hand,
        };
    })

    const sortedRounds = sortBy(rounds, ["handValue", "cardValue"]);

    console.log(sortedRounds);

    res = sortedRounds.reduce((a, b, i) => a + (b.bid * (i + 1)), 0);

    return res;
}


function calculateResult2(input: Input) {
    let {lines} = input;
    let res = 0;

    return res;
}

