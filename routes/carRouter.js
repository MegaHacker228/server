const Router = require('express')
const router = new Router()
const carControllers = require('../controllers/carControllers')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), carControllers.create)
router.get('/', carControllers.getAll)
router.get('/:car_id', carControllers.getOne)

module.exports = router