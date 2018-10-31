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

## 指数操作符

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