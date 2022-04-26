---
title: 前端基础之KMP算法
date: 2021-12-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - KMP
---

:::tip
经典的字符串匹配算法：返回子串P在主串S中的位置，不存在则返回-1
:::
KMP算法则根据子串T本身的性质，利用已经匹配的结果，将模式（子串T）尽可能地往后“滑”。而“滑”多远就要根据数组next来判断。
next[j] = k，表示当S[i] != P[j]时，j指针的下一个位置。另一个非常有用且恒等的定义，因为下标从0开始的，k值实际是j位前的子串的最大重复子串的长度。

求next数组
```js
var getNext_1 = function (P) {
  let next = new Array(P.length);
  next[0] = -1;
  let k = -1, j = 0;
  while (j < P.length - 1) {
    if (k === -1 || P[j] === P[k]) {
      next[++j] = ++k;
    } else {
      k = next[k]
    }
  }
  return next;
}
```
改进next数组
```js
var getNext_2 = function (P) {
  let next = new Array(P.length);
  next[0] = -1;
  let k = -1, j = 0;
  while (j < P.length - 1) {
    if (k === -1 || P[j] === P[k]) {
      if (P[++j] === P[++k]) { //这种情况一定不匹配
        next[j] = next[k]; //把next[j] = k 和 k = next[j] 合并到一起
      } else {
        next[j] = k;
      }
    } else {
      k = next[k]
    }
  }
  return next;
}
```
KMP函数
```js
var KMP = function (S, P, next) {
  let i = 0, j = 0;
  while (i < s.length && j < P.length) {
    if (j === -1 || S[i] === P[j]) {
      i++; j++;
    } else {
      j = next[j];
    }
  }
  if (j === P.length) {
    return i - j;
  } else {
    return -1;
  }
}
```