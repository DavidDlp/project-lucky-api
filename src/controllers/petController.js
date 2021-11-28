const Pets = require('../models/pets.model')
const Association = require('../models/association.model')

//GET
const getAllPets = async (req,res,next) =>{
    try{
        const pets = await Pets.find().populate('association')
        return res.status(200).json(pets);

    }catch(error){
        return next(error)
    }
};

const getPetById = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const findPet = await Pets.findById(id).populate('association');
        return res.status(200).json(findPet);
    }catch(error){
        return next(error)
    }
};
const getPetBySpecies = async (req,res,next) =>{
    try{
        const {species} = req.params;
        const findSpecies = await Pets.find({species}).populate('association');
        return res.status(200).json(findSpecies)
    }catch(error){
        return next(error)
    }
}
const getPetByCity = async (req,res,next) =>{
    try{
        const {city} = req.params;
        const findCity = await Pets.find({city}).populate('association');
        return res.status(200).json(findCity)
    }catch(error){
        return next(error)
    }
}
const getPetByGender = async (req,res,next) =>{
    try{
        const {gender} = req.params;
        const findGender = await Pets.find({gender}).populate('association');
        return res.status(200).json(findGender)
    }catch(error){
        return next(error)
    }
}
//POST
const postPet = async (req, res, next) =>{
    try{
        const newPet = new Pets(req.body);
        newPet.status = 'Disponible';
        if (req.file){newPet.imgPets = req.file.path} 
        const newPetInBd = await newPet.save();
        const patchassociations = await Association.findByIdAndUpdate(req.association._id ,{$push:{pets:newPetInBd._id}})
        await Pets.findByIdAndUpdate(newPetInBd._id,{$push:{association: req.association._id }}); 

        return res.status(201).json(newPetInBd)
    }catch(error){
        return next(error)
    }
};
//PUT y/o PATCH
const putPet = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const newPet = new Pets(req.body);
        newPet._id = id;
        const petUpdated = await Pets.findByIdAndUpdate(id, newPet);
        return res.status(200).json(petUpdated)

    }catch(error){
        return next(error)
    }
};
const patchAssociationInPet = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const idAssociation = req.body.idAssociation;
        const updatePetWithAsssociation = await Pets.findByIdAndUpdate(id,{$push:{association:idAssociation}});
        return res.status(200).json(updatePetWithAsssociation)

    }catch(error){
        return next(error)
    }
};
//DELETE
const deletePet = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const deletedPet = await Pets.findByIdAndDelete(id);
return res.status(200).json(deletedPet)

    }catch(error){
        return next(error)
    }
}

module.exports = {
    getAllPets,
    getPetById,
    getPetBySpecies,
    getPetByGender,
    getPetByCity,
    postPet,
    putPet,
    patchAssociationInPet,
    deletePet

}