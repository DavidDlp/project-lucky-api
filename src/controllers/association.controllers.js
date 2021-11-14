const Association =require('../models/association.model');


/*GET*/
const getAllAssociation = async (req, res, next) => {
    try {
       const allAssociations = await Association.find();
       return res.status(200).json(allAssociations); 
    } catch (error) {
        return next(error);
    }
};

/*GETBYID*/
const getAssociationById = async (req, res, next) => {
    try {
      const {id} = req.params
      const findAssociation = await Association.findById(id);
      return res.status(200).json(findAssociation);
    } catch (error) {
      return next(error);
    }
  };

  /*POST*/
const postNewAssociation = async (req, res, next) => {
    try {
      const newAssociation = new Association({
        name: req.body.name,
        address: req.body.address,
        city:req.body.city, 
        email:req.body.email,
        phone:req.body.phone,
    
      });
      const newAssociationInBd = await newAssociation.save();
      return res.status(201).json(newAssociationInBd);
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

module.exports ={
    getAllAssociation,
    getAssociationById,
    postNewAssociation,
    putAssociation,
    deleteAssociation,
};


