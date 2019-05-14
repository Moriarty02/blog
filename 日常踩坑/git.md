#### gitignore文件对某些文件不生效的原因:
> 新建的文件在git中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore中已经声明了忽略路径也是不起作用的，这时候我们就应该先把本地缓存删除，然后再进行git的push

```bash
git rm -r --cached .#.为所有文件 针对单个文件使用文件路径
git add .
git commit -m 'update .gitignore'

```
#### git 日常操作
加入暂存区 git add filename/directory 
git add . 暂存所有新增文件和修改文件

提交暂存到本地库
git commit -m "message"

查看提交记录 
git log --pretty=oneline

版本回退
在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100
//就是这条了 用git add .进入暂存的文件 可以用下面的文件回退掉 不过修改也没了
git reset --hard HEAD
回到指定版本 HEAD换成对应hash

1. 撤掉

a、如果还没 git add file ，使用该指令进行撤销：  git checkout -- fileName 

b、如果已经git add file  ， 但是没有 git commit -m ""  分两步操作：
	b-1、git reset HEAD readme.txt

	b-2、git  status

	b-3、git checkout -- file

c、如果已经git add file 并且已经 git commit ,那么回退版本办法是：

	c-1、通过 git log 或者 git log --pretty=oneline 、git reflog

	c-2、找到对应的commit id进行回退：git reset --hard 1094a


2. 删除

现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit：

a、git rm test.txt

b、git commit -m "remove test.txt"

