//过滤掉数组中相邻相同的元素
//var arr=[2, 2 ,2 ,3 ,4 ,4 ,3, 7, 7, 8 ,9]
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