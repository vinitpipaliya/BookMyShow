const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10,
        },
        salt: String,
        role: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10,
        },
        status: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

// admin.relationship({ path: 'theaters', ref: 'theater', refPath: 'admin_id' });

adminSchema.pre('save', function (next) {
    var admin = this
    if (!admin.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        };
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            admin.password = hash;
            next();
        })
    })
})

adminSchema.pre('findOneAndUpdate', (next) => {
    this._update.password = bcypt.hashSync(this._update.password, 10)
})

// adminSchema.methods.comparePassword = (candidatePassword, cb) => {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         if (err) {
//             return cb(err)
//         }
//         cb(null, isMatch);
//     })
// }

module.exports = mongoose.model("admin", adminSchema)