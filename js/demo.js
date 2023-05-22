// // let user = {
// //   name:'wc',
// //   age:1,
// //   _p: 'xxx'
// // }


// // let u = new Proxy(user, {
// //   get(target, prop) {
// //     if(prop.startsWith('_')) {
// //       throw new Error('不可访问')
// //     } else {
// //       return target[prop]
// //     }
// //   },
// //   set(target,prop,val) {
// //     if(prop.startsWith('_')) {
// //       throw new Error('不可访问')
// //     } else {
// //       target[prop] = val
// //       return true
// //     }
// //   },
// //   deleteProperty(target,prop,val) {
// //     if(prop.startsWith('_')) {
// //       throw new Error('不可访问')
// //     } else {
// //       delete target[prop]
// //       return true
// //     }
// //   },
// //   ownKeys(target) {
// //     return Object.keys(target).filter( item => !item.startsWith('_'))
// //   }
// // })

// // for(var i in u) {
// //   console.log(u[i])
// // }

// // // apply
// // let sum = (...args)=>{
// //   let num = 0
// //   args.forEach(item => {
// //     num +=item
// //   })
// //   return num
// // }

// // sum = new Proxy(sum, {
// //   apply(target, ctx, args) {
// //     return target(...args)*2
// //   }
// // })

// // // construct new
// // let User = class {
// //   constructor(name) {
// //     this.name = name
// //   }

// // }

// // User = new Proxy(User, {
// //   construct(target, args, newtarget) {
// //     return new target(...args)
// //   }
// // })

// // Reflect

// let user = {
//   name:'wc',
//   age:1,
//   _p: 'xxx'
// }

// let u = new Proxy(user, {
//   get(target, prop) {
//     if(prop.startsWith('_')) {
//       throw new Error('不可访问')
//     } else {
//       return Reflect.get(target, prop)
//     }
//   },
//   set(target,prop,val) {
//     if(prop.startsWith('_')) {
//       throw new Error('不可访问')
//     } else {
//       Reflect.set(target, prop, val)
//       return true
//     }
//   },
//   deleteProperty(target,prop,val) {
//     if(prop.startsWith('_')) {
//       throw new Error('不可访问')
//     } else {
//       Reflect.deleteProperty(target,prop)
//       return true
//     }
//   },
//   ownKeys(target) {
//     return Object.keys(target).filter( item => !item.startsWith('_'))
//   }
// })

// delete u.age 
// function matchtag(a,b) {
//   if(a === '[' && b===']') return true
//   if(a === '(' && b===')') return true
//   if(a === '{' && b==='}') return true
//   return false
// }
// function matchBracket(str) {
//   const length = str.length
//   if(length===0) return true

//   const stack = []

//   const left = '{[('
//   const right = '}])'

//   for(let i=0; i<length; i++) {
//     const s = str[i]
//     if(left.includes(s)){
//       stack.push(s)
//     } else if(right.includes(s)) {
//       const top = stack[stack.length - 1]
//       if(matchtag(top,s)) {
//         stack.pop()
//       }else{
//         return false
//       }
//     }
//   }
//   return [stack.length === 0]
// }

// const str = 'a[b]das(a)sd)da'

// console.log(matchBracket(str))


/** 
 * 为什么 0.1 + 0.2 !== 0.3
 * 
 * 整数转化二进制没有误差，如 9 转换为二进制是 1001
 * 
 * 而小数可能无法用二进制准确表达，如 0.2 转换为 1.1001100...
 * 
 * 解决方案 使用第三方库 math.js
*/

/**
 * ajax fetch axios 三者的区别
 * 
 * ajax ： asynchronous javascript and xml 技术统称
 *  实例化一个 XMLTttpRequest
 *  xhr.open
 *  xhr.onreadystateChange
 *  xhr.readuState === 4 && xhr.status === 200 && xhr.send
 * 
 * fetch，具体的 api, 全局 api。fetch 原生支持 promise
 * 
 * axios，第三方库
 * 
 * */ 
function ajax1(url, succcFn) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, false)
  xhr.onreadyStateChange = function () {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        succcFn(xhr.responseText)
      }
    }
  }
  xhr.send(null)
}

function ajax2(url) {
  return fetch(url).then(res => res.json())
}


/**
 * px % em rem vw/vh 区别
 * 
 * px 基本单位，绝对单位，其他都是相对
 * 
 * % 相对于父元素
 * 
 * em 相对于当前元素得 font-size
 * 
 * rem 相对于根节点得 font-size
 * 
 * vw 屏幕宽度得1%
 * 
 * vh 屏幕高度得1%
 * */ 

/**
 * 像素比
 * 物理像素 / 逻辑像素
 * 例如 iphone6 的物理像素是 750 * 1334, 他的逻辑像素，在 safari 打印 screen.width 和  screen.height, 或者 
 * window.devicePixelRatio 可以得到 375 * 667
 * 得到 像素比是 2，切图时，需要将设计稿的所有尺寸除以2， 才是正确的像素值 
 * 
 * 同样是1像素
 * 普通屏幕=> css像素：物理像素 = 1：1
 * retina屏幕=> css像素：物理像素 = 1：4
 * 
 * 即 4个物理像素显示1个css像素
 * 
 * */ 

/**
 * 箭头函数
 * 
 * 箭头函数有什么缺点
 * @缺点 
 *  1. 没有 arguments
 *  2. 无法通过 call, apply, bind 改变 this, 使用的是父作用域的this
 *  
 * 什么时候不能使用箭头函数
 *  
 *  1. 对象方法，箭头函数通过 this 获取属性
 *    {
 *      name: 'xx'
 *      getName: ()=> { return this.name }
 *    }
 *           
 *  2. 不能作为构造函数
 * */ 

/**
 * offsetHeight, offsetWidth: border + padding + content
 *
 * clientHeight, clientWidth: padding + content 
 * 
 * scrollHeight,scrollWidth: padding + 实际内容尺寸
 * 
 * scrollTop 滚动后，超出父容器部分的高度
 * */ 



/**
 * HTTP 跨域请求时为何发送 options 请求
 * 
 * 跨域请求之前，method 是 options 请求，response headers 中 Access-Control-Allow-Methods: GET,HEAD,PUT,....
 * 
 * 是跨域请求之前的预检查
 * 浏览器自行发起的，不需要干预
 * 不影响实际的功能
 * */







