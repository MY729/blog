# vue3+node+mysql搭建blog（一）

## node+mysql
* [Windows平台安装MySQL和Navicat](https://my729.github.io/blog/article/MySQL%E5%92%8CNavicat%E7%9A%84%E5%AE%89%E8%A3%85.html)  
* [一步一步完成nodejs+express+mysql的简单实例开发](https://blog.csdn.net/hust_cxl/article/details/79929093)

1. 参考上面两篇文章，建立数据库，并添加数据  
2. node连接数据库，创建测试接口

具体如下：
在根目录下创建core文件夹，文件夹里面创建app.js

**core/app.js**
```js
var express = require('express');   //引入express模块
var mysql = require('mysql');     //引入mysql模块
var app = express();        //创建express的实例

var connection = mysql.createConnection({      //创建mysql实例
    host: 'localhost',
    user: 'root',
    password : 'root',
    database:'sys'
});
connection.connect();
var sql = 'SELECT * FROM message'; //message数据表
var str = ""
connection.query(sql, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    str = result
    console.log(result);  //数据库查询结果返回到result中
 
});
app.get('/message',function (req,res) {
    res.send(str);  ////服务器响应请求
});

var sql1 = 'SELECT * FROM info'; // info数据表
var str1 = ""
connection.query(sql1, function (err,result) {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    str1 = result
    console.log(result);  //数据库查询结果返回到result中
 
});
app.get('/info',function (req,res) {
    res.send(str1);  ////服务器响应请求
});


connection.end();
app.listen(3000,function () {    ////监听3000端口
    console.log('Server running at 3000 port');
});
```
进入该项目，运行
```js
node core/app.js
```

在浏览器输入：http://localhost:3000/info,可以看到数据展示，切换对应url拿到相应数据

## 初始化项目

#### 使用vue-cli3初始化项目

参考官方文档：[vue-cli3.0](https://cli.vuejs.org/zh/guide/installation.html)

## 配置路由

#### 简易版
参考文章：[Vue-cli3如何添加路由（router）](https://blog.csdn.net/dengzy926/article/details/86521579)

#### 基于上面简易版的调整

1. 安装vue-router

yarn add vue-router 或 npm install vue-router

2. 在src文件夹下创建router文件夹，router文件夹里面创建index.js文件，index.js内容为：

**src/router/index.js**

```js
import Vue from 'vue'
import Router from  'vue-router'
import App from '@/views/App.vue'

const requireAll = requireContext => requireContext.keys().map(requireContext)

const routerChildrenContext = require.context('@/views/', true, /router\.js$/)

Vue.use(Router)

let routes = []

let rootRouter = {
  path: '/',
  component: App,
  children: []
}

// 重定向路由
let redirectRoute = {
  path: '*',
  redirect: '/'
}

const routerChildren = requireAll(routerChildrenContext)

routerChildren.map((route) => {
  route.default(rootRouter.children)
})

let mode = 'history'

const relRoutes = routes.concat([rootRouter, redirectRoute])
export default new Router({
  mode: mode,
  routes: relRoutes
})
```

3. 在main.js文件中引用上面的index.js文件

因为在`src/router/index.js`文件中已经引入App.vue 文件，在main.js中就不再引入渲染

**src/main.js**

```js
import Vue from 'vue'
// import App from './App.vue'
import router from './router/index' // 引入

Vue.config.productionTip = false

new Vue({
  // render: h => h(App),
  router
}).$mount('#app')
```
4. 引用组件
* 在src目录下新建views文件夹(存放前端页面组件)，已经存在的components我们存放elementUI组件和自定义的公用组件  
* 在views文件夹下创建页面模块文件夹，这里是ceshi文件夹  
* ceshi文件夹下创建router.js文件和src文件夹  
* src文件下存放vue组件

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/blog/组件结构.png)

**src/views/ceshi/router.js**
```js
const A = () => import('./src/a.vue')
const B = () => import('./src/b.vue')

export default function (router) {
  router.push({
    path: '/a',
    name: 'a',
    component: A
  }, {
    path: '/b',
    name: 'b',
    component: B
  })
}
```

5. 渲染路由组件

**src/views/App.vue**

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

将`public/index.html`文件中的`<div id="app"><router-view></router-view></div>`改为`<div id="app"></div>`

6. 启动项目
发现有报错信息如下：  
> <font style="color: red">
> [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
> </font>

原因参考这边文章：[https://blog.csdn.net/qq_35324453/article/details/80920344](https://blog.csdn.net/qq_35324453/article/details/80920344)

#### 解决方案:

在项目根目录创建vue.config.js文件添加配置

方案一：
```js
module.exports = {
  runtimeCompiler: true
}
```

方案二：
```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
```

重启项目，打开 http://localhost:8080就可以切换路由展示不同页面啦

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/blog/路由学习展示.gif)

## 封装axios请求

#### 安装axios

```js
yarn add axios
```
或
```js
npm run axios
```

#### 引入axios并封装

1. src文件夹下创建config文件夹，config文件夹下创建axios.config.js和http.js文件

**src/config/axios.config.js**

```js
import axios from 'axios'

const service = axios.create({
  timeout: 20000,
  withCredentials: true // 跨站点访问控制请求
})

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
  let { data, status, statusText: err_msg } = response
  return { data, status, err_msg }
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default service
```

**src/config/http.js**

```js
import fetch from './axios.config'

const API_HOST = '/api'

// 基本配置
const DEFAULT_CONFIG ={
  isApiHost: true
}

const POST_HEADER = {
  headers: {
    'content-type': 'application/json'
  }
}

/**
 * get 提交
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Obejct} config  请求配置
 * @returns Promise
 */
export function get(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...config}
  opts.params = {...params}
  return fetch.get(getUrl(url, opts.isApiHost), opts)
}

/**
 *
 * post 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function post(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  return fetch.post(getUrl(url, opts.isApiHost), params, opts)
}

/**
 *
 * delete 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function Delete(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  return fetch.delete(getUrl(url, opts.isApiHost), params, opts)
}

/**
 *
 * 上传
 * @export
 * @param {any} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {any} [config={}] 配置
 * @returns Promise
 */
export function upload(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  let form = new FormData()
  Object.keys(params).forEach(key => {
    form.append(key, params[key])
  })
  return fetch.post(getUrl(url, opts.isApiHost), form, opts)
}

/**
 *
 * 下载
 * @export
 * @param {any} url 请求
 * @param {any} [params={}] 请求参数
 * @param {string} [type='post'] 请求类型
 * @param {any} [config={}] 配置
 */
export function download(url, params = {}, type = 'post', config = {}) {
  let opts = {...DEFAULT_CONFIG, ...POST_HEADER, ...config}
  let $form = document.createElement('form')
  $form.setAttribute('method', type)
  $form.setAttribute('hidden', 'hidden')
  $form.setAttribute('action', getUrl(url, opts.isApiHost))

  let createInput = (name, value) => {
    let input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', name)
    input.setAttribute('value', value)

    $form.appendChild(input)
  }

  Object.keys(params).forEach(key => {
    createInput(key, params[key])
  })

  let $body = document.body || document.getElementsByTagName('body')[0]
  $body.append($form)
  $form.submit()
  $form.remove()
}

/**
 *
 * url 处理如果 isApiHost 为true 则添加 API_HOST
 * @param {any} url
 * @param {any} isApiHost
 * @returns
 *
 */
function getUrl(url, isApiHost) {
  if (!isApiHost) {
    return url
  }
  let arr = [API_HOST]
  arr.push(url)
  return arr.join('')
}
```

## 调用接口

1. src文件夹下创建services文件夹，这里用来存放前端调用的接口，services文件夹下创建ceshi.service.js文件

**src/services/ceshi.service.js**

`/info`是我们在最初写的接口例子

```js
import { get } from '@/config/http'

export function getInfoData () {
  return get('/info')
}
```

2. 页面内调用接口

**src/views/ceshi/src/a.vue**

```vue
<template>
  <div>
    <div>aaaaaaaa</div>
    <button v-on:click="getInfo()">点击获取数据</button>
    {{infoList}}
  </div>
</template>
<script>
import { getInfoData } from '@/services/ceshi.service' // 引入接口
export default {
  data() {
    return {
      infoList: []
    }
  },
  methods: {
    async getInfo() {
      const result = await getInfoData()
      this.infoList = result
    }
  }
}
</script>
```

3. 配置代理  

上面我们前端启动的项目地址是http://localhost:8080, node启动的服务地址是http://localhost:3000

在项目根目录的vue.config.js文件中配置代理

**vue.config.js**
```js
module.exports = {
  runtimeCompiler: true,
  // 配置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

4. 启动项目

前端：
```js
yarn serve
```
后端：
```js
node core/app.js
```

效果图如下：

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/blog/接口.gif)
