# EasyMock使用

我们知道mockJs可以模拟数据,让前端独立于后端开发，还有许多其他特点，详情可以戳 [这里](http://mockjs.com/) 了解

[EasyMock](https://easy-mock.com/)是一个构建模拟数据的平台，也可以说是一个在线mockJs平台

::: tip EasyMock优势
  1. 省去配置、安装mockJs步骤，解决多人协作Mock数据不互通问题
  2. 不需要在项目中写多余的代码，例如将Mock 数据写在代码里、json文件里
:::

平台默认创建了一个演示项目，打开如下：  
![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/mock-1.png)

使用时，建议接口的url跟后端给的一样

## 创建接口

EasyMock的写法和Mock.js一模一样

[Mock.js语法](http://mockjs.com/examples.html)

### 基础语法
```json
{
  "status": 0,
  "list|1-4": [{
    "id": "@id",
    "name": "@cname",
    "IP": "@ip",
    "email": "@email",
  }]
}
```

**Function使用**

```json
{
  "status": 0,
  name: function({ _req }) {
    return _req.query.name
  },
  data: function({ _req, Mock }){
    return _req.query.name ? {
      id: Mock.mock("@id()"),
      cname: Mock.mock("@cname()"),
    } : {}
  },
  "list|1-4": [{
    "id": "@id",
    "name": "@cname",
    "IP": "@ip",
    "email": "@email",
  }]
}
```
点击接口的预览，接口返回下面的数据，每点击一次send或者刷新时，data数组的长度在1-4随机变化<br/>
添加name参数，还会返回name值

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/mock-2.gif)

这里使用了Function, 可以获取到全部请求头，可以像js里一样写逻辑，写运算<br/>
需注意的是function 里要写传出Mock对象，不能直接@XX

**Function 参数说明**
| 对象   | 描述 |
| :---         |     :---      |
| Mock   | Mock 对象     |
| _req.url     | 获得请求 url 地址       |
| _req.method     | 获取请求方法      |
| _req.params     | 获取 url 参数对象       |
| _req.querystring     |  获取查询参数字符串(url中?后面的部分)，不包含 ?    |
| _req.query     | 将查询参数字符串进行解析并以对象的形式返回，如果没有查询参数字字符串则返回一个空对象       |
|_req.body	|当 post 请求以 x-www-form-urlencoded 方式提交时，我们可以拿到请求的参数对象|
|_req.path	|获取请求路径名|
|_req.header	|获取请求头对象|
|_req.originalUrl	|获取请求原始地址|
|_req.search	|获取查询参数字符串，包含 ?|
|_req.host	|获取 host (hostname:port)|
|_req.hostname	|获取 hostname|
|_req.type	|获取请求 Content-Type，不包含像 "charset" 这样的参数|
|_req.protocol	|返回请求协议|
|_req.ip	|请求远程地址|
|_req.get(field)	|获取请求 header 中对应 field 的值
|_req.cookies(field)	|获取请求 cookies 中对应 field 的值|


## vue项目中使用EasyMock

### 方法一：通过代理（推荐）

**1. 代理**

在项目找到配置代理的地方
```js
devServer: {
  proxy: {// proxy在这里是vue-cli3的写法，在vue-cli2中为proxyTable
    '^/api': {
      target: ' https://easy-mock.com/mock/5c1b4503fce7023df569bac2/demo/example',
      secure: false, // 若接口地址为https需配置这个
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
```
target: EasyMock中的Base URL

**2. 配置接口**

因为上面代理通过匹配api重写了请求，所以接口前面加一个`/api`，具体加什么根据你上面代理匹配的什么值决定<br/>
当然你可以在项目的请求中统一加一个`api`,这样接口url就不用单独加
```js
// 这里接口直接用axios调用get方法，只是方便演示，具体形式根据你实际的接口变通
export function getTableData (params) {
  return axios.get('/api/table/list', {params})
}
```
`/table/list`是EasyMock上的接口地址

### 方法二：直接在EasyMock上复制接口地址，粘贴在接口中直接调用, 可以参考下面例子中的[调用接口](EasyMock使用.html#调用接口)部分

## 参数查询的Mock数据
```json
{
  "status": 0,
  "err_msg": 'ok',
  // name可以不写，这里只是方便查看
  name: function({
    _req
  }) {
    return _req.query.name
  },
  data: function({
    _req,
    Mock
  }) {
    var nameArr = ["张黎明", "张凯阳", "孙苗青", "木木", "刘诗诗", "杨幂", "张韶涵"]
    var name = _req.query.name ? (nameArr.indexOf(_req.query.name) > 0 ? _req.query.name : null) : nameArr
    var obj = name ? Mock.mock({
      "list|3-10": [{
        "name|1": name,
        "url": "@url",
        "email": "@email",
        "address": "@county(true)",
        "string|1-10": "★",
        "number|1-100": 100,
        "boolean|1-2": true,
        "object|2": {
          "310000": "上海市",
          "320000": "江苏省",
          "330000": "浙江省"
        }
      }]
    }) : {}
    return obj
  }
}
```

#### 调用接口
```vue
<template>
  <div class="hello">
    <el-row>
      <el-col :span="4">
        <el-input placeholder="输入名称查询" v-model="name"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getData">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="string" label="评级"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="url" label="路由"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: '',
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let params = {
        name: this.name
      }
      axios.get('https://easy-mock.com/mock/5c1b4503fce7023df569bac2/demo/example/table/list', {params}).then((res) => {
        this.tableData = res.data.data.list
      })
    }
  }
}
</script>
```

**演示**

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/文章/mock-3.gif)

**参考文章：**
  1. [送给做前端开发的你: 可视化快速生成模拟数据服务——Easy Mock](https://baijiahao.baidu.com/s?id=1616625969023195600&wfr=spider&for=pc)
  2. [mockJs](http://mockjs.com/0.1/#)