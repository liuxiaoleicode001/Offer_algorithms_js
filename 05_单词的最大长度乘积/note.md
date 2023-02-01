# 05. 单词长度的最大乘积
最近开始刷leetcode，遇到一道之前在考408也常常练习的类似题目，但是当时的优化仅仅是利用辅助数组，用空间换时间。但这道题由于只有26个字母，在int可以表示的范围内，故可以用一个int去代替辅助数组。并且里面用到了一些位运算的巧妙思想，笔者觉得十分受用。

**题目描述：** 给定一个字符串数组 words，请计算当两个字符串 words[i] 和 words[j] 不包含相同字符时，它们长度的乘积的最大值。假设字符串中只包含英语的小写字母。如果没有不包含相同字符的一对字符串，返回 0。
**样例**
输入: words = ["a","ab","abc","d","cd","bcd","abcd"]
输出: 4
解释: 这两个单词为 "ab", "cd"。

**第一想法:**  暴力解法：会用一个int类数组把26个字符出现与否进行标注，然后逐一比较。

**优化思路：**

1. 使用int mask 代替辅助数组
2. 提前计算所有字符串的mask，利用位运算中的<<和 |，可以实现先单独计算某一个字母在mask的位置，再异或得到整个字符串的mask，由于计算的时候是二进制字符串，在debug模式看到的mask会以十进制显示，可以自己模拟一下。
3. 使用mask去更新同样字母组成但长度不一样字符串的长度。

代码来自官方题解，笔者做了一些注释与例子，方便理解。

```javascript
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
```
