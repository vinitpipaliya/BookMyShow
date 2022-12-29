const adminModel = require('../Model/adminModel')
const { validationResult } = require("express-validator")

exports.adminRegistration = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    try {
        const data = req.body
        const adModel = new adminModel(data);
        adModel.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Registration Successful."
                })
            }
        })
    }
    catch (err) {
        return res.status(400).send({
            Problem: "Problem " + err
        })
    }
}
