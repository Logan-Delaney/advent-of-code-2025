import { readInput } from "./utils/readInput.js";

const input = readInput(7);

let callCount = 0;

function part1(input) {
    const matrix = input.split("\n").map(row => row.split(""));
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] === "S") {
            matrix[1][i] = '|';
        }
    }
    let splitCount = 0;
    for (let i = 1; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '.' && matrix[i - 1][j] === '|') {
                matrix[i][j] = '|';
            } else if (matrix[i][j] === '^' && matrix[i - 1][j] === '|') {
                splitCount++;
                if (j + 1 < matrix[i].length && matrix[i][j + 1] === '.') {
                    matrix[i][j + 1] = '|';
                }
                if (j - 1 >= 0) {
                    if (matrix[i][j - 1] === '.') {
                        matrix[i][j - 1] = '|';
                    }
                }
            }
        }
    }
    return splitCount;
}

// function branchPaths(matrix, row, column) {
//     let count = 0;
//     if (row >= matrix.length - 1) return 1;
//     for (let i = row; i < matrix.length; i++) {
//         for (let j = column; j < matrix[i].length; j++) {
//             if (i >= matrix.length - 1) return 1;
//             let left = 0;
//             let right = 0;
//             if (matrix[i][j] === '.' && matrix[i - 1][j] === '|') {
//                 matrix[i][j] = '|';
//             } else if (matrix[i][j] === '^' && matrix[i - 1][j] === '|') {
//                 const rightMatrix = matrix.map(row => [...row]);
//                 const leftMatrix = matrix.map(row => [...row]);
//                 if (j + 1 < matrix[i].length && matrix[i][j + 1] === '.') {
//                     rightMatrix[i][j + 1] = '|';
//                     console.log('going right')
//                     right = branchPaths(rightMatrix, i + 1, 0)
//                 }
//                 if (j - 1 >= 0) {
//                     if (matrix[i][j - 1] === '.') {
//                         leftMatrix[i][j - 1] = '|';
//                         console.log('going left')
//                         left = branchPaths(leftMatrix, i + 1, 0)
//                     }
//                 }
//                 return count + right + left;
//             }
//         }
//     }
//     return 1;
// }

function countPaths(matrix, row, column, track) {
    callCount++;
    console.log(callCount);
    const key = `${row},${column}`;
    if (track[key] !== undefined) {
        return track[key];
    }
    if (row >= matrix.length || column < 0 || column >= matrix[0].length) {
        return 1;
    }
    const cell = matrix[row][column];
    let result = 0;
    if (cell === "^") {
        result = countPaths(matrix, row + 1, column - 1, track) + countPaths(matrix, row + 1, column + 1, track);
    }
    else {
        result = countPaths(matrix, row + 1, column, track);
    }
    track[key] = result;
    return result;
}

function part2(input) {
    const matrix = input.split("\n").map(row => row.split(""));
    let col = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] === "S") {
            col = i
        }
    }
    const track = {}
    return countPaths(matrix, 1, col, track);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));