const express = require("express");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const sequelize=require("./util/database")
const userRoute = require("./routes/user");
const storeRoute = require("./routes/store");
const interestRoute = require("./routes/interest");
const eventsRoute = require("./routes/events");
const locationRoute = require("./routes/location");




app.use("/user", userRoute);
app.use("/store", storeRoute);
app.use("/interest",interestRoute);
app.use("/events",eventsRoute);
app.use("/location",locationRoute);




app.listen(5000, async (req, res) => {
  sequelize.sync().then(result => {
    console.log(result);
  }).catch(err =>{
    console.log(err);
  })
    console.log("backend running");
});
express.static("./public", [])



app.use('/images', express.static('images'));
app.use(express.static('public')); 
//http://localhost:5000/images/1647863600509-osama.jpg

