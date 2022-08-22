const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorieSchema = new Schema({
    categorie: {
        type: String,
        required: true
    },
});

module.exports = Categorie = mongoose.model('categorie', CategorieSchema);