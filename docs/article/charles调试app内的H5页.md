# charles调试app内的H5页

## 安装

下载地址：https://www.charlesproxy.com/download/

打开下载的包，直接安装

## 移动端代理配置

启动charles后

1. 点击Proxy，选择proxy settings,输入端口8888
2. 打开电脑，在cmd中输入ipconfig，查看跟电脑同一wifi网址的ipv4的ip地址
3. 打开手机，点击设置，查看连接的网络
4. 进入到网络详情页，http选择手动，输入电脑端IPv4的地址，端口与Charles设置的端口一致
5. 此时就可以在charles中查看app端的请求，（注意项目的host配置要正确）
