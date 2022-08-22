const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    activity: {
        type: String,
        required: true
    },
    categorie: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'categorie',
        required: true
    }],

});

module.exports = Activity = mongoose.model('activity', ActivitySchema);