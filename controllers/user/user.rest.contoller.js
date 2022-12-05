import userModel from "../../models/user/user.model.js";

const userController = {
  getOne: async (req, res) => {
    const result = await userModel.getOne(req.params.id);
    res.json(result);
  },
};

export default userController;
