const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
    {
        name: {type:String, required:true, trim:true},
        species: {type:String, required:true, trim:true},
        gender: {type:String, required:true, trim:true},
        birthday: {type:String,  trim:true},
        city: {type:String,  trim:true},
        imgPets:{type:String},
        size: {type:Number, trim:true},
        weight: {type:Number, trim:true},
        personality: {type:String, trim:true},
        history: {type:String, trim:true},
        association: {type:mongoose.Types.ObjectId, ref:'associations'},
        record: {
            vaccinated: {type:Boolean, required:true},
            dewormed: {type:Boolean,},
            healthy: {type:Boolean,},
            sterilized: {type:Boolean,},
            identified: {type:Boolean,},
            microchip: {type:Boolean, required:true},
            other: {type:String,}
        },
        
    },
    {
        timestamps:true
    }
);

const Pet = mongoose.model('pets', petSchema);

module.exports = Pet