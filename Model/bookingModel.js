const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema(
    {
        movie_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "movie",
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        seat: {
            type: Number,
            trim: true,
            maxlength: 4,
            required: true,
        },
        status: {
            default: 0,
            type: Number,
        },
        date: {
            type: String,
            trim: true,
            maxlength: 10,
            requiredL: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('booking', bookingSchema)