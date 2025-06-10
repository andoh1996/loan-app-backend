const express = require('express');

const router = express.Router();

const employeesAuth = require('../controllers/employeesAuth.controller')
const empployeeController = require('../controllers/employees.controller')

router.post('/auth/create', employeesAuth.registerEmployee);

router.get('/get-all', empployeeController.getAllEmployees);

router.get('/get-one/:staffID', empployeeController.getOneEmployee);

router.get('/customers/:staffID', empployeeController.getCustomers);





module.exports = router;