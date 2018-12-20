module.exports = {
  title: '林夕梦木子李',
  description: '我有一只小毛驴呀~我从来也不骑~~',
  head: [
    ['link', { rel: 'icon', href: `/img/logo.ico` }]
  ],
  // 注入到当前页面的 HTML <head> 中的标签
  base: '/blog/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  host: 'localhost',
  port: 7729,
  // 侧边栏
  themeConfig: {
    logo: '/img/header.png',
    // 导航栏
    sidebarDepth: 1, // 为2 则将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav:[
      { text: '前端学习', link: '/accumulate/' }, // 内部链接 以docs为根目录
      { text: '前端常见问题', link: '/problem/' }, // 内部链接 以docs为根目录
      { text: '前端书籍', link: '/books/' }, // 内部链接 以docs为根目录
      { text: '算法', link: '/algorithm/' }, // 内部链接 以docs为根目录
      { text: '网络', link: '/internetwork/' }, // 内部链接 以docs为根目录
      { text: '文章', link: '/article/' }, // 内部链接 以docs为根目录
      { text: 'interview', link: '/interview/' }, // 内部链接 以docs为根目录
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/MY729'},
          { text: '花瓣地址', link: 'http://huaban.com/tj3aawhzdp/'}
        ]
      }        
    ],
    // 侧边栏
    sidebar: {
      // 前端学习  docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
      '/accumulate/': [
        '/accumulate/', // accumulate文件夹的README.md 不是下拉框形式
        {
          title: 'JavaScript',
          collapsable: false,
          children: [
            // 以docs为根目录来查找文件 
            // 上面地址查找的是：docs>accumulate>JS>test.md 文件
            // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
            '/accumulate/JavaScript/发布-订阅和观察者模式', 
            '/accumulate/JavaScript/判断数据类型和数组类型',
            '/accumulate/JavaScript/JS构造函数-原型-原型链',
            '/accumulate/JavaScript/常用数组和字符串方法',
            '/accumulate/JavaScript/Promise对象',
          ]
        },
        {
          title: 'react',
          collapsable: false,
          children: [
            '/accumulate/react/基础学习',
          ]
        },
        {
          title: 'vue',
          collapsable: false,
          children: [
            '/accumulate/vue/API详解',
            '/accumulate/vue/原理解析'
          ]
        },
        {
          title: 'html与css',
          collapsable: false,
          children: [
            '/accumulate/html与css/css',
            '/accumulate/html与css/css3',
            '/accumulate/html与css/html'
          ]
        },
        {
          title: 'ES6',
          collapsable: false,
          children: [
            '/accumulate/ES6/数组常用方法',
            '/accumulate/ES6/ES7 特性',
            '/accumulate/ES6/基础学习',
          ]
        },
        {
          title: 'vuex',
          collapsable: false,
          children: [
            '/accumulate/vuex/vuex基础实践',
          ]
        },
      ],
      // 常见问题
      '/problem/': [
        '/problem/',
        'vue常见问题',
        'js常见问题'
      ],
      // 前端书籍
      '/books/': [
        '/books/',
        {
          title: 'javascript设计模式与开发实践',
          collapsable: false,
          children: [
            '/books/javascript设计模式与开发实践/第一部分-基础知识',
            '/books/javascript设计模式与开发实践/第二部分-设计模式',
          ]
        },
      ],
      // 算法 docs文件夹下面的algorithm文件夹 这是第二组侧边栏 跟第一组侧边栏没关系
      '/algorithm/': [
        '/algorithm/',
        '单例模式',
        '在二维数组中查找',
        '数组去重'
      ],
      // 面试
      '/interview/': [
        '/interview/',
        'javascript相关',
        'vue相关',
        'html相关',
        'css相关',
        '网络相关',
      ],
      // 网络
      '/internetwork/': [
        '/internetwork/',
        'http请求和响应报文结构',
        'HTTP请求方法详解',
        'TCP三次握手',
      ],
      // 文章
      '/article/': [
        '/article/',
        'markdown语法详解',
        'github在线预览vue项目',
      ]
    }
  }
}
