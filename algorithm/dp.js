var fibonacci=function(n){
  if(n<1)return 0;
  if(n===1){
    return 1;
  }
  return fibonacci(n-1)+fibonacci(n-2)
}
// const ret=fibonacci(6)
// console.log(ret);
//自顶而下的备忘录法
var fibonacci2=function(n){
  var memo=[];
 
  if(n<=0)return 0;
  var fib=function(n,memo){
    if(memo[n])return memo[n];
    if(n<=2){
      memo[n]=1
    }else{
      memo[n]=fib(n-1,memo)+fib(n-2,memo)
    }
    return memo[n]
  }
  return fib(n,memo)
}

//自底向上
var fibonacci3=function(n){
  var memo=[0,1];
    if(n<=0){
      return n;
    }
   if(n<2){
     return memo[n]
   }
   for(let i =2;i<=n;i++){
     memo[i]=memo[i-1]+memo[i-2]
   }
   return memo[n]

}
var fibonacci4=function(n){
  if(n<0)return 0;
  if(n<=1){
    return n
  }
  var num1=0,
  num2=1,
  num2_1=1;
  for(var i=2;i<=n;i++){
    num2_1=num1+num2    
    num1=num2;
    num2=num2_1;
  }
  return num2_1
}
const ret=fibonacci4(6);
console.log(ret);