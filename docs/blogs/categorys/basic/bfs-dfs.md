---
title: 前端基础之BFS、DFS
date: 2022-2-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - BFS、DFS
  - 基础概念
  - 前端
  - 面试
---

:::tip
DFS递归版
:::
```js
function dfs(root, res){
  if(root){
    res.push(root);
    let children = root.children;
    for(let i = 0; i < children.length; i++){
      dfs(children[i], res);
    }
  }
  return res;
}
```
:::tip
DFS非递归版
:::
```js
function dfs(root){
  let res = [];
  if(root){
    let stack = [];
    stack.push(root);
    while(stack.length){
      res.push(stack.pop());
      for(let i = root.children.length - 1; i >= 0; i--){
        stack.push(root.children[i]);
      }
    }
    return res;
  }
}
```

:::tip
BFS递归版
:::
```js
function bfs(root) {
  let res = [];
  let i = 0;
  if (root) {
    res.push(root);
    bfs(root.nextElementSibling);
    root = res[i++];
    bfs(root.firstElementSiling);
  }
  return res;
}
```
:::tip
BFS非递归版
:::
```js
function bfs(root) {
  let res = [];
  if(root){
    let queue = [];
    queue.unshift(root);
    while(queue.length){
      res.push(queue.shift());
      for(let i = 0; i < root.children.length; i++){
        queue.push(children[i])
      }
    }
  }
  return res;
}
```