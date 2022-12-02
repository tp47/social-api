import userModel from '../../models/user/index.js';

const userController = {
  getOne: async (req, res) => {
    const data = await userModel.getOne(req.params.id);
    res.json(data)
  },
};

export default userController;
