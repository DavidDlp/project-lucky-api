const express = require ('express')
const mongoose = require ('mongoose')
const cloudinary = require("cloudinary").v2;
const morgan = require('morgan');
const cors = require("cors");
require('dotenv').config();

const petsRoutes = require('./routes/petsRoutes')
const userRoutes = require("./routes/userRoutes");
const associationRoutes = require("./routes/association.routes")

const app = express();
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

app.use(cors({
origin: ['http://localhost:3000', 'http://localhost:3001'],
credentials: true,
}));

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/user", userRoutes);
app.use('/associations', associationRoutes);
app.use('/pets', petsRoutes);mongoose


app.use("*", (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = "Route not found";
    return next(error);
  });
  
//ERROR
app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.disable('x-powered-by');

//CONECT DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.info(`Server is running in http://localhost:${PORT}`)
    )
  );
