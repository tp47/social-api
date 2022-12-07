import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../user/user.model.js";
import AuthError from "../../utils/errors/AuthError.js";

const authModel = {
  register: async (user) => {
    try {
      const { username, password } = user;
      const isExists = await userModel.getByUsername(username);
      if (isExists) {
        throw new AuthError(`User with username ${username} exists`, 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const isRegistered = await userModel.create({
        ...user,
        password: hashedPassword,
      });
      if (!isRegistered) {
        throw new AuthError("Error while creating user", 500);
      }
      return true;
    } catch (error) {
      throw error;
    }
  },

  login: async (user) => {
    try {
      const { username, password } = user;
      const userData = await userModel.getByUsername(username);
      if (!userData) {
        throw new AuthError(`User with username ${username} not found`, 404);
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        userData.password
      );
      if (!isPasswordCorrect) {
        throw new AuthError("Wrong password or username", 400);
      }

      const token = jwt.sign({ id: userData.id }, process.env.JWTSECRET);

      return {
        userData: { password, ...userData },
        token,
      };
    } catch (error) {
      throw error;
    }
  },

  logout: async (user) => {},
};

export default authModel;
