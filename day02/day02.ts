import { readFileSync } from "fs";
import { join } from "path";

function readInputFile(filename: string): string {
    const filePath = join(__dirname,filename);
    return readFileSync(filePath, 'utf-8');
}

const inputData = readInputFile("input.txt")

const lines = inputData.split("\n");

function isSafe(report: number[]){
    let biggestChange: number | undefined = 0;
    let smallestChange: number | undefined = 0;
    let decreasing = false
    let increasing = false;
    for (let i = 0; i < report.length-1; i++) {
        if (report[i] < report[i - 1]) decreasing = true;
        if (report[i] > report[i - 1]) increasing = true;
        biggestChange = typeof biggestChange != "undefined" ? Math.max(biggestChange, Math.abs(report[i] - report[i - 1])) : Math.abs(report[i] - report[i - 1]);
        smallestChange = typeof smallestChange != "undefined" ? Math.min(smallestChange, Math.abs(report[i] - report[i - 1])) : Math.abs(report[i] - report[i - 1]);
        if ((decreasing && increasing) || (!decreasing && !increasing) || biggestChange > 3 || smallestChange < 1) {
            for (let j = 0; j < report.length; j++) {
                let temp = report.slice();
                temp.splice(j, 1);
                biggestChange = undefined;
                smallestChange = undefined;
                decreasing = false;
                increasing = false;
                for (let k = 1; k < temp.length; k++) {
                    if (temp[k] < temp[k - 1]) decreasing = true;
                    if (temp[k] > temp[k - 1]) increasing = true;
                    biggestChange = typeof biggestChange != "undefined" ? Math.max(biggestChange, Math.abs(temp[k] - temp[k - 1])) : Math.abs(temp[k] - temp[k - 1]);
                    smallestChange = typeof smallestChange != "undefined" ? Math.min(smallestChange, Math.abs(temp[k] - temp[k - 1])) : Math.abs(temp[k] - temp[k - 1]);
                }
                if (((decreasing && !increasing) || (!decreasing && increasing)) && biggestChange <= 3 && smallestChange >= 1) break;
            }
            break;
        }
    }

    return ((decreasing && !increasing) || (!decreasing && increasing)) && biggestChange <= 3 && smallestChange >= 1;
}

let safeReports: number = 0;
let line: string = '';
let lineElementsString: string [] = [];
for(let i=0; i < lines.length; i++) {
    line = lines[i]
    lineElementsString = line.split(" ");
    const lineElements = lineElementsString.map(str => parseInt(str, 10));
    if(isSafe(lineElements)){
        safeReports++;
    }
}
console.log(safeReports)

