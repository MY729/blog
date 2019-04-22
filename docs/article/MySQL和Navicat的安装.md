# Windows平台安装MySQL和Navicat

MySQL 是最流行的关系型数据库管理系统，但需要在终端输入命令行操作，这对不熟悉命令行的人不太方便

而Navicat 是图形化数据库管理软件，解决MySQL需在终端操作的劣势

::: danger 注意
如果安装过程中遇到  
“无法启动此程序,因为计算机中丢失VCRUNTIME140.dll。尝试重新安装程序以解决问题”  
安装vc_redist.x64.exe后，运行成功即可  

安装地址：1. [官网](https://www.microsoft.com/zh-cn/download/confirmation.aspx?id=48145) 2. [网盘](https://pan.baidu.com/s/12kw8g6JVb7kkoWtAZl5wcQ)  提取码：qyjs
:::

## MySQL 安装

#### 下载安装包

* 8.0.15版本   
链接：[https://pan.baidu.com/s/1q68n11Uf-PQy26xH-em5Ng](https://pan.baidu.com/s/1q68n11Uf-PQy26xH-em5Ng)  
提取码：0oqx  
* 最新版在官网中下载  
[官网MySQL下载](https://dev.mysql.com/downloads/mysql/)
1. 选择window下的最新版本

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/mysql-1.png)
2. 直接下载

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/mysql-2.png)

#### 配置文件

1. 打开压缩包解压，我这里的解压路径C:\web\mysql-8.0.15-winx64
2. 打开解压后的文件夹C:\web\mysql-8.0.15-winx64，在该文件夹下创建my.ini文件，编辑my.ini的配置信息如下：

``` js
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录, 注意这里的路径是双\
basedir=C:\\web\\mysql-8.0.15-winx64
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

#### 启动MySQL数据库

1. 以管理员身份打开cmd,切换到安装目录的bin文件夹下:

```shell
cd C:\web\mysql-8.0.15-winx64\bin
```

2. 初始化数据库

```shell
mysqld --initialize --console
```
执行完成，会打印root用户的初始默认密码
```shell
...
[Note] [MY-010454] [Server] A temporary password is generated for root@localhost: HfgqplZ_1u&U
...
```
`HfgqplZ_1u&U` 就是初始密码，后面登录要用到

3. 输入安装命令

```shell
mysqld install
```

4. 启动

```
net start mysql
```

5. 登录

```
mysql -u root -p
```
输入上面命令会让输入密码

登录成功后你将会看到 Welecome to the MySQL monitor... 的提示语

6. 关闭

```
net stop mysql
```

## Navicat 安装

参考博客[https://blog.csdn.net/WYpersist/article/details/79834490](https://blog.csdn.net/WYpersist/article/details/79834490)

如果连接 Mysql出现1251- Client does not support authentication protocol 错误，可以执行一下操作：

登录mysql(mysql -u root -p),输入以下命令（注意必须带上分号）:
```js
// 更新一下用户的密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

// 刷新权限
FLUSH PRIVILEGES;

```
