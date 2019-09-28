const DECISION_FIELDS_MAPPING = require('./mapping')
const JoinQuery = require('../../services/join_query.js')
const relations = require('./relations')
const capitalize = require('../helpers/capitalize')
const Enterprise = require('../enterprise/mapper')
const Lawyer = require('../lawyer/mapper')

const mappers = {
  Enterprise,
  Lawyer
}

class Decision {
  constructor(record) {
    for (let attr of DECISION_FIELDS_MAPPING) {
      const value = Reflect.get(record, attr)
      Reflect.set(this, attr, value)
    }
    this._createRelationAccessors()
  }
  _createRelationAccessors() {
    for (let relation of relations) {
      this._createRelationAccessor(relation)
    }
    return true
  }

  _createRelationAccessor(relation) {
    const { joiner, joinee } = relation
    console.log(joinee.table)
    Object.defineProperty(this, joinee.table, {
      get() {
        return new Promise((resolve, reject) => {
          this.getRelations({ joiner, joinee }).then(entities => {
            resolve(entities.map(entity => {
              console.log(entity)
              return Reflect.construct(mappers[joinee.mapper], [entity])
            }))
          }).catch(error => {
            reject(error)
          })
        })
      }
    })
  }

  getRelations({ joiner, joinee }) {
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