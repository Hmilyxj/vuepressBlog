---
title: 前端基础之实现eventbus
date: 2021-12-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - eventbus
---

:::tip
EventBus是消息传递的一种方式，基于一个消息中心，订阅和发布消息的模式。
:::
## 发布订阅
设计模式：订阅者发布者模式，这种设计模式在前端很常见。

API的设计：
1 只能构造一个消息对象
2 on('msgName', func)订阅消息，msgName:订阅的消息名称 func: 订阅的消息
3 one('msgName', func)仅订阅一次消息，后订阅的会替换前面订阅的消息
4 emit('msgName', msg)发布消息 msgName:消息名称 msg：发布的消息
5 off('msgName')移除消息
```js
function EventBusClass() {
  this.msgQueues = {};
}

EventBusClass.prototype = {
  on: function (msgName, func) {
    if (this.msgQueues.hasOwnProperty(msgName)) {
      if (typeof this.msgQueues[msgName] === 'function') {
        this.msgQueues[msgName] = [this.msgQueues[msgName], func];
      } else {
        this.msgQueues[msgName] = [...this.msgQueues[msgName], func];
      }
    } else {
      this.msgQueues[msgName] = func;
    }
  },
  once: function (msgName, func) {
    //无需检查msgName是否存在
    this.msgQueues[msgName] = func;
  },
  emit: function (msgName, msg) {
    if (!this.msgQueues.hasOwnProperty(msgName)) {
      return;
    }
    if(typeof this.msgQueues[msgName] === 'function'){
      this.msgQueues[msgName](msg)
    } else {
      this.msgQueues[msgName].map((fn) => {
        fn(msg);
      })
    }
  },
  off: function(msgName){
    if(!this.msgQueues.hasOwnProperty(msgName)){
      return;
    }
    delete this.msgQueues[msgName]
  }
}

//将EventBus放到window对象中
const EventBus = new EventBusClass();
window.EventBus = EventBus;
```
:::tip
使用EventBus
:::
```js
// 订阅消息
function subscribe() {
    EventBus.on('first-event', function(msg) {
        alert(`订阅的消息是：${msg}`);
    });
}

// 发送消息
function emit() {
    const msgInput = document.getElementById("msgInputId")
    EventBus.emit('first-event', msgInput.value)
}

// 移除消息
function off(msgName) {
    EventBus.off(msgName)
}
```