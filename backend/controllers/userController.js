const User = require('../models/userModel');

const UserController = {
    createUser : async (req, res) => {
        try {
          const user = new User(req.body);
          await user.save();
          res.status(201).json(user);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
      getAllUsers : async (req, res) => {
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }

}

module.exports = UserController;
