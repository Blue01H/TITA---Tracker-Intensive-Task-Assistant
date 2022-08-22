const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'client',
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
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'product',
        default: null,
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'task',
        default: null,
    }],
    active: {
        type: String,
        default: true,
    },

});

module.exports = Project = mongoose.model('project', ProjectSchema);