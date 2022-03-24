
const sequelize = require("../util/database");
const { QueryTypes } = require("@sequelize/core");


//function for select country
async function selectcountrysearch (search,query,offset,next) {
    const peopleinterests =  sequelize.query(
      "Select * FROM (" +
        query +
        ") as a WHERE a.customerinterests LIKE '%" +
        search +
        "%' OR a.id LIKE '%" +
        search +
        "%' OR a.phonenumber LIKE '%" +
        search +
        "%' OR a.country LIKE '%" +
        search +
        "%' ORDER BY a.Id OFFSET "+offset+" ROWS FETCH NEXT " +next+" ROWS ONLY",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests
  }
  
   async function selectcountrynosearch(query,offset,next){
    const peopleinterests =  sequelize.query(
      query + "ORDER BY Id OFFSET "+offset+" ROWS FETCH NEXT "+next+" ROWS ONLY",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests
  }
  
  //functions for onlycountry
  async function onlycountrysearch (country,search,offset,next) {
    const peopleinterests =  sequelize.query(
      "Select * FROM (" +
        "SELECT * FROM interests WHERE country ='" + country +
        "') as a WHERE a.customerinterests LIKE '%" +
        search +
        "%' OR a.id LIKE '%" +
        search +
        "%' OR a.phonenumber LIKE '%" +
        search +
        "%' OR a.country LIKE '%" +
        search +
        "%' ORDER BY a.Id OFFSET " + offset +" ROWS FETCH NEXT " +next+ " ROWS ONLY",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests
  }
  async function onlycountrynosearch(country,offset,next){
    const peopleinterests =  sequelize.query(
      "SELECT * FROM interests WHERE country ='"+country+ "' ORDER BY id OFFSET " +offset+ " ROWS FETCH NEXT " +next+ " ROWS ONLY",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests
  
  }
  //functions for both
  async function bothsearch (query,country,search,offset,next) {
    const peopleinterests = await sequelize.query(
      "Select * FROM (" +
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
        "%' ORDER BY a.Id OFFSET "+offset+" ROWS FETCH NEXT " +next+ " ROWS ONLY",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests
  }
  async function bothnosearch(query,country,offset,next){
    const peopleinterests = await sequelize.query(
      query +
        "AND country ='" +
        country +
        "' ORDER BY id OFFSET "+offset+" ROWS FETCH NEXT " +next+ " ROWS ONLY",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests
  
  }

  module.exports ={bothnosearch,bothsearch,onlycountrysearch,onlycountrynosearch,selectcountrynosearch,selectcountrysearch}