#### gitignore文件对某些文件不生效的原因:
> 新建的文件在git中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore中已经声明了忽略路径也是不起作用的，这时候我们就应该先把本地缓存删除，然后再进行git的push

```bash
git rm -r --cached .#.为所有文件 针对单个文件使用文件路径
git add .
git commit -m 'update .gitignore'

```
