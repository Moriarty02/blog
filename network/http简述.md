### HTTP简述（1）- 浏览器network里面能看到的信息

#### HTTP简介:
HTTP（超文本传输协议）是应用层上的一种客户端/服务端模型的通信协议,它由请求和响应构成，且是无状态的。

 keyword: 协议 
> 协议规定了通信双方必须遵循的数据传输格式，这样通信双方按照约定的格式才能准确的通信。

 keyword:无状态
> 无状态是指两次连接通信之间是没有任何关系的，每次都是一个新的连接，服务端不会记录前后的请求信息。

#### 客户端/服务端模型

![tu1](https://user-images.githubusercontent.com/11674767/55047679-8e015a00-5080-11e9-8b56-494ebc572e91.png)

HTTP在五层网络模型的应用层，也就是说HTTP是基于TCP（ 传输层协议）的上层协议,
建立HTTP连接需要先建立TCP连接 既三次握手建立，四次挥手断开
![五层模型](https://user-images.githubusercontent.com/11674767/55047690-99ed1c00-5080-11e9-9ed5-688d59e7af19.png)

#### 协议内容
##### 请求
 客户端发送给服务端的格式 请求行+请求头+请求体
![请求报文](https://user-images.githubusercontent.com/11674767/55047703-a6717480-5080-11e9-8ee2-68917bae0aa2.png)

##### 响应
 服务端响应客户端格式： 状态行 响应头 响应体
![响应](https://user-images.githubusercontent.com/11674767/55047708-aa9d9200-5080-11e9-96a3-3c0c4bf20de4.png)


 #### 状态码
 HTTP状态码由三个十进制数字组成，第一个十进制数字定义了状态码的类型，后两个数字没有分类的作用。HTTP状态码共分为5种类型：
 
| 分类 | 分类描述 | 
| ------ | ------ | 
| 1** | 信息，服务器收到请求，需要请求者继续执行操作 | 
| 2** | 成功，操作被成功接收并处理 |
| 3** | 重定向，需要进一步的操作以完成请求 |
| 301 | 临时重定向 |
| 302 | 永久重定向 |
| 304 | 未更改(缓存相关的code)    |
| 4** | 客户端错误，请求包含语法错误或无法完成请求 |
| 400 | 语法有误 |
| 401 | 需要验证 |
| 5** | 服务器错误，服务器在处理请求的过程中发生了错误 |

> 302在浏览器端能否被xhr或者fetch捕获到么
> 1.xhr是不能的,因为302会被浏览器处理到新的地址去拿资源[You shouldn't redirect the call when it's an XHR but respond with a 401 Unauthorized and handle this in your callbacks. I don't know ASP.NET but I did something similar with Spring Security.](https://stackoverflow.com/questions/15996779/cannot-handle-302-redirect-in-ajax-and-why/15996968#15996968)
> 2. fetch 默认是不可以的，但是如果配置{redirect:'manual'}可以捕获到，
这个设置在chrome被修改过一次
[Fetch API: Request.redirect](https://www.chromestatus.com/feature/4614142321229824)
[Support "manual" redirect mode for navigation requests](Support "manual" redirect mode for navigation requests)


#### 请求方法
截止到HTTP1.1共有下面几种方法：

| 方法 |	描述 |
| ------ | ------ | 
| GET	| GET请求会显示请求指定的资源。一般来说GET方法应该只用于数据的读取，而 不应当用于会产生副作用的非幂等的操作中。它期望的应该是而且应该是安全的和幂等的。这里的安全指的是，请求不会影响到资源的状态。|
| POST |	向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。 |
| PUT	 |PUT请求会身向指定资源位置上传其最新内容，PUT方法是幂等的方法。通过该方法客户端可以将指定资源的最新数据传送给服务器取代指定的资源的内容。 |
| PATCH | PATCH方法出现的较晚，它在2010年的RFC 5789标准中被定义。PATCH请求与PUT请求类似，同样用于资源的更新。二者有以下两点不同：1.PATCH一般用于资源的部分更新，而PUT一般用于资源的整体更新。2.当资源不存在时，PATCH会创建一个新的资源，而PUT只会对已在资源进行更新。 | 
| DELETE | DELETE请求用于请求服务器删除所请求URI（统一资源标识符，Uniform Resource Identifier）所标识的资源。DELETE请求后指定资源会被删除，DELETE方法也是幂等的。| 
| OPTIONS	| 允许客户端查看服务器的性能。 |
| CONNECT	| HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。|
| HEAD	| 类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头。|
| TRACE |	回显服务器收到的请求，主要用于测试或诊断。|

#### 请求和响应常见通用头
| 名称	| 作用 | 
| ------ | ------ | 
| Content-Type | 请求体/响应体的类型，如：text/plain、application/json |
| Accept | 说明接收的类型，可以多个值，用,(半角逗号)分开 |
| Content-Length | 请求体/响应体的长度，单位字节 |
| Content-Encoding | 请求体/响应体的编码格式，如gzip,deflate |
| Accept-Encoding | 告知对方我方接受的Content-Encoding |
| ETag | 给当前资源的标识，和Last-Modified、If-None-Match、If-Modified-Since配合，用于缓存控制 |
| Cache-Control | 取值为一般为no-cache或max-age=XX，XX为个整数，表示该资源缓存有效期(秒) |

#### 常见请求头
| 名称 | 作用 |
| ------ | ------ | 
| Authorization | 用于设置身份认证信息 |
| User-Agent | 用户标识，如：OS和浏览器的类型和版本 |
| If-Modified-Since | 值为上一次服务器返回的 Last-Modified 值，用于确认某个资源是否被更改过，没有更改过(304)就从缓存中读取 |
| If-None-Match |	值为上一次服务器返回的 ETag 值，一般会和If-Modified-Since一起出现 |
| Cookie | 已有的Cookie |
| Referer |	表示请求引用自哪个地址，比如你从页面A跳转到页面B时，值为页面A的地址 |
| Host |	请求的主机和端口号 |

#### 常见响应头
| 名称 | 作用 |
| ------ | ------ | 
| Date | 服务器的日期 |
| Last-Modified |该资源最后被修改时间
| Transfer-Encoding	| 取值为一般为chunked，出现在Content-Length不能确定的情况下，表示服务器不知道响应版体的数据大小，一般同时还会出现Content-Encoding响应头 |
| Set-Cookie	| 设置Cookie
| Location | 重定向到另一个URL，如输入浏览器就输入baidu.com回车，会自动跳到 https://www.baidu.com ，就是通过这个响应头控制的
| Server | 后台服务器 | 
 

