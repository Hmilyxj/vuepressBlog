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
## fetch缓存类似函数缓存
## fetch拦截器
```js
// 维护interceptor_req和interceptor_res两个数组
  // 调用拦截器的use方法时，将callback函数push到对应的队列里。
  // 在发起请求前和获取响应后执行该请求对应的callback队列，修改request和response
  expand_fetch.js
  const req_interceptors = []   //请求拦截方法存放
  const res_interceptors = []	//响应拦截方法存放

  function expand_fetch(url, option = {}) {
    //fetch默认请求方式设为GET
    if (!option.method) {
      option.method = 'GET'
    }
    //多个请求拦截器依次更改option 
    req_interceptors.forEach(fn => option = fn(option))
    //在原生fetch外面封装一个promise，为了在promise里面可以对fetch请求的结果做拦截处理。
    //同时，保证函数返回的结果是个promise对象。
    return new Promise((resolve, reject) => {
      //使用原生fetch
      fetch(url, option).then((res) => {
        //多个响应拦截器依次更改res 
        //拦截器对响应结果做处理，把处理后的结果返回给响应结果。
        res_interceptors.forEach(fn => res = fn(res))
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  //挂载添加和删除拦截器的方法
  expand_fetch.interceptors = {
    request: {
      use: (fn) => {
        req_interceptors.push(fn)
        return fn
      },
      //可以暂时不写
      // eject: (data) => {
      //   if (req_interceptors.indexOf(data) !== -1) {
      //     req_interceptors.splice(req_interceptors.indexOf(data), 1)
      //   }
      // }
    },
    response: {
      use: (fn) => {
        res_interceptors.push(fn)
        return fn
      },
      // eject: (data) => {
      //   if (res_interceptors.indexOf(data) !== -1) {
      //     res_interceptors.splice(res_interceptors.indexOf(data), 1)
      //   }
      // }
    },
  }
  export default expand_fetch
```
## 日夜模式
```html
<body>
  <div class="container light">
    <!--类名-->
    这是你 <br>
    要输入 <br>
    的内容 <br>
  </div>

  <style>
    /*去除浏览器默认样式*/
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      /*让html标签和body标签和浏览器窗口一样高一样宽*/
      width: 100%;
      height: 100%;
    }

    .container {
      width: 100%;
      height: 100%;
      /*100%的意思为和父元素尺寸一样*/
    }

    .light {
      background-color: #f3f3f3;
      color: #333;
    }

    .dark {
      background-color: #333;
      color: #f3f3f3;
    }
  </style>

  <script>
    let di = document.querySelector('div');/*选中div*/
    di.onclick = function () {
      console.log(di.className);
      if (di.className.indexOf('light') != -1) {
        di.className = 'container dark';
      } else {
        di.className = 'container light';
      }
    }
  </script>
</body>
```
## 实现get函数(字符串当代码执行)
```js
function get() {
    let res = [];
    let object = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
      res.push(eval('object.' + arguments[i]));//法一
      //法二new Function
    }
    return res;
  }
  
  const obj = {
    selector: {
      to: { toutiao: 'FE coder' }
    },
    target: { name: 'byted' }
  }

  console.log(get(obj, 'selector.to.toutiao', 'target.name')); // ['FE coder', 'byted']
```
## 判断矩形相交
```js
// 求两个矩形是否相连或相交，两个矩形的最小外包矩形宽小于两个矩形宽的和，且两个矩形最小外包矩形的的高小于两个矩形高的和，则两个矩形相交。
// 外包矩形的宽等于两个矩形的y轴最大值减去y轴的最小值。
// 外包矩形的高等于两个矩形的x轴最大值减去x轴最小值。
// y轴最小值为两矩形左上角取小者，最大值为两矩形左上角加高取大值。
// x轴最小值为两矩形左上角取小者，x轴最大值为两矩形左上角加宽取大值。

var collide = function(rect1,rect2) {
  var maxX,maxY,minX,minY

  maxX = rect1.x+rect1.width >= rect2.x+rect2.width ? rect1.x+rect1.width : rect2.x+rect2.width
  maxY = rect1.y+rect1.height >= rect2.y+rect2.height ? rect1.y+rect1.height : rect2.y+rect2.height
  minX = rect1.x <= rect2.x ? rect1.x : rect2.x
  minY = rect1.y <= rect2.y ? rect1.y : rect2.y

  if(maxX - minX <= rect1.width+rect2.width && maxY - minY <= rect1.height+rect2.height){
    return true
  }else{
    return false
  }
}
```
```js
// 从反面看问题比较简单。先判断什么情况下两个矩形不会相交。
// 与之相反时，两个矩形相交。
// 两个矩形不相交时，有四种情况，
// 1. 当 RectB 在 RectA 左边
// 2. 当 RectB 在 RectA 右边
// 3. 当 RectB 在 RectA 上面
// 4. 当 RectB 在 RectA 下面
function checkIntersect(RectA, RectB) {
  nonIntersect =
    (RectB.right < RectA.left) ||
    (RectB.left > RectA.right) ||
    (RectB.bottom < RectA.top) ||
    (RectB.top > RectA.bottom);
  //相交
  intersect = !nonIntersect;
}
```
## 验证版本号
```js
// 要求，必须是三位，x.x.x的形式，
// 每位x的范围分别为1-99,0-99,0-99。
// 不允许的情况0.x.x；01.x.x; x.0x.x; x.00.x； x.x.00; x.x.0x
/^(V)([1-9]d|[1-9])(.([1-9]d|d)){2}$/.test('V1.0.0') // true 匹配V1.0.0或者V10.1.11
```
## 实现flat(或者flat(n))(拍平数组)
```js
//flat()
Array.prototype.flatArr = function flatArr() {
  let arr = this
  let reArr = []
  const flat = (arr) => {
    arr.forEach((item) => {
      if (item instanceof Array) {
        flat(item)
      } else {
        reArr.push(item)
      }
    })
  }
  flat(arr);
  return reArr;
}
let arr = [1, 2, [3, 4], [10, [11, 12]], [5, [6, [7, [8, [9]]]]]]
console.log(arr.flatArr())   // [1, 2, 3, 4, 10, 11, 12, 5, 6, 7, 8, 9]
console.log(arr.flat(Infinity)) // [1, 2, 3, 4, 10, 11, 12, 5, 6, 7, 8, 9]
```
```js
// reduce
const myFlat = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur);
  }, [])
}
let arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]]];
console.log(myFlat(arr));
```
```js
// 栈的思想实现 flat 函数
Array.prototype.flat = function () {
  const stack = [...this];
  const result = [];
  while (stack.length > 0) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  return result.reverse();
}
let arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]]];
console.log(arr.flat())
```
```js
// Generator 实现 flat 函数
function* flat(arr, num) {
  if (num === undefined) num = 1;
  for (const item of arr) {
    if (Array.isArray(item) && num > 0) {   // num > 0
      yield* flat(item, num - 1);
    } else {
      yield item;
    }
  }
}
let arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]]];
console.log([...flat(arr, 3)]);
```
```js
// 实现falt(n)
Array.prototype.myFlat = function (num) {
  if (num == 0) {
    return this;
  }
  if (typeof num != 'number') {
    throw Error('num must be a number')
  }
  let flag = true;
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (this[i] instanceof Array) {
      newArr.push(...this[i]);
      flag = false;
    } else {
      newArr.push(this[i]);
    }
  }
  if (num < 0 || flag) {
    return this;
  } else {
    --num;
    newArr = newArr.myFlat(num);
    return newArr
  }
}
let arr = [1, 2, [2, 3], [10, 11], [3, [4, [5, [6, [7, [8, [9]]]]]]]];
console.log(arr.myFlat(2));//调用方式
```
##  对角线遍历
```js
var findDiagonalOrder = function (mat) {
  const row = mat.length
  const col = mat[0].length
  const record = new Map()
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const key = i + j
      if (!record.has(key)) record.set(key, [])
      record.get(key).push(mat[i][j])
    }
  }

  const res = []
  for (const [key, nums] of record.entries()) {
    key % 2 === 1 ? res.push(...nums) : res.push(...nums.reverse())
  }
  return res
};
```
## 让字符串成为回文串的最少插入次数
```js
// 最后要变成一个回文字符串，那么最终最左侧和最右侧的字符一定要是相同的。
// 如果不一样呢？这时候我们可以进行填补。可是填补的方式有两种：

// 我们可以在左侧填补一个最右侧的字符，这时候左侧可以继续向前遍历。
// 我们可以在右侧填补一个最左侧的字符，这时候右侧可以继续向前遍历。

// 想知道区间 [left, right] 范围里的最优解，那么可能存在两种情况，
// 即 s[left] === s[right] 或者 s[left] !== s[right]。
// 即 0 + [left + 1, right - 1] 和 1 + min([left + 1, right], [left, right - 1])。

// 如果写成一个递推公式的话可以是：
// f(left, right) = s[left] === s[right] ? f(left + 1, right - 1) : 1 + min(f(left + 1, right), f(left, right - 1))
const minInsertions = s => {
  const len = s.length;
  const dp = new Array(len + 1).fill(0).map(() => new Array(len + 1).fill(0))
  for (let i = 0; i < len; ++i) {
    dp[i][i + 1] = s[i] === s[i + 1] ? 0 : 1;
  }
  console.log(dp)
  for (let i = 2; i < len; ++i) {
    for (j = 0; j < len - i; ++j) {
      dp[j][j + i] = s[j] === s[j + i]
        ? dp[j + 1][j + i - 1]
        : 1 + Math.min(dp[j + 1][j + i], dp[j][j + i - 1]);
    }
  }
  return dp[0][len - 1];
};
```
```js
尝试一下把空间复杂度压缩到 O(n)O(n)，即不是用二维数组，只是用一维数组来记录递推的中间值。

不过这里要注意的是，由于我们无法保存所有历史的中间值，所以我们的遍历递推方向做出了一点调整
const minInsertions = s => {
  const len = s.length;
  const dp = new Array(len).fill(0);
  for (let i = len - 2; i >= 0; i--) {
    let prev = 0;
    for (let j = i + 1; j < len; j++) {
      const tmp = dp[j];
      dp[j] = s[i] === s[j] ? prev : 1 + Math.min(dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[len - 1];
};
```
## 链表转数组
1. 数组是连续存储的，⽽链表不是连续存储的。
2. 数组可以随机访问，⽽链表不能，查找只能顺着链⼦遍历下去。
3. 数组的插⼊操作为O(n)，⽽链表的插⼊操作为O(1)。
```js
function list2array(head) {
  if (!head) {
    return []
  }
  var result = []
  var p = head
  while (p) {
    result.push(p.value)
    p = p.next
  }
  return result
}
```
```js
//递归
function list2array(head) {
  if (!head) {
    return []
  }
  var result = [head.value]
  var restValues = list2array(head.next)
  return result.concat(restValues)
}
```
## 数组转链表
```js
//易懂版
function array2list(ary) {
  if (ary.length === 0) {
    return null
  }
  var nodes = []
  for (var i = 0; i < ary.length; i++) {
    var node = {}
    node.value = ary[i]
    node.next = null
    nodes.push(node)
  }
  for (var i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1]
  }
  return nodes[0]
}
```
```js
//不占用额外空间
function array2list(ary) {
  if (!ary.length) {
    return null
  }
  var node
  var head = { value: ary[0], next: null }
  var pnode = head  //pnode变量⽤来保存前⼀个节点
  for (var i = 1; i < ary.length; i++) {
    node = { value: ary[i], next: null }
    pnode.next = node   //将前⼀个节点的next指向当前节点
    pnode = node   //将node赋值给pnode
  }
  return head
}
```
```js
//递归
function array2list(ary, start = 0) {
  if (start === ary.length) {
    return null
  }
  var node = {
    value: ary[start],
    next: null
  }
  var rest = array2list(ary, start + 1)
  node.next = rest
  return node
}
```
## 手写实现链表
```js
// get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回 - 1。
    // addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
    // addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
    // addAtIndex(index, val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
    // deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。

    //先定义节点
    class linkNode {
      val;
      next;
      constructor(val, next) {
        this.val = val;
        this.next = next
      }
    }

    //定义链表
    //链表包含头指针，尾指针，和链表长度
    class linkedList {
      constructor() { //初始化一个空链表
        this._size = 0;
        this._head = null;  //头结点
        this._tail = null;  //尾节点
      }
      //在头节点前加入节点
      addAtHead(val) {
        let node = new linkNode(val, this._head)    //在头指针前加入，就算让这个节点指向头结点。 
        this._head = node       //因为实在最前面加入的，就是把加入的这个节点变成头结点
        this._size++
        if (!this._tail) {
          this._tail = node   //当通过这个方法创建第一个节点时，尾指针是空。这个元素就即时头指针也是尾指针。
        }
      }

      //在末尾加入节点
      addAtTail(val) {
        let node = new linkNode(val, null)
        if (this._tail) {           //当存在尾节点时，就可以直接改变尾指针的内容
          node = this._tail.next
          this._tail = node
        } else {                    //当不存在尾节点时，该表为空表，加入的这个节点即使头结点，又是尾节点
          this._tail = node
          this._head = node
        }
      }

      //在链表中的第 index 个节点之前添加值为 val 的节点。
      addAtIndex(index, val) {
        if (index > this._size) {
          return "索引不存在"
        }
        if (index == 0) {
          //当索引值时0时，复刻在头结点创建的过程
          let node = new linkNode(val, this._head)
          this._head = node
          this._size++
          if (!this._tail) {
            this._tail = node
          }
        }
        else {
          let courent = this._head
          let count = 0
          while (count < index - 1) {
            courent = courent.next
            count++
          }
          let node = new linkNode(val, courent.next)
          courent.next = node
          //如果时在链表尾部创建的话
          if (index == this._size) {
            this._tail = node
          }
          this._size++
        }

      }

      //根据索引获取节点,参数是 index 这里索引是从0开始的
      getByIndex(index) {
        if (index < 0 || index >= this._size) {
          return "索引无效"
        }
        let count = 0;
        let cur = this._head
        while (count != index) {
          cur = cur.next
          count++
        }
        return cur.val
      }

      //在删掉索引处的节点
      deleteAtIndex(index) {
        //先判断索引是否有效
        if (index < 0 || index >= this._size) {
          return "索引无效"
        }

        //删除头结点时：
        if (index == 0) {
          this._head = this._head.next
          //当链表只有一位时，即头结点和为节点相同就需要把头节点和尾节点都删掉
          if (this._size == 1) {
            this._tail = null
          }
          this._size--
        }
        //正常删除情况：
        else {
          var count = 0;
          var cur = this._head
          while (count != index - 1) {
            cur = cur.next
            count++
          }
          cur.next = cur.next.next
          //如果删除的时最后一个节点，需要改变尾节点的位置
          if (index + 1 == this._size) {
            this._tail = cur
          }
          this._size--
        }
      }
    }

    var listOne = new linkedList()
    listOne.addAtHead(2)
    listOne.addAtHead(5)
    listOne.addAtHead(100)
    listOne.addAtHead(5200)
    listOne.addAtIndex(4, 111)

    console.log(listOne)
    // console.log(listOne._head.next)
    // console.log(listOne.getByIndex(1))
```
## 两个有序数组，求第k大的数
```js
//双指针
function func(num1, num2, k) {
      let i = 0, j = 0, n = 0;
      while (i < num1.length || j < num2.length) {
        n += 1;
        if (i < num1.length && j < num2.length) {
          if (num1[i] < num2[j]) {
            if (n === k) {
              return num1[i]
            }
            i += 1;
          } else {
            if (n === k) {
              return num2[i]
            }
            j += 1;
          }
        } else if (i < num1.length) {
          if (n === k) {
            return num1[i]
          }
          i += 1;
        } else {
          if (n === k) {
            return num2[i]
          }
          j += 1;
        }
      }
    }
    console.log(func([1, 5, 7, 8], [2, 3, 4], 7))
```
```js
//二分法
// 要找第两个数组的第k大，可以找num1[k / 2]， 和num2[k / 2]，如果这俩相等，那他俩就是第k大。
    // 比如在下面的俩数组中找第4大的，我们发现num1的第2个和num2的第2个相等，那就返回[3] 就好了。

    // num1 = [1, 3, 5]
    // num2 = [2, 3, 4]

    // 如果num1的第2个 > num2的第2个，那就不要num2的前俩了，因为肯定不是第4大。
    // 然后把num2剩余的元素，也就是[4]放入下一次递归，此时k = 4 - 2 = 2，因为已经排除俩了。

    // num1 = [1, 3, 5]
    // num2 = [1, 2, 4]
    function func2(a, b, k) {
      // 这里使用较短的数组作为a，保证不越界
      if (a.length > b.length) {
        func2(b, a, k);
      }
      if (!a.length) {
        return b[k - 1];
      }
      if (k == 1) {
        return Math.min(a[0], b[0]);
      }
      let p1 = Math.floor(k / 2) < a.length ? Math.floor(k / 2) : a.length;
      let p2 = k - p1;
      if (a[p1 - 1] < b[p2 - 1]) {
        return func2(a.slice(p1), b, k - p1);
      } else if (a[p1 - 1] > b[p2 - 1]) {
        return func2(a, b.slice(p2), k - p2);
      } else {
        return a[p1 - 1];
      }
    }

    console.log(func2([1, 5, 6, 7, 8, 10], [2, 3, 4, 9], 10))
```
## flex布局space-between最后一行布局问题
```html
<!-- 如果一行想添加的子元素item为n个
那么在最后一行加入（n-2）个span，再给span添加宽度即可 -->
<div class="container">
  <div class="item item1">1</div>
  <div class="item item1">2</div>
  <div class="item item1">3</div>
  <div class="item item1">4</div>
  <div class="item item1">5</div>
  <div class="item item1">6</div>
  <div class="item item1">7</div>

  <span></span>
  <span></span>
</div>
```
```css
.container {
  width: 700px;
  background-color: orange;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
  background-color: green;
}

.container span {
  width: 150px;
}

/* 或者加伪元素 */
/* .container:after {
  content: '';
  width: 150px;
} */
```
## 获取二级域名
```js
let s = window.location.href;// https://ejym.baidu.com
console.log(s.split('.')[0].split("//")[1]);//ejym
```
## 将普通对象转化为迭代器对象+for of遍历
要让对象能够被for in遍历，就需要实现Symbol.iterator接口，用ES6 的Generator生成器来给Object添加一个迭代器。
```js
let d = {
  a: 100,
  b: 200
}
Object.prototype[Symbol.iterator] = function* () {
  const arr = Object.entries(this)// Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
  const len = arr.length
  for (let i = 0; i < len; ++i) {
    yield { [arr[i][0]]: arr[i][1] }
  }
}
for (let p of d) {
  console.log(p);
}
```
## 随机生成颜色
```js
// 十六进制颜色
const randomColor = () => `#${Math.random().toString(16).substr(2, 6)}`;    
console.log(randomColor());

```
```js
// RGB格式
function rgb(){//rgb颜色随机
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var rgb = '('+r+','+g+','+b+')';
			return rgb;
		}
```
```js
// 颜色RGB转十六进制
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);   

rgbToHex(0, 51, 255); 
```
## 正则提取(英文中文数字)
```js
提取数字....value.replace(/[^\d]/g,'')
提取中文....value.replace(/[^\u4E00-\u9FA5]/g,'')
提取英文.....value.replace(/[^a-zA-Z]/g,'')
```
## intanceof
```js
function intanceog(obj, target){
  while(obj != null){
    if(obj == target.prototype) return true;
    obj = obj.__proto__
  }
  return false
}
```
## 字符串消消乐
```js
function fn(s) {
  let stack = [s[0]];
  for (let i = 1; i < s.length; i++) {
    if (s[i] === stack[stack.length - 1]) {
      while (stack.length && s[i] === stack[stack.length - 1]) {
        i++;
      }
      stack.pop();
      i--;
    } else {
      stack.push(s[i])
    }
  }
  return stack;
}
```
## 若有三个或以上的相连相同字母,则'削去'这个字母直⾄只剩⼀个
```js
let text = 'sdkaaaajnnakkk ';
let arr = text.match(/([a-z])\1\1+/g);//['aaaa','kkk'
for (let i = 0; i < arr.length; i++) {
  text = text.replace(arr[i], arr[i].slice(0, 1))
}

console.log(text);
```
## 写代码循环输出1 2
```js
var c = 1;
function a() {
  if (c) {
    c = !c;
    console.log(1);
    return;
  } else {
    c = !c;
    console.log(2);
    return;
  }
}

a() // 1
a() // 2
a() // 1
a() // 2
```
```js
let obj = {};
let c = 1;
Object.defineProperty(obj, 'x', {
  get() {
    if (c) {
      c = !c;
      return 1;
    } else {
      c = !c;
      return 2
    }
  },
  set() {
  }
})

function a() {
  console.log(obj.x)
}

a() // 1
a() // 2
a() // 1
a() // 2
```
## 写代码输出1 2 3 4
```js
let obj = {};
let c = 1;
Object.defineProperty(obj, 'x', {
  get() {
    return c++;
  },
})

console.log(obj.x);//1
console.log(obj.x);//2
console.log(obj.x);//3
console.log(obj.x);//4
```
## 获取对象的原型链
```js
//  图形通用原型
    var shapeProto = {
      getType() {
        return this.type !== undefined ? this.type : 'Shape';
      }
    },
      circleProto;
    //  声明形状类
    function Shape(type) {
      this.type = type;
    }
    //  设置Shape的原型
    Shape.prototype = shapeProto;
    //  创建圆形类
    function Circle(radius) {
      this.radius = radius;
      this.getRadius = function () {
        return this.radius;
      }
    }
    //  设置圆形类的原型
    circleProto = new Shape('Circle')
    Circle.prototype = circleProto;
    //  初始化圆形对象
    var c1 = new Circle(10);
    console.log(c1.getType());   //  输出Circle
    //  只能获取直接父原型
    // console.log(Object.getPrototypeOf(c1) === circleProto);   //  输出true
    // console.log(Object.getPrototypeOf(c1) === shapeProto);    //  输出false
    // console.log(circleProto.isPrototypeOf(c1));   //  输出true
    // console.log(shapeProto.isPrototypeOf(c1));    //  输出true    

    //  获取对象的原型链
    function getPrototypeChain(obj) {
      var result = [],
        proto = obj;
      while (proto != null) {
        proto = Object.getPrototypeOf(obj);//proto = proto.__proto__
        if (proto != null) {
          result.push(proto);
          obj = proto;
        }
      }
      return result;
    }
    //  protoChain为[circelProto, shapeProto, Object.prototype]
    var protoChain = getPrototypeChain(c1);
    console.log(protoChain);
```