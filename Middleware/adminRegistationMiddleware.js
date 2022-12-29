const adminModel = require('../Model/adminModel')

exports.checkUsername = (req, res, next) => {
    const { name } = req.body
    try {
        adminModel.findOne({ name: name }, (err, data) => {
            if (data) {
                return res.status(400).json(
                    "Username is already register."
                )
            }
            else {
                next()
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem : " + err
        })
    }
}