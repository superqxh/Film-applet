function starZhuanArray(attr) {
    // 3.5 表示3个星星 1个半星星 数组表示为[1,1,1,2,0]
    var attr = Number(attr);
    var Arr = [];
    var num = parseInt(attr / 10);
    var num_Float = attr % 10;
    for (var i = 0; i < 5; i++) {
        if (i < num) {
            Arr.push(1);
        } else {
            Arr.push(0);
            if (num_Float == 5) {
                Arr[num] = 2;
            }
        }
    };
    return Arr;
} 

module.exports={
    starZhuanArray: starZhuanArray,
};
