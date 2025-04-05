const router = require('express').Router();

const inventoryController = require('../controllers/inventory.js');

const isAuthenticated = require("../middleware/authenticate");
const validator = require('../middleware/validate');

router.get('/', inventoryController.readAll);
router.get('/:name', inventoryController.readOne);

router.post('/', validator.saveInventory, inventoryController.createOne);

router.put('/:name', validator.saveInventory, inventoryController.updateOne);

router.delete('/:name', inventoryController.deleteOne);

module.exports = router;