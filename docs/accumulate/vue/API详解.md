# API 详解（部分）

只记录较难理解的

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
![An image](https://github.com/MY729/blog/raw/gh-pages/img/api详解/api-1.gif)
在用户名的输入框输入内容，点击切换为邮箱登录，内容不会被清空，显然这是不合理的

此时为复用的输入框加上唯一的值key属性，就可以在每次切换登录方式的时候，输入框都将被重新渲染

建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升


## 修饰符

### .lazy

  默认情况下，`v-model`在input事件中同步输入框的值和数据，可以通过添加修饰符.lazy转变为在change事件中同步  
  也就是在失去焦点 或者 按下回车键时才更新**

  <font>注意：如果使用elementUI组件的`el-input`，则此修饰符不起作用</font>

``` vue
<template>
  <div class="fan">
    输入的值： {{msg}} <br><br>
    elementUI组件：<br>
    <el-input v-model.lazy="msg"></el-input>
    原生input添加修饰符: <input v-model.lazy="msg" /> <br><br>
    原生input不添加修饰符: <input v-model="msg" />
  </div>
</template>

<script>
export default {
  name: 'fan',
  data () {
    return {
      msg: ''
    }
  }
}
</script>
```
演示：  
![An image](https://github.com/MY729/blog/raw/gh-pages/img/api详解/api-2.gif)

### .trim

修饰符会自动过滤掉输入的首尾空格

### .sync
::: tip 提示
2.3.0+ 新增
:::

作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 监听器

**功能:**  
当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定(即组件之间的双向绑定),如果我们不用.sync,也可以props传初始值，然后事件监听

**父组件**
```vue
<template>
  <div>
    <p>我是父组件numberData：{{numberData}}</p>
    <el-button @click="open">操作</el-button>
    <el-button @click="resite">重置</el-button>
    <child-dialog :number-data.sync="numberData"></child-dialog>
  </div>
</template>
<script>
import ChildDialog from './ChildDialog'
export default {
  data () {
    return {
      numberData: 0
    }
  },
  methods: {
    open () {
      this.numberData++
    },
    resite () {
      this.numberData = 0
    }
  },
  components: {
    ChildDialog
  }
}
</script>
<style>
.el-input {
  width: 200px;
}
</style>
```
**子组件ChildDialog.vue**
```vue
<template>
  <div>
    <p>我是子组件data: {{numberData}}</p>
    <el-input v-model="data" @input="changeData"></el-input>
  </div>
</template>
<script>
export default {
  props: ['numberData'],
  data () {
    return {
      data: this.numberData
    }
  },
  methods: {
    changeData (val) {
      this.$emit('update:numberData', val)
    }
  }
}
</script>
```

演示：  

![An image](https://github.com/MY729/blog/raw/gh-pages/img/api详解/api-3.gif)

## 自定义指令

有的情况下，仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令  

**示例：** 自定义指令，使得初始化进入页面时，指定`名字`输入框聚焦并修改初始值
```vue
<template>
  <div class="fan">
    <el-form inline>
      <el-form-item label="数字">
        <input v-model="number"/>
      </el-form-item>
      <el-form-item label="名字">
        <p>初始值为小明，绑定自定义v-focus后，修改为木子并聚焦此输入框</p>
        <input v-model="name" v-focus/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      number: 5,
      name: '小明' // 初始值为小明，绑定自定义v-focus后，修改为木子并聚焦此输入框
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        console.log('打印初始值===', el.value)
        el.value = '木子'
        el.focus()
      }
    }
  }
}
</script>
<style>
.fan {
  width: 80%;
  margin: 10%;
}
</style>
```  
演示：

![An image](https://github.com/MY729/blog/raw/gh-pages/img/api详解/api-4.gif)  

其他钩子函数部分的介绍，参考官方文档 [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html#%E7%AE%80%E4%BB%8B)

## slots 插槽