// js：对象方式实现通用的发布订阅模式，创建全局的事件中心，实现不同模块之间的通信
// 实现通用发布订阅功能对象
let Event = (function () {
  let events = {};
  // 订阅
  function on(key, cb) {
    if (!events[key]) {
      events[key] = [];
    }
    events[key].push(cb);
  }
  // 发布
  function emit(key) {
    let args = Array.prototype.splice.call(arguments, 1);
    if (!events[key] || events[key].length == 0) return false;
    events[key].forEach((cb) => {
      cb.apply(this, args);
    });
  }
  // 取消订阅
  function off(key, cb) {
    if (!events[key]) return false;
    if (!cb) {
      // 如果没有传入具体的回调，则需要取消当前key对应的所有订阅
      events[key].length = 0;
    } else {
      // 实现1
      // let index = events[key].indexOf(cb)
      // events[key].splice(index, 1)
      // 实现2
      events[key] = events[key].filter((item) => {
        return item !== cb;
      });
    }
  }
  return {
    on,
    emit,
    off,
  };
})();

// 测试
let fn1 = function (msg) {
  console.log(msg);
};

Event.on("sayMsg", fn1);
Event.emit("sayMsg", "test");
// 取消订阅
Event.off("sayMsg", fn1);
Event.emit("sayMsg", "test");

// 基于类实现发布订阅模式
class Publisher {
  constructor() {
    this.events = {};
  }

  on(key, cb) {
    if (!this.events[key]) {
      this.events[key] = [];
    }
    this.events[key].push(cb);
  }

  emit() {
    let key = Array.prototype.shift.call(arguments);
    if (!this.events[key]) return;
    this.events[key].forEach((cb) => {
      cb.apply(this, arguments);
    });
  }

  off(key, cb) {
    let eventList = this.events[key];
    if (!eventList) return;
    if (!cb) {
      eventList.length = 0;
    } else {
      eventList.forEach((item, i) => {
        if (item == cb) {
          eventList.splice(i, 1);
        }
      });
    }
  }
}

let publisher = new Publisher();
let fn2 = (name) => {
  console.log(name);
};

publisher.on("click", fn2);
publisher.emit("click", "shuai");
// 取消订阅
publisher.off("click", fn2);
publisher.emit("click", "shuai");
