class Joinee {
  constructor({name, joinKey, fields}) {
    this._name = name;
    this._joinKey = joinKey;
    this._fields = fields;
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