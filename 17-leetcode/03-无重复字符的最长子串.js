/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * 思路：
    这道题主要用到思路是：滑动窗口
    什么是滑动窗口？
    其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！
    如何移动？
    我们只要把队列的左边的元素移出就行了，直到满足题目要求！
    一直维持这样的队列，找出队列出现最长的长度时候，求出解！
    时间复杂度：O(n)O(n)
 */

var lengthOfLongestSubstring = function(s) {
    let len = 0
    let tempArr = []
    for (let i = 0; i < s.length; i++) {
        let idx = tempArr.indexOf(s[i])
        if (idx > -1) {
            tempArr = tempArr.slice(idx + 1)    
        } 
        tempArr.push(s[i])
        len = Math.max(tempArr.length, len)
    }
    return len
};

lengthOfLongestSubstring('abcabcbb')

var climbStairs = function(s) {
  let maxLen = 0
  let tempArr = []
  // let result = new Map()
  for (let i = 0; i < s.length; i++) {
    let idx = tempArr.indexOf(s[i])
    if (idx > -1) {
      tempArr = tempArr.slice(idx + 1)
    }
    tempArr.push(s[i])
    // 如果还要找到最长度子串的值 还需要存储起来
    result.set(tempArr.join(''), tempArr.length)
    maxLen = Math.max(tempArr.length, maxLen)
  }
  // 
  let arr = []
  for (let [key, value] of result) {
      if (maxLen === value) {
        arr.push(key)
      }
  }
  return [result, maxLen, arr]
}