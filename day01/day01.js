var LocationIds1 = [];
var LocationIds2 = [];
LocationIds1.sort();
LocationIds2.sort();
var counter = 0;
for (var i = 0; i < LocationIds1.length; i++) {
    for (var j = 0; j < LocationIds2.length; j++) {
        if (LocationIds1[i] === LocationIds2[j])
            counter++;
    }
    LocationIds1[i] = LocationIds1[i] * counter;
    counter = 0;
}
var sum = LocationIds1.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log(sum);
