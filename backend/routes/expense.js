const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

// Add Expense
router.post('/add', auth, expenseController.addExpense);

// Get Expenses
router.get('/', auth, expenseController.getExpenses);

module.exports = router;
