const express = require('express');
const petsRoutes = express.Router();
const upload = require('../middleware/file.middleware')
const {
     postPet, getAllPets, putPet, patchAssociationInPet, deletePet, getPetById, getPetBySpecies,
    } = require('../controllers/petController');

// petsRoutes.get('/',(req,res) =>{
    //     res.send('Estas son las pets')
    // });
        
//GET
petsRoutes.get('/', getAllPets);
petsRoutes.get('/:id', getPetById);
petsRoutes.get('/species/:species', getPetBySpecies);

//POST
petsRoutes.post('/', upload.single('imgPets'), postPet);

//PUT y/o PATCH
petsRoutes.put('/:id', putPet);

petsRoutes.patch('/newassociation/:id', patchAssociationInPet);

//DELETE
petsRoutes.delete('/:id', deletePet)

module.exports = petsRoutes