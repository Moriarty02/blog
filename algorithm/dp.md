> Fibonacci数列

```
f(0)=1
f(1)=1
f(n)=f(n-1)+f(n-2)
```
简而言之，斐波拉契数列就是第一项和第二项为 1和1 
第n项=第n-1项+第n-2项

这是我学C语言编程递归的第一课

> 使用递归求解
```

var fibonacci=function(n){
  if(n<1)return 0;
  if(n===1){
    return 1;
  }
  return fibonacci(n-1)+fibonacci(n-2)
}
```
学过递归的同学都知道虽然递归求解斐波拉契，代码上很好理解，
但是在实际运行中却是不尽人意，递归求解这个问题最大的弊端就在于**存在反复的重新计算**
比如计算fib(3)=fib(2)+fib(1)
实际上在计算fib(4)=fib(3)+fib(2)=fib(2)+fib(1)+fib(2)

> 如下图:

![20170715205029376](https://user-images.githubusercontent.com/11674767/54795503-6f1d5500-4c87-11e9-8d2e-ddbc2df4d99a.jpg)


既把计算f(n)替换为了反复叠加f(2)和f(1),这个在开销上实际上是特别大
如上图，计算一个f(6)实际等同于
1.f(5) 1次
2.f(4) 2次
3.f(3) 3次
4.f(2) 5次
5.f(1) 3次
这种思路是没有问题，
但是问题在于**执行过程中反复去求解f(2)+f(1)的值，实际上我们计算一次f(2)+f(1)之后
我们已经知道f(2)+f(1)既f(3)应该是多少，不需要再重复计算了**

所以这里就引入了我对动态规划的一个理解:**记住已经计算过的值**
记住求解的方式有两种：

### 1.自顶向下的备忘录法
#### 在一个数组中记录已经计算过的值，下次计算先查是否已经计算，如果是，直接取，不再重新计算

```
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
```
上面的递归树中在计算fib（6）的时候先计算fib（5），调用fib（5）算出了fib（4）后，fib（6）再调用fib（4）就不会在递归fib（4）的子树了，因为fib（4）的值已经保存在Memo[4]中
### 2.自底向上的动态规划方法

#### 先解决子问题，再根据子问题求解父问题
比如这里求解f(4)【父问题】 需要f(3)+f(2) 既求解f(3) 而f(3)=f(2)+f(1) 既求解f(2)
反向思考就变成一个自底向上的累加过程先求解f(1)   f(2)    f(3)...
```
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
```
自底向上方法也是利用数组保存了先计算的值，为后面的调用服务

### 额外的
#### 因为斐波拉契的特殊性 实际参与计算的值只有三个既 n n-1 n-2所以可以通过三个参数的互相赋值减少记录的memo数组

```
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
```
下一篇:动态规划的典型求解