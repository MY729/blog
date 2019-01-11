# 使用GitHub播放PPT

不是真正的 PPT，只是用HTML模拟出的效果，它的制作和PPT有着根本的不同

## 使用reveal.js制作PPT，并部署至GitHub

有较简单和复杂的安装，根据自己的需求选择安装哪一种

### 较简单的安装
1. clone reveal.js 库
```
git clone  https://github.com/hakimel/reveal.js.git
```
2. 直接打开index.html文件可预览，想修改什么内容直接修改

### 复杂的安装
1. 安装reveal.js
```
 git clone  https://github.com/hakimel/reveal.js.git
```
2. 安装 grunt (未安装的nodeJs的先安装nodeJs)
```
npm install -g grunt-cli
```
3. 切换到reveal.js下 安装依赖
```
cd reveal.js
npm install
```
4. 监控源文件的改变
```
grunt serve
```
5. 打开 http://localhost:8000 预览你的演示文稿

预览图：  

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/预览图-1.gif)

上面是仓库默认初始化的效果，可以在index.html里面修改内容

**index.html**

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/ppt-1.png)

与index.html同级目录的demo.html文件提供了修改的语法，可以直接打开该html预览效果

**demo.html**

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/demo.gif)

## 做好的PPT上传至GitHub

1. 创建仓库

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/ppt-show.jpg)

2. 解除本地仓库与reveal.js 库 的关联
```js
// 查看本地仓库与远程仓库的关联详情
git remote -v
// 取消本地目录下关联的远程库
git remote remove origin
```
3. 本地目录关联远程你创建的远程仓库
```
git remote add origin <远程仓库地址>
```
4. 提交本地仓库
```js
// 初次提交直接push
git push origin master
// 若有修改，按照git提交流程提交
git add .
git commit -m '这里写上你的备注'
git push origin master
```
## 预览效果

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/预览.png)

打开链接就可以查看效果啦 [https://my729.github.io/illustrate-ppt/](https://my729.github.io/illustrate-ppt/)