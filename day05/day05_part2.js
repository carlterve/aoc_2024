"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
function readInputFile(filename) {
    var filePath = (0, path_1.join)(__dirname, filename);
    return (0, fs_1.readFileSync)(filePath, 'utf-8');
}
var pageOrderingRules = readInputFile("input1.txt");
var pagesToProduce = readInputFile("input2.txt");
var pageOrderingRulesPairs = [];
var ruleLines = pageOrderingRules.split('\n');
ruleLines.forEach(function (line) {
    var rule = line.split('|');
    pageOrderingRulesPairs.push(rule);
});
//console.log(pageOrderingRulesPairs);
var pagesToProduceList = [];
var pages = pagesToProduce.split('\n');
pages.forEach(function (page) {
    pagesToProduceList.push(page.split(','));
});
//console.log(pagesToProduceList);
function sortPages(pages) {
    for (var i = 0; i < pages.length - 1; i++) {
        var currPage = pages[i];
        var nextPage = pages[i + 1];
        var sorted = false;
        if (!correctOrder(currPage, nextPage)) {
            pages[i + 1] = currPage;
            pages[i] = nextPage;
            sortPages(pages);
        }
    }
    return pages;
}
function findIncorrectPages(pages, index) {
    for (var i = 0; i < pages.length - 1; i++) {
        var currPage = pages[i];
        for (var j = i + 1; j < pages.length; j++) {
            var nextPage = pages[j];
            if (!correctOrder(currPage, nextPage)) {
                return index;
            }
        }
    }
    return -1;
}
function correctOrder(firstPage, secondPage) {
    var correctOrder = false;
    pageOrderingRulesPairs.forEach(function (rule) {
        if (rule[0] === firstPage && rule[1] === secondPage) {
            correctOrder = true;
        }
    });
    return correctOrder;
}
var incorrectIndices = [];
pagesToProduceList.forEach(function (pages, index) {
    var ind = findIncorrectPages(pages, index);
    if (ind !== -1)
        incorrectIndices.push(ind);
});
var sortedPagesToProduce = pagesToProduceList;
pagesToProduceList.forEach(function (pages, index) {
    sortedPagesToProduce[index] = sortPages(pages);
});
var sumOfMiddlePages = 0;
for (var i = 0; i < sortedPagesToProduce.length; i++) {
    if (incorrectIndices.includes(i)) {
        var nrPages = sortedPagesToProduce[i].length;
        var middleIndex = Math.floor(nrPages / 2);
        sumOfMiddlePages += Number(sortedPagesToProduce[i][middleIndex]);
    }
}
console.log(sumOfMiddlePages);
