const userModel = require('../Model/userModel')
const { validationResult } = require('express-validator')


exports.checkEmail = (req, res, next) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         error: errors.array()[0].msg
    //     })
    // }
    try {
        const { name } = req.body
        userModel.findOne({ name: name }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Email is already registered."
                })
            }
            else {
                next()
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}