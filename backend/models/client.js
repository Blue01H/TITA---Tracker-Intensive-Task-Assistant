const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'project',
        default: [],
    }],
    industryCode: {
        type: Number,
        default: Math.floor(Math.random()*10000),
    },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = Client = mongoose.model('clients', ClientSchema);