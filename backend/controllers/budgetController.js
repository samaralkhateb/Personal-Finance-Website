const Budget = require('../models/Budget');

exports.setBudget = async (req, res) => {
    const { income, category } = req.body;

    try {
        const newBudget = new Budget({
            userId: req.user.id,
            income,
            category
        });

        await newBudget.save();
        res.status(201).json('Budget set successfully');
    } catch (error) {
        res.status(400).json(error.message);
    }
};

exports.getBudget = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user.id });
        
        // Log the fetched budgets
 
        res.json(budgets);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
