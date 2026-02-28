const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "738552",
  host: "localhost",
  port: 5432,
  database: "job_portal",
});

module.exports = pool;
