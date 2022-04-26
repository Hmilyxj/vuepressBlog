---
title: 热题100
date: 2021-1-12
subSidebar: "auto"
isShowbgImage: false
categories:
  - 前端编程
tags: 
  - 编程题
  - 前端
  - 面试
---
## 416. 分割等和子集(背包，逆向)
给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
```js
var canPartition = function (nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  if (sum % 2 === 1) return false;

  let target = sum / 2;
  let dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= nums.length; i++) {
    for (let j = target; j >= nums[i - 1]; j--) {
      dp[j] = dp[j] || dp[j - nums[i - 1]]
    }
  }
  return dp[target];
}
```
## 322. 零钱兑换(完全背包，正向)
给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1

示例 1：
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1
```js
var coinChange = function (coins, target) {
  let dp = new Array(target + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= coins.length; i++) {
    for (let j = coins[i - 1]; j <= target; j++) {
      if (dp[j] > dp[j - coins[i - 1]] + 1) {
        dp[j] = dp[j - coins[i - 1]] + 1;
      }
    }
  }
  return dp[target] === Infinity ? -1 : dp[target];
};
```
## 518. 零钱兑换 II
给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。

请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 
```js
var change = function (amount, coins) {
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= coins.length; i++) {
    for (let j = coins[i - 1]; j <= amount; j++) {
      dp[j] = dp[j] + dp[j - coins[i - 1]];
    }
  }

  return dp[amount];
};
```
## 494. 目标和
给你一个整数数组 nums 和一个整数 target 。
向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
```js
var findTargetSumWays = function (nums, target) {
  //所有元素和为sum，所有添加正号的元素的和为A，所有添加负号的元素和为B，则有sum = A + B 且 S = A - B，解方程得A = (sum + S)/2。
  //即题目转换成：从数组中选取一些元素使和恰好为(sum + S) / 2
  //需要注意的是，虽然这里是恰好装满，但是dp初始值不应该是inf，因为这里求的不是总价值而是方案数，应该全部初始为0（除了dp[0]初始化为1）
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  if (sum < target || sum < -target) return 0;
  if ((target + sum) % 2 === 1) return 0;
  let trueTarget = (target + sum) / 2;

  let dp = new Array(trueTarget + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= nums.length; i++) {
    for (let j = trueTarget; j >= nums[i - 1]; j--) {
      dp[j] = dp[j] + dp[j - nums[i - 1]];
    }
  }
  return dp[trueTarget];
};
```
## 474. 一和零
给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。

输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
输出：4
解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 

```js
var findMaxForm = function (strs, m, n) {
  //我们把每个字符串看做是一件物品，把字符串中0的数目和1的数目看做是两种“重量”，所以就变成了一个二维01背包问题
  //书包的两个限重分别是 m 和 n，要求书包能装下的物品的最大数目
  //我们可以提前把每个字符串的两个“重量” w0和w1算出来用数组存放
  let w0, w1;
  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  for (let i = 1; i <= strs.length; i++) {
    w0 = 0; w1 = 0;
    for (let ch of strs[i - 1]) {
      if (ch === '0') w0++;
      else w1++;
    }

    for (let j = m; j >= w0; j--) {
      for (let k = n; k >= w1; k--) {
        dp[j][k] = Math.max(dp[j][k], dp[j - w0][k - w1] + 1)
      }
    }
  }
  return dp[m][n];
};
```
## 139. 单词拆分
给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
```js
var wordBreak = function(s, wordDict) {
    let dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for(let i = 0; i <= s.length; i++){
        for(let j = 0; j < wordDict.length; j++){
            if(i >= wordDict[j].length){
                if(s.slice(i - wordDict[j].length, i) == wordDict[j] && dp[i - wordDict[j].length])
                {
                    dp[i] = true;
                }
            }
        }
    }
    return dp[s.length];
};
```
## 198. 打家劫舍
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
```js
var rob = function(nums) {
    const len = nums.length;
    if(len === 0) return 0;
    let dp = new Array(len + 1);
    dp[0] = 0;
    dp[1] = nums[0];
    for(let i = 2; i <= len; i++){
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }
    return dp[len];
};
```
## 213. 打家劫舍 II
你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
```js
var rob = function(nums) {
    const len = nums.length;
    if(len === 0) return 0;
    if(len === 1) return nums[0];
    if(len === 2) return Math.max(nums[0], nums[1]);

    function helper(nums){
        const len = nums.length;
        let dp = new Array(len + 1);
        dp[0] = 0;
        dp[1] = nums[0];
        for(let i = 2; i <= len; i++){
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        }
        return dp[len];
    }
    return Math.max(helper(nums.slice(0, len - 1)), helper(nums.slice(1, len)));
};

```
## 337. 打家劫舍 III
小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。

除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。

给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
```js
var rob = function(root) {
    //每个子树都有两个状态下的最优解：没打劫 root、和有打劫 root 下的最优解。

    //没打劫根节点，则左右子树的根节点可打劫可不打劫：
    //res[0] = 左子树的两个状态的较大值 + 右子树的两个状态的较大值。

    //打劫了根节点，则左右子树的根节点不能打劫：
    //res[1] = root.val + 左子树的 [0] 状态 + 右子树的 [0] 状态。

    let res = helper(root);
    function helper(root){
        if(root === null) return[0, 0];
        let left = helper(root.left);
        let right = helper(root.right);

        rootExclude = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        rootInclude = root.val + left[0] + right[0];
        return [rootExclude, rootInclude]
    }
    return Math.max(res[0], res[1]);
};
```
## 221. 最大正方形
在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
```js
var maximalSquare = function (matrix) {
  if (matrix.length === 0) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  let maxlen = 0;
  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        maxlen = Math.max(maxlen, dp[i][j]);
      }
    }
  }

  return maxlen * maxlen;
};
```
## 279. 完全平方数
给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
```js
var numSquares = function (n) {
  let dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = i;
    for (let j = 1; i - j * j >= 0; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  return dp[n];
};
```
## 300. 最长递增子序列
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
```js
var lengthOfLIS = function(nums) {
    if(nums.length === 0) return 0;
    let dp = new Array(nums.length).fill(1);
    let len = 1;

    for(let i = 1; i < nums.length; i++){
        for(let j = 0; j < i; j++){
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        len = Math.max(len, dp[i]);
    }
    return len;
};
```
## 309. 最佳买卖股票时机含冷冻期
给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。
设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
```js
var maxProfit = function(prices) {
    //状态一：买入股票状态（今天买入股票，或者是之前就买入了股票然后没有操作）
    //状态二：保持卖出股票状态
    //状态三：今天卖出了股票
    //状态四：今天为冷冻期状态
    let n = prices.length;
    if(n === 0) return 0;
    let dp = new Array(n).fill(0).map(() => new Array(4).fill(0));
    dp[0][0] = -prices[0];

    for(let i = 1; i < n; i++){
        dp[i][0] = Math.max(dp[i - 1][0], Math.max(dp[i - 1][1], dp[i - 1][3]) - prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);
        dp[i][2] = dp[i - 1][0] + prices[i];
        dp[i][3] = dp[i - 1][2];
    }
    return Math.max(dp[n - 1][1], dp[n - 1][2], dp[n - 1][3]);
};
```
## 312. 戳气球
有 n 个气球，编号为0 到 n - 1，每个气球上都标有一个数字，这些数字存在数组 nums 中。

现在要求你戳破所有的气球。戳破第 i 个气球，你可以获得 nums[i - 1] * nums[i] * nums[i + 1] 枚硬币。 这里的 i - 1 和 i + 1 代表和 i 相邻的两个气球的序号。如果 i - 1或 i + 1 超出了数组的边界，那么就当它是一个数字为 1 的气球。

求所能获得硬币的最大数量。
```js
var maxCoins = function(nums) {
    let n = nums.length;
    let points = new Array(n + 2);
    // 添加两侧的虚拟气球
    points[0] = 1, points[n + 1] = 1;
    for(let i = 1; i <= n; i++){
        points[i] = nums[i - 1];
    }

    let dp = new Array(n + 2).fill(0).map(() => new Array(n + 2).fill(0));
    for(let i = n; i >= 0; i--){
        for(let j = i + 1; j < n + 2; j++){
            for(let k = i + 1; k < j; k++){
                dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + points[i] * points[k] * points[j]);
            }
        }
    }
    return dp[0][n + 1]; 
};
```
## 10. 正则表达式匹配
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
```js
var isMatch = function(s, p) {
    if(s == null || p == null) return false;

    let m = s.length, n = p.length;
    let dp = new Array(m + 1);
    for(let i = 0; i < dp.length; i++){
        dp[i] = new Array(n + 1).fill(false);
    }

    dp[0][0] = true;
    for(let i = 0; i < m + 1; i++){
        for(let j = 1; j < n + 1; j++){
            if(p.charAt(j - 1) == '*'){
                if(match(s, p, i, j - 1)){
                    dp[i][j] = dp[i][j - 2] || dp[i - 1][j];
                } else{
                    dp[i][j] = dp[i][j - 2];
                }
            } else{
                if(match(s, p, i, j)){
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
    }
    return dp[m][n];
};
var match = function(s, p, i, j){
    if(i == 0) return false;
    if(p.charAt(j - 1) == '.') return true;

    return s.charAt(i - 1) == p.charAt(j - 1);
}
```
## 62. 不同路径（机器人）
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
问总共有多少条不同的路径？
```js
var uniquePaths = function(m, n) {
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for(let i = 0; i < m; i++){
        dp[i][0] = 1;
    }
    for(let i = 0; i < n; i++){
        dp[0][i] = 1;
    }
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
};
```
## 63. 不同路径 II（机器人）
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
网格中的障碍物和空位置分别用 1 和 0 来表示。
```js
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length, n = obstacleGrid[0].length;
    let dp = new Array(n).fill(0);
    
    dp[0] = obstacleGrid[0][0] == 0 ? 1 : 0;
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(obstacleGrid[i][j] == 1){
                dp[j] = 0;
                continue;
            }
            if(j - 1 >= 0 && obstacleGrid[i][j - 1] == 0){
                dp[j] += dp[j - 1];
            }
        }
    }
    return dp[n - 1];
};
```
## 72. 编辑距离
给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
你可以对一个单词进行如下三种操作：
插入一个字符
删除一个字符
替换一个字符
```js
var minDistance = function(word1, word2) {
    let len1 = word1.length, len2 = word2.length;
    let dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));

    for(let i = 1; i <= len1; i++){
        dp[i][0] = dp[i - 1][0] + 1;
    }
    for(let i = 1; i <= len2; i++){
        dp[0][i] = dp[0][i - 1] + 1;
    }

    for(let i = 1; i <= len1; i++){
        for(let j = 1; j <= len2; j++){
            if(word1.charAt(i - 1) == word2.charAt(j -1)){
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1])) + 1;
            }
        }
    }
    return dp[len1][len2];
};
```
## 1. 两数之和
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
```js
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length; i++){
        if(map.get(target - nums[i]) != undefined){
            return [i, map.get(target - nums[i])];
        } else {
            map.set(nums[i], i)
        }
    }
};
```
## 2. 两数相加
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
```js
var addTwoNumbers = function(l1, l2) {
    let head = null, tail = null;
    let carry = 0;
    while(l1 || l2 ){
        let n1 = l1 ? l1.val : 0;
        let n2 = l2 ? l2.val : 0;
        let sum = n1 + n2 + carry;
        if(!head){
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }

        carry = Math.floor(sum / 10);
        if(l1){
            l1 = l1.next;
        }
        if(l2){
            l2 = l2.next;
        }
    }
    if(carry > 0){
        tail.next = new ListNode(carry);
    }
    return head;
};
```
## 19. 删除链表的倒数第 N 个结点
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
```js
var removeNthFromEnd = function(head, n) {
    let first = head;
    for(let i = 0; i < n; i++){
        first = first.next;
    }
    let dum = new ListNode(0, head);
    let second = dum;
    while(first){
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dum.next;
};
```
## 21. 合并两个有序链表
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
```js
var mergeTwoLists = function(list1, list2) {
    let dum = new ListNode(0);
    let cur = dum;
    while(list1 && list2){
        if(list1.val < list2.val){
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 ? list1 : list2;
    return dum.next;
};
```
## 23. 合并K个升序链表
给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。
```js
var mergeKLists = function(lists) {
    if(!lists.length) return null;
    let ans = lists[0];
    for(let i = 1; i < lists.length; i++){
        ans = mergeTwoLists(ans, lists[i]);
    }
    return ans;
};

var mergeTwoLists = function(list1, list2) {
    let dum = new ListNode(0);
    let cur = dum;
    while(list1 && list2){
        if(list1.val < list2.val){
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 ? list1 : list2;
    return dum.next;
};
```
## 141. 环形链表（快慢指针）
给你一个链表的头节点 head ，判断链表中是否有环。
如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
如果链表中存在环 ，则返回 true 。 否则，返回 false 。
```js
var hasCycle = function(head) {
    if(head == null || head.next == null) return false;

    let slow = head, fast = head.next;
    while(slow != fast){
        if(fast == null || fast.next == null){
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
};
```
## 142. 环形链表 II
给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
```js
var detectCycle = function(head) {
    let slow = head, fast = head;
    while(true){
        if(fast == null || fast.next  == null){
            return null;
        }
        slow = slow.next;
        fast = fast.next.next;
        if(slow == fast){
            break;
        }
    }
    fast = head;
    while(slow != fast){
        slow = slow.next;
        fast = fast.next;
    }
    return fast;
};
```
## 148. 排序链表
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
```js
var sortList = function(head) {
    return toSortList(head, null);
};

var toSortList = function(head, tail){
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
}

var merge = function(list1, list2){
    let dum = new ListNode(0);
    let cur = dum;
    while(list1 && list2){
        if(list1.val < list2.val){
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 ? list1 : list2;
    return dum.next;
}
```
## 160. 相交链表
给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
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
## 206. 反转链表
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
```js
var reverseList = function(head) {
    let pre = null, cur = head;
    while(cur !== null){
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
};
```
## 25. K 个一组翻转链表
给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
k 是一个正整数，它的值小于或等于链表的长度。
如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
```js
var reverseKGroup = function(head, k) {
    let dum = new ListNode(0);
    dum.next = head;
    let pre = dum;

    while(head !== null){
        let tail = pre;
        for(let i = 0; i < k; i++){
            tail = tail.next;
            if(tail === null){
                return dum.next;
            }
        }
        let nev = tail.next;
        let reverseNode = reverse(head, tail);
        head = reverseNode[0], tail = reverseNode[1];
        pre.next = head;
        tail.next = nev;
        pre = tail;
        head = pre.next;
    }
    return dum.next;
};

var reverse = function(head, tail){
    let pre = null, cur = head;
    while(pre !== tail){
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return [tail, head];
}
```
## 234. 回文链表
给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
```js
//数组双指针O(n)、O(n)
const isPalindrome = (head) => {
  const vals = [];
  while (head) {        // 丢进数组里
    vals.push(head.val);
    head = head.next;
  }
  let start = 0, end = vals.length - 1; // 双指针
  while (start < end) {
    if (vals[start] != vals[end]) {     // 理应相同，如果不同，不是回文
      return false;
    }
    start++;
    end--;      // 双指针移动
  }
  return true;  // 循环结束也没有返回false，说明是回文
};
```
```js
//切断链表空间复杂度O(1)
var isPalindrome = function (head) {
  if (head === null || head.next === null) return true;
  let fast = head, slow = head;
  let tail1;
  while (fast && fast.next) {
    tail1 = slow;
    fast = fast.next.next;
    slow = slow.next;
  }
  tail1.next = null; //切断链表
  //翻转链表
  let head2 = null, cur = slow;
  while (cur) {
    let tmp = cur.next;
    cur.next = head2;
    head2 = cur;
    cur = tmp;
  }
  //比较链表
  while (head && head2) {
    if (head.val !== head2.val) {
      return false;
    }
    head = head.next;
    head2 = head2.next;
  }
  return true;
};
```
## 3. 无重复字符的最长子串
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
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
##  4. 寻找两个正序数组的中位数
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
```js
var findMedianSortedArrays = function(nums1, nums2) {
  //暴力法
    let arr = [...nums1,...nums2];
    arr.sort((a,b)=>a-b);
    let n = arr.length;
    if(!n){
        return 0;
    }else if(n % 2 != 0){
        return arr[Math.floor(n / 2)];
    }else{
        return (arr[Math.floor(n / 2) - 1] + arr[Math.floor(n / 2)])/ 2
    }
};
```
```js
var findMedianSortedArrays = function(nums1, nums2) {
    //二分法
    let m = nums1.length, n = nums2.length;
    if(m > n) {
        return findMedianSortedArrays(nums2, nums1);
    }
    let left = 0, right = m;
    let maxleft = 0, minright = 0;

    while(left <= right){
        const i = left + Math.floor((right - left) / 2);
        const j = Math.floor((n + m + 1) / 2) - i;

        const maxleft1 = i == 0 ? -Infinity : nums1[i - 1];
        const maxleft2 = j == 0 ? -Infinity : nums2[j - 1];
        const minright1 = i == m ? Infinity : nums1[i];
        const minright2 = j == n ? Infinity : nums2[j];

        if(maxleft1 <= minright2) {
            maxleft = Math.max(maxleft1, maxleft2);
            minright = Math.min(minright1, minright2);
            left = i + 1;
        } else {
            right = i - 1
        }
    }
    return (m + n) % 2 == 0 ? (maxleft + minright) / 2 : maxleft;
};
```
```js
var findMedianSortedArrays = function (nums1, nums2) {
    //第k小数，折半删除算法
    var n = nums1.length;
    var m = nums2.length;
    var left = Math.floor((n + m + 1) / 2);
    var right = Math.floor((n + m + 2) / 2);
    //将偶数和奇数的情况合并，如果是奇数，会求两次同样的 k 。
   return (getKth(nums1, 0, n - 1, nums2, 0, m - 1, left) + getKth(nums1, 0, n - 1, nums2, 0, m - 1, right)) / 2;
};

var getKth = function (nums1, start1, end1, nums2, start2, end2, k) {
    var len1 = end1 - start1 + 1;
    var len2 = end2 - start2 + 1;
    //让 len1 的长度小于 len2，这样就能保证如果有数组空了，一定是 len1 
    if (len1 > len2) return getKth(nums2, start2, end2, nums1, start1, end1, k);
    if (len1 == 0) return nums2[start2 + k - 1];

    if (k == 1) return Math.min(nums1[start1], nums2[start2]);

    var i = start1 + Math.min(len1, Math.floor(k / 2)) - 1;
    var j = start2 + Math.min(len2, Math.floor(k / 2)) - 1;
    if (nums1[i] > nums2[j]) {
    return getKth(nums1, start1, end1, nums2, j + 1, end2, k - (j - start2 + 1));
    }
    else {
    return getKth(nums1, i + 1, end1, nums2, start2, end2, k - (i - start1 + 1));
    }
}
```
## 5. 最长回文子串
给你一个字符串 s，找到 s 中最长的回文子串。
```js
var longestPalindrome = function(s) {
    let start = 0, end = 0;
    for(let i = 0; i < s.length; i++){
        let len1 = expand(s, i, i);
        let len2 = expand(s, i, i + 1);
        let len = Math.max(len1, len2);
        if(end - start < len){
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
};

var expand = function(s, i, j){
    while(i >= 0 && j < s.length && s.charAt(i) ==  s.charAt(j)){
        i--;
        j++;
    }
    return j - i - 1;
}
```
## 11. 盛最多水的容器
给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
```js
var maxArea = function(height) {
    let left = 0, right =height.length - 1;
    let ans = 0;
    while(left <= right){
        ans = Math.max(ans, Math.min(height[left], height[right]) * (right - left))
        if(height[left] < height[right]){
            left++;
        } else {
            right--;
        }
    }
    return ans;
};
```
## 15. 三数之和
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。
```js
var threeSum = function(nums) {
    let ans = [];
    let len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b);

    for(let first = 0; first < len; first++){
        if(first > 0 && nums[first] == nums[first - 1]) continue;
        let second = first + 1, third = len - 1;
        while(second < third){
            let sum = nums[first] + nums[second] + nums[third];
            if(sum == 0){
                ans.push([nums[first], nums[second], nums[third]]);
                while(second < third && nums[second] == nums[second + 1]) second++;
                while(second < third && nums[third] == nums[third - 1]) third--;
                second++;
                third--;
            } else if(sum < 0){
                second++;
            } else{
                third--;
            }
        }
    }
    return ans;
};
```
## 17. 电话号码的字母组合
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
```js
var letterCombinations = function(digits) {
    let ans = [], res = [];
    if(digits.length == 0) return ans;
    const map = { 
        '2': 'abc', 
        '3': 'def', 
        '4': 'ghi', 
        '5': 'jkl', 
        '6': 'mno', 
        '7': 'pqrs', 
        '8': 'tuv', 
        '9': 'wxyz' 
    };
    dfs(ans, res, digits, map, 0);
    return ans;
};

var dfs = function(ans, res, digits, map, index){
    if(index == digits.length){
        return ans.push(res.join(""));
    } else {
        let digit = digits.charAt(index);
        let string = map[digit];//注意
        for(let i = 0; i < string.length; i++){
            res.push(string.charAt(i));
            dfs(ans, res, digits, map, index + 1);
            res.splice(res.length - 1, 1);
        }
    }
}
```
## 22. 括号生成
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
```js
var generateParenthesis = function(n) {
    let ans = [], res = [];
    dfs(ans, res, 0, 0, n);
    return ans;
};

var dfs = function(ans, res, left, right, n){
    if(left == n && right == n){
        ans.push(res.join(""));
    }

    if(left < n){
        res.push("(");
        dfs(ans, res, left + 1, right, n);
        res.splice(res.length - 1, 1);
    }
    if(right < left){
        res.push(")");
        dfs(ans, res, left, right + 1, n);
        res.splice(res.length - 1, 1);
    }
}
```
## 46. 全排列
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
```js
var permute = function(nums) {
    let ans = [], res = [];
    let n = nums.length;
    for(let num of nums){
        res.push(num);
    }
    dfs(ans, res, n, 0);
    return ans;
};

var dfs = function(ans, res, n, index){
    if(index == n){
        ans.push(Array.from(res));
        return;
    }

    for(let i = index; i < n; i++){
        swap(res, i, index);
        dfs(ans, res, n, index + 1);
        swap(res, i, index);
    }
};

var swap = function(res, a, b){
    let tmp = res[a];
    res[a] = res[b];
    res[b] = tmp;
}
```
## 47. 全排列 II
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
```js
var valid = [];
var permuteUnique = function(nums) {
    let ans = [], res  = [];
    nums.sort((a, b) => a - b);
    dfs(ans, res, nums, 0);
    return ans;
};

var dfs = function(ans, res, nums, index){
    if(index == nums.length){
        ans.push(Array.from(res));
        return;
    }

    for(let i = 0; i < nums.length; i++){
        if(valid[i] || (i > 0 && nums[i] == nums[ i - 1] && !valid[i - 1])) continue;
        res.push(nums[i]);
        valid[i] = true;
        dfs(ans, res, nums, index + 1);
        valid[i] = false;
        res.splice(res.length - 1, 1);
    }
}
```
## 39. 组合总和
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
```js
var combinationSum = function(candidates, target) {
    let ans = [], res = [];
    dfs(candidates, target, ans, res, 0);
    return ans;
};

var dfs = function(candidates, target, ans, res, index){
    if(index == candidates.length) return;
    if(target == 0){
        ans.push(Array.from(res));
        return;
    }

    dfs(candidates, target, ans, res, index + 1);
    if(target - candidates[index] >= 0){
        res.push(candidates[index]);
        dfs(candidates, target - candidates[index], ans, res, index);
        res.splice(res.length - 1, 1);
    }
}
```
##  90. 子集 II
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
```js
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    let ans = [], res = [];
    dfs(nums, ans, res, 0);
    return ans;
};

var dfs = function(nums, ans, res, index){
    ans.push(Array.from(res));

    let map = new Map();
    for(let i = 0; i < nums.length; i++){
        map.set(nums[i], false);
    }

    for(let i = index; i < nums.length; i++){
        if(!map.get(nums[i])){
            res.push(nums[i]);
            dfs(nums, ans, res, i + 1);
            res.splice(res.length - 1, 1);
            map.set(nums[i], true)
        }
    }
}
```
## 79. 单词搜索
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
```js
var exist = function(board, word) {
    let words = word.split('');
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(dfs(board, words, i, j, 0)){
                return true;
            }
        }
    }
    return false;
};

var dfs = function(board, words, i, j, k){
    if(i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != words[k]){
        return false;
    }
    if(k == words.length - 1){
        return true;
    }
    board[i][j] = '/0';
    let res = dfs(board, words, i - 1, j, k + 1) || dfs(board, words, i + 1, j, k + 1) || dfs(board, words, i, j - 1, k + 1) || dfs(board, words, i, j + 1, k + 1);
    board[i][j] = words[k];
    return res;
}
```
## 200. 岛屿数量
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成
此外，你可以假设该网格的四条边均被水包围。
```js
var numIslands = function(grid) {
    let count = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j] === '1'){
                dfs(grid, i, j);
                count++;
            }
        }
    }
    return count;
};

var dfs = function(grid, i, j){
    if(i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0'){
        return;
    }
    grid[i][j] = '0';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}
```
## 301. 删除无效的括号
给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
返回所有可能的结果。答案可以按 任意顺序 返回。
```js
var removeInvalidParentheses = function(s) {
    let ans = new Set(), res = [];
    let n = s.length;
    let left = 0, right = 0;
    for(let i = 0; i < n; i++){
        if(s.charAt(i) === '('){
            left++;
        } else if (s.charAt(i) === ')'){
            if(left > 0){
                left--;
            } else {
                right++;
            }
        }
    }
    let len = n - left - right;
    dfs(0, 0); 

    function dfs(index, l){
        if(l < 0 || n - index + res.length < len)
            return;

        if(index === n){
            if(l === 0 && res.length === len){
                ans.add(res.join(''));
            }
            return;
        }

        res.push(s.charAt(index));
        dfs(index + 1, l + (s.charAt(index) === '(') - (s.charAt(index) === ')'));
        res.pop();
        dfs(index + 1, l);
    }
    return [...ans];
};
```

## 20. 有效的括号
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
```js
var isValid = function(s) {
    const n = s.length;
    if(n % 2 == 1) return false;
    const map = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ]);
    let stack = [];

    for(let ch of s){
        if(map.has(ch)){
            if(!stack.length || stack[stack.length - 1] != map.get(ch)){
                return false;
            } 
            stack.pop(ch);
        } else {
            stack.push(ch);
        }
    }
    return !stack.length;
};
```
## 301. 删除无效的括号
给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
返回所有可能的结果。答案可以按 任意顺序 返回。
```js
var removeInvalidParentheses = function(s) {
    let ans = new Set(), res = [];
    let n = s.length;
    let left = 0, right = 0;
    for(let i = 0; i < n; i++){
        if(s.charAt(i) === '('){
            left++;
        } else if (s.charAt(i) === ')'){
            if(left > 0){
                left--;
            } else {
                right++;
            }
        }
    }
    let len = n - left - right;
    dfs(0, 0); 

    function dfs(index, l){
        if(l < 0 || n - index + res.length < len)
            return;

        if(index === n){
            if(l === 0 && res.length === len){
                ans.add(res.join(''));
            }
            return;
        }

        res.push(s.charAt(index));
        dfs(index + 1, l + (s.charAt(index) === '(') - (s.charAt(index) === ')'));
        res.pop();
        dfs(index + 1, l);
    }
    return [...ans];
};
```
## 22. 括号生成
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
```js
var generateParenthesis = function(n) {
    let ans = [], res = [];
    dfs(ans, res, 0, 0, n);
    return ans;
};

var dfs = function(ans, res, left, right, n){
    if(left == n && right == n){
        ans.push(res.join(""));
    }

    if(left < n){
        res.push("(");
        dfs(ans, res, left + 1, right, n);
        res.splice(res.length - 1, 1);
    }
    if(right < left){
        res.push(")");
        dfs(ans, res, left, right + 1, n);
        res.splice(res.length - 1, 1);
    }
}
```
## 32. 最长有效括号
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度.
```js
var longestValidParentheses = function(s) {
    let n = s.length;
    let left = 0, right = 0, ans = 0;

    for(let i = 0; i < n; i++){
        if(s.charAt(i) == '('){
            left++;
        } else {
            right++;
        }

        if(left == right){
            ans = Math.max(ans, 2 * left);
        } else if(right > left){
            left = 0, right = 0;
        }
    }

    left = 0, right = 0;
    for(let i = n - 1; i >= 0; i--){
        if(s.charAt(i) == '('){
            left++;
        } else {
            right++;
        }

        if(left == right){
            ans = Math.max(ans, 2 * right);
        } else if(left > right){
            left = 0, right = 0;
        }
    }
    return ans;
};
```

## 31. 下一个排列
整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
```js
var nextPermutation = function(nums) {
    let i = nums.length - 2, j = nums.length - 1;
    while(i >= 0 && nums[i] >= nums[i + 1]){
        i--;
    }
    if(i >= 0){
        while(j >= 0 && nums[i] >= nums[j]){
            j--;
        }
        swap(nums, i, j);
    }
    reverse(nums, i + 1);
};

var swap = function(nums, a, b){
    let tmp = nums[a];
    nums[a] = nums[b];
    nums[b] = tmp;
};

var reverse = function(nums, n){
    let left = n, right = nums.length - 1;
    while(left < right){
        swap(nums, left, right);
        left++;
        right--;
    }
}
```

## 33. 搜索旋转排序数组
在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
```js
var search = function(nums, target) {
    if(nums.length == 0) return -1;
    if(nums.length == 1) return nums[0] == target ? 0 : -1;

    let left = 0, right  = nums.length - 1;
    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        if(nums[mid] == target) return mid;
        if(nums[0] <= nums[mid]){
            if(nums[0] <= target && target < nums[mid]){
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if(nums[mid] < target && target <= nums[nums.length - 1]){
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};
```
## 34. 在排序数组中查找元素的第一个和最后一个位置
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。
```js
var searchRange = function(nums, target) {
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
    if(j >= 0 && nums[j] != target || j < 0) return [-1, -1];
    return [left + 1, right - 1];
};
```

## 42. 接雨水
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
```js
var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, ans = 0;
    while(left <= right){
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if(height[left] < height[right]){
            ans += leftMax - height[left];
            left++;
        } else {
            ans += rightMax - height[right];
            right--;
        }
    }
    return ans;
};
```
## 48. 旋转图像
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
```js
var rotate = function(matrix) {
    let n  = matrix.length;
    for(let i = 0; i < n / 2; i++){
        for(let j = 0; j < n; j++){
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[n - i - 1][j];
            matrix[n - i - 1][j] = tmp;
        }
    }

    for(let i = 0; i < n; i++){
        for(let j = 0; j < i; j++){
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    }
};
```
## 49. 字母异位词分组
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
示例 1:
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
```js
var groupAnagrams = function (strs) {
  let map = new Map();
  for (let str of strs) {
    let key = str.split('').sort().join('');
    if (map.get(key)) {
      map.set(key, [...map.get(key), str]);
    } else {
      map.set(key, [str])
    }
  }
  return Array.from(map.values())
};
```
## 53. 最大子数组和
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
```js
function maxSubArray(nums) {
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    nums[i] += Math.max(0, nums[i - 1]);
    res = Math.max(res, nums[i]);
  }
  return res;
}
```
## 55. 跳跃游戏
给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个下标。
```js
var canJump = function(nums) {
    let maxpos = 0, n = nums.length;
    for(let i = 0; i < n; i++){
        if(i <= maxpos){
            maxpos = Math.max(maxpos, i + nums[i]);
        }
        if(maxpos >= n - 1){
            return true;
        }
    }
    return false;
};
```
## 56. 合并区间
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
```js
var merge = function(intervals) {
    let ans = [];
    intervals.sort((a, b) => a[0] - b[0]);
    for(let interval of intervals){
        let left = interval[0], right = interval[1];
        if(ans.length == 0 || ans[ans.length - 1][1] < left){
            ans.push(interval);
        } else {
            ans[ans.length - 1][1] = Math.max(ans[ans.length- 1][1], right);
        }
    }
    return ans;
};
```
## 64. 最小路径和
给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。
```js
var minPathSum = function(grid) {
    let m = grid.length, n = grid[0].length;
    for(let i = 1; i < m; i++){
        grid[i][0] += grid[i - 1][0];
    }
    for(let j = 1; j < n; j++){
        grid[0][j] += grid[0][j - 1];
    }
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    return grid[m - 1][n - 1];
};
```
## 70. 爬楼梯
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
```js
var climbStairs = function(n) {
    let a = 1, b = 1, sum = 0;
    for(let i = 0; i < n; i++){
        sum = a + b;
        a = b;
        b = sum;
    }
    return a;
};
```
## 75. 颜色分类
给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
```js
var sortColors = function(nums) {
    let p0 = 0, p1 = 0;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == 1){
            let tmp = nums[i];
            nums[i] = nums[p1];
            nums[p1] = tmp;
            p1++;
        } else if(nums[i] == 0){
            let tmp = nums[i];
            nums[i] = nums[p0];
            nums[p0] = tmp;
            if(p0 < p1){
                let tmp = nums[i];
                nums[i] = nums[p1];
                nums[p1] = tmp;
            }
            p0++;
            p1++;
        }
    }
};
```
## 76. 最小覆盖子串
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
```js
var minWindow = function(s, t) {
  let map = {};             // 存储目标字符和对应的缺失个数
  let missingType = 0;      // 当前缺失的字符种类数
  for (const c of t) {      // t为baac的话，map为{a:2,b:1,c:1}
    if (!map[c]) {
      missingType++;        // 需要找齐的种类数 +1
      map[c] = 1;
    } else {
      map[c]++;
    }
  }
  let start = Infinity， minLen = Infinity;
  let l = 0, r = 0;                // 左右指针
  for (r = 0; r < s.length; r++) {      // 主旋律扩张窗口，超出s串就结束
    let rightChar = s[r];          // 获取right指向的新字符
    if (map[rightChar] !== undefined) map[rightChar]--; // 是目标字符，它的缺失个数-1
    if (map[rightChar] == 0) missingType--;   // 它的缺失个数新变为0，缺失的种类数就-1
    while (missingType == 0) {                // 当前窗口包含所有字符的前提下，尽量收缩窗口
      if (r - l + 1 < minLen) {    // 窗口宽度如果比minLen小，就更新minLen
        minLen = r - l + 1;
        start = l;                 // 更新最小窗口的起点
      }
      let leftChar = s[l];          // 左指针要右移，左指针指向的字符要被丢弃
      if (map[leftChar] !== undefined) map[leftChar]++; // 被舍弃的是目标字符，缺失个数+1
      if (map[leftChar] > 0) missingType++;      // 如果缺失个数新变为>0，缺失的种类+1
      l++;                          // 左指针要右移 收缩窗口
    }
  }
  if (start == s.length) return "";
  return s.substring(start, start + minLen); // 根据起点和minLen截取子串 
};
```
## 78. 子集
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
```js
var subsets = function(nums) {
    let ans = [], res = [];
    backtrack(nums, ans, res, 0);
    return ans;
};

var backtrack = function(nums, ans, res, index){
    ans.push(Array.from(res));
    for(let i = index; i < nums.length; i++){
        res.push(nums[i]);
        backtrack(nums, ans, res, i + 1);
        res.splice(res.length - 1, 1);
    }
}
```
##  90. 子集 II
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
```js
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    let ans = [], res = [];
    dfs(nums, ans, res, 0);
    return ans;
};

var dfs = function(nums, ans, res, index){
    ans.push(Array.from(res));

    let map = new Map();
    for(let i = 0; i < nums.length; i++){
        map.set(nums[i], false);
    }

    for(let i = index; i < nums.length; i++){
        if(!map.get(nums[i])){
            res.push(nums[i]);
            dfs(nums, ans, res, i + 1);
            res.splice(res.length - 1, 1);
            map.set(nums[i], true)
        }
    }
}
```

## 84. 柱状图中最大的矩形
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。
```js
const largestRectangleArea = (heights) => {
  let maxArea = 0
  const stack = []
  heights = [0, ...heights, 0]         
  for (let i = 0; i < heights.length; i++) { 
    while (heights[i] < heights[stack[stack.length - 1]]) { // 当前bar比栈顶bar矮
      const stackTopIndex = stack.pop() // 栈顶元素出栈，并保存栈顶bar的索引
      maxArea = Math.max(               // 计算面积，并挑战最大面积
        maxArea,                        // 计算出栈的bar形成的长方形面积
        heights[stackTopIndex] * (i - stack[stack.length - 1] - 1)
      )
    }
    stack.push(i)                       // 当前bar比栈顶bar高了，入栈
  }
  return maxArea
}
```
## 85. 最大矩形
给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
```js
var maximalRectangle = function(matrix) {
    let ans = 0;
    let m = matrix.length, n = matrix[0].length;
    let heights = new Array(n).fill(0);
    for(let row of matrix){
        for(let i = 0; i < n; i++){
            if(row[i] == '0'){
                heights[i] = 0;
            } else {
                heights[i]++;
            }
        }
        ans = Math.max(ans, largestRectangleArea(heights.slice()));
    }
    return ans;
}

var largestRectangleArea = function(heights){
    let ans = 0;
    let stack = [];
    heights = [0, ...heights, 0];
    for(let i = 0; i < heights.length; i++){
        while(heights[i] < heights[stack[stack.length - 1]]){
            let stockTopIndex = stack.pop();
            ans = Math.max(ans, heights[stockTopIndex] * (i - stack[stack.length - 1] - 1));
        }
        stack.push(i);
    }
    return ans;
}
```
## 94. 二叉树的中序遍历
给定一个二叉树的根节点 root ，返回它的 中序 遍历。
```js
var inorderTraversal = function(root) {
    //法一：递归（隐式维护一个栈）
    let res = [];
    const inorder = (root) => {
        if(!root){
            return;
        }
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};
```
```js
var inorderTraversal = function(root) {
    //法二：迭代（显示维护一个栈）
    let res = [], stack = [];
    while(root || stack.length != 0){
        while(root){
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};
```
## 144. 二叉树的前序遍历
给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
```js
var preorderTraversal = function(root) {
    let res = [];
    recur(res, root);
    return res;
};

var recur = function(res, root){
    if(root == null) return;
    res.push(root.val);
    recur(res, root.left);
    recur(res, root.right);
}
```
## 114. 二叉树展开为链表（前序）
给你二叉树的根结点 root ，请你将它展开为一个单链表：
展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。
```js
var flatten = function(root) {
    const res = [];
    recur(root, res);
    for(let i = 1; i < res.length; i++){
        let pre = res[i - 1], cur = res[i];
        pre.left = null;
        pre.right = cur;
    }
};

var recur = function(root, res){
    if(root != null){
        res.push(root);
        recur(root.left, res);
        recur(root.right, res);
    }
}
```
## 剑指 Offer 36. 二叉搜索树与双向链表（中序）
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
## 101. 对称二叉树
给你一个二叉树的根节点 root ， 检查它是否轴对称。
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
## 剑指 Offer 07. 重建二叉树 (105. 从前序与中序遍历序列构造二叉树)
输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。
假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
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
## 437. 路径总和 III（二叉树节点和为target的路劲数目）
给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
```js
var pathSum = function(root, targetSum) {
    if (root == null) {
        return 0;
    }
    let res = recur(root, targetSum);
    res += pathSum(root.left, targetSum);
    res += pathSum(root.right, targetSum);
    return res;
};

const recur = (root, targetSum) => {
    let res = 0;
    if (root == null) {
        return 0;
    }
    targetSum -= root.val;
    if (targetSum === 0) {
        res++;
    } 

    res += recur(root.left, targetSum);
    res += recur(root.right, targetSum);
    return res;
}
```
## 面试题32 - I. 从上到下打印二叉树
从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
例如:
给定二叉树: [3,9,20,null,null,15,7],
返回：
[3,9,20,15,7]
```js
var levelOrder = function(root) {
    if(root == null) return [];
    const queue = [root];
    let ans = [];

    while(queue.length){
        let node = queue.shift();
        ans.push(node.val);
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }
    return ans;
};
```
## 面试题32 - II. 从上到下打印二叉树（层序遍历）
从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
例如:
给定二叉树: [3,9,20,null,null,15,7],
返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
]
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
## 面试题32 - III. 从上到下打印二叉树
请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
例如:
给定二叉树: [3,9,20,null,null,15,7],
返回其层次遍历结果：
[
  [3],
  [20,9],
  [15,7]
]
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
## 96. 不同的二叉搜索树
给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
```js
var numTrees = function(n) {
    const G = new Array(n + 1).fill(0);
    G[0] = 1, G[1] = 1;
    for(let i = 2; i <= n; i++){
        for(let j = 1; j <= i; j++){
            G[i] += G[j - 1] * G[i - j];
        }
    }
    return G[n];
};
```
## 98. 验证二叉搜索树
给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
```js
var isValidBST = function(root) {
    //递归
    return helper(-Infinity, root, Infinity);
};
var helper = function(lower, root, upper){
    if(root == null){
        return true;
    }
    if(root.val <= lower || root.val >= upper){
        return false;
    }
    return helper(lower, root.left, root.val) && helper(root.val, root.right, upper);
}
```
```js
var isValidBST = function(root) {
    //中序遍历：一定是升序
    let stack = [], res = -Infinity;
    while(root || stack.length){
        while(root){
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if(root.val <= res){
            return false;
        }
        res = root.val;
        root = root.right;
    }
    return true;
};
```

## 剑指 Offer 55 - I. 二叉树的深度
输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。
```js
var maxDepth = function(root) {
    if(root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```
## 543. 二叉树的直径
给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
求直径（即求路径长度的最大值）等效于求路径经过节点数的最大值减一。
```js
var diameterOfBinaryTree = function (root) {
  let ans = 1;
  maxDepth(root);

  function maxDepth(root) {
    if (root == null) return 0;
    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);
    ans = Math.max(ans, leftMax + rightMax + 1);
    return Math.max(leftMax, rightMax) + 1;
  };
  return ans - 1;
};
```
## 124. 二叉树中的最大路径和
路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
路径和 是路径中各节点值的总和。
给你一个二叉树的根节点 root ，返回其 最大路径和 。
```js
var maxPathSum = function(root) {
    let ans = -Infinity;
    maxPath(root);
    function maxPath(root){
        if(root == null) return 0;
        let leftPath = maxPath(root.left);
        let rightPath = maxPath(root.right);
        let res = root.val + leftPath + rightPath;

        ans = Math.max(res, ans);
        let output = root.val + Math.max(leftPath, rightPath, 0);
        return output < 0 ? 0 : output;
}
    return ans;
};
```
## 236. 二叉树的最近公共祖先
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
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
## 617. 合并二叉树
给你两棵二叉树： root1 和 root2 。
想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。
返回合并后的二叉树。
```js
var mergeTrees = function(root1, root2) {
    if(root1 === null) return root2;
    if(root2 === null) return root1;

    let merged = new TreeNode(root1.val + root2.val);
    merged.left = mergeTrees(root1.left, root2.left);
    merged.right = mergeTrees(root1.right, root2.right);
    return merged;
};
```
## 226. 翻转二叉树（镜像）
给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
```js
var invertTree = function (root) {
  if (root == null) return root;
  let node = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(node);
  return root;
};
```
## 297. 二叉树的序列化与反序列化
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
## 543. 二叉树的直径
给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
求直径（即求路径长度的最大值）等效于求路径经过节点数的最大值减一。
```js
var diameterOfBinaryTree = function (root) {
  let ans = 1;
  maxDepth(root);

  function maxDepth(root) {
    if (root == null) return 0;
    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);
    ans = Math.max(ans, leftMax + rightMax + 1);
    return Math.max(leftMax, rightMax) + 1;
  };
  return ans - 1;
};
```
## 538. 把二叉搜索树转换为累加树
给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和
```js
var convertBST = function(root) {
    let sum = 0;
    inOder(root);

    function inOder(root){
        if(root === null) return;
        inOder(root.right);

        sum += root.val;
        root.val = sum;

        inOder(root.left);
    }
    return root;
};
```
## 121. 买卖股票的最佳时机
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
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

## 128. 最长连续序列
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
示例 1：
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
```js
var longestConsecutive = function(nums) {
    //nums未排序，找出数字连续的最长序列，要求O(n)
    let set = new Set(nums);//数组去重放入set中
    let maxLen = 0;
    for(let num of set){//遍历集合
        if(!set.has(num - 1)){
            let currentNum = num;
            let len = 1;
            while(set.has(currentNum + 1)){
                currentNum++;
                len++;
            }
            maxLen = Math.max(maxLen, len);
        }
    }
    return maxLen;
};
```
## 136. 只出现一次的数字
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
```js
var singleNumber = function(nums) {
    let single = 0;
    for(let i = 0; i < nums.length; i++){
        single ^= nums[i];
    }
    return single;
};
```

## 152. 乘积最大子数组
给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
```js
var maxProduct = function(nums) {
    let res = nums[0];
    let preMin = nums[0], preMax = nums[0];
    let tmp1 = 0, tmp2 = 0;
    for(let i = 1; i < nums.length; i++){
        tmp1 = preMin * nums[i];
        tmp2 = preMax * nums[i];
        preMin = Math.min(tmp1, tmp2, nums[i]);
        preMax = Math.max(tmp1, tmp2, nums[i]);
        res = Math.max(res, preMax);
    }
    return res;
};
```
## 155. 最小栈
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
实现 MinStack 类:
MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。
```js
var MinStack = function() {
    this.x_stack = [];
    this.min_stack = [Infinity];
};

MinStack.prototype.push = function(x) {
    this.x_stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function() {
    this.x_stack.pop();
    this.min_stack.pop();
};

MinStack.prototype.top = function() {
    return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};
```

## 169. 多数元素
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
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

## 215. 数组中的第K个最大元素(大根堆)
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
```js
var findKthLargest = function(nums, k) {
    let heapSize = nums.length;
    buildMaxHeap(nums, heapSize);
    for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
        swap(nums, 0, i);
        --heapSize;
        maxHeapify(nums, 0, heapSize);
    }
    return nums[0];
};

var buildMaxHeap = function(nums, heapSize){
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
        maxHeapify(nums, i, heapSize);
    } 
};

var maxHeapify = function(nums, i, heapSize){
    let l = i * 2 + 1, r = i * 2 + 2, largest = i;
    if (l < heapSize && nums[l] > nums[largest]) {
        largest = l;
    } 
    if (r < heapSize && nums[r] > nums[largest]) {
        largest = r;
    }
    if (largest != i) {
        swap(nums, i, largest);
        maxHeapify(nums, largest, heapSize);
    }
};

var swap = function(nums, a, b){
    let tmp = nums[a];
    nums[a] = nums[b];
    nums[b] = tmp;
}
```

## 238. 除自身以外数组的乘积
给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
```js
var productExceptSelf = function(nums) {
    let res = new Array(nums.length);
    let p = 1, q = 1;
    for(let i = 0; i < nums.length; i++){
        res[i] = p;
        p *= nums[i];
    }
    for(let i = nums.length - 1; i > 0; i--){
        q *= nums[i]; 
        res[i - 1] *= q;
    }
    return res;
};
```

## 进制转换
```js
function solve( M ,  N ) {
    if(M == 0 ||  N == 10) return M
    let ans = []
    let flag = 1
    if(M < 0){
        M = -M
        flag = -1
    }
    let num = {
        10: 'A',
        11: 'B',
        12: 'C',
        13: 'D',
        14: 'E',
        15: 'F'
    }
     
    while(M){
        let r = M % N
        if(r >= 10){
            ans.unshift(num[r])
        }else{
            ans.unshift(r)
        }
        M = Math.floor(M/N)
    }
    if(flag == -1){
        ans.unshift('-')
    }
    return ans.join('')
     
}
module.exports = {
    solve : solve
};
```

## 207. 课程表
你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
```js
var canFinish = function (numCourses, prerequisites) {
  let inDegrees = new Array(numCourses).fill(0);
  let map = {};
  for (let i = 0; i < prerequisites.length; i++) {
    inDegrees[prerequisites[i][0]]++;   //入度记录
    if (map[prerequisites[i][1]]) {       //如果存在对这门课程的依赖
      map[prerequisites[i][1]].push(prerequisites[i][0]) //存入其依赖
    } else {
      map[prerequisites[i][1]] = [prerequisites[i][0]];
    }
  }

  let queue = [] //记录入度为0的课程
  for (let i = 0; i < inDegrees.length; i++) {
    if (inDegrees[i] === 0) {
      queue.push(i);
    }
  }

  let count = 0;
  while (queue.length) {
    let course = queue.shift();
    count++;
    let arr = map[course];
    if (arr && arr.length) {
      for (let i = 0; i < arr.length; i++) {
        inDegrees[arr[i]]--;
        if (inDegrees[arr[i]] === 0) {
          queue.push(arr[i]);
        }
      }
    }
  }

  return count == numCourses;
};
```

## 146. LRU 缓存
```js
/**
* @param {number} capacity
*/
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
};

/** 
  * @param {number} key
  * @return {number}
  */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    let temp = this.map.get(key)
    this.map.delete(key);
    this.map.set(key, temp);
    return temp
  } else {
    return -1
  }
};

/** 
  * @param {number} key 
  * @param {number} value
  * @return {void}
  */
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    this.map.delete(key);
  }
  this.map.set(key, value);
  if (this.map.size > this.capacity) {

    this.map.delete(this.map.keys().next().value);
  }
};

/**
  * Your LRUCache object will be instantiated and called as such:
  * var obj = new LRUCache(capacity)
  * var param_1 = obj.get(key)
  * obj.put(key,value)
  */
```

## 208. 实现 Trie (前缀树)
请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
```js
var Trie = function () {
  this.children = {};
};

Trie.prototype.insert = function (word) {
  let node = this.children;
  for (const ch of word) {
    if (!node[ch]) {
      node[ch] = {};
    }
    node = node[ch];
  }
  node.isEnd = true;
};

Trie.prototype.searchPrefix = function (prefix) {
  let node = this.children;
  for (const ch of prefix) {
    if (!node[ch]) {
      return false;
    }
    node = node[ch];
  }
  return node;
}

Trie.prototype.search = function (word) {
  const node = this.searchPrefix(word);
  return node !== undefined && node.isEnd !== undefined;
};

Trie.prototype.startsWith = function (prefix) {
  return this.searchPrefix(prefix);
};
```

## 滑动窗口的最大值
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
## 240. 搜索二维矩阵 II
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

## 283. 移动零
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。
```js
var moveZeroes = function(nums) {
  nums.sort((a, b) => b ? 0 : -1);
};
```
```js
var moveZeroes = function(nums) {
  let left = 0, right = 0;
  while(right < nums.length){
      if(nums[right] !== 0){
          swap(nums, left, right);
          left++;
      }
      right++;
  }

  function swap(nums, a, b){
      let tmp = nums[a];
      nums[a] = nums[b];
      nums[b] = tmp;
  }
};
```
## 287. 寻找重复数(n+1个整数，数字在[1, n]范围内)
给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。

假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。

你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
```js
var findDuplicate = function(nums) {
  let slow = 0, fast = 0;
  slow = nums[slow];
  fast = nums[nums[fast]];

  while(slow !== fast){
      slow = nums[slow];
      fast = nums[nums[fast]];
  }
  fast = 0;
  while(slow !== fast){
      slow = nums[slow];
      fast = nums[fast];
  }
  return fast;
};
```

## 338. 比特位计数
给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
```js
var countBits = function(n) {
    let res = new Array(n + 1).fill(0);
    for (let i = 0; i <= n; i++) {
        res[i] = count(i);
    }
    return res;
};

var count = function(x) {
    let ans = 0;
    while(x !== 0){
        ans += x & 1;
        x >>>= 1;
    }
    return ans;
}
```
## 删除k个数字后的最小值
给出一个整数，从该整数中删除k个数，要求在删去k个数之后，新的整数要尽可能的小，编写一个这样的函数，传入一个正整数和待删除的个数k（k的大小小于等于正整数的长度）。
```js
var removeKdigits = function(num, k) {
    let stack = [];
    for(let i = 0; i < num.length; i++){
        let c = num[i];
        while(k > 0 && stack.length && stack[stack.length - 1] > c){
            stack.pop();
            k--;
        }

        if(c != '0' || stack.length != 0){
            stack.push(c);
        }
    }
    while(k > 0){
        stack.pop();
        k--;
    }
    return stack.length == 0 ? '0' : stack.join('');
};
```
## 347. 前 K 个高频元素
给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
```js
//map + sort复杂度较高
var topKFrequent = function(nums, k) {
    let map = new Map();
    let args = [...new Set(nums)];
    nums.map(num => {
        if(map.get(num)){
            map.set(num, map.get(num) + 1);
        } else {
            map.set(num, 1);
        }
    })

    return args.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};
```
```js
//map + 小顶堆
var topKFrequent = function(nums, k) {
    let map = new Map();
    nums.map((num) => {
        if(map.has(num)) map.set(num, map.get(num)+1)
        else map.set(num, 1)
    })
    
    // 如果元素数量小于等于 k
    if(map.size <= k) {
        return [...map.keys()]
    }
    // 如果元素数量大于 k，遍历map，构建小顶堆
    let i = 0, res = [];
    map.forEach((value, key) =>{
        if(i < k){
            res.push(key);
            if(i === k - 1) minHeap(res, map);
        } else if(value > map.get(res[0])){
            res[0] = key;
            creatHeap(res, map, 0);
        }
        i++;
    })
    return res;
};

var minHeap = function(array, map){
    let start = Math.floor(array.length / 2 - 1);
    for(let i = start; i >= 0; i--){
        creatHeap(array, map, i);
    }
}

var creatHeap = function(array, map, index){
    let left = index * 2 + 1, right = index * 2 + 2, min = index;
    if(left < array.length && map.get(array[left]) < map.get(array[min])){
        min = left;
    }
    if(right < array.length && map.get(array[right]) < map.get(array[min])){
        min = right;
    }
    if(min !== index){
        let tmp = array[min];
        array[min] = array[index];
        array[index] = tmp;
        creatHeap(array, map, min);
    }
}
```
## 394. 字符串解码
给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

示例 1：
输入：s = "3[a]2[bc]"
输出："aaabcbc"
```js
var decodeString = function(s) {
    let numstck = [], strstack = [];
    let res = '', times = 0;
    for(let ch of s){
        if(!isNaN(ch)){
            times = times * 10 + (ch - 0);
        } else if(ch === '['){
            strstack.push(res);
            res = '';
            numstck.push(times);
            times = 0;
        } else if(ch === ']'){
            repeatTimes = numstck.pop();
            res = strstack.pop() + res.repeat(repeatTimes);
        } else {
            res += ch;
        }
    }
    return res;
};
```
## 399. 除法求值(邻接表)
给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。

另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案

输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
解释：
条件：a / b = 2.0, b / c = 3.0
问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
```js
// 对于 示例1，存储的邻接表就是这样的：
// Map(3) {
//   'a' => [ [ 'b', 2 ] ],
//   'b' => [ [ 'a', 0.5 ], [ 'c', 3 ] ],
//   'c' => [ [ 'b', 0.3333333333333333 ] ]
// }
var calcEquation = function(equations, values, queries) {
    let map = new Map(), visited = new Map();
    let res = [];

    for(let i = 0; i < equations.length; i++){
        let e = equations[i], v = values[i];

        if (!map.has(e[0])) {
            map.set(e[0], []);
            visited.set(e[0], false);
        }
        if (!map.has(e[1])) {
            map.set(e[1], []);
            visited.set(e[1], false);
        }

        let adj1 = map.get(e[0]);
        let adj2 = map.get(e[1]);
        adj1.push([e[1], v]);
        adj2.push([e[0], 1 / v]);
    }

    for(let q of queries){
        if(map.has(q[0]) && map.has(q[1])){
            visited.set(q[0], true);
            res.push(dfs(q[0], q[1]));
            visited.set(q[0], false);
        } else {
            res.push(-1.0)
        }
    }

    function dfs(src, dst){
        if(src === dst){
            return 1.0;
        }
        let paths = map.get(src);
        for(let i = 0; i < paths.length; i++){
            let next = paths[i];
            if(!visited.get(next[0])){
                visited.set(next[0], true);
                let ret = dfs(next[0], dst);
                visited.set(next[0], false);
                if(ret !== -1.0){
                    return ret * next[1];
                }
            }
        }
        return -1.0
    }
    return res;
};
```
## 406. 根据身高重建队列

```js
var reconstructQueue = function (people) {
    // 将people按身高从大到小排序，如果身高一样则将前面高于自己人数小的人放在前面
    people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0])
    // 创建新数组 ans
    let ans = []
    for (let i = 0; i < people.length; i++) {
        // 挨个根据前面高于自己人数插入到ans里
        // 因为people已按照身高排序，所以某个人被插入到ans里时，所有比他高的都已经在ans里了
        // 而身高比他矮的人怎样插入到ans里都不影响前面高于他的人数
        // 所以这样得到的数组就是符合我们要求的队列
        ans.splice(people[i][1],0,people[i])
    }
    return ans
};
```
## 找到字符串中所有字母异位词
给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

示例 1:
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
```js
var findAnagrams = function(s, p) {
    let sLen = s.length, pLen = p.length;
    if (sLen < pLen) {
        return [];
    }
    let count = new Array(26).fill(0);
    for(let ch of p){
        count[ch.charCodeAt() - 'a'.charCodeAt()]++;
    }
    let res = [], all = pLen;
    let l = 0, r = 0;
    for(l = 0; l < sLen; l++){
        while(r < sLen && count[s.charCodeAt(r) - 'a'.charCodeAt()]){
            all--;
            count[s.charCodeAt(r) - 'a'.charCodeAt()]--;
            r++;
        }
        if(all === 0){
            res.push(l);
        }
        count[s.charCodeAt(l) - 'a'.charCodeAt()]++;
        all++;
    }
    return res;
};
```
## 448. 找到所有数组中消失的数字
给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

示例 1：
输入：nums = [4,3,2,7,8,2,3,1]
输出：[5,6]
```js
var findDisappearedNumbers = function(nums) {
    let i = 0;
    while(i < nums.length){
        if(nums[i] === i + 1){
            i++;
            continue;
        }
        let idealIndex = nums[i] - 1;
        if(nums[i] === nums[idealIndex]){
            i++;
            continue;
        }

        [nums[i], nums[idealIndex]] = [nums[idealIndex], nums[i]];
    }
    let res = [];
    for(let i = 0; i < nums.length; i++){
        if(nums[i] !== i + 1){
            res.push(i + 1);
        }
    }
    return res;
};
```
## 461. 汉明距离
两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。

给你两个整数 x 和 y，计算并返回它们之间的汉明距离。
```js
var hammingDistance = function(x, y) {
    let s = x ^ y, res = 0;
    while(s !== 0){
        res += s & 1;
        s >>= 1;
    }
    return res;
};
```

## 581. 最短无序连续子数组
给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
请你找出符合题意的 最短 子数组，并输出它的长度

示例 1：
输入：nums = [2,6,4,8,10,9,15]
输出：5
解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
```js
var findUnsortedSubarray = function(nums) {
    let n = nums.length;
    let left = -1, right = -1;
    let max = -Infinity, min = Infinity;
    for(let i = 0; i < n; i++){
        if(max > nums[i]){
            right = i;
        } else {
            max = nums[i];
        }

        if(min < nums[n - i - 1]){
            left = n - i - 1;
        } else {
            min = nums[n - i - 1];
        }
    }
    return right === -1 ? 0 : right - left + 1;
};
```
## 621. 任务调度器
给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表。其中每个字母表示一种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。在任何一个单位时间，CPU 可以完成一个任务，或者处于待命状态。

然而，两个 相同种类 的任务之间必须有长度为整数 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。

你需要计算完成所有任务所需要的 最短时间 。
```js
var leastInterval = function(tasks, n) {
    let count = new Array(26).fill(0);
    for(let ch of tasks){
        count[ch.charCodeAt() - 'A'.charCodeAt()]++;
    }
    let max = 0; //找到最大次数
    for(let num of count){
        max = Math.max(max, num)
    }

    let res = (max - 1) * (n + 1);
    for(let num of count){
        if(num === max){
            res++;
        }
    }
    return Math.max(res, tasks.length);
};
```
## 647. 回文子串
给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
```js
var countSubstrings = function(s) {
    let ans = 0, n = s.length;
    for(let center = 0; center < 2 * n - 1; center++){
        let left = Math.floor(center / 2);
        let right = left + center % 2;
        while(left >= 0 && right < n && s.charAt(left) === s.charAt(right)){
            ans++;
            left--;
            right++;
        }
    }
    return ans;
};
```
## 739. 每日温度
给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指在第 i 天之后，才会有更高的温度。如果气温在这之后都不会升高，请在该位置用 0 来代替。

示例 1:
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
```js
//每个元素找到它右边第一个比它大的元素的位置，求它们的距离
var dailyTemperatures = function(t) {
    const res = new Array(t.length).fill(0);
    for (let i = 0; i < t.length; i++) {
        for (let j = i + 1; j < t.length; j++) {
            if (t[j] > t[i]) {
                res[i] = j - i;
                break;
            }
        }
    }
    return res;
};
```
```js
//单调栈 解法
//从右遍历，先为最右的元素找目标元素，需要考察的右边元素由少到多
//什么时候用单调栈
//通常是一维数组，要寻找任一元素右边（左边）第一个比自己大（小）的元素
//且要求 O(n) 的时间复杂度
var dailyTemperatures = function(t) {
    const res = new Array(t.length).fill(0);
    let stack = [];
    for (let i = t.length - 1; i >= 0; i--) {
        while(stack.length && t[i] >= t[stack[stack.length - 1]]){
            stack.pop();
        }
        if(stack.length){
            res[i] = stack[stack.length - 1] - i;
        }
        stack.push(i)
    }
    return res;
};
```