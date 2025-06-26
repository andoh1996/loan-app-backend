const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller')

router.post('/register/admin', authController.registerAdmin);

router.post('/login', authController.Login);




module.exports = router;