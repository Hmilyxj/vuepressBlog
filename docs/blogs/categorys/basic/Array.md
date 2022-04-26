---
title: 前端基础之添加数组Array方法
date: 2022-2-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - Array
  - 基础概念
  - 前端
  - 面试
---
## 数组添加删除重复数的方法delRepeat
给Array本地对象增加一个原型方法，它用于删除数组条目中重复的条目(可能有多个)，返回值是一个包含删除重复条目后的新数组
```js
//给数组原型添加方法
Array.prototype.delRepeat = function(){
    var subarr = [];
    for(var i=0; i<this.length; i++){
        if(subarr.indexOf(this[i]) == -1){
            subarr.push(this[i]);
        }
    }
    return subarr;
}
console.log([1,23,3,4,4,3,2,1].delRepeat()); //[ 1, 23, 3, 4, 2 ]
```
## 数组添加返回数组内是重复数的方法
```js
//返回值是一个包含被删除的重复条目的新数组
 Array.prototype.repeat = function(){
              var arr = this;
              var arr2 = [];
             for(var i=0; i<arr.length; i++){
                  var index = arr.lastIndexOf(arr[i]);
                  if(index !== -1 && index !== i){
                       if(arr2.indexOf(arr[i]) === -1){
                             arr2.push(arr[i]);
                       }
                      arr.splice(i,1);
                       i--;
                 }
             }
             return arr2;
         }

console.log([1,23,3,4,4,3,2,1,23,5,5,6,7,8,7,4].repeat()); //[ 1, 23, 3, 4, 5, 7 ]

```
## 为Array实现一个 Reader 
每次调用会按顺序读区数组的n（默认为1）个元素，调用不会改变数组本身的值，若数组已全部读取完则返回空数组，若传入的参数不为正整数则抛出异常

const arr = [1, 2, 3, 4, 5, 6]
const reader = arr.getReader()

console.log(reader.read(‘1’)) // Error
console.log(reader.read(-1)) // Error
console.log(reader.read(1.5)) // Error
console.log(reader.read()) // [1]
console.log(reader.read(1)) // [2]
console.log(reader.read(2)) // [3,4]
console.log(reader.read(3)) // [5,6]
console.log(reader.read()) // []
```js
Array.prototype.getReader = function () {
  let that = JSON.parse(JSON.stringify(this))
  return {
    read (n) { // read:function(n){
      if (n) {
        try {
          if (typeof n == 'string') {
            throw Error()
          } else if (!(/(^[1-9]\d*$)/.test(n))) {
            throw Error()
          } else {
            let res = that.splice(0, n)
            return res
          }
        } catch (e) {
          return 'Error'
        }
      } else {
        if (that.length) {
          let res = that.splice(0, 1)
          return res
        } else {
          return []
        }
      }
    }
  }
}

```