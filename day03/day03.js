"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
function readInputFile(filename) {
    var filePath = (0, path_1.join)(__dirname, filename);
    return (0, fs_1.readFileSync)(filePath, 'utf-8');
}
function findMultipliers(inputText, pattern) {
    var matches = inputText.match(pattern);
    return matches ? matches : [];
}
;
function removeUnwantedChars(input, pattern) {
    for (var i = 0; i < input.length; i++) {
        var regExpArray = input[i].match(pattern);
        if (regExpArray !== null)
            input[i] = regExpArray[0];
    }
    return input;
}
;
var inputData = readInputFile("input.txt");
// const pattern: RegExp = /mul\(\d+,\d+\)/g;
var pattern = /(don't\(\))+|(do\(\))+|mul\(\d+,\d+\)/g;
var data = findMultipliers(inputData, pattern);
var pattern2 = /[\d,]+|(don't\(\))+|(do\(\))+/g;
var data2 = removeUnwantedChars(data, pattern2);
//console.log(data2)
var sum = 0;
var doMultiplication = true;
for (var i = 0; i < data2.length; i++) {
    if (data2[i] === "don't()") {
        doMultiplication = false;
    }
    else if (data2[i] === "do()") {
        doMultiplication = true;
    }
    else {
        if (doMultiplication) {
            var multipliers = data2[i].split(",", 2);
            sum += Number(multipliers[0]) * Number(multipliers[1]);
        }
    }
}
console.log(sum);
