import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function readInput(day) {
    const padded = day.toString().padStart(2, "0");
    const file = path.join(__dirname, "..", "inputs", `day${padded}.txt`);
    return fs.readFileSync(file, "utf8").trim();
}