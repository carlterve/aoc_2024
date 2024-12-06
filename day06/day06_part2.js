"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        if (nextPos === '.' || nextPos === 'x') {
            matrix[row][guardCurrCol] = 'x';
            matrix[row - 1][guardCurrCol] = '^';
            withinArea = true;
        }
        else if (nextPos === '#' || nextPos === 'O') {
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
        if (nextPos === '.' || nextPos === 'x') {
            matrix[row][guardCurrCol] = 'x';
            matrix[row + 1][guardCurrCol] = 'v';
            withinArea = true;
        }
        else if (nextPos === '#' || nextPos === 'O') {
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
        if (nextPos === '.' || nextPos === 'x') {
            matrix[guardCurrRow][col] = 'x';
            matrix[guardCurrRow][col + 1] = '>';
            withinArea = true;
        }
        else if (nextPos === '#' || nextPos === 'O') {
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
        if (nextPos === '.' || nextPos === 'x') {
            matrix[guardCurrRow][col] = 'x';
            matrix[guardCurrRow][col - 1] = '<';
            withinArea = true;
        }
        else if (nextPos === '#' || nextPos === 'O') {
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
    //Im assuming here that it wont take more than 100 iterations of walking in either direction
    //Please ignore this ugly mess
    iter++;
    if (iter > 500) {
        nrLoops++;
        console.log(nrLoops);
        return false;
    }
    return withinArea;
}
function part2() {
    return __awaiter(this, void 0, void 0, function () {
        var matrixCopy, row, col;
        return __generator(this, function (_a) {
            matrixCopy = matrix;
            for (row = 0; row < nrRows; row++) {
                for (col = 0; col < nrCols; col++) {
                    matrixCopy = stringToMatrix(inputData);
                    if (matrixCopy[row][col] === '.') {
                        matrixCopy[row][col] = 'O';
                        while (walkTheGuard(matrixCopy))
                            ;
                        iter = 0;
                    }
                }
            }
            console.log(nrLoops);
            return [2 /*return*/];
        });
    });
}
var nrLoops = 0;
var iter = 0;
var inputData = readInputFile("input.txt");
var matrix = stringToMatrix(inputData);
var nrRows = matrix.length;
var nrCols = matrix[0].length;
part2();
