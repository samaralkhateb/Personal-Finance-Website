const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    income: { type: Number, required: true },
    category: { type: String, required: true }, 
    date: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Budget', budgetSchema);
