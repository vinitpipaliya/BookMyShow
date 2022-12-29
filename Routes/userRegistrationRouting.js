const express = require("express")
const router = express.Router();
const { check } = require("express-validator")

const { registration } = require('../Controller/userRegistrationController')
const { checkEmail } = require('../Middleware/userRegistrationMiddleware')

// router.post('/', [
//     check('email', 'Email is required.').isEmail(),
//     check('password', 'Password should have 6 character long.').isLength({ min: 6 }),
//     check('name', 'Name should have 3 characters.').isLength({ min: 3 })
// ], checkEmail, registration)
router.post('/', checkEmail, registration)

module.exports = router