# 深拷贝vs浅拷贝

## 概念

深拷贝和浅拷贝都是针对的引用类型

* 浅拷贝：拷贝的是地址，最终两个变量指向同一份数据，修改其中一个变量会改变另一个
* 深拷贝：两个变量是独立的，互不影响

我们先看一个浅拷贝的例子
```js
var a = {
  name: '小明'
}
var b =  // {name: "小明"}
b.name = '木木'
a // {name: "木木"}
```

## 只拷贝一层

假设拷贝一份多层嵌套的对象，浅拷贝就是只进行一层拷贝，深拷贝就是无限层级拷贝

#### 一层浅拷贝实现
```js
var a = {
  student: {
    name: '木子'
  }
}

function shallow(obj) {
  var newObj = {}
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      newObj[i] = obj[i]
    }
  }
  return newObj
}

var b = shallow(a)
b.student.name = 'kk'
a.student.name // "kk"
```

## 深拷贝

### 第一种方法：JSON.stringify()和JSON.parse()实现

缺点：

* 当值为undefined、function、symbol 会在转换过程中被忽略，所以，对象值有这三种的话用这种方法会导致属性丢失

```js
var a = {
  student: {
    name: '木子'
  },
  say: function() {
    return '你好'
  },
  un: undefined
}

var b = JSON.parse(JSON.stringify(a)) // {student: {name: "木子"}}
b.student.name = 'kk'
a.student.name // "木子"
```

### 第二种方法：递归实现

拓展和边界问题：
  1. 参数类型做校验，不是对象直接返回
  2. 判读是否是对象的逻辑
  3. 参数为数组的情况

```js 
function deepCopy(source) {
  // 参数如果不是对象直接返回
  if (typeof source !== 'object') return source

  // 参数如果为数组
  var newObj = Object.prototype.toString.call(source) === "[object Array]" ? [] : {}

  for (var key in source) {
    // 判断是自身属性，而非原型上的
    if (source.hasOwnProperty(key)) {
      newObj[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key]
    }
  }
  return newObj
}

// 测试
var a = {
  arr: [1, 2, 3],
  student: {
    name: '木子',
    depObj: {
      age: 14
    }
  },
  say: function() {
    return '你好'
  },
  un: undefined
}

var b = deepCopy(a)
a.arr.push(4)
a.arr // [1, 2, 3, 4]
b.arr // [1, 2, 3
```
