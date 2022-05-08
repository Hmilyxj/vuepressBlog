---
title: 前端基础之深浅拷贝
date: 2021-12-28
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - curry
  - 基础概念
  - 前端
  - 面试
---
## 浅拷贝
```js
function shallowClone(obj) {
  if(typeof obj !== 'object') return obj;
  if(obj === null) return obj;
  let cloneObj = Array.isArray(obj) ? [] : {};
  for(let i in obj){
    if(obj.hasOwnProperty(i)){
      cloneObj[i] = obj[i]
    }
  }
}
```
## 深拷贝
```js
function deepClone(obj) {
  let cloneObj = Array.isArray(obj) ? [] : {};
  if(typeof obj !== 'object') return obj;
  if(obj === null) return obj;
  if(obj intanceof Date) return new Date(obj);
  if(obj intanceof RegExp) return new RegExp(obj);
  for(let i in obj){
    if(obj.hasOwnProperty(i)){
      cloneObj[i] = deepClone(obj[i])
    }
  }
  return cloneObj;
}
```
## 用json.stringfy()实现深拷贝，对象有undfined或者函数Date怎么办
json.parse()可以接受一个函数作为参数，这个函数就是还原函数，还原函数有两个参数，键和值。
如果还原函数返回undefined就删除相应的键，否则就插入到结果中。
可以提前判断key是不是Date,是的话就转换一下。
```js
var book = {
  "title": "hmily",
  "date": new Date(2022,2,10)
}
var jsonStr = JSON.stringfy(book);

var bookCopy = JSON.parse(jsonStr, function(key, value){
  if(key == 'date'){
    return new Date(value);
  }
  return value;
})
```
## 深拷贝如果是循环引用时如何进行拷贝
创建一个在整个函数执行期间一直存在的 Map 类型变量,每一次函数执行把这一轮传入的对象作为 key 新的创建对象作为值，在函数开头执行判断传入的对象是否已经存在 map 的 keys 中，如果存在那代表着传入的对象在之前已经遍历过了.
```js
let obj = {};
obj.a = obj;
let map = new Map();

function deepClone(object){
  if(Array.from(map.keys()).includes(object)){
    return map.get(object);
  }
  let cloneObj = {};
  map.set(object, cloneObj);
  for(let key in object){
    cloneObj[key] = deepClone(object[key])
  }
  return cloneObj;
}
```
## 用toString避免出现问题深拷贝
```js
//实现深拷贝函数
function deepClone(data) {
    const type = this.judgeType(data);
    let obj = null;
    if (type == 'array') {
        obj = [];
        for (let i = 0; i < data.length; i++) {
            obj.push(this.deepClone(data[i]));
        }
    } else if (type == 'object') {
        obj = {}
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                obj[key] = this.deepClone(data[key]);
            }
        }
    } else {
        return data;
    }
    return obj;
}

function judgeType(obj) {
    // tostring会返回对应不同的标签的构造函数
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}
const test = {
    name: 'a',
    date: [1,2,3]
};

console.log(deepClone(test))
test.date[0] = 6;
console.log(test);

```
## 考虑各种情况深拷贝
```js
// 判断类型，正则和日期直接返回新对象
// 空或者非对象类型，直接返回原值
// 考虑循环引用，判断如果hash中含有直接返回hash中的值
// 新建一个相应的new obj.constructor加入hash
// 遍历对象递归（普通key和key是symbol情况）

function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== 'object') return obj;
  //循环引用的情况
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  //new 一个相应的对象
  //obj为Array，相当于new Array()
  //obj为Object，相当于new Object()
  let constr = new obj.constructor();
  hash.set(obj, constr);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash)
    }
  }
  //考虑symbol的情况
  let symbolObj = Object.getOwnPropertySymbols(obj)
  for (let i = 0; i < symbolObj.length; i++) {
    if (obj.hasOwnProperty(symbolObj[i])) {
      constr[symbolObj[i]] = deepClone(obj[symbolObj[i]], hash)
    }
  }
  return constr
}
```