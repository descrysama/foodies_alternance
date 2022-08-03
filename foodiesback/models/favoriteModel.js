const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    brand : String,

    image_url: String,

    calories: Number,
    
    nutriscore: Number
})

module.exports = mongoose.model('Favorite', favoriteSchema)
