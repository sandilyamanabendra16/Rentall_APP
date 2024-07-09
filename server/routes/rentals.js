// routes/rentals.js
const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/RentalController'); // Ensure this path is correct
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this path is correct

router.post('/', RentalController.createRental);
router.get('/', RentalController.getRentals);
router.get('/:id', authMiddleware, RentalController.getRentalById);
router.put('/:id', authMiddleware, RentalController.updateRental);
router.delete('/:id', authMiddleware, RentalController.deleteRental);

module.exports = router;
