class Node{
  constructor(data,left=null,right=null){
    this.data=data
    this.left=left
    this.right=right
  }
}
var node1= new Node(1)
var node2= new Node(2)
var node3=new Node(3)
var node4=new Node(4)
var node5=new Node(5)
var node6=new Node(6)
var node7=new Node(7)
var node8=new Node(8)
var node9=new Node(9)
node1.left=node2
node1.right=node3
node2.left=node4
node3.left=node5
node3.right=node6
node5.left=node7
node5.right=node8
node8.right=node9
function getLeftView(root){
  var deep=0;
  var result=[];
  (function leftView(node,level){
    if(!node)return
    if(deep<level){
      result.push(node.data)
      deep=level
    }
    leftView(node.right,level+1)            
    leftView(node.left,level+1)
  })(root,1)
  return result
}

var ret=getLeftView(node1)
console.log(ret);
