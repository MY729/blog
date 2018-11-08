# JS构造函数-原型-原型链

::: tip 构造函数的特点
  * 函数名首字母大写，用来区分普通函数
  * 内部使用this对象指向即将生成的实例对象
  * 使用new来生产实例对象
:::

**示例：**
```javascript
function Person(name) {
  this.name = name
  this.sayHi = function () {
    console.log(this.name + '你好')
  }
}

var boy = new Person('小明')
boy.sayHi() // 小明你好
```
::: danger TODO
  未完待续  
  [学习地址](https://blog.csdn.net/qq_37467034/article/details/74990193)  
  [学习地址](https://www.cnblogs.com/thonrt/p/5900510.html)
:::