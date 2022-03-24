
const sequelize = require("../util/database");
const { QueryTypes } = require("@sequelize/core");
//SelectCountry
async function selectcountrypaginatesearch (query,search,offset,next) {
    const peopleinterests = await sequelize.query(
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
          "%' ORDER BY a.Id OFFSET "+offset+" ROWS FETCH NEXT "+ next +" ROWS ONLY",
        {
          type: QueryTypes.SELECT,
        }
      );
      return peopleinterests;
  }
  async function paginatesearchnumber (query,search) {
    const searchrows = await sequelize.query(
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
          "%' ",
        {
          type: QueryTypes.SELECT,
        }
      );
      return searchrows[0].count;
  }

  async function selectcountrypaginatenosearch(query,offset,next){
    const peopleinterests = await sequelize.query(
        query + "ORDER BY Id OFFSET " +offset+" ROWS FETCH NEXT " +next+ " ROWS ONLY",
        {
          type: QueryTypes.SELECT,
        }
      );
      return peopleinterests;
  }
//Country selection
async function countrypaginatesearch (country,search,offset,next) {
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
  async function countrypaginatesearchnumber (country,search) {
    const searchrows = await sequelize.query(
        "Select count(*) as count FROM (" +
          "SELECT * FROM interests WHERE country ='" +country+
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
      return searchrows[0].count;
  }

  async function countrypaginatenosearch (country,offset,next){
    const peopleinterests =  sequelize.query(
      "SELECT * FROM interests WHERE country ='"+country+ "' ORDER BY id OFFSET " +offset+ " ROWS FETCH NEXT " +next+ " ROWS ONLY",
      {
        type: QueryTypes.SELECT,
      }
    );
    return peopleinterests
  
  }
  //both selection
  async function bothpaginatesearch (query,country,search,offset,next) {
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
  async function bothpaginatesearchnumber (country,search) {
    const searchrows = await sequelize.query(
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
          "%'",
        {
          type: QueryTypes.SELECT,
        }
      );
      return searchrows[0].count;
  }

  async function bothpaginatenosearch(query,country,offset,next){
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

  module.exports ={selectcountrypaginatenosearch,paginatesearchnumber,selectcountrypaginatesearch,countrypaginatesearch,countrypaginatesearchnumber,countrypaginatenosearch,bothpaginatenosearch,bothpaginatesearchnumber,bothpaginatesearch}