const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { QueryTypes } = require("@sequelize/core");
const sequelize = require("../util/database");
const router = express.Router();

app.use(
  express.urlencoded({
    extended: true,
  })
);

const Event = require("../models/Event");


router.post("/getevents", async (req, res) => {
    const events =  await sequelize.query(
        "SELECT * FROM events",
        {
          type: QueryTypes.SELECT,
        }
      );
      console.log(events);
      res.json(events)
})

router.post("/addevent", async (req, res) => {
    const { title, description, email } = req.body;
    let da = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Beirut'
    })
    da=da.slice(0,18).replace(',','')
    console.log(da)
    //const datetime = da.toISOString().slice(0, 19).replace('T', ' ');
    const event = await Event.create({title: title, description: description, email: email, startdate:da, enddate: da});
})
router.post("/geteventuser", async (req, res) => {
  const { email } = req.body;
  const user =  await sequelize.query(
    "SELECT * FROM users Where email = '" + email + "'",
    {
      type: QueryTypes.SELECT,
    }
  );
  res.json(user)



})


module.exports = router;
