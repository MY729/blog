# JS构造函数-原型-原型链

## 概念

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

::: tip 五条原型规则
  1. 所有的引用类型（数组、对象、函数），都具有对象的特性，即可自由拓展属性
  2. 所有的引用类型,都有一个`__proto__`（隐式原型）属性，属性值都是一个普通的对象
  3. 所有的`函数`都有一个`prototype`（显示原型）属性，属性值也是一个普通对象
  4. 所有的引用类型，__proto__属性值指向它的构造函数的prototype属性值
  5. 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__(即它的构造函数的prototype)中寻找
:::

**示例**
```javascript
//第一条，可自由拓展属性
var obj = {};
obj.a = 100;

var arr = [];
arr.a = 100;

function fn() {};
fn.a = 100;

//第二条，__proto__(隐式原型)属性
console.log(obj.__proto__)
console.log(arr.__proto__)
console.log(fn.__proto__)

//第三条，函数有prototype属性
console.log(fn.prototype);

//第四条，引用类型的__proto__属性值指向它构造函数的prototype的属性值
console.log(obj.__proto__ === Object.prototype) // true
console.log(arr.__proto__ === Array.prototype) // true
console.log(fn.__proto__ === Function.prototype) // true

//第五条，如果这个对象本身没有某个属性，那么会去它的__proto__(即它的构造函数的prototype)中寻找
function Foo(name, age) {
  this.name=name
}
//对函数的prototype属性（显式原型）拓展alertName属性
Foo.prototype.alertName = function () {
  console.log(this.name + '我是显示原型的属性')
}
var f = new Foo( '张三')
f.printName = function () { 
  console.log(this.name)
}

//测试
//f直接调用它的拓展printName属性
f.printName() // 张三

//f本身没有alertName属性，所以去它的构造函数Foo的prototype里面找
f.alertName() // 张三我是显示原型的属性
```

所有的引用类型（对象、数组、函数）都有构造函数
    
    var a = {} 其实是var a = new Object()的语法糖
    var a = [] 其实是var a = new Array()的语法糖
    function Foo() {} 其实是var Foo = new Function ()

## 获取对象原型

#### Object.getPrototypeOf 

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.name)
}
const boy = new Person('小明', 24)
const pro = Object.getPrototypeOf(boy)
console.log(pro) // {say: ƒ, constructor: ƒ}
```

## 确定属性是否存在于原型上

#### hasOwnProperty 

#### 在某些情况下，您需要知道属性是否存在于实例本身上，还是存在于对象委托的原型上
hasOwnProperty 是每个对象上的一个属性，它返回一个布尔值，指示对象是否具有指定的属性作为其自身的属性，而不是对象委托给的原型

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.name)
}
const boy = new Person('小明', 24)
for(let key in boy) {
  if (leo.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${boy[key]}`) // Key: name. Value: 小明
  }
}
```

## 检测对象是否是类的实例

#### instanceof 

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

function Animal () {}

const boy = new Person('小明', 24)

boy instanceof Person // true
boy instanceof Animal // false
```

## new一个对象的过程

**首先看一个例子**
```javascript
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}
 
const leo = Animal('Leo', 7) // undefined
```
上面的leo对象不会被创建，需要确保使用 new 关键字调用父类。 如果不这样做，则不会创建 this 关键字，也不会隐式返回

再看下面的例子，便于理解，注释掉的行是在函数上使用 new 关键字时幕后所做的事情
```javascript
function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)
 
  this.name = name
  this.energy = energy
 
  // return this
}
```
从上面的例子可以明白，new一个对象的过程：

:::tip new一个对象的过程
  1. 创建一个对象
  2. this指向这个新对象
  3. 执行代码，即对this赋值
  4. 返回this
:::

现在知道，不使用new调用一个构造函数，会有异常，那么如何避免呢？

可以通过之前学到的 [instanceof](/accumulate/JavaScript/JS构造函数-原型-原型链.html#检测对象是否是类的实例) 运算符来实现, 确保构造函数始终使用 new 关键字调用

**示例**
```javascript
function Animal (name, energy) {
  if (this instanceof Animal === false) {
    return new Animal(name, energy)
  }
 
  this.name = name
  this.energy = energy
}
```

:::warning 箭头函数
  * 箭头函数没有自己的 this 关键字。因此，箭头函数不能用于构造函数，如果您尝试使用 new 关键字调用箭头函数，它将抛出错误。
  * 箭头函数也没有 prototype(原型) 属性。
:::

## 原型链

  原型链就是把原型连接在一起组成的链，那么为什么要把原型连接在一起呢？  
  这就是继承啦，当你new一个对象，然后把另一个对象赋值给他的原型对象

**示例**
```js
function Person (){
    this.say = '我会说话'
}
function Boy (){
    this.sex = '我是男孩子'
}
Boy.prototype = new Person()  //实例化一个Person对象给Boy的显式原型prototype；
var child = new Boy() //child有Boy的属性也有Person的属性

console.log(child.sex) // 我是男孩子
console.log(child.say) // 我会说话

```

[参考学习地址](https://www.css88.com/archives/10022)
