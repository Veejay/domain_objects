class JoinQuery {
  constructor({ joiner, joinee }) {
    this.joiner = joiner
    this.joinee = joinee
  }

  async run(id) {
    const query = `
    SELECT
      ${this.joinee.fields}
    FROM
      ${this.joiner.name}
    INNER JOIN
      ${this.joinee.name}
    ON
      ${this.joiner.joinKey} = ${this.joinee.joinKey}
    WHERE
      ${this.joiner.filterKey} = ${id}
    `;
    console.log(query)
    return [
      {
        siren: 'FD-22',
        name: 'Sony',
        id: 3456
      },
      {
        siren: 'FD-45',
        name: 'Apple',
        id: 45
      }
    ]
  }
}

module.exports = JoinQuery