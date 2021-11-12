const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}; //ADMIN
const delUserById = async (req,res,next) =>{
  try{
      await User.findByIdAndDelete(req.params.id)
      return res.status(410).json('Deleted')
  }catch(error){
      return next(error)
  }
}; //ADMIN



const registerNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userInBd = await newUser.save();
    return res.status(201).json(userInBd);
  } catch (error) {
    return next(error);
  }
};//USER //ADMIN

const logInUser = async (req, res, next) => {
  try {
    const userInBd = await User.findOne({ email: req.body.email });
    if (!userInBd) {
      const error = new Error();
      error.status = 404;
      error.message = "No existe usuario con ese email";
      return next(error);
    }

    if (bcrypt.compareSync(req.body.password, userInBd.password)) {
      userInBd.password = null;

      const token = jwt.sign(
        { id: userInBd._id, email: userInBd.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json(token);
    }
  } catch (error) {
    error.message = "error al loguear";
    return next(error);
  }
};//USER //ADMIN

const logOutUser = (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return next(error);
  }
};//USER //ADMIN

module.exports = {
  getAllUsers,
  registerNewUser,
  logInUser,
  logOutUser,
  delUserById
};
