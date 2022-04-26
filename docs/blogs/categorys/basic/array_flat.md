---
title: 前端基础之数组扁平化
date: 2021-11-17
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - JS
  - 基础概念
  - 前端
  - 面试
---

:::tip
这是如何实现数组扁平化的一些方法
:::
<!-- more -->

## 使用flat()方法
```js
let arr = [[1, 2], [3, 4][5, 6]].flat();
//多维数组需要给flat()串一个参数
let arr = [[1, 2], [3, 4][5, 6]].flat(Infinity);
console.log(arr);
```

## 迭代实现
- ES6扩展运算符
```js
const arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
const flatten = (arr) => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten(arr));
```

- 普通递归
```js
const arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
const flatten = (arr) => {
  let result = [];
  arr.forEach((item, index, arr) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  })
  return result;
}
console.log(flatten(arr));
```

- 高级递归(reduce)
```js
const arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
const flatten = (arr) => arr.reduce((acc, cur) =>
  (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), [])
```

- toString()
```js
const arr = [1,2,[3,4,5,[6,7],8],9,10,[11,[12,13]]];
const flatten = (arr) => arr.toString().split(',').map((item) => +item);
console.log(flatten(arr));
```

- [].concat.apply
```js
const arr = [1,2,[3,4,5,[6,7],8],9,10,[11,[12,13]]];

const flatten = (arr) => {
while (arr.some(item => Array.isArray(item))){
arr = [].concat.apply([], arr);
}
return arr;
}
console.log(flatten(arr));
```