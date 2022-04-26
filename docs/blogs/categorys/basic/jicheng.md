---
title: 前端基础之继承
date: 2021-12-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - 继承
---
## 原型链继承
每一个构造函数都会有一个原型对象 (构造函数的 prototype) ，原型对象又包含一个指向构造函数的指针 (constructor)，实例也有一个指向原型的指针 (__proto__)。
```js
function Person() {
  this.name = 'parent';
  this.play = [1, 2, 3];
}
function Child() {
  this.type = 'children'
}
Child.prototype = new Person()// *
console.log(new Child())
```
核心代码就是 Child.prototype = new Person() 将 Child 的原型指针指向 Person 的实例。这样 Child 的实例就可以访问到 Person 的构造函数的属性和方法。
```js
var child1 = new Child()
var child2 = new Child()
console.log(child1.name) // parent
child2.play.push('coding')
console.log(child1.play) // [1, 2, 3, 'coding'] *
```
原型链继承的一个缺点就在于两个实例 (child1 和 child2 ) 访问的是同一个原型对象，所以，共享的是同一份数据，这就导致数据可能被篡改的风险。

## 构造函数继承（借用 call）
每次 new 的一个 Child 的时候，都让它拥有一个全新原型对象不就好了嘛，所以这种借用构造函数的继承方法应运而生。

```js
function Parent() {
  this.name = 'parent'
  this.play = ['play game', 'coding']
}
// 这里定义一个父类原型上的方法，埋个伏笔 #
Parent.prototype.getName = function () {
  return this.name
}
function Child() {
  Parent.call(this)// call 借用 Parent 的构造函数，这样就能“偷取”定义在父类构造函数的属性和方法 
  this.type = 'child'// 子类的构造函数的属性
}
let child = new Child()
console.log(child.name)// parent
console.log(child.getName())// ?
```
虽然子类拥有了父类的属性和方法了，但是他是访问不到父类原型上的属性和方法的，在 # 伏笔处定义的父类原型上的方法，在 ？ 处调用是会报错的，报的是 child.getName is not a function 。

刚才说的第一种 (原型链继承)，是可以访问父类原型上的属性和方法，但是父构造函数上的属性和方法会被子类共享；第二种 (构造函数继承)，则是可以拥有独立的父构造函数的属性和方法，但是访问不了父类原型对象上的属性和方法。
## 组合继承 (原型链继承 + 构造函数继承)

```js
function Parent() {
  this.name = 'parent'
  this.play = ['play game', 'coding']
}
Parent.prototype.getName = function () {
  return this.name
}
function Child() {
  Parent.call(this)// 借用构造函数 #2 
  this.type = 'child'
}
Child.prototype = new Parent();// 子构造函数的原型指向父类实例 #1
// 然后这里要想原型上的构造器指针指回自己的构造函数
Child.prototype.constructor = Child

const child1 = new Child()
const child2 = new Child()
child2.play.push('daydream')
console.log(child1.play === child2.play)// 不会互相影响
child1.getName()
child2.getName()// 正常输出
```
随之而来的问题是 —— 父构造函数 Parent 被调用的次数太多了,每一次的继承都是一笔不小的性能开销
## 原型式继承 Object.create 
```js
const parent = {
  name: 'william',
  play: ['coding', 'playgame'],
  getName() {
    return this.name
  }
}
const child1 = Object.create(parent)
const child2 = Object.create(parent)
child2.name = 'skye'
console.log(child1.name)// william
console.log(child2.name)// skye
child2.play.push('daydream')
console.log(child1.play)// ['coding', 'play game', 'daydream']
console.log(child2.play)// ['coding', 'play game', 'daydream']
```
了解了 Object.create 方法之后，可以发现其实也不是什么黑魔法，就是生成了一个原型的 __proto__ 指针指向传入对象的对象而已,原型式继承跟原型链异曲同工，所以也难免有这样的弊端。
## 寄生式继承
只是在原型式继承得到的对象基础上，通过工厂模式添加了一些方法和属性
```js
const parent = {
  name: 'william',
  play: ['coding', 'reading', 'play game'],
  getName() { return this.name }
}
function ChildFactory(origin) {
  let child = Object.create(origin)
  child.getPlay = function () {
    return this.play
  }
  return child
}
let child = ChildFactory(parent)
console.log(child.getName())
console.log(child.getPlay())
```
寄生组合继承解决了上述五种方案中的痛点，算是比较好地实现了我们想要的继承效果。当然，缺点也还是有的，就是篇幅太长了，搞个继承要写这么多代码，各种 prototype ，还要手动将原型上的构造指针指回构造函数……
##  es6 class 关键字
```js
class Parent {
  constructor(name) {
    // 构造器，入参其实构造所用的参数  
    this.name = name
  }
  // 这里定义的都是原型上的方法 
  getName() {
    return this.name
  }
}
// 子类继承也很方便
class Child extends Parent {
  constructor(name, age) {
    // 这里如果子类中存在构造函数，就必须在使用 this 之前先调用 super()  
    super(name)// 相当于借用父类的 constructor 跟构造函数式继承中的 call 继承方法类似  
    this.age = age
  }
}
const child = new Child('william', 18)
child.getName()// william
```