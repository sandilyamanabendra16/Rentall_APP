// controllers/ItemController.js
const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  const { userId,title, description, images, price } = req.body;
  const owner = req.userId;

  try {
    const newItem = new Item({ userId, title, description, images, owner, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ status: { $nin: ['pending', 'rented'] } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items' });
  }
};



exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving item' });
  }
};

exports.updateItem = async (req, res) => {
  const { title, description, images, status, price } = req.body;

  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.title = title || item.title;
    item.description = description || item.description;
    item.images = images || item.images;
    item.status = status || item.status;
    item.price= price|| item.price;

    await item.save();
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.AddRental = async (req, res) => {
  try {
    const { itemId, renterId } = req.body;

    // Find the item by ID
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the item is already rented by the same user
    if (item.renter.some(renter => renter.userId === renterId)) {
      return res.status(400).json({ message: "Already rented" });
    }

    // Ensure the price field is set
    if (!item.price) {
      return res.status(400).json({ message: "Item price is required" });
    }

    // Update the item's status and add the renter information
    item.status = 'rented';
    item.renter.push({ userId: renterId });

    // Save the updated item
    await item.save();

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error processing rental request", error: err.message });
  }
};
exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('Attempting to delete item with ID:', id);
    const item = await Item.findById(id);
    
    if (!item) {
      console.log('Item not found for ID:', id);
      return res.status(404).json({ message: 'Item not found' });
    }
    
    await item.deleteOne();
    console.log('Item deleted successfully');
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
};

exports.getRentedItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find items where the user is the owner (renter) and the status is 'rented'
    const ownedRentedItems = await Item.find({
      userId: userId,
      status: 'rented'
    }).populate('renter.userId', 'name email');

    // Find items where the user is the rentee and the status is 'rented'
    const rentedAsRenteeItems = await Item.find({
      'renter.userId': userId,
      status: 'rented'
    }).populate('userId', 'name email'); // Populate the owner's information

    // Combine the results
    const allRentedItems = [
      ...ownedRentedItems.map(item => ({
        ...item.toObject(),
        role: 'owner'
      })),
      ...rentedAsRenteeItems.map(item => ({
        ...item.toObject(),
        role: 'rentee'
      }))
    ];

    if (!allRentedItems.length) {
      return res.status(404).json({ message: "No rented items found" });
    }

    res.status(200).json(allRentedItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rented items", error: err.message });
  }
};

exports.unrentItem = async (req, res) => {
  try {
    const { itemId, renterId } = req.body;

    // Find the item by ID
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the item is currently rented by the specified renter
    const renterIndex = item.renter.findIndex(renter => renter.userId.toString() === renterId);
    if (renterIndex === -1) {
      return res.status(400).json({ message: 'Item is not rented by this user' });
    }

    // Remove the renter information and update the item status
    item.renter.splice(renterIndex, 1);
    item.status = item.renter.length === 0 ? 'available' : 'rented';

    // Save the updated item
    await item.save();

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error processing unrent request', error: err.message });
  }
};

// Approve an item
exports.approveItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.status = 'approved';
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error approving item', error: err.message });
  }
};

exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'pending' });
    res.status(200).json(items);
  } catch (err) {
    console.error('Error retrieving pending items:', err);
    res.status(500).json({ message: 'Error retrieving pending items', error: err.message });
  }
};