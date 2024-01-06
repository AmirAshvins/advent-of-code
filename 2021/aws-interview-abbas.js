/**
 * Determines the number of days it takes for the given [coffeeMakers] to make [coffees] amount of coffees.
 *
 * * each coffeeMaker's coffee making duration is considered to be 1 day long.
 * * the number of coffees made may in some cases be greater than the needed coffees, but decreasing the amount would
 *   not result in a smaller duration.
 * @param {number[]}    coffeeMakers    the list of coffee makers durations
 * @param {number}      coffees         the needed number of coffees
 * @return {number}                     the duration (in days) that is required to make [coffees] amount of coffees.
 */
const getCoffeeMakingDuration = (coffeeMakers, coffees) => {
    if (coffees <= 0)
        return 0;

    // initial days is the lowest number of days to make at least 1 coffee
    let days = Math.min(...coffeeMakers.map(e => e));
    // at min, we increase by initial days
    const minDaysIncrease = days;

    while (true) {
        let coffeesMade = 0;
        let increaseInDays = minDaysIncrease;

        for (let i = 0; i < coffeeMakers.length; i++) {
            const coffeeMaker = coffeeMakers[i];
            // determine how many more days we need if we were to make 1 more coffee by this maker
            const minDaysToMakeOneMoreCoffee = coffeeMaker - (days % coffeeMaker);
            // take minimum of all
            increaseInDays = Math.min(increaseInDays, minDaysToMakeOneMoreCoffee);
            // increment coffees made in total with coffees made by this maker.
            coffeesMade += Math.floor(days / coffeeMaker);
            if (coffeesMade >= coffees)
                return days;
        }
        // increment days so at least we get one more coffee
        days += increaseInDays;
    }
}


const gcd = (a, b) => {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
const lcm = (a, b) => (a * b / gcd(a, b));

const lcm_multiple = (...args) => {
    switch ((args?.length ?? 0)) {
        case 0:
            return 0;
        case 1:
            return args[0];
        case 2:
            return lcm(args[0], args[1]);
        default:
            return lcm(args.shift(), lcm_multiple(...args));
    }
}

const optimized = (coffeeMakers, coffees) => {
    if (coffees <= 0 || !coffeeMakers?.length)
        return 0;

    const lcm = lcm_multiple(coffeeMakers); // O(N . log N)
    if (lcm === 0)
        return 0;

    const coffeesMadeWithLcm = coffeeMakers.map(e => lcm / e);
    const cyclesOfLcmCoffeeMaking = coffees / coffeesMadeWithLcm;

    if (coffeesMadeWithLcm > coffees) {
        // the case where the number of coffees is less than coffeesMadeWithLcm
        for (let i = coffeesMadeWithLcm - coffees; i <= 0; i++) {

        }
    }

    if (Number.isInteger(cyclesOfLcmCoffeeMaking))
        // days spent will get us the exact number of coffees we are after
        return cyclesOfLcmCoffeeMaking * lcm;



    // we are sure now that whatever we do, it is going to be O(1) since (x - cyclesOfLcmCoffeeMaking) * lcm is a constant
    // 10, (3 . 8) 24 -> 11
    // 10 / 11 =  0.9090
    // 100 / 99

    //                      starting with 12 for next

    // 3        8       12
    // (4, 0)   (1, 4)  (1, 0) -> -6 with 4 for next

    // 3        8       12
    // (1, 1)   (1, 0)  (0, 4) -> -2 with 8 for next

    // 3        8       12
    // (2, 2)   (1, 0)  (1, 0) -> -2 with

    // TODO: stuck
}


console.log(optimized([3, 4], 20)); // 36
console.log(optimized([2, 3, 4], 20)); // 20
console.log(optimized([2, 2, 3, 4], 9)); // 6
console.log(optimized([2, 2, 3, 4], 20)); // 14
