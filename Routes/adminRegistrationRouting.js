const express = require("express")
const router = express.Router();
const { check } = require("express-validator")

const { adminRegistration } = require('../Controller/adminRegistationController')
const { checkUsername } = require('../Middleware/adminRegistationMiddleware')

router.post('/', [
    check("name", "Name should be at least 3 character").isLength({ min: 3 })
], checkUsername, adminRegistration)

module.exports = router