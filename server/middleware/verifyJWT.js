const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(201).json({ 'Error': 'Token is Invalid' }); //invalid token, "Forbidden"
            req.user = decoded.UserInfo.user;
            console.log(decoded.UserInfo.role);
            req.roles = [decoded.UserInfo.role];
            next();
        }
    );
}

module.exports = verifyJWT