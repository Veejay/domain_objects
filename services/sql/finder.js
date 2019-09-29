class Finder {
  static async findOne({table, criteria, fields=null}) {
    const options = fields ? {limit: 1, ...fields} : {limit: 1}
    const record = await Reflect.get(db, table).findOne(criteria, options)
    return record
  }

  static async findAll(table, criteria, fields=null) {
    const options = fields ? fields : {}
    const records = await Reflect.get(db, table).findOne(criteria, options)
    return records
  }
}

module.exports = Finder