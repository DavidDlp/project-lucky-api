const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('petsFavorite');
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
 //ADMIN
const delUserById = async (req,res,next) =>{
  try{
      await User.findByIdAndDelete(req.params.id)
      return res.status(410).json('User deleted')
  }catch(error){
      return next(error)
  }
}; //ADMIN
const putUsersById = async (req,res,next) =>{
  try{
    const {id} = req.params
    const {...children} = req.body
    const update = await User.findByIdAndUpdate(id,{...children})
    return res.status(201).json(update)
  }catch(error){
    return console.log(error)
  }
} //ADMIN


const patchFavoritePets = async (req,res,next) =>{
  try{
    const {id} = req.params;
    //const idPet = req.body._id;
    const updateUserWithPet = await User.findByIdAndUpdate(id,{$push:{petsFavorite:req.body._id}})
    return res.status(200).json(updateUserWithPet)
  }catch(error){
    return next(error)
  }
}//USER //ADMIN
const patchAdoptedPets = async (req,res,next) =>{
  try{
    const {id} = req.params;
    const updateUserWithPet = await User.findByIdAndUpdate(id,{$push:{petsAdopted:req.body._id}})
    return res.status(200).json(updateUserWithPet)
  }catch(error){
    return next(error)
  }
}//USER //ADMIN
const patchUserById = async (req,res,next) =>{
  try{ 
    const {id} = req.params
    const newUpdate = new User({
      _id:req.params.id,
    })
    req.file ? newUpdate.imgAvatar=req.file.path : newUpdate
    req.body.name !== "" ? newUpdate.name=req.body.name : newUpdate
    req.body.surname !== "" ? newUpdate.surname=req.body.surname : newUpdate
    req.body.DNI !== "" ? newUpdate.DNI=req.body.DNI : newUpdate
    req.body.telephone !== "" ? newUpdate.telephone=req.body.telephone : newUpdate
    req.body.street !== "" ? newUpdate.street = req.body.street : newUpdate
    req.body.city !== "" ? newUpdate.city = req.body.city : newUpdate
    req.body.pc !== "" ? newUpdate.pc = req.body.pc : newUpdate

    const updateProp = await User.findByIdAndUpdate({_id:id},newUpdate)
    return res.status(201).json(updateProp) 
  }catch(error){
    return next(error)
  }
}//USER //ADMIN


const registerNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    newUser.role = 'user'
    if(req.file){newUser.imgAvatar = req.file.path}
    /* console.log("imgAvatar ->", newUser.imgAvatar)
    console.log( "path ->", req.file.path) */
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
      error.message = "wrong email";
      return next(error);
    }

    if (bcrypt.compareSync(req.body.password, userInBd.password)) {
      userInBd.password = null;
      userInBd.password = "";

      const token = jwt.sign(
        { id: userInBd._id, email: userInBd.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({token, userInBd});
    }
  } catch (error) {
    error.message = "error at logging";
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
};//USER //ADMIN // es necesaria?

module.exports = {
  getAllUsers,
  registerNewUser,
  logInUser,
  logOutUser,
  delUserById,
  putUsersById,
  patchUserById,
  patchFavoritePets,
  patchAdoptedPets
}
