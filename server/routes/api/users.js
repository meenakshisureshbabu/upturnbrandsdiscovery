const express = require('express')
const router = express.Router()
const usersCtrlr = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/register/:user',usersCtrlr.create)
router.post('/signup/:user',usersCtrlr.signUp)
// router.post('/login',usersCtrlr.login)
// router.get('/check-token',ensureLoggedIn,usersCtrlr.checktoken)
// router.post('/resetpwd',usersCtrlr.resetpwd)

module.exports = router