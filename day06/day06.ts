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

let nrRows = matrix.length;
let nrCols = matrix[0].length;
function findGuard(matrix: string[][]): number[]{
    let guardPosition: number[]= []
    for(let row = 0; row < nrRows; row++){
        for(let col = 0; col < nrCols; col++){
            if(matrix[row][col] === '^' || matrix[row][col] === 'v' || matrix[row][col] === '>' || matrix[row][col] === '<' ) {
                guardPosition.push(row);
                guardPosition.push(col);
                return guardPosition;
            }
        }
    }
    return guardPosition;
}

function walkUp(matrix: string[][], guardPosition: number []): boolean{
    let guardCurrRow = guardPosition[0];
    let guardCurrCol= guardPosition[1];
    let withinArea: boolean = false;
    
    for(let row = guardCurrRow; row >= 1; row--){
        let nextPos = matrix[row-1][guardCurrCol];
        if(nextPos === '.' || nextPos === 'X'){
            matrix[row][guardCurrCol] = 'X';
            matrix[row-1][guardCurrCol] = '^';
            withinArea=true;
        }else if(nextPos === '#'){
            matrix[row][guardCurrCol] = '>';
            withinArea=true;
            break;
        }
    }
    return withinArea;
}
function walkDown(matrix: string[][], guardPosition: number []): boolean{
    let guardCurrRow = guardPosition[0];
    let guardCurrCol= guardPosition[1];
    let withinArea: boolean = false;
    for(let row = guardCurrRow; row < nrRows - 1; row++){
        let nextPos = matrix[row+1][guardCurrCol];
        if(nextPos === '.' || nextPos === 'X'){
            matrix[row][guardCurrCol] = 'X';
            matrix[row+1][guardCurrCol] = 'v';
            withinArea=true;
        }else if(nextPos === '#'){
            matrix[row][guardCurrCol] = '<';
            withinArea=true;
            break;
        }
    }
    return withinArea;
}
function walkRight(matrix: string[][], guardPosition: number []){
    let guardCurrRow = guardPosition[0];
    let guardCurrCol= guardPosition[1];
    let withinArea: boolean = false;
    for(let col = guardCurrCol; col < nrCols - 1; col++){
        let nextPos = matrix[guardCurrRow][col+1];
        if(nextPos === '.' || nextPos === 'X'){
            matrix[guardCurrRow][col] = 'X';
            matrix[guardCurrRow][col+1] = '>';
            withinArea=true;
        }else if(nextPos === '#'){
            matrix[guardCurrRow][col] = 'v';
            withinArea=true;
            break;
        }
    }
    return withinArea;
}
function walkLeft(matrix: string[][], guardPosition: number []){
    let guardCurrRow = guardPosition[0];
    let guardCurrCol= guardPosition[1];
    let withinArea: boolean = false;
    for(let col = guardCurrCol; col >= 1; col--){
        let nextPos = matrix[guardCurrRow][col-1];
        if(nextPos === '.' || nextPos === 'X'){
            matrix[guardCurrRow][col] = 'X';
            matrix[guardCurrRow][col-1] = '<';
            withinArea=true;
        }else if(nextPos === '#'){
            matrix[guardCurrRow][col] = '^';
            withinArea = true
            break;
        }
    }
    return withinArea;
}

function walkTheGuard(matrix: string[][]): boolean {
    let guardPosition: number[] = findGuard(matrix);
    let guardDirection: string = matrix[guardPosition[0]][guardPosition[1]];
    let withinArea:boolean = false;
    if(guardDirection === '^'){
        withinArea =  walkUp(matrix, guardPosition);
    }else if(guardDirection === 'v'){
        withinArea = walkDown(matrix, guardPosition);
    }else if(guardDirection === '>'){
        withinArea = walkRight(matrix, guardPosition)
    }else if(guardDirection === '<'){
        withinArea = walkLeft(matrix, guardPosition)
    }else{
        console.log("WE LOST THE GUARD!");
    }
    return withinArea;
} 

//part 2
function part2() {
    let matrixCopy: string[][] = matrix
    for(let row = 0; row < nrRows; row++){
        for(let col = 0; col < nrCols; col++){
            if(matrixCopy[row][col] === '.'){
                matrixCopy[row][col] = 'O';
                while(walkTheGuard(matrixCopy))
            }
        }
    }
}






//part 1
//start at 1 to account for exiting step
function part1(){
    while(walkTheGuard(matrix));
    let counter: number = 1;
    let line: string = ''
    for(let row = 0; row < nrRows; row++){
        line = ''
        for(let col = 0; col < nrCols; col++){
            line += matrix[row][col];
            if(matrix[row][col] === 'X')
                counter++
        }
        console.log(line);
    }
    console.log(counter)
};