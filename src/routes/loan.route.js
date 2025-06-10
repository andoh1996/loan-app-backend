const express = require('express');

const router = express.Router();

const loanController = require('../controllers/loanManagement.controller')

router.post('/request', loanController.requestLoan);

router.get('/request', loanController.pendingRequest);

router.patch('/approved/:loanId', loanController.approveLoan);

router.get('/approved', loanController.getApprovedLoans);

router.patch('/disbursed/:loanId', loanController.disburseLoans);

router.get('/active', loanController.getActiveLoans);



module.exports = router;