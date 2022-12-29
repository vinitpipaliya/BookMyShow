const userModel = require('../Model/userModel')
const { validationResult } = require('express-validator')
const multer = require("multer")
const path = require("path")

let storage = multer.diskStorage({
    destination: (req, file, pr) => pr(null, 'uploads/'),
    filename: (req, file, pr) => {
        const userfile = `${Date.now()}${path.extname(file.originalname)}`
        pr(null, userfile)
    }
})

// let upload = multer({
//     storage,
//     limits: {
//         fileSize: 1000000 * 100
//     }
// }).single('icon')

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    }
    else {
        cb(`Error:Images Only`);
    }
}

let upload = multer({
    storage,
    limits: {
        fileSize: 1000000 * 100
    },
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([{ name: 'icon' }, { name: 'photo1' }, { name: 'photo2' }])

exports.registration = (req, res) => {
    try {
        upload(req, res, (err) => {
            // if (!req.file) {
            //     console.log("Krishna")
            //     return res.status(400).json({
            //         error: "File is required."
            //     })
            // }

            if (!req.files) {
                return res.status(400).json({
                    error: "File is required."
                })
            }
            if (err) {
                return res.status(400).json({
                    err: err.message
                })
            }
            console.log("raam")
            const data = req.body
            // let icon = req.file.path
            let icon = req.files.icon[0].path
            let photo1 = req.files.photo1[0].path
            let photo2 = req.files.photo2[0].path
            data.icon = icon
            console.log(data.icon)
            data.photo1 = photo1
            data.photo2 = photo2
            const user = new userModel(data)
            user.save((err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        err: "Not able to Register. " + err
                    })
                }
                else {
                    return res.status(200).send({
                        message: "Registration Successfull."
                    })
                }
            })
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}
