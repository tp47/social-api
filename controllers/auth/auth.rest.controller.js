import authModel from "../../models/auth/auth.model.js";

const authController = {
  register: async (req, res) => {
    try {
      const isRegistered = await authModel.register(req.body);
      res.json(isRegistered);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { userData, token } = await authModel.login(req.body);
      res.cookie('JWTAccessToken', token, {httpOnly: true,}).status(200).json()
    } catch (error) {
      res.status(500).json(error.stack);
    }
  },
};

export default authController;
