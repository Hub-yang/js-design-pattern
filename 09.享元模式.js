// 案例
const Model = function (sex) {
  this.sex = sex
}

Model.prototype.takePhoto = function () {
  console.log(`sex=${this.sex},underwear=${this.underwear}`)
}

// 创建男模特
const maleModel = new Model("male"), femaleMolde = new Model("female")

// 使用两个对象分别拍摄50张图片
for (let i = 1; i <= 50; i++) {
  maleModel.underwear = `underwear${i}`
  maleModel.takePhoto()
}

for (let j = 1; j <= 50; j++) {
  femaleMolde.underwear = `underwear${j}`
  femaleMolde.takePhoto()
}