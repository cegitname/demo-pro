console.log('**********************js-code-1.js*********************')
// 防抖
function debounce(fn, wait) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

// 节流
function throttle(fn, delay) {
  let timer = 0
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = 0
    })
  }
}

// 数字千分位格式化
function format1000(n) {
  const arr = Math.floor(n).toString().split('').reverse()
  return arr.reduce((prev, cur, index) => {
    if (index % 3 === 0) {
      return prev ? cur + ',' + prev : cur
    } else {
      return cur + prev
    }
  }, '')
}
function format10002(n) {
  const s = n.toString()
  const length = s.length
  let res = ''
  for (let i = length - 1; i >= 0; i--) {
    const j = length - i
    if (j % 3 === 0) {
      if (i === 0) {
        res = s[i] + res
      } else {
        res = ',' + s[i] + res
      }
    } else {
      res = s[i] + res
    }
  }
  return res
}
console.log(format1000(12321421), '千分位格式化 倒序')
console.log(format10002(12321421), '千分位格式化 正序')

// 有序列表，二分查找
function binarySearch(arr, n) {
  const length = arr.length
  let start = 0
  let end = length - 1

  while (start <= end) {
    const midIndex = Math.floor((start + end / 2))
    const midVal = arr[midIndex]

    if (n > midVal) {
      start = midIndex + 1
    } else if (n < midVal) {
      end = midIndex - 1
    } else {
      return midIndex
    }
  }
  return -1
}

const binarySearchResIndex = binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15], 6)

console.log(binarySearchResIndex, '有序二分查找')

// 冒泡排序
const sortArr = [1, 2, 5, 7, 3, 5, 8, 9, 4, 11, 55, 2, 11, 23, 651, 14]
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

bubbleSort(sortArr, '冒泡排序')

// 遍历+2分 实现快速排序
function quickSort(arr) {
  const length = arr.length
  const midIndex = Math.fl
}

console.log(quickSort([4, 3, 2, 1]))

// 将一个数组旋转 k步

function rotek(arr, k) {
  const length = arr.length
  if (!k || length == 0) return arr
  const n = Math.abs(k % length)
  const part1 = arr.slice(-n)
  const part2 = arr.slice(0, length - step)
  return part1.concat(part2)
}

// 数组去重

function unique(arr) {
  const map = new Map()
  let res = []
  arr.forEach(item => {
    if (!map.has(item)) {
      map.set(item, '1')
      res.push(item)
    }
  })
  return res
}

//  includes 去重
function includeUniqu(arr) {
  const newArr = []
  arr.forEach(item => {
    !newArr.includes(item) && newArr.push(item)
  })
  return newArr
}
console.log(includeUniqu(['a', 'a', 3, 3, 2, 2, 1, 1]))

// 匹配括号
function isMatch(left, right) {
  if (left === '{' && right === '}') return true
  if (left === '[' && right === ']') return true
  if (left === '(' && right === ')') return true
  return false
}

function matchBrackets(str) {
  const leftSymbols = '{[('
  const rightSymbols = '}])'
  const stack = []
  for (let i = 0; i < str.length; i++) {
    const s = str[i]
    if (leftSymbols.includes(s)) {
      stack.push(s)
    } else if (rightSymbols.includes(s)) {
      const top = stack[stack.length - 1]
      if (isMatch(top, s)) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}

// 数组扁平化
function flaten(arr) {
  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      const flatItem = flaten(item)
      flatItem.forEach(n => res.push(n))
    } else {
      res.push(item)
    }
  })
}

// getTYpe
function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

//  手写 new
/**
 * 1. 用构造函数的原型对象，构造一个空对象
 * 2. 添加属性， obj 作为 this
 * 3. 返回 obj
 * */

function customNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype)
  constructor.apply(obj, args)
  return obj
}

/**继承*/

/**
 * call 继承
 * 实例只是子类的实例，不能继承父类 prototype 方法
 * 每个子类都有父类实例函数的副本，影响性能
 * */

function super1() {
  this.name = 'wangce'
  this.obj = {
    name: 'wangce',
    age: 18
  }
  console.log('执行了 super1')

}
super1.prototype.sayHello = function () {
  console.log('hello')
}

// function sub1() {
//   super1.call(this)
//   console.log(this.name)
// }

// const child = new sub1()

// sub1() // wangce
// child.sayHello() //报错 没有 sayHello 方法

/**
 * prototype 继承
 * 1. 实例共享父类属性
 * 2. 不能实现多继承，call 多个父类
 * 3. 无法传参
 * */
// function sub2() {
//   console.log(this.name, 'in sub2')
// }

// sub2.prototype = new super1()

// const child1 = new sub2()
// const child2 = new sub2()

// console.log(child1.obj, 'sss')
// child1.obj.age = 35
// console.log(child2.obj.age)
/**
 * 组合继承
 * */

/**
 * 调用了2次，生成了2份实例
 * */

// function sub3() {
//   super1.call(this)
// }

// sub3.prototype = new super1()
// sub3.prototype.constructor = sub3

// const child1 = new sub3()
// const child2 = new sub3()

// child1.obj.age = 22
// console.log(child1.obj.age, child2.obj.age, 'child2 age')

// child1.sayHello()

/***
 * 组合寄生式继承
 * Object.create 是对对象的浅拷贝
 * */

function clone(parent, child) {
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child
}

function sub4() {
  super1.call(this)
  console.log(this.name)
}

clone(super1, sub4)

const child1 = new sub4()
const child2 = new sub4()

child1.obj.age = 99
child2.sayHello()

// 手写 LayzMan

class LazyMan {
  constructor(name) {
    this.name = name
    this.tasks = []
    setTimeout(() => {
      this.next()
    })
  }
  next() {
    const task = this.tasks.shift()
    task && task()
  }
  sleep(delay) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(this.name + 'sleep' + delay + 's')
        this.next()
      }, delay * 1000)
    })
    return this
  }
  eat(food) {
    this.tasks.push(() => {
      console.log(
        this.name + 'eat' + food
      )
      this.next()
    })
    return this
  }
}

const aa = new LazyMan('wc')

aa.eat('Pingg').sleep(3).eat('xiangjiao')

// 手写函数柯里化

function curry(fn) {
  const length = fn.length
  const args = []
  return function calc(...newArgs) {
    args = [...args, ...newArgs]
    if (args.length < length) {
      return calc
    } else {
      return fn.apply(this, args.slice(0, length))
    }
  }
}

// 将数组转为树

const arrRes = [
  { id: 1, name: '部门a', parentId: 0 },
  { id: 2, name: '部门b', parentId: 1 },
  { id: 3, name: '部门c', parentId: 1 },
  { id: 4, name: '部门d', parentId: 2 },
  { id: 6, name: '部门e', parentId: 2 },
  { id: 6, name: '部门f', parentId: 3 },
  { id: 7, name: '部门g', parentId: 3 }
]

function arrToRee(arr) {
  const idToTreeNode = new Map()
  let root = null

  arr.forEach(item => {
    const { id, parentId } = item
    idToTreeNode.set(id, item)
    const parentNode = idToTreeNode.get(parentId)
    if (parentNode) {
      if (parentNode.child == null) parentNode.child = []
      parentNode.child.push(item)
    }
    if (parentId === 0) {
      root = item
    }
  })
  return root
}
//  1维数组转2维数组

function arrT2(arr, n) {
  const res = []
  arr.forEach((item, index) => {
    const i = Math.floor(index / n)
    if (res[i] == null) res[i] = []
    res[i].push(item)
  })
  return res
}

console.log(arrT2([1, 2, 3, 4, 5, 6, 7, 78, 8, 9, 9, 0, 0, 1], 2), '1 zhuan 2')

// async pool

async function asyncPool(limit, params, fn) {
  const ret = []
  const executing = []
  for (item of params) {
    const p = Promise.resolve(() => fn(item))
    ret.push(p)
    if (limit < params.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= limit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}
//  async pool

async function asyncPool(limit, params, fn) {
  const allTasks = []
  const thenTasks = []
  for (item of params) {
    const p = Promise.resolve(() => fn(item))
    allTasks.push(p)
    if (limit < params.length) {
      const e = p.then(() => thenTasks.splice(thenTasks.indexOf(e), 1))
      thenTasks.push(e)
      if (thenTasks.length >= limit) {
        await Promise.race(thenTasks)
      }
    }
  }
  return Promise.all(allTasks)
}
// 手写 bind
function customBind(context, ...args) {
  const self = this
  return function (...args1) {
    const total = [...args, ...args1]
    return self.apply(context, total)
  }
}
// 手写call
function customCall(context, ...args) {

  const fnkey = Symbol()
  context[fnkey] = this
  const res = context[fnkey](...args)
  delete context[fnkey]
  return res
}