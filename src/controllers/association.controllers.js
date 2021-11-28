const Association =require('../models/association.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pet = require('../models/pets.model');

/*GET*/
const getAllAssociation = async (req, res, next) => {
    try {
       const allAssociations = await Association.find().populate('pets');
       return res.status(200).json(allAssociations); 
    } catch (error) {
        return next(error);
    }
};
/*GETBYID*/
const getAssociationById = async (req, res, next) => {
    try {
      const {id} = req.params
      const findAssociation = await Association.findById(id).populate('pets');
      return res.status(200).json(findAssociation);
    } catch (error) {
      return next(error);
    }
  };

  /*POST / LOGIN / LOGOUT*/
const postNewAssociation = async (req, res, next) => {
    try {
      const newAssociation = new Association(req.body);
      newAssociation.role = 'association'
      if(req.file){newAssociation.imgLogo = req.file.path}
      const newAssociationInBd = await newAssociation.save();
      return res.status(201).json(newAssociationInBd);
    } catch (error) {
      return next(error);
    }
  };
const logInAssociation = async (req, res, next) => {
    try {
      const associationInBd = await Association.findOne({ email: req.body.email });
      if (!associationInBd) {
        const error = new Error();
        error.status = 404;
        error.message = "wrong email";
        return next(error);
      }
  
      if (bcrypt.compareSync(req.body.password, associationInBd.password)) {
        associationInBd.password = null;
        associationInBd.password = "";
  
        const token = jwt.sign(
          { id: associationInBd._id, email: associationInBd.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
  
        return res.status(200).json({token, associationInBd});

      }
    } catch (error) {
      error.message = "error at logging";
      return next(error);
    }
  };
  
const logOutAssociation = (req, res, next) => {
    try {
      const token = null;
      return res.status(200).json(token);
    } catch (error) {
      return next(error);
    }
  };


  /*PUT */
const putAssociation = async (req, res, next) => {
    try {
      const { id } = req.params;
      const AssociationModify = new Association(req.body);
      AssociationModify._id = id;
      const associationUpdated = await Association.findByIdAndUpdate(id, AssociationModify);
      return res.status(200).json(associationUpdated);
    } catch (error) {
      return next(error);
    }
  };
  /*PATCH*/
const patchPetInAssociation = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const idPet = req.body.idPet;
        const updateAssociationWithPets = await Association.findByIdAndUpdate(id,{$push:{pets:idPet}});
        return res.status(200).json(updateAssociationWithPets)

    }catch(error){
        return next(error)
    }
};

  /*DELETE */
const deleteAssociation = async (req, res, next) => {
    try {
      const { id } = req.params;
      const associationDeleted = await Association.findByIdAndDelete(id);
      return res.status(200).json(associationDeleted);
    } catch (error) {
      return next(error);
    }
  };



const patchAceptAdoption = async (req,res,next) => {
  try{
    await Pet.findByIdAndUpdate(req.body._id,{estado:req.body.estado = "Aceptada"});
    return res.status(200).json("Status changed");
  }catch(error){
    return next(error);
  }
}
const patchRejectAdoption = async (req,res,next) => {
  try{
    await Pet.findByIdAndUpdate(req.body._id,{estado:req.body.estado = "Rechazada"});
    return res.status(200).json("Status changed");
  }catch(error){
    return next(error);
  }
}

module.exports ={
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
};


