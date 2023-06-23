const express = require('express');
const router = express.Router();
const passport = require('passport')
const verifyLogin = require('../middleware/auth')


router.get('/google', verifyLogin.ensureGuest, passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', verifyLogin.ensureGuest, passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => {
        res.redirect('/')
    }
)

router.get('/logout', verifyLogin.ensureAuth, (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    })
})

module.exports = router