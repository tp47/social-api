import bcrypt from "bcryptjs";
import userModel from "../user/user.model.js";

const authModel = {
  register: async (user) => {
    try {
      const { username, password } = user;
      const isExists = await userModel.getByUsername(username);
      if (isExists.length) {
        throw new Error(`User with username ${username} exists`);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const isRegistered = await userModel.create({
        ...user,
        password: hashedPassword,
      });
      if (!isRegistered) {
        throw new Error("Error while creating user");
      }
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default authModel;
