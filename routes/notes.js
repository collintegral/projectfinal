const router = require('express').Router();

const noteController = require('../controllers/note.js');

const isAuthenticated = require("../middleware/authenticate");
const validator = require('../middleware/validate');

module.exports = router;