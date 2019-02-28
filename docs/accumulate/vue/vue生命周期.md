# vue生命周期

## 生命周期钩子汇总

* 根组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)  
* 组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)  
* 全局路由钩子：2个 (beforeEach、afterEach)  
* 组件路由钩子：3个 (beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave)  
* 指令的周期： 5个 (bind、inserted、update、componentUpdated、unbind)  
* beforeRouteEnter的next所对应的周期  
* nextTick所对应的周期

## 组件实例周期图

![组件生命周期图](https://github.com/MY729/blog/raw/gh-pages/img/vue相关/lifecycle.png)

## 组件生命周期钩子

实例：
```vue
<template>
  <el-row>
    <el-col :span="2">
      <el-input v-model="message"></el-input>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      message: '你好呀~'
    }
  },
  beforeCreate: function () {
    console.group('------beforeCreate创建前状态------')
    console.log('el     :' + this.$el) // undefined
    console.log('data   :' + this.$data) // undefined
    console.log('message:' + this.message)
  },
  created: function () {
    console.group('------created创建完毕状态------')
    console.log('el     :' + this.$el) // undefined
    console.log('data   :' + this.$data) // 已被初始化
    console.log('message:' + this.message) // 已被初始化
  },
  beforeMount: function () {
    console.group('------beforeMount挂载前状态------')
    console.log('el     :' + this.$el) // 已被初始化
    console.log(this.$el)
    console.log('data   :' + this.$data) // 已被初始化
    console.log('message:' + this.message) // 已被初始化
  },
  mounted: function () {
    console.group('------mounted 挂载结束状态------')
    console.log('el     :' + this.$el) // 已被初始化
    console.log(this.$el)
    console.log('data   :' + this.$data) // 已被初始化
    console.log('message:' + this.message) // 已被初始化
  },
  beforeUpdate: function () {
    console.group('beforeUpdate 更新前状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  },
  updated: function () {
    console.group('updated 更新完成状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  },
  beforeDestroy: function () {
    console.group('beforeDestroy 销毁前状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  },
  destroyed: function () {
    console.group('destroyed 销毁完成状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  }
}
</script>
```
结果：

![组件实例演示结果](https://github.com/MY729/blog/raw/gh-pages/img/vue相关/vue-2.jpg)

## 路由和指令钩子

组件内：组件路由钩子和指令
```vue
<template>
  <el-row>
    <el-col :span="2">
      <el-input v-model="message"></el-input>
    </el-col>
    <el-col :span="2" :offset="1">
      <el-button v-order @click="$router.push('/hello')">切换路由</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      message: '你好呀~'
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('组件路由勾子：beforeRouteEnter')
    next(vm => {
      console.log('组件路由勾子beforeRouteEnter的next')
    })
  },
  beforeRouteLeave (to, from, next) {
    console.log(this) // 可以访问vue实例
    console.log('组件路由勾子：beforeRouteLeave')
    next()
  },
  beforeCreate: function () {
    console.group('------beforeCreate创建前状态------')
    console.log('el     :' + this.$el) // undefined
    console.log('data   :' + this.$data) // undefined
    console.log('message:' + this.message)
  },
  created: function () {
    console.group('------created创建完毕状态------')
    console.log('el     :' + this.$el) // undefined
    console.log('data   :' + this.$data) // 已被初始化
    console.log('message:' + this.message) // 已被初始化
  },
  beforeMount: function () {
    console.group('------beforeMount挂载前状态------')
    console.log('el     :' + this.$el) // 已被初始化
    console.log(this.$el)
    console.log('data   :' + this.$data) // 已被初始化
    console.log('message:' + this.message) // 已被初始化
  },
  mounted: function () {
    console.group('------mounted 挂载结束状态------')
    console.log('el     :' + this.$el) // 已被初始化
    console.log(this.$el)
    console.log('data   :' + this.$data) // 已被初始化
    console.log('message:' + this.message) // 已被初始化
  },
  beforeUpdate: function () {
    console.group('beforeUpdate 更新前状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  },
  updated: function () {
    console.group('updated 更新完成状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  },
  beforeDestroy: function () {
    console.group('beforeDestroy 销毁前状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  },
  destroyed: function () {
    console.group('destroyed 销毁完成状态===============》')
    console.log('el     :' + this.$el)
    console.log(this.$el)
    console.log('data   :' + this.$data)
    console.log('message:' + this.message)
  },
  directives: {
    order: {
      bind (el, binding, vnode) {
        console.log('指令binding')
      },
      inserted (el, binding, vnode) {
        console.log('指令inserted')
      }
    }
  }
}
</script>
```

main.js：全局路由钩子
```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  console.log('路由全局勾子：beforeEach')
  next()
})

router.afterEach((to, from) => {
  console.log('路由全局勾子：afterEach')
})

/* eslint-disable no-new */
new Vue({
  beforeCreate () {
    console.log('根组件：beforeCreate')
  },
  created () {
    console.log('根组件：created')
  },
  beforeMount () {
    console.log('根组件：beforeMount')
  },
  mounted () {
    console.log('根组件：mounted')
  },
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```
结果：

![组件实例演示结果](https://github.com/MY729/blog/raw/gh-pages/img/vue相关/vue-3.jpg)

## 非异步生命周期执行顺序

没有异步请求，正常进入路由加载组件，vue生命周期触发顺序
```js
// main.js
 
import Vue from 'vue';
import App from './App';
import router from './router';
 
Vue.config.productionTip = false;
 
new Vue({
  beforeCreate() {
    console.log('根组件：beforeCreate');
  },
  created() {
    console.log('根组件：created');
  },
  beforeMount() {
    console.log('根组件：beforeMount');
  },
  mounted() {
    console.log('根组件：mounted');
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
```
```js
// router/index.js
 
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Test from '@/components/Test';
 
Vue.use(Router);
 
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },{
      path: '/test',
      name: 'Test',
      component: Test,
      beforeEnter: (to, from, next) => {
        console.log('路由独享的钩子：beforeEnter');
        next();
      },
    },
  ],
});
 
router.beforeEach((to, from, next) => {
  console.log('路由全局钩子1：beforeEach');
  next();
});
 
router.beforeEach((to, from, next) => {
  console.log('路由全局钩子2：beforeEach');
  next();
});
 
router.afterEach((to, from) => {
  console.log('路由全局钩子3：afterEach');
});
 
export default router;
```

```vue
// App.vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>
 
<script>
 
export default {
  name: 'app',
  beforeRouteEnter (to, from, next) {
    console.log('App组件路由钩子：beforeRouteEnter')
    next(vm => {
      console.log('App组件路由钩子beforeRouteEnter的next')
    })
  },
  beforeCreate () {
    console.log('App组件：beforeCreate')
  },
  created () {
    this.$nextTick(() => {
      console.log('App组件：nextTick')
    })
    console.log('App组件：created')
  },
  beforeMount () {
    console.log('App组件：beforeMount')
  },
  mounted () {
    console.log('App组件：mounted')
  },
  directives: {
    foo: {
      bind (el, binding, vnode) {
        console.log('App组件：指令binding')
      },
      inserted (el, binding, vnode) {
        console.log('App组件：指令inserted')
      }
    }
  }
};
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
```vue
// Test.vue
<template>
  <h1 v-foo @click = "$router.push('/')">test go hello</h1>
</template>
 
<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log('路由子组件路由钩子：beforeRouteEnter')
    next(vm => {
      console.log('路由子组件路由钩子beforeRouteEnter的next')
    })
  },
  beforeCreate () {
    console.log('路由子组件：beforeCreate')
  },
  created () {
    this.$nextTick(() => {
      console.log('路由子组件：nextTick')
    })
    console.log('路由子组件：created')
  },
  beforeMount () {
    console.log('路由子组件：beforeMount')
  },
  mounted () {
    console.log('路由子组件：mounted')
  },
  directives: {
    foo: {
      bind (el, binding, vnode) {
        console.log('路由子组件：指令binding')
      },
      inserted (el, binding, vnode) {
        console.log('路由子组件：指令inserted')
      }
    }
  }
}
</script>
```

进入test路由:

![组件实例演示结果](https://github.com/MY729/blog/raw/gh-pages/img/vue相关/vue-4.png)

### 实际执行的顺序
  1. 路由钩子 (beforeEach、beforeEnter、beforeRouteEnter、afterEach)
  2. 根组件 (beforeCreate、created、beforeMount)
  3. APP组件 (beforeCreate、created、beforeMount)
  4. 路由子组件 (beforeCreate、created、beforeMount)
  5. 路由子组件指令 (bind、inserted)
  6. 路由子组件 mounted
  7. App组件 mounted
  8. 根组件 mounted
  9. 路由子组件路由钩子beforeRouteEnter的next的回调
  10. App组件 nextTick
  11. 路由子组件 nextTick

## 异步请求生命周期

在钩子中发送异步请求，进入路由加载组件，vue生命周期触发顺序

修改路由配置文件，在beforeEach中发送异步请求，阻塞路由
```js
// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Test from '@/components/Test';
 
Vue.use(Router);
 
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },{
      path: '/test',
      name: 'Test',
      component: Test,
      beforeEnter: (to, from, next) => {
        console.log('路由独享的钩子：beforeEnter');
        next();
      },
    },
  ],
});
 
router.beforeEach((to, from, next) => {
  console.log('路由全局钩子1：beforeEach');
  $.get('https://www.renrenche.com', () => {
    console.log('路由全局钩子4：异步回调beforeEach');
    next();
  });
});
 
router.beforeEach((to, from, next) => {
  console.log('路由全局钩子2：beforeEach');
  next();
});
 
router.afterEach((to, from) => {
  console.log('路由全局钩子3：afterEach');
});
 
export default router;
```

结果：

![组件实例演示结果](https://github.com/MY729/blog/raw/gh-pages/img/vue相关/vue-5.png)

### 实际执行的顺序
  1. 路由全局钩子 (beforeEach)
  2. 根组件 (beforeCreate、created、beforeMount)
  3. APP组件 (beforeCreate、created、beforeMount、mounted)
  4. 根组件 mounted
  5. App组件 nextTick
  6. 路由钩子(beforeEach异步回调结果、其他beforeEach、beforeEnter、beforeRouteEnter、afterEach)
  7. 路由子组件 (beforeCreate、created、beforeMount)
  8. 路由子组件指令 (bind、inserted)
  9. 路由子组件 mounted
  10. 路由子组件路由钩子beforeRouteEnter的next的回调
  11. 路由子组件 nextTick

## 总结

1. 路由钩子执行周期非常早，甚至在根实例的渲染之前

具体的顺序 router.beforeEach > beforeEnter > beforeRouteEnter > router.afterEach

2. 指令的绑定在组件mounted之前，组件的beforeMount之后

3. beforeRouteEnter的执行顺序是如此靠前，而其中next的回调勾子的函数，执行则非常靠后，在mounted之后

我们通常是在beforeRouteEnter中加载一些首屏用数据，待数据收到后，再调用next勾子，通过回调的参数vm将数据绑定到实例上