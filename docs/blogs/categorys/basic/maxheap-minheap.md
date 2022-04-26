---
title: 前端基础之大小顶堆
date: 2021-12-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - 大顶堆，小顶堆
---

## 大顶堆

```js
var findKthLarger = function (arr, k) {
  let res = arr.slice(0, k);
  maxHeap(res);
  for (let i = k; i < arr.length; i++) {
    if (arr[i] < res[0]) {
      res[0] = arr[i];
      creatHeap(res, 0);
    }
  }
  return res;//前k个小的数，res[0]为第K小的数
}

var maxHeap = function (array) {
  //开始位置是最后一个非叶子节点
  let start = Math.floor(array.length / 2 - 1);
  for (let i = start; i >= 0; i--) {
    creatHeap(array, i);
  }
}
var creatHeap = function (array, index) {
  //左右子节点
  let leftNode = index * 2 + 1, rightNode = index * 2 + 2;
  let max = index;
  if (leftNode < array.length && array[leftNode] > array[max]) {
    max = leftNode;
  }
  if (rightNode < array.length && array[rightNode] > array[max]) {
    max = rightNode;
  }
  //交换位置
  if (max !== index) {
    let tmp = array[max];
    array[max] = array[index];
    array[index] = tmp;
    //交换位置后不确定是否还是大顶堆，重排
    creatHeap(array, max);
  }
}
console.log(findKthLarger([4, 3, 5, 6, 2, 7, 1, 8, 9], 5))
```

## 小顶堆
```js
var findKthLarger = function (arr, k) {
  let res = arr.slice(0, k);
  minHeap(res);
  for (let i = k; i < arr.length; i++) {
    if (arr[i] > res[0]) {
      res[0] = arr[i];
      creatHeap(res, 0);
    }
  }
  return res;//前k个大的数，res[0]为第K大的数
}

var minHeap = function (array) {
  //开始位置是最后一个非叶子节点
  let start = Math.floor(array.length / 2 - 1);
  for (let i = start; i >= 0; i--) {
    creatHeap(array, i);
  }
}
var creatHeap = function (array, index) {
  //左右子节点
  let leftNode = index * 2 + 1, rightNode = index * 2 + 2;
  let min = index;
  if (leftNode < array.length && array[leftNode] < array[min]) {
    min = leftNode;
  }
  if (rightNode < array.length && array[rightNode] < array[min]) {
    min = rightNode;
  }
  //交换位置
  if (min !== index) {
    let tmp = array[min];
    array[min] = array[index];
    array[index] = tmp;
    //交换位置后不确定是否还是大顶堆，重排
    creatHeap(array, min);
  }
}
console.log(findKthLarger([4, 3, 5, 6, 2, 7, 1, 8, 9], 7))
```