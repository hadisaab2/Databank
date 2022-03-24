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

//const Event = require("../models/Event")
router.post("/townsdata", async (req, res) => {
    const dictionary = req.body 
    const towns = []
    for (let i = 0 ; i<dictionary.length; i++) {
      for( let j = 0 ; j< dictionary[i].selectedplaces.length ; j++) {
        towns.push(dictionary[i].selectedplaces[j])
      }
    }
    console.log(towns)
    /*const locationdata = await sequelize.query(
      "Select * from locations where towns in (?)",
      {
        replacements: [towns],
        type: QueryTypes.SELECT,
      }
    );
    */

    
})


module.exports = router;
