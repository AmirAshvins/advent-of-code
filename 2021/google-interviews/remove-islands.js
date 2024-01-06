// 1. black
// 0. white
// remove islands where the blacks are not connected to the borders or any other blacks that lead to the borders

const Directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
}

const DirectionsList = Object.values(Directions);

const Points = {
    black: 1,
    white: 0,
}

/**
 * @param {(0 | 1)[][]} matrix
 * @param {number} x
 * @param {number} y
 * @param {'up', 'down', 'left', 'right'} direction
 * @param {{x: number, y: number}[]} list
 */
const followConnectedBlacks = (matrix, x, y, direction, list) => {
    const maxY = matrix.length - 1;
    const maxX = matrix[0].length - 1;
    let directions;
    switch (direction) {
        case Directions.up:
            y = y - 1;
            if (y < 0) {
                return;
            }
            directions = DirectionsList.filter(e => e !== Directions.down);
            break;
        case Directions.down:
            y = y + 1;
            if (y > maxY) {
                return;
            }
            directions = DirectionsList.filter(e => e !== Directions.up);
            break;
        case Directions.left:
            x = x - 1;
            if (x < 0) {
                return;
            }
            directions = DirectionsList.filter(e => e !== Directions.right);
            break;
        case Directions.right:
            x = x + 1;
            if (x > maxX) {
                return;
            }
            directions = DirectionsList.filter(e => e !== Directions.left);
            break;
    }

    if (matrix[y][x] === Points.white)
        return;

    if (list.find(e => e.y === y && e.x === x))
        return;

    list.push({x: x, y: y});

    for (const direction of directions)
        followConnectedBlacks(matrix, x, y, direction, list);
}

/**
 * @param {(0 | 1)[][]} matrix
 */
const removeIslands = (matrix) => {
    /**@type {{x: number, y: number}[]}*/
    const ignored = [];

    // add first and last rows of black points to ignore list
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] === Points.black) {
            ignored.push({x: 0, y: i});
        }
        if (matrix[i][matrix[i].length - 1] === Points.black) {
            ignored.push({x: matrix[i].length - 1, y: i});
        }
    }

    // add first and last columns of black points to ignore list
    for (let j = 1; j < matrix[j].length - 2; j++) {
        if (matrix[0][j] === Points.black) {
            ignored.push({x: j, y: 0});
        }
        if (matrix[matrix.length - 1][j] === Points.black) {
            ignored.push({x: j, y: matrix.length - 1});
        }
    }

    for (const {x, y} of ignored)
        for (const direction of DirectionsList)
            // for each ignored point and for each direction, follow the path to add to the ignored list.
            followConnectedBlacks(matrix, x, y, direction, ignored);

    for (let i = 0; i < matrix.length; i++)
        for (let j = 0; j < matrix[i].length; j++) {
            // whites are already whites
            if (matrix[i][j] === Points.white)
                continue;
            // if not ignored, and we know it's definitely a black, then make it a white
            if (!ignored.find(e => e.y === i && e.x === j)) {
                matrix[i][j] = Points.white;
            }
        }

    return matrix;
}


const sample = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
]

console.log(removeIslands(sample));
