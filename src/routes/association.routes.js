const express = require("express")
const associationRoutes = require('express').Router()
const { isAuth } = require("../middleware/auth.middleware");
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

associationRoutes.get('/', getAllAssociation)
associationRoutes.get('/:id', getAssociationById)

associationRoutes.post("/register",postNewAssociation);
associationRoutes.post("/login", logInAssociation);
associationRoutes.post("/logout", [isAuth], logOutAssociation);

associationRoutes.put('/:id',[isAuth], putAssociation)
associationRoutes.patch('/newpet/:id',[isAuth], patchPetInAssociation)
associationRoutes.delete('/:id',[isAuth], deleteAssociation)


module.exports = associationRoutes;

