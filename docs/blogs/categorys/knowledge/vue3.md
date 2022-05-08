---
title: 前端基础之响应式原理vue3
date: 2021-3-23
subSidebar: "auto"
isShowbgImage: false
categories:
  - 知识拓展
tags: 
  - vue3
  - 前端
  - 面试
  - 基础概念
---
:::tip
转载自https://www.jianshu.com/p/74e4ee111ac5
:::
## vue3响应式原理
Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

语法
const p = new Proxy(target, handler)
```html
<body>
  <div id="app"> </div>
  <script>
    // 模拟Vue中的data选项
    let data = {
      msg: 'hello vue',
      value: 7
    }
    // 模拟Vue实例
    let vm = new Proxy(data, {
      // 执行代理行为的函数 当访问vm的成员会执行
      get (target, key) {
        console.log('get, key: ', key, target[key])
        return target[key]
      },
      // 当设置vm的成员会执行
      set (target, key, newValue) {
        console.log('set, key: ', key, newValue)
        if (target[key] === newValue) {
          return
        }
        target[key] = newValue
        document.querySelector('#app').textContent = target[key]
      }
    })
    // 测试一下 o(*￣︶￣*)o 
    vm.msg = 'Hello Vue'
    console.log(vm.msg)
  </script>
</body>
```
## 构建简易版响应式系统(理解vue3响应式)
首先，我们需要通过某种方式来告诉我们的应用程序，“存储我即将运行的代码(effect)，我可能需要你在其他时间运行它。”然后我们运行代码，后面如果price或quantity变量更新了，再次运行存储的代码。

Vue 2 用depend和notify记录和执行effects，为什么 Vue 3 更改成了track和trigger
depend和notify是动词，和它们的所有者(Dep 类的实例)相关，可以说成一个 Dep 实例正在被依赖、或者正在通知它的订阅者。
Vue 3从技术上来讲已经没有 Dep 类(Class)了。Dep 类里的depend和notify现在被抽离到两个独立的函数(track和trigger)里。所以当调用track和trigger更像是跟踪 sth，而不是 sth 正在被依赖。只是一种形式上的转变

为什么在 Vue 2 中 Dep 是一个有subscribers(订阅者)的类，而 Vue 3 只是一个简单的 Set 集
因为两个方法都被抽出了，Dep 类本身只剩下一个订阅者集合，这样依赖用一个类仅仅去封装一个Set是没有意义的，因此直接声明一个Set，而不是创建一个对象去做这件事.

```js
// 通过记录函数(effect)来做到这一点，以便我们可以再次运行它。
let product = { price: 5, quantity: 2 }
let total = 0
// 存储我们的effects，创建一个dep变量
let dep = new Set() // 我们的 object 追踪的 effects 列表
// 为了跟踪我们的依赖，我们通过track函数将effects添加到这个集合中
function track() {
  dep.add(effect)
}
// 编写一个触发器函数(trigger)来运行我们记录的所有内容。
function trigger() {
  dep.forEach(effect => effect())
}
let effect = () => {
  total = product.price * product.quantity
}
track()
effect()
product.price = 20
console.log(total) // => 10
trigger() // 调用 trigger 才会再次运行 dep 的 effect
console.log(total) // => 40
```

存在问题一：多个属性
可以根据需要继续跟踪trigger，但是我们的响应式对象具有不同的属性，且每个属性都需要自己的 dep (一组effects set 集)，这个 dep 里的effects会在该属性值改变时重新运行。为此，我们将创建一个depsMap，它的类型为 Map.'

存在问题二：多个响应式对象
我们需要一种为每个对象存储 depsMap 的方法。我们需要另一种 Map (WeakMap 类型)，key 就是我们的响应式对象(product、user)。WeakMap 是一个 JavaScript Map，它只使用对象作为键。Vue 3 将用来存储每个响应式对象的属性关联的依赖的 Map 对象称之为targetMap

targetMap存储每个响应式对象关联的depsMap，depsMap存储每个属性的dep依赖，每个dep存储一组 effect set 集，这些 effects 会在值发生变化时重新运行。

![](/vue301.png)
```js
const targetMap = new WeakMap()  // targetMap 存储每个 object 更新时应重新运行的 effects
function track(target, key) { // 我们需要确保这个 effect 被追踪了
  let depsMap = targetMap.get(target) // 获取此 target (响应式对象) 当前的 depsMap
  if (!depsMap) {
    // 不存在的话，新建一个 depsMap
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key) // 获取 key (属性) 被 set 时需要运行的当前 dependencies (effects)  
  if (!dep) {
    // 如果 dependencies 不存在，新建一个 new Set
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(effect) // 把需要的 effect 添加到 dependency
}
function trigger(target, key) {
  const depsMap = targetMap.get(target) // 此对象是否有任何具有dependencies (effects) 的属性
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key) // 获取与此属性关联的 dependencies (effects) 
  if (dep) {
    dep.forEach(effect => {
      // 遍历 dep 运行每个 effect
      effect()
    })
  }
}
let product = { price: 5, quantity: 2 }
let total = 0
let effect = () => {
  total = product.price * product.quantity
}
track(product, 'quantity') // 添加 effect 的时候需传入对象和属性
effect() // 执行 effect
console.log(total) // --> 10
product.quantity = 3
trigger(product, 'quantity') // 触发也需传入对象和属性
console.log(total) // --> 15
```
![](/vue302.png)
我们需要一种方法来 hook (或侦听) 我们的响应式对象上的get和set。
GET property (访问属性) => 调用track去保存当前 effect
SET property (修改了属性) => 调用trigger来运行属性的 dependencies (effects)
如何做到这些？在 Vue 3 中我们使用 ES6 的Reflect和Proxy去拦截 GET 和 SET 调用。Vue 2 中是使用 ES5 的Object.defineProperty实现这一点的。

get 函数有两个参数，target是我们的对象(product)和我们试图获取的key(属性)，在本例中是quantity。当我们在 Proxy 中使用Reflect，可以添加一个额外参数，可以被传递到Reflect调用中.这能确保当我们的对象有从其他对象继承的值/函数时，this 值能正确地指向调用对象。使用 Proxy 的一个难点就是this绑定。我们希望任何方法都绑定到这个 Proxy，而不是target对象。这就是为什么我们总是在Proxy内部使用Reflect
```js
const targetMap = new WeakMap() // targetMap stores the effects that each object should re-run when it's updated
function track(target, key) {
  // We need to make sure this effect is being tracked.
  let depsMap = targetMap.get(target) // Get the current depsMap for this target
  if (!depsMap) {
    // There is no map.
    targetMap.set(target, (depsMap = new Map())) // Create one
  }
  let dep = depsMap.get(key) // Get the current dependencies (effects) that need to be run when this is set
  if (!dep) {
    // There is no dependencies (effects)
    depsMap.set(key, (dep = new Set())) // Create a new Set
  }
  dep.add(effect) // Add effect to dependency map
}
function trigger(target, key) {
  const depsMap = targetMap.get(target) // Does this object have any properties that have dependencies (effects)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key) // If there are dependencies (effects) associated with this
  if (dep) {
    dep.forEach(effect => {
      // run them all
      effect()
    })
  }
}
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      // Track
      track(target, key) // If this reactive property (target) is GET inside then track the effect to rerun on SET
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key]
      let result = Reflect.set(target, key, value, receiver)
      if (oldValue != result) {
        // Trigger
        trigger(target, key) // If this reactive property (target) has effects to rerun on SET, trigger them.
      }
      return result
    }
  }
  return new Proxy(target, handler)
}
let product = reactive({ price: 5, quantity: 2 })
let total = 0
let effect = () => {
  total = product.price * product.quantity
}
effect()
console.log('before updated quantity total = ' + total)
product.quantity = 3
console.log('after updated quantity total = ' + total)
```

在新增的console.log访问product.quantity时，track及它里面的所有方法都会被调用，即使这段代码不在effect(就是我们常说的副作用)中。我们只想查找并记录 内部调用了get property (访问属性) 的活跃 effect。

为了解决这个问题，我们创建一个activeEffect全局变量
