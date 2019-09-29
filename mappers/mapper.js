
const relations = require('./relations')

// services
const JoinQuery = require('../services/sql/join_query')
const MapperBuilder = require('./builder')
/**
 * @description this is the base class describing a mapper
 * and the getters to access associated mappers through relations
 */
class Mapper {
  /**
   * 
   * @param {Array} fields - the fields we want to pull from the database 
   * @param {string} table - the name of the associated SQL table for the mapper
   * @param {Object} record - the data used to create the domain object
   */
  constructor(fields, table, record) {

    for (let field of fields) {
      const value = Reflect.get(record, field)
      Reflect.set(this, field, value)
    }
    // this will automatically create getters based on a configuration file
    // it will allow us to retrieve domain objects through relations
    this._createRelationAccessors(Reflect.get(relations, table))
  }

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
        // this will hit the DB and as such, is an async operation
        return new Promise((resolve, reject) => {
          this._getRelations({ joiner, joinee, key: this.key }).then(entities => {
            resolve(entities.map(entity => {
              // all records pulled from the database get auto-wrapped
              // with a mapper to create domain objects
              return MapperBuilder.build({ name, data: entity })
            }))
          }).catch(error => {
            reject(error)
          })
        })
      }
    })
  }

  /**
   * 
   * @param {Object} params
   * @param {Joiner} params.joiner - an object representing the join table
   * @param {Joinee} params.joinee - an object representing the joined table
   */
  _getRelations({ joiner, joinee, key }) {
    const joinQuery = new JoinQuery({ joiner, joinee })
    return joinQuery.run(key)
  }
}

module.exports = Mapper