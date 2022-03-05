# HTML+CSS

## 实现宽高等比例2：1的矩形

::: tip 知识点
`padding-top/bottom`和`margin-top/bottom`都是相对于父元素的宽度来计算的
:::

#### 为什么不基于高度计算？

主要是匹配常用使用场景，因为 CSS 的基本模型是着重于“排版”的需求，因此水平和垂直方向其实并不是同等权重的，更精确的说，是文字书写方向决定的。常见的横排文字时，我们排版的出发点是水平宽度一定，而垂直方向上是可以无限延展的。竖排文字则相反。所以在竖排文字时，margin/padding-* 其实就都按照 height 而不是 width 计算了。
参考作者贺师俊回答：https://www.zhihu.com/question/20983035/answer/16801491


```html
<div class="box">
    <div class="content">
        <div class="item">
            因为 CSS 的基本模型是着重于“排版”的需求，因此水平和垂直方向其实并不是同等权重的，更精确的说，是文字书写方向决定的。常见的横排文字时，我们排版的出发点是水平宽度一定，而垂直方向上是可以无限延展的。竖排文字则相反。所以在竖排文字时，margin/padding-* 其实就都按照 height 而不是 width 计算了
        </div>
    </div>
</div>
```
```css
.box {
    width: 40%;
}

/* 核心代码 */
.content { 
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    position: relative;
}

.item {
    position: absolute;
    width: 100%;
}
```
