const Joinee = require('../services/sql/joinee.js')
const Joiner = require('../services/sql/joiner.js')

const configuration = {
  decisions: [
    {
      joiner: {
        name: 'decisions_enterprises',
        filterKey: 'doc_id',
        joinKey: 'enterprise_id',
      },
      joinee: {
        name: 'enterprises',
        // might want to add an `alias` here for the relation getter
        // since the table we'll be querying has potentially complicated names
        fields: ['siren', 'name', 'id'],
        joinKey: 'id',
        mapper: 'Enterprise'
      }
    },
    {
      joiner: {
        name: 'decisions_lawyers',
        filterKey: 'doc_id',
        joinKey: 'lawyer_id',
      },
      joinee: {
        name: 'lawyers',
        fields: ['first_name', 'last_name', 'id', 'toque'],
        joinKey: 'id',
        mapper: 'Lawyer'
      }
    }
  ]
}
const relations = Object.keys(configuration).reduce((memo, key) => {
  memo[key] = Reflect.get(configuration, key).map(config => {
    const { joinee, joiner } = config
    return {
      joinee: new Joinee(joinee),
      joiner: new Joiner(joiner)
    }
  })
  return memo
}, {});
module.exports = relations