const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: true,
    },

});

module.exports = Product = mongoose.model('product', ProductSchema);