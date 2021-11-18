const userRoutes = require("express").Router();
const upload = require('../middleware/file.middleware')
const { isAuth, isRole } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  logInUser,
  logOutUser,
  registerNewUser,
  delUserById,
  putUsersById,
  patchUserById,
  patchFavoritePets
} = require("../controllers/userController");

userRoutes.get("/admin/", [isAuth],getAllUsers);
userRoutes.delete("/admin/:id", [isAuth],delUserById);
userRoutes.put("/admin/:id", [isAuth],putUsersById);

userRoutes.post("/register",upload.single('imgAvatar'), registerNewUser);
userRoutes.post("/login", logInUser);
userRoutes.post("/logout", [isAuth], logOutUser);

userRoutes.patch("/patch/:id", [isAuth, upload.single('imgAvatar')], patchUserById);
userRoutes.patch("/newfavpet/:id", [isAuth], patchFavoritePets );


module.exports = userRoutes;
