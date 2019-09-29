// configuration
const relations = require('./relations')
const Finder = require('../services/sql/finder')
// services
const JoinQuery = require('../services/sql/join_query')
const MapperBuilder = require('./builder')
const { fields, table } = Reflect.get(require('./mappers'), 'Decision')

class Decision {
  constructor(record) {
    this._init(record)
    this._createGetters(fields)
    this._createRelationGetters(Reflect.get(relations, table))
  }
  _init(record) {
    for (let field of fields) {
      const value = Reflect.get(record, field)
      Reflect.set(this, `_${field}`, value)
    }
  }
  // extract this to some generic location
  _createRelationGetters(relations) {
    for (let relation of relations) {
      this._createRelationGetter(relation)
    }
  }

  _createRelationGetter(relation) {
    const { joiner, joinee } = relation
    const name = joinee.mapper
    Object.defineProperty(this, joinee.table, {
      get() {
        return new Promise((resolve, reject) => {
          this._getRelations({ joiner, joinee }).then(entities => {
            resolve(entities.map(entity => {
              return MapperBuilder.build({ name, data: entity })
            }))
          }).catch(error => {
            reject(error)
          })
        })
      }
    })
  }
  _createGetters(fields) {
    for(let field of fields) {
      this._createGetters(field)
    }
  }

  _createGetter(field) {
    Object.defineProperty(this, field, {
      get() {
        return Reflect.get(this, `_{field}`)
      }
    })
  }
  _getRelations({ joiner, joinee }) {
    const joinQuery = new JoinQuery({ joiner, joinee })
    return joinQuery.run(this.doc_id)
  }

  static async find({ doc_id }) {
    const { fields, table } = Reflect.get(require('./mappers'), 'Decision')
    const record = await Finder.findOne(table, { doc_id }, fields)
    return new Decision(record)
  }

  static async findAll(criteria) {
    const { fields, table } = Reflect.get(require('./mappers'), 'Decision')
    const records = await Finder.findAll(table, criteria, fields)
    return records.map(record => {
      return new Decision(record)
    })
  }
}

const record = {
  doc_id: 'CEDH-099H',
  ville: 'Paris',
  google: true,
  contenu_html: '<p>hey guys</p>',
  date_dec: Date.now(),
  juridiction: 'CA',
}

const decision = new Decision(record)
console.log(decision)
decision.lawyers.then(lawyers => {
  console.log(lawyers)
})