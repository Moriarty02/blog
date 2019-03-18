var arr=[1,2,3,[4,5],[6,[7,[8]]]]
/**
 * 使用递归的方式处理
 * wrap内保存结果ret 
 * 返回一个递归函数
 *
 * @returns
 */
function wrap(){
    var ret=[];
    return function flat(a){
        for(var item of a){
            if(item.constructor===Array){
                ret.concat(flat(item))
            }else{
                ret.push(item)
            }
        }
        return ret
    }
}
/**
 * 这是一个比较取巧的方法
 * 可以利用Array的toString方法将深度的值遍历出来
 * 但是因为toString方法会把数字转化为字符串所以需要map一下把数字转回来
 * 也是这个原因所以这个方法只适合全是数字的数组，如果类型不统一就不能这么了
 * @param {*} arr
 * @returns
 */
function flat2(arr){
    return arr.toString().split(",").map(Number)
}
/**
 * ES6 提供的原生方法
 * 接受一个参数 deep:boolean default false
 * false:只遍历一层，true:遍历多层
 * @param {*} arr
 * @returns
 */
function flat3(arr){
    return arr.flat(true)
}
//console.log(wrap()(arr));
//console.log(flat2(arr));
//console.log(flat3(arr))
console.log(Object.prototype.toString.call(arr));