const sequelize = require("../util/database");
const { QueryTypes } = require("@sequelize/core");


//get paginationnumbers functions
   //selectcountry...............
    async function selectcountrynumbersearch (query,search) {
    const peopleinterests = await sequelize.query(
      "Select count(*) as count FROM (" +
        query +
        ") as a WHERE a.customerinterests LIKE '%" +
        search +
        "%' OR a.id LIKE '%" +
        search +
        "%' OR a.phonenumber LIKE '%" +
        search +
        "%' OR a.country LIKE '%" +
        search +
        "%'",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests[0].count;
  }
  
   async function selectcountrynumbernosearch(query){
    const peopleinterests = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return peopleinterests[0].count;
  }
  
  //country..........
   async function countrynumbersearch (country, search) {
    const peopleinterests = await sequelize.query(
      "Select count(*) as count FROM (" +
        "SELECT * FROM interests WHERE country = '" +country+
        "') as a WHERE a.customerinterests LIKE '%" +
        search +
        "%' OR a.id LIKE '%" +
        search +
        "%' OR a.phonenumber LIKE '%" +
        search +
        "%' OR a.country LIKE '%" +
        search +
        "%'",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests[0].count;
  }
   async function countrynumbernosearch (country) {
    const peopleinterests = await sequelize.query(
      "SELECT  COUNT(*) as count FROM interests WHERE country ='"+country+"'",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests[0].count;
  }
  
  //both................................................................
   async function bothnumbersearch (query,country,search) {
    const peopleinterests = await sequelize.query(
      "Select count(*) as count FROM (" +
        query +
        "AND country ='" +
        country +
        "') as a WHERE a.customerinterests LIKE '%" +
        search +
        "%' OR a.id LIKE '%" +
        search +
        "%' OR a.phonenumber LIKE '%" +
        search +
        "%' OR a.country LIKE '%" +
        search +
        "%' ",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests[0].count;
  }
   async function bothnumbernosearch(query,country){
    const peopleinterests = await sequelize.query(
      query + "AND country ='" + country + "'",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests[0].count;
  }
  
   function findrowsandpages(rowsnum){
    numberofpages = rowsnum / 10;
    numberofpages = Math.ceil(numberofpages);
    return {
      numberofpages: numberofpages,
      numberofrows: rowsnum,
    };
    
  }
  module.exports = {selectcountrynumbersearch,selectcountrynumbernosearch,countrynumbersearch,countrynumbernosearch,bothnumbersearch,bothnumbernosearch,findrowsandpages}