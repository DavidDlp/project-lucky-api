const mongoose = require('mongoose')

const associationSchema = new mongoose.Schema(
{
    name:{type:String, require:true},
    email:{type:String, require:true},
    address:{type:String, require:true},
    city:{type:String, require:true},
    phone:{type:String, require:true},
    pets:[{type:mongoose.Types.ObjectId, ref:'pets'}]
},
{
    timestamps: true,
}
);

const Association = mongoose.model("associations", associationSchema);

module.exports = Association