const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodtruckSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    menus: [{
        dishName: {
            type: String,
            required: true,
        },
        drinkName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        }
    }]
});

const Foodtruck = mongoose.model('Foodtruck', foodtruckSchema);

module.exports = Foodtruck;