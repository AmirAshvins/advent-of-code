`
--- Day 1: Trebuchet?! ---
Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've
 used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when
you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your 
map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") 
when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young 
Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves 
now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form 
a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
`

const sumOfAllCalibrationValuesPART1 = (inputArray: Array<string>): number => {
    let sum = 0;
    for (const string of inputArray) {
        let start = 0;
        let end = string.length - 1;
        let numStart = Number(string[start]);
        let numEnd = Number(string[end]);
        while (start <= end && end >= start && (Number.isNaN(numStart) || Number.isNaN(numEnd))) {
            if (Number.isNaN(numStart)) {
                start++;
                numStart = Number(string[start]);
            }
            if (Number.isNaN(numEnd)) {
                end--;
                numEnd = Number(string[end]);
            }
        }
        sum += Number(string[start] + string[end]);
    }
    return sum;
}


`
--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
`

const numMap: Record<string, number> = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

const replace = (input: string): string => {
    let string = input;
    const numKeys = Object.keys(numMap);
    let i = 0;

    while (i < string.length) {
        let longestMatch = "";
        let matchLength = 0;

        for (const numKey of numKeys) {
            if (string.substring(i, numKey.length) === numKey && numKey.length > matchLength) {
                longestMatch = numKey;
                matchLength = numKey.length;
            }
        }

        if (longestMatch) {
            string = string.slice(0, i) + numMap[longestMatch] + string.slice(i + matchLength);
            i += 1; // Move past the digit we just inserted
        } else {
            i += 1;
        }
    }

    return string;
}

const sumOfAllCalibrationValuesPART2 = (inputArray: Array<string>): number => {
    let sum = 0;
    for (const _string of inputArray) {
        const string = replace(_string);
        let start = 0;
        let end = string.length - 1;

        // Find the first numeric character
        while (start < string.length && Number.isNaN(Number(string[start]))) {
            start++;
        }

        // Find the last numeric character
        while (end >= 0 && Number.isNaN(Number(string[end]))) {
            end--;
        }

        // Ensure that both a start and end numeric character are found
        if (start < string.length && end >= 0) {
            sum += Number(string[start] + string[end]);
        }
    }
    return sum;
}

module.exports = {
    PART1: sumOfAllCalibrationValuesPART1,
    PART2: sumOfAllCalibrationValuesPART2,
}
