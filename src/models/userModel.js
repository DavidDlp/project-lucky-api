const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
       name:{type:String, trim:true },
       surname:{type:String, trim:true },
       DNI:{type:String, trim:true},
       telephone:{type:String, trim:true},
       street:{type:String, trim:true},
       city:{type:String, trim:true},
       pc:{type:String, trim:true},
       imgAvatar:{type:String},

       petsFavorite:[{type: mongoose.Types.ObjectId, ref: 'pets'}],
       petsAdopted:[{type: mongoose.Types.ObjectId, ref: 'pets'}],
       imgHouse:[{type: mongoose.Types.ObjectId, ref: '??? form'}],
       
       email:{type:String, trim:true, unique:true, required:true },
       password:{type:String, trim:true, required:true },

       role:{type:String, trim:true,  enum:["user","admin"], default:"user"}
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User