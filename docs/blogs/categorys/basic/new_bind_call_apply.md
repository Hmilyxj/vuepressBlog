---
title: 前端基础之手写new、bind、call、apply
date: 2021-12-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - new
  - bind
  - call
  - apply
---

## new()
```js
function myNew(Func, ...args) {
  const obj = {};
  obj.__proto__ = Func.prototype;
  return Func.apply(obj, args);
}
```

## call()
```js
Function.prototype.myCall = function (obj) {
  let _obj = obj ? Object(obj) : window;
  _obj.fn = this;
  let args = [...arguments].slice(1);
  _obj.fn(...args);
  delete _obj.fn;
}
```

## apply()
```js
Function.prototype.myApply = function (obj, arr) {
  let _obj = obj ? Object(obj) : window;
  _obj.fn = this;
  let args = [];
  if(!arr || arr.length === 0){
    _obj.fn();
  } else {
    for(let i = 0; i < arr.length; i++){
      args.push('arr[' + i + ']');
    }
  }
  _obj.fn(...args);
  delete _obj.fn;
}
```

## bind()
bind()方法返回的那个函数不仅仅可以作为普通函数调用，还可以作为一个构造函数被调用
```js
Function.prototype.myBind = function (obj) {
  if (typeof (this) !== 'funvtion') {
    throw Error('调用Mybind方法必须为函数');
  }
  let _fn = this;
  let args = [...arguments].slice(1);
  // 创建一个待会儿返回出去的函数，这个函数会赋到外部变量中
  function bindFunc() {
    let newArgs = [...arguments].slice();
    let _obj = this.constructor === _fn ? this : obj;
    // 通过apply去改变this指向,实现函数柯里化
    _fn.apply(_obj, newArgs.concat(args))
  }
  // 创建一个中介函数，以便实现原型继承
  var ProtoFn = function () { };
  ProtoFn.prototype = _fn.prototype;
  bindFunc.prototype = new ProtoFn();
  return bindFunc;
}
```
