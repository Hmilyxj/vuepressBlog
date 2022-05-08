---
title: offer
date: 2021-2-02
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端编程
tags: 
  - 编程题
  - 前端
  - 面试
---
## 剑指 Offer 03. 数组中重复的数字(数字为0-n-1, 长度为n, nums[nums[i]] == nums[i])
找出数组中重复的数字。
在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
```js
var findRepeatNumber = function(nums) {
    let i = 0;
    while(i < nums.length){
        if(nums[i] == i){
            i++;
            continue;
        }

        if(nums[nums[i]] == nums[i]) 
        return nums[i];
        
        let tmp = nums[i];
        nums[i] = nums[tmp];
        nums[tmp] = tmp;
    }
};
```
## 剑指 Offer 04. 二维数组中的查找
在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
```js
var findNumberIn2DArray = function(matrix, target) {
    let i = matrix.length - 1, j = 0;
    while(i >= 0 && j < matrix[0].length){
        if(target < matrix[i][j]) i--;
        else if(target > matrix[i][j]) j++;
        else return true;
    }
    return false;
}
```
## 剑指 Offer 05. 替换空格
请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
```js
var replaceSpace = function(s) {
    let res = [];
    for(let i = 0; i < s.length; i++){
        if(s.charAt(i) === ' ')
        res.push("%20");
        else
        res.push(s.charAt(i));
    }
    return res.join('');
};
```
## 剑指 Offer 06. 从尾到头打印链表
输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
```js
var reversePrint = function(head) {
    let stack = [];
    while(head != null){
        let tmp = head.val;
        stack.push(tmp);
        head = head.next;
    }
    let res = new Array(stack.length);
    for(let i = 0; i < res.length; i++){
        res[i] = stack.pop();
    }
    return res;
};
```
## 剑指 Offer 07. 重建二叉树
输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。
```js
var buildTree = function(preorder, inorder) {
    const map = new Map();
    for(let i = 0; i < inorder.length; i++){
        map.set(inorder[i], i);
    }
    return recur(preorder, map, 0, 0 , inorder.length - 1);
};

var recur = function(preorder, map, root, left, right){
    if(left > right) return null;
    let node = new TreeNode(preorder[root]);
    let i = map.get(preorder[root]);
    node.left = recur(preorder, map, root + 1, left, i - 1);
    node.right = recur(preorder, map, i - left + root + 1, i + 1, right);
    return node;
}
```
## 剑指 Offer 09. 用两个栈实现队列
用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
```js
var CQueue = function() {
    this.stackA = [];
    this.stackB = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stackA.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.stackB.length){
        return this.stackB.pop();
    }
    if(!this.stackA.length) return -1;
    while(this.stackA.length){
        this.stackB.push(this.stackA.pop());
    }
    return this.stackB.pop();
};
```
## 剑指 Offer 10- I. 斐波那契数列

```js
var fib = function(n) {
    let a = 0, b = 1, sum = 0;
    for(let i = 0; i < n; i++){
        sum = (a + b)%1000000007;
        a = b;
        b = sum;
    }
    return a;
};
```
## 剑指 Offer 10- II. 青蛙跳台阶问题
一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
```js
var numWays = function(n) {
    let a = 1, b = 1, sum;
    for(let i = 0; i < n; i++){
        sum = (a + b) % 1000000007;
        a = b;
        b = sum;
    }
    return a;
};
```
## 剑指 Offer 11. 旋转数组的最小数字
把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为1。
```js
var minArray = function(numbers) {
    let i = numbers.length - 1;
    while(i > 0 && numbers[i - 1] <= numbers[i]){
        i--;
    }
    return numbers[i];
};
```
## 剑指 Offer 12. 矩阵中的路径
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
```js
var exist = function(board, word) {
    let words = word.split('');
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(dfs(board, words, i, j, 0))
            return true;
        }
    }
    return false;
};

var dfs = function(board, words, i, j, k){
    if(i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != words[k]) {
        return false;
    }
    if(k == words.length - 1)
    return true;
    board[i][j] = '\0';
    let res = dfs(board, words, i + 1, j, k + 1) || dfs(board, words, i - 1, j, k + 1) ||dfs(board, words, i, j + 1, k + 1) || dfs(board, words, i, j - 1, k + 1);
    board[i][j] = words[k];
    return res;
}
```
## 剑指 Offer 13. 机器人的运动范围
地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
```js
var movingCount = function (m, n, k) {
    // visited 用来记录走过的格子，避免重复
    const visited = Array(m).fill(0).map(_ => Array(n).fill(false));
    return dfs(visited, m, n, k, 0, 0, 0, 0);
};
var dfs = function(visited, m, n, k, i, j, si, sj) {
    // 对应开头所说的三个终止条件，超过k值、到达边界、走过的格子
    if (si + sj > k || i >= m || j >= n || visited[i][j]) return 0;
    else {
      visited[i][j] = true
      return 1+dfs(visited, m, n, k, i+1,j,(i+1)%10 !== 0 ? si+1 : si-8,sj)+dfs(visited, m, n, k, i,j+1,si,(j+1)%10 !== 0 ? sj+1 : sj-8);
    }
}
```
## 剑指 Offer 14- I. 剪绳子
给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
```js
var cuttingRope = function(n) {
    if(n <= 3) return n - 1;
    let a = Math.floor(n / 3), b = n % 3;
    if(b == 0) return parseInt(Math.pow(3, a));
    if(b == 1) return parseInt(Math.pow(3, a - 1)*4);
    return parseInt(Math.pow(3, a)*2);
};
```
## 剑指 Offer 15. 二进制中1的个数
编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为 汉明重量).）。
```js
var hammingWeight = function(n) {
    let ans = 0;
    while(n != 0){
        ans += n & 1;
        n >>>= 1;
    }
    return ans;
};
```
## 剑指 Offer 16. 数值的整数次方
实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。
```js
var myPow = function(x, n) {
    let b = n;
    let res = 1.0;
    if(b < 0){
        b = -b;
        x = 1 / x;
    }

    while(b > 0){
        if(b % 2.0 === 1) res *= x;
        x *= x;
        b = Math.floor(b / 2.0); 
    }
    return res;
};
```
## 剑指 Offer 17. 打印从1到最大的n位数
输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。
```js
var printNumbers = function(n) {
    let end = parseInt(Math.pow(10, n) - 1);
    let nums = new Array(end);
    for(let i = 0; i < end; i++){
        nums[i] = i + 1;
    }
    return nums;
};
```
## 剑指 Offer 18. 删除链表的节点
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
```js
var deleteNode = function(head, val) {
    if(head.val === val) return head.next;
    let pre = head, cur = head.next;
    while(cur.val != val && cur != null){
        pre = cur;
        cur = cur.next;
    }
    if(cur != null) pre.next = cur.next;
    return head;
};
```
## 剑指 Offer 20. 表示数值的字符串
请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
数值（按顺序）可以分成以下几个部分：

若干空格
一个 小数 或者 整数
（可选）一个 'e' 或 'E' ，后面跟着一个 整数
若干空格
小数（按顺序）可以分成以下几个部分：

（可选）一个符号字符（'+' 或 '-'）
下述格式之一：
至少一位数字，后面跟着一个点 '.'
至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
一个点 '.' ，后面跟着至少一位数字
整数（按顺序）可以分成以下几个部分：

（可选）一个符号字符（'+' 或 '-'）
至少一位数字
部分数值列举如下：

["+100", "5e2", "-123", "3.1416", "-1E-16", "0123"]
部分非数值列举如下：

["12e", "1a3.14", "1.2.3", "+-5", "12e+5.4"]
```js
var isNumber = function (s) {
  return /^[\+\-]?((\d+(\.\d*)?)|\.\d+)([eE][-+]?\d+)?$/.test(s.trim());
};
```
```js
var isNumber = function(s) {
    const states = [
        { ' ': 0, 's': 1, 'd': 2, '.': 4 },
        { 'd': 2, '.': 4 },
        { 'd': 2, '.': 3, 'e': 5, ' ': 8 },
        { 'd': 3, 'e': 5, ' ': 8 },
        { 'd': 3 },
        { 's': 6, 'd': 7 },
        { 'd': 7 },
        { 'd': 7, ' ': 8 },
        { ' ': 8 }
    ];
    let p = 0;
    let t;
    for(let i = 0; i < s.length; i++){
        let c = s.charAt(i);
        if(c >= '0' && c <= '9') t = 'd';
        else if(c == ' ' || c == '.') t = c;
        else if(c == '+' || c == '-') t = 's';
        else if(c == 'e' || c == 'E') t = 'e';
        else t = '?';

        if(states[p][t] === undefined) return false;
        p = parseInt(states[p][t]);
    }
        return p == 2 || p == 3 || p == 7 || p == 8;
};
```
## 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。
```js
var exchange = function(nums) {
    let i = 0, j = nums.length - 1;
    while(i < j){
        while(i < j && nums[i] % 2 == 1) i++;
        while(i < j && nums[j] % 2 == 0) j--;
        let tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
    return nums;
};
```
## 剑指 Offer 22. 链表中倒数第k个节点
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
```js
var getKthFromEnd = function(head, k) {
    let first = head, second = head;
    for(let i = 0; i < k; i++){
        first = first.next;
    }

    while(first != null){
        first = first.next;
        second = second.next;
    }

    return second;
};
```
## 剑指 Offer 24. 反转链表
```js
var reverseList = function(head) {
    let pre = null, cur = head;
    while(cur != null){
        let tmp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = tmp;
    }
    return pre;
};
```
## 剑指 Offer 25. 合并两个排序的链表
```js
var mergeTwoLists = function(l1, l2) {
    let dum = new ListNode(0);
    let cur = dum;
    while(l1 != null && l2 != null){
        if(l1.val < l2.val){
            cur.next = l1;
            l1 = l1.next;
        }
        else{
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    cur.next = l1 != null ? l1 : l2;
    return dum.next;
};
```
## 剑指 Offer 26. 树的子结构
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
```js
var isSubStructure = function(A, B) {
    return (A !== null && B !== null) && (recur(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B));
};

var recur = function(A, B){
    if(B === null) return true;
    if(A === null || A.val !== B.val) return false;
    return recur(A.left, B.left) && recur(A.right, B.right);
}
```
## 剑指 Offer 27. 二叉树的镜像
请完成一个函数，输入一个二叉树，该函数输出它的镜像。
```js
var mirrorTree = function(root) {
    if(root == null) return root;
    let node = root.left;
    root.left = mirrorTree(root.right);
    root.right = mirrorTree(node);
    return root;
};
```
## 剑指 Offer 28. 对称的二叉树
请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。
```js
var isSymmetric = function(root) {
    return root == null || recur(root.left, root.right);
};

var recur = function(left, right){
    if(left == null && right == null){
        return true;
    }
    if(left == null || right == null || left.val != right.val){
        return false;
    }
    return recur(left.left, right.right) && recur(left.right, right.left);
}
```
## 剑指 Offer 29. 顺时针打印矩阵
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
```js
var spiralOrder = function(matrix) {
    let ans = [];
    if(!matrix.length) return ans;
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    while(left <= right && top <= bottom){
        for(let colunm = left; colunm <= right; colunm++){
            ans.push(matrix[top][colunm]);
        }
        for(let row = top + 1; row <= bottom; row++){
            ans.push(matrix[row][right]);
        }
        if(left < right && top < bottom){
            for(let colunm = right - 1; colunm >= left ; colunm--){
                ans.push(matrix[bottom][colunm]);
            }
            for(let row = bottom - 1; row > top; row--){
                ans.push(matrix[row][left]);
            }
        }
        top++;
        left++;
        right--;
        bottom--;
    }
    return ans;
};
```
## 剑指 Offer 30. 包含min函数的栈
定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。
```js
var MinStack = function() {
    this.xStack = [];
    this.minStack = [Infinity];
};

MinStack.prototype.push = function(x) {
    this.xStack.push(x);
    this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], x));
};

MinStack.prototype.pop = function() {
    this.xStack.pop();
    this.minStack.pop();
};

MinStack.prototype.top = function() {
    return this.xStack[this.xStack.length - 1];
};

MinStack.prototype.min = function() {
    return this.minStack[this.minStack.length - 1];
};
```
## 剑指 Offer 31. 栈的压入、弹出序列
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。
```js
var validateStackSequences = function(pushed, popped) {
    const stack = [];
    let index = 0;
    for(const item of pushed){
        // push栈的数据，都先放入stack中
        stack.push(item);
        // 判断stack是否和popped的值相同
        while(stack.length > 0 && stack[stack.length - 1] === popped[index]){
            stack.pop();
            index++;
        }
    }
    return stack.length === 0;
};
```
## 剑指 Offer 32 - II. 从上到下打印二叉树 II
从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
```js
var levelOrder = function(root) {
    if (root == null) return [];
    const queue = [root];
    let ans = [];
    while (queue.length) {
        let res = [];
        for(let i = queue.length; i > 0; i--) {
            let node = queue.shift();
            res.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        ans.push(res);
    }
  return ans;
};
```
## 剑指 Offer 32 - III. 从上到下打印二叉树 III
请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
```js
var levelOrder = function(root) {
    if(root == null) return [];
    const queue = [root];
    let ans = [];

    while(queue.length){
        let res = [];
        for(let i = queue.length; i > 0; i--){
            let node = queue.shift();
            res.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        if((ans.length % 2 == 1)) reverse(res);
        ans.push(res);
    }
    return ans;
};

var reverse = function(res){
    let i = 0; j = res.length - 1;
    while(i <= j){
        swap(res, i, j);
        i++;
        j--;
    }
};

var swap = function(res, a, b){
    let tmp = res[a];
    res[a] = res[b];
    res[b] = tmp;
}
```
## 剑指 Offer 33. 二叉搜索树的后序遍历序列
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 true，否则返回 false。假设输入的数组的任意两个数字都互不相同。
```js
var verifyPostorder = function(postorder) {
    return recur(postorder, 0, postorder.length - 1);
};

var recur = function(postorder, i, j){
    if(i >= j) return true;
    let p = i;
    while(postorder[p] < postorder[j]) p++;
    let m = p;
    while(postorder[p] > postorder[j]) p++;
    return p == j && recur(postorder, i, m - 1) && recur(postorder, m , j - 1);
}
```
## 剑指 Offer 34. 二叉树中和为某一值的路径
给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
```js
var pathSum = function(root, target) {
    let ans = [], res = [];
    recur(ans, res, root, target);
    return ans;
};

var recur = function(ans, res, root, target){
    if(root == null) return;
    res.push(root.val);
    target -= root.val;

    if(target == 0 && root.left == null && root.right == null){
        ans.push(Array.from(res));
    }
    recur(ans, res, root.left, target);
    recur(ans, res, root.right, target);
    res.splice(res.length - 1, 1);
}
```
## 剑指 Offer 35. 复杂链表的复制
请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。
```js
var copyRandomList = function(head) {
    if(head == null) return head;
        let cur = head;
        while(cur != null){
            let tmp = new Node(cur.val);
            tmp.next = cur.next;
            cur.next = tmp;
            cur = tmp.next;
        }
        cur = head;
        while(cur != null){
            if(cur.random != null)
            cur.next.random = cur.random.next;
            cur = cur.next.next;
        }
        let pre = head, res = head.next;
        cur = head.next;
        while(cur.next != null){
            pre.next = pre.next.next;
            cur.next = cur.next.next;
            pre = pre.next;
            cur = cur.next;
        }
        pre.next = null;
        return res;
};
```
## 剑指 Offer 36. 二叉搜索树与双向链表
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。
```js
var treeToDoublyList = function(root) {
    if(root == null) return null;
    let pre, head;
    recur(root);
    function recur(root){
        if(root == null) return;
        recur(root.left);
        if(pre != null){
            pre.right = root;
        } else {
            head = root;
        }
        root.left = pre;
        pre = root;
        recur(root.right);
}
    pre.right = head;
    head.left = pre;
    return head;
};
```
## 剑指 Offer 37. 序列化二叉树
请实现两个函数，分别用来序列化和反序列化二叉树。
```js
var serialize = function(root) {
    let queue = [root];
    let res = [];
    while(queue.length){
        let node = queue.shift();
        if(node){
            res.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        }
        else{
            res.push("#");
        }
    }
    return res.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(data == "#") return null;
    let vals = data.split(",");
    let root = new TreeNode(vals[0]);
    let queue = [root];
    let i = 1;
    while(queue.length){
        let node = queue.shift();
        if(vals[i] != "#"){
            node.left = new TreeNode(vals[i]);
            queue.push(node.left);
        }
        i++;
        if(vals[i] != "#"){
            node.right = new TreeNode(vals[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
};
```
## 剑指 Offer 38. 字符串的排列
输入一个字符串，打印出该字符串中字符的所有排列。
```js
var permutation = function(s) {
    let c = s.split('');
    let res = [];
    dfs(c, res, 0);
    return res;
};

var dfs = function(c, res, index){
    if(index == c.length - 1){
        res.push(c.join(''));
        return;
    }
    let dic = [];
    for(let i = index; i < c.length; i++){
        if(dic.includes(c[i])) continue;
        dic.push(c[i]);
        swap(c, i, index);
        dfs(c, res, index + 1);
        swap(c, i, index);
    }
}

var swap = function(nums, a, b){
    let tmp = nums[a];
    nums[a] = nums[b];
    nums[b] = tmp;
}
```
## 剑指 Offer 39. 数组中出现次数超过一半的数字

```js
var majorityElement = function(nums) {
    let count = 0, record = null;
    for(let i = 0; i < nums.length; i++){
        if(count == 0){
            record = nums[i];
        }
        count += (record == nums[i]) ? 1 : -1;
    }
    return record;
};
```
## 剑指 Offer 40. 最小的k个数（快排哨兵）
输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
```js
var getLeastNumbers = function(arr, k) {
    quickSort(arr, k, 0, arr.length - 1);
    return arr.slice(0, k);
};

var quickSort = function(arr, k, l, r){
    if(l >= r) return;
    let i = l, j = r;
    while(i < j){
        while(i < j && arr[j] >= arr[l]) j--;
        while(i < j && arr[i] <= arr[l]) i++;
        swap(arr, i, j);
    }
    swap(arr, i, l);
    if(k > i) quickSort(arr, k, i + 1, r);
    if(k < i) quickSort(arr, k, l, i - 1);
}

var swap = function(arr, a, b){
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}
```
## 剑指 Offer 41. 数据流中的中位数
如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。
```js
const MedianFinder = function () {
  class Heap {
    constructor(){}
  }
  this.A = new Heap();//小顶堆，保存大部分
  this.B = new Heap((x, y) => x < y);//大顶堆
};
MedianFinder.prototype.addNum = function (num) {
    if (this.A.size() !== this.B.size()) {
        this.A.add(num);
        this.B.add(this.A.pop());
    } else {
        this.B.add(num);
        this.A.add(this.B.pop());
    }
};
MedianFinder.prototype.findMedian = function () {
    return this.A.size() !== this.B.size() ? this.A.peek() : (this.A.peek() + this.B.peek()) / 2
      
};
```
## 剑指 Offer 42. 连续子数组的最大和(输出索引)
输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
要求时间复杂度为O(n)。
```js
var maxSubArray = function(nums) {
    let res = nums[0];
    for(let i = 1; i < nums.length; i++){
        nums[i] += Math.max(0, nums[i - 1]);
        res = Math.max(res, nums[i]);
    }
    return res;
};
```
```js

var maxSubArray = function(nums) {
    const dp = [];
    if(nums.length == 1 || nums.length == 0){
        return nums.length == 1 ? nums[0] : undefined;
    }

    dp[0] = nums[0];
    let max = dp[0];
    let index = 0;
    for(let i = 1; i < nums.length; i++){
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        max = Math.max(dp[i], max);
        // 记录右边的索引
        index = max === dp[i] ? i : index;
    }
    // 找出左边的索引
    let left, temp = max;
    for(left = index; left >= 0; left--){
        if(temp === 0) break;
        temp -= nums[left];
    }
    return [max, left + 1, index];
};
```
## 剑指 Offer 43. 1～n 整数中 1 出现的次数
输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。
例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。
```js
var countDigitOne = function(n) {
    let digit = 1, res = 0;
    let high = Math.floor(n / 10), cur = n % 10, low = 0;
    while(high != 0 || cur != 0) {
        if(cur == 0) {
            res += high * digit;
        }
        else if(cur == 1) {
            res += high * digit + low + 1;
        }
        else {
            res += (high + 1) * digit;
        }
        low += cur * digit;
        cur = high % 10;
        high = Math.floor(high / 10);
        digit *= 10;
    }
    return res;
};
```
## 剑指 Offer 44. 数字序列中某一位的数字
数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。
请写一个函数，求任意第n位对应的数字。
```js
var findNthDigit = function(n) {
    let digit = 1, start = 1, count = 9;
    while(n > count){
        n -= count;
        digit += 1;
        start *= 10;
        count = start * digit * 9;
    }
    let num = start + (n - 1) / digit;
    return num.toString().charAt((n - 1) % digit);
};
```
## 剑指 Offer 45. 把数组排成最小的数
输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
```js
var minNumber = function(nums) {
    let str = new Array(nums.length);
    for(let i = 0; i < str.length; i++){
        str[i] = nums[i].toString();
    }
    str.sort((a, b) => `${a}${b}` - `${b}${a}`);
    return str.join('');
};
```
## 剑指 Offer 46. 把数字翻译成字符串(0 => a, 25 => z)
给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
```js
var translateNum = function(num) {
    let a = 1, b = 1, x, y = num % 10;
    while(num > 9){
        num = Math.floor(num / 10);
        x = num % 10;
        let c = x * 10 + y >= 10 && x * 10 + y <= 25 ? a + b : b;
        a = b;
        b = c;
        y = x;
    }
    return b;
};
```
## 剑指 Offer 47. 礼物的最大价值
在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？
```js
var maxValue = function(grid) {
    for(let i = 1; i < grid.length; i++){
        grid[i][0] += grid[i - 1][0];
    }
    for(let i = 1; i < grid[0].length; i++){
        grid[0][i] += grid[0][i - 1];
    }

    for(let i = 1; i < grid.length; i++){
        for(let j = 1; j < grid[0].length; j++){
            grid[i][j] += Math.max(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    return grid[grid.length - 1][grid[0].length - 1];
};
```
## 剑指 Offer 48. 最长不含重复字符的子字符串
请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
```js
var lengthOfLongestSubstring = function(s) {
    let ans = 0, i = -1;
    let map = new Map();
    for(let j = 0; j < s.length; j++){
        if(map.has(s.charAt(j))){
            i = Math.max(i, map.get(s.charAt(j)));
        }
        map.set(s.charAt(j), j);
        ans = Math.max(ans, j - i);
    }
    return ans;
};
```
## 剑指 Offer 49. 丑数（235）
我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。
```js
var nthUglyNumber = function(n) {
    let nums = new Array(n);
    nums[0] = 1;
    let a = 0, b = 0, c = 0;
    for(let i = 1; i < n; i++){
        let na = 2 * nums[a], nb = 3 * nums[b], nc = 5 * nums[c];
        nums[i] = Math.min(na,Math.min(nb, nc));
        if(nums[i] == na) a++;
        if(nums[i] == nb) b++;
        if(nums[i] == nc) c++;
    }
    return nums[n - 1];
};
```
## 剑指 Offer 50. 第一个只出现一次的字符
在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。
```js
var firstUniqChar = function(s) {
    const frequency = _.countBy(s);
    for (const ch of Array.from(s)) {
        if (frequency[ch] === 1) {
            return ch;
        }
    }
    return ' ';
};
```
## 剑指 Offer 51. 数组中的逆序对（归并排序）
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。
```js
var recur = function (nums, tmp, l, r) {
  if (l >= r) return 0;
  let m = Math.floor((l + r) / 2);
  let res = recur(nums, tmp, l, m) + recur(nums, tmp, m + 1, r);
  let i = l, j = m + 1;
  for (let k = l; k <= r; k++) {
    tmp[k] = nums[k];
  }
  for (let k = l; k <= r; k++) {
    if (i === m + 1) {
      nums[k] = tmp[j++];
    } else if (j === r + 1 || tmp[i] <= tmp[j]) {
      nums[k] = tmp[i++]
    } else {
      nums[k] = tmp[j++];
      res += m - i + 1;
    }
  }
  return res;
}
```
## 剑指 Offer 52. 两个链表的第一个公共节点
输入两个链表，找出它们的第一个公共节点。
```js
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let A = headA, B = headB;
    while(A !== B){
        A = A ? A.next : headB;
        B = B ? B.next : headA;
    }
    return A;
};
```
## 剑指 Offer 53 - I. 在排序数组中查找数字 I（一个数字在排序数组中出现的次数）
统计一个数字在排序数组中出现的次数。
```js
var search = function(nums, target) {
    let i = 0; j = nums.length - 1;
    while(i <= j){
        let mid = Math.floor((i + j) / 2);
        if(nums[mid] >= target){
            j = mid - 1;
        } else {
            i = mid + 1;
        }
    }
    let left = j;

    i = 0, j = nums.length - 1;
    while(i <= j){
        let mid = Math.floor((i + j) / 2);
        if(nums[mid] > target){
            j = mid - 1;
        } else {
            i = mid + 1;
        }
    }
    let right = i;
    if(j >= 0 && nums[j] != target || j < 0) return 0;
    return right - left - 1;
};
```
## 剑指 Offer 53 - II. 0～n-1中缺失的数字
一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
```js
var missingNumber = function(nums) {
    let i = 0, j = nums.length - 1;
    while(i <= j){
        let m = Math.floor((i + j) / 2);
        if(nums[m] == m) i = m + 1;
        else j = m - 1;
    }
    return i;
};
```
## 剑指 Offer 54. 二叉搜索树的第k大节点
给定一棵二叉搜索树，请找出其中第 k 大的节点的值。
```js
var kthLargest = function(root, k) {
    let res;
    if (root === null) return res;
    const dfs = (root) => {
        if (root === null) return null;
        dfs(root.right);
        k--;
        if (k === 0) res = root.val;
        dfs(root.left);
    };
    dfs(root);
    return res;
};
```
## 剑指 Offer 55 - I. 二叉树的深度

```js
var maxDepth = function(root) {
    if(root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```
## 剑指 Offer 55 - II. 平衡二叉树
输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。
```js
var isBalanced = function(root) {
    return maxDepth(root) != -1;
};

var maxDepth = function(root){
    if(root === null) return 0;
    if(maxDepth(root.left) === -1) return -1;
    if(maxDepth(root.right) === -1) return -1;
    return Math.abs(maxDepth(root.left) - maxDepth(root.right)) <= 1 ? 
    1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : -1;
}
```
## 剑指 Offer 56 - I. 数组中数字出现的次数（找出这两个只出现一次的数字）
一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。
```js
var singleNumbers = function(nums) {
    let x = 0, y = 0, n = 0, m = 1;
    for(let i = 0; i < nums.length; i++){
        n ^= nums[i];
    }

    while((n & m) == 0){
        m <<= 1;
    }

    for(let i = 0; i < nums.length; i++){
        if((nums[i] & m) != 0){
            x ^= nums[i];
        } else {
            y ^= nums[i];
        }
    }
    return [x, y];
};
```
## 剑指 Offer 56 - II. 数组中数字出现的次数 II（其他数字都出现了m次，找出只出现一次的数字。）
在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了m次。请找出那个只出现一次的数字。
```js
var singleNumber = function(nums) {
    let counts = new Array(32).fill(0);
    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < 32; j++) {
            counts[j] += nums[i] & 1;
            nums[i] >>= 1;
        }
    }
    let res = 0, m = 3;
    for(let i = 31; i >= 0; i--) {
        res <<= 1;
        res |= counts[i] % m;
    }
    return res;
}
```
## 剑指 Offer 57. 和为s的两个数字
输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
```js
var twoSum = function(nums, target) {
    let i = 0, j = nums.length - 1;
    while(i < j){
        let sum = nums[i] + nums[j];
        if(sum < target) i++;
        else if(sum > target) j--;
        else return [nums[i], nums[j]];
    }
    return [];
};
```
## 剑指 Offer 57 - II. 和为s的连续正数序列
输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。
示例 1：
输入：target = 9
输出：[[2,3,4],[4,5]]
```js
var findContinuousSequence = function(target) {
    let i =1, j = 2, sum = 3;
    let ans = [];
    while(i < j){
        if(sum === target){
            let res = [];
            for(let k = i; k <= j; k++){
                res[k - i] = k;
            }
            ans.push(res);
        }
        if(sum >= target){
            sum -= i;
            i++;
        } else {
            j++;
            sum += j;
        }
    }
    return ans;
};
```
## 剑指 Offer 58 - I. 翻转单词顺序
输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。
```js
var reverseWords = function(s) {
    if (s == null || !s.length) return s;
    let arr = s.split(" ").reverse().filter((item) => item.trim());;
    return arr.join(" ");
};
```
## 剑指 Offer 58 - II. 左旋转字符串
字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。
```js
var reverseLeftWords = function(s, n) {
    return s.substring(n, s.length) + s.substring(0, n);
};
```
## 剑指 Offer 59 - I. 滑动窗口的最大值
给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
```js
var maxSlidingWindow = function(nums, k) {
    if(nums.length === 0 || k === 0) return [];
    let res = [];
    let deque = [];
    for(let i = 1 - k, j = 0; j < nums.length; i++, j++){
        if(i > 0 && nums[i - 1] == deque[0])
        deque.shift();

        while(deque.length && nums[j] > deque[deque.length - 1])
        deque.pop();

        deque.push(nums[j]);
        if(i >= 0)
        res[i] = deque[0];
    }
    return res;
};
```
## 剑指 Offer 59 - II. 队列的最大值
请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。
若队列为空，pop_front 和 max_value 需要返回 -1
```js
var MaxQueue = function() {
    this.queue = []
    this.deque = []
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
    if (this.queue.length == 0) return -1
    return this.deque[0]
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
    this.queue.push(value)
    while(this.deque[this.deque.length -1] < value) this.deque.pop()
    this.deque.push(value)
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
    if (this.queue.length == 0) return -1
    let val = this.queue.shift()
    if (val == this.deque[0]) this.deque.shift()
    return val
};
```
## 剑指 Offer 60. n个骰子的点数
把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
```js
var dicesProbability = function(n) {
    let bp = new Array(6);
    bp.fill(1.0 / 6.0);
    for(let i = 2; i <= n; i++){
        let tmp = new Array(5 * i + 1).fill(0);
        for(let j = 0; j < bp.length; j++){
            for(let k = 0; k < 6; k++){
                tmp[j + k] += bp[j] / 6.0;
            }
        }
        bp = tmp;
    }
    return bp;
};
```
## 剑指 Offer 61. 扑克牌中的顺子
从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。
```js
var isStraight = function(nums) {
    let j = 0;
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length - 1; i++){
        if(nums[i] == 0) j++;
        else if(nums[i] == nums[i + 1]) return false;
    }
    return nums[4] - nums[j] < 5;
};
```
## 剑指 Offer 62. 圆圈中最后剩下的数字（约瑟夫环）
0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。
```js
var lastRemaining = function(n, m) {
    let x = 0;
    for(let i = 2; i <= n; i++){
        x = (x + m) % i;
    }
    return x;
};
```
## 剑指 Offer 63. 股票的最大利润
假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？
```js
var maxProfit = function(prices) {
    let profit = 0, cost = Infinity;
    for(let i = 0; i < prices.length; i++){
        cost = Math.min(cost, prices[i]);
        profit = Math.max(profit, prices[i] - cost);
    }
    return profit;
};
```
## 剑指 Offer 64. 求1+2+…+n
求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
```js
var sumNums = function(n) {
    n && (n += sumNums(n - 1));
    return n;
};
```
## 剑指 Offer 65. 不用加减乘除做加法
写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。
```js
var add = function(a, b) {
    while(b != 0){
        let c = (a & b) << 1;
        a ^= b;
        b = c;
    }
    return a;
};
```
## 剑指 Offer 66. 构建乘积数组
给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B[i] 的值是数组 A 中除了下标 i 以外的元素的积
```js
var constructArr = function(a) {
    let res = new Array(a.length);
    let p = 1, q = 1;
    for(let i = 0; i < a.length; i++){
        res[i] = p;
        p *= a[i];
    }
    for(let i = a.length - 1; i > 0; i--){
        q *= a[i]; 
        res[i - 1] *= q;
    }
    return res;
};
```
## 剑指 Offer 67. 把字符串转换成整数
写一个函数 StrToInt，实现把字符串转换成整数这个功能。不能使用 atoi 或者其他类似的库函数。
```js
var strToInt = function(str) {
    const [MIN, MAX] = [-Math.pow(2, 31), Math.pow(2, 31) - 1;
    let s = str.trim();
    if(s.length == 0) return 0;
    let i = 1, sign = 1, res = 0;
    if(s[0] == '-') sign = -1;
    else if(s[0] != '+') i = 0;
    for(let j = i; j < s.length; j++){
        if(s[j] >= 0 && s[j] <= 9 && s[j] != " "){
            res = res * 10 + (s[j] - 0);
            if(res *sign < MIN) return MIN;
            else if(res * sign > MAX) return MAX;
        } else {
            break;
        }
    }
    return res * sign;
};
```
## 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先

```js
var lowestCommonAncestor = function(root, p, q) {
    if(root === null || p === root || q === root){
        return root;
    }
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if(left === null) return right;
    if(right === null) return left;
    return root;
};
```
## 剑指 Offer 68 - II. 二叉树的最近公共祖先

```js
var lowestCommonAncestor = function(root, p, q) {
    if(root === null || p === root || q === root){
        return root;
    }
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if(left === null) return right;
    if(right === null) return left;
    return root;
};
```
## 剑指 Offer II 072. 求平方根
给定一个非负整数 x ，计算并返回 x 的平方根，即实现 int sqrt(int x) 函数。

正数的平方根有两个，只输出其中的正数平方根。

如果平方根不是整数，输出只保留整数的部分，小数部分将被舍去。

```js
var mySqrt = function(x) {
    let left = 0; right = x;
    let ans = 0;
    while(left <= right){
        let mid = left + Math.floor((right - left) / 2);
        if(mid * mid <= x){
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return ans;
};
```
