# HTTP请求/响应报文结构

## 请求报文结构

::: tip 知识点
一个HTTP请求报文由四个部分组成：请求行、请求头、空行、请求体。
:::

#### 1. 请求行

  请求行由请求方法、URL和HTTP协议版本3个字段组成，用空格分隔，比如：

    GET /data/info.html HTTP/1.1

  HTTP常见的请求方法有 GET/POST, 其他请求方法请戳这里 [HTTP请求方法详解](https://my729.github.io/blog/internetwork/HTTP%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95%E8%AF%A6%E8%A7%A3.html)

  HTTP协议版本有两种：HTTP1.0/HTTP1.1 ，可以这样区分：  
  HTTP1.0对于每个连接都只能传送一个请求和响应，请求就会关闭，HTTP1.0没有Host字段;而HTTP1.1在同一个连接中可以传送多个请求和响应，多个请求可以重叠和同时进行，HTTP1.1必须有Host字段。

#### 2. 请求头

  客户端（例如浏览器）向服务器发送请求的时候必须指明请求类型（一般是GET或者POST）

::: danger TODO
[学习地址](https://blog.csdn.net/shouwang666666/article/details/70232053)  
[学习地址](https://blog.csdn.net/u010256388/article/details/68491509)
:::