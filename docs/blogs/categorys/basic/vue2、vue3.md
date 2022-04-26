---
title: 前端基础之响应式原理
date: 2021-11-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - vue2
  - vue3
  - 前端
  - 面试
  - 基础概念
---
:::tip
转载自https://blog.csdn.net/weixin_37517329/article/details/121861442
:::
## vue2响应式原理
```html
<body>
  <div id="app"></div>
  <script>
    // 模拟Vue中的data选项
    let data = {
      msg: 'hello vue',
      value: 7
    }

    // 模拟Vue的实例
    let vm = {}

    proxyData(data)

    function proxyData(data) {
      // 遍历data对象中的所有属性
      Object.keys(data).forEach(key => {
        // 把data中的属性，转换成vm的setter
        Object.defineProperty(vm, key, {
          enumerable: true,
          configurable: true,
          get () {
            console.log('get: ', key, data[key])
            return data[key]
          },
          set (newValue) {
            console.log('set: ', key, newValue)
            if (newValue === data[key]) {
              return
            }
            data[key] = newValue
            // 数据更改，使DOM的值更新
            document.querySelector('#app').textContent = data[key]
          }
        })
      })
    }

    // 测试一下 o(*￣︶￣*)o 
    vm.msg = 'Hello Vue'
    console.log(vm.msg)
  </script>
</body>
```
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
## Observer 
```js
/**
 * observer.js
 *
 * 功能
 * - 把$data中的属性，转换成响应式数据
 * - 如果$data中的某个属性也是对象，把该属性转换成响应式数据
 * - 数据变化的时候，发送通知
 *
 * 方法：
 * - walk(data)    - 遍历data属性，调用defineReactive将数据转换成getter/setter
 * - defineReactive(data, key, value)    - 将数据转换成getter/setter
 *
 */
class Observer {
  constructor(data) {
    this.walk(data)
  }
  // 遍历data转为响应式
  walk(data) {
     // 如果data为空或者或者data不是对象
     if (!data || typeof data !== "object") {
      return;
    }
    // 遍历data转为响应式
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  // 将data中的属性转为getter/setter
  defineReactive(data, key, value) {
    // 检测属性值是否是对象，是对象的话，继续将对象转换为响应式的
    this.walk(value)
    // 保存一下 this
    const that = this;
    // 创建Dep对象 给每个data添加一个观察者
    let dep = new Dep();

    Object.defineProperty(data, key, {
      // 可枚举（可遍历）
      enumerable: true,
      // 可配置（可以使用delete删除，可以通过defineProperty重新定义）
      configurable: true,
      // 获取值的时候执行
      get() {
        // 在这里添加观察者对象 Dep.target 表示观察者
        Dep.target && dep.addSub(Dep.target)// dep.depend(); // 本次新增
        return value
      },
       // 设置值的时候执行
      set(newValue) {
        // 若新值等于旧值则返回
        if (newValue == value) {
          return;
        }
        // 如新值不等于旧值则赋值 此处形成了闭包，延长了value的作用域
        value = newValue;
        // 赋值以后检查属性是否是对象，是对象则将属性转换为响应式的
        that.walk(newValue);
        // 数据变化后发送通知，触发watcher的pudate方法
        dep.notify();

      },
    })
  }
}
```
## Compiler
```js
/**
 * compiler.js
 *
 * 功能
 * - 编译模板，解析指令/插值表达式
 * - 负责页面的首次渲染
 * - 数据变化后，重新渲染视图
 *
 * 属性
 * - el -app元素
 * - vm -vue实例
 *
 * 方法：
 * - compile(el) -编译入口
 * - compileElement(node) -编译元素（指令）
 * - compileText(node) 编译文本（插值）
 * - isDirective(attrName) -（判断是否为指令）
 * - isTextNode(node) -（判断是否为文本节点）
 * - isElementNode(node) - （判断是否问元素节点）
 */

class Compiler {
  constructor(vm) {
    // 获取vm
    this.vm = vm
    // 获取el
    this.el = vm.$el
    // 编译模板 渲染视图
    this.compile(this.el)
  }
  // 编译模板渲染视图
  compile(el) {
    // 不存在则返回
    if (!el) return;
    // 获取子节点
    const nodes = el.childNodes;
    //收集
    Array.from(nodes).forEach((node) => {
      // 文本类型节点的编译
      if (this.isTextNode(node)) {
        // 编译文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 编译元素节点
        this.compileElement(node)
      }
      // 判断是否还存在子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }
  // 添加指令方法 并且执行
  update(node, value, attrName, key) {
    // 定义相应的方法 举个例子：添加textUpdater就是用来处理v-text的
    const updateFn = this[`${attrName}Updater`];
    // 若存在 则调用
    updateFn && updateFn.call(this, node, value, key);
  }
  // 用来处理v-text
  textUpdater(node, value, key) {
    node.textContent = value;
  }
  // 用来处理v-model
  modelUpdater(node, value, key) {
    node.value = value;
    // 用来实现双向数据绑定
    node.addEventListener("input", (e) => {
      this.vm[key] = node.value;
    });
  }
  // 编译元素节点
  compileElement(node) {
    // 获取到元素节点上面的所有属性进行遍历
    Array.from(node.attributes).forEach((attr) => {
      // 获取属性名
      let _attrName = attr.name
      // 判断是否是 v- 开头
      if (this.isDirective(_attrName)) {
        // 删除 v-
        const attrName = _attrName.substr(2);
        // 获取属性值 并赋值给key
        const key = attr.value;
        const value = this.vm[key];
        // 添加指令方法
        this.update(node, value, attrName, key);
        // 数据更新之后，通过wather更新视图
        new Watcher(this.vm, key, (newValue) => {
          this.update(node, newValue, attrName, key);
        });
      }
    });
  }
  // 编译文本节点
  compileText(node) {
    // . 表示任意单个字符，不包含换行符、+ 表示匹配前面多个相同的字符、？表示非贪婪模式，尽可能早的结束查找
    const reg = /\{\{(.+?)\}\}/; 
    // 获取节点的文本内容
    var param = node.textContent;
    // 判断是否有 {{}}
    if (reg.test(param)) {
      //  $1 表示匹配的第一个，也就是{{}}里面的内容
      // 去除 {{}} 前后空格
      const key = RegExp.$1.trim();
      // 赋值给node
      node.textContent = param.replace(reg, this.vm[key]);
      // 编译模板的时候，创建一个watcher实例，并在内部挂载到Dep上
      new Watcher(this.vm, key, (newValue) => {
        // 通过回调函数，更新视图
        node.textContent = newValue;
      });
    }
  }
  // 判断元素的属性是否是vue指令
  isDirective(attrName) {
    return attrName && attrName.startsWith("v-");
  }
  // 判断是否是文本节点
  isTextNode(node) {
    return node && node.nodeType === 3;
  }
  // 判断是否是元素节点
  isElementNode(node) {
    return node && node.nodeType === 1;
  }
}

```
## Dep 
```js
/**
 * dep.js
 *
 * 功能
 * - 收集观察者
 * - 触发观察者
 *
 * 属性
 * - subs: Array
 * - target: Watcher
 *
 * 方法：
 * - addSub(sub): 添加观察者
 * - notify(): 触发观察者的update
 *
 */
 
 class Dep {
  constructor() {
    // 存储观察者
    this.subs = []
  }
  // 添加观察者
  addSub(sub) {
    // 判断观察者是否存在、是否拥有update且typeof为function
    if (sub && sub.update && typeof sub.update === "function") {
      this.subs.push(sub);
    }
  }
  // 发送通知
  notify() {
    // 触发每个观察者的更新方法
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

```
## Watcher
```js
/**
 * watcher.js
 *
 * 功能
 * - 生成观察者更新视图
 * - 将观察者实例挂载到Dep类中
 * - 数据发生变化的时候，调用回调函数更新视图
 *
 * 属性
 * - vm: vue实例
 * - key: 观察的键
 * - cb: 回调函数
 *
 * 方法：
 * - update()
 *
 */

class Watcher {
  constructor(vm, key, cb) {
    // 获取vm
    this.vm = vm
    // 获取data中的属性
    this.key = key
    // 回调函数（更新视图的具体方法）
    this.cb = cb
    // 将watcher实例挂载到Dep
    Dep.target = this
     // 缓存旧值
    this.oldValue = vm[key]
    // get值之后，清除Dep中的实例
    Dep.target = null
  }
  // 观察者中的方法 用来更新视图
  update() {
    // 调用update的时候，获取新值
    let newValue = this.vm[this.key]
    // 新值和旧值相同则不更新
    if (newValue === this.oldValue) return
    // 调用具体的更新方法
    this.cb(newValue)
  }
}

```