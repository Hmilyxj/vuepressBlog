---
title: 前端基础之图片懒加载和预加载
date: 2021-11-15
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - JS
  - 基础概念
  - 前端
  - 面试
---

<!-- more -->

## 懒加载原理
一张图片就是一个<img>标签，浏览器是否发起请求图片是根据<img>的src属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给<img>的src赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给src赋值。

## 懒加载实现
- 1.加载loading图片
- 2.判断哪些图片要加载【重点】
- 3.隐形加载图片
- 4.替换真图片

![](/image_lazyload.png)
![](/images_lazyload2.png)
``` js
//onload是等所有资源文件加载完毕后再绑定事件
window.onload = function () {
  var imgs = document.querySelector('img');

  function getTop(e) {
    return e.offsetTop;
  }

  function lazyLoad(imgs) {
    var h = window.innerHeight;
    var s = document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < imgs.length; i++) {
      if ((h + s) > getTop(imgs[i])) {
        //不加立即执行函数i会等于9
        (function (i) {
          //页面开始有2秒空白
          setTimeout(function () {
            //隐形加载图片图片，这个图片不会到页面上去
            let temp = new Image();
            temp.src = imgs[i].getAttribute('data-src');
            temp.onload = function () {
              imgs[i].src = imgs[i].getAttribute('data-src')
            }
          }, 200)
        })(i)
      }
    }
  }
  lazyLoad(imgs);
  //滚屏函数
  window.onscroll = function () {
    lazyLoad(imgs);
  }
}
```

## IntersectionObserver实现懒加载
```js
function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

var observer = new IntersectionObserver(
  function(changes) {
    changes.forEach(function(change) {
      var container = change.target;
      var content = container.querySelector('template').content;
      container.appendChild(content);
      observer.unobserve(container);
    });
  }
);

query('.lazy-loaded').forEach(function (item) {
  observer.observe(item);
});
```
```html
 <ul></ul>
  <script>
    // 获取dom
    const ulDom = document.querySelector('ul');
    const MAX_LENGTH = 10;
    // 渲染
    function render() {
      let html = '';
      for (let i = 0; i < MAX_LENGTH; i++) {
        html += `
            <li>
                <img class="loading" src="../images/loading.png" alt="">
                <img class="img" src="" alt="" data-src='../images/image${(i % 5) + 1}.jpg'>
            </li>`;
      }
      ulDom.insertAdjacentHTML('beforeend', html);
    }
    render();

    const imgDomList = document.querySelectorAll('.img');

    // 交叉观察器
    const intersectionObserver = new IntersectionObserver((entires) => {
      entires.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 模拟异步加载
          setTimeout(() => {
            entry.target.src = entry.target.dataset.src;
            entry.target.previousElementSibling.remove();
            intersectionObserver.unobserve(entry.target);
          }, 600);
        }
      })
    }, { threshold: 0.25 });

    [...imgDomList].forEach((item) => {
      intersectionObserver.observe(item);
    });
  </script>
```

## 无限滚动
```js
var intersectionObserver = new IntersectionObserver(
  function (entries) {
    // 如果不可见，就返回
    if (entries[0].intersectionRatio <= 0) return;
    loadItems(10);
    console.log('Loaded new items');
  });

// 开始观察
intersectionObserver.observe(
  document.querySelector('.scrollerFooter')
);
```
## 无限加载案例二
```html
<ul id="list"></ul>
  <div class="loadmore" id="loadmore">点击加载更多</div>
  <script>
    const ulDom = document.getElementById('list');
    const loadmoreDom = document.getElementById('loadmore');
    const MAX_LENGTH = 48;
    const LIMIT = 12;
    let loading = false;
    let id = 1;
    // 渲染dom
    function render() {
      let html = '';
      for (let i = 0; i < LIMIT; i++) {
        html += `
              <li>
                  <img src="../images/image1.jpg" alt="">
                  <div>
                      <p>item${id++}</p>
                      <p>这里是haorooms博客测试。</p>
                  </div>
              </li>`;
      }
      ulDom.insertAdjacentHTML('beforeend', html);
      if (id < MAX_LENGTH) {
        loadmoreDom.innerHTML = '点击加载更多';
      } else {
        loadmoreDom.innerHTML = '我也是有底线的';
      }
      loading = false;
    }
    render();

    // 加载更多
    function loadmore() {
      if (id >= MAX_LENGTH || loading) return;
      loading = true;
      loadmoreDom.innerHTML = '<img class="loading" src="../images/loading.png" alt="">加载中...';
      // 模拟异步加载
      setTimeout(() => {
        render();
      }, 1000);
    }

    // 交叉观察器
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && id <script MAX_LENGTH) {
        loadmore();
      }
    }, { threshold: 0.8 });
    intersectionObserver.observe(loadmoreDom);

    // 点击加载更多
    loadmoreDom.addEventListener('click', (e) => {
      loadmore();
    });
    </script>
```
## 图片预加载
```js
// 懒加载的主要目的是优化前端性能，减少请求数或延迟请求数。
// 预加载是牺牲前端性能，换取用户体验，使用户的操作得到最快的反映。
var images = new Array()
function preload() {
  for (i = 0; i < preload.arguments.length; i++) {
    images[i] = new Image()
    images[i].src = preload.arguments[i]
  }
}
// 图片文件路径，也可以是网络文件
preload(
  "../image/image-001.jpg",
  "../image/image-002.jpg",
  "../image/image-003.jpg"
) 
```