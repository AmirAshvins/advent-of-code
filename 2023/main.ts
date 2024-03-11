const day01 = require('./day01');
const day02 = require('./day02');
const day03 = require('./day03');
const day04 = require('./day04');
const day05 = require('./day05');
const day06 = require('./day06');
const day07 = require('./day07');
const fs = require('fs');

export type DayMethod<Args extends any[] = [], ReturnType = any> = (lines: string[], ...args: Args) => ReturnType;

function getLinesOfFile(path: string): Array<string> {
    return fs
        .readFileSync(path)
        .toString()
        .split('\n')
        .filter((e: string) => !!e.length);
}


function executeDay<Args extends any[], ReturnType = any>(
    method: DayMethod<Args, ReturnType>,
    path: string,
    ...args: Args
): void {
    const lines = getLinesOfFile(path); // Assuming this function returns string[]
    console.log(method(lines, ...args));
}


// executeDay(day01.PART1, './day01/part1-input.txt');
// executeDay(day01.PART2, './day01/part2-input.txt');
// executeDay(day02.PART1, './day02/part1-input.txt', {red: 12, green: 13, blue: 14});
// executeDay(day02.PART2, './day02/part2-input.txt');
// executeDay(day03.PART1, './day03/part1-input.txt');
// executeDay(day03.PART2, './day03/part2-input.txt');
// executeDay(day04.PART1, './day04/part1-input.txt');
// executeDay(day04.PART2, './day04/part2-input.txt');
// executeDay(day05.PART1, './day05/part1-input.txt');
// executeDay(day05.PART2, './day05/part2-input.txt');
// executeDay(day06.PART1, './day06/part1-input.txt');
// executeDay(day06.PART2, './day06/part2-input.txt');
// executeDay(day07.PART1, './day07/part1-input.txt');
// executeDay(day07.PART2, './day07/part1-input.txt');
// executeDay(day08.PART1, './day07/input.txt');
