// controllers/UserController.js
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();
    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
};
