# API 详解（部分）

只记录比较难理解的

## key
> 为了提高vue更新DOM的性能，需要为每项提供一个唯一的key属性，有相同父元素的子元素必须有独特的key值，重复的key会造成渲染错误

#### 用key可管理重复的元素
vue 尽可能高效的渲染元素，通常会复用已有的元素而不是从头开始渲染

比如以下场景：使用用户名或者邮箱进行登录的切换
```vue
<template>
  <div class="hello">
    <template v-if="loginType === 'username'">
      <label>用户名</label>
      <input placeholder="请输入用户名">
      <label>密码</label>
      <input placeholder="请输入密码">
    </template>
    <template v-else>
      <label>邮箱</label>
      <input placeholder="请输入邮箱">
      <label>密码 </label>
      <input placeholder="请输入密码">
    </template>
    <button @click="reverseMessage">切换为{{this.loginType === 'username' ? '邮箱' : '用户名'}}登录</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginType: 'username'
    }
  },
  methods: {
    reverseMessage () {
      this.loginType = this.loginType === 'username' ? 'email' : 'username'
    }
  }
}
</script>
```
在用户名的输入框输入内容，点击切换为邮箱登录，内容不会被清空，显然这是不合理的
![An image](https://github.com/MY729/blog/raw/gh-pages/img/api详解/api-1.png)
![An image](https://github.com/MY729/blog/raw/gh-pages/img/api详解/api-2.png)

此时为复用的输入框加上key值就可以避免这样的清空

建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升