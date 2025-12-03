import { readInput } from "./utils/readInput.js";

const input = readInput(2);

function part1(input) {
    let sum = 0n;
    const ranges = input.split(",");
    for (let range of ranges) {
        let nums = range.split("-");
        for (let i = BigInt(nums[0]); i <= BigInt(nums[1]); i++) {
            if (String(i).length % 2 === 0) {
                let firstHalf = String(i).slice(0, (String(i).length / 2))
                let secondHalf = String(i).slice((String(i).length / 2))
                if (firstHalf === secondHalf) {
                    sum += i;
                }
            }
        }
    }
    return sum;
}

function part2(input) {
    let sum = 0n;
    const ranges = input.split(",");
    for (let range of ranges) {
        let nums = range.split("-");
        for (let i = BigInt(nums[0]); i <= BigInt(nums[1]); i++) {
            let length = String(i).length;
            if (length > 1) {
                for (let j = 1; j < length; j++) {
                    if (length % j === 0) {
                        let fragment = String(i).slice(0, j);
                        if (fragment.repeat(length / j) === String(i)) {
                            sum += i;
                            break;
                        }
                    }
                }
            }
        }
    }
    return sum;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));