const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const { adminLogin, addTheater, addScreen, addMovie, viewData } = require('../Controller/adminLoginController')
const { checkAdminLogin } = require("../Middleware/adminLoginMiddleware")


router.post('/', adminLogin)
router.post('/theater', [
    check("name", "Name should have at least 3 character.").notEmpty().isLength({ min: 3 }),
    check("screen", "Screen should have at least 1").notEmpty().isInt({ min: 1, max: 20 })
], addTheater)//checkAdminLogin
router.post('/theater/screen', [
    check("number", "Screen number should have at least 1").notEmpty().isInt({ min: 1, max: 20 }),
    check("capacity", "Capacity should have more than one").notEmpty().isInt({ min: 1, max: 1000 })
], addScreen)//checkAdminLogin
router.post('/theater/movie', [
    check("name", "Name is compalsory").notEmpty(),
    check("rating", "Rating is more than 0").notEmpty().isInt({ min: 0, max: 10 })
], addMovie)//checkAdminLogin
router.get('/', viewData)

module.exports = router