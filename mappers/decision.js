const Mapper = require('./mapper')
const mappers = require('./configuration')

class Decision extends Mapper {
  constructor(record) {
    const { fields, table } = Reflect.get(mappers, 'Decision')
    super(fields, table, record)
  }

  static async find(doc_id) {
    const finder = new Finder({ table: 'decisions', doc_id })
    const record = await finder.run()
    return record
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