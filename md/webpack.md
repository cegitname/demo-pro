# webpack 是一个模块打包工具，核心功能就是按规则和顺序的将多个模块组织在一起，最终生成一个 js 文件

# 为何 webpack
- 传统 script 嵌入标签
  - 手动维护 js 的加载顺序，多个 script 之间存在隐士的依赖关系
  - 每个 script 都意味着向服务器请求一次静态资源，拖慢网页的渲染速度
  - 污染全局作用域
- 模块化解决了
  - 通过导入 导出, 依赖关系清晰
  - 通过工具打包，页面加载的时打包后的资源，减少网络开销
  - 多个模块之间的作用域是隔离的，彼此不会有命名冲突

# es6 模块标准的缺点
- 无法 code splitting 和 tree shaking
- 多数 npm 模块是 CommonJs 形式，浏览器不支持
- 需要考虑浏览器兼容问题

# 模块打包工具
模块打包工具的任务就是解决模块间的依赖，使打包后的结果能在浏览器上运行
2种工作方式：
1. 将存在依赖关系的模式合并为单个 js 文件，一次性加载到页面
2. 加载一个入口模块，异步加载其他模块

# npm script
entry: 指定资源入口
output-filename: 指定打包后的 文件名
mode: 指定打包模式

# 默认目录
src: 工厂源代码
dist: 资源输出

# 配置文件
- 默认配置文件是 webpack.config.js
- 其他文件名需要用 --confg [filename].js 指定

# webpack-dev-server
devserver 的作用是接收浏览器的请求，然后将资源返回：
  - 当服务器启动时，先让 webpack 进行模块打包并将资源准备好
  - devserver 接收浏览器请求时，对 url 做校验
  - 如果时资源服务地址，就会在打包结果中寻找资源并返回给浏览器
  - 反之则读取硬盘中的源文件返回

# 模块打包
CommonJs
  通过 require 导入模块，通过 module.export 导出模块的内容
  require:
    - 该模块为加载过，首次执行该模块，获取结果导出
    - 已加载过，不会再次执行，从之前取模块执行结果导出
    - 可以接收表达式
  module.export
    - 模块内部会用 module 对象存放当前模块信息
    - 简化的导出方式 export.xxx = {} | function | xxx
    - 不合法的导出方式， exports = xxx
    - 不可以混用 exports.add = xxx module.exports = {xxx}

# es6 module
将每个文件都做为一个模块，每个模块都有自身作用域， export import 导出导入s
export:
  - export const 
  - export {name, add as getSum}
  - export default {xxx}

import: 
  - import {a,b} from 'xxx'
  - import {a,b as c} from 'xxx'

# commonmJs 区别 es6 module
- commonjs 动态的， es6 静态的
- es6 必须位于顶层作用域
- 赋值和动态映射，commonjs 时导出值得副本，导出得内容可修改，不影响本身。es6 动态映射，只读得
- 依赖循环，在 commonJs 中遇到依赖循环，没法得到预想得结果

# Amd
- 使用 define 定义模块
- 使用 require 加载模块

# 如何将有依赖关系得模块串联在一起
1. 最外层用一个匿名函数包裹，包裹整个 bundle， 并构成自身作用域
2. 声明 installModules 对象，在每个模块只在第一次加载时执行， 之后导出得值就被储存在整个对象里，再次加载会直接取值
3. 浏览器通过 _webpack_require_(module_id) 来完成模块导入
4. modules 对象，工程中所产生依赖关系得模块都会以 key-value 的形式存在 modules 中，key 是一个模块的 id, 由数字或者 hash 字符串构成。value 
5. bundle 在浏览器中执行，
  - 在浏览器中初始化执行环境，声明 installModules ， _webpack_require_ 
  - 加载入口模块，浏览器从他开始执行
  - 执行模块代码， 遇到 module.exports 则记录模块的导出值，遇到 _webpack_require，则会进入，执行其他模块
  - 在 _webpack_require_ 中判断加载的模块是否存在 installModules 中
  - 所有依赖的模块都执行完毕，回到入口模块，入口模块逻辑执行完，意味着 bundle 运行结束

资源输入输出
# 配置资源入口
entry 多种形式： 字符串，数组，对象，函数
1. 字符串 entry:'./src/index.js'
2. 数组的作用是将多个资源预先合并，打包时会将最后一个元素做为实际入口
3. 对象，多入口
4. 函数返回以上3种类型

# 配置资源输出
filename: 资源输出文件名
- 字符串
- 相对路径，即便不存在也没关系，webpack 会在输出资源时创建该目录
- 还可以是 [contentHash]，[chunkhash], [id], [name]
  - 可实现客户端缓存，在 filename 中使用了这些变量后，当chunk 的内容改变时，hash 也耕者改变，使得下次请求资源下载新版本，而不是本地缓存
  - 实际应用中一般使用 name, 他和 chunk 是一一对应的关系，可读性高，如果要控制缓存，还要加上 contentHash，每个chunk 产生的 contentHash 与自身内容相关，单个 chunk 内容的改变不会影响其他资源，客户端可以精准的让客户端缓存更新。

patch: 指定资源输出的位置，要求值必须是绝对路径 => path: path.join(__dirname, 'dist')
publicPath: 用来指定资源的请求位置
  - 页面中资源分为2种，一种是 html 页面直接请求的。另外一种是由 js 或者 css 发起的请求的间接资源。如图片，字体文件，publicPath 就是用于指定这些间接资源的请求位置
  - publicPath 有3种形式：
    1. html 相关 
      - publicPath: '' // 实际路径为 https://baidu.com/app/0.chunk.js
      - publicPath: './js' // 实际路径为 https://baidu.com/app/0.chunk.js
      - publicPath: '../assets/' // 实际路径为 => https://baidu.com/assets/0.chunk.js
    2. host 相关
      - publicPath: '/'  实际路径为 https://baidu.com/app/0.chunk.js
      - publicPath: '/js/' 实际路径为=> https://baidu.com/app/js/0.chunk.js
      - publicPach: '/dist/'  实际路径为=> https://baidu.com/dist/0.chunk.js
    3. CDN相关

# 预处理器
各种 loader
rules: [{test, exlude, use: { loader, options}}]

# 样式处理
  分离样式文件，当我们希望 css 存在于文件中，而不是 tyle 标签种，利于客户端缓存
  webpack 插件： extract-text-webpack-plugin, mini-css-extract-plugin 提取样式到 css 文件

# cssModule
不需要额外安装模块，只需要开启 css-loader 中的 modules 配置
rules:[ text: '.css$', use: { modules: true, localIdentName: [name]_[local]_[hash:base64:5] }]
name 模块名，local 选择符，hash 根据name 和 local 计算的5位的 hash 值

# 代码分段
optimization.splitChunks
默认配置
  - 被多次引用或者存在于 node_modules 中的模块更倾向于通用模块
  - 提取后的 js chunk 体积大于 20kb, css chunk 大于 50kb
  - 按需加载过程中，并行请求的资源最大值小于 30. 指的是通过动态插入 script 标签的加载脚本，不希望加载过多资源，每个请求都要带来建立和释放链接的成本。
  - 首次加载，并行请求资源数最大值 <= 30. 

**chunks** 
  - async 默认值，只提取异步 chunk
  - initial 只对入口 chunk 生效
  - all 同时开启2种策略

**cacheGroups 分离 chunks 的规则**
  - 存在 node_modules 中的
  - 被多次引用的

**异步 chunk 配置**
  - output.chunkFilename: [name].js
  - import(/* webpackChunkName:'xxxx'*/ './home.vue')

# 生产环境配置
定义环境变量： new Webpack.definePlugin({ ENV: 'production' })

dev: 'webpack-dev-server --config = webpack.development.config.js'

build: 'webpack-dev-server --configg = webpack.product.config.js'

提取公用代码到 webpack.common.config.js  通过 webpack-merge 合并配置

# source-map 
生成一个对应源代码的映射文件，bundle 文件会追加注释来识别 map 文件的位置，当打开开发工具时，map 文件会同时被加载，浏览器用这个 map 文件对 bundle 文件做解析，分析出源代码的目录结构和内容

安全： 生产环境 为了安全有2种策略，
1. hide-source-map ，map 不在 bundle 添加，上传三方服务器，三方服务来解析源码，并给出错误
2. nosource-source-map 或者打包出 source-map 通过 nginx 配置只对内网开放

# 资源压缩
将资源发布前，会对代码进行压缩，使得代码体积变小，且不可读
压缩 js
-  uglifyJs webpack3 已继承
- webpack4 官方默认使用了 terser 的插件teser-webpack-plugin
压缩 css
- 压缩 css 的前提是使用 mini-css-extarct-plugin 将样式提出来
- 接着使用 optimize-css-assets-webpack-plugin 进行压缩

# 打包优化
happypack
通过多线程来提升 webpack 打包速度的工具。 webpack 是单线程，由于需要递归解析，转译。开启多个线程，并行对多个模块进行转译。

# 缩小打包作用域
happypack 属于增加资源，缩小范围可以通过 exclude 和 include

# DLLPlugin
他和代码片段有点类似，都可以用来提取公共模块。但本质上有一些区别。
- dllPlugin 则是将 vendor 完全拆分出来，定义一套自己的配置，并独立打包。在实际构建工程时，不用再对他进行任何处理，直接取用即可。

# treeShaking
去除死代码，配置 sideEffect

# 长效缓存
output.chunkFileName = isPro ? [name].[chunkhash:8].chunk.js : [name].chunk.js
filename: isPro ? [name].[contenthash:8].js: [name].js

# webpack 打包机制
1. webpack 会先进行一次配置项的检查
  当配置项中有无效字段， webpack 会终止打包并给出错误提示

2. 缓存加载
  2种缓存，一种是内存，每次构建使用的内存都会被释放掉。另一种是文件系统缓存，可以一直存在

3. 模块打包
  - 当我们执行打包命令时，会创建一个 compiler 实例， 他控制着总任务流程，并把这些任务分配给其他模块来做。不是直接调用这些插件，而是暴露出流程中的钩子
  
  - 实例化一个 compilation 她负责更为底层的任务。例如创建依赖关系图，单个模块的处理，以及渲染模板。他也提供了钩子给其他模块使用
  
  - 初始化 compoler 和 compilation 是打包的开始流传。然后就是构建依赖关系图

  - 首先拿到入口路径，找到入口文件。这个查找的过程是通过 Resolver 实现的，还用于获取模块文件依赖关系时，查找实际的文件路径。

  - resolver 找到这个文件后，会返回一个对象，包含了源码的引用路径，找到的实际路径以及上下文等，信息中不包含源代码。实际内存从模块工厂获取

  - 模块工厂接收 resolve 信息，返回一个模块对象，模块工厂中得到的源码是各种各样的，通过 parse 进行解析，转换为 ast 抽象语法树，并且进一步寻找文件依赖
    - 模块工厂用来解析模块，生成模块实例，提取模块依赖，以及解析和处理模块路径

  - 经过 parser 处理后，在模块对象中会生成一个 dependencies 数组，记录他所依赖的模块

 4. 模板渲染
 
  - 当所有模块都处理完，webpack 会把这些模块组装在一起，并生成一个 chunk， 最终将 chunk 通过模板渲染转化为最终代码
  
  - 对不同类型的模块的依赖关系，webpack 内部都有对应的模板，根据模块信息，拼装模板，把内容填到模板中，得到最终代码

#  模块热替换
HMR 需要手动开启，并且有一些必要条件
webpack 本身的命令行不支持 HMR, 使用 devServer 开启 HMR  devServer: { hot: true }
  HRM 原理
  浏览器就是客户端，webpack-dev-server 就相当于服务器。
  HMR 的核心就是客户端从服务器拉去更新后的资源，拉取的不是整个资源文件，而是 chunk diff, 即 chunk 需要更新的部分。
- 第一步就是确定浏览器什么时候拉取这些更新。这需要 WDS 对本地源文件进行监听，实际上 WDS 与浏览器之间维护了一个 webscoket，当本地资源发生变化时，WDS 会向浏览器推送更新事件，并带上这个词构建的 hash, 让客户端与上一次资源进行比对。
- 有了拉去资源的时机，下一步就是要知道拉取什么，浏览器会向WDS 发起一个请求，获取更改的文件列表。返回结果告诉客户端需要更新的 chunk 为 xxx, 版本为 xxx，客户端可以借助这些信息继续向 WDS 获取该 chunk 的增量更新。
- 客户端获取到 chunk 的更新信息。然后通过webpack 提供的 API 针对自身场景进行处理