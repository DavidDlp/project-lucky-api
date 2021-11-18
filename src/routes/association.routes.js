const associationRoutes = require('express').Router()
const { isAuth, isRole } = require("../middleware/auth.middleware");
const upload = require('../middleware/file.middleware')

const {
    getAllAssociation,
    getAssociationById,
    postNewAssociation,
    putAssociation,
    deleteAssociation,
    patchPetInAssociation,
    logInAssociation,
    logOutAssociation
}= require ("../controllers/association.controllers")

associationRoutes.get('/',[isAuth,isRole(["admin","association"])], getAllAssociation)
associationRoutes.get('/:id',[isAuth,isRole(["admin","association"])], getAssociationById)

associationRoutes.post("/register",upload.single("imgLogo"),postNewAssociation);
associationRoutes.post("/login", logInAssociation);
associationRoutes.post("/logout", [isAuth,isRole(["admin","association"])], logOutAssociation);

associationRoutes.put('/:id',[isAuth,isRole(["admin","association"])], putAssociation)
associationRoutes.patch('/newpet/:id',[isAuth,isRole(["admin","association"])], patchPetInAssociation)
associationRoutes.delete('/:id',[isAuth,isRole(["admin","association"])], deleteAssociation)


module.exports = associationRoutes;

