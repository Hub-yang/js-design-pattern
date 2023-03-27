// 在js中使用策略模式
// 1.定义策略对象
const strategies = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
}
// 2.定义环境对象，接收用户请求参数

function calculateBonus(level, salary) {
  return strategies[level](salary)
}

console.log(calculateBonus("S", 20000))
