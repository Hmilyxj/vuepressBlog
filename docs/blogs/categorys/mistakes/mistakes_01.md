---
title: 那些年我踩过的坑
date: 2021-11-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 避坑指南
tags: 
  - 前端
  - 错误合集
---

:::tip
这是一些错误的解决办法
:::
<!-- more -->


## vue中的事件总线：$bus

原理：$bus就是vue原型上添加的一个vue实例，用于存储、监听以及触发事件：
``` js
Vue.prototype.$bus = new Vue();
``` 
解决的问题：无关组件之间的交互问题（也可以使用vuex）
使用方法：
1.创建事件总线：
``` js
Vue.prototype.$bus = new Vue();
``` 
2.触发事件并传参：
``` js
this.$bus.$emit(event, this.event);// 触发事件（事件名，参数）
this.$bus.$emit(event);// 触发event事件
``` 
3.监听事件event并收参data：
``` js
this.$bus.$on(event, (data) => {
	console.log('event', data)
);
``` 
4.删除事件：
``` js
this.$bus.$off(event)
``` 
注：
如果一个事件已存在，那么再为其赋值是不会被覆盖的，所以会使用如下写法：
``` js
// 赋值前先将其值删除
this.$bus.$off(event).$on(event, () => {
	this.show = true;
})
``` 