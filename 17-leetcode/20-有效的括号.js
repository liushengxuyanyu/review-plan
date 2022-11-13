/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。

示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
 
提示：

1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/valid-parentheses
 */

/**
 * 解题思路：
算法原理

栈先入后出特点恰好与本题括号排序特点一致，即若遇到左括号入栈，遇到右括号时将对应栈顶左括号出栈，则遍历完所有括号后 stack 仍然为空；
建立哈希表 dic 构建左右括号对应关系：keykey 左括号，valuevalue 右括号；这样查询 22 个括号是否对应只需 O(1)O(1) 时间复杂度；建立栈 stack，遍历字符串 s 并按照算法流程一一判断。

算法流程
如果 c 是左括号，则入栈 pushpush；
否则通过哈希表判断括号对应关系，若 stack 栈顶出栈括号 stack.pop() 与当前遍历括号 c 不对应，则提前返回 falsefalse。
提前返回 falsefalse

提前返回优点： 在迭代过程中，提前发现不符合的括号并且返回，提升算法效率。
解决边界问题：
栈 stack 为空： 此时 stack.pop() 操作会报错；因此，我们采用一个取巧方法，给 stack 赋初值 ?? ，并在哈希表 dic 中建立 key: '?'，value:'?'key: 
′
 ? 
 ，value: 
′
 ? 
′
  的对应关系予以配合。此时当 stack 为空且 c 为右括号时，可以正常提前返回 falsefalse；
字符串 s 以左括号结尾： 此情况下可以正常遍历完整个 s，但 stack 中遗留未出栈的左括号；因此，最后需返回 len(stack) == 1，以判断是否是有效的括号组合。
复杂度分析

时间复杂度 O(N)O(N)：正确的括号组合需要遍历 11 遍 s；
空间复杂度 O(N)O(N)：哈希表和栈使用线性的空间大小。

链接：https://leetcode.cn/problems/valid-parentheses/solution/valid-parentheses-fu-zhu-zhan-fa-by-jin407891080/
来源：力扣（LeetCode）
 */

var isValid = function(s) {
  let map = new Map(
      [
          ['(', ')'],
          ['{', '}'],
          ['[', ']']
      ]
  ) 
  let arr = []
  for (let i = 0; i < s.length; i++) {
      if (map.has(s[i])) {
        // 遇到左括号 就入栈
          arr.push(s[i])
      } else {
        // 否则出栈 栈顶的左括号（映射成右括号后） 和 当前 右括号作比较，
        // 如果不相等提前false退出
          let popItem = arr.pop()
          if (map.get(popItem) !== s[i]) {
              return false
          }
      }
  }
  return arr.length === 0
};