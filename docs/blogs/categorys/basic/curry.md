---
title: 前端基础之柯里化
date: 2021-12-28
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - curry
  - 基础概念
  - 前端
  - 面试
---

:::tip
实现函数柯里化
:::
```js
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  let args = [...arguments];

  // 在内部声明一个函数，利用闭包的特性保存args并收集所有的参数值
  let inner = function () {
    args.push(...arguments);
    return inner;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  inner.toString = function () {
    return args.reduce(function (a, b) {
      return a + b;
    });
  }
  return inner;
}

console.log(add(1)(2)(3).toString())                // 6
console.log(add(1, 2)(3)(4, 5).toString())           // 15
```