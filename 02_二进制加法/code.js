var addBinary = function(a, b) {
    let maxLength = Math.max(a.length, b.length)
    let ans = ''
    let flag = false
    // 按位相加，从末尾到头
    for(let i = 1; i <= maxLength; i ++) {
        let curr = '0'

        // 当前字符
        let currA = a[a.length - i] || '0'
        let currB = b[b.length - i] || '0'

        // 1+1
        if(currA  === '1' && currB === '1') {
            //  1+1=0，进位=1
            if(flag) {
                curr = '1'
            }
            // 往上进了一位
            flag = true

        //    1+0 或者 0+1 的情况
        } else if(currA !== currB ) {
            // 0+1 再进一位 等于0 ，再进一位
            if(flag) {
                flag = true
            }
            // 0+1 不进位，等于1
            else {
                curr = '1'
            }
        }
        // 0 + 0 的情况
        else {
            // 0+0有进位
            if(flag) {
                curr = '1'
            }
            flag = false
        }
        // 往前衔接字符串
        ans = curr + ans
    }
    // 计算最后一次是否需要进位，若进位则最高位补1
    ans = flag ? '1' + ans : ans
    return ans
};

console.log(addBinary('101','111'))

