// 扁平化数组
let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

// 输出结果如下
let result = [
  {
      "id": 1,
      "name": "部门1",
      "pid": 0,
      "children": [
          {
              "id": 2,
              "name": "部门2",
              "pid": 1,
              "children": []
          },
          {
              "id": 3,
              "name": "部门3",
              "pid": 1,
              "children": [
                  // 结果 ,,,
              ]
          }
      ]
  }
]

/**
 * 递归查找，获取children
 */
 const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
}

/**
* 转换方法
*/
const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid)
  return result;
}

// 题目
let obj = {
  name: 'a',
  children: [
    {
      name: 'b',
      children: [
        {
          name: 'c'
        }
      ],
    },
    {
      name: 'd',
    }
  ]
}
/**
 * 目标：生成如下结构
 * @return [
 *  { key: 1, name: 'a' },
 *  { key: 2, name: 'b', parent: 'a' },
 *  { key: 3, name: 'c', parent: 'b'},
 *  { key: 4, name: 'd', parent: 'a'},
 * ]
 */
 let resultArr = []
function transform (parentObj, obj, idx ) {

  let tempObj = {
    key: idx++,
    name: obj.name || ''
  }
  if (idx > 2) {
    tempObj.parent = parentObj.name
  }

  resultArr.push(tempObj)

  if (obj.children && Array.isArray(obj.children)) {
    obj.children.forEach(item => {
      transform(tempObj, item, idx)
    });
  }
  return resultArr
}

console.log(transform(null, obj, 1))

