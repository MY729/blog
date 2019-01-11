# github在线预览vue项目

## 本地预览

```js
// 打包生成dist文件夹，里面包含 static 文件夹和一个 index.html 文件
npm run build
```
试着打开dist文件夹下的index.html，发现页面空白，打开控制台，发现 script 标签的引入路径不对

static 文件夹和 index.html 是在同一个目录下的，这里却是从根目录引入 static 下的文件，正确的路径应该是 ./ 开头的相对路径： src='./static/...' 或者 src='static/...'

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/vue-show-1.jpg)

重新build后打开index.html

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/vue-show-2.jpg)

这和配置资源的路径有关，打开项目根目录 config 文件夹下的 index.js ，定位到 build 下的 assetsPublicPath （dev下也有一个assetsPublicPath，别弄混），把assetsPublicPath: '/' 修改为 assetsPublicPath: './'

重新执行npm run build,打开index.html，页面效果ok了

## 线上预览

找到项目根目录的 .gitignore 文件，这里设置一些文件名，对应的文件将不会被提交到 github 上面，将 dist 文件夹移除

提交代码到你的仓库，到github上点击项目的 setting 项，然后找到 Github Pages
选择 master branch ，保存，接着你会看到项目在线预览链接

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/预览.png)

点击链接，此时会看到空白，在地址栏后面添加 dist （因为 index.html 是在 dist目录 下），回车，ok了
