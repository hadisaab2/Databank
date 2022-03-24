const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { QueryTypes } = require("@sequelize/core");
const sequelize = require("../util/database");
const functions = require("../functions/paginationnumber.js")
const getinterestsfunctions = require("../functions/getinterests.js")
const getpaginatefunctions = require("../functions/getinterestspaginate.js")
const Store = require("../models/Interest");
var json2csv = require("json2csv");
const fastcsv = require("fast-csv");
const fs = require("fs");
const router = express.Router();

app.use(
  express.urlencoded({
    extended: true,
  })
);
const Interest = require("../models/Interest");



function interestsquery(queryfront,interests) {
  //let query = "SELECT * FROM interests WHERE ";
  let query = queryfront
  for (let i = 0; i < interests.length; i++) {
    if (interests[i] == "Women's Fashion") {
      if (i == interests.length - 1 ) {
        if(interests.length == 1) {
          query += "customerinterests LIKE '%Women%'";
        }else{
        query += "customerinterests LIKE '%Women%')";
        }
      } else {
        if(i==0){     
            query += "(customerinterests LIKE '%Women%' OR ";
        }else {
          query += "customerinterests LIKE '%Women%' OR ";
        }
      }
    } else {
      if (i == interests.length - 1) {
        if(interests.length==1){
          query += "customerinterests LIKE '%" + interests[i] + "%'";
        }else {
          query += "customerinterests LIKE '%" + interests[i] + "%')";
        }
      } else {
        if(i==0){
          query += "(customerinterests LIKE '%" + interests[i] + "%' OR ";
        }else{
          query += "customerinterests LIKE '%" + interests[i] + "%' OR ";
        }
      }
    }
  }
  return query;
}


router.post("/getinterests", async (req, res) => {
  const { interests, country, limit, search } = req.body;
  console.log(search);
  let query=interestsquery("SELECT * FROM interests WHERE ",interests)
  if (country == "Select Country") {
    if (limit) {
      if (limit < 10) {
        if (search) {
          res.json(await getinterestsfunctions.selectcountrysearch(search,query,0,limit));
        } else {
         res.json(await getinterestsfunctions.selectcountrynosearch(query,0,limit))
        }
      } else {
        if (search) {
          res.json(await getinterestsfunctions.selectcountrysearch(search,query,0,10));
        } else {
         res.json(await getinterestsfunctions.selectcountrynosearch(query,0,10));
        }
      }
    } else {
      if (search) {
        res.json(await getinterestsfunctions.selectcountrysearch(search,query,0,10));
      } else {
        res.json(await getinterestsfunctions.selectcountrynosearch(query,0,10))
      }
    }
  } else {
    if (Object.keys(interests).length == 0) {
      if (limit) {
        if (limit < 10) {
          if (search) {
            res.json(await getinterestsfunctions.onlycountrysearch (country,search,0,limit));
          } else {
            res.json(await getinterestsfunctions.onlycountrynosearch (country,0,limit))

          }
        } else {
          if (search) {
            res.json(await getinterestsfunctions.onlycountrysearch (country,search,0,10));
          } else {
            res.json(await getinterestsfunctions.onlycountrynosearch (country,0,10))
          }

        }
      } else {
        if (search) {
          res.json(await getinterestsfunctions.onlycountrysearch (country,search,0,10));
        } else {
          res.json(await getinterestsfunctions.onlycountrynosearch (country,0,10))
        }
      }
    } else {
      if (limit) {
        if (limit < 10) {
          if (search) {
            res.json(await getinterestsfunctions.bothsearch (query,country,search,0,limit));
          } else {
            res.json(await getinterestsfunctions.bothnosearch (query,country,0,limit));
          }
        } else {
          if (search) {
            res.json(await getinterestsfunctions.bothsearch (query,country,search,0,10));
          } else {
            res.json(await getinterestsfunctions.bothnosearch (query,country,0,10));
          }
        }
      } else {
        if (search) {
          res.json(await getinterestsfunctions.bothsearch (query,country,search,0,10));
        } else {
          res.json(await getinterestsfunctions.bothnosearch (query,country,0,10));
        }
      }
    }
  }
});
//.......................................................................................

router.post("/exporttocsv", async (req, res) => {
  const { interests, country, limit, search } = req.body;
  let query=interestsquery("SELECT * FROM interests WHERE ",interests)

  if (country == "Select Country") {
    if (limit) {
      if(search){
       const peopleinterests=await getpaginatefunctions.selectcountrypaginatesearch(query,search,0,limit)
       res.json(peopleinterests);
      }else {
      const peopleinterests=await getpaginatefunctions.selectcountrypaginatenosearch(query,0,limit)
      if (peopleinterests.length === 0) {
        res.json({ error: "Cant Export" });
      } else {
        res.json(peopleinterests);
      }
    }
    } else {
      if(search){
        const searchnumber=await getpaginatefunctions.paginatesearchnumber (query,search)
        const peopleinterests=await getinterestsfunctions.selectcountrypaginatesearch(query,search,0,searchnumber)
        res.json(peopleinterests);

      }else {
      const peopleinterests = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      if (peopleinterests.length === 0) {
        res.json({ error: "Cant Export" });
      } else {
        res.json(peopleinterests);
      }
    }
    }
  } else {
    if (Object.keys(interests).length == 0) {
      if (limit) {
        if(search){
          const peopleinterests=await getpaginatefunctions.countrypaginatesearch(country,search,0,limit)
          res.json(peopleinterests);
        }else {   
        const peopleinterests=await getpaginatefunctions.countrypaginatenosearch(country,0,limit)
        if (peopleinterests.length === 0) {
          res.json({ error: "Cant Export" });
        } else {
          res.json(peopleinterests);
        }
      }
      } else {
        if(search){
          const searchnumber=await getpaginatefunctions.countrypaginatesearchnumber (country,search)
          const peopleinterests=await getinterestsfunctions.countrypaginatesearch(country,search,0,searchnumber)
          res.json(peopleinterests);
        }else {
        const peopleinterests = await sequelize.query(
          "SELECT * FROM interests WHERE country = ?",
          {
            replacements: [country],
            type: QueryTypes.SELECT,
          }
        );
        if (peopleinterests.length === 0) {
          res.json({ error: "Cant Export" });
        } else {
          res.json(peopleinterests);
        }
      }
    }
    } else {
      if (limit) {
        if(search){
          const peopleinterests=await getpaginatefunctions.bothpaginatesearch(query,country,search,0,limit)
          res.json(peopleinterests);
        }else {
        const peopleinterests=await getpaginatefunctions.bothpaginatenosearch(query,country,0,limit)
        if (peopleinterests.length === 0) {
          res.json({ error: "Cant Export " });
        } else {
          res.json(peopleinterests);
        }
      }
      } else {
        if(search){
          const searchnumber=await getpaginatefunctions.bothpaginatesearchnumber (country,search)
          const peopleinterests=await getinterestsfunctions.bothpaginatesearch(country,search,0,searchnumber)
          res.json(peopleinterests);
        }else{
        const peopleinterests = await sequelize.query(
          query + " AND country ='" + country + "'",
          {
            type: QueryTypes.SELECT,
          }
        );
        res.json(peopleinterests);
        }
      }
    }
  }
});

//.......................................................................................
router.post("/getpeopleinterestspaginate", async (req, res) => {
  const { interests, country, value, limit, paginationnumbers, search } =req.body;
  const start = 10 * value - 10;
  const end = 10;
  let query=interestsquery("SELECT * FROM interests WHERE ",interests)
  if (country == "Select Country") {
    if (numberofpages > 1) {
      if (value == numberofpages) {
        if (limit) {
          if (search) {
            let modulos = limit % 10;
            if(modulos == 0) {
              modulos=10
            }
            res.json(await getpaginatefunctions.selectcountrypaginatesearch (query,search,start,modulos))
          } else {
            let modulos = limit % 10;
            if(modulos == 0) {
              modulos=10
            }
            res.json(await getpaginatefunctions.selectcountrypaginatenosearch (query,start,modulos))
          }
        } else {
          if (search) {
            const searchrowsnumber = await getpaginatefunctions.paginatesearchnumber(query, search)
            let modulos = searchrowsnumber % 10;
            if(modulos == 0) {
              modulos=10
            }
            res.json(await getpaginatefunctions.selectcountrypaginatesearch (query,search,start,modulos))
          } else {
            res.json(await getpaginatefunctions.selectcountrypaginatenosearch (query,start,10))
          }
        }
      } else {
        console.log("if value ! number of pages");
        if (search) {
          res.json(await getpaginatefunctions.selectcountrypaginatesearch (query,search,start,10))
        } else {
          res.json(await getpaginatefunctions.selectcountrypaginatenosearch (query,start,10))
        }
      }
    } else {
      if (limit) {
        if (search) {
          let modulos = limit % 10;
          if(modulos == 0) {
            modulos=10
          }
          res.json(await getpaginatefunctions.selectcountrypaginatesearch (query,search,0,modulos))
        } else {
          res.json(await getpaginatefunctions.selectcountrypaginatenosearch (query,0,limit))
        }
      } else {
        if (search) {
          const searchrowsnumber = await getpaginatefunctions.paginatesearchnumber(query, search)
            let modulos = searchrowsnumber % 10;
            if(modulos == 0) {
              modulos=10
            }
        res.json(await getpaginatefunctions.selectcountrypaginatesearch (query,search,0,modulos))

        } else {

          res.json(await getpaginatefunctions.selectcountrypaginatenosearch (query,0,10))

        }
      }
    }
  }else {
    if (Object.keys(interests).length == 0) {
      if (numberofpages > 1) {
        if (value == numberofpages) {
          if (limit) {
            if (search) {
              let modulos = limit % 10;
              if(modulos == 0) {
                modulos=10
              }

             res.json(await getpaginatefunctions.countrypaginatesearch (country,search,start,modulos))

            } else {
              let modulos = limit % 10;
              if(modulos == 0) {
                modulos=10
              }

              res.json( await getpaginatefunctions.countrypaginatenosearch (country,start,modulos))
            }
          } else {
            if (search) {
             searchrowsnumber= await getpaginatefunctions.countrypaginatesearchnumber(country,search)
              let modulos = searchrowsnumber % 10;
              if(modulos == 0) {
                modulos=10
              }
              res.json(await getpaginatefunctions.countrypaginatesearch (country,search,start,modulos))

            } else {

              res.json(await getpaginatefunctions.countrypaginatenosearch (country,start,10))

            }
          }
        } else {
          console.log("if value ! number of pages");
          if (search) {
            res.json(await getpaginatefunctions.countrypaginatesearch (country,search,start,10))         
          } else {

            res.json(await getpaginatefunctions.countrypaginatenosearch (country,start,10))
          }
        }
      } else {
        if (limit) {
          if (search) {
            let modulos = limit % 10;
            if(modulos == 0) {
              modulos=10
            }
            res.json(await getpaginatefunctions.countrypaginatesearch (country,search,0,modulos));
          } else {
            let modulos = limit % 10;
            if(modulos == 0) {
              modulos=10
            }
            res.json(await getpaginatefunctions.countrypaginatenosearch (country,0,modulos))
          }
        } else {
          if (search) {
            searchrowsnumber= await getpaginatefunctions.countrypaginatesearchnumber(country,search)
            let modulos = searchrowsnumber % 10;
            if(modulos == 0) {
                modulos=10
            }
            res.json(await getpaginatefunctions.countrypaginatesearch (country,search,0,modulos))

          } else {
            res.json(await getpaginatefunctions.countrypaginatenosearch (country,0,10))
          }
        }
      }     
    }else {
      if (numberofpages > 1) {
        if (value == numberofpages) {
          if (limit) {
            if (search) {
              let modulos = limit % 10;
              if(modulos == 0) {
                modulos=10
              }
            res.json(await getpaginatefunctions.bothpaginatesearch (query,country,search,start,modulos))
            } else {
              let modulos = limit % 10;
              if(modulos == 0) {
                modulos=10
              }
              res.json(await getpaginatefunctions.bothpaginatenosearch (query,country,start,modulos))
            }
          } else {
            if (search) {
              searchrownumber=await bothpaginatesearchnumber (country,search)
              let modulos = searchrowsnumber % 10;
              if(modulos == 0) {
                modulos=10
              }
            res.json(await getpaginatefunctions.bothpaginatesearch (query,country,search,start,modulos))
            } else {
              res.json(await getpaginatefunctions.bothpaginatenosearch (query,country,start,10))
            }
          }
        } else {
          console.log("if value ! number of pages");
          if (search) {
            res.json(await getpaginatefunctions.bothpaginatesearch (query,country,search,start,10))
          } else {
            res.json(await getpaginatefunctions.bothpaginatenosearch (query,country,start,10))
          }
        }
      } else {
        if (limit) {
          if (search) {
            let modulos = limit % 10;
            if(modulos == 0) {
              modulos=10
            }
            res.json(await getpaginatefunctions.bothpaginatesearch (query,country,search,0,modulos))
          } else {
            let modulos = limit % 10;
            if(modulos == 0) {
              modulos=10
            }
            res.json(await getpaginatefunctions.bothpaginatenosearch (query,country,0,modulos))
          }
        } else {
          if (search) {
            const searchrowsnumber=await bothpaginatesearchnumber (country,search)
            let modulos = searchrowsnumber % 10;
            if(modulos == 0) {
              modulos=10
            }
          res.json(await getpaginatefunctions.bothpaginatesearch (query,country,search,0,modulos))
          } else {
            res.json(await getpaginatefunctions.bothpaginatenosearch (query,country,0,10))
          }
        }
      }
    }
  }
});
//.......................................................................................

router.post("/total", async (req, res) => {
  const { interests, country } = req.body;
  if (country == "Select Country" && Object.keys(interests).length == 0) {
    res.json({ numberofrows: 0 });
    return;
  }
  try{

  let query=interestsquery("SELECT COUNT(*) as count FROM interests WHERE ",interests)
  if (country == "Select Country") {
    const peopleinterests = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    const numberofrows = peopleinterests[0].count;
    res.json({ numberofrows: numberofrows });
  } else {
    if (Object.keys(interests).length == 0) {
      const peopleinterests = await sequelize.query(
        "SELECT COUNT(*) as count FROM interests WHERE country = ?",
        {
          replacements: [country],
          type: QueryTypes.SELECT,
        }
      );
      const numberofrows = peopleinterests[0].count;
      res.json({ numberofrows: numberofrows });
    } else {
      const peopleinterests = await sequelize.query(
        query + "AND country ='" + country + "'",
        {
          type: QueryTypes.SELECT,
        }
      );
      const numberofrows = peopleinterests[0].count;
      res.json({ numberofrows: numberofrows });
    }
  }
}catch(err){
    console.error(err);
  }
}

);

//.......................................................................................



router.post("/paginationnumbers", async (req, res) => {
  const { interests, country, limit, search } = req.body;
  let query=interestsquery("SELECT COUNT(*) as count FROM interests WHERE ",interests)
  let query2=interestsquery("SELECT * FROM interests WHERE ",interests)

  if (country == "Select Country") {
    if (limit) {
      if (search) {
        searchrowsnumber=await functions.selectcountrynumbersearch (query2,search)
        if (searchrowsnumber > limit) {
          res.json(functions.findrowsandpages(limit))
        } else {
          res.json(functions.findrowsandpages(searchrowsnumber))
        }
      } else {
        res.json(functions.findrowsandpages(limit))
      }
    } else {
      if (search) {
        searchrowsnumber=await functions.selectcountrynumbersearch (query2,search)  
        res.json(functions.findrowsandpages(searchrowsnumber))
      } else {
        
        searchrowsnumber=await functions.selectcountrynumbernosearch (query) 
        res.json(functions.findrowsandpages(searchrowsnumber))
      }
    }
  } else {
    if (Object.keys(interests).length == 0) {
      if (limit) {
        if (search) {
          searchrowsnumber=await functions.countrynumbersearch (country, search)
          if (searchrowsnumber > limit) {
            res.json(functions.findrowsandpages(limit))
          } else {
            res.json(functions.findrowsandpages(searchrowsnumber))
          }
        } else {
          res.json(functions.findrowsandpages(limit))
        }
      } else {
        if (search) {         
          searchrowsnumber=await functions.countrynumbersearch (country, search)
          res.json(functions.findrowsandpages(searchrowsnumber))
        } else {
          searchrowsnumber=await functions.countrynumbernosearch (country)
          res.json(functions.findrowsandpages(searchrowsnumber))
        }
      }
    } else {
      if (limit) {
        if (search) {
          const searchrowsnumber = await functions.bothnumbersearch (query2,country,search)
          if (searchrowsnumber > limit) {
            res.json(functions.findrowsandpages(limit))
          } else {
            res.json(functions.findrowsandpages(searchrowsnumber))
          }
        } else {
          res.json(functions.findrowsandpages(limit))
        }
      } else {
        if (search) {
          const searchrowsnumber=await functions.bothnumbersearch (query2,country,search)
          res.json(functions.findrowsandpages(searchrowsnumber))
        } else {
          const searchrowsnumber=await functions.bothnumbernosearch(query,country)
          res.json(functions.findrowsandpages(searchrowsnumber))

        }
      }
    }
  }
});

module.exports = router;
