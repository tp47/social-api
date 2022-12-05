import db from "../../db/index.js";

const userModel = {
  getById: async (id) => {
    try {
      const user = await db.getOne("users", id);
      return user;
    } catch (error) {
      throw error;
    }
  },

  getByUsername: async (username) => {
    try {
      const user = await db.getList("users", { filter: { username } });
      return user;
    } catch (error) {
      throw error;
    }
  },

  create: async (user) => {
    try {
      await db.create("users", user);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default userModel;
