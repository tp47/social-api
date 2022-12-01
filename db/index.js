import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PORT,
});

export default {
  query: async (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
