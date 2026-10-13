const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }

  try {
    const decoded = jwt.verify(token, "/");
    const username = decoded.username;

    if (!username) {
      return res.status(403).json({
        message: "malformed token",
      });
    }

    req.username = username;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = {
  authMiddleware,
};
