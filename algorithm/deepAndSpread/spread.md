### 使用DFS和BFS遍历百度首页的body元素

 #### DFS(深度优先搜索Depth First Search)主要思想就是 **假设初始状态是图中所有顶点均未被访问，则从某个顶点v出发，首先访问该顶点，然后依次从它的各个未被访问的邻接点出发深度优先搜索遍历图，直至图中所有和v有路径相通的顶点都被访问到。 若此时尚有其他顶点未被访问到，则另选一个未被访问的顶点作起始点，重复上述过程，直至图中所有顶点都被访问到为止。**

> 简单的，对于以下的二叉树，其实DFS就是前序遍历(根节点->左子树->右子树的遍历过程)

![二叉树](https://user-images.githubusercontent.com/11674767/55774038-0aa32800-5ac6-11e9-9ee7-b9a3410ff606.png)
>  前序遍历结果 0 1 3 7 8 4 9 2 5 6

**(一个二叉树结构前序遍历永远是根 左 右，1作为 0 1 2结构里面的左节点 同时 1 也是 1 3 4 这个结构的根节点，所以0遍历以后是遍历左子树既 1 3 4这个结构 第三层同理)
这样就不难看出DFS实际上就是一个递归访问的过程**

 **BFS(广度优先搜索 Breadth First Search)主要思想就是 从图中某顶点v出发，在访问了v之后依次访问v的各个未曾访问过的邻接点，然后分别从这些邻接点出发依次访问它们的邻接点，并使得“先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问，直至图中所有已被访问的顶点的邻接点都被访问到。如果此时图中尚有顶点未被访问，则需要另选一个未曾被访问过的顶点作为新的起始点，重复上述过程，直至图中所有顶点都被访问到为止。**

>  同样的，对于二叉树，其实BFS就是层序遍历,按照二叉树的层级一层一层往下边遍历

![二叉树](https://user-images.githubusercontent.com/11674767/55774043-0f67dc00-5ac6-11e9-9114-5d7d04170629.png)
>  层序遍历结果 0 1 2 3 4 5 6 7 8 9
 要实现这个其实更简单了,其实就是一个出队入队的过程

 接下来使用DFS对百度首页的body进行遍历
 ```javascript
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

```
一般的，需要递归解决的问题，都能用栈来解决
递归的好处在于代码便于理解，其代价就是会产生很深的调用栈,这个在斐波那契数列那一篇提到过
使用栈来实现可以避免这个问题，在这里访问一个节点以后将其pop出来 然后将他的子节点push到栈内，下次访问栈的时候pop出来
这样也是实现的深度优先遍历
```javascript
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
```
最后在使用BFS对body实现遍历
BFS在语意上其实更好理解,使用一个队列，开始访问的时候将root节点放入栈中，
之后如果有子节点就把所有的直接拼接到队列的末尾，待之前的队列访问完成以后再访问子节点的序列，如此便实现了层级访问
维护一个已访问数组的原因在于 在图的数据结构中，某一个节点存在多个上级访问路径，这样也就导致了重复访问的问题，
举个例子 比如只有两个节点的图 me---you 访问me以后将me出列 you入列 访问you的时候又会把me重新加入的队列中从而导致死循环
```javascript
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
```
### 额外的
BFS经常拿来处理最短路径问题，比如下棋时最少需要几步或者旅游路线问题（换乘数最少）
如果对于每条路线的赋予权重，则不好处理，需要使用另外的一个算法（ 迪杰特斯拉算法）来解决
迪杰特斯拉算法的实现核心思路就是维护一个从root出发到目标节点的所有路径的权重表

