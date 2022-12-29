const mongoose = require("mongoose")
const movieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 25,
            trim: true,
            unique: true,
        },
        rating: {
            type: Number,
            required: true,
            maxlength: 10,
            trim: true,
        },
        screen_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'screen'
        },
        time: [
            {
                type: String,
                trim: true,
                maxlength: 10,
                required: true,
            }
        ],
        status: {
            default: 0,
            type: Number,
        }
    }
)

module.exports = mongoose.model('movie', movieSchema)