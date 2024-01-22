const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true

    },
    lastName: {
        type: String, 
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },

}, { timestamps: true });


module.exports = mongoose.model('users', userSchema);