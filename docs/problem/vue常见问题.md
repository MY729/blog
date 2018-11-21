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