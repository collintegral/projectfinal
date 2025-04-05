const router = require('express').Router();
const passport = require('passport');

router.use('/characters', require('./characters.js'));
router.use('/inventory', require('./inventory.js'));
router.use('/notes', require('./notes.js'));
router.use('/players', require('./players.js'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return (next(err)) ;
        res.redirect('/');
    })
});

module.exports = router;