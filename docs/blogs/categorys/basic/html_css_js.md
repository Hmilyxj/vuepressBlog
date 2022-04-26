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
## 登陆功能实现
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

## 实现两列布局，左边自适应，右边固定（高频考点）
```html
<div id="flex-container">
    <div class="box-left">left</div>
    <div class="box-right">right</div>
</div>
```
```css
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
      width: 500px;
    }

  .box-right {
      background: skyblue;
      flex: 1;
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