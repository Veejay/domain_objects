const DECISION_FIELDS_MAPPING = require('./mapping')
const JoinQuery = require('../../services/join_query.js')
const Joinee = require('../../services/joinee.js')
const Joiner = require('../../services/joiner.js')

const Enterprise = require('../enterprise/mapper')

class Decision {
  constructor(record) {
    for (let attr of DECISION_FIELDS_MAPPING) {
      const value = Reflect.get(record, attr)
      Reflect.set(this, attr, value)
    }
  }

  get jurisdiction() {
    return this.juridiction
  }

  get lawyers() {
    return this._getLawyers()
  }

  _getLawyers() {
    const joiner = new Joiner({
      name: 'decisions_lawyers',
      joinKey: 'lawyer_id',
      filterKey: 'doc_id'
    })
    const joinee = new Joinee({
      name: 'lawyers',
      joinKey: 'id',
      fields: ['first_name', 'id', 'last_name', 'toque']
    })
    const joinQuery = new JoinQuery({ joiner, joinee })
    return joinQuery.run(this.doc_id)
  }

  // this ends up being consumed by the outside world as
  // const enterprises = await decision.enterprises
  get enterprises() {
    return new Promise((resolve, reject) => {
      this._getEnterprises().then(enterprises => {
        resolve(enterprises.map(enterprise => {
          return new Enterprise(enterprise)
        }))
      }).catch(error => {
        reject(error)
      })
    })
  }

  _getEnterprises() {
    const joiner = new Joiner({
      name: 'decisions_enterprises',
      joinKey: 'enterprise_id',
      filterKey: 'doc_id'
    })
    const joinee = new Joinee({
      name: 'enterprises',
      joinKey: 'id',
      fields: ['enterprise_name', 'id', 'siren']
    })
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
console.log(decision.lawyers)