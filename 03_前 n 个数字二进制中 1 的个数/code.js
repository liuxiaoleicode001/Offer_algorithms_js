// 给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。

// 方法1：直接使用toString
var countBits1 = function(n) {
    let res = []
    // toString()方法可以根据所传递的参数把数值转换为对应进制的数字字符串。
    for (let num = 0; num <= n; num++) {
        let twoNum = num.toString(2)
        // console.log(twoNum);
        let cnt = 0
        for (let ch of twoNum) {
            if (ch === '1') cnt++
        }
        res.push(cnt)
    }
    return res
};

// console.log(countBits1(9))

//方法二：动态规划——最低有效位
var countBits2 = function(n) {
    const bits = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        // bits[i >> 1] 为2/bits的二进制数1的个数
        // i & 1 == 1 为奇数
        // i & 1 == 0 为偶数
        bits[i] = bits[i >> 1] + (i & 1);
    }
    return bits;
};
console.log(countBits2(5))