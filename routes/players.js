const router = require('express').Router();

const playerController = require('../controllers/player.js');

const isAuthenticated = require("../middleware/authenticate.js");
const validator = require('../middleware/validate.js');

module.exports = router;