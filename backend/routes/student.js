const { Router } = require('express')
const controller = require('../controllers/student')
const router = Router()

router.get('/' , controller.getStudents)
router.post('/add' , controller.addStudents)

module.exports = router;