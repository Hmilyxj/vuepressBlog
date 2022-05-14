---
title: 前端基础之Promise
date: 2021-12-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端基础
tags: 
  - Es6
  - 基础概念
  - 前端
  - 面试
  - Promise
---

## 取消结束Promise
```js
//返回一个pending状态的Promise，原Promise链会终止
Promise.resolve().then(() => {
    console.log('ok1')
    return new Promise(()=>{})  // 返回“pending”状态的Promise对象
}).then(() => {
    // 后续的函数不会被调用
    console.log('ok2')
}).catch(err => {
    console.log('err->', err)
})

```
```js
//Promise.race竞速方法

let p1 = new Promise((resolve, reject) => {
    resolve('ok1')
})
 
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {resolve('ok2')}, 10)
})
 
Promise.race([p2, p1]).then((result) => {
    console.log(result) //ok1
}).catch((error) => {
    console.log(error)
})

```
```js
//当Promise链中抛出错误时，错误信息沿着链路向后传递，直至捕获
Promise.resolve().then(() => {
      console.log('ok1')
      throw 'throw error1'
    }).then(() => {
      console.log('ok2')
    }, err => {
      // 捕获错误
      console.log('err->', err)
    }).then(() => {
      // 该函数将被调用
      console.log('ok3')
      throw 'throw error3'
    }).then(() => {
      // 错误捕获前的函数不会被调用
      console.log('ok4')
    }).catch(err => {
      console.log('err->', err)
    })
```
## 手写Promise
```js
class Promise {
  static pending = 'pending';
  static fulfilled = 'fulfilled';
  static rejected = 'rejected';

  constructor(fn) {
    this.status = Promise.pending;
    this.value = undefined; // 存储 this._resolve 即操作成功 返回的值
    this.reason = undefined; // 存储 this._reject 即操作失败 返回的值
    this.callbacks = [];// 存储then中传入的参数,为什么是数组呢？同一个Promise的then方法可以调用多次
    fn(this._resolve.bind(this), this._reject.bind(this));
  }
  
  _resolve(value) {
    // 处理onFulfilled执行结果是一个Promise时的情况
    // 当value instanof Promise时，说明当前Promise肯定不会是第一个Promise
    // 而是后续then方法返回的Promise（第二个Promise）
    // 我们要获取的是value中的value值（有点绕，value是个promise时，那么内部存有个value的变量）
    // 可以将传递一个函数作为value.then的onFulfilled参数
    // 那么在value的内部则会执行这个函数，我们只需要将当前Promise的value值赋值为value的value即可
    if (value instanceof Promise) {
      value.then(
        this._resolve.bind(this),
        this._reject.bind(this)
      );
      return;
    }
    this.value = value;
    this.status = Promise.fulfilled; // 将状态设置为成功

    // 通知事件执行
    this.callbacks.forEach(item => this._handler(item));
  }

   _reject(reason) {
    if (reason instanceof Promise) {
      reason.then(
        this._resolve.bind(this),
        this._reject.bind(this)
      );
      return;
    }

    this.reason = reason;
    this.status = Promise.rejected; // 将状态设置为失败

    this.callbacks.forEach(cb => this._handler(cb));
  }

  _handler(callback) {
    const {onFulfilled,onRejected,nextResolve,nextReject} = callback;

    if (this.status === Promise.pending) {
      this.callbacks.push(callback);
      return;
    }

    if (this.status === Promise.fulfilled) {
      // 传入存储的值
      // 未传入onFulfilled时，value传入
      const nextValue = onFulfilled ? onFulfilled(this.value) : this.value;
      nextResolve(nextValue);
      return;
    }

    if (this.status === Promise.rejected) {
      // 传入存储的错误信息
      // 同样的处理
      const nextReason = onRejected ? onRejected(this.reason) : this.reason;
      nextReject(nextReason);
    }
  }

  then(onFulfilled, onRejected) {
    // 返回一个新的Promise
    return new Promise((nextResolve, nextReject) => {
      // 这里之所以把下一个Promsie的resolve函数和reject函数也存在callback中
      // 是为了将onFulfilled的执行结果通过nextResolve传入到下一个Promise作为它的value值
      this._handler({nextResolve,nextReject,onFulfilled,onRejected});
    });
  }
}
```
## 测试
```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('willem');
        }, 1000);
    });
}

fetchData().then((data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data + ' wei');
        }, 1000);
    });
}, (err) => {}).then((data2) => {
    console.log(data2); // willem wei
});
```

## 手写Promise.all
Promise.all() 它接收一个promise对象组成的数组作为参数，并返回一个新的promise对象。

当数组中所有的对象都resolve时，新对象状态变为fulfilled，所有对象的resolve的value依次添加组成一个新的数组，并以新的数组作为新对象resolve的value。
当数组中有一个对象reject时，新对象状态变为rejected，并以当前对象reject的reason作为新对象reject的reason。
```js
fuction promiseAll(promises){
  if(!isArray(Promises)){
    throw new Error("promises must be an array");
  }
  return new Promise(function(resolve, reject){
    let promisesLength = promises.length;
    let resolveNum = 0;
    let resolveValues = new Array(promisesLength);
    for(let i = 0; i < promisesLength; i++){
      Promise.resolve(promises[i].then(function(value){
        resolveValues[i] = value;
        resolveNum++;
        if(resolveNum == promisesLength){
          return resolve(resolveValues)
        }
      }, function(reson){
        return reject(reson);
      }))
    }
  })
}
```
## Promise.all中的错误处理
```js
// 我们的需求是：出错的那一个请求不会影响到正常的请求。
// 要解决上面的问题，思路很简单，只需要再外面再包一层Promise就行了，不管内部的Promise是resolved或者rejected了，外层的Promise都resolve就可以了。这样，Promise.all接收到的，永远都是resolved的Promise。两层的Promise看起来有些别扭，为了代码写起来稍微好看一点，我们用await和try…catch来处理。
/**
 * @param {Promise} p 
 */
async function promiseWithError(p) {
  try {
    const res = await p;
    return {
      err: 0,
      data: res
    };
  } catch(e) {
    return {
      err: 1
    }
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise resolve 1');
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise resolve 2');
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('promise reject 3');
  }, 3000);
});

Promise.all([p1, p2, p3].map(item => promiseWithError(item)))
  .then(res => {
    console.log('resolve:', res);
  })
  .catch(err => {
    console.log('reject:', err);
  });


// 最终的输出为：
// resolve: [{ err: 0, data: "promise resolve 1"}, { err: 0, data:"promise resolve 2"}, { err: 1 }]
// 我们还可以使用Promise.allSettled。
```
## 手写Promise.allsettled
相对于 Promise.all 需要所有 promise都成功时才 resolve或者有一个失败时即reject，Promise.allSettled 只关心所有 promise 是不是都被 settle 了，不管其是 rejected状态的 promise，还是非 rejected状态(即fulfilled)的 promise, 我都可以拿到它的最终状态并对其进行处理
```js
function PromiseAllSettled(promises) {
  return new Promise(resolve => {
    const data = [], len = promises.length;
    let count = len;
    for (let i = 0; i < len; i += 1) {
      const promise = promises[i];
      promise.then(res => {
        data[i] = { status: 'fulfilled', value: res };
      }, error => {
        data[i] = { status: 'rejected', reason: error };
      }).finally(() => { // promise has been settled
        if (!--count) {
          resolve(data);
        }
      });
    }
  });

  //测试
  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
  const promises = [promise2, promise1];

  Promise.allSettled(promises).
    then((results) => results.forEach((result) => console.log(result.status)));

  // expected output:
  // "rejected"
  // "fulfilled"
}
```

## 手写Promise.race
Promise.race() 它同样接收一个promise对象组成的数组作为参数，并返回一个新的promise对象。

与Promise.all()不同，它是在数组中有一个对象（最早改变状态）resolve或reject时，就改变自身的状态，并执行响应的回调。
```js
function promiseRace(promises) {
  if (!Array.isArray(promises)) {
    throw new Error('promises must be an array');
  }
  return new Promise(function (resolve, reject) {
    promises.forEach(p => {
      Promise.resolve(p).then(data => {
        resolve(data)
      }, err => {
        reject(err)
      })
    })
  })
}
```

## 手写Promise.any
```js
function promiseAny(promises) {
  let i = 0, j = 0;
  return new Promise((resolve, reject) => {
    for (var p of promises) {
      p.then(res => {
        if (j < 1) {
          resolve(res);
        }
        i++;
        j++;
      }).catch(err => {
        if (i >= promises.length - 1) {
          reject('AggregateError: No Promise in Promise.any was resolved')
        }
        i++
      })
    }
  })
}
```
## Promise控制并发请求数量(图片)
有 8 个图片资源的 url，已经存储在数组 urls 中（即urls = [‘http://example.com/1.jpg’, …., ‘http://example.com/8.jpg’]），而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。

但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。

请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
```js
//已经给出的函数
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function(){
      console.log("一张图片加载完成");
      resolve();
    }
    img.onerror = reject;
    img.src = url;
  })
}

var total = 3, count = 0;
function countLoad() {
  count++;
  loadImg(url.shift())
    .then(() => {
      count--;
      if (count < total && url.length) {
        countLoad()
      }
    })
    .catch(err => {
      console.log("图片加载失败", err)
        count--;
        if (count < total && url.length) {
        countLoad()
      }
    })
}

function start(){
  for(var i = 0; i < total; i++){
    countLoad()
  }
}
```

## Promise.all控制并发请求数量
所谓并发请求，即有待请求接口100个，限制每次只能发出10个。即同一时刻最多有10个正在发送的请求。
每当10个之中有一个请求完成，则从待请求的接口中再取出一个发出。保证当前并发度仍旧为10。
直至最终请求完成。
```js
function start(param) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param);
    }, 2000)
  })
}

function limitedRequest(urls, maxNum) {
  const pool = [];
  for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
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

limitedRequest([1, 2, 3, 4, 5, 6, 7, 8], 3)
```
## promise静态方法
Promise有四个静态方法，分别是resolve()、reject()、all()和race()，本节将着重分析这几个方法的功能和特点。

1）Promise.resolve()
此方法有一个可选的参数，参数的类型会影响它的返回值，具体可分为三种情况（如下所列），其中有两种情况会创建一个新的已处理的Promise实例，还有一种情况会返回这个参数。
（1）当参数为空或非thenable时，返回一个新的状态为fulfilled的Promise。
（2）当参数为thenable时，返回一个新的Promise，而它的状态由自身的then()方法控制，具体细节已在之前的thenable一节做过说明。
（3）当参数为Promise时，将不做修改，直接返回这个Promise。

```js
let tha = {
  then(resolve, reject) {
    resolve("thenable");
  }
};
//参数为空
Promise.resolve().then(function(value) {
  console.log(value);    //undefined
});
//参数为非thenable
Promise.resolve("string").then(function(value) {
  console.log(value);    //"string"
});
//参数为thenable
Promise.resolve(tha).then(function(value) {
  console.log(value);    //"thenable"
});
//参数为Promise
Promise.resolve(new Promise(function(resolve) {
  resolve("Promise");
})).then(function(value) {
  console.log(value);    //"Promise"
});
```
2）Promise.reject()
此方法能接收一个参数，表示拒绝理由，它的返回值是一个新的已拒绝的Promise实例。与Promise.resolve()不同，Promise.reject()中所有类型的参数都会原封不动的传递给后续的已拒绝的回调函数，如下代码所示。
```js
Promise.reject("rejected").catch(function (reason) {
  console.log(reason);          //"rejected"
});
var p = Promise.resolve();
Promise.reject(p).catch(function (reason) {
  reason === p;                 //true
});
```
3）Promise.all()
（1）当可迭代对象中的所有成员都是已完成的Promise时，新的Promise的状态为fulfilled。而各个成员的决议结果会组成一个数组，传递给后续的已完成的回调函数
（2）当可迭代对象中的成员有一个是已拒绝的Promise时，新的Promise的状态为rejected。并且只会处理到这个已拒绝的成员，接下来的成员都会被忽略，其决议结果会传递给后续的已拒绝的回调函数，
```js
var p1 = Promise.resolve(200),
  p2 = "fulfilled";
Promise.all([p1, p2]).then(function (value) {
  console.log(value);          //[200, "fulfilled"]
});


var p1 = Promise.reject("error"),
  p2 = "fulfilled";
Promise.all([p1, p2]).catch(function (reason) {
  console.log(reason);         //"error"
});
```
4）Promise.race()
新的Promise实例的状态也与方法的参数有关，当参数的成员为空时，其状态为pending；当参数不为空时，其状态是最先被处理的成员的状态

```js
var p1 = new Promise(function(resolve) {
  setTimeout(() => {
    resolve("fulfilled");
  }, 200);
});
var p2 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject("rejected");
  }, 100);
});
Promise.race([p1, p2]).catch(function (reason) {
  console.log(reason);      //"rejected"
});
```