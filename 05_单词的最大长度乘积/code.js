var maxProduct = function(words) {
    const map = new Map();
    // 有几个字符串
    const length = words.length;
    for (let i = 0; i < length; i++) {
        let mask = 0;
        // 遍历每一个字符串
        const word = words[i];
        const wordLength = word.length;
        //
        for (let j = 0; j < wordLength; j++) {
            // mask是从左到右排序，所以用字母和a转换成Unicode 编码计算二者的差值，
            // 例如a和b差1，然后将1左移差值位，与mask异或单个字母的mask。异或不同字母为1，相同字母为0
            mask |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
        }
        // Map.get()方法用于获取Map中所有元素中的特定元素，若出现cd、cdddd这种mask相同但是长度不相等的，会在map更新字符串长度
        if (wordLength > (map.get(mask) || 0)) {
            map.set(mask, wordLength);//对应key value
        }
    }
    let maxProd = 0;
    // key代表mask，将map里的key转成数组
    const maskSet = Array.from(map.keys());
    for (const mask1 of maskSet) {
        // 获取mask对应最长单词的长度
        const wordLength1 = map.get(mask1);
        // 遍历所有单词
        for (const mask2 of maskSet) {
            // 如果两个单词完全不一样，mask
            // &：两个数值的个位分别相与
            // 例如：a和ab ，mask： 1&11，最低为都为1，那么结果为1
            // a:1,1
            // b,2,10,
            // ab,3,11
            // c 4,100
            if ((mask1 & mask2) === 0) {
                const wordLength2 = map.get(mask2);
                maxProd = Math.max(maxProd, wordLength1 * wordLength2);
            }
        }
    }
    return maxProd;
};
console.log(maxProduct(["a","ab","abc","d","cd","bcd","abcd","cdddd"]))
