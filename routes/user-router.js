const router = require('express').Router();
const Usercontroller = require('../controllers/UserController')

//middleware
const verifyToken = require('../middleware/verifyToken')

router.post('/register', Usercontroller.newUser);
router.post('/login', Usercontroller.login);
router.get('/checkuser', Usercontroller.checkUser);
router.get('/:id', Usercontroller.getUser)
router.patch('/update/:id', verifyToken,Usercontroller.updateUser)

module.exports = router;