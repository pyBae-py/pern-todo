const Pool = require("pg").Pool;

const pool = new Pool({
  user: "athar",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;
