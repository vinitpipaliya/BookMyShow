const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 50
        },
        password: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10
        },
        icon: {
            type: String,
            required: true,
            trim: true
        },
        photo1: {
            type: String,
            trim: true
        },
        photo2: {
            type: String,
            trim: true
        },
        status: {
            type: Number,
            default: 0
        },
        salt: String,
        InvestedMoney: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next();
        })
    })
})

userSchema.pre("findOneAndUpdate", function (next) {
    this._update.password = bcrypt.hashSync(this._update.password, 10)
    next();
})

module.exports = mongoose.model("user", userSchema)