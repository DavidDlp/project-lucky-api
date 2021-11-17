const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Association =require('../models/association.model');

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
    const associationLogued = await Association.findById(validToken.id);
    userLogued.password = null;
    associationLogued.password = null;
    req.user = userLogued;
    req.association = associationLogued;

    next();
  } catch (error) {
    return next(error);
  }
};

const isRole = (permissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You dont have necessary permission");
    }
  };
};

module.exports = {
  isAuth,
  isRole,
};
