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
    logOutAssociation,
    patchAceptAdoption,
    patchRejectAdoption
}= require ("../controllers/association.controllers")

associationRoutes.get('/',[isAuth, isRole(["association","admin"])], getAllAssociation)
associationRoutes.get('/:id',[isAuth, isRole(["association","admin"])], getAssociationById)

associationRoutes.post("/register",upload.single("imgLogo"),postNewAssociation);
associationRoutes.post("/login", logInAssociation);
associationRoutes.post("/logout", [isAuth, isRole(["association","admin"])], logOutAssociation);

associationRoutes.put('/:id',[isAuth, isRole(["association","admin"])], putAssociation)
associationRoutes.patch('/newpet/:id',[isAuth, isRole(["association","admin"])], patchPetInAssociation)
associationRoutes.delete('/:id',[isAuth, isRole(["association","admin"])], deleteAssociation)

associationRoutes.patch('/adoptionaccept/:id',[isAuth, isRole(["association","admin"])], patchAceptAdoption)
associationRoutes.patch('/adoptionreject/:id',[isAuth, isRole(["association","admin"])], patchRejectAdoption)

module.exports = associationRoutes;

