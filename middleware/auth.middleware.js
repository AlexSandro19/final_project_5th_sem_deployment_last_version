const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const { userId, exp } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(userId);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "JWT token has expired, please login to obtain a new one",
      });
    }
    res.status(401).json({ message: "Unauthorized access" });
  }
};
