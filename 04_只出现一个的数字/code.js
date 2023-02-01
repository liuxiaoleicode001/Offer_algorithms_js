var singleNumber = function(nums) {
    nums.sort(function(a,b){  //用于将数组排序
        // 排序从小到大
        return a - b
    })
    let len = nums.length
    let [i,j] = [0,2]  //将初始值指向第一个和第三个
    while(i<len){
        if(nums[i] != nums[j]){  //当不相等的时候，就代表nums[i]即为那个单独的值
            return nums[i]
        }
        else {      //一直三个三个往后跳
            i+=3
            j+=3
        }
    }

};

console.log(singleNumber([1,1,5,2,1]))