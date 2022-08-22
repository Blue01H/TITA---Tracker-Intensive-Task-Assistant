const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractorSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true 
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = Contractor = mongoose.model('contractors', ContractorSchema);