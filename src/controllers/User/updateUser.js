const User = require('../../models/User');

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userUpdate = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!userUpdate) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = updateUser;
