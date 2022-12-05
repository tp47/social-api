import format from "pg-format";
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

  getOne: async (resource, id) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM ${resource} WHERE id = $1`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },

  getList: async (resource, params) => {
    const { pagination, order, filter } = params;
    let query = `SELECT * FROM ${resource} `;
    const filterQueryValues = [];

    if (filter) {
      query += "WHERE ";
      let i = 0;
      for (const [key, value] of Object.entries(filter)) {
        query = query + format(`%I = $${++i}`, key);
        filterQueryValues.push(value);
      }
    }

    try {
      const { rows } = await pool.query(query, [...filterQueryValues]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (resource, data) => {
    if (!data) {
      throw new Error("No data provided");
    }

    let queryKeys = "";
    let queryValues = "";
    const queryValuesArray = [];
    let i = 1;

    for (const [key, value] of Object.entries(data)) {
      queryKeys = queryKeys + format(`${i > 1 ? ", " : ""}%I`, key);
      queryValues = queryValues + format(`${i > 1 ? ", " : ""}$${i}`, value);
      queryValuesArray.push(value);
      i++;
    }
    let query = `INSERT INTO ${resource} (${queryKeys}) VALUES (${queryValues})`;

    try {
      const { rows } = await pool.query(query, queryValuesArray);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
