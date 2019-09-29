const Enterprise = require('../models/enterprise/mapper')
const Lawyer = require('../models/lawyer/mapper')

const mappers = {
  Enterprise,
  Lawyer,
}

class EntityBuilder {
  static build({ name, data }) {
    const mapper = Reflect.get(mappers, name)
    return Reflect.construct(mapper, [data])
  }
}

module.exports = EntityBuilder;