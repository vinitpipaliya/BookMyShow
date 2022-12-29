const mongoose = require("mongoose")
const screenSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 2,
            unique: true
        },
        capacity: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 3,
        },
        theater_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'theater'
        },
        status: {
            default: 0,
            type: Number,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("screen", screenSchema)