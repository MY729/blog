# vue

## part1

### 1. Vue响应式原理阐述一下

当创建Vue实例的时候，Vue会遍历data的属性，，通过Object.defineProperty为属性添加setter和getter, 对数据进行劫持

getter: 依赖收集

setter：派发更新

每个组件的示例都会有对应的watch实例，数据发生更新时，会触发属性的getter依赖收集，当改变相应值，setter会通知订阅者执行更新

### 2. 计算属性的实现原理

当计算属性的依赖值发生改下，会通知订阅者进行更新

注意：计算属性里面的依赖值必须是vue实例化的data里面定义过的，才能实时计算，否则因为没有走劫持的过程，是监听不到变化的

### 3. vue.nextTick的原理