import * as buffer from "buffer";

`
--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
`

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const dot = '.';
const star = "*";

const isSymbol = (e: string) => e !== dot && !numbers.includes(e);

const sumOfEnginePartNumbersPART1 = (lines: Array<string>): number => {
    const schema = lines.map(e => e.split(""));
    let sum = 0;
    for (let rowIndex = 0; rowIndex < schema.length; rowIndex++) {
        const hasUpperRow = rowIndex > 0;
        const hasLowerRow = rowIndex < schema.length - 1;

        const line = schema[rowIndex];
        let pointer = 0;
        let s = 0;
        let e = s;

        while (pointer < line.length) {
            if (numbers.includes(line[pointer])) {
                // seen our first number, now lets see where the end is
                s = pointer;
                e = s;
                while (e < line.length) {
                    e++;
                    if (!numbers.includes(line[e])) {
                        e--;
                        break;
                    }
                }
                // now lets check around the number.
                const anythingBeforeS = s > 0;
                const anythingAfterE = e < line.length - 1;
                let isPartNo = false;
                if (hasUpperRow) {
                    const check = schema[rowIndex - 1].slice(s + (anythingBeforeS ? -1 : 0), e + 1 + (anythingAfterE ? 1 : 0))
                    isPartNo = isPartNo || check.some(e => isSymbol(e));
                }
                if (anythingBeforeS) {
                    isPartNo = isPartNo || isSymbol(line[s - 1])
                }
                if (anythingAfterE) {
                    isPartNo = isPartNo || isSymbol(line[e + 1])
                }
                if (hasLowerRow) {
                    const check = schema[rowIndex + 1].slice(s + (anythingBeforeS ? -1 : 0), e + 1 + (anythingAfterE ? 1 : 0))
                    isPartNo = isPartNo || check.some(e => isSymbol(e));
                }

                const miniGrid = [
                    (hasUpperRow ? schema[rowIndex - 1].slice(s + (anythingBeforeS ? -1 : 0), e + 1 + (anythingAfterE ? 1 : 0)) : []),
                    line.slice(s, e + 1),
                    (hasLowerRow ? schema[rowIndex + 1].slice(s + (anythingBeforeS ? -1 : 0), e + 1 + (anythingAfterE ? 1 : 0)) : []),
                ]

                // if isPartNo then add to sum
                if (isPartNo) {
                    sum += Number(line.slice(s, e + 1).join(''));
                }
                // increase pointer
                pointer += e - s;
            }
            pointer++;
        }
    }
    return sum;
}

`
--- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*1.....
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?
`

const numbersOfLineInRange = (line: Array<string>, s: number, e: number): Array<number> => {
    const res: Array<number> = [];
    let currentNum = '';
    let inNumber = false;

    // Extend s backwards if it starts in the middle of a number
    while (s > 0 && numbers.includes(line[s]) && numbers.includes(line[s - 1])) {
        s--;
    }

    // Iterate through the line
    for (let i = s; i <= e; i++) {
        const char = line[i];

        if (numbers.includes(char)) {
            currentNum += char;
            inNumber = true;
            if (i >= e) {
                // Extend e forwards if it ends in the middle of a number
                while (i + 1 < line.length && numbers.includes(line[i + 1])) {
                    i++;
                    currentNum += line[i];
                }
                res.push(Number(currentNum));
                currentNum = '';
                inNumber = false;
                break;
            }
        } else if (inNumber) {
            res.push(Number(currentNum));
            currentNum = '';
            inNumber = false;
        }
    }

    // Handle case where a number is at the end of the line
    if (inNumber) {
        res.push(Number(currentNum));
    }

    return res;
};

const sumOfAllGearRatiosPART2 = (lines: Array<string>): number => {
    const schema = lines.map(e => e.split(""));
    let sum = 0;

    for (let rowIndex = 0; rowIndex < schema.length; rowIndex++) {
        const hasUpperRow = rowIndex > 0;
        const hasLowerRow = rowIndex < schema.length - 1;

        const line = schema[rowIndex];
        let pointer = 0;

        while (pointer < line.length) {
            if (line[pointer] === star) {
                const anythingBeforeS = pointer > 0;
                const anythingAfterE = pointer < line.length - 1;

                // we have a vertical hamburger :)
                const s = pointer + (anythingBeforeS ? -1 : 0);
                const e = pointer + (anythingAfterE ? 1 : 0);
                const numbersInUpperRow = hasUpperRow ? numbersOfLineInRange(schema[rowIndex - 1], s, e) : [];
                const numbersInLowerRow = hasLowerRow ? numbersOfLineInRange(schema[rowIndex + 1], s, e) : [];
                const numberInLeftSide: Array<number> = anythingBeforeS ? numbersOfLineInRange(line, s, s) : [];
                const numberInRightSide: Array<number> = anythingAfterE ? numbersOfLineInRange(line, e, e) : [];

                const adjacentNums = [...numbersInUpperRow, ...numbersInLowerRow, ...numberInRightSide, ...numberInLeftSide];
                if (adjacentNums.length === 2) {
                    sum += adjacentNums[0] * adjacentNums[1];
                }
            }
            pointer++;
        }
    }

    return sum;
}


module.exports = {
    PART1: sumOfEnginePartNumbersPART1,
    PART2: sumOfAllGearRatiosPART2,
}
