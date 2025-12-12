import { readInput } from "./utils/readInput.js";

const input = readInput(9);

function part1(input) {
    const points = input.split("\n");
    const pairs = [];
    for (let i = 0; i < points.length; i++) {
        let iCoordinates = points[i].split(",");
        for (let j = i + 1; j < points.length; j++) {
            let jCoordinates = points[j].split(",");
            if (iCoordinates[0] !== jCoordinates[0] && iCoordinates[1] !== jCoordinates[1]) {
                let side1 = ((Math.max(iCoordinates[0], jCoordinates[0])) - (Math.min(iCoordinates[0], jCoordinates[0])) + 1);
                let side2 = ((Math.max(iCoordinates[1], jCoordinates[1])) - (Math.min(iCoordinates[1], jCoordinates[1])) + 1);
                let area = side1 * side2;
                const pair = {
                    points: `${points[i]}-${points[j]}`,
                    area: area,
                }
                pairs.push(pair);
            }
        }
    }
    pairs.sort((a, b) => b.area - a.area);
    return pairs[0].area;
}

function part2(input) {
    const points = input.split("\n");
    let xPoints = [];
    let yPoints = [];
    let splitPoints = [];
    for (let point of points) {
        let both = point.split(",");
        xPoints.push(parseInt(both[0]));
        yPoints.push(parseInt(both[1]));
        splitPoints.push([parseInt(both[0]), parseInt(both[1])]);
    }
    const maxX = Math.max.apply(Math, xPoints);
    const maxY = Math.max.apply(Math, yPoints);
    const matrix = Array.from({ length: maxY + 1 }, () => ({
        min: maxX,
        max: 0,
    }));
    let lastPoint = splitPoints[0];
    for (let i = 1; i < splitPoints.length; i++) {
        if (lastPoint[0] === splitPoints[i][0]) {
            let max = Math.max(lastPoint[1], splitPoints[i][1]);
            let min = Math.min(lastPoint[1], splitPoints[i][1]);
            let x = lastPoint[0];
            for (let j = min; j <= max; j++) {
                if (x < matrix[j].min){
                    matrix[j].min = x;
                }
                if (x > matrix[j].max){
                    matrix[j].max = x;
                }
            }
        }
        else if (lastPoint[1] === splitPoints[i][1]) {
            let max = Math.max(lastPoint[0], splitPoints[i][0]);
            let min = Math.min(lastPoint[0], splitPoints[i][0]);
            let y = lastPoint[1];
            for (let j = min; j <= max; j++) {
                if (j < matrix[y].min){
                    matrix[y].min = j;
                }
                if (j > matrix[y].max){
                    matrix[y].max = j;
                }
            }
        }
        lastPoint = splitPoints[i];
    }
    if (splitPoints[0][0] === lastPoint[0]) {
        let maxY = Math.max(splitPoints[0][1], lastPoint[1]);
        let minY = Math.min(splitPoints[0][1], lastPoint[1]);
        let x = lastPoint[0];
        for (let j = minY; j <= maxY; j++) {
            if (x < matrix[j].min){
                matrix[j].min = x;
            }
            if (x > matrix[j].max){
                matrix[j].max = x;
            }
        }
    } else if (splitPoints[0][1] === lastPoint[1]) {
        let maxX = Math.max(splitPoints[0][0], lastPoint[0]);
        let minX = Math.min(splitPoints[0][0], lastPoint[0]);
        let y = lastPoint[1];
        for (let j = minX; j <= maxX; j++) {
            if (j < matrix[y].min){
                matrix[y].min = j;
            }
            if (j > matrix[y].max){
                matrix[y].max = j;
            }
        }
    }
    let maxArea = 0;

    for (let i = 0; i < splitPoints.length; i++) {
        for (let j = i + 1; j < splitPoints.length; j++) {
            let [x1, y1] = splitPoints[i];
            let [x2, y2] = splitPoints[j];

            let minY = Math.min(y1, y2);
            let maxY = Math.max(y1, y2);
            let minX = Math.min(x1, x2);
            let maxX = Math.max(x1, x2);

            let valid = true;
            for (let y = minY; y <= maxY; y++) {
                if (minX < matrix[y].min || maxX > matrix[y].max) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                let area = (maxX - minX + 1) * (maxY - minY + 1);
                if (area > maxArea) {
                    maxArea = area;
                }
            }
        }
    }
    return maxArea;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));