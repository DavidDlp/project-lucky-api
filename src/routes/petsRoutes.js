const express = require('express');
const petsRoutes = express.Router();
const upload = require('../middleware/file.middleware')
const {
     postPet, getAllPets, putPet, patchAssociationInPet, deletePet, getPetById, getPetBySpecies, getPetByCity, getPetByGender,
    } = require('../controllers/petController');
const { isAuth } = require('../middleware/auth.middleware');

// petsRoutes.get('/',(req,res) =>{
    //     res.send('Estas son las pets')
    // });
        
//GET
petsRoutes.get('/',[isAuth], getAllPets);
petsRoutes.get('/:id',[isAuth], getPetById);
petsRoutes.get('/species/:species',[isAuth], getPetBySpecies);
petsRoutes.get('/gender/:gender',[isAuth], getPetByGender);
petsRoutes.get('/city/:city',[isAuth], getPetByCity);

//POST
petsRoutes.post('/', [isAuth,upload.single('imgPets')], postPet);

//PUT y/o PATCH
petsRoutes.put('/:id',[isAuth], putPet);

petsRoutes.patch('/newassociation/:id',[isAuth], patchAssociationInPet);

//DELETE
petsRoutes.delete('/:id',[isAuth], deletePet)

module.exports = petsRoutes