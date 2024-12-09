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
let pages: string[] = pagesToProduce.split('\n');

pages.forEach(page => {
    pagesToProduceList.push(page.split(','));
})

function sortPages(pages: string[]): string[] {
    for(let i=0; i < pages.length-1; i++){
        let currPage = pages[i];
        let nextPage = pages[i+1]
        let sorted: boolean = false;
        if(!correctOrder(currPage, nextPage)){
            pages[i+1] = currPage;
            pages[i] = nextPage;
            sortPages(pages)
        }
    }
    return pages;
}

function findIncorrectPages(pages: string[], index: number){
    for(let i=0; i < pages.length-1; i++){
        let currPage = pages[i];
        for(let j = i+1; j < pages.length; j++){
            let nextPage=pages[j];
            if(!correctOrder(currPage, nextPage)){
                return index;
            }
        }
    }
    return -1;
}

function correctOrder(firstPage: String, secondPage: String): boolean {
    let correctOrder: boolean = false;
    pageOrderingRulesPairs.forEach(rule => {
        if(rule[0] === firstPage && rule[1] === secondPage){
            correctOrder = true;
        }
    });
    return correctOrder;
}

let incorrectIndices: number[] = [];
pagesToProduceList.forEach((pages, index) => {
    let ind: number = findIncorrectPages(pages, index)
    if(ind !== -1) incorrectIndices.push(ind)

});

let sortedPagesToProduce: string[][] = pagesToProduceList;
pagesToProduceList.forEach((pages,index) => {
    sortedPagesToProduce[index] = sortPages(pages);

});

let sumOfMiddlePages: number = 0;
for(let i = 0; i < sortedPagesToProduce.length; i++) {
    if(incorrectIndices.includes(i)) {
        let nrPages: number = sortedPagesToProduce[i].length;
        let middleIndex: number = Math.floor(nrPages/2);
        sumOfMiddlePages += Number(sortedPagesToProduce[i][middleIndex]);
    }
}
console.log(sumOfMiddlePages);