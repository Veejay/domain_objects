class JoinQuery {
  constructor({joiner, joinee}) {
    this.joiner = joiner
    this.joinee = joinee
  }

  run(id) {
    return `
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
    
  }
}

module.exports = JoinQuery