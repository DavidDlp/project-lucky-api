const express = require("express")
const associationRoutes = require('express').Router()



const {

    getAllAssociation,
    getAssociationById,
    postNewAssociation,
    putAssociation,
    deleteAssociation,
}= require ("../controllers/association.controllers")

const Association =require("../models/association.model")

associationRoutes.get('/', getAllAssociation)
associationRoutes.get('/:id', getAssociationById)
associationRoutes.post('/', postNewAssociation)
associationRoutes.put('/', putAssociation)
associationRoutes.delete('/:id', deleteAssociation)


module.exports = associationRoutes;

