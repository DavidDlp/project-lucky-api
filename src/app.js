const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

/* cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
}); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//ROUTES
app.use("/user", userRoutes);

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
