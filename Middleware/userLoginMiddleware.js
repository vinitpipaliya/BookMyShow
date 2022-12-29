const jwt = require("jsonwebtoken")

exports.checkUserLogin = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send("A token is required for authenticarion")
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (decoded.user_id) {
            return next();
        }
        else {
            return res.status(403).send("A token is required for authenticatrion")
        }
    }
    catch (err) {
        return res.status(401).send("Invalid token " + err)
    }
}