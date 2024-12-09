import { readFileSync } from "fs";
import { join } from "path";

function readInputFile(filename: string): string {
    const filePath = join(__dirname,filename);
    return readFileSync(filePath, 'utf-8');
}

const pageOrderingRules = readInputFile("input1.txt");
const pagesToProduce = readInputFile("input2.txt");

let pageOrderingRulesPairs: string[][] = [];

let ruleLines = pageOrderingRules.split('\n')

ruleLines.forEach(line => {
    let rule = line.split('|');
    pageOrderingRulesPairs.push(rule);
})

let pagesToProduceList: string[][] = [];
let pages = pagesToProduce.split('\n');

pages.forEach(page => {
    pagesToProduceList.push(page.split(','));
})

let notOkIndex: number [] = [];
function sortPages() {
     for(let j = 0; j < pagesToProduceList.length; j++){   
        let currPages = pagesToProduceList[j];
        for(let i=0; i < currPages.length-1; i++){
            let currPage = currPages[i];
            let nextPage = currPages[i+1];
            if(!correctOrder(currPage, nextPage)) {
                if(!notOkIndex.includes(j))
                    notOkIndex.push(j);
            }
        }
    }
}

function correctOrder(firstPage: String, secondPage: String): boolean {
    let correct: boolean = false;
    pageOrderingRulesPairs.forEach(rule => {
        if(rule[0] === firstPage && rule[1] === secondPage){
            correct = true;
        }
    });
    return correct;
}

sortPages();

let sumOfMiddlePages: number = 0;

for(let i = 0; i < pagesToProduceList.length; i++) {
    if(!notOkIndex.includes(i)) {
        let nrPages: number = pagesToProduceList[i].length;
        let middleIndex: number = Math.round((nrPages/2)-1);
        sumOfMiddlePages += Number(pagesToProduceList[i][middleIndex]);
    }
}

console.log(sumOfMiddlePages);