const mongoose = require("mongoose")
const theaterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 25,
            unique: true,
        },
        screen: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 20
        },
        address: {
            type: String,
            trim: true,
            maxlength: 250,
        },
        admin_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'admin'
        },
        status: {
            default: 0,
            type: Number,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('theater', theaterSchema)