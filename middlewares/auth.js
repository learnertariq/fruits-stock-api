const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (token === "null")
    return res.status(401).send("Access denied, no token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Access denied, Invalid Token");
  }
};

module.exports = auth;
