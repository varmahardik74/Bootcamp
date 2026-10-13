const jwt = require("jsonwebtoken");

// FIX: Standardized JWT secret key shared between index.js and middleware.js
const JWT_SECRET = "secret123123";

function authMiddleware(req, res, next) {
    // Check if the user has provided the token in headers
    const token = req.headers.token;

    // If token is not received 
    if (!token) {
        return res.status(403).json({
            message: "You are not logged in",
        });
    }

    try {
        // FIX: Wrapped in try...catch so invalid or expired tokens do not crash the server
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // FIX: Removed parseInt()! MongoDB ObjectId is a 24-char hex string (e.g. '652...'),
        // parseInt() breaks it into NaN or truncates it.
        const userId = decoded.userId;

        if (!userId) {
            return res.status(403).json({
                message: "malformed token",
            });
        }

        req.userId = userId;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
}

module.exports = {
    authMiddleware,
    JWT_SECRET,
};
