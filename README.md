# practice-react-ssr
react ssr demo


同构
------------

1. 同一套运行在服务器端和客户端。通过不同的webpack配置将代码打包成不同的bundle.js（两个入口），server端由node使用render进行渲染。client端使用hydrate进行渲染。
2. ssr:服务器端渲染,服务器端通过代码生成静态的HTML页面，负责首次加载时的展现。
3. csr:客户端渲染,客户端通过代码生成包含交互的js文件，服务器端通过script标签对js进行引入。当有交互发生时，客户端代码被触发，进行后续的处理。

关于ReactDOM.render和ReactDOM.hydrate
1. React的事件绑定在服务端渲染时，并不是以内联的形式出现，所以ReactDOMServer渲染的内容在【结构-样式-行为】的关系中缺失了行为。
2. React v15中，ReactDOM.render方法根据data-react-checksum的标记，复用ReactDOMServer的渲染结果，不重复渲染，并根据data-reactid属性找到需要补充事件的元素，进行事件绑定的处理，补充了行为。
3. React v16中，不在有data-reac的属性，而是尽可能的复用SSR的HTML结构。所以就导致ReactDOM.render方法不能再根据data-react-checksum判断是否重用，但如果每次都要尽可能复用，性能和语义都会出现问题。所以提供了一个新的API，ReactDOM.hydrate

路由
------------
1. 客户端 使用BrowserRouter
2. 服务端 使用StaticRouter
