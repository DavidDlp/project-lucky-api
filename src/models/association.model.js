const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const associationSchema = new mongoose.Schema(
{
    name:{type:String, require:true},
    address:{type:String, require:true},
    city:{type:String, require:true},
    phone:{type:String, require:true},
    pets:[{type:mongoose.Types.ObjectId, ref:'pets'}],
    imgLogo:{type:String},

    email:{type:String, trim:true, unique:true, required:true},
    password:{type:String, trim:true, required:true},
},
{
    timestamps: true,
}
);

associationSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const Association = mongoose.model("associations", associationSchema);
module.exports = Association