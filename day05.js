import { readInput } from "./utils/readInput.js";

const input = readInput(5);
const data = input.split('\n\n');
let rangeStrings = data[0].split('\n');
let ranges = [];
for (let range of rangeStrings) {
    let temp = (range.split('-'));
    temp[0] = Number(temp[0]);
    temp[1] = Number(temp[1]);
    ranges.push(temp);
}
let nums = data[1].split('\n');



const buildTree = (ranges) => {
    if (ranges.length < 1) {
        return null;
    }
    const startAndEnd = [];
    for (let range of ranges) {
        startAndEnd.push(range[0]);
        startAndEnd.push(range[1]);
    }
    startAndEnd.sort((a, b) => a - b);
    let median = startAndEnd[(Math.round(startAndEnd.length / 2))];
    let node = {
        midpoint: median,
        intervals: [],
    };
    let leftRanges = [];
    let rightRanges = [];
    for (let range of ranges) {
        if (range[1] < node.midpoint) {
            leftRanges.push(range);
        }
        else if (range[0] > node.midpoint) {
            rightRanges.push(range);
        }
        else {
            node.intervals.push(range);
        }
    }
    node.left = buildTree(leftRanges);
    node.right = buildTree(rightRanges);
    return node;
}

const queryTree = (tree, num) => {
    for (let range of tree.intervals) {
        if (num >= range[0] && num <= range[1]) {
            return true;
        }
    }
    if (num < tree.midpoint && tree.left != null) {
        return queryTree(tree.left, num);
    }
    else if (num > tree.midpoint && tree.right != null) {
        return queryTree(tree.right, num);
    }
    else {
        return false;
    }
}

function part1() {
    let counter = 0;
    const tree = buildTree(ranges);
    for (let num of nums) {
        let result = queryTree(tree, Number(num));
        if (result) {
            counter++
        }
    }
    return counter;
}

function part2() {
    let sortedRanges = ranges.sort((a, b) => a[0] - b[0]);
    let mergedRanges = [];
    let workingRange = sortedRanges[0];
    for (let i = 1; i < sortedRanges.length; i++) {
        if (sortedRanges[i][0] <= workingRange[1]) {
            if (sortedRanges[i][1] > workingRange[1]) {
                workingRange[1] = sortedRanges[i][1];
            }
        }
        else {
            mergedRanges.push(workingRange);
            workingRange = sortedRanges[i];
        }
    }
    mergedRanges.push(workingRange);
    let total = 0;
    for (let range of mergedRanges) {
        total += (range[1] - range[0] + 1);
    }
    return total;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());