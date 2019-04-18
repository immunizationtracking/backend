const jwt = require('jsonwebtoken');

const secrets = require('../api/secrets');

// const jwtKey = process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable';

// module.exports = {
//     authenticate, jwtKey
// };


module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) return res.status(401).json({ message: `Not reaching next: ${err}`});
            req.decodedJwt = decodedToken;
            next();
        });
    } else {
        return res.status(401).json({
            error: `No token provided, must be set on the Authorization header`,
        });
    }
}