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
        first_name: 'FD-22',
        last_name: 'Sony',
        toque: 3456
      },
      {
        first_name: 'FD-45',
        last_name: 'Apple',
        toque: 45
      }
    ]
  }
}

module.exports = JoinQuery