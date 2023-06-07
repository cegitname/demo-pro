# 基础数据类型
boolean, string, undefined, null, symbol, 元组，array, void, unknow, never,number,any

# 类型断言

尖括号语法： <string>str.slice

as 语法：(str as string).silce

非空断言： 
```typescript
  
  const str! 断言非空
  
  function fn(x:string | undefind | null) {
    const res:string = x!
  }

  function func(x: () => void | undefind) {
    const res = x!()
  }
```
# 类型守卫
用于确保类型在一定的范围内：

- in

  if 'x' in keys { ... }

- typeof

  typeof x === 'number'

- instanceof

  if sub instanceof Super {...}

- 自定义类型称谓词

  function isNumber(x: unknown): x is number {
    return x === 'number'
  }

# 联合类型和类型别名
type name = string | undefined

# 交叉类型

type A = { x: number }

type Point = A & { y: number }

# 泛型

- 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T
}

- 泛型类
class GenericNumber<T> {
  zeroValue: T
  add: (x:T, y:T) => T
}

- 泛型工具类

```typescript

interface Partical<T> {
  [p in keyof T]? : T[p]
}

interface Required<T> {
  [p in keyof T]-? : T[p]
}

interface ReadOnly<T> {
  readonly [p in keyof T] : T[p]
}

type Exclude<T, U> = T extends U ? never : T

type Extract<T, U> = T extends U ? T : never

interface Pick<T, K extends keyof T> {
  [p in K]: k[p]
}

type Record<K extends keyof any, T> {
  [p in K]: T
} 

type NonNullable<T> = T extends undefied | null ? never : T

type ReturnType<T extends (...args:any) => any > = T extends (...args:any) => infer R ? R : any

```
