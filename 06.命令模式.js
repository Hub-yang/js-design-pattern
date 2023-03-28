// 通过宏命令一次执行一批命令
// 创建好各个命令
let closeDoorCommand = {
  execute() {
    console.log("关门")
  }
}

let openPcCommand = {
  execute() {
    console.log("开电脑")
  }
}

let openQQCommand = {
  execute() {
    console.log("登录QQ")
  }
}

// 创建宏命令
function MacroCommand() {
  return {
    // 命令列表
    commandList: [],
    // 添加命令的方法
    add(command) {
      this.commandList.push(command)
    },
    // 宏命令的批量执行
    execute() {
      this.commandList.forEach(command => command.execute())
    }
  }
}

// 创建宏命令对象
let macroCommand = MacroCommand()
// 添加命令
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)
// 执行
macroCommand.execute()

