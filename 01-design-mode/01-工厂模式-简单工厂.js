/**
 * 将创建对象的过程单独封装，这样的操作就是工厂模式。同时它的应用场景也非常容易识别：有构造函数的地方，
 * 我们就应该想到简单工厂；在写了大量构造函数、调用了大量的 new、自觉非常不爽的情况下，我们就应该思考是不是可以掏出工厂模式重构我们的代码了。
 */

function User(name, age, career, work) {
  this.name = name
  this.age = age
  this.career = career
  this.work = work
}

function factory(name, age, career) {
  var work = []
  switch (career) {
    case 'code':
        work = ['写代码', '改bug']
      break
    case 'product':
        work = ['写文档', '提需求']
    case 'boss':
        work = ['喝茶', '待着']
    default:
      break
  }
  return new User(name, age, career, work)
}