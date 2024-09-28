const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const { configDotenv } = require("dotenv");
const { Schema, model } = mongoose;
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db...");
  })
  .catch((err) => {
    console.log("error is coming that is ...", err);
  });

// SCHEMA (move this above routes)

const userSchema = new Schema({
  userid: String,
  password: String,
});

const User = model("data", userSchema);

// ROUTES...

app.get("/test", (req, res) => {
  res.send("hello, its working properly");
});

app.post("/data", (req, res) => {
  const data = {
    userid: req.body.userid,
    password: req.body.password,
  };

  //   console.log(data);
  // const datas = JSON.stringify(data);

  console.log(data);

  const new_user = new User(data); // Use "User" model

  new_user
    .save()
    .then((savedData) => {
      console.log("Data is successfully saved in the database:", savedData);
      res.send("You will get views and likes under 3 processing days.");
    })
    .catch((err) => {
      console.log(
        "Data is not saved in the database because an error occurred:",
        err
      );
      res.status(500).send("Error saving data to the database.");
    });
});

// Start server

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000...");
});
