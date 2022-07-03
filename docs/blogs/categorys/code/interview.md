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
## 取任意两个数之间的随机整数
```js
//取[min, max)左闭右开区间的任意数字，假如取[0, 100)之间的随机数，是取不到100的
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
```
```js
//变成闭区间
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //不含最大值，含最小值
}
```
## 数组中取出n个数和为m
```js
function find(arr, n, sum) {
  //没有去重
  let res = []
  findGroup(arr, n, sum, [])
  function findGroup(arr, n, sum, oneRes) {
    if (n > arr.length) return false
    if (sum == 0 && n == 0) {
      res.push(oneRes)
      return true;
    } else if (n <= 0) {
      return false;
    }
    if (n > 0) {
      let temp = arr.slice(1, arr.length)
      findGroup(temp, n - 1, sum - arr[0], [...oneRes, arr[0]])
      findGroup(temp, n, sum, [...oneRes])
    }
  }
  return res
}
```
```js
// 假设数组 const arr=[1,2,3,4] ，对应着每个元素都有标记 0 或者 1 。
// 如果 N=4 ，也就是在这个数组中，需要选择 4 个元素，那么对应的标记就只有一种可能 1111 ，
// 如果 N=3 ，那就有 4 种可能，分别是 1110 、 1101 、1011 以及 0111 (也就是 C4取3->4 ) 种可能。
const search = (arr, count, sum) => {
  // 计算某选择情况下有几个 `1`，也就是选择元素的个数
  const n = num => {
    let count = 0
    while (num) {
      num &= (num - 1)
      count++
    }
    return count
  }
  // 对于 arr 来说，有 4 个元素，对应的选择方式就是从 0000( N = 0 )到 1111( N = 4 )的所有可能。
  // 而 1111 就是 15 的二进制，也就是说这所有的可能其实对应的就是 0 - 15 中所有数对应的二进制。
  // 这里采用了位运算--左移运算， 1 << 4 的结果是 16 。
  let len = arr.length, bit = 1 << len, res = []
  // 遍历所有的选择情况
  for (let i = 1; i < bit; i++) {
    // 满足选择的元素个数 === count
    if (n(i) === count) {
      let s = 0, temp = []
      // 每一种满足个数为 N 的选择情况下，继续判断是否满足 和为 M
      for (let j = 0; j < len; j++) {
        // 那么，现在需要的最后一层判断就是选取的这些数字和必须等于 M
        //1110 到 [1, 2, 3, 4] 的映射，就代表选取了 2, 3, 4，然后判断 2 + 3 + 4 与 M 。
        // 这里可以这样看：1110 中的左边第一个 1 对应着数组 [1, 2, 3, 4] 中的 4 。
        //我们知道前者 1110 其实就是对应的外层遍历中的 i = 14 的情况。
        // 再看看数组[1, 2, 3, 4] ，我们可以将元素及其位置分别映射为 1000 0100 0010 0001。
        // 实现方式也是通过位运算--左位移来实现：
        // 1 << inx ，inx 为数组的下标。       
        // 实质上，这里的 1 << j ，是指使用 1 的移位来生成其中仅设置第 j 位的位掩码。
        // 比如：14 的二进制表示为 1110，其代表(从右往左)选取了第 2 , 3 , 4 位。      
        if ((i & 1 << j) !== 0) {
          s += arr[j]
          temp.push(arr[j])
        }
      }
      // 如果这种选择情况满足和为 M
      if (s === sum) {
        res.push(temp)
      }
    }
  }
  return res
}
```
## 发起请求，在1秒内成功返回，显示loading菊花图直到1秒结束，超过1秒，返回成功后loading菊花图直接消失
```js
// 菊花图
let loading = true

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000)
})

let p2 = function (resolve, reject) {
  return fetch(...).then((res) => {
    return res
  })
}

Promise.all([p1, p2]).then(() => {
  loading = false
})
```
## axios处理高并发，链式调用
```js
// axios返回的是一个Promise
axios.get(api1)
  .then((res) => {
    console.log(res);
    return axios.get(api2);
  })
  .then((res) => {
    console.log(res);
    return axios.get(api3);
  })
```
## 实现1秒后打印
```js
function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

wait(1000).then(() => console.log('done'))
```
## 判断两个数组是否完全相同
```js
function scalarArrayEquals(array1, array2) {
  return array1.length === array2.length && array1.every(function (val, index) { return val === array2[index] })
}
console.log(scalarArrayEquals([2, 3, 4], [4, 3, 2]));
```
## 写个函数类似于栈,返回一个函数，pop,push(其实就是写个闭包)
```js
function creatStack() {
  let res = Array.prototype.slice.call(arguments) || [];
  let arr = [];//let 用闭包，this就是属性
  return function () {
    arr = Array.prototype.slice.call(arguments);
    if (!arr.length) {
      if (res.length) return res.pop();
      else return null;
    } else {
      res = res.concat(arr);
    }
  };
}
//有两个变量调用creatStack怎么知道其内部的res是否相同
//面试官说可以pop完之后再比较
```
## 先按age由小到大排序，当age相同时按name排序
```js
arr = [{ name: "hello", age: 15 }, { name: "amc", age: 17 }, { name: "abc", age: 17 }, { name: "zoo", age: 13 }];

arr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).sort((a, b) => a.age - b.age)

console.log(arr)
```
## 判断对象是否相等
```js
function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
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
## 数组交集并集
```js
function jiaoji(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item))
}

function bingji(arr1, arr2) {
  return new Set([...arr1, ...arr2]);
}
```
## 多维数组全排列
```js
//输入：[['A', 'B'], ['a', 'b'], ['1', '2']];
//输出：['Aa1','Aa2','Ab1','Ab2','Ba1','Ba2','Bb1','Bb2']
function permutaion(arrs) {
  return arrs.reduce((pre, cur) => {
    const result = [];
    for (let i = 0; i < pre.length; i++) {
      for (let j = 0; j < cur.length; j++) {
        result.push(pre[i] + cur[j])
      }
    }
    return result
  })
}
```
## 时间戳(秒) 格式化为 时分秒（00:00:00）
```js
/**
* 时间秒数格式化
* @param s 时间戳（单位：秒）
* @returns {*} 格式化后的时分秒
*/
var sec_to_time = function (s) {
  var t;
  if (s > -1) {
    var hour = Math.floor(s / 3600);
    var min = Math.floor(s / 60) % 60;
    var sec = s % 60;
    if (hour < 10) {
      t = '0' + hour + ":";
    } else {
      t = hour + ":";
    }

    if (min < 10) { t += "0"; }
    t += min + ":";
    if (sec < 10) { t += "0"; }
    t += sec.toFixed(2);
  }
  return t;
}
```
## 时分秒（00:00:00） 转为 时间戳
```js
/**
 * 时间转为秒
 * @param time 时间(00:00:00)
 * @returns {string} 时间戳（单位：秒）
 */
var time_to_sec = function (time) {
  var s = '';

  var hour = time.split(':')[0];
  var min = time.split(':')[1];
  var sec = time.split(':')[2];

  s = Number(hour * 3600) + Number(min * 60) + Number(sec);

  return s;
};
```
## 红绿灯
```js
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

function light(cb, timer) {
  return new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve()
    }, timer);
  })
}

function step() {
  Promise.resolve().then(() => {
    return light(red, 3000)
  }).then(() => {
    return light(green, 2000)
  }).then(() => {
    return light(yellow, 1000)
  }).finally(() => {
    return step()
  })
}
```
```js
async function timer(color, delay) {
  return new Promise((res, rej) => {
    console.log(color)
    setTimeout(() => {
      res()
    }, delay);
  })
}

async function light() {
  await timer('green', 1000)
  await timer('yellow', 2000)
  await timer('red', 3000)
  await light()

}
light()
```
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
## dom转json(template生成虚拟dom)
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
## json转dom(虚拟dom转真实dom)
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <style>
    .title {
      background-color: red;
    }

    .h1 {
      color: green;
    }

    .h4 {
      color: blue;
    }
  </style>
</head>

<body>
  <div id="app"></div>
  <script>

    // {
    //   tag,
    //   attrs, 
    //   children
    // }

    let obj = {
      tag: 'div',
      attrs: {
        class: 'title'
      },
      children: [
        {
          tag: 'h1',
          attrs: {
            class: 'h1',
          },
          children: '我是h1标签'
        }, {
          tag: 'h4',
          attrs: {
            class: 'h4'
          },
          children: '我是h4标签'
        }
      ]
    }

    render(obj, '#app')
    
    function render(vnode, container) {
      if (typeof container !== 'object') {
        container = document.querySelector(container)
      }
      container.appendChild(_render(vnode))
    }

    function _render(vnode) {
      //字符串
      if (typeof vnode !== 'object') {
        return document.createTextNode(vnode)
      } else {
        let dom = document.createElement(vnode.tag)
        if (vnode.attrs) {
          for (let key in vnode.attrs) {
            let curValue = vnode.attrs[key]
            dom.setAttribute(key, curValue)
          }
        }
        if (vnode.children) {
          if (typeof vnode.children === 'object') {
            vnode.children.forEach(child => {
              render(child, dom)
            })
          } else {
            render(vnode.children, dom)
          }
        }
        return dom
      }
    }
  </script>
</body>
</html>
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
## 字符串数组转树'[abc[bcd[def]]]' -- > { value: 'abc', children: { value: 'bcd', children: { value: 'def' } } }
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
## 手写normalize函数，字符串数组转树{value: 'abc',children: {}}
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
## 输出0-9(而不是10个10，修改闭包)
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
```js
for (var i = 0; i < 10; i++) {
  setTimeout((n) => {
    console.log(n)
  }, 100, i)
}
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
## 用原生js实现类似于jquery的链式的方法调用
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
## 实现request(封装axios)项目拦截器
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
## 树转数组
```js
//非递归
function treeConvertToArr(root) {
  let arrs = [];
  let result = [];
  arrs = arrs.concat(tree);
  while (arrs.length) {
    let first = arrs.shift(); // 弹出第一个元素
    if (first.children) {
      //如果有children
      arrs = arrs.concat(first.children);
      delete first["children"];
    }
    result.push(first);
  }
  return result;
}
```
```js
//递归有点问题
let res = []
const fn = (source) => {
  source.forEach(el => {
    res.push(el)
    el.children && el.children.length > 0 ? fn(el.children) : ""
  })
}
```
## 部门分级关系(数组转树)
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
 
```
```js
//递归实现
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
```js
//两个循环
function convert(list) {
  const tree = []
  const record = {}

  for (let i = 0; i < list.length; i++) {
    list[i].children = [] // 重置 children
    record[list[i].id] = list[i]
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId) {
      if (record[list[i].parentId]) {
        record[list[i].parentId].children.push(list[i])
      }
    } else {
      tree.push(list[i])
    }
  }
  return tree
}
```
```js
//一个循环
function convert(list) {
  const tree = []
  const record = {}

  for (let i = 0; i < list.length; i++) {
    let id = list[i].id

    if (record[id]) {
      list[i].children = record[id]
    } else {
      list[i].children = record[id] = []
    }
    if (list[i].parentId) {
      if (!record[list[i].parentId]) {
        record[list[i].parentId] = []
      }
      record[list[i].parentId].push(list[i])
    } else {
      tree.push(list[i])
    }
  }
  return tree
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
## 数组长为n中选m个数的组合
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
