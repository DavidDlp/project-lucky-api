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

associationRoutes.get('/',[isAuth], getAllAssociation)
associationRoutes.get('/:id',[isAuth], getAssociationById)

associationRoutes.post("/register",upload.single("imgLogo"),postNewAssociation);
associationRoutes.post("/login", logInAssociation);
associationRoutes.post("/logout", [isAuth], logOutAssociation);

associationRoutes.put('/:id',[isAuth], putAssociation)
associationRoutes.patch('/newpet/:id',[isAuth], patchPetInAssociation)
associationRoutes.delete('/:id',[isAuth], deleteAssociation)


module.exports = associationRoutes;

