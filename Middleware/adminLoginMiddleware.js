const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
const adminModel = require("../Model/adminModel")
const theaterModel = require('../Model/theaterModel')
const screenModel = require('../Model/screenModel')
const movieModel = require("../Model/movieModel")

exports.checkAdminLogin = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        console.log("Krishna")
        return res.status(403).send("A token is required for authentication.")
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (decoded.admin_id) {
            return next();
        }
        else {
            return res.status(403).send("A token is required for authentication.")
        }
    }
    catch (err) {
        return res.status(401).send("Invalid Token ")
    }
}

exports.checkAdminStatus = (req, res, next) => {
    try {
        const { name } = req.body;
        adminModel.findOne({ name: name }, { status: 0 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Profile not found. " + err
                })
            }
            else {
                return next();
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.checkTheaterStatus = (req, res, next) => {
    try {
        const { _id } = req.body
        theaterModel.findOne({ _id: _id }, { status: 0 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Theater not found. " + err
                })
            }
            else {
                return next();
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.checkScreenStatus = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()[0].msg
            })
        }
        const { _id } = req.body
        screenModel.findOne({ _id: _id }, { status: 0 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Screen not found. " + err
                })
            }
            else {
                return next();
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.checkMovieStatus = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()[0].msg
            })
        }
        const { _id } = req.body
        movieModel.findOne({ _id: _id }, { status: 0 }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Movie not dound " + err
                })
            }
            else {
                return next();
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}