const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customer.controller')

router.post('/create', customerController.createCustomer);

router.get('/get-all', customerController.getAllCustomer);

router.get('/get-one/:customerId', customerController.getOneCustomer);

router.patch('/assign', customerController.assignCustomer)




module.exports = router;