// controllers/AdminController.js
const Item = require('../models/Item');

exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'pending' });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pending items' });
  }
};

exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.status = 'approved';
    await item.save();

    res.json({ message: 'Item approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving item' });
  }
};
