import { readFileSync } from "fs";
import { join } from "path";

function readInputFile(filename: string): string {
    const filePath = join(__dirname,filename);
    return readFileSync(filePath, 'utf-8');
}

function findMultipliers(inputText: string, pattern: RegExp): String[] {
    const matches = inputText.match(pattern)
    return matches ? matches: [];
};

function removeUnwantedChars(input: String[], pattern: RegExp): String[] {
    for(let i=0; i < input.length; i++) {
        let regExpArray: RegExpMatchArray | null = input[i].match(pattern);
        if(regExpArray !== null)
            input[i] = regExpArray[0];
    }
    return input;
};

const inputData = readInputFile("input.txt");

const pattern: RegExp = /(don't\(\))+|(do\(\))+|mul\(\d+,\d+\)/g;

let data: String[] = findMultipliers(inputData, pattern)
const pattern2: RegExp = /[\d,]+|(don't\(\))+|(do\(\))+/g;
let data2: String[] = removeUnwantedChars(data, pattern2)

let sum: number = 0;
let doMultiplication: boolean = true

for(let i = 0; i<data2.length; i++) {
    if(data2[i] === "don't()"){
        doMultiplication=false
    }else if(data2[i] === "do()"){
        doMultiplication=true
    }else{
        if(doMultiplication) {
            let multipliers: String[] = data2[i].split(",",2);
            sum += Number(multipliers[0]) * Number(multipliers[1]);
        }
    }
}

console.log(sum)


