# css

理解css工作原理可以设想每个html元素周围都有一个看不见的盒子

## 盒型结构

盒子模型分两种：
  * 标准W3C盒子模型  
  * IE盒子模型
![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/css/标准盒子模型.jpg)  

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/css/ie盒子模型.jpg)  

从上面两个示例图可以看出两者之间：  

  **相同点:** 两种盒子模型的范围都包括 margin（边界）、border（边框）、padding（填充）、content（内容）  
  **不同点：**  标准W3C盒子模型的内容宽度只有content，而IE盒子模型的内容宽度包括content、padding、border三部分

### 如何设置两种模型

利用CSS3 的属性 box-sizing  
```css
/* 标准模型 */
box-sizing: content-box;

 /*IE模型*/
box-sizing: border-box;
```
**示例：**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>示例</title>
  <style>
    .first-box {
      background-color: antiquewhite;
      width: 100px;
      height: 100px;
      padding: 10px;
      border: 1px solid palevioletred;
      margin: 5px;
      box-sizing: content-box; /*标准模型*/
    }
    .second-box {
      background-color: lightblue;
      width: 100px;
      height: 100px;
      padding: 10px;
      border: 1px solid blueviolet;
      margin: 5px;
      box-sizing: border-box; /*IE模型: width包含padding和border*/
    }
  </style>
</head>
<body>
  <div class="first-box" id="firstBox"></div>
  <div class="second-box" id="secondBox"></div>
</body>
<script>
  // offsetWidth 和 offsetHeight 是元素的 border+padding+content的宽度和高度
  var firstBox = document.getElementById('firstBox')
  console.log('标准模型', firstBox.offsetWidth)
  var secondBox = document.getElementById('secondBox')
  console.log('IE模型', secondBox.offsetWidth)
</script>
</html>
```
![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/css/css-1.jpg)  
## 行内/块级元素

  * **块级元素：** 元素前后有换行符，可以设置宽高
  * **行内元素：** 元素前后没有换行符，但是设置宽高

### display

## 定位

## 垂直居中布局

## 弹性布局
