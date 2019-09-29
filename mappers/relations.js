const Joinee = require('../services/sql/joinee.js')
const Joiner = require('../services/sql/joiner.js')

const buildRelation = configuration => {
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
  return relations
}

module.exports = buildRelation