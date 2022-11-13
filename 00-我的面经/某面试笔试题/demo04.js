 /** 
 *4.解析加减乘除指令
  加法指令:
  ADD(1, 2) => 1加2等于3 

  减法:
  SUB(2, 1) => 2减去1等于1 

  乘法:
  MUL(2, 3) => 2乘以3等于6

  除法:
  DIV(4, 2) => 4除以2等于2

  实现解析函数parse，功能如下:
  输入:
  parse(‘ADD(1,2)’)
  输出:
  3

  输入:
  parse(‘SUB(2,1)’)
  输出:
  1

  输入:
  parse(‘MUL(2,1)’)
  输出:
  2

  输入:
  parse(‘DIV(4,2)’)
  输出:
  2
*/
  let ADD = function (num1, num2) {
    return num1 + num2
  }

    let SUB = function (num1, num2) {
    return num1 - num2
  }

  let MUL = function (num1, num2) {
    return num1 * num2
  }

  let DIV = function (num1, num2) {
    return num1 / num2
  }

  function parse(val) {
    let res = eval(val)
    console.log(res)
  }
    
  parse('ADD(1, 2)')
  parse('SUB(2, 1)')
  parse('MUL(2, 1)')
  parse('DIV(4, 2)')