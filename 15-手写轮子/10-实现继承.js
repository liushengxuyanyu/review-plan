// es5
function Parent(name) {
  this.name = name
}

Parent.prototype.pFn = function() {
  console.log('----', this.name)
}

function Child(name) {
  Parent.call(this, name)
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

// const c1 = new Child('liu')
// const c2 = new Child('wang')

// console.log(c1)
// es6
class P {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(this.name, '----')
  }
}

class C extends P{
  constructor(name) {
    super(name)
  }

  say() {
    console.log(this.name)
  }
}


const c1 = new C('liu')
const c2 = new C('wang')
console.log(c1, c2)

