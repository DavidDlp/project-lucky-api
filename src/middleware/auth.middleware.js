const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error();
      error.status = 401;
      error.message = "Unauthorized";
      return next(error);
    }

    const parsedToken = token.replace("Bearer ", "");

    const validToken = jwt.verify(parsedToken, process.env.JWT_SECRET);

    const userLogued = await User.findById(validToken.id);
    userLogued.password = null;
    req.user = userLogued;

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuth,
};
