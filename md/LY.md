# Mvvm

- M 即 Model 数据模型
- VM 即 Model 代表数据驱动视图，双向绑定
- V 即 View 代表视图
- 之前的前端开发模式是通过操作 DOM 改变视图，Mvvm 模式是通过修改数据改变视图，dom 成了对数据的映射
- 好处是不用去操作 dom, 只关心逻辑的处理，更容易解耦，拆分逻辑，代码复用，更容易维护


# 模块化

我们开发中常用的模块化

- ES6 module
  - import 导入import 导出export default / const / function / class /... 
- CommonJs
  - module.export 导出， 导入 require
- AMD （不常用）
  - define  

## Es6 Module 和 CoomonJs 的区别
- import 必须位于顶层作用域
- import 是对值得映射，不可修改
- require 支持动态导入，导出得是值得副本，可修改 不会影响原值 

## vue 中 import 都是组件吗？
都是模块，不一定是组件

vue组件： 组件是 template / script / style 组成得vue 文件，组件得特点是可复用，可嵌套

## 模块化解决得问题，相比之前得开发模式 <script src='xxx。js' />
- script 引入模块 作用域不是独立得，多个 script 标签的变量会命名冲突 污染全局作用域
- 每个 script 标签都会产生一次请求，增加开销
- 需要手动维护 script 标签的引入顺序

模块化就没有这些问题