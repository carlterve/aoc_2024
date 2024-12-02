"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
function readInputFile(filename) {
    var filePath = (0, path_1.join)(__dirname, filename);
    return (0, fs_1.readFileSync)(filePath, 'utf-8');
}
//console.log(readInputFile("input.txt"))
var inputData = readInputFile("input.txt");
var lines = inputData.split("\n");
//console.log(lines)
var safeReports = 0;
var nonSafeLevelDecreasing = 0;
var nonSafeLevelIncreasing = 0;
var nonSafeLevel = 0;
var line = '';
var lineElementsString = [];
var increasing = true;
var decreasing = true;
var lessThanFourMoreThanOne = true;
//Loop over each line/report
for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    lineElementsString = line.split(" ");
    var lineElements = lineElementsString.map(function (str) { return parseInt(str, 10); });
    decreasing = true;
    increasing = true;
    lessThanFourMoreThanOne = true;
    nonSafeLevelDecreasing = 0;
    nonSafeLevelIncreasing = 0;
    nonSafeLevel = 0;
    for (var j = 0; j < lineElements.length - 1; j++) {
        if (lineElements[j] > lineElements[j + 1]) {
            nonSafeLevelIncreasing++;
            if (lineElements[j] > lineElements[j + 2]) {
                nonSafeLevelIncreasing++;
                increasing = false;
            }
        }
        if (lineElements[j] < lineElements[j + 1]) {
            nonSafeLevelDecreasing++;
            if (lineElements[j] < lineElements[j + 2]) {
                nonSafeLevelDecreasing++;
                decreasing = false;
            }
        }
        if (Math.abs(lineElements[j] - lineElements[j + 1]) > 3 || Math.abs(lineElements[j] - lineElements[j + 1]) < 1) {
            nonSafeLevel++;
            if (Math.abs(lineElements[j] - lineElements[j + 2]) > 3 || Math.abs(lineElements[j] - lineElements[j + 2]) < 1) {
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
    if (increasing && (nonSafeLevelIncreasing + nonSafeLevel < 2))
        safeReports++;
    if (decreasing && (nonSafeLevelDecreasing + nonSafeLevel < 2))
        safeReports++;
}
console.log(safeReports);
