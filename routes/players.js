const router = require('express').Router();

const playerController = require('../controllers/player.js');

const isAuthenticated = require("../middleware/authenticate.js");
const validator = require('../middleware/validate.js');

router.get('/', playerController.readAll);
router.get('/:id', playerController.readOne);

router.post('/', isAuthenticated, validator.savePlayer, playerController.createOne);

router.put('/:id', isAuthenticated, validator.savePlayer, playerController.updateOne);

router.delete(':id', isAuthenticated, playerController.deleteOne);

module.exports = router;