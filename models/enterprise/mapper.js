class Enterprise {
  constructor(record) {
    console.log(`RECORD: ${record}`)
    for (let attr of ['siren', 'id', 'name']) {
      const value = Reflect.get(record, attr)
      Reflect.set(this, attr, value)
    }
  }
}

module.exports = Enterprise