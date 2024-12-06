"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
function readInputFile(filename) {
    var filePath = (0, path_1.join)(__dirname, filename);
    return (0, fs_1.readFileSync)(filePath, 'utf-8');
}
function stringToMatrix(input) {
    var matrix = [];
    var matrixRow = [];
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var char = input_1[_i];
        if (char === '\n') {
            matrix.push(matrixRow);
            matrixRow = [];
        }
        else {
            matrixRow.push(char);
        }
    }
    if (matrixRow.length > 0) {
        matrix.push(matrixRow);
    }
    return matrix;
}
function findGuard(matrix) {
    var guardPosition = [];
    for (var row = 0; row < nrRows; row++) {
        for (var col = 0; col < nrCols; col++) {
            if (matrix[row][col] === '^' || matrix[row][col] === 'v' || matrix[row][col] === '>' || matrix[row][col] === '<') {
                guardPosition.push(row);
                guardPosition.push(col);
                return guardPosition;
            }
        }
    }
    return guardPosition;
}
function walkUp(matrix, guardPosition) {
    var guardCurrRow = guardPosition[0];
    var guardCurrCol = guardPosition[1];
    var withinArea = false;
    for (var row = guardCurrRow; row >= 1; row--) {
        var nextPos = matrix[row - 1][guardCurrCol];
        if (nextPos === '.' || nextPos === 'X') {
            matrix[row][guardCurrCol] = 'X';
            matrix[row - 1][guardCurrCol] = '^';
            withinArea = true;
        }
        else if (nextPos === '#') {
            matrix[row][guardCurrCol] = '>';
            withinArea = true;
            break;
        }
    }
    return withinArea;
}
function walkDown(matrix, guardPosition) {
    var guardCurrRow = guardPosition[0];
    var guardCurrCol = guardPosition[1];
    var withinArea = false;
    for (var row = guardCurrRow; row < nrRows - 1; row++) {
        var nextPos = matrix[row + 1][guardCurrCol];
        if (nextPos === '.' || nextPos === 'X') {
            matrix[row][guardCurrCol] = 'X';
            matrix[row + 1][guardCurrCol] = 'v';
            withinArea = true;
        }
        else if (nextPos === '#') {
            matrix[row][guardCurrCol] = '<';
            withinArea = true;
            break;
        }
    }
    return withinArea;
}
function walkRight(matrix, guardPosition) {
    var guardCurrRow = guardPosition[0];
    var guardCurrCol = guardPosition[1];
    var withinArea = false;
    for (var col = guardCurrCol; col < nrCols - 1; col++) {
        var nextPos = matrix[guardCurrRow][col + 1];
        if (nextPos === '.' || nextPos === 'X') {
            matrix[guardCurrRow][col] = 'X';
            matrix[guardCurrRow][col + 1] = '>';
            withinArea = true;
        }
        else if (nextPos === '#') {
            matrix[guardCurrRow][col] = 'v';
            withinArea = true;
            break;
        }
    }
    return withinArea;
}
function walkLeft(matrix, guardPosition) {
    var guardCurrRow = guardPosition[0];
    var guardCurrCol = guardPosition[1];
    var withinArea = false;
    for (var col = guardCurrCol; col >= 1; col--) {
        var nextPos = matrix[guardCurrRow][col - 1];
        if (nextPos === '.' || nextPos === 'X') {
            matrix[guardCurrRow][col] = 'X';
            matrix[guardCurrRow][col - 1] = '<';
            withinArea = true;
        }
        else if (nextPos === '#') {
            matrix[guardCurrRow][col] = '^';
            withinArea = true;
            break;
        }
    }
    return withinArea;
}
function walkTheGuard(matrix) {
    var guardPosition = findGuard(matrix);
    var guardDirection = matrix[guardPosition[0]][guardPosition[1]];
    var withinArea = false;
    if (guardDirection === '^') {
        withinArea = walkUp(matrix, guardPosition);
    }
    else if (guardDirection === 'v') {
        withinArea = walkDown(matrix, guardPosition);
    }
    else if (guardDirection === '>') {
        withinArea = walkRight(matrix, guardPosition);
    }
    else if (guardDirection === '<') {
        withinArea = walkLeft(matrix, guardPosition);
    }
    else {
        console.log("WE LOST THE GUARD!");
    }
    return withinArea;
}
function part1() {
    while (walkTheGuard(matrix))
        ;
    var counter = 1;
    var line = '';
    for (var row = 0; row < nrRows; row++) {
        line = '';
        for (var col = 0; col < nrCols; col++) {
            line += matrix[row][col];
            if (matrix[row][col] === 'X')
                counter++;
        }
        console.log(line);
    }
    console.log(counter);
}
;
var inputData = readInputFile("input.txt");
var matrix = stringToMatrix(inputData);
var nrRows = matrix.length;
var nrCols = matrix[0].length;
part1();
