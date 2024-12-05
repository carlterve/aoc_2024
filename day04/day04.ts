import { readFileSync } from "fs";
import { join } from "path";

function readInputFile(filename: string): string {
    const filePath = join(__dirname,filename);
    return readFileSync(filePath, 'utf-8');
}

//console.log(readInputFile("input.txt"))

const inputData = readInputFile("input.txt")

function stringToMatrix(input: string): string[][] {
    let matrix: string[][] = [];
    let matrixRow: string[] = [];
    for(let char of input) {
        if(char === '\n'){
            matrix.push(matrixRow);
            matrixRow = []
        }else{
            matrixRow.push(char);
        }
    }
    if(matrixRow.length > 0) {
        matrix.push(matrixRow);
    }
    return matrix;
}


//console.log(stringToMatrix(inputData));
const matrix = stringToMatrix(inputData);
let nrRows= matrix.length;
let nrCols= matrix[0].length;
let xmasCounter: number = 0;
let regExpr1: RegExp = /(XMAS)+/g;
let regExpr2: RegExp = /(SAMX)+/g;

function searchWord(input: string) {
    for(let i = 0; i < input.length - 3; i++) {
        let word = input.substring(i,i+4)
        const matchesXMAS = word.match(regExpr1);
        const matchesSAMX = word.match(regExpr2);
        if(matchesXMAS !== null) {
            //console.log(matchesXMAS);
            xmasCounter += matchesXMAS.length;
        }
        if(matchesSAMX !== null) {
            //console.log(matchesSAMX);
            xmasCounter += matchesSAMX.length;
        }
    }
}
//check horizontal forward & backward
function checkHorizontal(matrix: string[][]){
    let row: string = ''

    for(let i = 0; i < nrRows; i++) {
        row = matrix[i].join('')

        searchWord(row);
    }
}
//check vertical forward & backward
function checkVertical(matrix: string[][]){
    let col: string = ''

    for(let i = 0; i < nrCols; i++) {
        for(let j = 0; j < nrRows; j++) {
            col += matrix[j][i];
        }
        searchWord(col);
        col=''
    }
}

function checkDiagonal(matrix: string[][]){
    let diag: string = ''

    for(let i = 0; i < nrRows + nrCols - 1; i++) {
        for(let row = 0; row < nrRows; row++) {
            const col = i - row
            if(col >= 0 && col < nrCols) {
                diag += matrix[row][col]
            }
        }
        searchWord(diag);
        diag=''
    }

    for(let i = -nrRows; i < nrCols; i++) {
        let diag: string = ''
        for(let row = 0; row < nrRows; row++) {
            const col = i + row;
            if(col >= 0 && col < nrCols) {
                diag += matrix[row][col]
            }
        }
        searchWord(diag);
        diag=''
    }
}

let regExpr3: RegExp = /(MAS)+/g;
let regExpr4: RegExp = /(SAM)+/g;
let counter2: number = 0
function searchXMAS(matrix: string[][]) {
    for(let row = 1; row < nrRows - 1; row++) {
        for(let col = 1; col < nrCols - 1; col++) {
            let center: string = matrix[row][col];
            let topLeft: string  = matrix[row - 1][col - 1]
            let topRight: string  = matrix[row - 1][col + 1]
            let bottomLeft: string  = matrix[row + 1][col - 1]
            let bottomRight: string  = matrix[row + 1][col + 1]

            let diag1: string = topLeft + center + bottomRight
            let diag2: string  = topRight + center + bottomLeft

            let matchesMAS1 = diag1.match(regExpr3)
            let matchesSAM1 = diag1.match(regExpr4)
            let matchesMAS2 = diag2.match(regExpr3)
            let matchesSAM2 = diag2.match(regExpr4)

            if((matchesMAS1 !== null || matchesSAM1 !== null) && (matchesMAS2 !== null || matchesSAM2 !== null)) {
                counter2++
            }
        }
    }
}
//part 1
checkHorizontal(matrix)
checkVertical(matrix)
checkDiagonal(matrix)
console.log(xmasCounter)
//part 2
searchXMAS(matrix)
console.log(counter2)