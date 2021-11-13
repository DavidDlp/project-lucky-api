const userRoutes = require("express").Router();
const upload = require('../middleware/file.middleware')
const { isAuth , isRole  } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  logInUser,
  logOutUser,
  registerNewUser,
  delUserById,
  updGlobalById,
  updOneById,
  patchFavoritePets
} = require("../controllers/userController");

userRoutes.get("/get/all", [isAuth, isRole(['admin'])],getAllUsers);
userRoutes.delete("/del/:id", [isAuth, isRole(['admin'])],delUserById);
userRoutes.put("/put/:id", [isAuth, isRole(['admin'])],updGlobalById);

userRoutes.post("/register", registerNewUser);
userRoutes.post("/login", logInUser);
userRoutes.post("/logout", [isAuth], logOutUser);

userRoutes.patch("/patch/:id", [isAuth, upload.single('imgAvatar')], updOneById);
userRoutes.patch("/newfavorite/:id", patchFavoritePets )


module.exports = userRoutes;
