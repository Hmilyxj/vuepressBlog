---
title: 前端编程题之三大件
date: 2021-11-10
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端编程
tags: 
  - 编程题
  - 前端
  - 面试
---

:::tip
这是一些前端面试的编程题
:::
<!-- more -->

##  购物车(表格)
![](/code01.png)
![](/code02.png)
``` js
function add(items) {
  var tbody = document.getElementsByTagName(tbody);
  var tfoot = document.getElementsByTagName(tfoot);
  let count = tbody.children.length;
  let totalPrice = parseFloat(tfoot.innerText.match(/\d+.\d+/[0]));
  let tr = '';
  for (let i = 0; i < items.length; i++) {
    count += 1;
    totalPrice += items[i].peice;
    tr += `<tr>
      <td>${items[i].name}</td>
      <td>${items[i].price.toFixed(2)}</td>
      <td><a href = "#">删除</a></td>
    </tr>`
  }
  tbody.innerHTML += tr;
  tfoot.innerHTML = `<tr>
    <td>总计</td>
    <td colspan='2'>${totalPrice.parseFloat.toFixed(2)}(${count}件商品)</td>
  </tr>`
}

function bind() {
  var tbody = document.getElementsByTagName(tbody);
  var tfoot = document.getElementsByTagName(tfoot);
  tbody.addEventListener('click', function (e) {
    let price = parseFloat(e.target.parentElement.parentElement.innerText.match(/\d+.\d+/[0]));
    let totalPrice = tfoot.innerText.match(/\d+.\d+/[0]);
    e.target.parentElement.parentElement.remove();
    tfoot.innerHTML = `<tr>
    <td>总计</td>
    <td colspan='2'>${(totalPrice - price).toFixed(2)}(${count - 1}件商品)</td>
  </tr>`
  })
}
bind();
``` 

##  表格排序
![](/code03.png)
![](/code04.png)
``` js
function sort(type, order) {
  var parent = document.getElementsById('jsList');
  var trs = parent.children;
  var map = ['id', 'price', 'sales'];
  var col = map.indexOf(type);
  [].slice.call(trs).sort(function (l, n) {
    let lt = l.children[col].innerHTML;
    let nt = n.children[col].innerHTML;
    return order == 'desc' ? nt - lt : lt - nt;
  }).map(function (el) {
    parent.appendChild(el);
  })
}
```

##  替换链接
![](/code05.png)
``` js
function link() {
  var el = document.querySelector('#jsContainer');
  let reg = /(http?:\/\/)?(www\.\w+(\.(com|cn))*([?]\w+=\w*(&\w+=\w*)*)?(#\w+)?)/g;
  el.innerHTML = el.innerHTML.replace(reg, function (...args) {
    if (args[1]) {
      return `<a target="_blank" href="${args[1]}${args[2]}">${args[0]}</a>`;
    } else {
      return `<a target="_blank" href="https://${args[2]}">${args[0]}</a>`;
    }
  })
}
```

##  倒计时(天时分秒)
![](/code06.png)
``` js
function second(second) {
  var day = Math.floor(second / (3600 * 24));
  var hour = Math.floor((second % (3600 * 24)) / 3600);
  var min = Math.floor(((second % (3600 * 24)) % 3600) / 60);
  var second = Math.floor((((second % (3600 * 24)) % 3600) % 60) % 60);
  return { day, hour, min, second };
}

function render(data) {
  let oDiv = document.getElementsById('jsCountdown');
  let aSpans = oDiv.children;
  if (data.day == 0) {
    aSpans[0].setAttribute("class", "hide");
  } else {
    aSpans[0].innerHTML = `${data.day < 10 ? '0' + data.day : data.day}天`;
    aSpans[1].innerHTML = `${data.hour < 10 ? '0' + data.hour : data.hour}时`;
    aSpans[2].innerHTML = `${data.min < 10 ? '0' + data.min : data.min}分`;
    aSpans[3].innerHTML = `${data.second < 10 ? '0' + data.second : data.second}秒`;
  }
}
```

##  双色球机选
![](/code07.png)
![](/code08.png)
``` js
randomFn();

function randomFn() {
  var activeRed = [];
  var num1;
  while (activeRed.length < 6) {
    num1 = Math.floor(33 * Math.random() + 1);
    if (num1 <= 9 && activeRed.indexOf(num1) == -1) {
      activeRed.push('0' + num1);
    }
    if (num1 > 9 && activeRed.indexOf(num1) == -1) {
      activeRed.push('' + num1);
    }
  }
  activeRed.sort();

  var otherRed = [];
  for (let i = 1; i <= 33; i++) {
    if (i <= 9 && activeRed.indexOf('0' + i) == -1) {
      otherRed.push('0' + i);
    }
    if (i > 9 && activeRed.indexOf('' + i) == -1) {
      otherRed.push('' + i);
    }
  }

  var num2 = Math.floor(16 * Math.random() + 1);
  activeBlue = num2 <= 9 ? '0' + num2 : '' + num2;

  var otherBlue = [];
  for (let i = 1; i <= 16; i++) {
    if (i <= 9 && activeBlue != '0' + i) {
      otherRed.push('0' + i);
    }
    if (i > 9 && activeBlue != '' + i) {
      otherRed.push('' + i);
    }
  }

  var red = document.getElementsByClassName("balls-wp")[0].children;
  var blue = document.getElementsByClassName("balls-wp")[1].children;

  for (let m = 0; m < 33; m++) {
    if (m < 6) {
      red[m].innerText = activeRed[m];
      red[m].classList.add("active");
    } else {
      red[m] = otherRed[m - 6];
    }
  }
  for (let n = 0; m < 16; n++) {
    if (n == 0) {
      blue[n].innerText = activeBlue;
      blue[n].classList.add("active");
    } else {
      blue[n] = otherRed[n - 1];
    }
  }

  return activeRed.join(',') + "|" + activeBlue;
}
```

##  智能提示
![](/code09.png)
``` js
function suggest(items) {
  let ipt = document.querySelector('.js-input').value;
  let dv = document.querySelector('.js-suggest');
  let ul = document.querySelector('ul');
  let len = ul.children.length;

  //清空ul
  for (let i = 0; i < len; i++) {
    let li = document.querySelector('li')
    ul.remove(li);
  }

  ipt = ipt.trim();
  //输入为空
  if (!ipt) {
    dv.classList.add('hide');
    return;
  }

  //构造reg
  let reg = '';
  const regKey = ['(', ')', '.', '?', '^', '/', '\\', '*', '[', ']', '|', '+', '{', '}', '$']
  for (let i of ipt) {
    if (regKey.includes(i)) {
      i = '\\' + i;
    }
    reg += i + '.*?';
  }
  reg = new RegExp(reg);

  for (let i of items) {
    if (reg.test(i)) {
      let tip = document.createElement('li');
      tip.innerHTML = i;
      ul.appendChild(tip);
    }
  }
  dv.appendChild(ul);
  //考虑没匹配成功
  if (ul.children.length) {
    dv.classList.remove('hide');
  } else {
    dv.classList.add('hide');
  }
}
```

##  文字输出
![](/code10.png)
``` js
function output(str) {
  var content = document.getElementsByClassName('content')[0];
  var jsBlink = document.getElementsById('jsBlink');
  while (content.firstElementChild != jsBlink) {
    content.remove(content.firstChild);
  }
  str = str.split(' ');
  for (let i = 0; i < str.length; i++) {
    if (str[i] == ' ') {
      str[i] = '&nbsp';
    }
    if (str[i] == '<') {
      str[i] = '&lt';
    }
    if (str[i] == '>') {
      str[i] = '&gt';
    }
  }

  var index = 0;
  var timer = setInterval(function () {
    if (index == str.length) {
      clearInterval(timer);
    } else {
      if (str[index] == '\n') {
        let br = document.createElement('br');
        content.insertBefore(br, jsBlink);
      } else {
        let span = document.createElement('span');
        let colorIndex = Math.floor(Math.random() * 24 + 1);
        let className = 'color' + colorIndex;
        span.className = 'word' + className;
        span.innerHTML = str[index];
        content.insertBefore(span, jsBlink);
      }
      index += 1;
    }
  },200)
}
```

##  分页
![](/code11.png)
![](/code12.png)
``` js
function Pagination(container, total, current) {
  this.total = total;
  this.current = current;
  this.html = html;
  this.val = val;
  this.el = document.querySelector('.Pagination');
  if (!this.el) return;

  this.el.innerHTML = this.html();
  container.appendChild(this.el);
  //返回高亮的结果
  this.val();
  if (this.total <= 1) {
    this.el.className = 'hide';
  }

  function html() {
    //总页数小于1不需要填充字符
    if (this.total <= 1) return;
    var inHTML = '';
    //页数2-5只需显示页数，不需显示首页和末页
    if (this.total <= 5) {
      for (let i = 1; i <= this.total; i++) {
        if (i == this.current) {
          inHTML += '<li class="current">' + i + '</li>'
        } else {
          inHTML += '<li>' + i + '</li>'
        }
      }
    } else {
      //页数在6以上
      //高亮页小于5
      if (this.current <= 5) {
        //高亮页+2<=5,不需要换页，不会出现首页
        if (this.current + 2 <= 5) {
          //范围会在1-5
          for (let i = 1; i <= 5; i++) {
            if (i == this.current) {
              inHTML += '<li class="current">' + i + '</li>'
            } else {
              inHTML += '<li>' + i + '</li>'
            }
          }
        } else {
          //高亮页+2>5
          inHTML += '<li>首页</li>'
          //保持高亮前后各有两页
          for (let i = this.current - 2; i <= this.current + 2; i++) {
            if (i == this.current) {
              inHTML += '<li class="current">' + i + '</li>'
            } else {
              inHTML += '<li>' + i + '</li>'
            }
          }
        }
        //加上末页
        inHTML += '<li>末页</li>'
      } else {
        //高亮页大于5
        //保持高亮前后各有两页
        inHTML += '<li>首页</li>'
        if (this.current + 2 <= this.total) {
          for (let i = this.current - 2; i <= this.current + 2; i++) {
            if (i == this.current) {
              inHTML += '<li class="current">' + i + '</li>'
            } else {
              inHTML += '<li>' + i + '</li>'
            }
          }
        } else {
          //保持高亮不满足前后各有两页
          //范围在(this.total - 4)-this.total
          //this.current + 2 <= this.total所以要么高亮是末页
          //要么高亮页后一页是末页，首页与末页相差4
          for (let i = this.total - 4; i <= this.total; i++) {
            if (i == this.current) {
              inHTML += '<li class="current">' + i + '</li>'
            } else {
              inHTML += '<li>' + i + '</li>'
            }
          }
        }
        //判断是否加上末页
        if (this.current + 2 < this.total) {
          inHTML += '<li>末页</li>'
        }
      }
    }
    return inHTML;
  }

  function val(current) {
    if (arguments.length === 0) return this.current;
    if (current < 1 || current > this.total || current === this.current) return;
    this.current = current;
    this.el.innerHTML = this.html();
  }
}
```

##  移动控制
![](/code13.png)
``` js
function bind() {
  document.onkeydown = event => {
    if (!event) return;
    var code = event.keyCode || '';
    if (!{ '37': 1, '38': 1, '39': 1, '40': 1 }[code]) return;
    event.preventDefault && event.preventDefault();

    var tr = document.querySelector('tr');
    var ml = document.querySelector('tr').length;
    var td = document.querySelector('tr:frist-of-type td');
    var nl = document.querySelector('tr:first-of-type td').length;
    var tdAll = document.querySelector('td');
    var temp;
    for (let i = 0; i < tdAll; i++) {
      if (tdAll[i].className == 'current') {
        tmp = i;//记录选中元素的下标
        tdAll[i].className = '';//移去样式
        break;
      }
    }
    var row = parseInt(temp / ml);
    var col = temp % nl;

    if (code == '37') {//左
      if (col == '0') {//到最后一列
        tr[row].querySelector('td:nth-of-type(' + Number(nl) + ')').className = 'current';
      } else {//列 - 1
        tr[row].querySelector('td:nth-of-type(' + Number(col) + ')').className = 'current';
      }
    } else if (code == '39') {//右
      if (col == nl - 1) {//到第一列
        tr[row].querySelector('td:nth-of-type(1)').className = 'current';
      } else {//列 + 1
        tr[row].querySelector('td:nth-of-type(' + Number(col + 2) + ')').className = 'current';
      }
    } else if (code == '38') {//上
      if (row == '0') {//到最后一行
        tr[ml - 1].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current';
      } else {//行 - 1
        tr[row - 1].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current';
      }
    } else if (code == '40') {//下
      if (row == ml - 1) {//到第一行
        tr[0].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current';
      } else {//行 - 1
        tr[row + 1].querySelector('td:nth-of-type(' + Number(col + 1) + ')').className = 'current';
      }
    }
  }
}
```

##  dom节点转成json数据
![](/code14.png)
``` js
function dom2json() {
  const jsContainer = document.querySelector('#jsContainer');

  function domJson(dom) {
    var obj = {
      tag: getTagName(dom)
    }
    if (dom.nodeType == 1) {
      var attrs = getTagAttrs(dom);
      if (attrs) obj.attributes = attrs;
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

  return domJson(jsContainer);
}
```

##  设置标签
![](/code15.png)
``` js
var tagInput = {
  isInited: false,
  init: init,
  bindEvent: bindEvent,
  addTag: addTag,
  removeTag: removeTag
};
tagInput.init();

function init() {
  var that = this;
  if (that.isInited) return;
  that.isInited = true;
  //保存class为js-input的输入框的dom元素引用
  that.input = document.querySelector('.js-input');
  that.bindEvent();
}

function bindEvent() {
  var that = this;
  var input = that.input;
  if (!input) return;
  input.addEventListener('keydown', function (event) {
    //回车键
    var isEnter = event.keyCode === 13;
    //删除键
    var isDelete = event.keyCode === 8;
    (isEnter || isDelete) && event.preventDefault();
    isEnter && that.addTag();
    isDelete && that.removeTag();
  });
  input.parentNode.addEventListener('click', function () {
    input.focus();
  });
}

function addTag() {
  const text = this.input.value.trim();
  if (text === '') {
    this.input.value = '';
    return;
  }
  const spans = this.input.parentNode.querySelectorAll('.tag');
  const found = Array.from(spans).find(ele => ele.textContent === text);
  if (found) {
    this.input.value = '';
    return;
  }
  const span = document.createElement('span');
  span.classList.add('tag');
  span.innerHTML = text;
  this.input.parentNode.insertBefore(span, this.input);
  this.input.value = '';
}

function removeTag() {
  const text = this.input.value;
  if (text.length === 0) {
    const spans = this.input.parentNode.querySelectorAll('.tag');
    if (spans.length > 0) {
      this.input.parentNode.removeChild(spans[spans.length - 1])
    }
  }
}
```

##  选择组件
![](/code16.png)
![](/code17.png)
![](/code18.png)
``` js
function CheckGroup(renderTo, options, isMultiple) {
  var that = this;
  that.renderTo = renderTo;
  that.options = options;
  that.isMultiple = isMultiple;
  that.initHtml();
  that.initEvent();
}
CheckGroup.prototype.initHtml = fInitHtml;
CheckGroup.prototype.initEvent = fInitEvent;
CheckGroup.prototype.toggleEl = fToggleEl;
CheckGroup.prototype.isSelected = fIsSelected;
CheckGroup.prototype.val = fVal;

function fInitHtml() {
  var that = this;
  //拼接html字符串
  //单选组件加上class radius
  var sHtml = `<div class="checkgroup${that.isMultiple ? '' : ' radius'}">`;
  that.options.forEach(item => {
    sHtml += `<div data-val="${item.value}" class ="item">${item.text}</div>`;
  })
  sHtml += "</div>";
  that.renderTo.innerHTML = sHtml;
  //获取checkgroup的dom元素引用
  that.el = document.querySelector('.checkgroup');
}

function fInitEvent() {
  var that = this;
  that.el && that.el.addEventListener('click', function (event) {
    var item = event.target;
    item.classList.contains('item') && that.toggleEl(item);
  })
}

function fToggleEl() {
  var that = this;
  if (that.isSelected(item)) {
    //如果当前选中则取消选中
    item.classList.remove("selected");
    that.val();
  } else if (that.isMultiple) {
    //多选，未选中则选中为当前选项，否则取消
    item.classList.add('selected');
    that.val();
  } else {
    //单选，未选中则选中为当前选项，否则取消
    let prevSelectedNode = [...item.parentElement.childNodes].find(el => isSelected(el));
    prevSelectedNode && prevSelectedNode.classList.remove('selected');
    item.classList.add('selected');
    that.val();
  }
}

function fIsSelected() {
  //判断是否有selected,classList转成数组
  if ([...item.classList].includes('selected'))
    return item;
}

function fVal() {
  var that = this;
  //点击选择时进行结果返回的判断，因为点击选择时不需要传值
  if (arguments.length === 0) {
    var result = [];
    //获取高亮的选项元素
    var items = [...that.renderTo.childNodes[0].childNodes].filter(el => [...el.classList].includes('selected'));
    //获取高亮选项的data-val
    result = items.map(el => el.dataset.val);
    console.log(result);
    return result;
  }
  //初始选中状态的处理，防止单选时传递多个参数
  !that.isMultiple && values.length > 1 && (values.length = 1);
  //获取所有选项元素
  var items = that.renderTo.childNodes[0].childNodes;
  //指定元素加上高亮class
  items.forEach(item => {
    //val方法参数和返回值均为数组
    if (values.includes(item.dataset.val)) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  })
}
```

#  简易计算器
![](/code19.png)
``` js
var Calculator = {
  init: function () {
    var that = this;
    if (!that.isInited) {
      that.isInited = true;
      // 保存操作信息
      // total: Number, 总的结果
      // next: String, 下一个和 total 进行运算的数据
      // action: String, 操作符号
      that.data = {total: 0, next: '', action: ''};
      that.bindEvent();
    }
  },
  bindEvent: function () {
    var that = this;
    // 请补充代码：获取 .cal-keyboard 元素
    var keyboardEl = document.querySelector(".cal-keyboard");
    keyboardEl && keyboardEl.addEventListener('click', function (event) {
      // 请补充代码：获取当前点击的dom元素
      var target = event.path[0];
      // 请补充代码：获取target的 data-action 值
      var action = target.dataset.action;
      // 请补充代码：获取target的内容
      var value = target.innerText;
      if (action === 'num' || action === 'operator') {
        that.result(value, action === 'num');
      }
    });
  },
  result: function (action, isNum) {
    var that = this;
    var data = that.data;
    if (isNum) {
      data.next = data.next === '0' ? action : (data.next + action);
      !data.action && (data.total = 0);
    } else if (action === '清空') {
      // 请补充代码：设置清空时的对应状态
      data.total = 0;
      data.next = "";
      data.action = "";
    } else if (action === '=') {
      if (data.next || data.action) {
        data.total = that.calculate(data.total, data.next, data.action);
        data.next = '';
        data.action = '';
      }
    } else if (!data.next) {
      data.action = action;
    } else if (data.action) {
      data.total = that.calculate(data.total, data.next, data.action);
      data.next = '';
      data.action = action;
    } else {
      data.total = +data.next || 0;
      data.next = '';
      data.action = action;
    }
 
    // ���补充代码：获取 .origin-value 元素
    var valEl = document.querySelector(".origin-value");
    valEl && (valEl.innerHTML = data.next || data.total || '0');
  },
  calculate: function (n1, n2, operator) {
    n1 = +n1 || 0;
    n2 = +n2 || 0;
    if (operator === '÷') {
      // 请补充代码：获取除法的结果
      // 【需求】1、除法操作时，如果被除数为0，则结果为0
      if(n2 === 0) return 0;
      n1 /= n2;
      // 【需求】2、结果如果为小数，最多保留小数点后两位，如 2 / 3 = 0.67(显示0.67), 1 / 2 = 0.5(显示0.5)
      if(String(n1).split(".")[1] && String(n1).split(".")[1].length > 2){
        n1 = n1.toFixed(2);
      }
      return n1 * 1;
    } else if (operator === 'x') {
      // 请补充代码：获取乘法的结果
      return n1 * n2;
    } else if (operator === '+') {
      // 请补充代码：获取加法的结果
      return Number((n1 + n2).toFixed(2));
    } else if (operator === '-') {
      // 请补充代码：获取减法的结果
      return Number((n1 - n2).toFixed(2));
    }
  }
};
Calculator.init();
```