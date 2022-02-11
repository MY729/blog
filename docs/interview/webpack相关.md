# webpack相关

## 基础配置

* [webpack5+vue3搭建开发环境](https://github.com/MY729/webpack-demo)


## 打包工具

### 打包大小分析
webpack-bundle-analyzer插件

```js
// 引入
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 配置
plugins: [
    new BundleAnalyzerPlugin()
]
```

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/webpack/img-4.jpg)

### 打包时间分析
speed-measure-webpack-plugin插件

配置需要在webpack外包一层
```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(webpackConfig) // webpackConfig指打包配置
```


## webpack优化

### 缓存

每次webpack打包编译会把所有的文件重新打包编译一遍，这也意味着很多文件没有修改也会重新编译，实际上这样也会导致构建时间的增多,在性能开销较大的`loader`，可以缓存下来。

webpack4可以用cache-loader，webpack5做了内置缓存

例子：
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['cache-loader', 'babel-loader']
            }
        ]
    }
}
```

### 基础模块抽离

即将一些不会经常变更的第三方依赖，单独抽离出来。例如我们在项目里面常用的react全家桶，lodash等

有以下两种方式：
1. webpack-dll-plugin预编译

使用webpack-dll-plugin库以一种预编译的方式，将这些基础模块提前打包成一个个动态链接库（一个链接库可包括多个模块），之后每次打包的时候就不用再去编译这些基础库，只要这些第三方依赖库的版本没有改变，就不需要重新去编译

2. 使用CDN
使用CDN引入这些库，并配合webpack的externals配置不将这些库打包进去以优化构建速度

```js
// 抽离的资源
<script src="https://code.jquery.com/jquery-3.1.0.js" crossorigin="anonymous"
></script>
```
配置
```js
module.exports = {
    //...
    externals: {
        'jquery': 'jQuery'
    }
}
```
