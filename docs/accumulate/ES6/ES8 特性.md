# ES8特性

::: tip ES8特性
* async await  
* Object.entries()  
:::

## async await
::: danger TODO
待补充
:::

## Object.entries() 

::: warning 作用
将一个对象中可枚举属性的键名和键值按照二维数组的方式返回。  
若对象是数组，则会将数组的下标作为键值返回。
:::

```js
Object.entries({ one: 1, two: 2 })    //[['one', 1], ['two', 2]]
Object.entries([1, 2])                //[['0', 1], ['1', 2]]
```

#### 若是键名是Symbol，编译时会被自动忽略

```js
Object.entries({[Symbol()]:1, two: 2})  //[['two', 2]]
```

#### entries()返回的数组顺序和for循环一样，即如果对象的key值是数字，则返回值会对key值进行排序，返回的是排序后的结果

```js
Object.entries([1, 2, 7, 3]) // [['0', 1], ['1', 2], ['2', 7], ['3', 3]]
Object.entries({ 3: 'a', 4: 'b', 1: 'c' })    //[['1', 'c'], ['3', 'a'], ['4', 'b']]
```

#### 利用Object.entries()创建一个真正的Map

```js
var obj = { foo: 'bar', baz: 42 };
    
var map1 = new Map([['foo', 'bar'], ['baz', 42]]); //原本的创建方式
var map2 = new Map(Object.entries(obj));    //等同于map1

console.log(map1);// Map { foo: "bar", baz: 42 }
console.log(map2);// Map { foo: "bar", baz: 42 }
```

## Object.values()

::: warning 作用
只返回自己的键值对中属性的值
::: 

#### 与entries()返回的顺序规则一样，即如果对象的key值是数字，则返回值会对key值进行排序，返回的是排序后的结果，如果是数组则与for循环一致

```js
Object.values([1, 2, 7, 3]) // [1, 2, 7, 3]
Object.values({ 3: 'a', 4: 'b', 1: 'c' })    // ["c", "a", "b"]
```

#### entries()/values()/keys() 对比

```js
var obj = { foo: 'bar', baz: 42 };
console.log(Object.keys(obj)) //["foo", "baz"]
console.log(Object.values(obj)) //["bar", 42]
console.log(Object.entries(obj)) //[["foo", "bar"], ["baz", 42]]
```

## 字符串填充 padStart()和 padEnd()

::: warning 用法
String.padStart(targetLength, padding)

String.padEnd(targetLength, padding)

参数：字符串目标长度和填充字段
:::

填充函数只有在字符长度小于目标长度时才有效,而且目标长度如果小于字符串本身长度时，字符串也不会做截断处理，只会原样输出

```js
'h'.padStart(5)  // "    h"
'he'.padStart(5) // "   he"
'he'.padStart(5, '-') // "---he"
'Vue'.padEnd(10, '_*') // "Vue_*_*_*_"
'JavaScript'.padEnd(8, 'Hi')     //'JavaScript'
```