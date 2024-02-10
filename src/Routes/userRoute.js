const router = require('express').Router();
const { create, erase } = require('../Controllers/userController')

router.post('/create', create)
router.delete('/delete/:ID', erase)

module.exports = (app) => app.use('/user', router)

