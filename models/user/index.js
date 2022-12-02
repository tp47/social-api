import db from "../../db/index.js";

const userModel = {
  getOne: async (id) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default userModel
