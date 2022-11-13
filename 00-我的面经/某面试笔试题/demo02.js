/**
 * 2.给定一个数组，数组记录了当前数据的ID，和后面紧邻的数据ID。对该数据进行分组，实现以下功能:
功能描述: 
对数组进行分类，
如果当前数据没有被其他数据的next指向，则为一个数组的第一个数据，
如果当前数据有被其他数据的next指向，则排在next指向的后面，
其他以此类推。
const data = [
    { id: 1, next: 2 },
    { id: 3, next: 4 },
    { id: 4, next: 5 },
    { id: 5, next: 6 },
    { id: 6, next: 7 },
    { id: 7, next: 8 },
    { id: 8, next: 9 },
    { id: 2, next: 10 },
    { id: 20, next: 30 },
    { id: 30, next: 40 },
    { id: 100, next: 78 }
]

getLinks(data)
=>
[
    [{ id: 1, next: 2 }, { id: 2, next: 10 }],
    [{ id: 3, next: 4 }, { id: 4, next: 5 }, { id: 5, next: 6 }, { id: 6, next: 7 }, { id: 7, next: 8 }, { id: 8, next: 9 }]
    [{ id: 20, next: 30 }, { id: 30, next: 40 }],
    [{ id: 100, next: 78 }]
]
 */

const data = [
  { id: 1, next: 2 },
  { id: 3, next: 4 },
  { id: 4, next: 5 },
  { id: 5, next: 6 },
  { id: 6, next: 7 },
  { id: 7, next: 8 },
  { id: 8, next: 9 },
  { id: 2, next: 10 },
  { id: 20, next: 30 },
  { id: 30, next: 40 },
  { id: 100, next: 78 }
]

function getLinks(data) {
  const map = new Map()
  data.forEach(item => {
    map.set(item.id, item)
  })
  const sumArr = []
  let arr = []
  data.forEach((item, idx) => {
    // if(item.id === 30) {
    //   debugger
    // }
    if (arr.length === 0) {
      arr.push(item)
      sumArr.push(arr)
      // { id: 1, next: 2 },
    } else {
      const id = arr[arr.length - 1].next
      if (map.has(id)) {
        arr.push(map.get(id))
      } else {
        // sumArr.push(arr)
        arr = []
        // 如果匹配不到的话，最后一个数据直接push
        if (idx === data.length - 1) {
          sumArr.push([item])
        }
      }
    }
  })
  return sumArr
}

console.log(getLinks(data))