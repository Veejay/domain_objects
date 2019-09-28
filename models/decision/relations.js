const Joinee = require('../../services/joinee.js')
const Joiner = require('../../services/joiner.js')

const relations = [
  {
    joiner: {
      name: 'decisions_enterprises',
      filterKey: 'doc_id',
      joinKey: 'enterprise_id',
    },
    joinee: {
      name: 'enterprises',
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
].map(config => {
  const { joinee, joiner } = config
  return {
    joinee: new Joinee(joinee),
    joiner: new Joiner(joiner)
  }
})

module.exports = relations