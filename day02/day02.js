"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
function readInputFile(filename) {
    var filePath = (0, path_1.join)(__dirname, filename);
    return (0, fs_1.readFileSync)(filePath, 'utf-8');
}
var inputData = readInputFile("input.txt");
var lines = inputData.split("\n");
function isSafe(report) {
    var biggestChange = 0;
    var smallestChange = 0;
    var decreasing = false;
    var increasing = false;
    for (var i = 0; i < report.length - 1; i++) {
        if (report[i] < report[i - 1])
            decreasing = true;
        if (report[i] > report[i - 1])
            increasing = true;
        biggestChange = typeof biggestChange != "undefined" ? Math.max(biggestChange, Math.abs(report[i] - report[i - 1])) : Math.abs(report[i] - report[i - 1]);
        smallestChange = typeof smallestChange != "undefined" ? Math.min(smallestChange, Math.abs(report[i] - report[i - 1])) : Math.abs(report[i] - report[i - 1]);
        if ((decreasing && increasing) || (!decreasing && !increasing) || biggestChange > 3 || smallestChange < 1) {
            for (var j = 0; j < report.length; j++) {
                var temp = report.slice();
                temp.splice(j, 1);
                biggestChange = undefined;
                smallestChange = undefined;
                decreasing = false;
                increasing = false;
                for (var k = 1; k < temp.length; k++) {
                    if (temp[k] < temp[k - 1])
                        decreasing = true;
                    if (temp[k] > temp[k - 1])
                        increasing = true;
                    biggestChange = typeof biggestChange != "undefined" ? Math.max(biggestChange, Math.abs(temp[k] - temp[k - 1])) : Math.abs(temp[k] - temp[k - 1]);
                    smallestChange = typeof smallestChange != "undefined" ? Math.min(smallestChange, Math.abs(temp[k] - temp[k - 1])) : Math.abs(temp[k] - temp[k - 1]);
                }
                if (((decreasing && !increasing) || (!decreasing && increasing)) && biggestChange <= 3 && smallestChange >= 1)
                    break;
            }
            break;
        }
    }
    return ((decreasing && !increasing) || (!decreasing && increasing)) && biggestChange <= 3 && smallestChange >= 1;
}
var safeReports = 0;
var line = '';
var lineElementsString = [];
for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    lineElementsString = line.split(" ");
    var lineElements = lineElementsString.map(function (str) { return parseInt(str, 10); });
    if (isSafe(lineElements)) {
        safeReports++;
    }
}
console.log(safeReports);
