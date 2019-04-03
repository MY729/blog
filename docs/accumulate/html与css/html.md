# html

## htmL实现提交表单并验证手机号

使用form标签创建表单 ，如果要正确地被提交，每个输入字段必须设置一个 name 属性

```html
<form action="#" method="post">
  手机号：<input type="text" name="phone" pattern="1(3|4|5|7|8)\d{9}" required/>
  <input type="submit" value="提交">
</form>
```
![An image](https://github.com/MY729/blog/raw/gh-pages/img/html相关/html-1.gif)