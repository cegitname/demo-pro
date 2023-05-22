# 源码构建
import 配置文件， 通过命令行参数过滤，build 出不同版本的 vue.js

# 数据驱动
数据驱动视图，不需要操作dom

# new vue 之后发生了什么

# 实例挂载
转化 template 为 render 函数
mountComponent 实例化watcher 定义 updateComponent(render())

# render
通过 createElement 创建 vnode

# Vnode
js 对象描述 dom， data, tag, children
vnode 映射到 dom 还要经历 create, diff, patch 过程

# createElement
规范 children
判断是否包含 tag. 如果是 string
内置组件 => 普通 vnode
已注册组件名 => 组件 vnode
是 componet => 组件 vnode

# update
调用 patch

# patch
判断 oldVnode
oldvnode 不存在 && !sameVnode => createElm
存在 =》 samevnode 不是真实 dom patchVnode
是 realDom =》 vnode => createElm

# createElm
尝试创建组件
拿到 vnode.children 遍历执行 createElm
insert 先子后父

# 组件化 createComponent

1. 构造子类构造函数
2. 安装钩子， componentVnodeHook 合并到 data.hook
3. 实例化 vnode 

# update => patch => !sameVnode => createElm =>尝试创建子组件 createComponent => init 钩子函数
拿到 data.hook => init => createComponentForVnode 创建 vue 实例
lifeCycle $arent.children.push(activeinstance)
update => preactiveInstace = activeinstace
patch 完成后=》 还原 activeInstance

# 响应式对象 initState
observe state

# Observer(value, dep, vmCount)
defineReactive
# defineReactive(obj, key, ...)
object.defineproperty
# dep
dep.target
dep.subs

# watcher
this.get => pushtarget
this.getter => addDep => dep.subs.push

# 派发更新 setter
dep.notify
queque.push(watcher)
runQueque => 排序 =》 遍历 => watcher.run => run.get => value => oldVal !== newVAl || newVal ==={} 
watcher.getter => updateComponent

# 组件更新  sameVnode
key, input,data,tag,isComment

## 新旧节点不同
以旧节点为参考节点，创建节点，插入dom.
移除旧节点的绑定，移除旧系欸按

## 新旧节点相同 => patchVnode
prepatch钩子
拿到 vnode 的实例配置等
更新 vm 属性
update
  所有模块执行 update 钩子
patch过程
都存在 相同
如果是文本，且不同，替换文本
如果不是文本=》 相同 =》 patchVnode
只新存在，旧不需要了，如果是文本就替换文本，addVnodes 批量更新到 elm
只有旧存在 removeVnodes 

## updatechildren 
循环结束条件 oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex

# compile
作用就是将 template 编译成 render 

# 编译入口
- 解析模板字符串生成 AST const ast = parse(template.trim(), options)
- 优化语法树 optimize
- 生成代码 const  code = generate(ast, options)

# parse
- 整个过程就是利用正则表达式顺序解析模板， 当解析到开始标签，闭合标签，文本分别执行对应的回调函数。最终生成 ast 树
- ast 元素节点共有3种类型，普通元素，表达式，纯文本

# codegen
就是将优化后的 ast 树转化成可执行的代码
1. 生成 render 代码串
2. render 函数就是 new Function 方式将字符串转换维可执行的函数

# Event
1. parse 阶段，解析模板，按原生事件/普通事件分类。并把回调函数字符串保留到对应的事件中。
2. codegen 阶段，把 ast 元素上的 events / native 生成 data 数据
3. dom 事件，在 patch 过程中会执行 updateDomListener
  - 获取 vnode.data.on 就是之前生成的 data 中对应的事件
  - 遍历 on 去添加监听，遍历 oldOn 移除监听
  - dom 的 add, remove 实际是调用原生的 addEventListener 和  removeEventListener
  - add 或 remove 的 handler 会用 with Macro Task（handler） 包裹，强制在 dom 回调函数执行期间如果修改了数据，这些数据会推入队列被当作 macroTask 在 nextTick 执行
4. 自定义事件中，在 render 阶段，如果是一个组件节点，会 createComponent 创建一个 vnode
  - 把 data.on 赋值给了 listener， 把 data.nativeon 赋值给 data.on
  - 对于自定义事件，把 listener 做为 vnode 的 componentOptions 传入
  - 在子组件初始化的时候，会执行 iniInternalComponent， 执行 initEvents
  - 对于自定义事件的不同，就是事件的添加和删除的实现是利用 vue 定义的事件中心

# vue 的事件中心
- 把所有的事件都用 vm._events 储存起来
- 执行 vm.$on 时，按事件名把回调储存
- 执行 vm.$emit 时，根据事件名找到所有的回调函数，遍历执行
- 执行 vm.$off 时，移除指定事件
- 执行 vm.$once 时，内部执行 $vm.on 回调后，vm.$off

# v-model

v-model in 表单
v-model in 组件

## pase 阶段 => 给 el 添加属性 directive 属性

addDirective 方法， 就是将 el, name, rawName,value 这些属性，构造成一个对象，并且 push 到 el.directives 中

el.directive.push({
    name, // model
    rawName, // v-model
    value,
    ...
})

## genData 过程
1. 拿到 cont dirs = el.directives 
2. 遍历 dirs.forEach
    判断拿到指令类型
    判断标签类型
    如果是 input 类型
     addProp 生成代码 value = 'message'
     addHandler 添加事件 @input =”“


# updateChildren



