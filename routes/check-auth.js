var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    var token;

    if(req.query.token) {
        token = req.query.token;
    } else {
        token = req.headers["token"];
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
        if(err) {
            res.redirect("/login");
        }
   
        req.token = decodedToken;
        next();
    });
}