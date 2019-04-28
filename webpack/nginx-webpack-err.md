###  fix nginx代理localhost:8080的请求 websocket 400的错误
一般情况下，在本地开发中，前端会自己起一个本地服务的环境。
需要给本地服务指定一个端口，一般为8080（webpack-devServer默认）或者其他的端口，一般不会去用80端口，因为nginx要使用80端口
> 现在我想用nginx代理到8080上，这样我就可以通过访问http://local.test.yyzhuishu.com/exchange.html
而不是访问
http://local.test.yyzhuishu.com:8080/exchange.html
这是原来的配置
webpack.local.config.js
```javascript
//导入基础配置
var baseConfig = require('./webpack.base.js')('development', null, entryLocal);
baseConfig.devServer = {
  contentBase: './dist',
  disableHostCheck: true,//取消域名的检查
  //下面三个参数通过package.json script配置
  // "dev": "webpack-dev-server --config webpack.dev.config.js 
  //--hot-only true --hot false"
  hot: true,
  hotOnly: false,
  quiet: false
};
```
> 配置nginx的目录 /usr/local/etc/nginx/servers 新建一个符合nginx配置的 XXX.conf
nginx配置
```shell
server{
  listen 80;
  server_name local.test.yyzhuishu.com;
  location / {
    proxy_cache off;
    expires 0;
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
 }
```
这里主要用到了localtion的proxy_pass配置，本地nginx遇到(匹配 /)根目录的请求
>eg:  http://local.test.yyzhuishu.com/exchange.html

就代理到http://localhost:8080上
但是 当我访问http://local.test.yyzhuishu.com/exchange.html 的时候浏览器抛出来一个错误
sockjs.js:1683 WebSocket connection to 'ws://localhost/sockjs-node/399/zouzxqsk/websocket' failed: Error during WebSocket handshake: Unexpected response code: 400
![1556444177798](https://user-images.githubusercontent.com/11674767/56862744-dc3bad00-69e0-11e9-9f76-2217e6fd5720.jpg)

解决办法:
nginx多配置以下两个参数
```shell
server{
  listen 80;
  server_name local.test.yyzhuishu.com;
  location / {
    proxy_cache off;
    expires 0;
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
    #新增以下两个参数
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
 }
}
```
websocket的请求带上这俩参数就没有问题了
![upgrade](https://user-images.githubusercontent.com/11674767/56862745-e52c7e80-69e0-11e9-93ee-447e151d7d6f.jpg)


