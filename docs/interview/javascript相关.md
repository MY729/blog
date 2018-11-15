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
