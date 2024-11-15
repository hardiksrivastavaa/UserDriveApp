const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.cookies.token;


    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        return next();

    } catch (err) {

        // Differentiating errors for better debugging
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Unauthorized: Token has expired'
            });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token'
            });
        }

        // General error fallback
        return res.status(401).json({
            message: 'Unauthorized: Invalid token'
        });    
    }
}

module.exports = auth;
