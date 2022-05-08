---
title: 数组题
date: 2021-12-12
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
数组篇
:::
<!-- more -->
##  1. 两数之和
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
```js
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i]
        } else {
            map.set(nums[i], i)
        }
    }
};
```
##  11. 盛最多水的容器
给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
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
##  15. 三数之和
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
```js
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
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
            } else {
                third--;
            }
        }
    }
    return ans;
};
```
##  16. 最接近的三数之和
给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。返回这三个数的和。
```js
var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b)
    let best = 1000000000;
    let len = nums.length;

    for(let first = 0; first < len; first++){
        if(first > 0 && nums[first] == nums[first - 1]) continue;
        let second = first + 1, third  = len - 1;
        while(second < third){
            let sum  = nums[first] + nums[second] + nums[third];
            if(sum == target) return sum;
            if(Math.abs(sum - target) < Math.abs(best - target)){
                best = sum;
            }
            if(sum < target){
                while(second < third && nums[second] == nums[second + 1]) second++;
                second++;
            }
            if(sum > target){
                while(second < third && nums[third] == nums[third - 1]) third--;
                third--;
            }
        }
    }
    return best;
};
```
##  18. 四数之和
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] 
```js
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    let len = nums.length;
    let ans = [];
    if(len < 4) return ans;

    for(let first = 0; first < len - 3; first++){
        if(first > 0 && nums[first] == nums[first - 1]) continue;
        if(nums[first] + nums[len -3] + nums[len - 2] + nums[len - 1] < target) continue;
        if(nums[first] + nums[first + 1] + nums[first + 2] + nums[first + 3] > target) break;
        for(let second = first + 1; second < len - 2; second++){
            if(second > first + 1 && nums[second] == nums[second - 1]) continue;
            if(nums[first] + nums[second] + nums[len - 2] + nums[len - 1] < target) continue;
            if(nums[first] + nums[second] + nums[second + 1] + nums[second + 2] > target) break
            let third = second + 1, forth = len - 1;
            while(third < forth){
                let sum = nums[first] + nums[second] + nums[third] + nums[forth];
                if(sum == target){
                    ans.push([nums[first],nums[second], nums[third], nums[forth]]);
                    while(third < forth && nums[third] == nums[third + 1]){
                        third++;
                    }
                    third++;
                    while(third < forth && nums[forth] == nums[forth - 1]){
                        forth--;
                    }
                    forth--;
                }
                else if(sum < target) third++;
                else forth--;
            }
        }
    }
    return ans;
};
```
##  26. 删除有序数组中的重复项
给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
```js
var removeDuplicates = function(nums) {
    let  i = 0;
    for(let j = 1; j < nums.length; j++){
        if(nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
};
```
##  27. 移除元素
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
```js
var removeDuplicates = function(nums) {
    let  i = 0;
    for(let j = 1; j < nums.length; j++){
        if(nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
};
```
##  31. 下一个排列
整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
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
        swap(nums, i, j)
    }
    reverse(nums, i + 1);
};

var swap = function(nums, i, j){
    let tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}

var reverse = function(nums, n){
    let left  = n, right  = nums.length - 1;
    while(left < right){
        swap(nums, left, right);
        left++;
        right--;
    }
}
```
## 33. 搜索旋转排序数组
整数数组 nums 按升序排列，数组中的值 互不相同 。
在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
```js
var search = function(nums, target) {
    if(nums.length == 0) return -1;
    if(nums.length == 1) return nums[0] == target ? 0 : -1;
    let l = 0, r  = nums.length - 1;

    while(l <= r){
        let mid = Math.floor((l + r) / 2);
        if(nums[mid] == target) return mid;
        if(nums[0] <= nums[mid]){
            if(nums[0] <= target && target < nums[mid]){
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        } else {
            if(nums[mid] < target && target <= nums[nums.length - 1]){
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
    }
    return -1;
};
```

## 35. 搜索插入位置
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。请必须使用时间复杂度为 O(log n) 的算法。
```js
var searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        if(nums[mid] == target){
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return Math.floor((left + right) / 2) + 1;
};
```
## 36. 有效的数独
请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。
数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
```js
var isValidSudoku = function(board) {
    let rows = [], colunms = [], boxes = [];
    for(let i = 0; i < 9; i++){
        rows[i] = new Map();
        colunms[i] = new Map();
        boxes[i] = new Map();
    }

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let num = board[i][j];
            if(num != '.'){
                let n = parseInt(num);
                let index = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                let existInRow = rows[i].get(n) == undefined ? 0 : rows[i].get(n);
                let existInColunm = colunms[j].get(n) == undefined ? 0 : colunms[j].get(n);
                let existInBox = boxes[index].get(n) == undefined ? 0 : boxes[index].get(n);
                console.log(existInRow, existInColunm, existInBox)
                rows[i].set(n, existInRow + 1);
                colunms[j].set(n, existInColunm + 1);
                boxes[index].set(n, existInBox + 1);

                if(rows[i].get(n) > 1 || colunms[j].get(n) > 1 || boxes[index].get(n) > 1)
                return false;
            }
        }
    }
    return true;
};
```
## 37. 解数独

```js
var solveSudoku = function(board) {
    function isValid(row, colum, val, board){
        let len = board.length;
        for(let i = 0; i < len; i++){
            if(board[row][i] == val){
                return false;
            }
        }
        for(let i = 0; i < len; i++){
            if(board[i][colum] == val){
                return false;
            }
        }
        let boxRow = Math.floor(row / 3) * 3;
        let boxcolum = Math.floor(colum / 3) * 3;
        for(let i = boxRow; i < boxRow + 3; i++){
            for(let j = boxcolum; j < boxcolum + 3; j++){
                if(board[i][j] == val){
                    return false;
                }
            }
        }
        return true;
    }

    function backTracking(){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(board[i][j] !='.') continue;
                for(let val = 1; val <= 9; val++){
                    if(isValid(i, j, val, board)){
                        board[i][j] = String(val);
                        if(backTracking()){
                            return true;
                        }
                        board[i][j] = '.';
                    }
                }
                return false;
            }
        }
        return true;
    }
    backTracking(board);
    return board;
};
```
## 39. 组合总和(和为target的组合)
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
```js
var combinationSum = function(candidates, target) {
    let ans = [], res = [];
    dfs(candidates, target, ans, res, 0);
    return ans;
};

var dfs = function(candidates, target, ans, res, index){
    if(index == candidates.length){
        return;
    }
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
## 40. 组合总和 II
给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
candidates 中的每个数字在每个组合中只能使用 一次 。
```js
var combinationSum2 = function(candidates, target) {
    let ans = [], res = [];
    candidates.sort((a, b) => a - b);
    dfs(candidates, target, ans, res, 0);
    return ans;
};

var dfs = function(candidates, target, ans, res, index){
    if(target == 0){
        ans.push(Array.from(res));
        return;
    }
    
    for(let i = index; i < candidates.length; i++){
        if(i > index && candidates[i] == candidates[i - 1]) continue;
        if(target - candidates[i] >= 0){
            res.push(candidates[i]);
            dfs(candidates, target - candidates[i], ans, res, i + 1);
            res.splice(res.length - 1, 1);
        }
    }
}
```
## 41. 缺失的第一个正数
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
```js
var firstMissingPositive = function(nums) {
    for(let i = 0; i < nums.length; i++){
        if(nums[i] <= 0){
            nums[i] = nums.length + 1;
        }
    }

    for(let i = 0; i < nums.length; i++){
        if(nums[i] <= nums.length){
            let n = Math.abs(nums[i]);
            nums[n - 1] = - Math.abs(nums[n - 1]);
        }
    }

    for(let i = 0; i < nums.length; i++){
        if(nums[i] > 0){
            return i + 1;
        }
    }
    return nums.length + 1;
};
```
## 42. 接雨水

```js
var trap = function(height) {
    let left = 0, right = height.length - 1, ans = 0;
    let leftMax = 0, rightMax = 0;
    while(left < right){
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if(height[left] < height[right]){
            ans += leftMax - height[left];
            left++;
        }
        else{
            ans += rightMax - height[right];
            right--;
        }
    }
    return ans;
};
```
## 55. 跳跃游戏
给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个下标。
```js
var canJump = function(nums) {
    let maxpos = 0, n = nums.length - 1;
    for(let i = 0; i <= n; i++){
        if(i <= maxpos){
            maxpos = Math.max(maxpos, i + nums[i]);
        }
        if(maxpos >= n){
            return true;
        }
    }
    return false;
};
```
## 45. 跳跃游戏 II
给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
你的目标是使用最少的跳跃次数到达数组的最后一个位置。
假设你总是可以到达数组的最后一个位置。
```js
ar jump = function(nums) {
    let maxpos = 0, end = 0, step = 0;
    for(let i = 0; i < nums.length - 1; i++){
        maxpos = Math.max(maxpos, i + nums[i]);
        if(i == end){
            end = maxpos;
            step++;
        }
    }
    return step;
};
```
## 46. 全排列
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
```js
var permute = function(nums) {
    var res = [], ans = [];
    let n = nums.length;
    for(let i = 0; i < n; i++){
        res.push(nums[i]);
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
}

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
## 48. 旋转图像
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度
```js
var rotate = function(matrix) {
    let n = matrix.length; 
    for(let i = 0; i < n/2; i++){
        for(let j = 0; j < n; j++){
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[n - 1 - i][j];
            matrix[n - 1 - i][j] =tmp;
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
## 51. N 皇后
n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
```js
var solveNQueens = function(n) {
    let solutions = [];
    let queens = new Array(n).fill(-1);
    let cols = [], diags1 = [], diags2 = [];
    dfs(solutions, queens, cols, diags1, diags2, n, 0);
    return solutions;
};

var dfs = function(solutions, queens, cols, diags1, diags2, n, row){
    if(row == n){
        let board = createBoard(queens, n);
        solutions.push(board);
    }

    for(let i = 0; i < n; i++){
        if(cols.includes(i)) continue;
        let diag1 = row - i;
        if(diags1.includes(diag1)) continue;
        let diag2 = row + i;
        if(diags2.includes(diag2)) continue;
        queens[row] = i;
        cols.push(i);
        diags1.push(diag1);
        diags2.push(diag2);
        dfs(solutions, queens, cols, diags1, diags2, n, row + 1);
        queens.splice(queens.length - 1, 1);
        cols.splice(cols.length - 1, 1);
        diags1.splice(diags1.length - 1, 1);
        diags2.splice(diags2.length - 1, 1);
    }
}

var createBoard = function(queens, n){
    let board = [];
    for(let i = 0; i < n; i++){
        let row = new Array(n).fill('.');
        row[queens[i]] = 'Q';
        board.push(row.join(''));
    }
    return board;
}
```

## 54. 螺旋矩阵
给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
```js
var spiralOrder = function(matrix) {
    let ans = [];
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
## 59. 螺旋矩阵 II
给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
```js
var generateMatrix = function(n) {
    let num = 1, matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let left = 0, right = n - 1, top = 0, bottom = n - 1;
    while(left <= right && top <= bottom){
        for(let colunm = left; colunm <= right; colunm++){
            matrix[top][colunm] = num;
            num++;
        }
        for(let row = top + 1; row <= bottom; row++){
            matrix[row][right] = num;
            num++;
        }
        if(left < right && top < right){
            for(let colunm = right - 1; colunm >= left; colunm--){
                matrix[bottom][colunm] = num;
                num++;
            }
            for(let row = bottom - 1; row > top; row--){
                matrix[row][left] = num;
                num++;
            }
        }
        right--;
        left++;
        top++;
        bottom--;
    }
    return matrix;
};
```
## 56. 合并区间
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
```js
var merge = function(intervals) {
    let ans = [];
    intervals.sort((a, b) => a[0] - b[0]);
    for(let i = 0; i < intervals.length; i++){
        let left = intervals[i][0], right = intervals[i][1];
        if(ans.length == 0 || ans[ans.length - 1][1] < left){
            ans.push([left, right]);
        } else {
            ans[ans.length - 1][1] = Math.max(ans[ans.length - 1][1], right);
        }
    }
    return ans;
};
```
## 57. 插入区间
给你一个 无重叠的 ，按照区间起始端点排序的区间列表。
在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。
```js
var insert = function(intervals, newInterval) {
    let ans = [], placed = false;
    let left = newInterval[0], right = newInterval[1];
    for(let i = 0; i < intervals.length; i++){
        if(intervals[i][1] < left){
            ans.push(intervals[i]);
        } else if(intervals[i][0] > right){
            if(!placed){
                ans.push([left, right]);
                placed = true;
            }
            ans.push(intervals[i]);
        } else {
            left = Math.min(left, intervals[i][0]);
            right = Math.max(right, intervals[i][1]);
        }
    }
    if(!placed){
        ans.push([left, right]);
    }
    return ans;
};
```
## 66. 加一
给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。
示例 1：
输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。
```js
var plusOne = function(digits) {
    for(let i = digits.length - 1; i >= 0; i--){
        digits[i]++;
        digits[i] = digits[i] % 10;
        if(digits[i] != 0){
            return digits;
        }
    }
    let newDigits = new Array(digits.length + 1).fill(0);
    newDigits[0] = 1;
    return newDigits;
};
```
## 73. 矩阵置零
给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
```js
var setZeroes = function(matrix) {
    let m =matrix.length, n = matrix[0].length;
    let row0_flag = false, colunm0_flag = false;

    //记录第一行是否有0
    for(let i = 0; i < n; i++){
        if(matrix[0][i] == 0){
            row0_flag = true;
            break;
        }
    }
    //记录第一列是否有0
    for(let i = 0; i < m; i++){
        if(matrix[i][0] == 0){
            colunm0_flag = true;
            break;
        }
    }
    //在第一行、第一列记录0
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            if(matrix[i][j] == 0){
                matrix[i][0] = matrix[0][j] = 0;
            }
        }
    }
    //置0
    for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            if(matrix[i][0] == 0 || matrix[0][j] == 0){
                matrix[i][j] = 0;
            }
        }
    }
    if(row0_flag){
        for(let i = 0; i < n; i++){
            matrix[0][i] = 0;
        }
    }
    if(colunm0_flag){
        for(let i = 0; i < m; i++){
            matrix[i][0] = 0;
        }
    }
};
```
## 75. 颜色分类
给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色
```js
var sortColors = function(nums) {
    let p0 = 0, p1 = 0;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == 1){
            let tmp = nums[i];
            nums[i] = nums[p1];
            nums[p1] = tmp;
            p1++
        } else if(nums[i] == 0){
            let tmp = nums[i];
            nums[i] = nums[p0];
            nums[p0] = tmp;
            if(p0 < p1){
                let tmp = nums[i];
                nums[i] = nums[p1];
                nums[p1] = tmp
            }
            p0++;
            p1++;
        }
    }
};
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
## 88. 合并两个有序数组
给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
示例 1：
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
```js
var merge = function(nums1, m, nums2, n) {
    let len1 = m - 1, len2 = n - 1;
    let len = m + n - 1, cur = 0 ;
    while(len1 >= 0 || len2 >= 0){
        if(len1 == -1){
            cur = nums2[len2--];
        } else if(len2 == -1){
            cur = nums1[len1--];
        } else if(nums1[len1] >= nums2[len2]){
            cur = nums1[len1--]
        } else {
            cur = nums2[len2--]
        }
        nums1[len--] = cur;
    }
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
## 122. 买卖股票的最佳时机 II
给定一个数组 prices ，其中 prices[i] 表示股票第 i 天的价格。
在每一天，你可能会决定购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以购买它，然后在 同一天 出售。
返回 你能获得的 最大 利润 。
```js
var maxProfit = function(prices) {
    let profit = 0;
    for(let i = 1; i < prices.length; i++){
        let tmp = prices[i] - prices[i - 1];
        if(tmp > 0){
            profit += tmp;
        }
    }
    return profit;
};
```
## 123. 买卖股票的最佳时机 III
给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
```js
var maxProfit = function(prices) {
    if(prices.length < 2){
        return 0;
    }

    let dp0 = 0,          // 一直不买
        dp1 = -prices[0], // 到最后也只买入了一笔
        dp2 = -Infinity,  // 到最后买入一笔，卖出一笔
        dp3 = -Infinity,  // 到最后买入两笔，卖出一笔
        dp4 = -Infinity;  // 到最后买入两笔，卖出两笔
    for(let i = 1; i < prices.length; i++){
        dp1 = Math.max(dp1, dp0 - prices[i]);
        dp2 = Math.max(dp2, dp1 + prices[i]);
        dp3 = Math.max(dp3, dp2 - prices[i]);
        dp4 = Math.max(dp4, dp3 + prices[i]);
    }
    return dp4;
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
## 215. 数组中的第K个最大元素
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
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
## 217. 存在重复元素
给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
```js
var containsDuplicate = function(nums) {
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == nums[i + 1]){
            return true;
        }
    }
    return false;
};
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
## 137. 只出现一次的数字 II

```js

```