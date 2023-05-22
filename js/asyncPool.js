async function asyncPool (poolLimit,array,iteratorFn) {
  const ret = [] // 存储所有的异步任务
  const executing = [] // 存储所有正在执行的任务
  for (const item of array) {
      const p = Promise.resolve().then(() => iteratorFn(item)) 
      // 调用iteratorFn函数创建异步任务
      ret.push(p)
      console.log(ret,'ret')
      // 保存新的异步任务

      if (poolLimit <= array.length) {
          // 当poolLimit小于等于总任务数量时，进行并发控制
          const e = p.then(() => executing.splice(executing.indexOf(e),1))
          // 当任务完成后，从正在执行的任务队列中移除任务，腾出一个空位
          executing.push(e)
          // 加入正在执行的异步任务

          if (executing.length >= poolLimit) {
              await Promise.race(executing)   
              // 有任务执行完成之后，进入下一次循环
          }
      }
  }
  return Promise.all(ret) // 所有任务完成之后返回
}
function asyncFn(i){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      console.log(i + 's 执行')
      resolve(i)
    },i*1000)
  })
}

function createFn() {
  let n = 10
  let parr = []
  while(n>0){
    let p = n <=3 ? n: 2
    parr.push(p)
    n--
  }
  return parr
}

const array = createFn()
console.log(array,'fnarr')

asyncPool(3,array,asyncFn)