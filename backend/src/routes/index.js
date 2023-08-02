const express = require('express');
const router = express.Router();
const loanController = require('../controllers/index');
const { validateLoan } = require('../validators/loanValidators');
router.post('/submit', validateLoan, loanController.submitLoanApplication);

module.exports = router;
