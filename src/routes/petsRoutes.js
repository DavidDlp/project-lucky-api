const express = require('express');
const petsRoutes = express.Router();
const {
     postPet, getAllPets, putPet, patchAssociationInPet, deletePet, getPetById, getPetBySpecies,
    } = require('../controllers/petController');

// petsRoutes.get('/',(req,res) =>{
    //     res.send('Estas son las pets')
    // });
        
//GET
petsRoutes.get('/', getAllPets);
petsRoutes.get('/', getPetById);
petsRoutes.get('/', getPetBySpecies);

//POST
petsRoutes.post('/', postPet);

//PUT y/o PATCH
petsRoutes.put('/', putPet);

petsRoutes.patch('/', patchAssociationInPet);

//DELETE
petsRoutes.delete('/', deletePet)

module.exports = petsRoutes