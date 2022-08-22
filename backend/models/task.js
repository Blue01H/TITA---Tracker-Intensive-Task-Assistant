const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    contractorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'contractor',
        required: true
    },
    entryNumber: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    bilable: {
        type: Boolean,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'project',
        required: true
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'product',
        required: true
    }],
    clientId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'client',
        required: true
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId, ref: 'activity',
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'categorie',
    }],
});

module.exports = Task = mongoose.model('task', TaskSchema);