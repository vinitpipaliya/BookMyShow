const express = require("express");
const router = express.Router();
const { check } = require("express-validator")
const { userLogin, sendAnyFile, addBooking, viewBooking } = require("../Controller/userLoginController");
const { checkUserLogin } = require("../Middleware/userLoginMiddleware");

router.post('/', userLogin)
// router.get('/:filename', checkUserLogin, sendAnyFile)
router.post('/booking', [
    check("seat", "Seat should be more than 0").notEmpty().isInt({ min: 1, max: 1000 }),
    check("date", "proper date").notEmpty()//.isDate()
], checkUserLogin, addBooking)
router.get('/booking', viewBooking)

module.exports = router