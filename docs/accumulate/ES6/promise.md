# promise

## 什么是Promise？

Promise是抽象异步处理对象以及对其进行各种操作的组件。

简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

所以Promise则是把类似的异步处理对象和处理规则进行规范化， 并按照采用统一的接口来编写，而采取规定方法之外的写法都会出错。

## 基本用法
```js
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 Pending 变为 Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 Pending 变为 Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。



Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
## promise 的生命周期

每个 promise 的生命周期一开始都会处于短暂的挂起（pending）状态，表示异步操作仍未完成，即挂起的 promise 被认定是未定的（unsettled）。

一旦异步操作完成，promise 就被认为是已定（settled）的并处于以下的两种状态之一：
* fulfilled: promise 的异步操作已完成。  
* rejected: promise 的异步操作未完成，原因可能是发生了错误或其它理由。  

内部属性 [[PromiseState]] 会根据 promise 的状态来决定自身的值，如 "pending"，"fulfilled"，"rejected"。该属性并未向 promise 对象暴露，所以你无法获取并根据 promise 的状态来进行编程。不过你可以在 promise 所处状态改变之后使用 then() 方法来指定一些操作。

所有的 promise 都包含 then() 方法并接受两个参数:
* 第一个参数是 promise 为 fulfilled 状态下调用的函数，任何于异步操作有关的额外数据都会传给该它。
* 第二个参数是 promise 为 rejected 状态下调用的函数，它会被传入任何与操作未完成有关的数据。

## Promises API

### Promise.resolve

静态方法Promise.reject()可以认为是new Promise()方法的快捷方式。

Promise.resolve方法也可以将现有对象转为Promise对象。

```js
Promise.resolve(42);
// 等价于
new Promise(function(resolve){
    resolve(42);
});
```

### Promise.reject

Promise.reject()方法也会返回一个新的 Promise 实例，该实例的状态为rejected。 

```js
Promise.reject(new Error("出错了"))
// 等价于
new Promise(function(resolve,reject){
    reject(new Error("出错了"));
});
```
### Promise.then

Promise.then作用是为 Promise 实例添加状态改变时的回调函数。

```js
promise.then(onFulfilled, onRejected) 
```

resolve(成功)时, onFulfilled 会被调用  
reject(失败)时, onRejected 会被调用

onFulfilled、onRejected 两个都为可选参数。

promise.then 成功和失败时都可以使用。 另外在只想对异常进行处理时可以采用 promise.then(undefined, onRejected) 这种方式，只指定reject时的回调函数即可。 不过这种情况下 promise.catch(onRejected) 应该是个更好的选择。

```js
promise catch 中如何传递参数
function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    return value + 1;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}
var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain中出现异常的时候会被调用
        console.error(error);
    });
 
// 4
```

### Promise.catch

实际上Promise.catch只是 promise.then(undefined, onRejected); 方法的一个别名而已。 也就是说，这个方法用来注册当promise对象状态变为Rejected时的回调函数。 

```js
var promise = Promise.reject(new Error("message"));
promise.catch(function (error) {
    console.error(error);
});
 
// Error: message
```

### Promise.all
Promise.all接收一个promise对象的数组作为参数，只要有一个promise对象返回失败，会立即抛出错误,只有数组里面的所有promise对象都执行成功才返回一个数组结果

```js
var p = Promise.all([p1, p2, p3]);
```

### Promise.race
Promise.all在接收到的所有的对象promise都变为 FulFilled 或者 存在一个Rejected 状态之后才会继续进行后面的处理， 与之相对的是Promise.race只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。

```js
var p = Promise.race([p1, p2, p3]);
```


参考资料:

[http://liubin.org/promises-book/](http://liubin.org/promises-book/)

[http://es6.ruanyifeng.com/#docs/promise](http://es6.ruanyifeng.com/#docs/promise)

[https://oshotokill.gitbooks.io/understandinges6-simplified-chinese/content/chapter_11.html](https://oshotokill.gitbooks.io/understandinges6-simplified-chinese/content/chapter_11.html)

