const router = require('express').Router();
const { create } = require('../Controllers/userController')

router.get('/create', create)

module.exports = (app) => app.use('/user', router)

