---
title: 前端基础之手写jsonp
date: 2021-12-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - 基础概念
  - 前端
  - 面试
  - jsonp
---
## 手写jsonp
```js
function jsonp (url) {
  /*声明一个唯一的回调函数并挂载到全局上
   *创建一个script标签地址 指向 请求服务器 将回调函数名作参数带到服务器
   *服务器拿到回调名称 并返回前端 该回调的调用 把返回结果当作参数传入
   */
  let script = document.createElement('script')
  let uniqueName = `jsonpCallback${new Date().getTime()}`
  script.src = `url${url.indexOf('?') > -1 ? '&': '?'}callback=${uniqueName}`
  document.body.appendChild(script)

  window[uniqueName] = (res) => {
    cb && cb(res)
    document.body.removeChild(script)
    delete window[uniqueName]
  }
}

// 调用
jsonp('getList', (res) => {
  console.log(res)
})


// 服务器端
1. 获取参数, 拿到回调函数名称
2. 返回参数名的前端回调的调用 并 把要返回的参数作为实参调用

/*弊端 - 只支持get请求,并且不安全,需要服务器支持*/
```
```js
function jsonp(url, callbackName, callback) {
  return new Promise((resolve, reject) => {
    try {
      let str = `${url}?callback=${callbackName}`
      let scriptEle = document.createElement('script')
      scriptEle.type = 'text/javascript'
      scriptEle.src = str
      scriptEle.addEventListener('load', callback)
      window[callbackName] = function (data) {
        resolve(data)
        document.body.removeChild(scriptEle)
      }
      document.body.appendChild(scriptEle)
    } catch (err) {
      reject(err)
    }
  })
}


jsonp('http://127.0.0.1:3000/home', 'fun1', () => { console.log('加载成功') }).then(res => {
  console.log(res)
})
```
```js
let jsonp = (url, data = {}, callback = 'callback') => {
  //准备好带有padding的请求url
  let dataStr = url.indexOf('?') === -1 ? '?' : '&'
  // console.log(dataStr);
  for (let key in data) {
    dataStr += `${key}=${data[key]}&`
  }
  dataStr += `callback=` + callback
  let oScript = document.createElement('script')
  oScript.src = url + dataStr
  document.body.appendChild(oScript)
  return new Promise((resolve, reject) => {
    window[callback] = (data) => {
      try {
        resolve(data)
      } catch (e) {
        reject(e)
      } finally {
        oScript.parentNode.removeChild(oScript)// 注意这句代码，OScript移除,细节
      }
    }
  })
}

jsonp('https://photo.sina.cn/aj/index?a=1', {
  page: 1,
  cate: 'recommend'
}).then(response => {
  console.log(response, '-------then');
}) 
```
```js
let jsonp = (url, data, callbackName, callback) => {
  //准备好带有padding的请求url
  let dataStr = url.indexOf('?') === -1 ? '?' : '&'
  for (let key in data) {
    dataStr += `${key}=${data[key]}&`
  }
  dataStr += `callback=${callbackName}`;
  let oScript = document.createElement('script')
  oScript.type = 'text/javascript'
  oScript.src = url + dataStr
  document.body.appendChild(oScript)
  return new Promise((resolve, reject) => {
    window[callback] = function (data) {
      try {
        resolve(data)
      } catch (e) {
        reject(e)
      } finally {
        oScript.parentNode.removeChild(oScript)// 注意这句代码，OScript移除,细节
      }
    }
  })
}

jsonp('https://www.baidu.com', { name: 'xxx', age: '18' }, 'callback').then(res => console.log(res)) 
```