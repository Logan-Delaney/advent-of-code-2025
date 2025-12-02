import { readInput } from "./utils/readInput.js";

const input = readInput(1);

function part1(input) {
    let zeroCounter = 0;
    let arrowPosition = 50;

    for (let line of input.split("\n")) {

        const direction = line.charAt(0);
        const clicks = Number(line.slice(1));

        if (direction === 'L'){
            arrowPosition -= (clicks % 100);
        }
        else if (direction === 'R'){
            arrowPosition += (clicks % 100);
        }

        arrowPosition = ((arrowPosition % 100) + 100) % 100;

        if (arrowPosition === 0){
            zeroCounter++;
        }
    }
    return zeroCounter;
}

function part2(input) {
    let zeroCounter = 0;
    let arrowPosition = 50;

    for (let line of input.split("\n")) {
        const direction = line.charAt(0);
        const clicks = Number(line.slice(1));

        let distanceToZero = 0;
        if (direction === 'R'){
            distanceToZero = (100 - arrowPosition) % 100;
        }
        else {
            distanceToZero = arrowPosition % 100
        }

        if (distanceToZero === 0) distanceToZero = 100;

        if (distanceToZero <= clicks) {
            zeroCounter += 1 + Math.floor((clicks - distanceToZero) / 100);
        }

        if (direction === 'R'){
            arrowPosition = (arrowPosition + clicks) % 100
        }
        else {
            arrowPosition = (arrowPosition - clicks % 100)
            if (arrowPosition < 0){
                arrowPosition += 100
            }
        }
    }
    return zeroCounter;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));