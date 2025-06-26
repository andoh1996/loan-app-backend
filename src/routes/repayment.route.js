const express = require('express');

const router = express.Router();

const repaymentController = require('../controllers/repayment.controller')

router.post('/', repaymentController.repayment);

router.get('/history/:loanId', repaymentController.repaymentHistory);

router.get('/admin/daily', repaymentController.dailyPayment);






module.exports = router;