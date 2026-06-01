const jwt = require("jsonwebtoken");


function authMiddleware(req, res, next) {
// Check if the uses has been assigned with the token

    const token = req.headers.token;
//If token is not received 
    if (!token) {
        res.status(403).send({
            message: "You are not loggged in",
    });
    return;
}
      
    const decoded = jwt.verify(token, "password123123");
    const userId = parseInt(decoded.userId);
//If token is recived but no userID 
  // if (!userId) {
  //   res.status(403).json({
  //     message: "malformed token",
  //   });
  //   return;
  // }

    req.userId = userId;
    next();
}

module.exports = {
  authMiddleware,
};
