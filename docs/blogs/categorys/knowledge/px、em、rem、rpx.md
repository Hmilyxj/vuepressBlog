---
title: px、em、rem、rpx 用法 与 区别
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
px、em、rem、rpx 用法 与 区别
:::
## PX
px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。

PX特点

1. IE无法调整那些使用px作为单位的字体大小；
2. 国外的大部分网站能够调整的原因在于其使用了em或rem作为字体单位；
3. Firefox能够调整px和em，rem，但是96%以上的中国网民使用IE浏览器(或内核)。

## EM
em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

EM特点

1. em的值并不是固定的；
2. em会继承父级元素的字体大小。

## REM
rem是CSS3新增的一个相对单位（root em，根em），这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。

## rpx
rpx 是微信小程序解决自适应屏幕尺寸的尺寸单位。微信小程序规定屏幕的宽度为750rpx。

无论是在iPhone6上面还是其他机型上面都是750rpx的屏幕宽度，拿iPhone6来讲，屏幕宽度为375px，把它分为750rpx后， 1rpx = 0.5px。

微信小程序同时也支持rem尺寸单位， rem 规定屏幕的宽度为20rem, 所以 1rem = (750/20)rpx = 37.5 rpx