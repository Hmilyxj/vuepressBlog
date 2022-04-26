---
title: Generator函数的理解和使用
date: 2022-3-12
subSidebar: "auto"
isShowbgImage: false
categories:
  - 知识拓展
tags: 
  - 基础概念
  - 前端
---
:::tip
Generator函数的理解和使用
Generator 函数是 ES6 提供的一种异步编程解决方案。
:::

## 一、异步编程
1、所谓“异步”，简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

## 二、什么是Generator？
语法上，可以把理解成，Generator 函数是一个状态机，封装了多个内部状态。

形式上，Generator 函数是一个普通函数。

整个Generator函数就是一个封装的异步任务，或者说是异步任务的容器，异步操作需要暂停的地方，都用yield语句。

Generator函数特征：
（1）function 关键字和函数之间有一个星号(*),且内部使用yield表达式，定义不同的内部状态。

（2）调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象。

## 三、定义Gernerator函数
```js
function* fn(){   // 定义一个Generator函数
    yield 'hello';
    yield 'world';
    return 'end';
}
var f1 =fn();           // 调用Generator函数
console.log(f1);        // fn {[[GeneratorStatus]]: "suspended"}
console.log(f1.next()); // {value: "hello", done: false}
console.log(f1.next()); // {value: "world", done: false}
console.log(f1.next()); // {value: "end", done: true}
console.log(f1.next()); // {value: undefined, done: true}
```
但是，调用Generator函数后，函数并不执行，返回的也不是函数执行后的结果，而是一个指向内部状态的指针对象。

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。即：每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。

Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

Generator函数的暂停执行的效果，意味着可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield语句下面，反正要等到调用next方法时再执行。所以，Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

## 四、yield表达式和next()方法
Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。

yield表达式就是暂停标志。

yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行。

使用yield需注意：

（1）yield语句只能用于function* 的作用域，如果function* 的内部还定义了其他的普通函数，则函数内部不允许使用yield语句。

（2）yield语句如果参与运算，必须用括号括起来。
```js
// 定义一个Generator函数
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
console.log(a.next()); // Object{value:6, done:false} 第二次运行next方法的时候不带参数，导致y的值等于2 * undefined（即NaN），除以3以后还是NaN
console.log(a.next()); // Object{value:NaN, done:false} 第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。
console.log(a.next()); // Object{value:NaN, done:true}

var b = foo(5);
console.log(b.next());   // {value:6, done:false } 第一次调用b的next方法时，返回x+1的值6
console.log(b.next(12)); // {value:8, done:false } 第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；
console.log(b.next(13)); // {value:42, done:true } 第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。
```
## 五、Genarator函数使用示例
- 1、输出斐波那契数列
```js
function *fibonacci(){
    let [pre, cur] = [0,1];
    for(;;){
        [pre, cur] = [cur, pre+cur];
        yield cur;
    }
}
for(let n of fibonacci()){
    if( n>1000 )
        break;
    console.log(n);
}
```
- 2、遍历完全二叉树
```js
function* preOrder(root){ // 前序遍历
    if(root){
        yield  root.mid;
        yield* preOrder(root.left);
        yield* preOrder(root.right);
    }
}
function* inOrder(root){  // 中序遍历
    if(root){
        yield* inOrder(root.left);
        yield  root.mid;
        yield* inOrder(root.right);
    }
}
function* postOrder(root){ // 后序遍历
    if(root){
        yield* postOrder(root.left);
        yield* postOrder(root.right);
        yield  root.mid;
    }
}
function Node(left, mid, right){  // 二叉树构造函数
    this.left = left;
    this.mid = mid;
    this.right = right;
}
function binaryTree(arr){         // 生成二叉树
    if(arr.length == 1){
        return new Node(null, arr[0], null);
    }
    return new Node(binaryTree(arr[0]), arr[1], binaryTree(arr[2]));
}

// 完全二叉树节点
let bTree = binaryTree([[['d'], 'b', ['e']], 'a', [['f'], 'c', ['g']]]);

// 遍历结果
var preResult = [];
for(let node of preOrder(bTree)){  // 前序遍历结果
    preResult.push(node);
}
console.log(preResult);            // (7) ["a", "b", "d", "e", "c", "f", "g"]

var inResult = [];
for(let node of inOrder(bTree)){   // 中序遍历结果
    inResult.push(node);
}
console.log(inResult);              // (7) ["d", "b", "e", "a", "f", "c", "g"]

var postResult = [];
for(let node of postOrder(bTree)){  // 后序遍历结果
    postResult.push(node);
}
console.log(postResult);            // (7) ["d", "e", "b", "f", "g", "c", "a"]
```
- 3、 Genarator 逐行读取文本文件
```js
function* readFileByLine(){
    let file = new FileReader("a.txt");
    try{
        while(!file.eof){
            yield parseInt(file.readLine(), 10); // 使用yield表达式可以手动逐行读取文件
        }
    }finally{
        file.close();
    }
}

var r = readFileByLine();
r.next();
```
- 4、Genarator 部署Ajax操作
```js
function* main(){ // 通过 Ajax 操作获取数据
    var result = yield request("http://some.url");
    var res = JSON.parse(result);
    console.log(res.value);
}
function request(url){
    makeAjaxCall(url, function(res){
        it.next(res);
    })
}
var it = main();
console.log(it.next());
```
-  5、Genarator 对任意对象部署Iterator接口
```js
function* deployObjectInterface(obj){
    let keys = Object.keys(obj);
    for(let i=0; i<keys.length; i++){
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let obj = {name:"Cynthia", age:21 };
for(let[key, value] of deployObjectInterface(obj)){
    console.log(key, value); 
}
// name Cynthia
// age 21
```
- 6、Genarator 对数组部署Iterator接口
```js
function* deployArrayInterface(arr){
    var nextIndex = 0;
    while(nextIndex < arr.length){
        yield arr[nextIndex++];
    }
}
var arr = deployArrayInterface(['name', 'age']);

console.log(arr.next());       // {value: "name", done: false}
console.log(arr.next().value); // name
console.log(arr.next().done);  // false

console.log(arr.next().value); // age
console.log(arr.next().done);  // true

console.log(arr.next().value); // undefined
console.log(arr.next().done);  // true
```