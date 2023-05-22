# entry
指定资源打包的入口

# output
- filename 指定打包后的文件名
- path 必须是绝对地址 path.resolve()
- chunkfileName: 异步chunk配置
- publicPath 指定间接资源请求得地址
  val => '' => https://exe.com/app/0.chunk.js
  val => './js' => https://exe.com/app/js/0.chunk.js 
  val => '/' => https://exe.com/0.chunk.js 

# commonjs
- require, module.exports
- 该模块为加载过，首先执行该模块，获取最终的结果导出
- 已加载过，不会再次执行，而是取之前的模块结果导出
- 可以接收表达式

# es module
export , import

## 区别
es module 位于顶级作用域
es module 不可修改
require 可以接受表达式，导出值得副本，可修改
esmodule 是动态映射，只读

# 如何将有依赖关系得模块串联在一起
1. 最外层用匿名函数，包裹整个 bundle， 并且构成自身作用域
2. 声明 installModules 对象，每个模块只有第一次被加载会执行，导出值被储存在这个对象里，再次加载取之前得值
3. _webpack_require 函数，在浏览器通过调用 _webpack_require(module_id) 来完成模块导入
4. modules 对象，工程中所有产生依赖关系得模块都会以 key-value 得形式存在 modules 中。参数赋予了模块导入，导出得能力
在浏览器中执行流程：
1. 初始化执行环境，定义 webpack_require, installModule
2. 加载入口模块，浏览器从他开始执行
3. 执行模块遇到 module.exports 则记录模块得导出值，如果遇到了 webpack_require 函数，则进入，执行其他模块
4. 在 webpack_require 中判断加载得模块是否存在 installModules 中，否则执行第三步
5. 所有依赖执行完毕，回到入口模块，入口模块逻辑执行完，意味着 bundle 运行结束

# 打包机制
1. 配置项检查，遇到非法属性，抛出错误
2. 缓存加载，2种缓存，一种内存中，一种文件系统中。在Build 模式下，可以使用文件系统缓存，因为每次构建后，使用得内存会被释放掉。而文件系统缓存会一直存在。
3. 打包
   - 初始化 compiler 控制着打包任务流程，他不会直接调用 plugin 而是对外暴露钩子函数，交给其他模块来做
   - 初始化 compilation ，它负责更为底层得任务，如构建依赖关系图，单个模块得处理，以及模板渲染，它也提供了钩子供其他模块使用
   - 完成初始化后，就是构建依赖关系图
   - 首先拿到入口文件，通过 Resolver 查找文件得实际路径
   - resolve 找到文件后，会返回一个对象，包含源代码得引用路径，信息中不会包含源代码，实际内容从模块工厂中获取
   - 模块工厂接收resolve 信息， 返回一个模块对象，模块工厂中的模块源码各种各样，所以需要警告 parse 进行解析，转为 ast 语法树，并且进一步解析模块，生成模块实例，提取模块依赖
   - 经过parse 之后，在模块对象中会生成一个 dependencies 数组，记录它所有依赖得模块
4. 模板渲染
   - 当所有模块都处理完， webpack 会把这些模块组装在一起，并生成一个 chunk, 最终将 chunk 通过模板渲染转换为最终代码
   - 对于不同类型得模块得依赖关系，webpack 内部都有对应得模板，根据模块信息，拼装模板，把内容填到模板中取，得到最终代码


# 热替换
devserver 和 浏览器之间维护了一个 websocket
devserver 监听本地文件，当有文件更改，想浏览器推送更新事件，并携带本次更新得 hash
浏览器继续向 devserver 获取更改得文件列表，devserver返回需要更新得 chunk 为 xx 版本为 xx
客户端在根据这些信息继续向 WDS 获取该 chunk 得增量更新

# flex

flex:1 代表什么
flex: grow, shrink, basis 的简写 默认值 0, 1, auto 