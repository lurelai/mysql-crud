const router = require('express').Router();
const { create } = require('../Controllers/userController')

router.post('/create', create)

module.exports = (app) => app.use('/user', router)

