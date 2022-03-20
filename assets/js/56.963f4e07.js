(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{450:function(t,a,s){"use strict";s.r(a);var v=s(56),_=Object(v.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"http1-0-http1-1-http2-0特性及区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http1-0-http1-1-http2-0特性及区别"}},[t._v("#")]),t._v(" http1.0 http1.1 http2.0特性及区别")]),t._v(" "),s("h2",{attrs:{id:"http1-0特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http1-0特性"}},[t._v("#")]),t._v(" http1.0特性")]),t._v(" "),s("ul",[s("li",[t._v("无状态：服务器不跟踪不记录请求过的状态")]),t._v(" "),s("li",[t._v("无连接：浏览器每次请求都需要建立tcp连接")])]),t._v(" "),s("h4",{attrs:{id:"无状态"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#无状态"}},[t._v("#")]),t._v(" 无状态")]),t._v(" "),s("p",[t._v("对于无状态的特性可以借助cookie/session机制来做身份认证和状态记录")]),t._v(" "),s("h4",{attrs:{id:"无连接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#无连接"}},[t._v("#")]),t._v(" 无连接")]),t._v(" "),s("p",[t._v("无连接导致的性能缺陷有两种：")]),t._v(" "),s("p",[s("strong",[t._v("1. 无法复用连接")]),s("br"),t._v("\n每次发送请求，都需要进行一次tcp连接（即3次握手4次挥手），使得网络的利用率非常低")]),t._v(" "),s("p",[s("strong",[t._v("2. 队头阻塞")]),s("br"),t._v("\nhttp1.0规定在前一个请求响应到达之后下一个请求才能发送，如果前一个阻塞，后面的请求也给阻塞的")]),t._v(" "),s("h2",{attrs:{id:"http1-1特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http1-1特性"}},[t._v("#")]),t._v(" http1.1特性")]),t._v(" "),s("p",[t._v("为了解决http1.0的性能缺陷，http1.1出现了")]),t._v(" "),s("p",[t._v("http1.1特性：")]),t._v(" "),s("ul",[s("li",[t._v("长连接：新增Connection字段，可以设置keep-alive值保持连接不断开")]),t._v(" "),s("li",[t._v("管道化：基于上面长连接的基础，管道化可以不等第一个请求响应继续发送后面的请求，但响应的顺序还是按照请求的顺序返回")]),t._v(" "),s("li",[t._v("缓存处理：新增字段cache-control")]),t._v(" "),s("li",[t._v("断点传输")])]),t._v(" "),s("h4",{attrs:{id:"长连接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#长连接"}},[t._v("#")]),t._v(" 长连接")]),t._v(" "),s("p",[t._v("http1.1默认保持长连接，数据传输完成保持tcp连接不断开,继续用这个通道传输数据")]),t._v(" "),s("h4",{attrs:{id:"管道化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#管道化"}},[t._v("#")]),t._v(" 管道化")]),t._v(" "),s("p",[t._v("基于长连接的基础，我们先看没有管道化请求响应：")]),t._v(" "),s("p",[t._v("tcp没有断开，用的同一个通道")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("请求1 > 响应1 --\x3e 请求2 > 响应2 --\x3e 请求3 > 响应3\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("管道化的请求响应：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("请求1 --\x3e 请求2 --\x3e 请求3 > 响应1 --\x3e 响应2 --\x3e 响应3\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("即使服务器先准备好响应2,也是按照请求顺序先返回响应1")]),t._v(" "),s("p",[t._v("虽然管道化，可以一次发送多个请求，但是响应仍是顺序返回，仍然无法解决队头阻塞的问题")]),t._v(" "),s("h4",{attrs:{id:"缓存处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存处理"}},[t._v("#")]),t._v(" 缓存处理")]),t._v(" "),s("p",[t._v("当浏览器请求资源时，先看是否有缓存的资源，如果有缓存，直接取，不会再发请求，如果没有缓存，则发送请求")]),t._v(" "),s("p",[t._v("通过设置字段cache-control来控制")]),t._v(" "),s("h4",{attrs:{id:"断点传输"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#断点传输"}},[t._v("#")]),t._v(" 断点传输")]),t._v(" "),s("p",[t._v("在上传/下载资源时，如果资源过大，将其分割为多个部分，分别上传/下载，如果遇到网络故障，可以从已经上传/下载好的地方继续请求，不用从头开始，提高效率")]),t._v(" "),s("p",[t._v("在 Header 里两个参数实现的，客户端发请求时对应的是 Range 服务器端响应时对应的是 Content-Range")]),t._v(" "),s("h2",{attrs:{id:"http2-0特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http2-0特性"}},[t._v("#")]),t._v(" http2.0特性")]),t._v(" "),s("ul",[s("li",[t._v("二进制分帧")]),t._v(" "),s("li",[t._v("多路复用： 在共享TCP链接的基础上同时发送请求和响应")]),t._v(" "),s("li",[t._v("头部压缩")]),t._v(" "),s("li",[t._v("服务器推送：服务器可以额外的向客户端推送资源，而无需客户端明确的请求")])]),t._v(" "),s("h4",{attrs:{id:"二进制分帧"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二进制分帧"}},[t._v("#")]),t._v(" 二进制分帧")]),t._v(" "),s("p",[t._v("将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码")]),t._v(" "),s("h4",{attrs:{id:"多路复用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#多路复用"}},[t._v("#")]),t._v(" 多路复用")]),t._v(" "),s("p",[t._v("基于二进制分帧，在同一域名下所有访问都是从同一个tcp连接中走，http消息被分解为独立的帧，乱序发送，服务端根据标识符和首部将消息重新组装起来")]),t._v(" "),s("h2",{attrs:{id:"区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#区别"}},[t._v("#")]),t._v(" 区别")]),t._v(" "),s("ol",[s("li",[t._v("http1.0 到http1.1的主要区别，就是从无连接到长连接")]),t._v(" "),s("li",[t._v("http2.0对比1.X版本主要区别就是多路复用")])])])}),[],!1,null,null,null);a.default=_.exports}}]);