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
};

export default authController;
