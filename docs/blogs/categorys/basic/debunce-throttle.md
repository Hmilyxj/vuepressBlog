---
title: 前端基础之防抖节流
date: 2022-2-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 防抖、节流
  - 基础概念
  - 前端
  - 面试
---
:::tip
防抖函数
:::
```js
function debunce(fn, delay) {
  let timer = null;
  return function () {
    if(timer) clearTimeout(flag);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
}
 ```
debounce实现思路在于每次点击清理定时器，连续点击下，如果immediate为true则立即执行，且delay时间内触发不会再次生效，直到再次等待delay时间后才能再次点击生效；如果immediate为false, 则连续点击下只有在最后一次点击后delay延迟后只会触发一次。
```js
 function debounce(fn, delay, immediate = true) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    immediate && !timer && fn.apply(this, args)
    timer = setTimeout(() => {
      timer = null
      !immediate && fn.apply(this, args)
    }, delay)
  }
}
```
:::tip
节流函数
:::
```js
function throttle(fn, delay) {
  let timer = true;
  return function () {
    if(!timer) return false;
    timer = false;
    setTimeout(() => {
      timer = true;
      fn.apply(this, arguments);
    }, delay)
  }
}
```
throttle实现思路在于每次点击清理定时器，连续点击下，如果immediate为true则立即执行，则每隔delay时间段内执行一次；如果immediate为false则延迟delay后执行，且每隔delay时间后执行一次。
```js
function throttle(fn, delay, immediate = true) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        !immediate && fn.apply(this, args)
      }, delay)
      immediate && fn.apply(this, args)
    }
  }
}
```