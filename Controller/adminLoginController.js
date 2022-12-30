const adminModel = require('../Model/adminModel')
const theaterModel = require('../Model/theaterModel')
const screenModel = require("../Model/screenModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator')
const movieModel = require('../Model/movieModel')
const userModel = require("../Model/userModel")
const bookingModel = require("../Model/bookingModel")
const reversePopulate = require('mongoose-reverse-populate')
const mongoose = require("mongoose")

exports.adminLogin = (req, res) => {
    try {
        const { name, password } = req.body
        adminModel.findOne({ name: name }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: 'Inalid username.'
                })
            }
            if (data) {
                bcrypt.compare(password, data.password, (err, isMatch) => {
                    if (err) {
                        return res.status(400).json({
                            err: 'Inalid password.'
                        })
                    }
                    if (isMatch) {
                        const token = jwt.sign(
                            { admin_id: data._id, name },
                            process.env.SECRET,
                            { expiresIn: "2h" }
                        );
                        res.cookie('token', token, { expire: new Date() + 12 })
                        return res.status(200).send({ 'token': token, '_id': data._id, 'name': data.name })
                    }
                    else {
                        return res.status(400).json({
                            err: 'Inalid password.'
                        })
                    }
                })

            }
            else {
                return res.status(400).json({
                    err: 'Inalid username.'
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

exports.updateAdmin = (req, res) => {
    try { }
    catch (err) {
        return res.status()
    }
}

exports.addTheater = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    try {
        const data = req.body
        const theMod = new theaterModel(data)
        theMod.save((err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Not able to save in db. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Theater Profile created."
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

exports.updateTheater = (req, res) => {
    const errors = validationResult(req)
    if (!erroes.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    try {
        const data = req.body
        theaterModel.findOneAndUpdate({ _id: data._id }, data, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to update. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully Updated."
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

exports.deleteTheater = (req, res) => {
    const errors = validationResult(err)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    try {
        const data = req.body
        theaterModel.findOneAndUpdate({ _id: data._id }, { status: 1 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to delete. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully deleted."
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

exports.addScreen = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    try {
        const data = req.body
        const scrMod = new screenModel(data)
        scrMod.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to find in database. " + err
                })
            }
            else {
                return res.status(200).json({
                    msg: "Screen created Successfully."
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

exports.updateScreen = (req, res) => {
    try {
        const data = req.body
        screenModel.findOneAndUpdate({ _id: data._id }, data, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to update. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully updated."
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

exports.deleteScreen = (req, res) => {
    try {
        const data = req.body
        screenModel.findOneAndUpdate({ _id: data._id }, { status: 1 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to delete. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully deleted."
                })
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problrm " + err
        })
    }
}

exports.addMovie = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    try {
        const data = req.body
        let timelist = []
        for (let i in data.time) {
            for (let j in data.time) {
                if (data.time[i] == data.time[j] && i != j) {
                    timelist.push(data.time[i])
                }
            }
        }
        const movieData = { name: data.name, rating: data.rating, screen_id: data.screen_id, time: timelist }
        const movMod = new movieModel(movieData)
        movMod.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Movie is successfully added."
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

exports.updateMovie = (req, res) => {
    try {
        const data = req.body
        movieModel.findOneAndUpdate({ _id: data._id }, data, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to update. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully updated."
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

exports.deleteMovie = (req, res) => {
    try {
        const data = req.body
        movieModel.findOneAndUpdate({ _id: data_id }, { status: 1 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to delete. " + err
                })
            }
            else {
                return res.status(200).json({
                    message: "Successfully deleted."
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

// exports.viewData = (req, res) => {
//     try {
//         const { _id } = req.body
//         adminModel.findOne({ _id: _id }).
//             populate('theaters',
//                 {
//                     path: 'admins',
//                     model: 'theater',
//                     select: 'name',
//                     populate: {
//                         model: 'screen',
//                         select: 'number',
//                         populate: {
//                             model: 'movie',
//                             select: 'name'
//                         }
//                     }
//                 }
//             ).
//             exec((err, data) => {
//                 if (err) {
//                     return res.status(400).json({
//                         err: "Not fetch data from Database. " + err
//                     })
//                 }
//                 else {
//                     return res.status(200).send({
//                         DATA: data
//                     })
//                 }
//             })
//     }
//     catch (err) {
//         console.log(err)
//         return res.status(400).json({
//             Problem: "Problem " + err
//         })
//     }
// }

// exports.viewData = (req, res) => {
//     const { _id } = req.body
//     adminModel.find({ _id: _id }).exec(function (err, admins) {
//         if (err) {
//             return req.status(400).json({
//                 err: "Not able to find in database. " + err
//             })
//         }
//         else {
//             var opts = {
//                 modelArray: admins,
//                 storeWhere: "theater",
//                 arrayPop: false,
//                 mongooseModel: theaterModel,
//                 idField: "admin_id"
//             }
//         }
//         reversePopulate(opts, function (err, popAdmins) {
//             //popAuthors will be populated with posts under .posts property
//             if (err) {
//                 return res.json({
//                     err: "Not able to populate. "
//                 })
//             }
//             else {
//                 for (let i of popAdmins) {
//                     var theater_id = i.theater._id
//                     var name = i.theater.name
//                     var screen = i.theater.screen
//                     var thDa = { name, screen, theater_id }
//                 }
//                 return res.status(200).json({
//                     admin_id: admins[0]._id,
//                     adminName: admins[0].name,
//                     role: admins[0].role,
//                     status: admins[0].status,
//                     THEATERS: thDa
//                 })
//             }
//         });
//     });
// }

exports.viewData = (req, res) => {
    try {
        // const { _id } = req.body
        // let options = {
        //     _id: {
        //         $in: [mongoose.Types.ObjectId(_id)],
        //     }
        // };
        adminModel.aggregate([
            {
                $lookup: {
                    from: 'theaters',
                    localField: '_id',
                    foreignField: 'admin_id',
                    as: 'theaters',
                    pipeline: [{ $project: { name: 1, _id: 1 } }, {
                        $lookup: {
                            from: "screens",
                            localField: "_id",
                            foreignField: "theater_id",
                            as: "screens",
                            pipeline: [{ $project: { number: 1, capacity: 1, _id: 1 } }, {
                                $lookup: {
                                    from: "movies",
                                    localField: "_id",
                                    foreignField: "screen_id",
                                    as: "movies",
                                    pipeline: [{ $project: { name: 1, rating: 1, time: 1, _id: 1 } }, {
                                        $lookup: {
                                            from: "bookings",
                                            localField: "_id",
                                            foreignField: "movie_id",
                                            as: "bookings",
                                            pipeline: [{ $project: { seat: 1, date: 1, _id: 1, user_id: 1, name: 1 } }, {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "user_id",
                                                    foreignField: "_id",
                                                    as: "users"
                                                }
                                            }],
                                        },

                                    }],
                                }
                            },],
                        }
                    }],
                },
            },
            {
                $project: {
                    name: 1,
                    theaters: 1,
                    screens: 1,
                    movies: 1,
                    bookings: 1,
                    users: 1
                },
            },
        ]).exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                return res.send({
                    DATA: data
                })
            }
        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            Problrm: "Pronlem " + err
        })
    }
}