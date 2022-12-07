import userModel from "../../models/user/user.model.js";

const userController = {
  getById: async (req, res) => {
    const user = await userModel.getById(req.params.id);
    res.json(user);
  },
};

export default userController;
