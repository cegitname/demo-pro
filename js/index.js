/***
 * defer 和 script 的区别
  script parse 解析 --> 遇到js，等待下载，执行  --> 继续解析
  
  defer parse解析 ---> 遇到js,并行下载，不执行 ---> 接续解析--> 解析完执行 js

  async parse解析 --> 遇到js，并行下载，---> 下载完，解析停，等待执行 ---> 执行完，继续解析

* */

/**
 * this 指向
 * 1. 函数体内，简单的函数调用，严格模式 this 绑定到 undefined, 否则 window
 * 2. 一般 new 调用，绑定到新创建的对象上
 * 3. 一般 call / apply / bind 调用， 绑定到指定的对象上
 * 4. 由上下文对象调用， 绑定到该对象上
 * 5. 箭头函数中根据外层上下文绑定 this 决定指向
 *    - new 操作符比 bind 优先级高
 *    - 箭头函数无法改变 this 指向
 * */

/**
 * 垃圾回收
 *  引用计数
 *    被引用1次 计数1次
 *    当被引用=0 即可清空
 *    缺点是，无法计算循环引用
 * 
 * 标记清除
 *    定期从 window 遍历各属性，能得到值就保留，得不到就清除
 *    从根节点往下遍历，只要找到就标记一下
 *    其他找不到的就清除
 * */

/**
 * jsBridge 
 * 1. app 通过 webview 承载 h5
 * 2. h5 不能通过 webview 调用 app 的功能
 * jsBridge 的常见实现方式
 * 1. 注册全局 API
 * 2. url.scheme
 *    通过自定义协议头，一般为 appname:// 拼接 url data
 * */

const sdk = {
  invoke(url, data, onSucc, onError) {
    const iframe1 = document.createElement('iframe')
    iframe1.style.visibility = 'hidden'
    document.body.appendChild(iframe1)

    iframe1.onload = () => {
      const content = iframe1.contentWindow.document.innerHtml
      onSucc(JSON.parse(content))
      iframe1.remove()
    }

    iframe1.onerror = () => {
      onError()
      iframe1.remove
    }

    iframe1.src = `my-app-name://${url}?=${JSON.stringify(data)}`
  }
}

/**
 * v2 v3 react 的 diff 算法的区别
 * diff 算法
 * 1. 严格的 diff 算法， 实际复杂度是 o3
 * 2. vue 和 react 的 diff 算法是优化过的，实际复杂度降到了 On
 *    - 只同级比较
 *    - tag不同，删除重建
 *    - 子节点通过 key 区分
 * 3. 不同
 *    react -> 仅向右移动
 *    vue -> 双端比较，4个指针想中间移动对比
 *    vue3 最长递增子序列
 *    还是2端向中间对比，通过对比最长递增子序列不动，其他的移动
 * */

/**
 * Retina 屏幕的 1px 像素如何实现
 * #box {
 *    content: '';
 *    position: absolute;
 *    left:0;
 *    bottom:0;
 *    width:100%;
 *    height:1px;
 *    transform: scaleY(.5)
 * }
 * */


/**
 * flex-basic
 * 主轴上剩余的可分配空间，值是初始化最小值，具体最大值还是最小值，根据 flex-grow flex-shrink 值来决定
 * 
 * felx:1 代表 flex-grow: 1 可放大, flex-shrink 可缩小， flex-basic:0%  初始化主轴可分配剩余空间最小可为0
 *  
 * */


/**
 *  cookie 
 *  1. 有跨域限制
 *  2. http无状态，每次请求都需要 cookie 帮助识别身份
 *  3. 服务端可以向客户端 set-cookie， cookie 大小限制 4kb
 *  4. 跨域传递，客户端和服务端需要设置 withCredentinal
 *  5. cookie 是 http 请求自动携带本域的 cookie, 默认浏览器储存
 * */

/**
 * ajax
 * */

function fetch(options) {
  const xhr = new XMLHttpRequest()
  const { methods, onSuccess, onError, url, data } = options
  const params = data
  if (methods === 'GET')
    xhr.open('GET', `${url}?=${JSON.stringify(params)}`)
  xhr.send(null)
  if (methods === 'POST')
    xhr.open('POST', url)
  xhr.send

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        onSuccess && onSuccess(xhr.responseText, xhr.responseXML)
      }
    }
  }
}

/**
 * url 到页面的完成过程
 * 1. 网络请求
 *    - 解析DNS，建立 tcp 链接
 *    - 拉取html，遇到静态资源，继续发起请求
 * 
 * 2. 构建dom树
 *    - 构建 dom 树
 *    - 构建 css 树
 *    - 合并生成 render tree
 * 
 * 3. 渲染
 *    - 计算 dom 尺寸，定位，渲染到页面
 *    - 遇到js 可能执行
 *    - 遇到 css, 图片加载，可能重新渲染
 * 
 * */

/**
 * 减少重排
 * 
 * 1. bfc 特性，块级格式化上下文
 *    float
 *    overflow: hidden / auto / scroll
 *    display: felx / inline-block
 *    positon: absolute / fixed
 *  
 * */


/**
 * 网页和 iframe 如何通讯
 * 
 * window.iframe1.contentWindow.postMessage('message','*')
 * 
 * window.addEventListener('message', event => {})
 * */

/**
 * 首屏优化
 * - 路由懒加载
 * - 服务端渲染 ssr
 * - app 预取
 * - 图片懒加载
 * */

/**
 * 图片懒加载
 *  1. <img data-src='xxx' />
 *  2. function loadImg
 *    1. imgs = document.queryselectorAll('img[data-src]')
 *    2. img forEach
 *    3. img.getBoundingClientRect()
 *    4. img.src = data.dataset.src
 *    5. img.removeAttribute('data-src')
 *  3. throttle(()=>{loadImg} , 100)
 *  */

/**
 * vue-router 的三种模式
 * hash #分割 onhashchange
 * webHistory  pushState popsatete  onpopsatatechange  
 * memoryHistory 路由无变化
 * */

/**
 * prefetch preload
 * - prefetch 资源在未来页面使用，空闲加载
 * - preload 资源在当前页使用，优先加载
 * */


/**
 * 节流，防抖
 * */

function debounce(fn, wait) {
  let timer = null

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait);

  }
}

function throttle(fn, wait) {
  let timer = 0
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = 0
    }, wait)
  }
}

console.log(1 + null)