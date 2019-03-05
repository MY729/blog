# ES7 特性


::: tip ES7 只有两个特性
1. includes()
2. 指数操作符
:::

  

## 验证数组中是否存在某个元素

#### 不使用ES7语法

使用`indexOf()`验证数组中是否存在某个元素，这时需要根据返回值是否为-1来判断：
```javascript
  let arr = ['react', 'angular', 'vue'];
  if (arr.indexOf('react') !== -1) {
      console.log('react存在');
  }
```

#### 使用ES7语法

使用`includes()`验证数组中是否存在某个元素，这样更加直观简单：
```javascript
  let arr = ['react', 'angular', 'vue'];
  if (arr.includes('react')) {
    console.log('react存在');
  }
```

#### indexOf 和 includes的比较

* includes()能否发现NaN，而indexof()不能

```js
[NaN].includes(NaN) // true
[NaN].indexOf(NaN) // -1
```

* 只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些，是无法判断的.

```js
var arr = [1, [2, 3], 4]
arr.includes([2, 3])   //false
arr.indexOf([2, 3])    //-1
```

::: tip 总结
由于它对NaN的处理方式与indexOf不同，假如你只想知道某个值是否在数组中而并不关心它的索引位置，建议使用includes()。如果你想获取一个值在数组中的位置，那么你只能使用indexOf方法
:::

## 指数操作符(取幂运算符)

#### 不使用ES7语法

使用自定义的递归函数`calculateExponent`或者`Math.pow()`进行指数运算：
```javascript
  function calculateExponent(base, exponent) {
    if (exponent === 1) {
      return base;
    } else {
      return base * calculateExponent(base, exponent - 1);
    }
  }

  console.log(calculateExponent(7, 3)); // 输出343
  console.log(Math.pow(7, 3)); // 输出343
```

#### 使用ES7语法

使用指数运算符，就像+、-等操作符一样：
```javascript
  console.log(7**3);
```