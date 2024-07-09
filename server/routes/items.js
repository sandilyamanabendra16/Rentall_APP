// routes/items.js
// const express = require('express');
// const router = express.Router();
// const ItemController = require('../controllers/ItemController');
// const authMiddleware = require('../middleware/authMiddleware');
// const adminMiddleware = require('../middleware/adminMiddleware');

// router.post('/',ItemController.createItem);
// router.get('/', ItemController.getItems);
// router.get('/:id', ItemController.getItemById);
// router.put('/:id', ItemController.updateItem);
// router.delete('/:id',ItemController.deleteItem);
// router.post('/rent', ItemController.AddRental);
// router.get('/rented/:userId', ItemController.getRentedItems);
// router.post('/unrent', ItemController.unrentItem);
// router.get('/pending', ItemController.getPendingItems);
// router.put('/:id/approve', ItemController.approveItem);

// module.exports = router;


const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', ItemController.createItem);
router.get('/', ItemController.getItems);
router.get('/:id', ItemController.getItemById);
router.put('/:id', ItemController.updateItem);
router.delete('/:id', ItemController.deleteItem);
router.post('/rent', ItemController.AddRental);
router.get('/rented/:userId', ItemController.getRentedItems);
router.post('/unrent', ItemController.unrentItem);
router.get('/pending',ItemController.getPendingItems); 
router.put('/:id/approve', ItemController.approveItem);

module.exports = router;
