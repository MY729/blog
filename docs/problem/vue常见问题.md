# vue常见问题

## dialog弹窗被遮罩层挡住

  **解决：** 在el-dialog标签里添加 :modal-append-to-body='false'

## 输入框回车触发事件

```js
@keyup.enter.native='事件名'
```

## 直接修改子组件props的值报错

**错误提示：**   
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value  
翻译： 避免直接更改一个PROP，因为每当父组件重新呈现时，该值就会被覆盖。相反，使用基于支柱值的数据或计算属性。

**错误原因:**  子组件直接修改prop的值

::: tip vue官方说明
在 Vue 中，父子组件的关系可以总结为 prop 向下传递，事件向上传递。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。

Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。
:::

**解决：** 通过事件`$emit`

父组件：
``` vue
<template>
  <my-detail-dialog :dialog-visible="dialogVisible" @getDialogVisible="setDialogVisible"></my-detail-dialog>
</template>
<script>
data () {
  return {
    dialogVisible: false
  }
}
methods: {
  setDialogVisible(val) {
    this.dialogVisible = val
  }
},
</script>
 ```
 子组件：
 ```vue
 <template>
  <el-dialog :visible.sync="visibleDialog" :modal-append-to-body='false'>
    我是弹窗
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleDialog: this.dialogVisible
    }
  },
  watch: {
    visibleDialog(val) {
      this.$emit('getDialogVisible', val)
    },
    dialogVisible(val) {
      this.visibleDialog = val
    }
  }
}
</script>
```

## watch监控不到深度对象属性值的变化

**问题描述**

子组件监测父组件传过来的值options

```js
// 父组件
data() {
  return {
    options: {}
  }
},
methods: {
  handleSelect(options) {
    this.options = options
  }
}

// 子组件
props: {
  options: {
    type: Object | Array,
    require: true
  }
},
watch: {
  options: {
    handler() {
      console.log('666666')
    },
    deep: true
  }
}
```
options变化 watch不打印值

**原因**

在javascript里面动态添加的新属性是不会触发watch的

**解决**

父组件初始化属性值

```js
data() {
  return {
    options: {
      series_id: null,
      status: null
    }
  }
},
```

## vue-router 几种传参方式

### query方法，

query方法，使用path来匹配路由

刷新不会丢失参数，但参数会拼接在URL上

```js
// 传参
this.$router.push({ path: '/infoList/detail', query: { id: 306478347, carId: '086e232af7390349b27ddc70fe535a46' } })

// 路由
router.push({
  path: '/infoList/detail',
  name: 'detail',
  component: infoDetail,
  meta: {
    title (to) {
      return `档案详情-${to.query.id}`
    }
  }
})
```

### params方法，此方法不会在URL路径中显示拼接

params方法，使用路由属性中的name来确定匹配的路由

但是此方法有一个缺点就是，刷新会丢失参数，如果不想刷新丢失，可以在URL上拼接参数

```js
// 传参
this.$router.push({ name: 'detail', params: { id: 306478347, carId: '086e232af7390349b27ddc70fe535a46' } })

// 路由
router.push({
  path: '/infoList/detail/:carId',
  name: 'detail',
  component: infoDetail,
  meta: {
    title (to) {
      return `档案详情-${to.params.id}`
    }
  }
})
```

在上面例子中，刷新页面 carId参数会保留，id参数会丢失

## URL不拼接参数，刷新又不丢失参数的方法

可以使用localStorage()方法缓存

```js
// 传参
this.$router.push({ name: 'detail', params: { id: 306478347, carId: '086e232af7390349b27ddc70fe535a46' } })

// 路由
router.push({
  path: '/infoList/detail/:carId',
  name: 'detail',
  component: infoDetail,
  meta: {
    title (to) {
      if (to.params.id) {
        localStorage.setItem('paramsCarId', to.params.id)
      }
      return `档案详情-${localStorage.getItem('paramsCarId')}`
    }
  }
})
```

在上面例子中，刷新页面 carId参数和id参数都会保留，不会丢失