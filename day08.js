import { readInput } from "./utils/readInput.js";

const input = readInput(8);

function part1(input) {
    const points = input.split("\n");
    const pairs = [];
    for (let i = 0; i < points.length; i++) {
        let iCoordinates = points[i].split(",");
        for (let j = i + 1; j < points.length; j++) {
            let jCoordinates = points[j].split(",");
            let distance = Math.sqrt(Math.pow(iCoordinates[0] - jCoordinates[0], 2) + Math.pow(iCoordinates[1] - jCoordinates[1], 2) + Math.pow(iCoordinates[2] - jCoordinates[2], 2));
            const pair = {
                points: `${points[i]}-${points[j]}`,
                distance: distance
            }
            pairs.push(pair);
        }
    }
    pairs.sort((a, b) => a.distance - b.distance);
    let circuits = [];
    for (let point of points) {
        circuits.push([point]);
    }
    for (let i = 0; i < 1000; i++) {
        let pair = pairs[i].points;
        let pairPoints = pair.split('-');
        let circuit1;
        let circuit2;
        for (let circuit of circuits) {
            if (circuit.includes(pairPoints[0])) {
                circuit1 = circuit;
            }
            if (circuit.includes(pairPoints[1])) {
                circuit2 = circuit;
            }
        }
        if (circuit1 !== circuit2) {
            circuit1.push(...circuit2);
            let index = circuits.indexOf(circuit2);
            circuits.splice(index, 1);
        }
    }
    circuits.sort((a, b) => b.length - a.length);
    return circuits[0].length * circuits[1].length * circuits[2].length;
}

function part2(input) {
    const points = input.split("\n");
    const pairs = [];
    for (let i = 0; i < points.length; i++) {
        let iCoordinates = points[i].split(",");
        for (let j = i + 1; j < points.length; j++) {
            let jCoordinates = points[j].split(",");
            let distance = Math.sqrt(Math.pow(iCoordinates[0] - jCoordinates[0], 2) + Math.pow(iCoordinates[1] - jCoordinates[1], 2) + Math.pow(iCoordinates[2] - jCoordinates[2], 2));
            const pair = {
                points: `${points[i]}-${points[j]}`,
                distance: distance
            }
            pairs.push(pair);
        }
    }
    pairs.sort((a, b) => a.distance - b.distance);
    let circuits = [];
    for (let point of points) {
        circuits.push([point]);
    }
    let i = 0;
    let lastPoints;
    while (circuits.length > 1) {
        let pair = pairs[i].points;
        let pairPoints = pair.split('-');
        let circuit1;
        let circuit2;
        for (let circuit of circuits) {
            if (circuit.includes(pairPoints[0])) {
                circuit1 = circuit;
            }
            if (circuit.includes(pairPoints[1])) {
                circuit2 = circuit;
            }
        }
        if (circuit1 !== circuit2) {
            circuit1.push(...circuit2);
            let index = circuits.indexOf(circuit2);
            circuits.splice(index, 1);
        }
        i++
        lastPoints = pairPoints;
    }
    let lastPoint1 = lastPoints[0].split(",");
    let lastPoint2 = lastPoints[1].split(",");
    return lastPoint1[0] * lastPoint2[0];
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));