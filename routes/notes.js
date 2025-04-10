const router = require('express').Router();

const noteController = require('../controllers/note.js');

const isAuthenticated = require("../middleware/authenticate");
const validator = require('../middleware/validate');

router.get('/', noteController.readAll);
router.get('/past', noteController.readPast);
router.get('/plan', isAuthenticated, noteController.readPlan);

router.post('/', isAuthenticated, validator.saveNote, noteController.createOne);

router.put('/:id', isAuthenticated, validator.saveNote, noteController.updateOne);
router.put('/:id/passed', isAuthenticated, noteController.updateOnePast);

router.delete('/:id', isAuthenticated, noteController.deleteOne);

module.exports = router;