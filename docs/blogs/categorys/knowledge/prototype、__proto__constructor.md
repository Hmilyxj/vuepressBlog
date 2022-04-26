---
title: 详解prototype、__proto__和constructor
date: 2022-3-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 知识拓展
tags: 
  - 基础概念
  - 前端
---
:::tip
详解prototype、__proto__和constructor
:::

![](/原型链.jpg)
## prototype
1.1 定义
每个函数创建的时候都会自动创建一个prototype属性，prototype属性是函数独有的。
prototype的含义是函数的原型对象，也就是这个函数（其实所有函数都可以作为构造函数）所创建的实例的原型对象。
1.2 作用
该函数所实例化得到的对象都可以找到公用的属性和方法。

## __proto__
2.1 定义
__proto__(写法是两边各有两个下划线_)属性是对象独有的，它其实是[[prototype]]的引用， 每个实例（通过构造函数生成的实例都是对象，函数也是对象，所以函数也有__proto__）上面都有__proto__ 属性，它指向原型对象（构造函数的prototype属性）
2.2 作用
它的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（可以理解为父对象）里找，如果父对象也不存在这个属性，则继续往父对象的__proto__属性所指向的那个对象（可以理解为爷爷对象）里找，如果还没找到，则继续往上找…直到原型链顶端null

## constructor
3.1 定义
单从constructor这个属性来讲，只有prototype对象才有，每个函数在创建的时候，JS会同时创建一个该函数对应的prototype对象，constructor属性是对象才拥有的，它是从一个对象指向一个函数，含义就是指向该对象的构造函数。
该函数创建的对象.__proto__ === 该函数.prototype，
该函数.prototype.constructor === 该函数本身，