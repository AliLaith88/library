const express = require("express");
const app = express();
const path = require("path")
const mongoose = require('mongoose');
require('dotenv').config()

const catalogRouter = require("./routes/catalog");
const indexRouter = require("./routes/index");

app.set("views" , path.join(__dirname, "views"))
app.set("view engine" , "pug")

mongoose.set('strictQuery', false);

mongoose.connect(process.env.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('Connected to DB')
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});




app.use("/", indexRouter);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/catalog", catalogRouter);




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
