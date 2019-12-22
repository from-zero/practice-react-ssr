# practice-react-ssr
react ssr demo


同构 组件component
------------

1. 同一套代码运行在服务器端和客户端，尽可能的重用代码。通过不同的webpack配置将代码打包成不同的bundle.js（两个入口），server端由node使用render进行渲染。client端使用hydrate进行渲染。
2. ssr:服务器端渲染,服务器端通过代码生成静态的HTML页面，负责首次加载时的展现。
3. csr:客户端渲染,客户端通过代码生成包含交互的js文件，服务器端通过script标签对js进行引入。当有交互发生时，客户端代码被触发，进行后续的处理。

关于ReactDOM.render和ReactDOM.hydrate
1. React的事件绑定在服务端渲染时，并不是以内联的形式出现，所以ReactDOMServer渲染的内容在【结构-样式-行为】的关系中缺失了行为。
2. React v15中，ReactDOM.render方法根据data-react-checksum的标记，复用ReactDOMServer的渲染结果，不重复渲染，并根据data-reactid属性找到需要补充事件的元素，进行事件绑定的处理，补充了行为。
3. React v16中，不在有data-reac的属性，而是尽可能的复用SSR的HTML结构。所以就导致ReactDOM.render方法不能再根据data-react-checksum判断是否重用，但如果每次都要尽可能复用，性能和语义都会出现问题。所以提供了一个新的API，ReactDOM.hydrate

路由router
------------
1. 客户端 使用BrowserRouter
2. 服务端 使用StaticRouter,传参location。
  (不传参location，其实也能渲染出其他的页面，如/about，但是查看源码可以看出代码结构并不是服务端提前渲染的about页面的。而是由客户端匹配到了路由跳转的)

数据store
------------
1. 客户端 通过生命周期的钩子函数didMount等，使用axios、fetch发起请求获取数据
2. 服务端 获取数据，初始化store

改进
-------------
**Promise**
1. finally:返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
2. allSettled:返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。

**axios**
可以通过redux-thunk的withExtraArgument给客户端和服务端携带不同的axios对象

**Proxy**
可以使用http-proxy-middleware的库
express可以使用express-http-proxy的库

**图标**
浏览器默认会发送一个获取网站图标favicon.ico的请求。
1. 可以在页面head标签中添加 <link rel="icon" href="data:;base64,="> 阻止请求发送
2. 在web服务的跟目录下放置favicon.ico图标(本示例中是public下)

css
------------
client端通过使用css-loader,style-loader解析css并生成style标签
server端没有document对象，无法使用style-loader，需要使用isomorphic-style-loader生成style标签。只是这种方式并不是通过服务端直接将style渲染在页面上，而还是通过客户端的bundle.js进行动态插入.所以暂时没有用 - -？？

状态码处理
------------
可以通过服务端的staticRouter的context属性，在路由匹配的时候做上标记，依靠context中的标记返回不同的状态码

降级渲染
------------
client端配置常规CSR,node server在响应浏览器时可以根据url参数、服务器配置、并发数量等判断是返回SSR应用还是CSR应用。在渲染页面时根据是否有window._context区分SSR和CSR从而选择使用React.hydrate还是React.render

局部css
------------
client端使用css-loader的modules参数
server端使用特有的style._getCss()【isomorphic-style-loader】获取css样式，并通过staticContext保存然后嵌入SSR的html页面
在判断是否是server端然后获取style._getCss时，可以使用isomorphic提供的高阶组件withStyles

SSR vs SPA
------------
与传统 SPA (单页应用程序 (Single-Page Application)) 相比，服务器端渲染 (SSR) 的优势主要在于：
1. 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
请注意，截至目前，Google 和 Bing 可以很好对同步 JavaScript 应用程序进行索引。在这里，同步是关键。如果你的应用程序初始展示 loading 菊花图，然后通过 Ajax 获取内容，抓取工具并不会等待异步完成后再行抓取页面内容。也就是说，如果 SEO 对你的站点至关重要，而你的页面又是异步获取内容，则你可能需要服务器端渲染(SSR)解决此问题。
2. 更快的内容到达时间 (time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。通常可以产生更好的用户体验，并且对于那些「内容到达时间(time-to-content) 与转化率直接相关」的应用程序而言，服务器端渲染 (SSR) 至关重要。

使用服务器端渲染 (SSR) 时还需要有一些权衡之处：
1. 开发条件所限。浏览器特定的代码，只能在某些生命周期钩子函数 (lifecycle hook) 中使用；一些外部扩展库 (external library) 可能需要特殊处理，才能在服务器渲染应用程序中运行。
2. 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。
3. 更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 (high traffic) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。



参考文章
------------
[Vue.js服务器渲染指南](https://ssr.vuejs.org/zh/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-%EF%BC%9F)
