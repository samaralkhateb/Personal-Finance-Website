const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const { amount, category, notes } = req.body;

    try {
        const newExpense = new Expense({
            userId: req.user.id,
            amount,
            category,
            notes
        });

        await newExpense.save();
        res.status(201).json('Expense added successfully');
    } catch (error) {
        res.status(400).json(error.message);
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.json(expenses);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
