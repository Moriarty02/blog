/**
 *
 *
 * @param {*} a
 * @param {*} b
 * @returns
/**
 *
 *
 * @param {*} a
 * @param {*} b
 * @returns
 */
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