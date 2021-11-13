const express = require ('express')
const mongoose = require ('mongoose')
const morgan = require('morgan');
require('dotenv').config();

const petsRoutes = require('./routes/petsRoutes')

const app = express();



//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/pets', petsRoutes);

app.use('*', (req,res,next) =>{
    const error = new Error()
    error.status = 404
    error.message = 'Route not Found'
    return next(error)
});

//ERROR
app.use("*", (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = "Route not found";
    return next(error);
  });
  
app.use((error, req, res, next) => {
    return res
      .status(error.status || 500)
      .json(error.message || "Unexpected error");
});

//CONECT DB
const PORT = 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.info(`Server is running in http://localhost:${PORT}`))
    );


