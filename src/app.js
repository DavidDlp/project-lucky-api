
const express = require ('express')
const mongoose = require ('mongoose')
const {defaults} = require ('./_shared/utils/defaults.utils')
require('dotenv').config();

const app = express();







app.use(express.json());
app.use(express.urlencoded({ extended: true }));








//ERRORS
 /* app.use((error,req,res,next)=>{
    const exception = {
        status: defaults(error.status, 500),
        messege: defaults(error.messege,'unexpected error')
    }
    
    if(process.env.NODE_ENV !== 'production'){
        exception['callstack'] = error.stack;
    }
    
    console.error(exception);
    res.status(exception.status).json(exception)
}); */

//CONECT DB
const PORT = 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.info(`Server is running in http://localhost:${PORT}`))
    );


