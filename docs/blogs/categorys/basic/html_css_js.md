---
title: 前端基础之HTML、CSS、JS
date: 2021-11-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - HTML
  - CSS
  - JS
  - 基础概念
  - 前端
  - 面试
---

:::tip
这是一些学习前端的基础面试题
:::

![](/basic01.png)
![](/basic02.png)
![](/basic03.png)
![](/basic04.png)
![](/basic05.png)
![](/basic06.png)
![](/basic07.png)
![](/basic08.png)
![](/basic09.png)
![](/basic10.png)
![](/basic11.png)
![](/basic12.png)
![](/basic13.png)
![](/basic14.png)
![](/basic15.png)
![](/basic16.png)
## todolist
```html
<style>
    body {
      margin: 0;
      padding: 0;
    }

    * {
      box-sizing: border-box;
    }

    .myhead {
      background-color: lightpink;
      text-align: center;
      padding: 5px 0px 10px 0px;
      color: aliceblue;
    }

    table {
      margin: 0 auto;
    }

    #things {
      width: 180px;
      height: 30px;
      border-radius: 3px;
      outline: none;
      border: solid 1px white;
    }

    #add {
      display: inline-block;
      width: 80px;
      height: 30px;
      background-color: gainsboro;
      color: grey;
      border-radius: 3px;
      line-height: 30px;
    }

    #add:hover {
      cursor: pointer;
      background-color: darkgrey;
      color: grey;
    }

    ul {
      margin: 0px;
      padding: 0px;
    }

    ul li {
      list-style: none;
      /*text-align: center;*/
      position: relative;
      padding-left: 40px;
      height: 40px;
      line-height: 40px;
    }

    ul li:nth-child(odd) {
      background-color: #f9f9f9;
    }

    ul li:hover {
      cursor: pointer;
      background-color: #dddddd;
    }

    ul li.check {
      background-color: #888888;
      text-decoration: line-through;
      color: #f9f9f9;
    }

    ul li.check::before {

      content: '';
      position: absolute;
      border-color: #fff;
      border-style: solid;
      border-width: 0 2px 2px 0;
      top: 10px;
      left: 16px;

      transform: rotate(45deg);
      height: 15px;
      width: 7px;
    }

    .close {
      position: absolute;
      right: 0px;
      top: 0px;
      padding: 0px 20px;
      font-size: 16px;
    }

    .close:hover {
      background-color: #f44336;
      color: white;
    }
  </style>
</head>

<body>
  <div class="myhead">
    <h2>My ToDo List</h2>
    <table>
      <tr>
        <td><input type="text" placeholder="请输入待办事项..." id="things"></td>
        <td> <span id="add" onclick="addElement()">add</span></td>
      </tr>
    </table>
  </div>
  <ul></ul>

  <div class="test2"></div>
  <script>
    //1.在每个span后面添加close节点
    var myNodelist = document.getElementsByTagName("li")
    for (var i = 0; i < myNodelist.length; i++) {
      var span = document.createElement("span");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      myNodelist[i].appendChild(span);
    }

    //2.处理删除事件
    var close = document.getElementsByClassName("close")
    for (var i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        //parentElement表示返回当前节点的父元素节点
        var div = this.parentElement
        div.style.display = "none"
      }
    }

    //3.处理任务完成事件
    var list = document.querySelector("ul")
    console.log(list)
    list.addEventListener('click', function (ev) {
      //event.target属性可以用来实现事件委托，例如将事件绑定在ul上，但是点击li时可以被触发
      //tagName是获取元素的标签名
      if (ev.target.tagName === 'LI') {
        //toggle方法在被选元素上进行hide（）和show（）之间的切换
        //classList对元素的class继续操作
        ev.target.classList.toggle('check')
      }
    }, false);

    //4.处理点击add按钮，列表中添加一个待办事项

    function addElement() {
      var things = document.getElementById('things').value
      // alert(localStorage.setItem("mutodolist",JSON.stringify(things)))
      var li = document.createElement('li')
      var t = document.createTextNode(things)
      if (things == '') {
        alert("请输入待办事件")
      }
      else {
        list.appendChild(li)
        li.appendChild(t)
      }
      var span = document.createElement('span')
      var txt = document.createTextNode('\u00D7')
      span.className = 'close'
      span.appendChild(txt)
      li.appendChild(span)
      for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
          var div = this.parentElement
          div.style.display = "none"
        }
      }
    }
  </script>
</body>
```
## css实现横向滚动条
```html
 <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
    }

    body {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    ul {
      width: 100%;
      height: 200px;
      /* 重点!!!!!!!!!!!!!!!!! */
      overflow-x: scroll;
      overflow-y: hidden;
      list-style-type: none;
      display: flex;
    }

    li {
      width: 200px;
      height: 100%;
      flex: none;
      /* 重点 */
      border: 1px solid blue;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    li:nth-child(n + 2) {
      margin-left: 20px;
    }
  </style>
</head>

<body>

  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
  </ul>
</body>
```
## 树形组件(递归)
```vue
// tree.vue
<template>
 <div class="tree-alone">
 <tree-menu :label="tree.label" :nodes="tree.nodes"></tree-menu>
 </div>
</template>
<script>
 import TreeMenu from './TreeMenu.vue'
 export default {
 name: 'tree',
 data() {
  return {
   tree: {
   id: "01",
   lable: "总层级",
   nodes: [
    {
    id: "02",
    label: "层级1",
    nodes: [{
     label: '层级1-1'
    }]
    },
    {
    id: "03",
    label: "层级2",
    nodes: []
    },
   ]
   };
 }
  }
 },
 components: {
  TreeMenu
 }
 }
</script>
```
```vue
// treemenu.vue
<template>
 <div class="tree-menu">
 <div :style="indent" @click="toggleChildren">{{label}}</div>
 <div v-if="showChildren">
  <tree-menu
  v-for="(item, index) of nodes"
  :key="index"
  :nodes="node.nodes"
  :label="node.label"
  :depth="depth + 1"
  ></tree-menu>
 </div>
 </div>
</template>

<script>
export default {
 name: "TreeMenu",
 props: ["label", "nodes"],
 data() {
 return {
  showChildren: false
 };
 },
 methods: {
 toggleChildren() {
  this.showChildren = !this.showChildren;
 }
 },
 computed: {
 indent() {
  return { transform: `translate(${this.depth * 20}px)` };
 }
 }
};
</script>
```
## 菱形
```html
<style>
  .diamond {
    width: 100px;
    height: 100px;
    background-color: red;
    transform: rotate(45deg);
    margin: 50px auto;
    /*让菱形浏览器上居中*/
  }
</style>

<body>
  <div class="diamond"></div>
</body>
```
```html
<style>
  .one {
    border: 20px solid transparent;
    width: 0;
    border-bottom: 20px solid black;
  }

  .two {
    border: 20px solid transparent;
    width: 0;
    border-top: 20px solid black;
  }
</style>

<body>
  <div class="one"></div>
  <div class="two"> </div>
</body>
```
## 导航栏
```html
<style>
  *,
  body,
  html {
    padding: 0;
    margin: 0;
  }

  /*导航栏样式*/
  .nav {
    width: 100%;
    height: 8vh;
    background: #005ead;
  }

  .nav-left {
    display: inline-block;
    width: 80%;
    /*background: red;*/
    padding-left: 15px;
  }

  .nav-left ul li {
    display: inline-block;
    list-style: none;
    line-height: 8vh;
    padding: 0 5px;
  }

  .nav-left ul li:hover {
    background: #fff;
    color: #FF8929;
  }

  .nav-left ul a {
    text-decoration: none;
    color: #fff;
  }

  .nav-right {
    display: inline-block;
    width: 17%;
    height: 8vh;
    overflow: hidden;
    /*border: 1px solid black;*/
    background-image: url(../img/logo20200324.png);
    background-size: cover;
    margin-top: -5vh;
  }
</style>

<body>
  <div id="nav">
    <div class="nav">
      <div class="nav-left">
        <ul>
          <a href="https://www.baidu.com/">
            <li>百度网</li>
          </a>
          <a href="http://www.gx.xinhuanet.com/">
            <li>新华网</li>
          </a>
          <a href="https://www.baidu.com/">
            <li>百度网</li>
          </a>
          <a href="http://www.gx.xinhuanet.com/">
            <li>新华网</li>
          </a>
        </ul>
      </div>
      <div class="nav-right"></div>
    </div>
  </div>
  <script>
    // 页面加载时加载样式
    window.onload = function () {
    }
  </script>
</body>
```
## 单行文本,多行文本省略（按行数或高度两种情况
```html
<!-- 单行 -->
<style>
p {
    overflow: hidden;/* 隐藏 */
    line-height: 40px;
    width: 400px;
    height: 40px;
    border: 1px solid red;
    text-overflow: ellipsis;/* 省略号 */
    white-space: nowrap;/* 不换行 */
  }
</style>
<body>
<p> 这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本</p>
</body>
```
```html
<!-- 多行 -->
<!-- 基于高度截断 伪元素 + 定位-->
就是通过伪元素绝对定位到行尾并遮住文字，再通过 overflow: hidden 隐藏多余文字

这种实现具有以下优点：
兼容性好，对各大主流浏览器有好的支持
响应式截断，根据不同宽度做出调整
一般文本存在英文的时候，可以设置word-break: break-all使一个单词能够在换行时进行拆分
<style>
.demo {
    position: relative;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }

  .demo::after {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 20px 0 10px;
  }
</style>
 
<body>
  <div class='demo'>这是一段很长的文本</div>
</body>
```
```html
<!-- 多行 -->
<!-- 基于行数截断纯css兼容性不好-->
<style>
p {
  width: 400px;
  border-radius: 1px solid red;
  -webkit-line-clamp: 2;
  /* 限制在一个块元素显示的文本的行数 */
  display: -webkit-box;
  /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<p>
  这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
  这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
</p>

```
```html
<!-- 多行 -->
<!-- 基于行数截断css + js-->
<style>
  #view {
    border: 1px solid red;
    width: 200px;
    height: 70px;
    overflow: auto
  }
</style>
<div id='view'></div>
<script>
  s = '这是一个文本这是一个文本这是一个文本这是一个文本这是一个文本这是一个文本一个文本这是一个文本一个文本'
    el = document.getElementById('view');
    n = el.offsetHeight;
    for (i = 0; i < s.length; i++) {
      el.innerHTML = s.substr(0, i);
      if (n < el.scrollHeight) {
        el.style.overflow = 'hidden';
        el.innerHTML = s.substr(0, i - 3) + '...';
        break;
      }
    }
</script>
```
## 图片无限旋转的操作
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
## js点击ul下边li显示其索引值
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
## 轮播图（自动滑动，点小圆点也滑动）
```html
<div class="box">
  <div class="arrow arrow-left" onclick="prev()"></div>
  <div class="arrow arrow-right" onclick="next()"></div>
  <img id="demo1" src="images/01.jpg">
  <ul class="indexes">
    <li class="active"></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```
```css
* {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .box {
    position: relative;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 100px auto;
  }

  .indexes {
    height: 20px;
    display: flex;
    position: absolute;
    bottom: 10px;
  }

  .indexes li {
    background: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 3px;
  }

  .indexes li.active {
    background: blue;
  }

  .arrow {
    width: 30px;
    height: 50px;
    background: deeppink;
    position: absolute;
  }

  .arrow.arrow-left {
    left: 180px;
  }

  .arrow.arrow-right {
    right: 180px;
  }
```
```js
function next() {
      index++
      if (index === 4) index = 0
      clearInterval(timer)
      setStyle()
      run()
    }
    function prev() {
      index--
      if (index === -1) index = 3
      clearInterval(timer)
      setStyle()
      run()
    }
    let arr = [
      "images/01.jpg",
      "images/01.jpg",
      "images/01.jpg",
      "images/01.jpg"
    ]
    var demo1 = document.getElementById('demo1')
    let indexes = document.getElementsByClassName('indexes')[0].children
    let timer = -1
    for (let i = 0; i < indexes.length; i++) {
      indexes[i].onmouseenter = function () {
        index = i
        clearInterval(timer)
        setStyle()
      }
      indexes[i].onmouseleave = function () {
        run()
      }
    }
    var index = 0
    function run() {
      timer = setInterval(() => {
        index++
        if (index === 4) index = 0
        setStyle()
      }, 3000);
    }
    function setStyle() {
      demo1.src = arr[index]
      let active = document.getElementsByClassName('active')[0]
      active.classList.remove('active')
      indexes[index].classList.add("active")
    }
    run()
```
## 轮播图(鼠标经过小点滑动)
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
## 移动动画效果(盒子移动)
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
## css实现宽度随内容自适应
```html
<div class="parent">
  <div class="children">欢迎来到亿速云，今天阳光不错！</div>
</div>
```
```css
.parent {
  width: 400px;
  height: 400px;
  border: 1px solid red;
}

.children {
  border: 1px solid blue;
  height: 50px;
  display: inline-block;
  /* zoom表示缩放 */
  zoom: 1;
}
```
## 网易云登陆功能
```js
//   手机登录请求
    async loginByCellphone() {
      let timestamp = Date.parse(new Date());
      let result = await this.$request("/login/cellphone", {
        phone: this.loginForm.phoneNum,
        password: this.loginForm.password,
        withCredentials: true,
        timestamp,
      });
      // console.log(result);
      // 登录成功
      if (result.data.code == 200) {
        // 将请求到的用户id存入localstorage
        // 在index.vue 和 bottomControl.vue中用到过
        window.localStorage.setItem("userId", result.data.profile.userId);
        // this.userInfo = result.data.profile;
        // 将userInfo传回父组件
        this.$emit("getUserInfo", result.data.profile);

        this.$message.success("登录成功!");
        // 刷新页面
        // this.$router.go(0);
        // 修改vuex中的登录状态
        this.$store.commit("updataLoginState", true);
        // this.$store.commit("updateCurrentUserId", result.data.profile.userId);
      } else if (result.data.code == 400) {
        // 手机号错误
        this.$message.error("手机号错误!");
        return;
      } else if (result.data.code == 502) {
        // 密码错误
        this.$message.error("密码错误!");
        return;
      } else {
        // 登录失败，请稍后重试
        this.$message.error("登录失败，请稍后重试!");
        return;
      }

      // 清空输入框的内容
      this.loginForm.password = "";
      this.loginForm.phoneNum = "";
    },
  },
};
```
## 实现5分钟倒计时
```html
<div id="time">5:00</div>
```
```js
window.onload = function () {
  let left = 5 * 60;
  let time = document.getElementById("time");
  function fun() {
    left--;
    let min = parseInt(left / 60);
    let second = parseInt(left % 60);
    time.innerHTML = min + ":" + second;
  }
  fun();
  setInterval(fun, 1000);
}
```
## 实现三列布局
```html
<div class="mian">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
```
```css
.main {
  display: flex;
}

.left {
  width: 300px;
}

.center {
  flex: 1;
}

.right {
  width: 300px;
}
```
## float实现三列布局，中间自适应
```html
<div class="mian">
  <div class="left"></div>
  <div class="right"></div>
  <!-- 注意 -->
  <div class="center"></div>
</div>
```
```css
.main {
  height: 300px;
}

.left {
  float: left;
  width: 100px;
}

.center {
  margin-left: 100px;
  margin-right: 100px;
}

.right {
  float: left;
  width: 100px;
}
```
## css实现一个等比缩放的盒子
问题：图片的宽度100%，高度要始终自适应为16:9。

那么外面盒子宽度100%，高度0，但是因为有padding-bottom为9/16的比例，所以外层盒子始终是16:9等比例，再绝对定位设置图片宽高都100%即可。
```html
<div class="scale">
  <img src="" class="item">
</div>
```
```css
.scale {
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  position: relative;
}

.item {
  width: 100%;
  height: 100%;
  position: absolute;
}
```
## 不使用border画出1px高的线，在不同浏览器下都能保持同一效果
```html
<div style="height: 1px; overflow: hidden; background: red"></div>
```
## 画一个边长小于1px的线段或div
```css
.border{
  position: relative;
}

.border:before{
  left: 0;
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  border: 1px solid #9A9A9A;
  transform: scale(0.5, 0.5);
  box-sizing: border-box;
}
```
## 不定宽高的div垂直水平居中
- CSS
```css
*{
  margin: 0;
  padding: 0;
}
.father{
  width: 300px;
  height: 300px;
  background-color: bisque;
  display: table-cell;/*!!!*/
  text-align: center;/*!!!*/
  vertical-align: middle;/*!!!*/
}
.son{
  background-color: chartreuse;
  display: inline-block;/*!!!*/
  vertical-align: middle;/*!!!*/
}
```

- CSS3 + transform
```css
*{
  margin: 0;
  padding: 0;
}
.father{
  position: relative;/*!!!*/
  width: 300px;
  height: 300px;
  background-color: bisque;
}
.son{
  position: absolute;/*!!!*/
  top: 50%;/*!!!*/
  left: 50%;/*!!!*/
  background-color: chartreuse;
  transform: translate(-50%,-50%);
}
```

- flex
```css
*{
  margin: 0;
  padding: 0;
}
.father{
  width: 300px;
  height: 300px;
  background-color: bisque;
  display: flex;/*!!!*/
  text-align: center;/*!!!*/
  align-items: center;/*!!!*/
}
.son{
  background-color: chartreuse;
}
```

## 定宽高的div垂直水平居中
- margin负值
```css
*{
  margin: 0;
  padding: 0;
}
.father{
  position: relative;/*!!!*/
  width: 300px;
  height: 300px;
  background-color: bisque;
}
.son{
  position: absolute;/*!!!*/
  top: 50%;/*!!!*/
  left: 50%;/*!!!*/
  width: 100px;
  height: 100px;
  background-color: chartreuse;
  margin-top: -50px;/*!!!*/
  margin-left: -50px;/*!!!*/
}
```
## 矩形
```css
div{
  width: 100px;
  height: 100px;
  background: chartreuse;
  margin: auto;
}
```

## 圆形
```css
div{
  width: 100px;
  height: 100px;
  background: chartreuse;
  border-radius: 50px;/*!!!*/
  margin: auto;
}
```

## 半圆
```css
div{
  width: 100px;
  height: 50px;/*!!!*/
  background: chartreuse;
  border-radius: 50px 50px 0 0;/*!!!*/
  margin: auto;
}
```

## 三角形
```css
div{
  width: 0;
  height: 0;
  border-bottom: 100px solid purple;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}
```

## 三点骰子
```html
<div class="box">
    <span class="item"></span>
    <span class="item"></span>
    <span class="item"></span>
</div>
```
```css
 * {
      margin: 0;
      padding: 0;
    }

  .box {
      width: 200px;
      height: 200px;
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      justify-content: space-between;/* 两端对齐 */
    }

  .item {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: black;
      display: block;
    }

  .item:nth-child(2) {
      align-self: center;/* 垂直方向居中 */
    }

  .item:nth-child(3) {
      align-self: flex-end;/* 垂直方向尾对齐 */
    }
```

## 两列布局，左边固定，右边自适应
```html
<div id="flex-container">
    <div class="box-left">left</div>
    <div class="box-right">right</div>
</div>
```
```css
/* flex */
  * {
      margin: 0;
      padding: 0;
   }

  #flex-container {
      display: flex;/* 采用 flex 布局 */
      flex-direction: row;/* 按行排列 */
    }

  .box-left {
      background: orange;
      width: 300px;
    }

  .box-right {
      background: skyblue;
      flex: 1;
    }
```
```css
/* float */
* {
      margin: 0;
      padding: 0;
    }

    .box-left {
      background: orange;
      width: 300px;
      height: 100%;
      float: left;
    }

    .box-right {
      background: skyblue;
      margin-left: 300px;
    }
```
```css
/* absolute */
* {
      margin: 0;
      padding: 0;
    }

    #flex-container {
      position: relative;
    }

    .box-left {
      background: orange;
      width: 300px;
      position: absolute;
    }

    .box-right {
      background: skyblue;
      margin-left: 300px;
    }
```

## 圣杯布局
```html
<div class="container">
    <div class="main"></div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```
```css
  .container {
      padding-left: 120px;
      padding-right: 220px;
    }

    .main {
      float: left;
      width: 100%;
      height: 200px;
      background-color: #01549b;
    }

    .left {
      position: relative;
      left: -120px;
      float: left;
      height: 200px;
      width: 100px;
      margin-left: -100%;
      background-color: #bd4147;
    }

    .right {
      position: relative;
      right: -220px;
      float: left;
      height: 200px;
      width: 200px;
      margin-left: -200px;
      background-color: #419641;
    }
```

## 双飞翼布局
```html
<div class="wrap">
    <div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```
```css
    .wrap {
      float: left;
      width: 100%;
    }

    .main {
      height: 200px;
      margin-left: 110px;
      margin-right: 210px;
      background-color: #01549b;
    }

    .left {
      float: left;
      height: 200px;
      width: 100px;
      margin-left: -100%;
      background-color: #bd4147;
    }

    .right {
      float: left;
      height: 200px;
      width: 200px;
      margin-left: -200px;
      background-color: #419641;
    }
```