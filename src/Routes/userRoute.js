const router = require('express').Router();
const { create, erase, update } = require('../Controllers/userController')

router.post('/create', create)
router.delete('/delete/:ID', erase)
router.put('/update/:ID', update)

module.exports = (app) => app.use('/user', router)

