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
//console.log(stringToMatrix(inputData));
var matrix = stringToMatrix(inputData);
var nrRows = matrix.length;
var nrCols = matrix[0].length;
var xmasCounter = 0;
var regExpr1 = /(XMAS)+/g;
var regExpr2 = /(SAMX)+/g;
function searchWord(input) {
    for (var i = 0; i < input.length - 3; i++) {
        var word = input.substring(i, i + 4);
        var matchesXMAS = word.match(regExpr1);
        var matchesSAMX = word.match(regExpr2);
        if (matchesXMAS !== null) {
            //console.log(matchesXMAS);
            xmasCounter += matchesXMAS.length;
        }
        if (matchesSAMX !== null) {
            //console.log(matchesSAMX);
            xmasCounter += matchesSAMX.length;
        }
    }
}
//check horizontal forward & backward
function checkHorizontal(matrix) {
    var row = '';
    for (var i = 0; i < nrRows; i++) {
        row = matrix[i].join('');
        searchWord(row);
    }
}
//check vertical forward & backward
function checkVertical(matrix) {
    var col = '';
    for (var i = 0; i < nrCols; i++) {
        for (var j = 0; j < nrRows; j++) {
            col += matrix[j][i];
        }
        searchWord(col);
        col = '';
    }
}
function checkDiagonal(matrix) {
    var diag = '';
    for (var i = 0; i < nrRows + nrCols - 1; i++) {
        for (var row = 0; row < nrRows; row++) {
            var col = i - row;
            if (col >= 0 && col < nrCols) {
                diag += matrix[row][col];
            }
        }
        searchWord(diag);
        diag = '';
    }
    for (var i = -nrRows; i < nrCols; i++) {
        var diag_1 = '';
        for (var row = 0; row < nrRows; row++) {
            var col = i + row;
            if (col >= 0 && col < nrCols) {
                diag_1 += matrix[row][col];
            }
        }
        searchWord(diag_1);
        diag_1 = '';
    }
}
var regExpr3 = /(MAS)+/g;
var regExpr4 = /(SAM)+/g;
var counter2 = 0;
function searchXMAS(matrix) {
    for (var row = 1; row < nrRows - 1; row++) {
        for (var col = 1; col < nrCols - 1; col++) {
            var center = matrix[row][col];
            var topLeft = matrix[row - 1][col - 1];
            var topRight = matrix[row - 1][col + 1];
            var bottomLeft = matrix[row + 1][col - 1];
            var bottomRight = matrix[row + 1][col + 1];
            var diag1 = topLeft + center + bottomRight;
            var diag2 = topRight + center + bottomLeft;
            var matchesMAS1 = diag1.match(regExpr3);
            var matchesSAM1 = diag1.match(regExpr4);
            var matchesMAS2 = diag2.match(regExpr3);
            var matchesSAM2 = diag2.match(regExpr4);
            if ((matchesMAS1 !== null || matchesSAM1 !== null) && (matchesMAS2 !== null || matchesSAM2 !== null)) {
                counter2++;
            }
        }
    }
}
//part 1
checkHorizontal(matrix);
checkVertical(matrix);
checkDiagonal(matrix);
console.log(xmasCounter);
//part 2
searchXMAS(matrix);
console.log(counter2);
