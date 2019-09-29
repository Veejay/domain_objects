// configuration
const mappers = require('./mappers')
const relations = require('./relations')

// services
const JoinQuery = require('../../services/join_query.js')
const EntityBuilder = require('../../services/entity_builder')


class Decision {
  constructor(record) {
    const { fields, table } = Reflect.get(mappers, this.constructor.name)
    for (let field of fields) {
      const value = Reflect.get(record, field)
      Reflect.set(this, field, value)
    }
    this._createRelationAccessors(Reflect.get(relations, table))
  }

  // extract this to some generic location
  _createRelationAccessors(relations) {
    for (let relation of relations) {
      this._createRelationAccessor(relation)
    }
  }

  _createRelationAccessor(relation) {
    const { joiner, joinee } = relation
    const name = joinee.mapper
    Object.defineProperty(this, joinee.table, {
      get() {
        return new Promise((resolve, reject) => {
          this._getRelations({ joiner, joinee }).then(entities => {
            resolve(entities.map(entity => {
              return EntityBuilder.build({ name, data: entity })
            }))
          }).catch(error => {
            reject(error)
          })
        })
      }
    })
  }

  _getRelations({ joiner, joinee }) {
    const joinQuery = new JoinQuery({ joiner, joinee })
    return joinQuery.run(this.doc_id)
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
decision.lawyers.then(enterprises => {
  console.log(enterprises)
})