/**
 * 使用广度优先遍历 遍历百度首页的body元素
 *
 * @param {*} root
 */
function BreadthFirstTraversal(root){
  var  quene=[];
  var visited=[];
  quene.push(root);
  while(quene.length){
    var item=quene.shift();
    if(visited.indexOf(item)===-1){
      visited.push(item)
      console.log(`visited ${item['nodeName'].toLowerCase()} class=${item.classList.toString()}`);
      if(item.children.length>0){
        quene=[...quene,...item.children]
      }
    }
  }
  return visited
}
var root =document.getElementsByTagName("body")[0]
var list= BreadthFirstTraversal(root)
console.log(list);

//递归实现
function deepFirstTraversal(node,nodeList) {  
  if (node) {    
    nodeList.push(node);    
    var children = node.children;    
    for (var i = 0; i < children.length; i++) 
    deepFirstTraversal(children[i],nodeList);    
  }    
  return nodeList;  
}  
var root = document.getElementsByTagName('body')[0]
console.log(deepFirstTraversal(root,nodeList=[]))

// stack实现
function deepFirstTraversalWithStack(node){
    var nodeList=[];
    if(node){
      var stack=[];
      stack.push(node);
      while(stack.length!==0){
        var item=stack.pop();
        nodeList.push(item)
        var children=item.children;
        for(var i =0;i<children.length;i++){
          stack.push(children[i])
        }
      }
    }
    return nodeList
}