const userRoutes = require("express").Router();
const { isAuth } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  logInUser,
  logOutUser,
  registerNewUser,
  delUserById,
} = require("../controllers/userController");

userRoutes.get("/", getAllUsers);
userRoutes.delete("/del/:id", delUserById);


userRoutes.post("/register", registerNewUser);
userRoutes.post("/login", logInUser);
userRoutes.post("/logout", [isAuth], logOutUser);

module.exports = userRoutes;
