---
title: 前端基础之面经编程题
date: 2022-3-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面经
---
## 本地无法实现加法功能，现有其他团队提供的api
```js
async function add() {
  let arr = Array.prototype.slice.call(arguments);
  let res = await arr.reduce((s, v) => {
    return s.then((res) => asyncAdd(res, v))
  }, Promise.resolve(0))
  return res;
}

function asyncAdd(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 0)
  })
}

add(1, 2, 3).then((res) => {
  console.log(res)
})
```
## 快乐数
```js
/**
 * 解法1：哈希法
 * 缺点是用到哈希集合，空间复杂度过高
 */
const getSum = n => {
    let sum = 0
    while (n) {
        sum += (n % 10) ** 2
        n = Math.floor(n / 10)
    }
    return sum
}
var isHappy = function (n) {
    // Set写法
    let ret = new Set()
    while (1) {
        if (ret.has(n)) return false
        if (n === 1) return true
        ret.add(n)
        n = getSum(n)
    }
    // Map写法
    // let ret = new Map()
    // while (1) {
    //     if (ret.has(n)) return false
    //     if (n === 1) return true
    //     ret.set(n, 1)
    //     n = getSum(n)
    // }
};

```
```js
/**
 * 解法2：快慢指针，与判断环形链大同小异
 * 比哈希解法好太多了，时间空间复杂度都很低
 */
const getSum = n => {
    let sum = 0
    while (n) {
        sum += (n % 10) ** 2
        n = Math.floor(n / 10)
    }
    return sum
}
var isHappy = function (n) {
    
    let slow = getSum(n), fast = getSum(getSum(n))
    while (slow !== fast) {
        slow = getSum(slow)
        fast = getSum(getSum(fast))
    }
    // 判断是否是因为1引起的循环，是的话就是快乐数，不是就代表非快乐数死循环
    return slow === 1
};
```
## Z 字形变换
```js
var convert = function(s, numRows) {
    if(numRows == 1)
        return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for(let i = 0; i< len; i++) rows[i] = "";
    let loc = 0;
    let down = false;

    for(const c of s) {
        rows[loc] += c;
        if(loc == 0 || loc == numRows - 1)
            down = !down;
        loc += down ? 1 : -1;
    }

    let ans = "";
    for(const row of rows) {
        ans += row;
    }
    return ans;
};
```
## 7. 整数反转
```js
var reverse = function (x) {
  let y = parseInt(x.toString().split("").reverse().join(""));
  if (x < 0)
    y = - y;
  return y > Math.pow(2, 31) - 1 || y < Math.pow(-2, 31) ? 0 : y;
};
```
```js
//~是按位取反运算，~~是取反两次。~~的作用是去掉小数部分，因为位运算的操作值要求是整数，其结果也是整数，所以经过位运算的都会自动变成整数。
var reverse = function (x) {
  let res = 0;
  while (x) {
    res = res * 10 + x % 10;
    if (res > Math.pow(2, 31) - 1 || res < Math.pow(-2, 31)) return 0;
    x = ~~(x / 10);
  }
  return res;
};
```
## vue自定义指令
```js
//创建全局指令：
Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
  }
})

```
```js
//创建局部指令：
//通过在Vue实例中添加 directives 对象数据注册局部自定义指令。
directives: {
  focus: {
    inserted: function(el) {
      el.focus();
    }
  }
}
```
## vuex的action何时结束，返回promise
通过让action返回Promise，在Promise的then中来处理完成后的操作
```js
//store下的index.js中actions返回Promise函数，完成就调用resolve，发生错误调用reject
actions: {
    getHomeMultidata(context) {
      return new Promise((resolve, reject) => {
        axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
          context.commit("addBannerData", res.data.data.banner.list)
          resolve({name: "coderwhy", age: 18})
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
```
```js
//在组件中使用，先dispatch派发操作，返回promise，通过promise.then获取请求后的结果
<script>
  import { onMounted } from "vue";
  import { useStore } from 'vuex'
 
  export default {
    setup() {
      const store = useStore()
 
      onMounted(() => {
        const promise = store.dispatch("getHomeMultidata")
        promise.then(res => {
          //请求成功返回res会拿到 resolve()里传过来的内容
          console.log(res)
        }).catch(err => {
          //请求失败返回err会拿到reject()里传过来的内容
          console.log(err)
        })
      })
    }
  }
</script>
```
## 手写ajax
```js
// 结合Promise
function Ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // 这里的 status 可以适当修改
        if (xhr.status === 200) {
          resolve(
            // 将得到 responseText 转换为JSON格式数据
            JSON.parse(xhr.responseText)
          );
        } else if (xhr.status === 404) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send(null);
  });
  return p;
}
const url = './data/test.json';
Ajax(url).then(res => console.log(res)).catch(err => console.err(err))

// 若想设置POST请求版，则需更改
// xhr.open里的参数为xhr.open('POST', url, true/false);
// xhr.send里的参数为xhr.send(p);
```
## sort排序字符串 + 数字
```js
let arr = ['c', 'a', 'f', 'b', 1, 10, 2, 12];
let ASCarr = arr.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
})

// ["a","b","c","f",1,2,10,12]
```
## dom转json
```html
<div>
  <span>
    <div></div>
    <div></div>
  </span>
  <span>
    <div></div>
    <div></div>
  </span>
</div>
```
```js
function dom2json() {
  const jsContainer = document.getElementsByTagName('div')[0];

  function domJson(dom) {
    var obj = {
      tag: getTagName(dom)
    }
    if (dom.nodeType == 1) {
      //var attrs = getTagAttrs(dom);
      //if (attrs) obj.attributes = attrs;
      obj.children = Array.from(dom.childNodes).filter(child => {
        return !(child.nodeType == 3 && !child.textContent.trim())
      }).map(child => domJson(child))
      return obj;
    }
    if (dom.nodeType == 3) {
      obj.content = textHandle(dom.textContent);
      return obj;
    }
  }

  function getTagName(dom) {
    return dom.tagName;
  }

  function getTagAttrs(dom) {
    var attr = Array.from(dom.attributes);
    var obj = {};
    attr.forEach(atr => obj[atr.name] = atr.value);
    return attr.length ? obj : null;
  }

  function textHandle(str) {
    return str.replace(/\s/g, '');
  }

  console.log(domJson(jsContainer));
}

dom2json()
```
## 消失的数字，数组nums包含从0-n的所有整数，但其中缺了一个
```js
var missingNumber = function (nums) {
  let res = 0;
  let b = new Array(nums.length + 1);
  for (let i = 0; i < nums.length; i++) {
    b[nums[i]] = true;
  }
  for (let i = 0; i < b.length; i++) {
    if (!b[i]) res = i;
  }
  return res;
};
```
```js
// 利用异或的特性，res = res ^ x ^ x。对同一个值异或两次，那么结果等于它本身
let res = 0;
for (let i = 0; i < nums.length; ++i) {
  res ^= i;
  res ^= nums[i];
}
res ^= nums.length;

return res;
```
```js
//前n项和 - 数组和 = 消失的数字
let sum = 0;
let miss = 0;
sum = (1 + numsSize) * numsSize / 2;
for (let i = 0; i < numsSize; i++) {
  miss += nums[i];
}
miss = sum - miss;
return miss;
```
## 字符串数组转换成{value: 'abc',children: {}}
```js
// // 示例一:
// 'abc' -- > { value: 'abc' }
// // 示例二：
// '[abc[bcd[def]]]' -- > { value: 'abc', children: { value: 'bcd', children: { value: 'def' } } }

function fn(str) {
  let arr = str.split('[').slice(1);
  let last = arr[arr.length - 1].split(']')[0];
  arr[arr.length - 1] = last;
  for (let i = 0; i < arr.length; i++) {
    arr[i] = { "value": arr[i] };
  }
  convert(arr)
}

function convert(arr) {
  const len = arr.length;
  let prev = {
    children: arr[len - 1]
  }
  for (let i = len - 2; i >= 0; i--) {
    arr[i].children = prev;
    prev = arr[i];
  }
  console.log(prev)
  return prev
}
fn('[abc[bcd[def]]]');
```
## 手写normalize函数，字符串数组转换成{value: 'abc',children: {}}
```js
let normalize = str => {
  let result = {}
  let c
  
  // 字符串转化为数组
  let arr = str.split(/[\[\]]/g).filter(Boolean)
  
  // 生成结构化数据
  arr.forEach((item, index) => {
    if(index != 0) {
      c.children = {}
      c.children.value = item
      c= c.children
    } else {
      result.value = item
      c= result
    }
  })
  
  return result
}
let str = '[abc[bcd[def]]]'
normalize(str)
// {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
```
## 有100个酒瓶子，三个瓶子可以换1瓶酒 可以换多少瓶酒
```js
function getNum(Bottle) {
  if (Bottle < 3) {
    return 0;
  } else {
    let Count = Math.floor(Bottle / 3) + Bottle % 3
    return Math.floor(Bottle / 3) + getNum(Count);
  }
}

console.log(getNum(100))
```
## 有100个酒瓶子，三个瓶子可以换1瓶酒 七个盖子可以换1瓶酒 一共可以换多少瓶酒
```js
function getNum(Bottle, Cap) {
  if (Bottle < 3 && Cap < 7) {
    return 0;
  } else {
    Count = Math.floor(Bottle / 3) + Bottle % 3 + Math.floor(Cap / 7);
    Cover = Math.floor(Cap / 7) + Cap % 7 + Math.floor(Bottle / 3);
    return Math.floor(Bottle / 3) + Math.floor(Cap / 7) + getNum(Count, Cover);
  }
}

console.log(getNum(100, 100))
```
## 利用xmlHttprequest实现请求返回一个promise对象
```js
function myRequest() {
return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest()
    xmlhttp.open('GET', url);
    xmlHttp.onreadyStateChange = function () {
        if (xmlHttp.readyState == 4) {
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 ||
                xmlhttp.status === 304) {
                resolve(xmlhttp.responseText)
            }
        } else {
            reject(xmlhttp.status)
        }
    }
})
}
```
## 简单实现addclass,removeclass
classList属性的值为DOMTokenList对象，关于DOMTokenList官方解释是一组空格分隔的标记，与Array一样具有length属性，且索引从0开始，但无法使用Array对象的方法。
```js
let div = document.querySelector('div');
div.classList.add("newClass");
div.classList.remove("newClass");
```
```js
//自定义添加class方法
function addClass(ele, name) {
    if (name) {
        //判断该dom有没有class，有则在原class基础上增加，无则直接赋值
        ele.className ? ele.className = ele.className + " " + name : ele.className = name;
    } else {
        throw new Error("请传递一个有效的class类名");
    };
};
 
//自定义删除class类方法
function removeClass(ele, name) {
    //将className属性转为数组
    let classArr = ele.className.split(" "),
        index = classArr.indexOf(name);
    //将符合条件的class类删除
    index > -1 ? classArr.splice(index, 1) : null;
    ele.className = classArr.join(" ");
};
 
let div = document.querySelector('div');
//测试调用
addClass(div, 'demo1');
removeClass(div, 'demo1');
```
## 实现addClass(class为数组)
```js
// 1. 判断是否有DOM元素是否有class属性（ 没有则创建并且添加className ）
// 2. 判断DOM元素的class样式中是否已存在要添加的className
// 3. 将要添加的样式分割为数组，一个一个进行判断
function hasAttr (element) {
  return element.hasAttribute('class')
}
//2. 判断DOM元素的class样式中是否已存在要添加的className
//   不管要添加多少class,都将其转化为数组判断是否与原样式重复
function hasClass(classArr, new_class) {
  var flag = false
  new_class.forEach(function (value, index) {
    if (classArr.indexOf(value) !== -1) {
      flag = true
    }
  })
  return flag
}

function addClass(element, new_class) {
  if (hasAttr(element)) {
    var classArr = element.className.split(' ')
    new_class = new_class.split(' ')

    if (hasClass(classArr, new_class)) {
      new_class.forEach(function (value, index) {
        if (classArr.indexOf(value) === -1) {
          tmp.push(value)
        }
      })
    } else {
      tmp = new_class
    }
    element.className += ' ' + tmp.join(' ')
  } else {
    element.setAttribute('class', new_class)
  }
}
```
## 实现removeClass(class为数组)
```js
//1. 判断是否有DOM元素是否有class属性
function hasAttr(element) {
  return element.hasAttribute('class')
}

//2. 判断DOM元素的class样式中是否已存在要添加的className
//   不管要添加多少class,都将其转化为数组判断是否与原样式重复
function hasClass(classArr, new_class) {
  var flag = false
  new_class.forEach(function (value, index) {
    if (classArr.indexOf(value) !== -1) {
      flag = true
    }
  })
  return flag
}

function removeClass(element, remove_class) {
  if (hasAttr(element)) {
    var classArr = element.className.split(' ')
    remove_class = remove_class.split(' ')

    if (hasClass(classArr, remove_class)) {
      remove_class.forEach(function (value, index) {
        if (classArr.indexOf(value) !== -1) {
          classArr.splice(classArr.indexOf(value), 1)
        }
      })
    }
    element.className = classArr.join(' ')
  } else {
    console.log('该元素没有class属性')
    return
  }
}
```
## 得到一个数组，数组的每一项是一个标签名
```js
//其实只要知道如何获取页面中所有元素就能做出来, 通过document.querySelectorAll("*")获取
const all = Array.from(document.querySelectorAll("*"));
const hash = {};
const res = [];
all.forEach(it=>{
    if(!hash[it.tagName]){
        res.push(it.tagName);
        hash[it.tagName] = true;
    }
})
console.log(res)
```
## 数组转换成这个形式{a:{b:{c:d}}}
```js
//input ["a","b","c","d","e","f","g"]
//output {"a":{"b":{"c":{"d":{"e":{"f":"g"}}}}}}
function handler(arr){
    const len = arr.length;
    let prev = {
        [arr[len-2]]:arr[len-1]
    }
    for(let i=len-3;i>=0;i--){
        prev = {
            [arr[i]]:prev
        }
    }
    return prev
}
```
## async/await捕获异常
```js
async function fn() {
  try{
    let res = await fetch('');
    let data = await res.json();
    //do something
  } catch(e){
    //do something
  }
}
```
## 数组去重
```js
//set
function uniquearray(arr) {
  let res = Array.from(set(arr));
  return res;
}

//filter
function uniquearray(arr) {
  let res = arr.filter(function (item, index, array) {
    return index == array.indexOf(item);
  })
  return res;
}
//forEach
//Map()看是否已经有键
```
## 同类项统计，输出出现次数最多字母的前缀数字之和
```js
const test = ['1a', '2b', '13c', '5a'];

let len = test.length;
let map = new Map();
for(let i = 0; i < len; i++){
  let strlen = test[i].length;
  if(!map.has(test[i][strlen - 1])){
    let arr = [1, parseInt(test[i].slice(0, strlen - 1))];
    map.set(test[i][strlen - 1], arr);
  } else {
    let arr = map.get(test[i][strlen - 1]);
    arr[0]++;
    arr[1] += parseInt(test[i].slice(0, strlen - 1));
    map.set(test[i][strlen - 1], arr);
  }
}

let max = 0, res = 0;
for(let key of map.keys()){
  let arr = map.get(key);
  if(arrr[0] > max){
    max = arr[0];
    res = arr[1];
  }
}

console.log(res)
```
## 删除由相同字符组成的长度大于等于2的子串
'abbbaca'=>'aaca'=>'ca'
```js
let test = 'abbbaca';
let len = test.length;
let stk = [test[0]];
for (let i = 1; i < len; i++) {
  if (stk.length) {
    let top = stk[stk.length - 1];
    if (test[i] === top) {
      while (test[i] === test[i + 1]) {
        i++;
      }
      stk.pop();
    } else {
      stk.push(test[i]);
    }
  } else {
    stk.push(test[i])
  }
}
console.log(stk.join(''))
```
## arr[i]闭包
```js
function fn() {
  var arr = [];
  for (var i = 4; i < 7; i++) {
    (function (j) {
      arr.push(function () {
        return j
      })
    })(i)
  }
  return arr;
}

let f = fn();
console.log(f[0]())//7
console.log(f[1]())//7
console.log(f[2]())//7
console.log(f[3]())//Error
```
## 实现闭包
```js
function test() {
  var tmp = 100;
  function a() {
    console.log(tmp);
  }
  return a;//把里面的函数保存到了外面
}
var demo = test();
demo();//里面的函数在外面调用
```
```js
function fn() {
  for (var i = 0; i < 3; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j);
      }, 1000)
    })(i)
  }
}
fn()
```
## 函数缓存
```js
function memorize(fn) {
  let cache = {};
  return function () {
    //将参数存入args做key
    let args = Array.prototype.slice.call(arguments);
    if (args in cache) {
      console.log('直接输出')
      return cache[args];
    }
    return cache[args] = fn.apply(fn, arguments)
  }
}

function add() {
  console.log('开始缓存')
  let sum = 0;
  for (let item of arguments) {
    sum += item;
  }
  return sum;
}

let add1 = memorize(add);
console.log(add1(1, 2, 3))
console.log(add1(1, 2, 3))
```
## css实现梯形
法一：做三个‘小盒子’ 1号，和3号小盒子都做成小三角形，2号小盒子做成一个正方形。
```html
<div class='box'></div>
<div class='box2'></div>
<div class='box3'></div>
```
```css
.box,
.box3 {
  width: 0px;
  height: 0px;
  border-top: 50px solid transparent;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
  border-bottom: 50px solid green;
  margin-bottom: 10px;
  display: inline-block;
}

.box2 {
  width: 50px;
  height: 50px;
  background-color: green;
  display: inline-block;
}

.box {
  transform: translate(54px, 10px);
}

.box3 {
  transform: translate(-54px, 10px);
}
```
法二：利用border
```css
<div class='box'></div>
.box {
  width: 60px;
  height: 60px;
  /* border-top: 20px solid; */
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid;
}
```
法三：利用3d旋转和透视操作
```css
<div class='box'></div>
.box {
  width: 60px;
  height: 60px;
  background-color: greenyellow;
  transform: perspective(2em) rotateX(10deg);
  margin-left: 30px;
}
```
## 轮播图
```css
.box {
  width: 490px;
  height: 170px;
  margin: 100px auto;
  padding: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.inner {
  width: 490px;
  height: 170px;
  background-color: pink;
  overflow: hidden;
  position: relative;
}

.inner ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 1000%;
  position: absolute;
  top: 0;
  left: 0;
}

.inner li {
  float: left;
}

.inner li img {
  vertical-align: top;
  width: 490px;
  height: 170px;
}

/* 导航器 */
.square {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.square span {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #fff;
  text-align: center;
  line-height: 16px;
  cursor: pointer;
}

.square span.current {
  background-color: orangered;
  color: #fff;
}
```
```html
<div class="box" id="box">
<div class="inner">
  <ul>
    <li>
      <a href="#"><img src="images/01.jpg" alt="" /></a>
    </li>
    <li>
      <a href="#"><img src="images/02.jpg" alt="" /></a>
    </li>
    <li>
      <a href="#"><img src="images/03.jpg" alt="" /></a>
    </li>
    <li>
      <a href="#"><img src="images/04.jpg" alt="" /></a>
    </li>
    <li>
      <a href="#"><img src="images/05.jpg" alt="" /></a>
    </li>
  </ul>
  <div class="square">
    <span class="current">1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
  </div>
</div>
</div>
```
```js
//需求：鼠标经过按钮 按钮排他 还要把ul以动画的方式移动到指定位置
//1.鼠标经过按钮 按钮排他
var box = document.getElementById('box')
var inner = box.children[0]
var ul = inner.children[0]
var squareList = inner.children[1]
var squares = squareList.children //所有按钮
var imgWidth = inner.offsetWidth //图片宽度

//给每一个按钮注册鼠标经过事件
for (var i = 0; i < squares.length; i++) {
  squares[i].index = i //把索引保存在自定义属性中
  squares[i].onmouseover = function () {
    for (var j = 0; j < squares.length; j++) {
      squares[j].className = ''
    }
    //留下我自己
    this.className = 'current'
    //目标 和 当前按钮索引有关 和 图片宽度有关 而且是负数
    var target = -this.index * imgWidth
    animate(ul, target)
  }
}

function animate(obj, target) {
  console.log(target)
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    var leader = obj.offsetLeft
    var step = 30
    step = leader < target ? step : -step //step有了正负
    if (Math.abs(leader - target) >= Math.abs(step)) {
      leader = leader + step
      obj.style.left = leader + 'px'
    } else {
      obj.style.left = target + 'px' //手动放到终点
      clearInterval(obj.timer)
    }
  }, 15)
}
```
## 移动动画效果
```html
<button id="btn">奔跑吧盒子</button>
<div id="demo"></div>
<script>
    var timer = null;
    var btn = document.getElementById("btn");
    var demo = document.getElementById("demo");
    // 点击按钮 让盒子跑
    btn.onclick = function () {
        clearInterval(timer);//防止重复设定定时器
        timer = setInterval(function () {
            var target = 400; // 目标值
            var leader = demo.offsetLeft; // 获取当前位置
            var step = 10;
            if (leader < target) {
                leader = leader + step;
                demo.style.left = leader + "px";
            } else {
                clearInterval(timer);
            }
        }, 15);
    };
</script>
```
```css
* {
  margin: 0;
  padding: 0;
}

#demo {
  width: 100px;
  height: 100px;
  background-color: red;
  position: absolute;
  /*一定要记得加定位*/
}
```
## css实现跑马灯
利用keyframes延迟动画,动画加载到百分之多少动作进行到什么程度
@keyframes light {
  %0 {left: 200px;}
  10% {left: 400px;}
}
```html
<div class="content"></div>
```
```css
.content {
  margin: 100px auto;
  width: 30px;
  height: 30px;
  position: relative;
}

.content::before {
  position: absolute;
  content: "";
  display: block;
  top: -30px;
  left: -30px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  animation: light 0.5s infinite;
}

@-webkit-keyframes light {
  from {
    background-color: #ff5722;
    box-shadow: 50px 0 0 0 #ff0, 100px 0 0 0 #ff5722, 150px 0 0 0 #ff0, 200px 0 0 0 #ff5722, 250px 0 0 0 #ff0;
  }

  to {
    background-color: #ff0;
    box-shadow: 50px 0 0 0 #ff5722, 100px 0 0 0 #ff0, 150px 0 0 0 #ff5722, 200px 0 0 0 #ff0, 250px 0 0 0 #ff5722;
  }
}
```
## 怎么用原生js实现类似于jquery的链式的方法调用
```js
window.$ = function(){
    return new _$(id);
}
function _$(id){
    this.elements = document.getElementById(id);
}
_$.prototype = {
    constructor:_$,
    hide:function(){
        console.log('hide');
        return this;
    },
    show:function(){
        console.log('shwo');
        return this;
    },
    getName:function(callback){
        if(callback){
            callback.call(this,this.name);
        }
        return this;
    },
    setName:function(name){
        this.name = name;
        return this;
    }
}
$('id').setName('xesam').getName(function(name){
    console.log(name);
}).show().hide().show().hide().show();
```
## 异步变同步用async
```js
async function a() {
  let a = await b();
  console.log(a);
}

function b() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功')
    }, 1000)
  })
}
a()
```
## promise实现sleep
```js
function sleep(times){
let p1= new Promise ((resolve,reject)=>{
setTimeout(()=>{
// console.log('1')
resolve( '1' )
},times* 1000 )
})
return p1
}
```
## 一个并发request函数, 能够控制并发数量, 并在调用cancel的时候可以取消所有请求, 使用fetch发送
```js
function request(urls, limit, done) {
      const pool = [];
      for (let i = 0; i < Math.min(urls.length, limit); i++) {
        pool.push(run(urls.shift()));
      }

      function run(url) {
        return start(url).then(() => {
          console.log("当前并发数:", pool.length);
          if (urls.length === 0) {
            console.log("并发请求已全部发起");
            return Promise.resolve();
          }
          return run(urls.shift());
        });
      }

      Promise.all(pool).then(() => {
        console.log("请求已经全部结束")
      })
    }

    function start(url) {
      // 获取AbortController实例
      const controller = new AbortController();
      // 获取 signal属性
      const signal = controller.signal;
      const promise = new Promise((resolve, reject) => {
        fetch(url, { method: "get", signal }).then(res => {
          return res.json()
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
      promise.cancel = () => controller.abort();
      return promise;
    }

    request([1, 2, 3, 4, 5, 6, 7, 8], 3)
```
## 利用promise请求失败重试(retry)
在fetch中写请求逻辑，成功了就Resolve,失败了就Reject。然后times次过后还不行就Catch。
```js
const retry = (fetchFn, times) => {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        const ret = await fetchFn();
        resolve(ret);
        break;
      } catch (err) {
        if (!times) reject(err)
      }
    }
  })
}


let fetchPromise = () => {
  return new Promise((resolve, reject) => {
    fetch('url').then(res => {
      return res.json()
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// const fetch = () => {
// const n = Math.random();
// return new Promise((resolve, reject) => {
//     if (n > 0.1) {
//         reject(1);
//     } else {
//         resolve('666')
//     }
// })
retry(fetchPromise, 5).then((e) => {
  console.log('resolve ' + e)
}).catch(e => {
  console.log('reject ' + e)
});
```
## Promise实现fetch，超过3秒钟请求未返回则认为超时
实现一个函数，通过fetch请求一个接口'/api/getdata'(可能成功，也可能失败)，超过3秒钟请求未返回则认为超时，
要求：使用console.log()打印‘成功’，‘失败’，‘超时’3种结果中的一种
 
1，不管3秒后请求返回的成功还是失败，均只打印超时
 
2. 3秒内请求返回成功（或者失败）只打印‘成功’（或失败），不打印超时
```js
let functionTime = (time) => {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      reject('请求超时')
    }, time);
  })
}
let fetchPromise = ()=>{
  return new Promise((resolve, reject) => {
    fetch(url).then(res=> {
      return res.json()
    }).then(res=> {
      resolve(res)
    }).catch(err=> {
      reject(err)
    })
  })
}
Promise.race([functionTime(3000), fetchPromise('/api/getData')]).then(res=> {
  console.log('成功----->', res)
}).catch(err=> {
  console.log('失败----->', err)
})
```
## 实现const
```js
function myConst (key, val) {
    window.key = val
    Object.defineProperty(window,key, {
        enumerable:false,
        configurable: false,
        get: ()=>{
            return val
        },
        set: (value)=>{
            if(value != val){
                throw new TypeError('不能重复定义')
            }else{
                return val
            }
        }
    })
}
myConst('a',2)
console.log(a)   // 2
a = 10           // Uncaught TypeError: 不能重复定义
```
## XMLHttpRequest取消请求
用XMLHttpRequest发出请求，使用abort()会中止请求，readyState会变为XMLHttpRequest.UNSENT，并且status状态码会变成为0
```js
const xhr = new XMLHttpRequest(),
    method = "GET",
    url = "/user/12345";

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.UNSENT) {
    if (status === 0) {
			// 请求被取消
    }
  } else if(xhr.readyState === XMLHttpRequest.DONE) {
    var status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // 请求成功
      console.log(xhr.responseText);
    } else {
      // 处理错误
    }
  } else if 
};
xhr.send();

setTimeout(() => {
  // 手动取消请求
  xhr.abort();
}, 1000)

```
## 取消fetch请求
在fetch请求中，需要使用创建一个新的AbortController对象，来取消请求，这个对象中有一个signal属性，将signal传入fetch请求的配置中，然后我们使用AbortController的abort方法可取消此次请求。
```js
const controller = new AbortController();
const { signal } = controller;

fetch("/user/12345", { signal }).then(response => {
    console.log('请求成功');
}).catch(err => {
  if(err.name === "AbortError") {
		// 请求被手动取消
	} else {
    // 处理错误
  }
});

setTimeout(() => {
  // 手动取消请求
  controller.abort();
}, 1000)

```
## 取消axios请求
```js
// 引用CancelToken
const CancelToken = axios.CancelToken;
// 调用CancelToken.source得到一个source实例，此实例包含token和cancel两个属性
const source = CancelToken.source();
// 请求接口时附带cancelToken:source.token,get与post有所区别，具体查看官方文档
axios.get('api/request', { cancelToken: source.token })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      alert(`Request canceled.${thrown.message}`);
    }
  });
// 通过source.cancel取消请求
source.cancel('Operation canceled by the user.');

```
## 实现request(封装axios)
```js
import axios from 'axios'
import vuex from '../store/index'

// 该项目所有请求均为 get请求
export function request(url, params) {
    // 请求超过30秒则判定为超时
    const instance = axios.create({
        baseURL: '/api',
        timeout: 30000,
        withCredentials: true,
    });

    // axios拦截器
    // 请求拦截
    instance.interceptors.request.use(config => {
        // console.log('请求拦截器');
        return config
    }, err => {
        console.log(err);
    });

    // 响应拦截
    instance.interceptors.response.use(config => {
        return config;
    }, err => {
        console.log([err]);
        if (err.response.data.msg == '需要登录') {
            // cookie过期 退出登录
            // console.log(window.localStorage.getItem("userInfo"));
            // window.localStorage.setItem("userInfo", "");
            // 刷新页面
            // history.go(0)
            // 修改当前的登录状态
            vuex.state.isLogin = false;
        } else {
            console.log(err.response.data.msg);
        }
    });

    instance.defaults.withCredentials = true;

    if (params) {
        params = {
            params: params
        }
        return instance.get(url, params)
    } else {
        return instance.get(url)
    }
}
```
## 用setTimeOut实现setIntervel
```js
function mySetInterval(fn, delay) {
  function inner(params) {
    setTimeout(inner, delay);
    fn();
  }
  setTimeout(inner, delay);
}
// function mySetInterval(fn, delay) {
//   (function inner(fn, delay) {
//     let timer = setTimeout(() => {
//       fn();
//       clearInterval(timer);
//       inner();
//     }, delay);
//   })()
// }
```
## 用setIntervel实现setTimeOut
```js
function mySetTimeout(fn, delay) {
  let timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, delay);
}
```
## Promise并行执行（不用Promise.all）
```js
/**
 * 此问题目的为了解决类似http请求的并发量过大导致内存可能溢出的问题。
 */
function concurrentPoll() {
  this.tasks = []; // 任务队列
  this.max = 10; // 最大并发数
  // 函数主体执行完后立即执行，由于setTimeout是macrotask（宏任务），promise是microtask（微任务）
  // 所以，addTask方法添加的函数会优先执行
  setTimeout(() => {
    this.run()
  }, 0)
}

concurrentPoll.prototype.addTask = function (task) { // 原型添加任务方法
  this.tasks.push(task)
}
concurrentPoll.prototype.run = function () { // 原型任务运行方法
  if (this.tasks.length == 0) { // 判断是否还有任务
    return
  }
  const min = Math.min(this.tasks.length, this.max); // 取任务个数与最大并发数最小值
  for (let i = 0; i < min; i++) {
    this.max--; // 执行最大并发递减
    const task = this.tasks.shift(); // 从数组头部取任务
    task().then((res) => { // 重：此时可理解为，当for循环执行完毕后异步请求执行回调,此时max变为0
      console.log(res)
    }).catch((err) => {
      console.log(err)
    }).finally(() => { // 重：当所有请求完成并返回结果后，执行finally回调，此回调将按照for循环依次执行，此时max为0.
      this.max++; // 超过最大并发10以后的任务将按照任务顺序依次执行。此处可理解为递归操作。
      this.run();
    })
  }
}
const poll = new concurrentPoll(); // 实例
for (let i = 0; i < 13; i++) { // 数据模拟
  poll.addTask(function () {
    return new Promise(
      function (resolve, reject) {
        // 一段耗时的异步操作
        resolve(i + '成功') // 数据处理完成
        // reject('失败') // 数据处理出错
      }
    )
  })
}

```
## Promise串行执行
```js
let arr = [
  new Promise(res => {
    setTimeout(() => {
      res(1)
    }, 1000)

  }),
  new Promise(res => {
    setTimeout(() => {
      res(2)
    }, 1000)

  }),
  new Promise(res => {
    setTimeout(() => {
      res(3)
    }, 1000)

  })]

function iteratorPromise(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].then(num => {
      console.log(num);
      return arr[i + 1];
    })
  }
}

iteratorPromise(arr);
```
```js
let arr1 = [() => {
  return new Promise(res => {
    setTimeout(() => {
      console.log("run", 1);
      res()
    }, 1000)
  })
}, () => {
  return new Promise(res => {
    setTimeout(() => {
      console.log("run", 2);
      res()
    }, 1000)

  })
}, () => {
  return new Promise(res => {
    setTimeout(() => {
      console.log("run", 3);
      res()
    }, 1000)

  })
}]

function iteratorPromise1(arr) {
  let res = Promise.resolve();
  arr.forEach(element => {
    res = res.then(() => element());
  });
}

iteratorPromise1(arr1);


// function iteratorPromise2(arr) {
//   arr.forEach(async element => await element());
// }
// iteratorPromise2(arr1);
```
```js
// 实现 `chainPromise` 函数
// 请在不使用 `async` / `await` 语法的前提下完成
// 完成promise的串行执行

function getPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(Math.random() > 0.5 ? resolve : reject, time, time);
  });
}

function chainPromise(arr) {
  let res = [];
  return new Promise((resolve, reject) => {
    arr
      .reduce((pre, cur) => {
        return getPromise(pre)
          .then((result) => {
            res.push(result);
            return getPromise(cur);
          })
          .catch((err) => {
            res.push(err);
            return getPromise(cur);
          });
      })
      .then((result) => {
        res.push(result);
      })
      .catch((err) => {
        res.push(err);
      })
      .finally(() => {
        resolve(res);
      });
  });
}

let time = [2000, 4000, 3000, 1000];
let res = chainPromise(time);
//等待10s后输出结果
res.then(console.log);
```
## 部门分级关系(数组转换树)
```js
let list = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 2, name: "部门B", parentId: 0 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 1 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 16, name: "部门L", parentId: 3 },
  { id: 7, name: "部门G", parentId: 2 },
  { id: 8, name: "部门H", parentId: 4 },
];
 
const result = convert(list);
console.log(result);
// 转换后的结果如下
 
// let result = [
//   {
//     id: 1,
//
//     name: "部门A",
//
//     parentId: 0,
//
//     children: [
//       {
//         id: 3,
//
//         name: "部门C",
//
//         parentId: 1,
//
//         children: [
//           {
//             id: 6,
//
//             name: "部门F",
//
//             parentId: 3,
//           },
//           {
//             id: 16,
//
//             name: "部门L",
//
//             parentId: 3,
//           },
//         ],
//       },
//
//       {
//         id: 4,
//
//         name: "部门D",
//
//         parentId: 1,
//
//         children: [
//           {
//             id: 8,
//
//             name: "部门H",
//
//             parentId: 4,
//           },
//         ],
//       },
//     ],
//   },
// ];
 
```
```js
function convert(list, id = 0) {
  let res = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId === id) {
      res.push(list[i]);
      list[i].children = convert(list, list[i].id);
    }
  }
  return res;
}
```
## 查找数组中，符合 where 条件的数据，并根据 orderBy 指定的条件进行排序
```js
const data = [
  { userId: 8, title: "title1" },
  { userId: 11, title: "other" },
  { userId: 15, title: null },
  { userId: 19, title: "title2" },
];

const result = find(data)
  .where({
    title: /\d$/, // 这里意思是过滤出数组中，满足title字段中符合正则 /\d$/ 的项
  })
  .orderBy("userId", "desc"); // 这里的意思是对数组中的项按照 userId 进行倒序排列
 
console.log(result.value); // 返回 [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
```
```js
作者：打咩
链接：https://www.nowcoder.com/discuss/921867?source_id=profile_create_nctrack&channel=-1
来源：牛客网

function find(data) {
  return {
    where(condition) {
      this.value = data.filter((item) => {
        for (let key of Object.keys(condition)) {
          if (condition[key].test(item[key])) return item;
        }
      });
 
      return this;
    },
 
    orderBy(key, order) {
      if (order === "desc" || order === "asc")
        this.value.sort((a, b) =>
          order === "asc" ? a[key] - b[key] : b[key] - a[key]
        );
 
      return this;
    },
 
    value: data,
  };
}
```
## 对象深度比对的题目
```js
function isObject(obj) {
 return typeof obj === 'object' && null !== obj
}

function compare(obj1, obj2) {
 // 1.判断是不是引用类型，不是引用
 if (!isObject(obj1) || !isObject(obj2)) {
  return obj1 === obj2
 }
 // 2.比较是否为同一个内存地址
 if (obj1 === obj2) return true
 // 3.比较 key 的数量
 const obj1KeysLength = Object.keys(obj1).length
 const obj2KeysLength = Object.keys(obj2).length
 if (obj1KeysLength !== obj2KeysLength) return false
 // 4.比较 value 的值
 for (let key in obj1) {
  const result = compare(obj1[key], obj2[key])
  if (!result) return false
 }
 return true
}
```
## 正则实现数字千分位表示（字符串格式化，每3个加逗号）
```js
let num = "12345678"; 
let reg = /(?!^)(?=(\d{3})+$)/g; 
console.log(num.replace(reg, ",")); 
```
```js
function format(s) {
  let res = "", k = 0
  for (let i = s.length - 1; i >= 0; i--) {
    res = s[i] + res
    k++
    if (k == 3) {
      res = "," + res
      k = 0
    }
  }
  return res[0] == ',' ? res.slice(1) : res;
}
console.log(format("23456789"))
// 显示效果： "23,456,789"
```
## 输出一个数组，数组里面是n个随机且不重复的整数
写一个函数fn，输入一个n（整数类型），输出一个数组，数组里面是n个随机且不重复的整数，范围在 [2,32]
```js
function fn(n) {
  if (n > 31) return null
  let set = new Set()
  while (set.size < n) {
    let temp = Math.floor(Math.random() * 31 + 2)//Math.random(),0-1(包含0但是不包含1)的随机数
    if (!set.has(temp)) set.add(temp)
  }
  return [...set]
}
```
## js点击按钮返回页面顶部
```html
<div id="app" class="container">
  我是主页
</div>
<button id="btn">回到顶部</button>
```
```js
window.onload = function () {
  var btn = document.getElementById('btn');
  var timer = null;
  var isTop = true;
  //获取页面可视区高度
  var clientHeight = document.documentElement.clientHeight;
  //滚动条滚动时触发
  window.onscroll = function () {
    //显示回到顶部按钮
    // var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    // if (osTop >= clientHeight) {
    // 	btn.style.display = "block";
    // } else {
    // 	btn.style.display = "none";
    // };
    //回到顶部过程中用户滚动滚动条，停止定时器
    if (!isTop) {
      clearInterval(timer);
    };
    isTop = false;
  };
  btn.onclick = function () {
    //设置定时器
    timer = setInterval(function () {
      //获取滚动条距离顶部高度
      var osTop = document.documentElement.scrollTop || document.body.scrollTop;
      var ispeed = -20;
      document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
      //到达顶部，清除定时器
      if (osTop == 0) {
        clearInterval(timer);
      };
      isTop = true;
    }, 100);
  };
  // btn.onclick = function () {
  //   var height = document.documentElement.scrollTop || document.body.scrollTop;
  //   var t = setInterval(() => {
  //     height -= 50;
  //     if (height > 0) {
  //       window.scrollTo(0, height);
  //     } else {
  //       window.scrollTo(0, 0);
  //       clearInterval(t);
  //     }
  //   }, 10);
};
```
## 大数相加
```js
function add(a, b) {
  a = '' + a, b = '' + b;
  let maxLen = Math.max(a.length, b.length);
  //补0
  a = a.padStart(maxLen, 0); 
  b = b.padStart(maxLen, 0); 
  let sum = 0, curry = 0, res = '';
  for (let i = maxLen - 1; i >= 0; i--) {
    sum = parseInt(a[i]) + parseInt(b[i]) + curry;
    curry = Math.floor(sum / 10);
    res = sum % 10 + res;
  }
  if (curry === 1) {
    res = '1' + res;
  }
  return res;
}
```
## AST
```js
//简单函数
function square(n) {
  return n * n;
}
//转换成AST
{
  type: "FunctionDeclaration",
    id: {
    type: "Identifier",
      name: "square"
  },
  params: [
    {
      type: "Identifier",
      name: "n"
    }
  ],
  ...
}
```
```js
//词法分析，读取代码按规则合并成标识tokens,移除空白符，注释，最后分割进一个tokens列表（一维数组）
const a = 5;
//转换成
[{value: 'const', type: 'keyword'}, {value: 'a', type: 'identifier'},...]
//再进行语法分析，将数组转换成树的形式同时验证语法是否有错误。
```
## 24. 两两交换链表中的节点
```js
var swapPairs = function (head) {
  if (head == null || head.next == null)
    return head;
  let newhead = head.next;
  head.next = swapPairs(newhead.next);
  newhead.next = head;
  return newhead;
};
```
## 迭代递归实现二分查找
```js
//迭代
function search(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((right + left) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    }
    else if (arr[mid] > target) {
      right = mid - 1;
    }
    else {
      return mid;
    }
  }
  return -1;
}
```
```js
//递归
function search(arr, target, left, right) {
  if (left >= right) {
    return arr[left] === target ? left : -1;
  }
  let mid = Math.floor((right + left) / 2);
  if (arr[mid] < target) {
    return search(arr, target, mid + 1, right);
  }
  else if (arr[mid] > target) {
    return search(arr, target, left, mid - 1);
  }
  else {
    return mid;
  }
}
```
## 盒子跟着鼠标移动(拖动div)
鼠标按下，在鼠标移动过程中，盒子跟着一起移动，鼠标松开，盒子停止移动
```css
#box{
  width: 200px;
  height: 200px;
  position: absolute;
  background-color: seagreen;
}
```
```js
 <div id="div1"></div>
  <script src="drag.js"></script>
  <script>
    window.onload = function () {
      var div1 = document.getElementById("div1");
      div1.onmousedown = function (ev) {
        var oevent = ev || event;
        // 鼠标离盒子边框的距离 当前鼠标离浏览器左上角的距离 - 当前盒子里浏览器左上角的距离
        var distanceX = oevent.clientX - div1.offsetLeft;//或者oevent.offsetX
        var distanceY = oevent.clientY - div1.offsetTop;//或者oevent.offsetY

        document.onmousemove = function (ev) {
          var oevent = ev || event;
          // 当前鼠标的距离 - 离盒子边框的距离
          div1.style.left = oevent.clientX - distanceX + 'px';
          div1.style.top = oevent.clientY - distanceY + 'px';

          // 点击之后获取当前窗口的宽高
          // var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
          // var windowHeight = document.documentElement.clientHeight || ocument.body.clientHeight;
          // if (oevent.clientY + 20 >= windowHeight || oevent.clientX + 20 >= windowWidth || oevent.clientY <= 0 || oevent.clientX <= 0) {
          //   document.onmousemove = null;
          // }
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  </script>
```
## 工厂模式
```js
function factory(name, age) {
  var user = new Object();
  user.name = name;
  user.age = age;
  user.getIntro = function () {
    return this.name + '\' s age is ' + this.age;
  }
  return user;
}
var xm = factory('xiao ming', 20);
console.log(xm.getIntro())
```
## 单例模式
单例模式的定义是:保证一个类仅有一个实例，并提供一个访问它的全局访问点。
（1）单例类的职责过重，里面的代码可能会过于复杂，在一定程度上违背了“单职责原则”。

（2）如果实例化的对象长时间不利用，系统会认为它是垃圾而进行回收，这将导致对象状态的丢失。
```js
class People {
    constructor(name) {
        if (typeof People.instance === 'object') {
            return People.instance;
        }
        People.instance = this;
        this.name = name
        return this;
    }
}
var a = new People('a')
var b = new People('b')
console.log(a===b)//true
```
## 最长公共子串
1、把两个字符串分别以行和列组成一个二维矩阵。

2、比较二维矩阵中每个点对应行列字符中否相等，相等的话值设置为1，否则设置为0。

3、通过查找出值为1的最长对角线就能找到最长公共子串。

为了进一步优化算法的效率，我们可以再计算某个二维矩阵的值的时候顺便计算出来当前最长的公共子串的长度，即某个二维矩阵元素的值由record[i][j]=1演变为record[i][j]=1 +record[i-1][j-1]，这样就避免了后续查找对角线长度的操作了
```js
function fn(s, t) {
  if (s == null || t == null) {
    return 0;
  }
  let res = 0;
  let m = s.length, n = t.length;
  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s.charAt(i - 1) == t.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        res = Math.max(dp[i][j], res);
      }
    }
  }
  return res;
}
```
## 剑指 Offer II 095. 最长公共子序列
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
```js
var longestCommonSubsequence = function(text1, text2) {
    let m = text1.length, n = text2.length;
    let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(text1.charAt(i-1) == text2.charAt(j-1)){
                dp[i][j] = dp[i-1][j-1] + 1;
            }else{
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
            }
        }
    }
    return dp[m][n];
};
```
## 165. 比较版本号
给你两个版本号 version1 和 version2 ，请你比较它们。

版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33 和 0.1 都是有效的版本号。

比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。

返回规则如下：

如果 version1 > version2 返回 1，
如果 version1 < version2 返回 -1，
除此之外返回 0。
```js
var compareVersion = function(version1, version2) {
    let a1 = version1.split(".");
    let a2 = version2.split(".");
    let i = 0;
    let result = 0;
    while(i < a1.length || i < a2.length) {
        a1[i] = a1[i] ? a1[i]/1 : 0;
        a2[i] = a2[i] ? a2[i]/1 : 0;
        if(a1[i] > a2[i]) {
            result = 1;
            break;
        } else if(a1[i] < a2[i]) {
            result = -1;
            break;
        }
        i++;
    }
    return result;
};
```
## n个数数组中选m个数的组合
对于f(n,m)，我们从数组中任意取一个元素，然后再从剩下的n-1个元素中取m-1个元素，既f(n-1,m-1)；
重复第2步，直到f(n-m+1,1)，即从n-m+1个元素中取出最后一个元素；
把有效的组合压栈，并在压栈前判断该组合在栈中是否存在，避免由于数组元素的重复而导致组合重复
```js
var result = new Array();
function getComb(myarr, n, m, rs) {
  if (rs == null)
    rs = new Array();
  for (var i = n; i >= m; i--) {
    rs[m - 1] = myarr[i - 1];      //取出第n个元素作为组合的第一个元素  
    if (m > 1)
      getComb(myarr, i - 1, m - 1, rs);  //递归，在n-1个元素中取m-1个元素,直到取出最后一个元素  
    var comb = rs.join("");     //获得一个组合  
    if (!checkExist(result, comb))
      result.push(comb);
  }
  return result;
}

//查找某元素是否存在数组中,存在返回true,不存在返回false  
function checkExist(myarr, e) {
  for (var i = 0; i < myarr.length; i++)
    if (e == myarr[i]) return true;
  return false;
}

console.log(getComb([1, 2, 3, 4], 4, 3));
```
## 多叉树寻找目标值，输出路径(children)
给一个由多叉树组成的森林，实现一个search函数，参数是要搜索的一系列值，返回每个从根节点开始到搜索目标值的遍历路径构成的子树，保证每个节点的值不重复
```js
let root = {
  value: 0,
  childrens: [
    {
      value: 1,
      childrens: [
        {
          value: 2,
          childrens: null
        },
        {
          value: 3,
          childrens: null
        },
        {
          value: 4,
          childrens: [
            {
              value: 5,
              childrens: null
            },
            {
              value: 6,
              childrens: null
            }
          ]
        },
      ]
    },
    {
      value: 7,
      childrens: [
        {
          value: 8,
          childrens: null
        },
        {
          value: 9,
          childrens: null
        }
      ]
    }
  ]
}

function fn(root, arr) {
  let result = [];
  for (let item of arr) {
    let ans = [], res = [];
    recur(ans, res, root, item);
    result.push(ans)
  }
  return result;
}

function recur(ans, res, root, target) {
  if (root == null) return;
  res.push(root.value);

  if (root.value === target) {
    ans.push(Array.from(res));
  }

  let children = root.childrens;
  if (children) {
    let len = children.length;
    for (let i = 0; i < len; i++) {
      recur(ans, res, children[i], target);
      res.splice(res.length - 1, 1)
    }
  }
}

console.log(fn(root, [2, 5, 7, 9]))
```
## 原生js点击ul下边li显示其索引值
第一种
```js
<ul id = "list">
    <li>click</li>
    <li>click</li>
    <li>click</li>
    <li>click</li>
    <li>click</li>
</ul>
var list = document.getElementsByTagName("li");
for(var i = 0; i < list.length; i++) {
  list[i].index = i;
  list[i].onclick = function() {
    console.log(this.index);
  }
}
```
第二种闭包
```js
var list = document.getElementsByTagName('li');
for (var i = 0; i < list.length; i++) {
  (function(j){
      list[j].addEventListener("click", function(e) {
          alert(j)
      }, false);
  })(i);
}
```
## localstorage实现带过期时间的缓存功能
localstorage支持以下方法
保存数据：localStorage.setItem(key,value);
读取数据：localStorage.getItem(key);
删除单个数据：localStorage.removeItem(key);
删除所有数据：localStorage.clear();
得到某个索引的key：localStorage.key(index);  

需要注意的是，仅支持String类型数据的读取，如果存放的是数值类型，读出来的是字符串类型的，对于存储对象类型的，需要在保存之前JSON化为String类型。

对于缓存，我们一般有以下方法
set(key,value,expiredTime);
get(key);
remove(key);
expired(key,expiredTime);
clear();

:::tip
设置缓存
:::
对于过期时间的实现，除了用于存放原始值的缓存(key)，这里添加了两个缓存(key+EXPIRED:TIME)和(key+EXPIRED:START:TIME)，一个用于存放过期时间，一个用于存放缓存设置时的时间。

当读取的时候比较 （过期时间+设置缓存的时间）和当前的时间做对比。如果（过期时间+设置缓存时的时间）大于当前的时间，则说明缓存没过期。

注意这里使用JSON.stringify对存入的对象JSON化。读取的时候也要转回原始对象。
```js
"key":{
    //辅助
    "expiredTime": "EXPIRED:TIME",
    "expiredStartTime": "EXPIRED:START:TIME",
    //全局使用
    //用户信息
    "loginUserInfo": "USER:INFO",
    //搜索字段
    "searchString": "SEARCH:STRING",
  },
  /**
   * 设置缓存
   * @param key
   * @param value
   * @param expiredTimeMS 过期时间，单位ms
   */
  "set":function (key,value,expiredTimeMS) {
    if((expiredTimeMS == 0 ) || (expiredTimeMS == null)){
      localStorage.setItem(key,value);
    }
    else {
      localStorage.setItem(key,JSON.stringify(value));
      localStorage.setItem(key+cache.key.expiredTime,expiredTimeMS);
      localStorage.setItem(key+cache.key.expiredStartTime,new Date().getTime());
    }
  },
```
:::tip
 读取缓存
:::
由于读取出来的是时间信息是字符串，需要将其转化为数字再进行比较。
```js
/**
   * 获取键
   * @param key
   * @returns {*} key存在，返回对象；不存在，返回null
   */
  "get":function (key) {
    var expiredTimeMS = localStorage.getItem(key+cache.key.expiredTime);
    var expiredStartTime = localStorage.getItem(key+cache.key.expiredStartTime);
    var curTime = new Date().getTime();
    var sum = Number(expiredStartTime) + Number(expiredTimeMS);
    if((sum) > curTime){
      console.log("cache-缓存["+key+"]存在！");
      return JSON.parse(localStorage.getItem(key));
    }
    else {
      console.log("cache-缓存["+key+"]不存在！");
      return null;
    }
  },
```
:::tip
移除缓存
:::
移除缓存时需要把三个键同时移除。
```js
/**
   * 移除键
   * @param key
   */
  "remove":function (key) {
    localStorage.removeItem(key);
    localStorage.removeItem(key+cache.key.expiredTime);
    localStorage.removeItem(key+cache.key.expiredStartTime);
  },
```
:::tip
其他代码
:::
```js
/**
   * 对键重新更新过期时间
   * @param key
   * @param expiredTimeMS 过期时间ms
   */
  "expired":function (key,expiredTimeMS) {

    if(cache.get(key)!=null){
      localStorage.setItem(key+cache.key.expiredTime,expiredTimeMS);
    }

  },
  /**
   * 清除所有缓存
   */
  "clear":function () {
    localStorage.clear();
  }
```
## 手写trim函数
```js
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*)$/g, '')
}
console.log('    adv    '.trim())

String.prototype.trimLeft = function () {
    let str = this;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) !== ' ') {
            return str.substring(i, str.length)
        }
    }
}
console.log('    adv    '.trimLeft())

String.prototype.trimRight = function () {
    let str = this,index = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) !== ' ') {
            index = i
        }
    }
    return str.substring(0, index + 1)
}
console.log('    adv    '.trimRight())
```
## 写一个让图片无限旋转的操作
使用 -webkit-animation 和 @-webkit-keyframes 组合使用来完成。

-webkit-animation 是一个复合属性，
name: 是 @-webkit-keyframes 中需要指定的方法，用来执行动画。
duration: 动画一个周期执行的时长。
timing-function: 动画执行的效果，可以是线性的，也可以是"快速进入慢速出来"等。
delay: 动画延时执行的时长。
iteration_count: 动画循环执行次数，如果是infinite，则无限执行。
direction: 动画执行方向。

@-webkit-keyframes 中的from和to 两个属性，就是指定动画执行的初始值和结束值。
```css
.img{
  animation: rotation 3s linear infinite;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
```