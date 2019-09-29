const mappers = {
  Decision: {
    table: 'decisions',
    // this needs to be configurable, maybe keep a base list of columns
    // here and allow callers to augment it later
    fields: [
      'doc_id',
      'date_dec',
      'juridiction',
      'ville',
      'google',
      'contenu_html'
    ]
  }
}



module.exports = mappers;