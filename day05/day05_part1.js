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
var pagesToProduceList = [];
var pages = pagesToProduce.split('\n');
pages.forEach(function (page) {
    pagesToProduceList.push(page.split(','));
});
var notOkIndex = [];
function sortPages() {
    for (var j = 0; j < pagesToProduceList.length; j++) {
        var currPages = pagesToProduceList[j];
        for (var i = 0; i < currPages.length - 1; i++) {
            var currPage = currPages[i];
            var nextPage = currPages[i + 1];
            if (!correctOrder(currPage, nextPage)) {
                currPages[i] = nextPage;
                currPages[i + 1] = currPage;
                pagesToProduceList[j] = currPages;
                //sortPages();
            }
        }
    }
}
function correctOrder(firstPage, secondPage) {
    var correct = false;
    pageOrderingRulesPairs.forEach(function (rule) {
        if (rule[0] === firstPage && rule[1] === secondPage) {
            correct = true;
        }
    });
    return correct;
}
sortPages();
var sumOfMiddlePages = 0;
for (var i = 0; i < pagesToProduceList.length; i++) {
    var nrPages = pagesToProduceList[i].length;
    var middleIndex = Math.round((nrPages / 2) - 1);
    sumOfMiddlePages += Number(pagesToProduceList[i][middleIndex]);
}
console.log(sumOfMiddlePages);
