// controllers/RentalController.js
const Rental = require('../models/Rental');

exports.createRental = async (req, res) => {
  const { item, deliverySchedule, pickupSchedule } = req.body;
  const renter = req.userId;

  try {
    const newRental = new Rental({ item, renter, owner: req.body.owner, deliverySchedule, pickupSchedule });
    await newRental.save();
    res.status(201).json(newRental);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rental' });
  }
};

exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ renter: req.userId }).populate('item').populate('owner');
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rentals' });
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('item').populate('owner');
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rental' });
  }
};

exports.updateRental = async (req, res) => {
  const { deliverySchedule, pickupSchedule } = req.body;

  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    rental.deliverySchedule = deliverySchedule || rental.deliverySchedule;
    rental.pickupSchedule = pickupSchedule || rental.pickupSchedule;

    await rental.save();
    res.json({ message: 'Rental updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating rental' });
  }
};

exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    await rental.remove();
    res.json({ message: 'Rental deleted successfully' });
  } catch (error){
    res.status(500).json(err);
  }
}