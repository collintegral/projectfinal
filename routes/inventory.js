const router = require('express').Router();

const inventoryController = require('../controllers/inventory.js');

const isAuthenticated = require("../middleware/authenticate");
const validator = require('../middleware/validate');

router.get('/', inventoryController.readAll);
router.get('/:name', inventoryController.readOne);

router.post('/', isAuthenticated, validator.saveInventory, inventoryController.createOne);

router.put('/:name', isAuthenticated, validator.saveInventory, inventoryController.updateOne);

router.delete('/:name', isAuthenticated, inventoryController.deleteOne);

module.exports = router;