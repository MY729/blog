# vue3+node+mysql搭建blog（一）

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

重启项目，就可以切换路由展示不同页面啦

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

##
