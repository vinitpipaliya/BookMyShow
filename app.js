const express = require('express')
const bp = require("body-parser")
require('dotenv').config()
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECT")
}).catch(() => {
    console.log("ERROR IN CONNECT")
})

mongoose.set('strictQuery', true);

var app = express()

const admReg = require("./Routes/adminRegistrationRouting")
const adminLogin = require("./Routes/adminLoginRouting")
const userReg = require("./Routes/userRegistrationRouting")
const userLogin = require('./Routes/userLoginRouting')

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bp.json({ limit: '50mb' }))
app.use(cookieParser())
app.use('/adminRegistration', admReg)
app.use('/adminLogin', adminLogin)
app.use('/userRegistration', userReg)
app.use('/userLogin', userLogin)

app.listen(process.env.PORT, () => {
    console.log("SERVER START")
})
