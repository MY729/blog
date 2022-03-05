# this指向及改变它的指向的方法
## this指向详解
::: tip 知识点
ES5中，this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象（这句话不那么严谨，作为一般情况下是可以的）
:::

再加下面的补充，就完美啦：

**情况1：** 如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题(在严格版中的默认的this不再是window，而是undefined。)

```js
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a(); //相当于window.a();
//this最终指向的是调用它的对象，这里的函数a实际是被Window对象所点出来的
```

**情况2：** 如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。

```js
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
        console.log(this); //{user: "追梦子", fn: ƒ}
    }
}
o.fn(); //this执行时被它的上一级对象o{user: "追梦子", fn: ƒ}调用
```

**情况3：** 如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象

```js
var o = {
    a:10,
    b:{
        //a:12,
        fn:function(){
            console.log(this.a); //undefind  有两个对象b和o,所以此this.a指向它的上一级
        }
    },
    fn1:function(){
	    console.log(this.a);  //10 
	}
}
o.fn1();
o.b.fn();
```

**另外还有两种特殊情况：**


**第一种：当this遇到return**

```js
function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined
```

```js
function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
```

```js
function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子
```

```js
function fn()  
{  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //追梦子
```

```js
function fn()  
{  
    this.user = '追梦子';  
    return null;
}
var a = new fn;  
console.log(a.user); //追梦子
```

**总结：** 如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。

还有一点就是虽然null也是对象，但是在这里this还是指向那个函数的实例，因为null比较特殊。

**第二种：**
```js
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```
这里this指向的是window，是不是有些蒙了？其实是因为你没有理解一句话，这句话同样至关重要。

::: danger 重要
this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的  
例子4中虽然函数fn是被对象b所引用，但是在将fn赋值给变量j的时候并没有执行所以最终指向的是window
:::
　　
## 改变this指向的方法

**第一种： new关键字改变this指向**

```js
//构造函数版this
function Fn(){
    this.user = "追梦子";
}
var a = new Fn();
console.log(a.user); //追梦子
```
用变量a创建了一个Fn的实例（相当于复制了一份Fn到对象a里面），此时仅仅只是创建，并没有执行，而调用这个函数Fn的是对象a，那么this指向的自然是对象a，那么为什么对象a中会有user，因为你已经复制了一份Fn函数到对象a中，用了new关键字就等同于复制了一份

**第二种： call（）**

```js
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
b.call(a);  //若不用call，则b()执行后this指的是Window对象
```
把b添加到第一个参数的环境中，简单来说，this就会指向那个对象。

call方法除了第一个参数以外还可以添加多个参数，如下：

```js
var a = {
    user:"追梦子",
    fn:function(e,ee){
        console.log(this.user); //追梦子
        console.log(e+ee); //3
    }
}
var b = a.fn;
b.call(a,1,2);
```

**第三种：apply（）**

```js
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
b.apply(a);
```
apply方法和call方法有些相似，它也可以改变this的指向，也可以有多个参数，但是不同的是，第二个参数必须是一个数组，如下：

```js
var a = {
    user:"追梦子",
    fn:function(e,ee){
        console.log(this.user); //追梦子
        console.log(e+ee); //11
    }
}
var b = a.fn;
b.apply(a,[10,1]);
```

```js
//注意如果call和apply的第一个参数写的是null，那么this指向的是window对象
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this); //Window {external: Object, chrome: Object, document: document, a: Object, speechSynthesis: SpeechSynthesis…}
    }
}
var b = a.fn;
b.apply(null);
```

**第四种：bind（）**

bind方法和call、apply方法有些不同，如下：

```js
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);
    }
}
var b = a.fn;
b.bind(a);  //代码没有被打印
```
我们发现代码没有被打印，对，这就是bind和call、apply方法的不同，实际上bind方法返回的是一个修改过后的函数。
```js
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);
    }
}
var b = a.fn;
var c = b.bind(a);
console.log(c); //function() { [native code] }
```
函数c看看，能不能打印出对象a里面的user

```js
var a = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
var b = a.fn;
var c = b.bind(a);
c();
```
同样bind也可以有多个参数，并且参数可以执行的时候再次添加，但是要注意的是，参数是按照形参的顺序进行的。

```js
var a = {
    user:"追梦子",
    fn:function(e,d,f){
        console.log(this.user); //追梦子
        console.log(e,d,f); //10 1 2
    }
}
var b = a.fn;
var c = b.bind(a,10);
c(1,2);
```

**总结：** call和apply都是改变上下文中的this并立即执行这个函数，bind方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加，这是它们的区别

## 箭头函数

::: tip 知识点
ES6 的箭头函数是可以避免 ES5 中使用 this 的坑的。箭头函数的 this 始终指向函数定义时的 this，而非执行时。
:::

::: danger 重点
箭头函数需要记着这句话：“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”
:::

先看一个示例：
```js
var name = "windowsName"
var a = {
  name : "Cherry",
  func1: function () {
    console.log(this.name)     
  },
  func2: function () {
    setTimeout(function () {
      this.func1()
    },100)
  }
}

a.func2() // this.func1 is not a function
```
::: danger 重点
超时调用的代码都是在全局作用域中执行的，因此函数中this的值在非严格模式下指向window对象，在严格模式下是undefined
:::

所以上例在不使用箭头函数的情况下，是会报错的，因为最后调用 setTimeout 的对象是 window，但是在 window 中并没有 func1 函数

使用箭头函数：
```js
var name = "windowsName"
var a = {
  name : "Cherry",
  func1: function () {
    console.log(this.name)     
  },
  func2: function () {
    setTimeout(() => {
      this.func1()
    },100)
  }
}

a.func2() // Cherry
```
