let list = [34, 1, 529, -78, 89.7, 1243];

function nativeSort(list) {
    return Math.max.apply(null, list);
}

function customSort(list) {
    let max = list[0];
    for (let i=1; i < list.length; i++){
        if (list[i] > max) {
            max = list[i];
        }
    }
    return max;
}

console.log(nativeSort(list), 'native');
console.log(customSort(list), 'custom');
