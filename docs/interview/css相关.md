# css相关

## BFC

### BFC是怎样形成的

::: tip 一个BFC是一个html盒子满足以下任何一个条件
  * 浮动：float的值不为none
  * 绝对定位元素：position的值不为static和relative
  * display的值为tabel-cell、table-cartion、inline-blocks、inline-flex、flex的其中一个
  * overflow的值不为visible
:::

如果想要创建一个新的BFC，只需要给它添加上面提到的任何一个CSS样式就可以了

#### BFC会导致子元素外边距折叠，如果不在同一个BFC则不会有这种问题

#### 参考文章 [https://www.w3cplus.com/css/understanding-block-formatting-contexts-in-css.html](https://www.w3cplus.com/css/understanding-block-formatting-contexts-in-css.html)  

## 知识点：后定义的样式会覆盖前面的

题目：两个div颜色分别是什么
```html
<div class="red blue">123</div>
<div class="blue red">123</div>
```

```css
.red {
  color: red
}

.blue {
  color: blue
}
```

答案： 都是蓝色