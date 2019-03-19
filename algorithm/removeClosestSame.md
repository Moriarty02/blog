> 中级算法03

描述:去除相邻相同的元素

> input

`[2, 2 ,2 ,3 ,4 ,4 ,3, 7, 7, 8 ,9]`

> output

`[8,9]`

> tips:

1. 2 2 2 相邻且相同所以都去掉
2. 4 4 相消以后3 3 又相邻了哟~

> 我的解法:

这个题目是我在面试北京的一家在线教育的公司的时候被问到的，
这个题目比较在意的地方就是上面tips提到2点：
1. 要实现3 4 4 3这样的消除：
我第一个想到的就是使用栈结构，入栈和栈顶做比较；
2. 至于2 2 2 这种我考虑的是:
在维护栈结构的同时还维护一个flag字段 作为之前最近一次相消的缓存值，从而保证2 2消除以后
接下来的2还能因为与缓存值相同而被消除

> 实现:

```
var arr=[2, 2, 2, 3, 4, 4, 3, 7, 7, 8, 9, 4, 5, 5, 5, 4, 9]
//[1,2,43,56] 因为55抵消以后44相邻相等 然后6 6相邻相等
function removeClosestSameNum(arr){
    var stack=[];
    var i =0;
     var flag;
     while(i<arr.length){
         if(arr[i]!==stack[stack.length-1]&&arr[i]!==flag){
             stack.push(arr[i++])
         }else if(arr[i]===stack[stack.length-1]){
           flag=arr[i++];
           stack.pop()
         }else{
             i++
         }
     }
  
   
    return stack
}
console.log(removeClosestSameNum(arr));
```