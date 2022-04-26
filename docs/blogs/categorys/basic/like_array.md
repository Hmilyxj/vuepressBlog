---
title: 前端基础之类数组
date: 2022-2-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - 类数组
---
:::tip
实现类数组
:::
类数组就是定义一个{}空对象，添加length属性，push方法，splice方法（源码就是这样的），看起来是数组但是没有sort等方法。
```js
div = document.getElementByTagName('div');
function retElement(params){
  var tmp = {
    length : 0,
    push: Array.prototype.push,
    splice: Array.prototype.splice
  },
  child = params.childNodes;
  len = child.length;
  for(let i = 0; i < len; i++){
    if(child[i].nodeType === 1){
      temp.push(chile[i])
    }
  }
  return temp;
}
console.log(retElement(div));//Object(4)[div, span, p, em, push: f, splice: f]
```