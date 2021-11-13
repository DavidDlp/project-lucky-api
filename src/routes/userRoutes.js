const userRoutes = require("express").Router();
const { isAuth , isRole  } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  logInUser,
  logOutUser,
  registerNewUser,
  delUserById,
  updGlobalById,
  updOneById
} = require("../controllers/userController");

userRoutes.get("/", [isAuth, isRole(['admin'])],getAllUsers);

userRoutes.delete("/del/:id",delUserById);
userRoutes.put("/put/:id", [isAuth],updGlobalById);


userRoutes.post("/register", registerNewUser);
userRoutes.post("/login", logInUser);
userRoutes.post("/logout", [isAuth], logOutUser);

userRoutes.patch("/patch/:id", [isAuth], updOneById);


module.exports = userRoutes;
