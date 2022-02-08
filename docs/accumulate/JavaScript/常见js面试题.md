# 常见js面试题
## js数据类型有哪些
基本：number、string、boolean、undefined、null、symbol、bigint

复杂：对象（object、array、function、date）

#### 判断数据类型方法

* typeof 只能用于判断除了null的基础类型

```
typeof null // object
```

* instanceof 只能用于判断复杂类型

```
[] instanceof Array // true
let a = {}; a instanceof Object // true
let a = new Date(); a instanceof Date // true
let a = console.log; a instanceof Function // true

// 基础类型检查不出来
1 instanceof Number // false
```

* constructor

> null、undefined没有construstor方法，因此constructor不能判断undefined和null

```
let a = 3; a.constructor === Number // true
let a = 0n; a.constructor === BigInt
```

* Object.prototype.toString.call() 所有类型

```
Object.prototype.toString.call(1) === '[object Number]'// true
```

## 如何判断一个变量是数组类型

**知识点：** [构造函数](/accumulate/JavaScript/JS构造函数-原型-原型链.html)  

  * 函数名称以大写字母开头
  * 所有的引用类型（对象、数组、函数）都有构造函数
  * var a={ }其实是var a=new Object( )的语法糖
  * var a=[ ]其实是var a=new Array( )的语法糖
  * function Foo( ){ }其实是var Foo=new Function ( )
  * 使用 [instanceof](/accumulate/JavaScript/JS构造函数-原型-原型链.html#检测对象是否是类的实例) 判断一个函数是否是一个变量的构造函数

  用instanceof判断：变量 instanceof Array 

```js
var arr=[]; 
arr instanceof Array; //true 
typeof arr; //object , typeo是无法判断是否是数组的
```

## 写一个能遍历对象和数组的通用函数

```js
//遍历对象可以用for...in...，遍历数组可以用forEach
function forEach(obj) {
  var key
  if (obj  instanceof Array) {
    obj.forEach(item => {
      console.log(item)
    })
  } else {
    for (key in obj) {
      console.log(key, obj[key])
    }
  }
}
var arr = [1, 2, 3, 4, 5]
forEach(arr) //输出:  1 2 3 4 5

var obj = { x: 1, y: 2, z: 3 }
forEach(obj) //输出:  x 1 y 2 z 3
```
## 解析url参数为对象

### 考点/思路
考察数组与字符串处理的知识, [常见数组和字符串方法](/accumulate/JavaScript/常用数组和字符串方法.html)
  1. 通过字符 `?` 分割获取参数
  2. 通过字符 `&` 将字符串参数分割为数组
  3. 通过字符 `=` 处理参数为对象格式

### 代码实现
```js
function urlSearch(href) {
  let name, value
  let str = href //取得整个地址栏
  let num = str.indexOf("?")
  str = str.substr(num + 1) //取得所有参数
  let arr = str.split("&") //各个参数放到数组里
  let json = {}
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=")
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      json[name] = value
    }
  }
  return json
}
urlSearch('https://www.baidu.com/s?ie=UTF-8&wd=csdn') // {ie: "UTF-8", wd: "csdn"}
```

## 获取一定范围内n个随机整数

### 知识点

  * `math.floor(x)` 返回小于参数x的最大整数,即对浮点数向下取整
  * `math.random()` 取得某个范围内的随机数

### 代码实现

```js
function getRandomNumber(start, end, n) {
	var arr = []
	for (var i = 0; i < n; i++) {
		var number = Math.floor(Math.random() * (end-start + 1) + start)
		if (arr.indexOf(number) < 0) {
			arr.push(number)
		} else {
			i--
		}
	}
	return arr
}
getRandomNumber(1, 20, 5) // [11, 2, 8, 16, 10]
getRandomNumber(1, 20, 5) // [2, 8, 3, 12, 11]
```

## for-in 和for-of 的区别

参考文章：
[https://www.jianshu.com/p/c43f418d6bf0](https://www.jianshu.com/p/c43f418d6bf0)
[https://segmentfault.com/q/1010000006658882](https://segmentfault.com/q/1010000006658882)

::: warning 知识点
  * for-of适用于拥有迭代器对象的集合，但是不能遍历普通对象,因为没有迭代器对象，与forEach()不同的是，它可以正确响应break、continue和return语句
  * 推荐在循环对象属性的时候，使用fo-in,在遍历数组的时候的时候使用for-of
  * for-of不能循环普通的对象，需要通过和Object.keys()搭配使用
  * for-in会遍历数组和对象所有的可枚举属性，包括原型和自定义属性, 而for-of只会遍历自身可枚举的
:::

### for-in

先看实例：
* 遍历数组
```js
Array.prototype.method=function(){
　　console.log(this.length);
}
var myArray=[1,2,4]
myArray.name="数组"
for (var index in myArray) {
  console.log(myArray[index]);
}

// 打印结果
1
2
4
数组
ƒ (){
　　console.log(this.length);
}
```
* 遍历对象
```js
Object.prototype.method=function(){
　　console.log(this);
}
var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key in myObject) {
  console.log(key);
}

// 打印结果
a
b
c
method
```
::: tip for-in遍历的特点
1. 对于数组遍历的是数组的索引（即键名），而不是value，对于对象遍历的是属性
2. 会遍历数组和对象所有的可枚举属性，包括原型和自定义属性
:::

对于对象，如果不想遍历原型方法和属性的话，可以在循环时使用hasOwnPropery方法判断某属性是否是该对象的实例属性
```js
Object.prototype.method=function(){
　　console.log(this);
}
var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key in myObject) {
  if (myObject.hasOwnProperty(key)) {
    console.log(key);
  }
}

// 打印结果
a
b
c
```

### for-of

for-of是ES6的语法

* 数组遍历
```js
Array.prototype.method=function(){
　　console.log(this.length);
}
var myArray=[1,2,4]
myArray.name="数组";
for (var value of myArray) {
  console.log(value);
}

// 打印结果
1
2
4
```

* 字符串遍历
```js
var str = 'hello'
for (var st of str) {
  console.log(st)
}

// 打印结果
h
e
l
l
o
```
::: tip for-of遍历的特点
1. 遍历的是数组元素值而不是索引，for-of不能循环遍历普通对象
2. 不会遍历原型上的属性和方法
3. 支持字符串遍历
:::

* 定义一个对象，使之可以用 for-of 循环遍历

[参考学习：ES6入门-阮一峰](http://es6.ruanyifeng.com/#docs/iterator)

只有可遍历的（iterable）的对象才能使用 of 循环遍历。可以通过给对象添加iterator接口来实现普通对象的for-of循环
```js
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
for (var key of obj) {
  console.log(key)
}

// 打印结果
hello
world
```

* 如果实在想用for...of来遍历普通对象的属性的话，可以通过和Object.keys()搭配使用，先获取对象的所有key的数组
然后遍历：
```js
var obj = {
  a: 1,
  b: 'fmy'
}
console.log(Object.keys(obj)) // ["a", "b"]
for (var key of Object.keys(obj)) {
  console.log(`${key}: ${obj[key]}`)
}

// 打印结果
a: 1
b: fmy
```

## 防抖与节流

::: tip 概念

* 防抖: 当连续触发事件时，最后一次触发事件后，只有任务触发的间隔超过指定间隔的时候，任务才会执行
* 节流: 指定时间间隔内只会执行一次任务，当连续触发事件时，事件只按自己的时间间隔执行
:::

::: warning 应用场景

* 防抖
  * 输入框搜索联动词频繁调用接口时
* 节流
  * 懒加载要监听计算滚动条的位置，使用节流按一定时间的频率获取
  * 用户点击提交按钮，假设我们知道接口大致的返回时间的情况下，我们使用节流，只允许一定时间内点击一次  
:::

如果对上面的概念还不理解，我们看下面的示例，手动操作一下

* 防抖

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>防抖</title>
</head>
<body>
  <button id="debounce">点我防抖！</button>

  <script>
    window.onload = function() {
      // 1、获取这个按钮，并绑定事件
      var myDebounce = document.getElementById("debounce");
      myDebounce.addEventListener("click", debounce(sayDebounce));
    }

    // 2、防抖功能函数，接受传参
    function debounce(fn) {
      // 4、创建一个标记用来存放定时器的返回值
      let timeout = null;
      return function() {
        // 5、每次当用户点击/输入的时候，把前一个定时器清除
        if (timeout) clearTimeout(timeout);
        // 6、然后创建一个新的 setTimeout，
        // 这样就能保证点击按钮后的 interval 间隔内
        // 如果用户还点击了的话，就不会执行 fn 函数
        timeout = setTimeout(() => {
          fn()
          // fn.call(this, arguments);
        }, 1000);
      };
    }

    // 3、需要进行防抖的事件处理
    function sayDebounce() {
      // ... 有些需要防抖的工作，在这里执行
      console.log("防抖成功！");
    }

  </script>
</body>
</html>
```

* 节流

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>节流</title>
</head>
<body>

  <button id="throttle">点我节流！</button>

  <script>
    window.onload = function() {
      // 1、获取按钮，绑定点击事件
      var myThrottle = document.getElementById("throttle");
      myThrottle.addEventListener("click", throttle(sayThrottle));
    }

    // 2、节流函数体
    function throttle(fn) {
      // 4、通过闭包保存一个标记
      let canRun = true;
      return function() {
        // 5、在函数开头判断标志是否为 true，不为 true 则中断函数
        if(!canRun) {
          return;
        }
        // 6、将 canRun 设置为 false，防止执行之前再被执行
        canRun = false;
        // 7、定时器
        setTimeout( () => {
          fn.call(this, arguments);
          // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
          canRun = true;
        }, 1000);
      };
    }

    // 3、需要节流的事件
    function sayThrottle() {
      console.log("节流成功！");
    }

  </script>
</body>
</html>
```