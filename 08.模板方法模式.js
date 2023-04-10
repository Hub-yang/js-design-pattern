// js实现模板方法模式真的需要继承吗？（思考）
// 通过一个高阶函数实现和案例功能相同的模板方法模式
function Beverage(params) {
  const boilWater = function () {
    console.log("把水煮沸");
  }
  const brew = params.brew || (function () {
    throw new Error("子类必须重写抽象方法")
  })

  const pourInCup = params.pourInCup || (function () {
    throw new Error("子类必须重写抽象方法")
  })

  const customerWantsCondiments = params.customerWantsCondiments || (function () {
    return true
  })

  const addCondiments = params.addCondiments || (function () {
    throw new Error("子类必须重写抽象方法")
  })

  const F = function () { }
  F.prototype.init = function () {
    boilWater()
    brew()
    pourInCup()
    if (customerWantsCondiments()) {
      addCondiments()
    }
  }
  return F
}

const Coffee = Beverage({
  brew() {
    console.log("用沸水冲泡咖啡")
  },
  pourInCup() {
    console.log("把咖啡倒进杯子");
  },
  customerWantsCondiments() {
    return window.confirm("请问是否添加糖和牛奶")
  },
  addCondiments() {
    console.log("加糖和牛奶");
  }
})

const coffee = new Coffee()
coffee.init()

