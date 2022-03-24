const Sequelize= require("sequelize")

const sequelize = new Sequelize("databank", "sa", "Asdcxz@123", {
    dialect: "mssql",
    dialectOptions: {
      // Observe the need for this nested `options` field for MSSQL
      options: {
        // Your tedious options here
        useUTC: false,
        dateFirst: 1,
        port: 50920,
        
      },
      stream:true,
      
    },
    pool: {
      max: 64,
      min: 2,
      acquire: 300000,
      idle: 30000,
      
    },
  });

  module.exports=sequelize;