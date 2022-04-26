---
title: 前端基础之图片懒加载
date: 2021-11-15
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
这是实现图片懒加载的过程
:::
<!-- more -->

## 懒加载原理
一张图片就是一个<img>标签，浏览器是否发起请求图片是根据<img>的src属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给<img>的src赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给src赋值。

## 懒加载实现
- 1.加载loading图片
- 2.判断哪些图片要加载【重点】
- 3.隐形加载图片
- 4.替换真图片

![](/image_lazyload.png)
![](/images_lazyload2.png)
``` js
//onload是等所有资源文件加载完毕后再绑定事件
window.onload = function () {
  var imgs = document.querySelector('img');

  function getTop(e) {
    return e.offsetTop;
  }

  function lazyLoad(imgs) {
    var h = window.innerHeight;
    var s = document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < imgs.length; i++) {
      if ((h + s) > getTop(imgs[i])) {
        //不加立即执行函数i会等于9
        (function (i) {
          //页面开始有2秒空白
          setTimeout(function () {
            //隐形加载图片图片，这个图片不会到页面上去
            let temp = new Image();
            temp.src = imgs[i].getAttribute('data-src');
            temp.onload = function () {
              imgs[i].src = imgs[i].getAttribute('data-src')
            }
          }, 200)
        })(i)
      }
    }
  }
  lazyLoad(imgs);
  //滚屏函数
  window.onscroll = function () {
    lazyLoad(imgs);
  }
}
```
