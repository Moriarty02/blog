### leetCode 199 输出二叉树的右视图
> 描述: 二叉树的右视图(类似)

原题中是用数组来渲染一个满二叉树 数组坐标是有对应关系的.
数组索引index的左节点索引为2index,右节点索引为2index+1
对应起来就和下面的解法异曲同工了
> 原题是遍历的一个满二叉树，这里使用class重新构建这个二叉树 形象一点哈
```javascript
class Node{
  constructor(data,left=null,right=null){
    this.data=data
    this.left=left
    this.right=right
  }
}
var node1= new Node(1)
var node2= new Node(2)
var node3= new Node(3)
var node4= new Node(4)
var node5= new Node(5)
var node6= new Node(6)
var node7= new Node(7)
var node8= new Node(8)
var node9= new Node(9)
node1.left=node2
node1.right=node3
node2.left=node4
node3.left=node5
node3.right=node6
node5.left=node7
node5.right=node8
node8.right=node9
```
以上的二叉树大概是这么一个样子
![binaryTree](https://user-images.githubusercontent.com/11674767/56939311-3ac86e80-6b3a-11e9-98ca-a21fad3567c0.jpg)
> 我的思路

这个题目咋一眼还有点3D转换的意思，仔细观察上面的二叉树，所谓的右视图就是按照输出每一层的最后一个
这个地方用层级遍历肯定是可解开的，但是我最后的实现使用DFS（深度优先遍历）来实现,之所以用这个方式来
实现是因为针对这个题目有一个小的细节，如果我从顶部往下遍历做DFS，遍历的某个节点的时候，只会存在两种情况
1 .当前节点还有子节点 则需要输出子节点，继续递归
2. 当前子节点没有节点 说明访问过的层级（deep）的右视图已经建立，只需要从当前层级+1接着遍历
> 实现
```javascript
  function getLeftView(root){
    var deep=0;//维护访问过的层级
    var result=[];
    (function leftView(node,level){//核心代码就是这个递归函数
      if(!node)return//空节点返回
      if(deep<level){
        result.push(node.data)
        deep=level
      }
      //DFS就是递归 会一直访问到没有子节点为止
      //在这里永远优先访问右节点，只有到没有右节点时才会去访问左节点
      //右视图
      leftView(node.right,level+1)
      leftView(node.left,level+1)
      //左视图 交换一下即可
      //leftView(node.left,level+1)      
      //leftView(node.right,level+1)  
            
    })(root,1)
    return result
  }

var ret=getLeftView(node1)
console.log(ret);//[ 1, 3, 6, 8, 9 ]
```


