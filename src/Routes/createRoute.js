const createController = require('../Controllers/createController')
const router = require('express').Router()

router.get('/', createController)

module.exports = (app)=>app.use('/create', router)

