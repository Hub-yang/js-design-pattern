// 组合模式的案例，拷贝文件至现有目录并进行扫描

// 声明文件夹Folder类
function Folder(name) {
  this.name = name
  this.parent = null // 新增对父文件的引用
  this.files = []
}

Folder.prototype.add = function (file) {
  file.parent = this
  this.files.push(file)
}

Folder.prototype.scan = function () {
  console.log("开始扫描文件夹" + this.name)
  for (let i = 0, file; file = this.files[i++];) {
    file.scan()
  }
}

// 新增删除：用到对父对象的引用
Folder.prototype.remove = function () {
  for (let i = 0, files = this.parent.files; i < files.length; i++) {
    let file = files[i]
    if (file === this) {
      files.splice(i, 1)
    }
  }
}

// 声明文件File类
function File(name) {
  this.parent = null // 新增对父文件的引用
  this.name = name
}

File.prototype.add = function () {
  throw new Error("文件下面不能再添加文件")
}

File.prototype.scan = function () {
  console.log("开始扫描文件" + this.name)
}

// 新增删除
File.prototype.remove = function () {
  for (let i = 0, files = this.parent.files; i < files.length; i++) {
    let file = files[i]
    if (file === this) {
      files.splice(i, 1)
    }
  }
}


// 创建现有目录结构
const folder = new Folder("学习资料")
const folder1 = new Folder("JavaScript")
const folder2 = new Folder("JQuery")

const file1 = new File("JavaScript设计模式与开发实践")
const file2 = new File("精通JQuery")
const file3 = new File("重构与设计")

folder1.add(file1)
folder2.add(file2)
folder.add(folder1)
folder.add(folder2)
folder.add(file3)

// console.log(folder)

// 接下来将一些新增的文件添加到已有的目录结构中
const folder3 = new Folder("Nodejs")
const file4 = new File("深入浅出Nodejs")
folder3.add(file4)

const file5 = new File("JavaScript语言精髓与编程实践")

folder.add(folder3)
folder.add(file5)

// console.log(folder)

// 扫描整个文件夹
// folder.scan()

// 通过组合模式的实现，我们改变了原有树的结构，新增了数据，却不用修改任何一行原有代码，这是符合开放-封闭原则的


// 在组合模式中：保存对父对象的引用
// 新增删除功能：删除子文件时需要知道其父文件，从父文件删除当前文件
// 测试删除
file5.remove()
// folder.scan()

folder1.remove()
folder.scan()

