class Joinee {
  constructor({name, joinKey, fields, mapper}) {
    this._name = name;
    this._joinKey = joinKey;
    this._fields = fields;
    this._mapper = mapper
  }
  get table() {
    return this._name
  }
  buildEntity(data) {
    return Reflect.construct(this._mapper, [data])
  }
  get mapper() {
    return this._mapper;
  }
  get name() {
    return `${this._name} as joinee`;
  }

  get joinKey() {
    return `joinee.${this._joinKey}`;
  }

  get fields() {
    const uniqueFields = [...new Set(this._fields)]
    return uniqueFields.map(field => {
      return `joinee.${field}`;
    })
  }
}

module.exports = Joinee