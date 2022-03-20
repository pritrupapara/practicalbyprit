var express = require('express');
var router = express.Router();
const UserController = require("../controllers/user.controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post("/register", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/dashboard", UserController.userDashboard);


module.exports = router;