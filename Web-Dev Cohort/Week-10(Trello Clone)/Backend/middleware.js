const jwt = require("jsonwebtoken");

// FIX: Standardized JWT secret key shared between index.js and middleware.js
const JWT_SECRET = "attlasiationsupersecret123123password";

function authMiddleware(req, res, next) {
    // Check if the user has provided the token in headers (token or Authorization)
    const authHeader = req.headers.authorization;
    const token = req.headers.token || (authHeader ? authHeader.replace(/^Bearer\s+/i, "") : null);

    // If token is not received 
    if (!token) {
        return res.status(403).json({
            message: "You are not logged in",
        });
    }

    try {
        // FIX: Wrapped in try...catch so invalid or expired tokens do not crash the server
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        // If token is received but has no userId 
        if (!userId) {
            return res.status(403).json({
                message: "malformed token",
            });
        }

        req.userId = userId;
        next();
    } catch (err) {
        // FIX: Return 403 when token verification fails
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
}

module.exports = {
    authMiddleware,
    JWT_SECRET,
};
