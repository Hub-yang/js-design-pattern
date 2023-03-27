// 计算乘积模拟需要进行缓存的复杂计算
// 缓存代理只专注于实现缓存，具体的计算过程交给真实的计算模块
var handleMult = function (...args) {
  let res = args.reduce((pre, cur) => {
    return pre * cur
  }, 1)

  return res
}

// 创建缓存代理
let proxyMult = (function () {
  let cache = {}
  return function (...args) {
    let key = args.join(",")
    if (key in cache) {
      return cache[key]
    }

    return (cache[key] = handleMult.apply(this, args))
  }
})()

console.log(proxyMult(1, 2, 3))
// 第二次计算走缓存
console.log(proxyMult(1, 2, 3))

// 创建缓存代理的工厂函数
let createProxyFactory = function (fn) {
  let cache = {}
  return function (...args) {
    let key = args.join(",")
    if (key in cache) {
      return cache[key]
    }

    return (cache[key] = fn.apply(this, args))
  }
}

// 使用
let proxyMult2 = createProxyFactory(handleMult)
console.log(proxyMult2)
