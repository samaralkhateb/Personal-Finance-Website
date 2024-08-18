const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middleware/auth');

// Set Budget
router.post('/set', auth, budgetController.setBudget);

// Get Budget
router.get('/', auth, budgetController.getBudget);

module.exports = router;
