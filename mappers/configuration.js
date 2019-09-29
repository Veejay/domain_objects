const configuration = {
  table: 'decisions_aggregated',
  mapper: 'Decision',
  fields: {
    'doc_id': 'doc_id',
    'date_dec': 'decision_date',
    'sommaire_ana': 'summary',
    'contenu_html': 'html_content'
  },
  relations: [
    {
      joiner: {
        name: 'decisions_enterprises',
        filterKey: 'doc_id',
        joinKey: 'enterprise_id',
      },
      joinee: {
        name: 'enterprises',
        alias: 'enterprises',
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
        name: 'lawyers_dedup',
        alias: 'lawyers',
        fields: ['first_name', 'last_name', 'id', 'toque'],
        joinKey: 'id',
        mapper: 'Lawyer'
      }
    }
  ]
}

module.exports = configuration;