class Joiner {
  constructor({ name, joinKey, filterKey }) {
    this._name = name;
    this._joinKey = joinKey;
    this._filterKey = filterKey
  }

  get table() {
    return this._name;
  }

  get name() {
    return `${this._name} as joiner`
  }

  get joinKey() {
    return `joiner.${this._joinKey}`
  }

  get filterKey() {
    return `joiner.${this._filterKey}`
  }
}

module.exports = Joiner