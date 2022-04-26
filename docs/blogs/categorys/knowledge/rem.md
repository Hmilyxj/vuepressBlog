---
title: rem转换成px的原理
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
移动端适配-px转成rem
:::

## 原理
rem单位是相对于根节点的字体大小的，所以通过设置根节点的字体大小可以动态的改变rem的大小
rem方案的原理其实就是，将每一个不同的屏幕划分成相同的份数，让同一个元素在不同的屏幕上占据相同比例的空间。1rem等于此页面html的font-size，rem可以理解为每份是多少px

比如，设计稿宽度为375px，将页面划分成10份，那么1rem=37.5px，如果有一个div宽度为37.5px，换算成rem为1rem。将375px宽的屏幕划分为10份，这个div宽度占一份。

那么适配只需要让此div在不同宽度的屏幕下宽度都占一份，即确定不同设备下1rem等于多少px
即 document.body.clientWidth / 10
同理，如果我们想让1rem=10px，那么document.body.clientWidth / 37.5即可

## 实现
一、安装依赖
```js
npm install amfe-flexible
```

二、在main.js中引入依赖包
```js
import 'amfe-flexible'
```

三、在main.js中更改rem的大小
```js
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  // 我们想让1rem = 10px 设计搞宽度是375， 那么让实际的页面宽度 / 37.5 就可以得到 1rem = 10px 的换算关系来
  htmlDom.style.fontSize = `${htmlWidth / 37.5}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize()
```