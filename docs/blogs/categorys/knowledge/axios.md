---
title: 前端基础之axios拦截器实现
date: 2022-2-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 知识拓展
tags: 
  - axios
  - 前端
  - 面试
  - 基础概念
---

## 实现axios拦截器
```js
// 拦截器管理器构造函数
    function InterceptorManager() {
      // 存储所有的拦截器，但请求拦截器和响应拦截器是分开的
      this.handlers = [];
    }

    //添加拦截器
    //fulfilled: 成功时执行的，在Promise.resolve中
    //rejected: 失败时执行的，在Promise.reject中
    InterceptorManager.prototype.use = function (fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      })
    }

    // 构造函数
    function Axios(config) {
      this.axios = config;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
      }
    }

    // 发送请求
    Axios.prototype.request = function (config) {
      // 创建一个 promise 对象
      let promise = Promise.resolve(config);
      // 创建一个数组
      const chains = [dispatchRequest, undefined];
      // 处理拦截器
      // 请求拦截器 将请求拦截器的回调 压入到 chains 的前面  request.handles = []
      this.interceptors.request.handlers.forEach(item => {
        chains.unshift(item.fulfilled, item.rejected);
      });

      // 响应拦截器
      this.interceptors.response.handlers.forEach(item => {
        chains.push(item.fulfilled, item.rejected);
      });

      // console.log(chains);

      // 遍历
      while (chains.length > 0) {
        promise = promise.then(chains.shift(), chains.shift());
      }
      return promise;
    }

    // 发送请求
    function dispatchRequest(config) {
      // 返回一个 promise 队列
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          statusText: 'OK'
        });
      });
    }

    // 创建实例
    let context = new Axios({});
    // 创建 axios 函数
    let axios = Axios.prototype.request.bind(context);
    //将 context 属性 config interceptors 添加至 axios 函数对象身上
    Object.keys(context).forEach(key => {
      axios[key] = context[key];
    });




    //以下为功能测试代码
    // 设置请求拦截器  config 配置对象
    axios.interceptors.request.use(function one(config) {
      console.log('请求拦截器成功 1');
      return config;
    }, function (error) {
      console.log('请求拦截器失败 1');
      return Promise.reject(error);
    });

    axios.interceptors.request.use(function two(config) {
      console.log('请求拦截器成功 2');
      return config;
    }, function (error) {
      console.log('请求拦截器失败 2');
      return Promise.reject(error);
    });

    // 设置响应拦截器
    axios.interceptors.response.use(function (response) {
      console.log('响应拦截器成功 1');
      return response;
    }, function (error) {
      console.log('响应拦截器失败 1');
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      console.log('响应拦截器成功 2');
      return response;
    }, function (error) {
      console.log('响应拦截器失败 2');
      return Promise.reject(error);
    });

    // 发送请求
    axios({
      method: 'GET',
      url: 'http://localhost:3000/posts'
    }).then(response => {
      console.log(response);
    })
```