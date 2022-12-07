import AuthError from "../../utils/errors/AuthError.js";
import authModel from "../../models/auth/auth.model.js";

const authController = {
  register: async (req, res) => {
    try {
      await authModel.register(req.body);
      res.status(200).json("User has been registered");
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(error.statusCode).json(error.message);
        return;
      }
      res.status(500).json(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { userData, token } = await authModel.login(req.body);
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json("User has been logged in");
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(error.statusCode).json(error.message);
        return;
      }
      res.status(500).json(error.message);
    }
  },

  logout: async (req, res) => {
    try {
      await authModel.logout();
      res
        .clearCookie("accessToken", {
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json("User has been logged out");
    } catch (error) {
      if (error instanceof AuthError) {
        res.status(error.statusCode).json(error.message);
        return;
      }
      res.status(500).json(error.message);
    }
  },
};

export default authController;
