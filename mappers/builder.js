const Enterprise = require('./enterprise')
const Lawyer = require('./lawyer')

const mappers = {
  Enterprise,
  Lawyer,
}

class MapperBuilder {
  static build({ name, data }) {
    const mapper = Reflect.get(mappers, name)
    return Reflect.construct(mapper, [data])
  }
}

module.exports = MapperBuilder;