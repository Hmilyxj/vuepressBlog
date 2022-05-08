---
title: 前端基础之排序
date: 2022-2-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - 排序问题
---
## 冒泡排序
```js
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {        // 相邻元素两两对比
        var temp = arr[j + 1];        // 元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
```
## 选择排序
```js
function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {     // 寻找最小的数
        minIndex = j;                 // 将最小数的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
```
## 插入排序
```js
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
} 
```
## 快速排序
```js
//不常写
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let center = arr.shift();
  let left = [], right = [];
  arr.forEach(function (item, index) {
    if (item <= center) {
      left.push(item);
    } else {
      right.push(item);
    }
  })
  let newArr = quickSort(left).concat(center, quickSort(right));
  return newArr;
}
```
```js
//非递归实现快速排序(需要一个栈)
// 快速排序的思想就是分治法，第一趟将序列分成两部分，每一部分都可以看出一个小的序列，可以将小的序列最左最右指针下表入栈。
let quickSort = (arr, left, right) => {
  let stack = []; //js中用数组模拟栈
  stack.push(left); //左指针入栈
  stack.push(right); //右指针入栈
  while (stack.length > 0) {  //栈不为空时，说明还有序列没有排序好
    let right = stack.pop();//后进先出，栈顶元素出栈，是为待排序列的最右下标（指针）
    let left = stack.pop(); //栈顶元素出栈，是为待排序列的最左下标（指针）
    let index = partition(arr, left, right);  //划分，将待排序列进行一趟快速排序，最终有一个数获得最终位置，其下标为index
    if (left < index - 1) { //将index将待排序列分为两部分
      stack.push(left); //左边那部分左指针入栈
      stack.push(index - 1);//左边那部分右指针入栈
    }
    if (right > index + 1) {  //右边部分入栈
      stack.push(index + 1);
      stack.push(right);
    }
  }
  return arr;  //返回数组
}

function partition(arr, left, right) {     // 分区操作
  var pivot = left, index = pivot + 1;   // 设定基准值（pivot）
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
let arr = [49, 38, 65, 97, 23, 22, 76, 1, 5, 8, 2, 0, -1, 22];
console.log(quickSort(arr, 0, arr.length - 1))
```
```js
//递归
function quicksort(arr) {
  quick(arr, 0, arr.length - 1);
  return arr;
}
//
function quick(arr, low, high) {
  if (low > high) {
    return;
  }
  //par是基准
  let par = partition(arr, low, high);
  quick(arr, low, par - 1);
  quick(arr, par + 1, high);
}

// 划分函数
function partition(arr, left, right) {     // 分区操作
  var pivot = left, index = pivot + 1;   // 设定基准值（pivot）
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```
## 快排优化
对于少量数据比如10个，100个，快速排序显然已经不是最好的了；那么快速排序每次经过找基准，这样数据就在慢慢趋于有序，这个时候当low和high之间的数据小于一个给定的值的时候，比如100，我们就可以之间调用之间插入排序来进行排序
```js
function quickSort(arr, low, high) {
  if (low > high) {
    return;
  }
  //第一个优化：当low,high之间的数据个数少于某一个范围，可以调用直接插入排序
  if (high - low + 1 < 100) {
    insertsort2(arr, low, high);
    return;
  }
}

//用来优化的的直接插入排序
function insertsort2(arr, low, high) {
  for (let i = low + 1; i <= high; i++) {
    let tmp = arr[i];
    let j = i - 1;
    for (; j >= low; j--) {
      if (arr[j] > tmp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = tmp;
  }
}
```

保证每次基准的俩边都有数据，我们每次都取最左边low，最右边high，中间下标mid=(high+low)/2,这三个下标对应数据的中位数，不管在这三个位置哪个位置找到，只需要把他和low位置进行交换，那么low就永远放的就是这个中位数
```js
function quickSort(arr, low, high) {
  if (low > high) {
    return;
  }
  //第二次优化，取三个数中位数,这样的基准就不会出现极端情况
  mid(arr, low, high);
  //par是基准
  let par = partition(arr, low, high);
  quickSort(arr, low, par - 1);
  quickSort(arr, par + 1, high);
}
//优化的取三个数字的中位数
function mid(arr, low, high) {
  let mid = (low + high) / 2;
  //array[mid] < array[low] < array[high]
  if (arr[low] >= arr[high]) {
    swap(arr, low, high);
  }
  if (arr[low] <= arr[mid]) {
    swap(arr, low, mid);
  }
  if (arr[mid] >= arr[high]) {
    swap(arr, low, mid);
  }
}

```
```js
// 两种组合在一起
function quicksort(arr) {
  quick(arr, 0, arr.length - 1);
  return arr;
}
//
function quick(arr, low, high) {
  if (low > high) {
    return;
  }
  //第一个优化：当low,high之间的数据个数少于某一个范围，可以调用直接插入排序
  if (high - low + 1 < 100) {
    insertsort2(arr, low, high);
    return;
  }
  //第二次优化，取三个数中位数,这样的基准就不会出现极端情况
  mid(arr, low, high);
  //par是基准
  let par = partition(arr, low, high);
  quick(arr, low, par - 1);
  quick(arr, par + 1, high);
}
//用来优化的的直接插入排序
function insertsort2(arr, low, high) {
  for (let i = low + 1; i <= high; i++) {
    let tmp = arr[i];
    let j = i - 1;
    for (; j >= low; j--) {
      if (arr[j] > tmp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = tmp;
  }
}
//优化的取三个数字的中位数
function mid(arr, low, high) {
  let mid = (low + high) / 2;
  //array[mid] < array[low] < array[high]
  if (arr[low] >= arr[high]) {
    swap(arr, low, high);
  }
  if (arr[low] <= arr[mid]) {
    swap(arr, low, mid);
  }
  if (arr[mid] >= arr[high]) {
    swap(arr, low, mid);
  }
}

// 划分函数
function partition(arr, left, right) {     // 分区操作
  var pivot = left, index = pivot + 1;   // 设定基准值（pivot）
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

```
## 归并排序
```js
function mergeSort(arr) {
  var len = arr.length;
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length)
    result.push(left.shift());

  while (right.length)
    result.push(right.shift());

  return result;
}
```