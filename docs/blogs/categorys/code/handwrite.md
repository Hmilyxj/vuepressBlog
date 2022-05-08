---
title: 前端基础之手写实现
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
## 
```js

```

## 购物车全选单选
```html
<div id='view'></div>
  <input type="checkbox" class="all"> 全选
  <hr>
  <input type="checkbox" class="single">
  <input type="checkbox" class="single">
  <input type="checkbox" class="single">
  <input type="checkbox" class="single">
  <input type="checkbox" class="single">
  <input type="checkbox" class="single">
  <script>
    var all = document.querySelector('.all')
    var singles = document.querySelectorAll('.single');
    // 选中全选，没选中全不选
    all.onclick = function () {
      var tag = this.checked; // 全选的状态
      for (var i = 0; i < singles.length; i++) {
        singles[i].checked = tag;
      }
    }
    // 点击单个(计数的方式)
    for (var i = 0; i < singles.length; i++) {
      singles[i].onclick = function () {
        var count = 0; // 计数器
        // 通过循环记录选中的个数
        for (var i = 0; i <script singles.length; i++) {
          if (singles[i].checked) {
            count++;
          }
        }
        if (count === singles.length) {
          all.checked = true;
        } else {
          all.checked = false;
        }
      }
    }
  </script>
```
## 上传图片时，限制图片大小，尺寸，类型
```html
<el-upload :before-upload='beforeUpload'>
  <el-button>上传</el-button>
</el-upload>
```
```js
methods: {
      beforeUpload(file){
        const isLt1M = file.size / 1024 / 1024 < 10
        const isJPG = (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png");
        //判断图片的类型     JPG、JPEG或PNG 格式
        if (!isJPG) {
          this.$message.warning("上传头像图片只能是 JPG、JPEG或PNG 格式!");
          return false;
        }
        //判断图片的大小     小于10M
        if (!isLt10M) {
          this.$message.warning("上传的文件大小不能超过 10MB!");
          return false;
        }

        //判断图片的尺寸     我在这里要求图片是800*900的
        const _this = this
        let imgWidth = ''
        let imgHight = ''
        const isSize = new Promise(function (resolve, reject) {
          const _URL = window.URL || window.webkitURL
          const img = new Image()
          img.onload = function () {
            imgWidth = img.width
            imgHight = img.height
            const valid = img.width === 800 && img.height === 900
            valid ? resolve() : reject()
          }
          img.src = _URL.createObjectURL(file)

        }).then(() => {
          return file
        }, () => {
          _this.$message.warning({ message: `上传文件的图片大小不合符标准,宽需要为800px，高需要为900px。当前上传图片的宽高分别为：${imgWidth}px和${imgHight}px` })
          return Promise.reject()
        })
        return isSize
      },
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
## 写入localstorage方法，实现set(类似cookie的maxage)和get
```js
localStorage.__proto__.set = function (key, value, maxage) {
  const obj = {
    data: value,
    validTime: Date.now() + maxage,
  }
  localStorage.setItem(key, JSON.stringify(obj));
}

localStorage.__proto__.get = function (key) {
  let val = localStorage.getItem(key);
  if (!val) return null;

  val = JSON.parse(val);
  if (Date.now() > validTime) {
    localStorage.removeItem(key);
    return null;
  } else {
    return val.data;
  }
}
```
## 闭包实现sum,不用柯里化
sum(1,2)(3)(4)(5,6,7)()返回28
sum()返回0
```js
function sum(...rest) {
  let args = rest;
  if (args.length === 0) return 0;

  return function partialSum(...rest) {
    args = [...args, ...rest]
    if (rest.length === 0) {
      return args.reduce((pre, cur) => pre + cur)
    } else {
      return partialSum
    }
  }
}
console.log(sum(1,2)(3)(4)(5,6,7)())
```
## 实现简单迭代器
迭代器是一种特殊对象，它具有一些专门为迭代过程设计的专有接口，所有的迭代器对象都有一个next()方法，每次调用都返回一个结果对象。结果对象有两个属性：一个是value，表示下一个将要返回的值；另一个是done，它是一个布尔类型的值，当没有更多可返回数据时返回true。迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次next()方法，都会返回下一个可用的值
```js
// 函数返回值是个对象 ，对象中，key为next、value为函数；
// 每调用一次next()，i+1，同时返回一个对象 ，对象就是集合的元素；
function myIterator(list) {
  let i = 0;
  return {
    next: function () {
      let done = (i >= list.length);
      let value = !done ? list[i++] : undefined;
      return {
        done: done,
        value: value
      };
    }
  };
}
```
## 用defineProperty实现双向绑定
```js
<body>
  <input class="a"></input>
  <input class="b" type="text">
  <script>

    function fun(newval) {
      document.querySelector('.b').value = newval;
      document.querySelector('.a').value = newval;
    }

    let obj = {};
    //defineproperty(obj,'inputVal',fun);
    Object.defineProperty(obj, 'inputVal', {
      set(newVal) {
        val = newVal
        fun(newVal)
      },
      get() { return val }
    })
    document.querySelector('.b').addEventListener('change', function (e) {
      obj.inputVal = e.target.value;
    });
    document.querySelector('.a').addEventListener('change', function (e) {
      obj.inputVal = e.target.value;
    });

  </script>
</body>
```
## defineProperty
```js
Object.defineProperty(obj, 'name', {
  value: "hello",
  writable: false,//是否可以被重写
  enumerable: false,//是否可以被枚举
  configurable: false,//是否可以删除目标属性或是否可以再次修改属性的特性
  get() {
    console.log('正在获取name的值')
    return 'langming'
  },
  set(newVal) {
    console.log(`正在设置name的值为${newVal}`)
  }
}
```
## 实现双括号模板字符串{{}}
```js
// 手动实现双括号模板字符串  {{}}； 正则表达式为： /\{\{(.*?)\}\}/g
    function templateStr2(str, obj) {
      let pattern = /\{\{(.*?)\}\}/     // 单个模板字符串的进行匹配
      if (pattern.test(str)) {
        // 字符串中含有匹配该正则的字符串；则将匹配的字符串进行替换
        const key = pattern.exec(str)[1]
        str = str.replace(pattern, obj[key])
        // 递归将剩下匹配的字符串也进行替换，直至字符串中不含有与正则匹配的字符串
        return templateStr2(str, obj)
      }
      // 不存在模板字符串则直接返回
      return str
    }

    // 手动实现双括号模板字符串  {{}}；
    function templateStr3(str, obj) {
      let pattern = /\{\{(.*?)\}\}/g     // 全局模板字符串的进行匹配
      if (pattern.test(str)) {
        return str.replace(pattern, function (key, p1) {
          // p1的值为 "name", "age"； 
          return eval('obj[p1]')    // 相当于执行eval('obj["name"]')
        })
      }
      // 不存在模板字符串则直接返回
      return str
    }

    let obj = {
      name: '李四',
      age: 25
    }
    let str = "姓名：{{name}}--年龄：{{age}}"
    console.log(templateStr2(str, obj));
    console.log(templateStr3(str, obj));
```
## 实现ES6中的模板字符串 ${}
```js
// 手动实现模板字符串 ${}，对应正则表达式为： /\$\{(.*?)\}/g
    function templateStr(str) {
      /*
        m：匹配的字符串；p1：匹配正则中第一个元组的字符串；index: 匹配的字符串在整个字符串中的开始下标，str: 当前完整的字符串；
        replace函数使用法参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
      */
      return str.replace(/\$\{(.*?)\}/g, function (m, p1, index, str) {
        return eval(p1)
      })
    }
    let name = '张三', age = 25
    let temp = '姓名：${name}，年龄：${age}'
    console.log(templateStr(temp));
```
## readfile和writefile
```js
const fs = require('fs')
    function fsRead(path) {
      return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }

    //链式调用
    const promise = fsRead('./text1.txt');
    promise.then((res1) => {
      return fsRead('./text2.txt')
    }).then((res2) => {
      return fsRead('./text3.txt')
    }).then((res3) => {
      return fsRead('./text4.txt')
    }).catch((err => {
      console.log('error');
    }))

    const fs = require('fs')
    function fsWrite(path, content) {
      return new Promise((resolve, reject) => {
        fs.writeFile(path, content, function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(err)
          }
        })
      })
    }
```
## es5实现static和private
```js
//es6静态方法
    class MyClass {
      constructor() { }
      static say(words) {
        alert(words);
      }
    }
    //静态⽅法将不在实例化对象的⽅法中，因此⾥⾯不能有this，使⽤的时候必须直接MyClass.say()，实例化对象不拥有这个⽅法。静态⽅法将被共享，因此所⽤内存减少

    // 相当于
    class MyClass { }
    MyClass.say = function () { }
    //所以可以被动态修改
```
```js
//静态属性
// es6的static只能修饰class的⽅法，⽽不能修饰属性
    class MyClass {
      static get sex() { }
      static set sex()
    }
    // 可以直接MyClass.sex这样获取。
```
```js
//私有变量
    const Example = (function () {
      var _private = Symbol('private');
      class Example {
        constructor() {
          this[_private] = 'private';
        }
        getName() {
          return this[_private];
        }
      }
      return Example;
    })();
    var ex = new Example();
    console.log(ex.getName()); // private
    console.log(ex.name); // undefined
    // 优点:无命名冲突  外部无法访问和修改  无性能损失
    // 缺点:写法稍微复杂  兼容性也还好
```
```js
//私有变量
    const _private = new WeakMap();
    class Example {
      constructor() {
        _private.set(this, 'private');
      }
      getName() {
        return _private.get(this);
      }
    }
    var ex = new Example();
    console.log(ex.getName()); // private
    console.log(ex.name); // undefined
    // 优点:无命名冲突  外部无法访问和修改  
    // 缺点:写法稍微复杂  兼容性也还好  性能损失
```
```js
//私有方法
    constructor({ name, age }) {
      this.name = name
      _say.set(this, () => {
        alert(this.name)
      })
    }
      //由于使⽤了箭头函数，函数体内的this和外部的this是同⼀个，因此不会发⽣this指向偏移的问题。
```
## ES5实现ES6的class
区别：
类必须使用new调用，否则会报错。ES的构造函数是可以当成普通函数使用的
类的内部所有定义的方法，都是不可枚举的。（包括内部定义的静态方法）
类的静态方法也可以被子类继承
可以继承原生构造函数
ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。
ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承
```js
// es6
    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
      eat() {
        return 'eat'
      }
      static say() {
        return 'say'
      }
    }

    // 通过babel转换成的es5语法
    "use strict";

    //1. 类必须使用new调用，否则会报错。ES的构造函数是可以当成普通函数使用的
    function _checkType(obj, constructor) {
      if (!(obj instanceof constructor)) {
        throw new TypeError('Cannot call a class as a function')
      }
    }
    /**
     *将方法添加到原型上，如果是静态方法添加到构造函数上，
     **/

    //2.类的内部所有定义的方法，都是不可枚举的。（包括内部定义的静态方法）
    function defineProperties(target, descriptors) {
      // 遍历函数数组，分别声明其描述符 并添加到对应的对象上
      for (let descriptor of descriptors) {
        descriptor.enumerable = descriptor.enumerable || false; // 设置该属性是否能够出现在对象的枚举属性中。默认为 false
        descriptor.configurable = true; // 设置该属性描述符能够被改变，同时该属性也能从对应的对象上被删除。
        if ("value" in descriptor) descriptor.writable = true; // 如果属性中存在value, value设置为可以改变。
        Object.defineProperty(target, descriptor.key, descriptor); // 写入对应的对象上
      }
    }

    // 收集公有函数和静态方法，将方法添加到构造函数或构造函数的原型中，并返回构造函数。
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps); // 共有方法写在property原型上
      if (staticProps) defineProperties(Constructor, staticProps); // 静态方法写到构造函数上 
      return Constructor;
    }

    var Person = function () {
      function Person(name, age) {
        _checkType(this, Person);

        this.name = name;
        this.age = age;
      }

      _createClass(Person, [{
        key: "eat",
        value: function eat() {
          return 'eat';
        }
      }], [{
        key: "say",
        value: function say() {
          return 'say';
        }
      }]);

      return Person;
    }();
```
## 转化为驼峰命名
```js
var s1 = "get-element-by-id"
// 转化为 getElementById
var f = function(s) {
    return s.replace(/-\w/g, function(x) {
        return x.slice(1).toUpperCase();
    })
}
```
## 模板引擎实现
```js
// let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
// let data = {
//   name: '姓名',
//   age: 18
// }
// render(template, data); // 我是姓名，年龄18，性别undefined

function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}
```
## 解析 URL Params 为对象（取出url参数）
```js
// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
// parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })

  return paramsObj;
}
```
## 对象数组去重
输入:
[{a:1,b:2,c:3},{b:2,c:3,a:1},{d:2,c:2}]
输出:
[{a:1,b:2,c:3},{d:2,c:2}]
```js
function objSort(obj) {
      let newObj = {}
      //遍历对象，并将key进行排序
      Object.keys(obj).sort().map(key => {
        newObj[key] = obj[key]
      })
      //将排序好的数组转成字符串
      return JSON.stringify(newObj)
    }

    function unique(arr) {
      let set = new Set();
      for (let i = 0; i < arr.length; i++) {
        let str = objSort(arr[i])
        set.add(str)
      }
      //将数组中的字符串转回对象
      arr = [...set].map(item => {
        return JSON.parse(item)
      })
      return arr
    }
```
## 使用迭代的方式实现 flatten 函数
```js
var arr = [1, 2, 3, [4, 5], [6, [7, [8]]]]
    /** * 使用递归的方式处理 * wrap 内保
    存结果 ret * 返回一个递归函数 **/
    function wrap() {
      var ret = [];
      return function flat(a) {
        for (var item of
          a) {
          if (item.constructor === Array) {
            ret.concat(flat(item))
          } else {
            ret.push(item)
          }
        }
        return ret
      }
    }
    console.log(wrap()(arr));
```
## 通用的事件监听函数
```js
const EventUtils = {
      // 视能力分别使用dom0||dom2||IE方式 来绑定事件
      // 添加事件
      addEvent: function (element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent("on" + type, handler);
        } else {
          element["on" + type] = handler;
        }
      },
      // 移除事件
      removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
          element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
          element.detachEvent("on" + type, handler);
        } else {
          element["on" + type] = null;
        }
      },
      // 获取事件目标
      getTarget: function (event) {
        return event.target || event.srcElement;
      },
      // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
      getEvent: function (event) {
        return event || window.event;
      },
      // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
      stopPropagation: function (event) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
      },
      // 取消事件的默认行为
      preventDefault: function (event) {
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
      }
    };
```
## 实现数组的随机排序
```js
let arr = [2, 3, 454, 34, 324, 32]
arr.sort(randomSort)
function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}
```
## 手写一个观察者模式
```js
class Subject {
      constructor(name) {
        this.name = name
        this.observers = []
        this.state = 'XXXX'
      }
      // 被观察者要提供一个接受观察者的方法
      attach(observer) {
        this.observers.push(observer)
      }

      // 改变被观察着的状态
      setState(newState) {
        this.state = newState
        this.observers.forEach(o => {
          o.update(newState)
        })
      }
    }

    class Observer {
      constructor(name) {
        this.name = name
      }

      update(newState) {
        console.log(`${this.name}say:${newState}`)
      }
    }

    // 被观察者 灯
    let sub = new Subject('灯')
    let mm = new Observer('小明')
    let jj = new Observer('小健')

    // 订阅 观察者
    sub.attach(mm)
    sub.attach(jj)

    sub.setState('灯亮了来电了')
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
## CO （协程）实现
co 接受一个生成器函数，当遇到 yield 时就暂停执行，交出控制权，当其他程序执行完毕后，将结果返回并从中断的地方继续执行，如此往复，一直到所有的任务都执行完毕，最后返回一个 Promise 并将生成器函数的返回值作为 resolve 值。

我们将 * 换成 async，将 yield 换成 await 时，就和我们经常用的 async/await 是一样的，所以说 async/await 是生成器函数的语法糖。
```js
function co(gen) {
  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen();
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
    onFulfilled();

    function onFulfilled(res) {
      let ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function onRejected(err) {
      let ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      let val = Promise.resolve(ret.value);
      return val.then(onFulfilled, onRejected);
    }
  });
}

// 用法
co(function* () {
  let res1 = yield Promise.resolve(1);
  console.log(res1);
  let res2 = yield Promise.resolve(2);
  console.log(res2);
  let res3 = yield Promise.resolve(3);
  console.log(res3);
  return res1 + res2 + res3;
}).then(value => {
  console.log('add: ' + value);
}, function (err) {
  console.error(err.stack);
});
```
## 时间切片
```js
//把长任务切割成多个小任务，使用场景是防止一个任务执行时间过长而阻塞线程
function ts(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function') return;
  (function next() {
    const start = performance.now();
    let res = null;
    do {
      res = gen.next();
    } while (!res.done && performance.now() - start < 25)
    if (res.done) return;
    setTimeout(next);
  })();
}

// 用法
ts(function* () {
  const start = performance.now();
  while (performance.now() - start < 1000) {
    yield;
  }
  console.log('done!');
});
```
## Object.is
```js
//Object.is() 和 === 的区别是 Object.is(0, -0) 返回 false, Object.is(NaN, NaN) 返回 true。
const iIs = function (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
```
## 实现 ES6 的Class
```js
//用构造函数模拟，class 只能用 new 创建，不可以直接调用
const checkNew = function (instance, con) {
  if (!(instance instanceof con)) {
    throw new TypeError(`Class constructor ${con.name} cannot be invoked without 'new'`);
  }
};
const defineProperties = function (target, obj) {
  for (const key in obj) {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      value: obj[key],
      writable: true
    });
  }
};
const createClass = function (con, proto, staticAttr) {
  proto && defineProperties(con.prototype, proto);
  staticAttr && defineProperties(con, staticAttr);
  return con;
};

// 用法
function Person(name) {
  checkNew(this, Person);
  this.name = name;
}
var PersonClass = createClass(Person, {
  getName: function () {
    return this.name;
  }
}, {
  getAge: function () { }
});
```
## 节流 throttle 方法(复杂)
```js
const throttle = function (func, wait = 0, options = {
  leading: true,
  trailing: false,
  context: null
}) {
  let timer;
  let res;
  let previous = 0;
  const _throttle = function (...args) {
    options.context || (options.context = this);
    let now = Date.now();
    if (!previous && !options.leading) previous = now;
    if (now - previous >= wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      res = func.apply(options.context, args);
      previous = now;
    } else if (!timer && options.trailing) {
      timer = setTimeout(() => {
        res = func.apply(options.context, args);
        previous = 0;
        timer = null;
      }, wait);
    }
    return res;
  };
  _throttle.cancel = function () {
    previous = 0;
    clearTimeout(timer);
    timer = null;
  };
  return _throttle;
};
```
## 防抖 debounce 方法(复杂)
```js
const debounce = function (func, wait = 0, options = {
  leading: true,
  context: null
}) {
  let timer;
  let res;
  const _debounce = function (...args) {
    options.context || (options.context = this);
    if (timer) {
      clearTimeout(timer);
    }
    if (options.leading && !timer) {
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      res = func.apply(options.context, args);
    } else {
      timer = setTimeout(() => {
        res = func.apply(options.context, args);
        timer = null;
      }, wait);
    }
    return res;
  };
  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
};
```
## Object.create
Object.create()会将参数对象作为一个新创建的空对象的原型, 并返回这个空对象
```js
function create(proto) {
  function F() {};
   F.prototype = proto; // 将原型挂在构造函数的prototype上
   F.prototype.constructor = F;
   return new F(); // 返回新对象
}
```
## 实现 Object.assign 
```js
Object.assign2 = function (target, ...source) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  let ret = Object(target)
  source.forEach(function (obj) {
    if (obj != null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = obj[key]
        }
      }
    }
  })
  return ret
}
```
```js
//浅拷贝方法，只会拷贝源对象自身的且可枚举的属性（包括以 Symbol 为 key 的属性）到目标对象
const iAssign = function (target, ...source) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  let res = Object(target);
  for (let i = 0; i < source.length; i++) {
    let src = source[i];
    let keys = [...Object.keys(src), ...Object.getOwnPropertySymbols(src)];
    for (const k of keys) {
      if (src.propertyIsEnumerable(k)) {
        res[k] = src[k];
      }
    }
  }
  return res;
};
// 保持 assign 的数据属性一致
Object.defineProperty(Object, 'iAssign', {
  value: iAssign,
  configurable: true,
  enumerable: false,
  writable: true
});
```
## 实现 instanceof 运算符
```js
const iInstanceof = function (left, right) {
    // 如果是原始值，则始终返回 false
    if (left === null || typeof left !== 'object') return false;
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
};

```
## tabbar
```vue
// tabbar组件
<template>
  <div class="tab_bar">
    <!-- 定义一个个插槽外界向里面插入内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped>
.tab_bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  font-size: 14px;
  background-color: #f6f6f6;
  box-shadow: -3px 0 15px rgba(0, 0, 0, 0.1);
}
</style>
```
```vue
// tabItem组件
<template>
  <div class="tab_ber-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="tab_bar_icon"></slot>
    </div>

    <div v-else>
      <slot name="tab_bar_icon_active"></slot>
    </div>

    <div :style="isActiveColor">
      <slot name="tab_bar_text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {};
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
  computed: {
    isActive() {
      // 判断当前的请求路径中 是否包含父组件传递过来的 path
      return this.$route.path.indexOf(this.path) !== -1;
    },
    isActiveColor() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style scoped>
.tab_ber-item {
  flex: 1;
  text-align: center;
  cursor: pointer;
  margin-top: 3px;
}

.tab-bar-item img {
  width: 26px;
  vertical-align: middle;
}
</style>
```
```js
// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/Home')
const Category = () => import('../views/Category')
const Cart = () => import('../views/Cart')
const Profile = () => import('../views/Profile')

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
```
```vue

<template>
  <div id="app">
    <router-view />
    <tab-bar>
      <tab-bar-item path="/home" active-color="pink">
        <img src="./assets/img/tabbar/home.svg" alt="" slot="tab_bar_icon" />
        <img
          src="./assets/img/tabbar/home_active.svg"
          alt=""
          slot="tab_bar_icon_active"
        />
        <div slot="tab_bar_text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img
          src="./assets/img/tabbar/category.svg"
          alt=""
          slot="tab_bar_icon"
        />
        <img
          src="./assets/img/tabbar/category_active.svg"
          alt=""
          slot="tab_bar_icon_active"
        />
        <div slot="tab_bar_text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img
          src="./assets/img/tabbar/shopcart.svg"
          alt=""
          slot="tab_bar_icon"
        />
        <img
          src="./assets/img/tabbar/shopcart_active.svg"
          alt=""
          slot="tab_bar_icon_active"
        />
        <div slot="tab_bar_text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" active-color="skyblue">
        <img src="./assets/img/tabbar/profile.svg" alt="" slot="tab_bar_icon" />
        <img
          src="./assets/img/tabbar/profile_active.svg"
          alt=""
          slot="tab_bar_icon_active"
        />
        <div slot="tab_bar_text">个人资料</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "./components/TabBar";
import TabBarItem from "./components/TabBarItem";

export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
@import url("./assets/css/base.css");
</style>
```