import { readInput } from "./utils/readInput.js";

const input = readInput(3);

function part1(input) {
    let maximumJoltage = 0;
    const batteries = input.split("\n");
    for (let battery of batteries) {
        let high = 0;
        let position = 0;
        for (let i = 0; i < (battery.length - 1); i++) {
            if (Number(battery[i]) > high){
                high = Number(battery[i]);
                position = i;
            }
        }
        let remainingDigits = battery.slice(position + 1);
        let secondDigit = 0;
        for (let j = 0; j < (remainingDigits.length); j++) {
            if (Number(remainingDigits[j]) > secondDigit) {
                secondDigit = Number(remainingDigits[j]);
            }
        }
        maximumJoltage += Number((String(high) + String(secondDigit)));
    }
    return maximumJoltage;
}

function part2(input) {
    let maximumJoltage = 0n;
    const batteries = input.split("\n");
    for (let battery of batteries) {
        let nums = [];
        for (let i = 12; i > 0; i--){
            let high = 0;
            let position = 0;
            for (let j = 0; j <= battery.length - i; j++){
                if (Number(battery[j]) > high){
                    high = Number(battery[j]);
                    position = j;
                }
            }
            nums.push(high)
            battery = battery.slice(position + 1);
        }
        maximumJoltage += BigInt(nums.reduce((acc, curr) => acc + String(curr), ''));
    }
    return maximumJoltage;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));