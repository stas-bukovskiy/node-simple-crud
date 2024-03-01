const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cellId: {type: String, required: true},
    description: String,
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    category: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;