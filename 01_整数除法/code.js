var divide = function (a, b) {
    // 定义最大值2^31,最小值2^31-1
    const INT_MIN = -Math.pow(2, 31)
    const INT_MAX = Math.pow(2, 31) - 1

    // 当-2147483648/-1 = 2147483648,结果会越界，故需要判断（1）当a=-2147483648且b=-1时，直接返回2147483648。
    if (a === INT_MIN && b === -1) return INT_MAX

    let res = 0

    // 处理边界，防止转正数溢出
    // 除数绝对值最大，结果必为 0 或 1，相当于1/无穷=0
    if (b === INT_MIN) {
        return a === b ? 1 : 0;
    }

    // 被除数先减去一个除数,处理边界，-2147483648转换成正数2147483648会越界。
    if (a === INT_MIN) {
        a -= -Math.abs(b);//a= a-(-Math.abs(b))，-2147483645 = -2147483648 - （-x）,相当于放大一些
        res += 1;
    }

    // 符号
    const sign = (a > 0) ^ (b > 0) ? -1 : 1
    a = Math.abs(a)
    b = Math.abs(b)

    for (let x = 31; x >= 0; x--) {
        // 右移怎么都不会越界
        // 因为前面已经减了一次了，所以不用无符号移位也是可以的
        // 如果b=-2147483648，那么(a >>> x)  >= b会永真，但1-（-2147483648）=-2147483647，这样就为false了
        if ((a >> x) - b >= 0) {//相当于a>=(b<<i),也就是把b放大变成了把a缩小
            a = a - (b << x)
            res = res + (1 << x)
        }
    }
    return sign === 1 ? res : -res
};


console.log(divide( -2147483647, -1))