class Lawyer {
  constructor(record) {
    for (let attr of ['first_name', 'last_name', 'toque']) {
      const value = Reflect.get(record, attr)
      Reflect.set(this, attr, value)
    }
  }
}

module.exports = Lawyer