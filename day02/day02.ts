import { readFileSync } from "fs";
import { join } from "path";

function readInputFile(filename: string): string {
    const filePath = join(__dirname,filename);
    return readFileSync(filePath, 'utf-8');
}

//console.log(readInputFile("input.txt"))

const inputData = readInputFile("input.txt")

const lines = inputData.split("\n");

//console.log(lines)
let safeReports: number = 0
let nonSafeLevelDecreasing: number = 0
let nonSafeLevelIncreasing: number = 0
let nonSafeLevel: number = 0
let line: string = ''
let lineElementsString: string[] = []
let increasing: boolean = true;
let decreasing: boolean = true;
let lessThanFourMoreThanOne: boolean = true;

//Loop over each line/report
for(let i=0; i < lines.length; i++) {
    line = lines[i]
    lineElementsString= line.split(" ");
    const lineElements = lineElementsString.map(str => parseInt(str, 10));

    decreasing =true;
    increasing=true;
    lessThanFourMoreThanOne=true;
    nonSafeLevelDecreasing=0
    nonSafeLevelIncreasing=0
    nonSafeLevel=0
    for(let j=0; j < lineElements.length - 1; j++) {
        if(lineElements[j] > lineElements[j+1]) {
            nonSafeLevelIncreasing++;
            if(lineElements[j] > lineElements[j+2]) {
                nonSafeLevelIncreasing++;
                increasing = false;
            }
        }
        if(lineElements[j] < lineElements[j+1]) {
            nonSafeLevelDecreasing++;
            if(lineElements[j] < lineElements[j+2]) {
                nonSafeLevelDecreasing++;
                decreasing = false;
            }
        }
        if(Math.abs(lineElements[j] - lineElements[j+1]) > 3 || Math.abs(lineElements[j] - lineElements[j+1]) < 1) {
            nonSafeLevel++;  
            if(Math.abs(lineElements[j] - lineElements[j+2]) > 3 || Math.abs(lineElements[j] - lineElements[j+2]) < 1) {
                nonSafeLevel++;
            }
        }        
    }

        // console.log("increasing: " + increasing)
        // console.log("decreasing: " + decreasing)
        // console.log("nonSafeLevelIncreasing: " + nonSafeLevelIncreasing)
        // console.log("nonSafeLevelDecreasing: " + nonSafeLevelDecreasing)
        // console.log("nonSafeLevel: " + nonSafeLevel)
        // console.log(line)
        // console.log("------")

    if(increasing && (nonSafeLevelIncreasing + nonSafeLevel < 2))
        safeReports++;
    if(decreasing && (nonSafeLevelDecreasing + nonSafeLevel < 2))
        safeReports++;
}

console.log(safeReports);
