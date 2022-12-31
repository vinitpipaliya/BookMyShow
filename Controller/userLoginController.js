const userModel = require("../Model/userModel")
const bookingModel = require("../Model/bookingModel")
const movieModel = require("../Model/movieModel")
const screenModel = require("../Model/screenModel")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const { default: mongoose } = require("mongoose")

exports.userLogin = (req, res) => {
    try {
        const { email, password } = req.body
        userModel.findOne({ email: email }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Invalid email"
                })
            }
            if (data) {
                bcrypt.compare(password, data.password, (err, isMatch) => {
                    if (err) {
                        return res.status(400).send({
                            err: "Invalid Password " + err
                        })
                    }
                    if (isMatch) {
                        const token = jwt.sign(
                            { user_id: data._id, email },
                            process.env.SECRET,
                            { expiresIn: '2h' }
                        )
                        res.cookie('token', token, { expire: new Date() + 12 })
                        return res.status(200).json({
                            'token': token,
                            'id': data._id,
                            'name': data.name
                        })
                    }
                    else {
                        res.status(400).json({
                            err: "Invalid Password."
                        })
                    }
                })
            }
            else {
                return res.status(400).json({
                    err: "Invalid email."
                })
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problrm: 'Problem ' + err
        })
    }
}

exports.sendAnyFile = async (req, res) => {
    try {
        await res.sendFile(req.param('filename'), { root: `uploads/` })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.addBooking = (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()[0].msg
            })
        }
        const data1 = req.body
        const bookMod = new bookingModel(data1)
        bookMod.save(async (err, abc) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                // var abc = []
                // bookingModel.aggregate([
                //     {
                //         $lookup: {
                //             from: "movies",
                //             localField: "movie_id",
                //             foreignField: "_id",
                //             as: "movies",
                //             pipeline: [{ $project: { name: 1, screen_id: 1 } },
                //             {
                //                 $lookup: {
                //                     from: "screens",
                //                     localField: "screen_id",
                //                     foreignField: "_id",
                //                     as: "screens",
                //                 },
                //             }, {
                //                 $project: {
                //                     screens: 1
                //                 }
                //             }
                //             ]
                //         },

                //     }
                // ]).exec(async (err, data) => {
                //     if (err) {
                //         return err
                //     }
                //     else {
                //         return abc.push(data)
                //     }
                // })
                // console.log(abc)
                // return res.status(200).json({
                //     message: "Booking Succerssfull."
                // })
                console.log("krishna1")
                movieModel.findOne({ _id: data1.movie_id }, (err, data) => {
                    if (err) {
                        return res.status(400).json({
                            err: err
                        })
                    }
                    else {
                        screenModel.findOne({ _id: data.screen_id }, async (err, data) => {
                            if (err) {
                                return res.json({
                                    err: err
                                })
                            }
                            else {
                                if (data.capacity >= 1) {
                                    if (data1.seat <= data.capacity) {
                                        data.capacity = data.capacity - data1.seat
                                        screenModel.findByIdAndUpdate({ _id: data._id }, { capacity: data.capacity }, (err, data) => {
                                            if (err) {
                                                return res.json({
                                                    err: err
                                                })
                                            }
                                            else {
                                                return res.json({
                                                    message: "Sucessfully Booked.",
                                                    DATA: data
                                                })
                                            }
                                        })

                                    }
                                    else {
                                        return res.json({
                                            err: "SOlD OUT!!!"
                                        })
                                    }
                                }
                                else {
                                    return res.json({
                                        err: "SOlD OUT!!!"
                                    })
                                }
                            }
                        })
                    }
                })

            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.viewBooking = (req, res) => {
    try {
        const { _id } = req.body
        bookingModel.
            findOne({ _id: _id }).
            populate('user_id', 'name').
            populate({
                path: 'movie_id',
                model: 'movie',
                select: 'name',
                populate: {
                    path: 'screen_id',
                    model: 'screen',
                    select: 'number',
                    populate: {
                        path: 'theater_id',
                        model: 'theater',
                        select: 'name'
                    }
                }
            }).
            exec((err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        err: "Not able to find in Database. " + err
                    })
                }
                else {
                    return res.status(200).send({
                        DATA: data
                    })
                }
            })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            Problem: "Prolem " + err
        })
    }
}

exports.updateBooking = (req, res) => {
    try {
        const data = req.body
        bookingModel.findOneAndUpdate({ _id: data._id }, data, (err, data1) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to update. " + err
                })
            }
            else {
                movieModel.findOne({ _id: data._id }, (err, data) => {
                    if (err) {
                        return res.json({
                            err: err
                        })
                    }
                    else {
                        screenModel.findOne({ _id: data._id }, (err, data) => {
                            if (err) {
                                return res.json({
                                    err: err
                                })
                            }
                            else {
                                if (data.caoacity >= 1) {
                                    if (data1.seat <= data.capacity) {

                                    }
                                }
                                screenModel.findByIdAndUpdate({ _id: data._id })
                                return res.json({

                                })
                            }
                        })
                    }
                })
                return res.status(200).send({
                    message: "Successully Updated. "
                })
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.deleteBooking = (req, res) => {
    try {
        const _id = req.body
        bookingModel.findOneAndUpdate({ _id: _id }, { status: 1 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to delete. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully deleted. "
                })
            }
        })
    }
    catch (err) {

    }
}