# javascript相关

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