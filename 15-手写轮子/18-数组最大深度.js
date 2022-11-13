function getDepth(arr) {
  const eleDepths = []
  arr.forEach( ele => {
    let depth = 0
    if (Array.isArray(ele)) {
      depth = getDepth(ele)
    }
    eleDepths.push(depth)
  })
  return 1 + max(eleDepths)
}

function max(arr) {
  return arr.reduce((pre, cur) => {
    return Math.max(pre, cur)
  }, 0)
}

let arr1 = [] // 1
let arr2 = [1, [2, 2]] // 2
let arr3 = [1, [2, 2], [2, [3]]] // 3




