/**
 * 
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

示例 1：

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶
示例 2：

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶

 地址： https://leetcode.cn/problems/climbing-stairs/
 */

 /*
 * 通过分析规律：
      从3阶开始：2阶的次数 + 1阶的次数
      4: 3阶的次数 + 2阶的次数
      ...
      因此得到公式：f[n] = f[n - 1] + f[n - 2]
 */
 

var climbStairs = function(n) {
  // 通过索引记录每阶 爬楼梯的方式次数
  let path = []
  path[1] = 1
  path[2] = 2
  for (let i = 3; i <= n; i++) {
    path[i] = path[i - 1] + path[i - 2]
  }
  return path[n]
}

climbStairs()