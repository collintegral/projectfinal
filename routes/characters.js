const router = require('express').Router();

const characterController = require('../controllers/character.js');

const isAuthenticated = require("../middleware/authenticate");
const validator = require('../middleware/validate');

router.get('/', characterController.readAll);
router.get('/:name', characterController.readOne);

router.post('/', validator.saveCharacter, characterController.createOne);

router.put('/:name', validator.saveCharacter, characterController.updateOne);

router.delete('/:name', characterController.deleteOne);

module.exports = router;