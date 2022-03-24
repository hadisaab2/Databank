const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { QueryTypes } = require("@sequelize/core");
const sequelize = require("../util/database");

const Store = require("../models/Store");
var json2csv = require("json2csv");
const fastcsv = require("fast-csv");
const fs = require("fs");

const router = express.Router();

app.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/addstore", (req, res) => {
  const { storename, address, phonetype, phone, categoryname, industry, city } =
    req.body;
  Store.create({
    storename: storename,
    address: address,
    phonetype: phonetype,
    phone: phone,
    categoryname: categoryname,
    industry: industry,
    city: city,
  });
  res.json("Added");
});

router.post("/getstores", async (req, res) => {
  const { cities, types } = req.body;

  if (Object.keys(types).length == 0) {
    const stores = await sequelize.query(
      "SELECT * FROM stores WHERE city IN (?) ORDER BY Id OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY ",
      {
        replacements: [cities],
        type: QueryTypes.SELECT,
      }
    );
    res.json(stores);
  } else {
    if (Object.keys(cities).length == 0) {
      const stores = await sequelize.query(
        "SELECT * FROM stores WHERE  categoryname IN (?) ORDER BY Id OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY ",
        {
          replacements: [types],
          type: QueryTypes.SELECT,
        }
      );
      res.json(stores);
    } else {
      const stores = await sequelize.query(
        "SELECT * FROM stores WHERE city IN (?) AND categoryname IN (?) ORDER BY Id OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY ",
        {
          replacements: [cities, types],
          type: QueryTypes.SELECT,
        }
      );
      res.json(stores);
    }
  }
});

router.post("/exporttocsv", async (req, res) => {
  const { cities, types } = req.body;
  if (Object.keys(types).length == 0) {
    const stores = await Store.findAll({
      attributes: [
        "id",
        "storename",
        "address",
        "phonetype",
        "phone",
        "categoryname",
        "industry",
        "city",
      ],
      where: {
        city: cities,
      },
    });
    if (stores.length === 0) {
      res.json({ error: "User Doesnt Exxist" });
    } else {
      const data = [];
      for (let i = 0; i < stores.length; i++) {
        var json_arr = {};
        json_arr["id"] = stores[i].dataValues.id;
        json_arr["storename"] = stores[i].dataValues.storename;
        json_arr["address"] = stores[i].dataValues.address;
        json_arr["phonetype"] = stores[i].dataValues.phonetype;
        json_arr["phone"] = stores[i].dataValues.phone;
        json_arr["categoryname"] = stores[i].dataValues.categoryname;
        json_arr["industry"] = stores[i].dataValues.industry;
        json_arr["city"] = stores[i].dataValues.city;
  
        data.push(json_arr);
      }
      res.json(data);
    }
    
 
} else {
  if (Object.keys(cities).length == 0) {
    const stores = await Store.findAll({
      attributes: [
        "id",
        "storename",
        "address",
        "phonetype",
        "phone",
        "categoryname",
        "industry",
        "city",
      ],
      where: {
        categoryname: types,
      },
    });
    if (stores.length === 0) {
      res.json({ error: "User Doesnt Exxist" });
    } else {
      const data = [];
      for (let i = 0; i < stores.length; i++) {
        var json_arr = {};
        json_arr["id"] = stores[i].dataValues.id;
        json_arr["storename"] = stores[i].dataValues.storename;
        json_arr["address"] = stores[i].dataValues.address;
        json_arr["phonetype"] = stores[i].dataValues.phonetype;
        json_arr["phone"] = stores[i].dataValues.phone;
        json_arr["categoryname"] = stores[i].dataValues.categoryname;
        json_arr["industry"] = stores[i].dataValues.industry;
        json_arr["city"] = stores[i].dataValues.city;
  
        data.push(json_arr);
      }
      res.json(data);
    }
    
    
  } else {
    const stores = await Store.findAll({
      attributes: [
        "id",
        "storename",
        "address",
        "phonetype",
        "phone",
        "categoryname",
        "industry",
        "city",
      ],
      where: {
        categoryname:types,
        city: cities,
      },
    });
    if (stores.length === 0) {
      res.json({ error: "User Doesnt Exxist" });
    } else {
      const data = [];
      for (let i = 0; i < stores.length; i++) {
        var json_arr = {};
        json_arr["id"] = stores[i].dataValues.id;
        json_arr["storename"] = stores[i].dataValues.storename;
        json_arr["address"] = stores[i].dataValues.address;
        json_arr["phonetype"] = stores[i].dataValues.phonetype;
        json_arr["phone"] = stores[i].dataValues.phone;
        json_arr["categoryname"] = stores[i].dataValues.categoryname;
        json_arr["industry"] = stores[i].dataValues.industry;
        json_arr["city"] = stores[i].dataValues.city;
  
        data.push(json_arr);
      }
      res.json(data);
    }
  }
}

  
});
router.post("/getstorespaginate", async (req, res) => {
  const { cities, types, value } = req.body;
  const start = 10 * value - 10;
  const end = 10;
  if (Object.keys(types).length == 0) {
      const stores = await sequelize.query(
        "SELECT * FROM stores WHERE city IN (?) ORDER BY Id OFFSET ? ROWS FETCH NEXT 10 ROWS ONLY ",
        {
          replacements: [cities, start],
          type: QueryTypes.SELECT,
        }
      );
      res.json(stores);
   
  } else {
    if (Object.keys(cities).length == 0) {
        const stores = await sequelize.query(
          "SELECT * FROM stores WHERE categoryname IN (?) ORDER BY Id OFFSET ? ROWS FETCH NEXT 10 ROWS ONLY ",
          {
            replacements: [types, start],
            type: QueryTypes.SELECT,
          }
        );
        res.json(stores);
      
      
    } else {
        const stores = await sequelize.query(
          "SELECT * FROM stores WHERE categoryname IN (?) AND city IN (?) ORDER BY Id OFFSET ? ROWS FETCH NEXT 10 ROWS ONLY ",
          {
            replacements: [types,cities, start],
            type: QueryTypes.SELECT,
          }
        );
        res.json(stores);
    }
  }

 
});

router.post("/total", async (req, res) => {
  const { cities, types } = req.body;

  
  if (Object.keys(types).length == 0 && Object.keys(cities).length == 0) {
    res.json({ numberofrows: 0 });
    return;
  }

  if (Object.keys(types).length == 0) {
    const stores = await sequelize.query(
      "SELECT COUNT(*) as count FROM stores WHERE city IN (?) ",
      {
        replacements: [cities],
        type: QueryTypes.SELECT,
      }
    );
    const numberofrows = stores[0].count;
    res.json({ numberofrows: numberofrows });
  } else {
    if (Object.keys(cities).length == 0) {
      const stores = await sequelize.query(
        "SELECT COUNT(*) as count FROM stores WHERE categoryname IN (?) ",
        {
          replacements: [types],
          type: QueryTypes.SELECT,
        }
      );
      const numberofrows = stores[0].count;
      res.json({ numberofrows: numberofrows });
    } else {
      const stores = await sequelize.query(
        "SELECT COUNT(*) as count FROM stores WHERE city IN (?) AND categoryname IN (?)",
        {
          replacements: [cities, types],
          type: QueryTypes.SELECT,
        }
      );
      const numberofrows = stores[0].count;
      res.json({ numberofrows: numberofrows });
    }
  }
});

router.post("/paginationnumbers", async (req, res) => {
  const { cities, types } = req.body;

  if (Object.keys(types).length == 0) {
    const stores = await sequelize.query(
      "SELECT COUNT(*) as count FROM stores WHERE city IN (?)",
      {
        replacements: [cities],
        type: QueryTypes.SELECT,
      }
    );
    const numberofrows = stores[0].count;
    numberofpages=numberofrows/10
    numberofpages = Math.ceil(numberofpages);
    res.json({ numberofpages: numberofpages, numberofrows: numberofrows });
  } else {
    if (Object.keys(cities).length == 0) {
      const stores = await sequelize.query(
        "SELECT COUNT(*) as count FROM stores WHERE categoryname IN (?)",
        {
          replacements: [types],
          type: QueryTypes.SELECT,
        }
      );
      const numberofrows = stores[0].count;
      numberofpages=numberofrows/10
      numberofpages = Math.ceil(numberofpages);
      res.json({ numberofpages: numberofpages, numberofrows: numberofrows });
    } else {
      const stores = await sequelize.query(
        "SELECT COUNT(*) as count FROM stores WHERE city IN (?) AND categoryname IN (?)",
        {
          replacements: [cities, types],
          type: QueryTypes.SELECT,
        }
      );
      const numberofrows = stores[0].count;
      numberofpages=numberofrows/10
      numberofpages = Math.ceil(numberofpages);

      res.json({ numberofpages: numberofpages, numberofrows: numberofrows });
    }
  }
});

module.exports = router;
