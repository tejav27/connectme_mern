const AuthController = require('../controllers/AuthController')
const router = require("express").Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
