var foo={
  value:1
}
function bar(name,age){
 return {
  value: this.value,
  name: name,
  age: age
 }
}
Function.prototype.call2=function(context){
  context=context||window;
  context.fn=this;
  var args=[];
  for(var i=1,len=arguments.length;i<len;i++){
    args.push('arguments['+i+']');
  }
  var result=eval('context.fn('+args+')')
  delete context.fn;
  return result
}
console.log('result ',bar.call2(foo,"zxh",'18'));
Function.prototype.apply2=function(context,arr){
  context=context||window;
  context.fn=this;
  var result;
  if(!arr){
    result=context.fn()
  }else{
    var args=[];
    for(var i =0,len=arr.length;i<len;i++){
      args.push('arr['+i+']')
    }
    result=eval('context.fn('+args+')')
  }
  delete context.fn;
  return result;
}

Function.prototype.bind2=function(context){
  var self=this;
  var args=Array.prototype.slice.call(arguments,1)
  return function(){
    var bindArgs=Array.prototype.slice(arguments)
    return context.apply(context,args.concat(bindArgs))
  }
}
// 下面这个是为了解决bind的函数作为构造函数的异常情况
// 才疏学浅  目前的我还不怎么理解为啥bind的函数拿来做构造函数
//看着脑壳疼
Function.prototype.bind2 = function (context) {

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}