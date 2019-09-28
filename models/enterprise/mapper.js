class Enterprise {
  constructor(record) {
    for (let attr of ENTERPRISE_FIELDS_MAPPING) {
      const value = Reflect.get(record, attr)
      Reflect.set(this, attr, value)
    }
  }
}

module.exports = Enterprise