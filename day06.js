import { readInput } from "./utils/readInput.js";

const input = readInput(6);

function doMath(nums, operator) {
    let total = 0;
    switch(operator.trim()) {
        case "+":
            for (let num of nums){
                total += Number(num);
            }
            break;
        case "*":
            total = 1
            for (let num of nums){
                total *= Number(num);
            }
            break;
    }
    return total;
}

function getSpaceColumns (matrix) {
    let spaceColumns = [];
    for (let i = 0; i < matrix[0].length; i++) {
        let chars = [];
        for (let j = 0; j < matrix.length; j++) {
            chars.push(matrix[j][i]);
        }
        let isSpaceColumn = true;
        for (let char of chars) {
            if (char !== ' '){
                isSpaceColumn = false;
            }
        }
        if (isSpaceColumn) {
            spaceColumns.push(i);
        }
    }
    return spaceColumns;
}

function getNewMatrix (matrix, spaceColumns) {
    let newMatrix = [[]];
    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i] = [];
        let holding = '';
        const maxLength = Math.max(...matrix.map(row => row.length));
        for (let j = 0; j < maxLength; j++) {
            if (spaceColumns.includes(j)) {
                newMatrix[i].push(holding);
                holding = '';
            }
            else {
                if (matrix[i][j] === undefined) {
                    matrix[i][j] = ' '
                }
                holding += matrix[i][j];
            }
        }
        newMatrix[i].push(holding);
    }
    return newMatrix;
}

function getNums (nums) {
    const numMatrix = [[]];
    for (let i = 0; i < nums.length; i++) {
        numMatrix[i] = [];
        let num = nums[i];
        let chars = num.split('')
        for (let char of chars) {
            numMatrix[i].push(char);
        }
    }
    let newNums = [];
    for (let i = numMatrix[0].length - 1; i >= 0; i--) {
        let holding = '';
        for (let j = 0; j < numMatrix.length; j++) {
            holding += numMatrix[j][i];
        }
        newNums.push(holding.trim());
    }
    return newNums;
}

function part1(input) {
    const matrix = input.split("\n").map(row => row.split(/\s+/));
    let total = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        const operator = matrix[(matrix.length - 1)][i];
        const nums = [];
        for (let j = 0; j < matrix.length - 1; j++) {
            nums.push(matrix[j][i])
        }
        let result = doMath(nums, operator);
        total += result;
    }
    return total;
}

function part2(input) {
    const matrix = input.split("\n").map(row => row.split(''));
    const spaceColumns = getSpaceColumns(matrix);
    const newMatrix = getNewMatrix(matrix, spaceColumns);
    let total = 0;
    for (let i = 0; i < newMatrix[0].length; i++) {
        const operator = newMatrix[(newMatrix.length - 1)][i];
        const nums = [];
        for (let j = 0; j < newMatrix.length - 1; j++) {
            nums.push(newMatrix[j][i])
        }
        let newNums = getNums(nums);
        let result = doMath(newNums, operator);
        total += result;
    }
    return total;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));