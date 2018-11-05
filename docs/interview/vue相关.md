# vue相关

## computed 和 watch 实现原理

::: tip 两者区别
  computed是计算一个新属性，并将该属性挂载到vue实例上  
  而watch是监听已经存在且已经挂载到vue实例上的数据  
  所以用watch同样可以监听computed计算属性的变化（其他还有data, props）
:::

### 原理

vue 数据模型仅仅是普通的 JavaScript 对象，而当你修改它们时，视图便会进行自动更新。

::: danger 原理
 当你把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项时，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化，每个组件实例都有相应的 观察者（watcher） 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 观察者（watcher） 重新计算，从而致使它关联的组件得以更新。
:::

#### Vue 响应系统，其核心有三点：observe、watcher、dep：
  1. observe：遍历 data 中的属性，使用 Object.defineProperty 的 get/set 方法对其进行数据劫持
  2. dep：每个属性拥有自己的消息订阅器 dep，用于存放所有订阅了该属性的观察者对象
  3. watcher：观察者（对象），通过 dep 实现对响应属性的监听，监听到结果后，主动触发自己的回调进行响应

## vue双向绑定原理

重点：
  * vue怎么检测到数据变化
  * vue怎么检测到视图变化

vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的
::: tip 双向绑定原理
  1. 一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。

  2. 一个订阅者Watcher，每一个Watcher都绑定一个更新函数，watcher可以收到属性的变化通知并执行相应的函数，从而更新视图。

  3. 一个解析器Compile，可以扫描和解析每个节点的相关指令（v-model，v-on等指令），如果节点存在v-model，v-on等指令，则解析器Compile初始化这类节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher）。
:::