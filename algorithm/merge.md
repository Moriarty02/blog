###简单算法01
###描述：将两个有序数组合并为一个有序数组，时间复杂度O(n)
###input
```
var arr1=[1, 3, 5, 7, 9, 22];
var arr2=[2, 4, 6, 8, 8, 10, 11];
```
###output:
```
[ 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 22 ]

```

###我的解法:
因为两个数组本身是有序,我想到两种思路

1. 新建一个数组，2个游标遍历两个数组，按照大小一次插入到新的数组中
2. 这个题目换个思路是在一个有序数组中插入另外一个有序数组，但是考虑到插入本身需要移动后续数组item的位置，既调用splice插入消耗的操作更多，这个其实可以不考虑

实现：

 ```
 function merge(a, b) {
    const ret = []
    let aIndex = 0
    let bIndex = 0
    while(aIndex < a.length || bIndex < b.length) {
      if(a[aIndex] < b[bIndex]) {
        ret.push(a[aIndex++])
      } else if(a[aIndex] > b[bIndex]) {
        ret.push(b[bIndex++])
      } else {
          //相等就都插入
        if(a[aIndex] !== undefined) {
          ret.push(a[aIndex++])
        }
        if(b[bIndex] !== undefined) {
          ret.push(b[bIndex++])
        }
      }
    }
    //这个地方起初有这么一个考虑，如果两个数组不等长，可以先把等长的部分做合并
    然后直接将多出来的那部分拼接到最后，因为本身有序，多出来的部分肯定比前面的大，这样可以减少一些对比次数
    // if(aIndex < a.length) {
    //   return ret.concat(a.slice(aIndex))
    // }
    // if(bIndex < b.length) {
    //   return ret.concat(b.slice(bIndex))
    // }
    return ret
  }
  const ret = merge([1, 3, 5, 7, 9, 22], [2, 4, 6, 8, 8, 10, 11])
  console.log(ret)
 
 ```

