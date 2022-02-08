# Promise对象

:::danger TODO: 学习地址
  * [JavaScript Promise迷你书](http://liubin.org/promises-book/)
  * [ES6](http://es6.ruanyifeng.com/#docs/promise)
  * [面试题](https://mp.weixin.qq.com/s/Wv3ZiaZzIP6pFdHHwnvk5w)
:::

## 什么是promise

promise是异步编程的一种解决方案，解决了回调地狱的问题

从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以使用同样的方法进行处理,它的强大之处还在于它的链式调用。


#### promise特点
1. 状态不受外界影响
2. 状态一旦确定就不再改变

#### promise缺点
1. 无法取消执行
2. 不设置回调函数，promise内部抛出的错误就无法返回外部
3. 当状态处于pending时，无法知道当前处于什么阶段（刚开始还是已结束）



## API

### promise.then
then 必须返回一个promise。也是因为这个规范，所以 promise 支持「链式调用」。


## 题目

### 使用Promise实现每隔1秒输出1,2,3 
```js
let arr = [1, 2, 3]
functin sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
function run() {
  for (let i = 0; i < arr.length; i++) {
    await sleep(1000)
    console.log(i)
  }
}
```

### 限制异步操作的并发个数并尽可能快的完成全部

* 题目
有8个图片资源的url，已经存储在数组urls中。

urls类似于['https://image1.png', 'https://image2.png', ....]

而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。

但有一个要求，任何时刻同时下载的链接数量不可以超过3个。

请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

```js
const urls = ['url1', 'url2', 'url3', 'url4', ...]
function loadImg(url) {
  return new Promise((resolve, reject) =>{
    const img = new Image()
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = url
  })
}
```

* 解决方案
用 Promise.race来实现，先并发请求3个图片资源，这样可以得到 3 个 Promise实例，组成一个数组promises ，然后不断的调用 Promise.race 来返回最快改变状态的 Promise，然后从数组（promises ）中删掉这个 Promise 对象实例，再加入一个新的 Promise实例，直到全部的 url 被取完

```js
function handle(urls, loadImg, num) {
  let data = [].concat(urls)
  let promiseArr = []
  promiseArr = data.splice(0, num).map((i, index) => {
    return loadImg(i).then(() => {
      return index
    })
  })
  (function loop() {
    let p = Promise.resolve(promiseArr)
    for(let i = 0; i < data.length; i++) {
      p = p.then((index) => {
        promiseArr[index] = loadImg(data[i]).then(() => {
          return index
        })
        return Promise.resolve(promiseArr)
      })
    }
  })()
}

```

