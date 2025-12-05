import { readInput } from "./utils/readInput.js";

const input = readInput(4);

const adjacentPositions = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]]

const getAdjacentCharacters = (matrix, i, j) => {
    let adjacentCharacters = [];
    for (let position of adjacentPositions) {
        let newRow = i + position[0];
        let newCol = j + position[1];
        if (newRow < 0 || newCol < 0 || newRow >= matrix.length || newCol >= matrix[0].length) {
            adjacentCharacters.push('.');
        }
        else {
            adjacentCharacters.push(matrix[newRow][newCol]);
        }
    }
    return adjacentCharacters;
}

function part1(input) {
    const matrix = input.split("\n").map(row => row.split(''));
    let counter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '@') {
                const adjacentCharacters = getAdjacentCharacters(matrix, i, j);
                if ((adjacentCharacters.filter((char) => char === '@')).length < 4) {
                    counter++;
                }
            }
        }
    }
    return counter;
}

const matrix = input.split("\n").map(row => row.split(''));

function part2(matrix) {
    let counter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '@') {
                const adjacentCharacters = getAdjacentCharacters(matrix, i, j);
                if ((adjacentCharacters.filter((char) => char === '@')).length < 4) {
                    matrix[i][j] = '.';
                    counter++;
                }
            }
        }
    }
    if (counter === 0) {
        return 0;
    }
    else{
        return counter + part2(matrix);
    }
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(matrix));