---
title: 前端基础之map、filter、reduce
date: 2022-2-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
---
## 手写map
```js
function map(arr, mapCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return [];
  } else {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      res.push(mapCallback(arr[i], i, arr));
    }
  }
  return res;
}
```
## 手写filter
```js
function filter(arr, filterCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') {
    return [];
  } else {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (filterCallback(arr[i], i, arr)) {
        res.push(arr[i])
      }
    }
  }
  return res;
}
```
## 手写reduce
```js
function reduce(arr, reduceCallback, initialValue) {
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') {
    return [];
  } else {
    let value = initialValue === undefined ? arr[0] : initialValue;
    for (let i = initialValue === undefined ? 1 : 0; i < arr.length; i++) {
      value = reduceCallback(arr[i], i, arr, value);
    }
  }
  return value;
}
```
## reduce实现map
```js
Array.prototype.myMap = function (fn, arr) {
  let ans = [];
  arr = arr || [];
  this.reduce((pre, cur, index) => {
    ans[index] = fn.call(arr, cr, index)
  },[])
  return ans;
}
let arr = [1, 2, 3];
let test = arr.myMap(item => {
  return item * 2;
})
console.log(test)
```